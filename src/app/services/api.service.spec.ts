import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

}
