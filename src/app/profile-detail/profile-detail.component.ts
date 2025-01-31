import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router'; // Importa ActivatedRoute
import { PersonalMap } from '../home/profile.model';


@Component({
    selector: 'app-profile-detail',
    templateUrl: './profile-detail.component.html',
    styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit {
    profile: any;
    personalInfo: any;
    loading: boolean = true;
    notificationMessage: string | null = null;
    expandedSections: { [key: string]: boolean } = {};
    personalMapData: PersonalMap | null = null;

    constructor(private apiService: ApiService, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            const profileId = params['_id'];
            this.loadProfile(profileId);
        });
    }

    loadProfile(profileId: string): void {
        this.loading = true;
        this.apiService.getProfile(profileId).subscribe({
            next: (response: any) => {
                if (response && response.data) {
                    this.profile = response.data;
                    this.personalInfo = this.profile.personal_info;
                    this.personalMapData = this.profile as PersonalMap;
                }
                this.loading = false;
            },
            error: (error) => {
                console.error('Error al cargar el perfil:', error);
                this.loading = false;
                this.showNotification('Error al cargar el perfil.')
            },
        });
    }
    toggleSection(sectionName: string) {
        this.expandedSections[sectionName] = !this.expandedSections[sectionName];
    }
    showNotification(message: string): void {
        this.notificationMessage = message;
        setTimeout(() => {
            this.notificationMessage = null;
        }, 3000);
    }
}