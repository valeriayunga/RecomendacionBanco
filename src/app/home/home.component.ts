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

  constructor(private apiService: ApiService) { } // Inyecta el servicio

  ngOnInit(): void {
    this.getPersonalMaps(); // Llama al método para obtener los datos al inicializar el componente
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

  // Método para seleccionar un perfil
  selectProfile(profile: string) {
    this.selectedProfile = profile;
  }
}
