import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

interface PersonalInfo {
    nombre_completo: string;
    correo: string;
    telefono: string;
    aspiracion_salarial: number;
    _id: string;
}
interface PersonalMap {
  personal_info: PersonalInfo;
  Tag: string | string[];
}

interface Value {
    name: string;
    ponderacion: number;
}

interface Subseccion {
    name: string;
    ponderacion: number;
    values: Value[];
}

interface Seccion {
    name: string;
    ponderacion: number;
    Subsecciones: Subseccion[];
}
interface Profile {
  Secciones: Seccion[];
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  personalMapsList: PersonalMap[] = [];
  displayedPersonalMaps: PersonalMap[] = [];
  loading: boolean = true;
  searchQuery: string = '';
  notificationMessage: string | null = null;
  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 1;
  tagSearchQuery: string = '';
  filteredTags: string[] = [];
  allTags: string[] = [];
  selectedProfile: string | null = null;
  showModal: boolean = false;
  profilesList: Profile[] = [];
  expandedSections: { [key: string]: boolean } = {};
  lastClickTime: number = 0;
  clickTimeout: any;



  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.loadPersonalMaps();
    this.loadTags();
  }


  loadPersonalMaps(): void {
    this.loading = true;
    this.apiService.getPersonalMaps().subscribe({
      next: (response: any) => {
        if (response && response.data) {
          this.personalMapsList = response.data;
          this.applyFilters();
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar los mapas personales:', error);
        this.loading = false;
        this.showNotification('Error al cargar los candidatos.');
      },
    });
  }

  loadTags(): void {
    this.apiService.getTags().subscribe({
      next: (response: any) => {
        if (response && response.data) {
          this.allTags = Array.from(new Set(response.data.flat()));
          this.filteredTags = [...this.allTags];
        }
      },
      error: (error) => {
        console.error('Error al cargar los tags:', error);
      },
    });
  }

  filterTags(): void {
    if (!this.tagSearchQuery) {
      this.filteredTags = [...this.allTags];
    } else {
      this.filteredTags = this.allTags.filter((tag) =>
        tag.toLowerCase().includes(this.tagSearchQuery.toLowerCase())
      );
    }
  }

  selectProfile(tag: string): void {
    const currentTime = new Date().getTime();
    const timeDiff = currentTime - this.lastClickTime;

    if (timeDiff < 300) { // Considerar un doble clic si es menor a 300 ms
      clearTimeout(this.clickTimeout); // Cancelar el timeout del clic simple
      this.showProfileDetails(tag); // Mostrar los detalles del tag con doble clic
    } else {
      this.clickTimeout = setTimeout(() => {
        this.selectedProfile = tag; // Marcar el tag como seleccionado si es un clic simple
        this.applyFilters(); // Aplicar filtros inmediatamente

      }, 300); // Esperar 300ms antes de considerar un clic simple
    }
    this.lastClickTime = currentTime;
  }

  // Función para mostrar los detalles del tag
  showProfileDetails(tag: string): void {
        this.selectedProfile = tag;
          this.apiService.getProfilesByTag(tag).subscribe({
            next: (response: any) => {
              if (response && response.data) {
                this.profilesList = response.data;
                this.showModal = true;
              }
            },
            error: (error) => {
              console.error('Error al cargar los perfiles:', error);
            },
          });
  }

  closeModal(): void {
    this.showModal = false;
  }

   private getFilteredPersonalMaps(): PersonalMap[] {
        let filtered = this.personalMapsList;

        if (this.selectedProfile) {
            filtered = filtered.filter((candidate) => {
              const tags = Array.isArray(candidate.Tag) ? candidate.Tag : [candidate.Tag];
              return tags.includes(this.selectedProfile!);
            });
        }
        if (this.searchQuery) {
            const searchTerm = this.searchQuery.toLowerCase();
            filtered = filtered.filter(
                (candidate) =>
                    candidate.personal_info.nombre_completo?.toLowerCase().includes(searchTerm) ||
                    candidate.personal_info.correo?.toLowerCase().includes(searchTerm)
            );
        }

        return filtered;
    }
  applyFilters(): void {
        const filtered = this.getFilteredPersonalMaps();
        this.totalPages = Math.ceil(filtered.length / this.itemsPerPage);
        this.currentPage = 1;
        this.displayedPersonalMaps = filtered.slice(0, this.itemsPerPage);
    }


    onSearch(): void {
      this.applyFilters();
    }

    previousPage(): void {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.updateDisplayedItems();
        }
    }

    nextPage(): void {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            this.updateDisplayedItems();
        }
    }
  updateDisplayedItems(): void {
    const filtered = this.getFilteredPersonalMaps();
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        this.displayedPersonalMaps = filtered.slice(startIndex, startIndex + this.itemsPerPage);
    }

    showNotification(message: string): void {
        this.notificationMessage = message;
        setTimeout(() => {
            this.notificationMessage = null;
        }, 3000);
    }

    toggleSection(sectionName: string): void {
        this.expandedSections[sectionName] = !this.expandedSections[sectionName];
    }

}