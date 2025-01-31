import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { PersonalMap, Profile } from './profile.model';

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

    constructor(private apiService: ApiService, private router: Router) { }

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
                    this.displayedPersonalMaps = [...this.personalMapsList].slice(0, this.itemsPerPage);
                    this.totalPages = Math.ceil(this.personalMapsList.length / this.itemsPerPage);
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
                    // Eliminar duplicados usando Set
                    this.allTags = Array.from(new Set(response.data.flat()));
                    this.filteredTags = [...this.allTags];
                }
            },
            error: (error) => {
                console.error('Error al cargar los tags:', error);
            },
        });
    }

    toggleSection(sectionName: string) {
        this.expandedSections[sectionName] = !this.expandedSections[sectionName];
    }

    filterTags(): void {
        if (!this.tagSearchQuery) {
            this.filteredTags = [...this.allTags];
        } else {
            this.filteredTags = this.allTags.filter(tag =>
                tag.toLowerCase().includes(this.tagSearchQuery.toLowerCase())
            );
        }
    }

    selectProfile(tag: string): void {
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

    onSearch(): void {
        if (!this.searchQuery) {
            this.displayedPersonalMaps = [...this.personalMapsList].slice(0, this.itemsPerPage);
            this.currentPage = 1;
            this.totalPages = Math.ceil(this.personalMapsList.length / this.itemsPerPage);
        } else {
            const searchTerm = this.searchQuery.toLowerCase();
            this.displayedPersonalMaps = this.personalMapsList.filter(
                (map: any) =>
                map.nombre_completo?.toLowerCase().includes(searchTerm) ||
                map.correo?.toLowerCase().includes(searchTerm)
            ).slice(0, this.itemsPerPage);
            this.currentPage = 1;
            this.totalPages = Math.ceil(this.personalMapsList.filter(
                (map: any) =>
                map.nombre_completo?.toLowerCase().includes(searchTerm) ||
                map.correo?.toLowerCase().includes(searchTerm)
            ).length / this.itemsPerPage)
        }
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
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        this.displayedPersonalMaps = [...this.personalMapsList].slice(startIndex, startIndex + this.itemsPerPage);
        if (this.searchQuery) {
            const searchTerm = this.searchQuery.toLowerCase();
            this.displayedPersonalMaps = this.personalMapsList.filter(
                (map: any) =>
                    map.nombre_completo?.toLowerCase().includes(searchTerm) ||
                    map.correo?.toLowerCase().includes(searchTerm)
            ).slice(startIndex, startIndex + this.itemsPerPage);
        }
    }

    showNotification(message: string): void {
        this.notificationMessage = message;
        setTimeout(() => {
            this.notificationMessage = null;
        }, 3000);
    }
}