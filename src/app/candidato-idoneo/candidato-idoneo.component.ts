import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { HttpClient } from '@angular/common/http';


@Component({
    selector: 'app-candidato-idoneo',
    templateUrl: './candidato-idoneo.component.html',
    styleUrls: ['./candidato-idoneo.component.css']
})
export class CandidatoIdoneoComponent {
    selectedProfile: string = '';
    files: { file: File; status: 'uploading' | 'uploaded' }[] = [];
    showUploadFiles: boolean = false;
    showSuccessMessage: boolean = false;
    recommendedCandidates: any = null;
    loading:boolean=false;

    constructor(private router: Router, private apiService: ApiService, private http: HttpClient) { }

    selectProfile(profile: string) {
        this.selectedProfile = profile;
        this.showUploadFiles = false; // Resetea el contenedor al cambiar de perfil
        this.showSuccessMessage = false; // Oculta mensaje de éxito al seleccionar nuevo perfil
        this.recommendedCandidates = null;
    }

    buscarMejorCandidato() {
        this.loading = true; // Activa el spinner
        this.router.navigate(['/buscar-candidato']);   
    }

    onFileSelected(event: any): void {
        const selectedFiles = event.target.files;
        if (selectedFiles) {
            for (let i = 0; i < selectedFiles.length; i++) {
                const file = selectedFiles[i];
                const fileType = file.name.split('.').pop()?.toLowerCase();

                if (fileType === 'pdf') {
                    const newFile: { file: File; status: 'uploading' | 'uploaded' } = { file, status: 'uploading' };
                    this.files.push(newFile);
                    this.simulateUpload(this.files.length - 1);
                } else {
                    console.warn(`Archivo no permitido: ${file.name}. Solo se aceptan archivos PDF.`);
                    alert(`El archivo ${file.name} no es un PDF. Por favor, sube únicamente archivos en formato PDF.`);
                }
            }
        }
    }


    simulateUpload(index: number): void {
        const currentIndex = index;
        setTimeout(() => {
            if (this.files[currentIndex]) {
                this.files[currentIndex].status = 'uploaded';
                console.log(`Archivo ${this.files[currentIndex].file.name} cargado.`);
            }
        }, 1000);
    }

    removeFile(index: number): void {
        this.files.splice(index, 1);
    }

    confirmUpload(): void {
        if (this.files.length > 0) {
            const filesToUpload = this.files.map(fileObj => fileObj.file);
            this.apiService.uploadPDFs(filesToUpload).subscribe({
                next: response => {
                    console.log('Archivos procesados exitosamente:', response);
                    this.showUploadFiles = false;
                    this.showSuccessMessage = true;
                },
                error: err => {
                    console.error('Error al procesar los archivos:', err);
                }
            });
        } else {
            console.warn('No hay archivos seleccionados.');
        }
    }

    

    getFileIcon(fileObj: { file: File }): string {
        const extension = fileObj.file.name.split('.').pop()?.toLowerCase();

        switch (extension) {
            case 'pdf':
                return 'fas fa-file-pdf text-red-500';
            case 'doc':
            case 'docx':
                return 'fas fa-file-word text-blue-500';
            case 'xls':
            case 'xlsx':
                return 'fas fa-file-excel text-green-500';
            case 'ppt':
            case 'pptx':
                return 'fas fa-file-powerpoint text-orange-500';
            case 'jpeg':
            case 'jpg':
            case 'png':
            case 'gif':
                return 'fas fa-file-image text-yellow-500';
            case 'mp4':
                return 'fas fa-file-video text-purple-500';
            default:
                return 'fas fa-file text-gray-500';
        }
    }
}