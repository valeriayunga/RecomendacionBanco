import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-candidato-idoneo',
  templateUrl: './candidato-idoneo.component.html',
  styleUrls: ['./candidato-idoneo.component.css']
})
export class CandidatoIdoneoComponent implements OnInit {

  selectedProfile: string = '';
  files: { file: File; status: 'uploading' | 'uploaded' }[] = [];
  showUploadFiles: boolean = false;
  showSuccessMessage: boolean = false; // Nueva propiedad para el mensaje de éxito

  constructor(private router: Router) {}


  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


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
        const newFile: { file: File; status: 'uploading' | 'uploaded' } = { file: selectedFiles[i], status: 'uploading' };
        this.files.push(newFile);
        this.simulateUpload(this.files.length - 1); // Envía el índice correcto
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
      console.log('Archivos listos para ser enviados:', this.files);
      this.showUploadFiles = false; // Oculta la sección de carga de archivos
      this.showSuccessMessage = true; // Muestra el mensaje de éxito
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
