import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscar-candidato',
  templateUrl: './buscar-candidato.component.html',
  styleUrls: ['./buscar-candidato.component.css']
})
export class BuscarCandidatoComponent implements OnInit {
  showSuccessMessage: boolean = false;
  recommendedCandidates: any;
  profileData: any;

  constructor(private router: Router, private http: HttpClient, private cdr: ChangeDetectorRef) {
    this.profileData = this.router.getCurrentNavigation()?.extras?.state?.['profile'];
    this.recommendedCandidates = this.router.getCurrentNavigation()?.extras?.state?.['candidates'];

  }

  ngOnInit(): void {
      this.fetchRecommendedCandidates(this.profileData);
  }

  // Alturas de las barras
  barHeights = ['140px', '120px', '160px', '110px', '180px', '130px', '150px'];

  // Obtener estilo dinámico para cada barra
  getBarStyle(index: number, height: string) {
    const delay = `${index * 0.1}s`; // Retraso entre barras
    return {
      height: height,
      animation: `bounce 1.5s infinite ease-in-out`,
      animationDelay: delay,
      transformOrigin: 'bottom' // Rebote desde la parte inferior
    };
  }

  redirigirMejorCandidato(): void {
    this.router.navigate(['/']);
    console.log('Redirigiendo al Home...');
  }

  fetchRecommendedCandidates(profileData:any): void {
    this.http.post<any>('http://127.0.0.1:8000/recomendation/generate', profileData).subscribe({
      next: response => {
        console.log('Respuesta de la API de recomendación:', response);
        if (response.status === '200') {
          this.recommendedCandidates = response.data;
          this.showSuccessMessage = true;
          this.cdr.detectChanges();
        } else {
          console.error('Error al obtener los candidatos recomendados:', response);
          alert('Error al obtener los candidatos recomendados')
          this.showSuccessMessage = false;
        }

      },
      error: err => {
        console.error('Error en la solicitud:', err);
        alert('Error al realizar la solicitud')
        this.showSuccessMessage = false;
      }
    });
  }

}