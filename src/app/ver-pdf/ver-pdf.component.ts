import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Importa ActivatedRoute
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-ver-pdf',
  templateUrl: './ver-pdf.component.html',
  styleUrls: ['./ver-pdf.component.css']
})
export class VerPdfComponent implements OnInit {
  map: any; // Define la propiedad 'map' para almacenar los datos de la persona

  constructor(
    private route: ActivatedRoute, // Inyecta ActivatedRoute
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    // Obtén el ID de la persona desde la URL
    const id = this.route.snapshot.paramMap.get('id');

    // Llama al método para obtener los datos de la persona
    if (id) {
      this.getPersonalMapById(id);
    }
  }

  // Método para obtener los datos de la persona por su ID
  getPersonalMapById(id: string): void {
    this.apiService.getPersonalMaps().subscribe(
      (response) => {
        if (response.status === '200') {
          // Filtra los datos para obtener la persona con el ID correspondiente
          this.map = response.data.find((persona: any) => persona.id === +id);
        } else {
          console.error('Error en la respuesta de la API:', response);
        }
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
      }
    );
  }
}
