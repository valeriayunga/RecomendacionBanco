import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8000'; // URL de la API

  constructor(private http: HttpClient) { }

  // Método para obtener los datos del endpoint
  getPersonalMaps(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/home/get/personal_maps`);
  }

  // Método para obtener el PDF desde el endpoint
  getPdf(): Observable<Blob> {
    const headers = new HttpHeaders({
      'Accept': 'application/pdf' // Asegura que el servidor sepa que esperamos un PDF
    });

    return this.http.get(`${this.apiUrl}/home/doc2`, {
      headers: headers,
      responseType: 'blob' // Indica que la respuesta es un Blob (archivo binario)
    });
  }
}
