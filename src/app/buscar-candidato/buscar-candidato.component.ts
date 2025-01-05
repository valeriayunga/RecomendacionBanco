import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscar-candidato',
  templateUrl: './buscar-candidato.component.html',
  styleUrls: ['./buscar-candidato.component.css']
})
export class BuscarCandidatoComponent implements OnInit {
  showSuccessMessage: boolean = false; 

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Simula el cambio de estado después de 3000 ms
    setTimeout(() => {
      this.showSuccessMessage = true; // Muestra el mensaje de éxito
    }, 3000); // Cambia el tiempo si es necesario;
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
    // Lógica para redirigir
    this.router.navigate(['/']); // Cambia "/buscar-candidato" según la ruta deseada
    console.log('Redirigiendo al mejor candidato...');
    // Puedes implementar aquí la redirección o lógica adicional
  }

}
