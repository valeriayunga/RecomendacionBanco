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
  isLoading: boolean = false;

  constructor(private router: Router, private apiService: ApiService, private http: HttpClient) { }

  selectProfile(profile: string) {
    this.selectedProfile = profile;
    this.showUploadFiles = false;
    this.showSuccessMessage = false;
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
          alert(`El archivo ${file.name} no es un PDF. Por favor, sube únicamente archivos en formato PDF.`);
        }
      }
    }
  }

  simulateUpload(index: number): void {
    setTimeout(() => {
      if (this.files[index]) {
        this.files[index].status = 'uploaded';
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
        next: () => {
          this.showUploadFiles = false;
          this.showSuccessMessage = true;
        },
        error: (err) => {
          console.error('Error al procesar los archivos:', err);
        }
      });
    }
  }

  buscarMejorCandidato(): void {
    this.isLoading = true;
    const profileData = { /* ... (tu estructura de datos existente) ... */ };

    this.http.post<any>('http://127.0.0.1:8000/recomendation/generate', profileData).subscribe({
      next: (response) => {
        if (response.status === '200') {
          this.recommendedCandidates = response.data;
          this.router.navigate(['/buscar-candidato'], { 
            state: { candidates: this.recommendedCandidates } 
          });
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error en la solicitud:', err);
        this.isLoading = false;
      }
    });
  }

  getFileIcon(fileObj: { file: File }): string {
    const extension = fileObj.file.name.split('.').pop()?.toLowerCase();
    return extension === 'pdf' ? 'fas fa-file-pdf text-red-500' : 'fas fa-file text-gray-500';
  }
}