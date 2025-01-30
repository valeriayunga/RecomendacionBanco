import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscar-candidato',
  templateUrl: './buscar-candidato.component.html',
  styleUrls: ['./buscar-candidato.component.css']
})
export class BuscarCandidatoComponent implements OnInit {
  showSuccessMessage: boolean = false;
  recommendedCandidates: any;

  constructor(private router: Router) {
    this.recommendedCandidates = this.router.getCurrentNavigation()?.extras?.state?.['candidates'];
  }

  ngOnInit(): void {
    if (this.recommendedCandidates) {
      this.showSuccessMessage = true;
    } else {
      console.error("No se recibieron datos de candidatos recomendados.");
    }
  }

  redirigirMejorCandidato(): void {
    this.router.navigate(['']);
    console.log('Redirigiendo al Home...');
  }
}