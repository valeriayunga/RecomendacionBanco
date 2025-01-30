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
    return this.http.get<any>(`${this.apiUrl}/home/personal_maps/get`);
  }

  // Nuevo método para obtener los tags
  getTags(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/ideal_profile/tags/get`);
  }

  // Nuevo método para obtener perfiles por tag

  getAIProfile(prompt: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/ideal_profile/generate_profile`, {
      params: { prompt: prompt }
    });
  }


  publishProfile(profileData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/ideal_profile/profile/update`, profileData, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }) // Asegura que se envía como JSON
    });
  }


  // Nuevo método para obtener perfiles por tag
  getProfilesByTag(tag: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/ideal_profile/profile/tag/${tag}`);
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

  uploadPDFs(files: File[]): Observable<any> {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file, file.name); // Usa 'files' sin índices
    });

    return this.http.post(`${this.apiUrl}/personal_map/extract_and_save_multiple_pdfs`, formData);
  }

}
