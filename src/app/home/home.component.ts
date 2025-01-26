import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service'; // Asegúrate de importar el servicio

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  selectedProfile: string = ''; // Variable para el perfil seleccionado
  personalMaps: any[] = []; // Variable para almacenar los datos de la API
  isHovered = false;
  tags: string[] = []; // Variable para almacenar los tags de la API
  profiles: any[] = []; // Variable para almacenar los perfiles obtenidos por tag
  showModal = false; // Variable para controlar la visibilidad del modal


  constructor(private apiService: ApiService) { } // Inyecta el servicio

  ngOnInit(): void {
    this.getPersonalMaps(); // Llama al método para obtener los datos al inicializar el componente
    this.getTags(); // Llama al método para obtener los tags al inicializar el componente
  }

  // Método para obtener los datos de la API
  getPersonalMaps(): void {
    this.apiService.getPersonalMaps().subscribe(
      (response) => {
        if (response.status === '200') { // Verifica el estado de la respuesta
          this.personalMaps = response.data; // Asigna los datos a la variable
          console.log('Datos recibidos:', this.personalMaps); // Opcional: ver los datos en la consola
        } else {
          console.error('Error en la respuesta de la API:', response);
        }
      },
      (error) => {
        console.error('Error al obtener los datos:', error); // Manejo de errores
      }
    );
  }

  // Método para obtener los tags de la API
  getTags(): void {
    this.apiService.getTags().subscribe(
      (response) => {
        if (response.status === 200) { // Verifica el estado de la respuesta
          this.tags = response.data; // Asigna los datos a la variable
          console.log('Tags recibidos:', this.tags); // Opcional: ver los datos en la consola
        } else {
          console.error('Error en la respuesta de la API:', response);
        }
      },
      (error) => {
        console.error('Error al obtener los tags:', error); // Manejo de errores
      }
    );
  }

  // Método para seleccionar un perfil y obtener los perfiles por tag
  selectProfile(tag: string): void {
    this.selectedProfile = tag;
    this.apiService.getProfilesByTag(tag).subscribe(
      (response) => {
        if (response.status === 200) { // Verifica el estado de la respuesta
          this.profiles = response.data; // Asigna los datos a la variable
          console.log('Perfiles recibidos:', this.profiles); // Opcional: ver los datos en la consola
          this.showModal = true; // Muestra el modal
        } else {
          console.error('Error en la respuesta de la API:', response);
        }
      },
      (error) => {
        console.error('Error al obtener los perfiles:', error); // Manejo de errores
      }
    );
  }

  generateAIProfile() {
    // Implementa aquí la lógica para generar el perfil
    console.log('Generando perfil con IA...');
  }

  // Método para cerrar el modal
  closeModal(): void {
    this.showModal = false;
  }
  
}
