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

  constructor(private router: Router, private http: HttpClient, private cdr: ChangeDetectorRef) {
    this.recommendedCandidates = this.router.getCurrentNavigation()?.extras?.state?.['candidates'];
  }

  ngOnInit(): void {
    this.fetchRecommendedCandidates();
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


  fetchRecommendedCandidates(): void {
    // Datos del perfil ideal (quemado por ahora)
    const profileData = {
      "Secciones": [
        {
          "name": "Información Académica",
          "Subsecciones": [
            {
              "name": "Área de estudio",
              "values": [
                {
                  "name": "Ingeniería Industrial",
                  "ponderacion": 5
                },
                {
                  "name": "Administración de Empresas",
                  "ponderacion": 4
                },
                {
                  "name": "Ingeniería en Sistemas",
                  "ponderacion": 5
                },
                {
                  "name": "Carreras afines",
                  "ponderacion": 3
                }
              ],
              "ponderacion": 5
            },
            {
              "name": "Nivel de estudio",
              "values": [
                {
                  "name": "Postgrado (Maestría o MBA)",
                  "ponderacion": 4
                },
                {
                  "name": "Grado",
                  "ponderacion": 2
                }
              ],
              "ponderacion": 4
            },
            {
              "name": "Formación adicional",
              "values": [
                {
                  "name": "Innovación",
                  "ponderacion": 4
                },
                {
                  "name": "Transformación digital",
                  "ponderacion": 4
                },
                {
                  "name": "Gestión de proyectos",
                  "ponderacion": 3
                }
              ],
              "ponderacion": 3
            }
          ],
          "ponderacion": 8
        },
        {
          "name": "Experiencia Laboral",
          "Subsecciones": [
            {
              "name": "Años de experiencia",
              "values": [
                {
                  "name": "8 años o más",
                  "ponderacion": 5
                },
                {
                  "name": "Menos de 8 años",
                  "ponderacion": 1
                }
              ],
              "ponderacion": 6
            },
            {
              "name": "Años liderando Transformación e Innovación",
              "values": [
                {
                  "name": "4 años o más",
                  "ponderacion": 5
                },
                {
                  "name": "Menos de 4 años",
                  "ponderacion": 1
                }
              ],
              "ponderacion": 6
            },
            {
              "name": "Implementación de proyectos estratégicos",
              "values": [
                {
                  "name": "Sí",
                  "ponderacion": 5
                },
                {
                  "name": "No",
                  "ponderacion": 1
                }
              ],
              "ponderacion": 5
            }
          ],
          "ponderacion": 7
        },
        {
          "name": "Conocimientos Técnicos",
          "Subsecciones": [
            {
              "name": "Metodologías Ágiles",
              "values": [
                {
                  "name": "Scrum",
                  "ponderacion": 4
                },
                {
                  "name": "Kanban",
                  "ponderacion": 3
                },
                {
                  "name": "Otros",
                  "ponderacion": 2
                }
              ],
              "ponderacion": 5
            },
            {
              "name": "Gestión de Proyectos de Innovación",
              "values": [
                {
                  "name": "Design Thinking",
                  "ponderacion": 4
                },
                {
                  "name": "Lean Startup",
                  "ponderacion": 4
                },
                {
                  "name": "Otros",
                  "ponderacion": 2
                }
              ],
              "ponderacion": 5
            },
            {
              "name": "Herramientas de Gestión del Cambio",
              "values": [
                {
                  "name": "Experiencia demostrada",
                  "ponderacion": 5
                },
                {
                  "name": "Sin experiencia",
                  "ponderacion": 1
                }
              ],
              "ponderacion": 4
            },
            {
              "name": "Tecnologías emergentes",
              "values": [
                {
                  "name": "IA",
                  "ponderacion": 4
                },
                {
                  "name": "Big Data",
                  "ponderacion": 4
                },
                {
                  "name": "Automatización de procesos",
                  "ponderacion": 4
                },
                {
                  "name": "Otras",
                  "ponderacion": 2
                }
              ],
              "ponderacion": 5
            }
          ],
          "ponderacion": 9
        },
        {
          "name": "Habilidades",
          "Subsecciones": [
            {
              "name": "Habilidades blandas",
              "values": [
                {
                  "name": "Liderazgo estratégico",
                  "ponderacion": 5
                },
                {
                  "name": "Visión de negocio",
                  "ponderacion": 4
                },
                {
                  "name": "Pensamiento disruptivo",
                  "ponderacion": 4
                },
                {
                  "name": "Comunicación",
                  "ponderacion": 4
                },
                {
                  "name": "Negociación",
                  "ponderacion": 4
                },
                {
                  "name": "Gestión del cambio",
                  "ponderacion": 4
                },
                {
                  "name": "Orientación a resultados",
                  "ponderacion": 4
                }
              ],
              "ponderacion": 7
            },
            {
              "name": "Habilidades técnicas",
              "values": [
                {
                  "name": "Gestión de proyectos",
                  "ponderacion": 5
                },
                {
                  "name": "Transformación digital",
                  "ponderacion": 5
                },
                {
                  "name": "Innovación",
                  "ponderacion": 5
                }
              ],
              "ponderacion": 6
            }
          ],
          "ponderacion": 8
        }
      ],
      "Tag": "Jefe de Transformación e Innovación"
    };

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