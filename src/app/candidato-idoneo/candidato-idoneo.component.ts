import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-candidato-idoneo',
  templateUrl: './candidato-idoneo.component.html',
  styleUrls: ['./candidato-idoneo.component.css']
})
export class CandidatoIdoneoComponent  {

  selectedProfile: string = '';
  files: { file: File; status: 'uploading' | 'uploaded' }[] = [];
  showUploadFiles: boolean = false;
  showSuccessMessage: boolean = false; // Nueva propiedad para el mensaje de éxito

  constructor(private router: Router, private apiService: ApiService) {}


  selectProfile(profile: string) {
    this.selectedProfile = profile;
    this.showUploadFiles = false; // Resetea el contenedor al cambiar de perfil
    this.showSuccessMessage = false; // Oculta mensaje de éxito al seleccionar nuevo perfil
  }

  redirigirMejorCandidato() {
    this.router.navigate(['/buscar-candidato']); // Cambia "/buscar-candidato" según la ruta deseada
  }

  // Maneja el evento de selección de archivos
  onFileSelected(event: any): void {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const fileType = file.name.split('.').pop()?.toLowerCase();
  
        if (fileType === 'pdf') {
          const newFile: { file: File; status: 'uploading' | 'uploaded' } = { file, status: 'uploading' };
          this.files.push(newFile);
          this.simulateUpload(this.files.length - 1); // Simula la carga
        } else {
          console.warn(`Archivo no permitido: ${file.name}. Solo se aceptan archivos PDF.`);
          alert(`El archivo ${file.name} no es un PDF. Por favor, sube únicamente archivos en formato PDF.`);
        }
      }
    }
  }
  


  // Simula la carga de archivos (solo para fines visuales)
  simulateUpload(index: number): void {
    const currentIndex = index; // Copia del índice
    setTimeout(() => {
      if (this.files[currentIndex]) {
        this.files[currentIndex].status = 'uploaded';
        console.log(`Archivo ${this.files[currentIndex].file.name} cargado.`);
      }
    }, 1000);
  }



  // Elimina un archivo de la lista
  removeFile(index: number): void {
    this.files.splice(index, 1);
  }

  // Simula la confirmación de los archivos cargados
  confirmUpload(): void {
    if (this.files.length > 0) {
      const filesToUpload = this.files.map(fileObj => fileObj.file);
      this.apiService.uploadPDFs(filesToUpload).subscribe({
        next: response => {
          console.log('Archivos procesados exitosamente:', response);
          this.showUploadFiles = false; // Oculta el contenedor de carga
          this.showSuccessMessage = true; // Muestra el mensaje de éxito
          this.files = []; // Limpia la lista de archivos
        },
        error: err => {
          console.error('Error al procesar los archivos:', err);
        }
      });
    } else {
      console.warn('No hay archivos seleccionados.');
    }
  }

  // Devuelve la clase del ícono según el tipo de archivo
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
