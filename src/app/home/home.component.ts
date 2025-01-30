import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { PersonalMap, Profile } from './profile.model';
// Importa la interface para los perfiles

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
    selectedProfile: string = '';
    personalMapsList: PersonalMap[] = [];
    tagsList: string[] = [];
    profilesList: Profile[] = [];
    showModal = false;
    loading = true;
    notificationMessage: string | null = null;

    // Paginacion
    currentPage = 1;
    itemsPerPage = 10;
    displayedPersonalMaps: PersonalMap[] = [];
    totalPages = 0;

    // Busqueda
    searchQuery: string = '';
    filteredPersonalMaps: PersonalMap[] = [];

    // Expandir 
    expandedSections: { [key: string]: boolean } = {};
    visibleTagsCount = 8; 
    visibleTags: string[] = [];
    tagSearchQuery: string = '';
    filteredTags: string[] = [];
    defaultTags: string[] = []; 

    constructor(private apiService: ApiService) { }

    ngOnInit(): void {
        this.getPersonalMaps();
        this.getTags();
    }
toggleSection(sectionName: string) {
    this.expandedSections[sectionName] = !this.expandedSections[sectionName];
  }
    getPersonalMaps(): void {
        this.loading = true;
        this.apiService.getPersonalMaps().subscribe(
            (response) => {
                if (response.status === 200) {
                    this.personalMapsList = response.data;
                    this.updateDisplayedPersonalMaps();
                    this.filteredPersonalMaps = [...this.personalMapsList];
                } else {
                    this.showNotification('Error al obtener los datos de los candidatos.');
                    console.error('Error en la respuesta de la API:', response);
                }
            },
            (error) => {
                this.showNotification('Error al comunicarse con el servidor.');
                console.error('Error al obtener los datos:', error);
            },
             () => {
                  this.loading = false; // Aseguramos de que el loading termine en cualquier caso
             }
        );
    }


    getTags(): void {
      this.apiService.getTags().subscribe(
          (response) => {
              if (response.status === 200) {
                  this.tagsList = response.data;
                  this.filteredTags = [...this.tagsList]
                   this.defaultTags = this.tagsList.slice(0, 4);
              } else {
                  this.showNotification('Error al obtener los tags.');
                  console.error('Error en la respuesta de la API:', response);
              }
          },
          (error) => {
               this.showNotification('Error al comunicarse con el servidor.');
              console.error('Error al obtener los tags:', error);
          },
           () => {
               this.loading = false; 
           }
      );
  }
  updateVisibleTags() {
   this.visibleTags = this.tagsList.slice(0, this.visibleTagsCount);
  }

  showMoreTags(){
      this.visibleTagsCount = this.tagsList.length;
      this.updateVisibleTags()
  }

    selectProfile(tag: string): void {
         this.loading = true;
         this.selectedProfile = tag;
         this.apiService.getProfilesByTag(tag).subscribe(
            (response) => {
              if (response.status === 200) {
                this.profilesList = response.data;
                this.showModal = true;
               } else {
                    this.showNotification('Error al obtener los perfiles');
                    console.error('Error en la respuesta de la API:', response);
                }
            },
            (error) => {
                this.showNotification('Error al comunicarse con el servidor.');
               console.error('Error al obtener los perfiles:', error);
            },
             () => {
                 this.loading = false; // Aseguramos de que el loading termine en cualquier caso
            }
        );
    }
    filterTags(): void {
      if (!this.tagSearchQuery) {
          this.filteredTags = [...this.tagsList];
          return;
      }
      this.filteredTags = this.tagsList.filter(tag =>
          tag.toLowerCase().includes(this.tagSearchQuery.toLowerCase())
      );
    }
    closeModal(): void {
        this.showModal = false;
    }

    updateDisplayedPersonalMaps() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedPersonalMaps = this.filteredPersonalMaps.slice(startIndex, endIndex);
     this.totalPages = Math.ceil(this.filteredPersonalMaps.length / this.itemsPerPage);
    }

    previousPage() {
        if(this.currentPage > 1){
            this.currentPage--;
            this.updateDisplayedPersonalMaps();
        }
    }
    nextPage() {
        if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.updateDisplayedPersonalMaps();
        }
    }
    updateCandidates(){
      this.showNotification('Candidatos actualizados.');
      // logica para actualizar los candidadtos
    }

    onSearch(){
     if (!this.searchQuery) {
        this.filteredPersonalMaps = [...this.personalMapsList];
      } else {
          this.filteredPersonalMaps = this.personalMapsList.filter(
          (map) =>
            map.nombre_completo.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            map.correo.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
        this.currentPage = 1; // Restablecer a la primera página al realizar una búsqueda
        this.updateDisplayedPersonalMaps();
    }

    showNotification(message: string): void {
      this.notificationMessage = message;
        setTimeout(() => {
          this.notificationMessage = null;
        }, 3000);
    }
}