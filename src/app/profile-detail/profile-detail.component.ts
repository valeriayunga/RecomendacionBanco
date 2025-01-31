import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-profile-detail',
    templateUrl: './profile-detail.component.html',
    styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit {
    profile: any;
    loading: boolean = true;
    notificationMessage: string | null = null;
    expandedSections: { [key: string]: boolean } = {};

    constructor(private apiService: ApiService, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            const profileId = params['_id'];
            if (profileId) {
                this.loadProfile(profileId);
            }
        });
    }

    loadProfile(profileId: string): void {
        this.loading = true;
        this.apiService.getProfile(profileId).subscribe({
            next: (response: any) => {
                if (response && response.data) {
                     this.profile = response.data;
                }
                this.loading = false;
            },
            error: (error) => {
                console.error('Error al cargar el perfil:', error);
                this.loading = false;
                this.showNotification('No se pudo cargar el perfil. Inténtalo más tarde.');
            },
        });
    }
  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
    toggleSection(sectionName: string): void {
        this.expandedSections[sectionName] = !this.expandedSections[sectionName];
    }

    isSectionExpanded(sectionName: string): boolean {
        return this.expandedSections[sectionName] || false;
    }

    showNotification(message: string): void {
        this.notificationMessage = message;
        setTimeout(() => {
            this.notificationMessage = null;
        }, 3000);
    }
}