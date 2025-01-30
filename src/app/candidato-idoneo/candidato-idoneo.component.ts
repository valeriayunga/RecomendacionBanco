import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { HttpClient } from '@angular/common/http';


@Component({
    selector: 'app-candidato-idoneo',
    templateUrl: './candidato-idoneo.component.html',
    styleUrls: ['./candidato-idoneo.component.css']
})
export class CandidatoIdoneoComponent {
    selectedProfile: string = '';
    files: { file: File; status: 'uploading' | 'uploaded' }[] = [];
    showUploadFiles: boolean = false;
    showSuccessMessage: boolean = false;
    recommendedCandidates: any = null;
    loading:boolean=false;

    constructor(private router: Router, private apiService: ApiService, private http: HttpClient) { }

    selectProfile(profile: string) {
        this.selectedProfile = profile;
        this.showUploadFiles = false; // Resetea el contenedor al cambiar de perfil
        this.showSuccessMessage = false; // Oculta mensaje de éxito al seleccionar nuevo perfil
        this.recommendedCandidates = null;
    }

    buscarMejorCandidato() {
        this.loading = true; // Activa el spinner
        this.fetchRecommendedCandidates();
    }

    onFileSelected(event: any): void {
        const selectedFiles = event.target.files;
        if (selectedFiles) {
            for (let i = 0; i < selectedFiles.length; i++) {
                const file = selectedFiles[i];
                const fileType = file.name.split('.').pop()?.toLowerCase();

                if (fileType === 'pdf') {
                    const newFile: { file: File; status: 'uploading' | 'uploaded' } = { file, status: 'uploading' };
                    this.files.push(newFile);
                    this.simulateUpload(this.files.length - 1);
                } else {
                    console.warn(`Archivo no permitido: ${file.name}. Solo se aceptan archivos PDF.`);
                    alert(`El archivo ${file.name} no es un PDF. Por favor, sube únicamente archivos en formato PDF.`);
                }
            }
        }
    }


    simulateUpload(index: number): void {
        const currentIndex = index;
        setTimeout(() => {
            if (this.files[currentIndex]) {
                this.files[currentIndex].status = 'uploaded';
                console.log(`Archivo ${this.files[currentIndex].file.name} cargado.`);
            }
        }, 1000);
    }

    removeFile(index: number): void {
        this.files.splice(index, 1);
    }

    confirmUpload(): void {
        if (this.files.length > 0) {
            const filesToUpload = this.files.map(fileObj => fileObj.file);
            this.apiService.uploadPDFs(filesToUpload).subscribe({
                next: response => {
                    console.log('Archivos procesados exitosamente:', response);
                    this.showUploadFiles = false;
                    this.showSuccessMessage = true;
                },
                error: err => {
                    console.error('Error al procesar los archivos:', err);
                }
            });
        } else {
            console.warn('No hay archivos seleccionados.');
        }
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
              if (response.status === '200' ) {
                   this.recommendedCandidates = response.data;
                   this.loading = false; // Desactiva el spinner
                    this.router.navigate(['/buscar-candidato'], { state: { candidates: this.recommendedCandidates } });
                 } else {
                    console.error('Error al obtener los candidatos recomendados:', response);
                    alert('Error al obtener los candidatos recomendados')
                    this.loading = false;
                 }

            },
            error: err => {
                console.error('Error en la solicitud:', err);
                alert('Error al realizar la solicitud')
               this.loading = false;
            }
        });
    }

    getFileIcon(fileObj: { file: File }): string {
        const extension = fileObj.file.name.split('.').pop()?.toLowerCase();

        switch (extension) {
            case 'pdf':
                return 'fas fa-file-pdf text-red-500';
            case 'doc':
            case 'docx':
                return 'fas fa-file-word text-blue-500';
            case 'xls':
            case 'xlsx':
                return 'fas fa-file-excel text-green-500';
            case 'ppt':
            case 'pptx':
                return 'fas fa-file-powerpoint text-orange-500';
            case 'jpeg':
            case 'jpg':
            case 'png':
            case 'gif':
                return 'fas fa-file-image text-yellow-500';
            case 'mp4':
                return 'fas fa-file-video text-purple-500';
            default:
                return 'fas fa-file text-gray-500';
        }
    }
}