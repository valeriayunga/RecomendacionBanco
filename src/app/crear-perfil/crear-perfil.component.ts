import { Component, HostListener } from '@angular/core';
import { ApiService } from '../services/api.service';

interface Entry {
  value: string;
  weight: number;
}

interface Subsection {
  id: number;
  name: string;
  totalWeight: number;
  options: Array<{
    id: number;
    name: string;
    weight: number;
  }>;
  filteredOptions: Array<{
    id: number;
    name: string;
    weight: number;
  }>;
  selectedOptions: number[];
  showDropdown: boolean;
  searchQuery: string; // Agregamos esta nueva propiedad
}

interface Section {
  id: number;
  name: string;
  totalWeight: number;
  subsections: Subsection[];
}

@Component({
  selector: 'app-crear-perfil',
  templateUrl: './crear-perfil.component.html',
  styleUrls: ['./crear-perfil.component.css']
})
export class CrearPerfilComponent {
  newSectionName: string = '';
  aiPrompt: string = '';
  newSubsectionName: string = '';
  selectedSectionForSubsection: number | null = null;
  currentView: string = 'crear-perfil-estructurado';
  isLoading: boolean = false;
  profileGenerated: boolean = false;




  constructor(private apiService: ApiService) { }

  sections: Section[] = [
    {
      id: 1,
      name: 'Información Académica',
      totalWeight: 60,
      subsections: [
        {
          id: 1,
          name: 'Área de Estudio',
          totalWeight: 0,
          options: [
            { id: 1, name: 'Tecnología', weight: 0 },
            { id: 2, name: 'Recursos Humanos', weight: 0 },
            { id: 3, name: 'Educación', weight: 0 },
            { id: 4, name: 'Administración', weight: 0 }
          ],
          filteredOptions: [

          ],
          selectedOptions: [],
          searchQuery: '',
          showDropdown: false,

        },
        {
          id: 2,
          name: 'Nivel de Estudio',
          totalWeight: 0,
          options: [
            { id: 5, name: 'Graduado', weight: 0 },
            { id: 6, name: 'En Curso', weight: 0 },
            { id: 7, name: 'Abandonado', weight: 0 }
          ],
          filteredOptions: [

          ],
          selectedOptions: [],
          searchQuery: '',
          showDropdown: false
        }
      ]
    },
    {
      id: 2,
      name: 'Idioma',
      totalWeight: 20,
      subsections: [
        {
          id: 3,
          name: 'Idiomas',
          totalWeight: 0,
          options: [
            { id: 8, name: 'Español', weight: 0 },
            { id: 9, name: 'Inglés', weight: 0 },
            { id: 10, name: 'Francés', weight: 0 }
          ],
          filteredOptions: [
            { id: 8, name: 'Español', weight: 0 },
            { id: 9, name: 'Inglés', weight: 0 },
            { id: 10, name: 'Francés', weight: 0 }
          ],
          selectedOptions: [],
          searchQuery: '',
          showDropdown: false
        }
      ]
    },
    {
      id: 3,
      name: 'Habilidades',
      totalWeight: 20,
      subsections: [
        {
          id: 4,
          name: 'Habilidades Blandas',
          totalWeight: 0,
          options: [
            { id: 11, name: 'Liderazgo', weight: 0 },
            { id: 12, name: 'Trabajo en Equipo', weight: 0 },
            { id: 13, name: 'Comunicación', weight: 0 }
          ],
          filteredOptions: [
            { id: 11, name: 'Liderazgo', weight: 0 },
            { id: 12, name: 'Trabajo en Equipo', weight: 0 },
            { id: 13, name: 'Comunicación', weight: 0 }
          ],
          selectedOptions: [],
          searchQuery: '',
          showDropdown: false
        },
        {
          id: 5,
          name: 'Habilidades Técnicas',
          totalWeight: 0,
          options: [
            { id: 14, name: 'Programación', weight: 0 },
            { id: 15, name: 'Análisis de Datos', weight: 0 },
            { id: 16, name: 'Diseño Gráfico', weight: 0 }
          ],
          filteredOptions: [
            { id: 14, name: 'Programación', weight: 0 },
            { id: 15, name: 'Análisis de Datos', weight: 0 },
            { id: 16, name: 'Diseño Gráfico', weight: 0 }
          ],
          selectedOptions: [],
          searchQuery: '',
          showDropdown: false
        }
      ]
    },
    {
      id: 4,
      name: 'Experiencia Laboral',
      totalWeight: 20,
      subsections: [
        {
          id: 6,
          name: 'Nombre del Puesto',
          totalWeight: 0,
          options: [
            { id: 17, name: 'Gerente', weight: 0 },
            { id: 18, name: 'Analista', weight: 0 },
            { id: 19, name: 'Asistente', weight: 0 }
          ],
          filteredOptions: [
            { id: 17, name: 'Gerente', weight: 0 },
            { id: 18, name: 'Analista', weight: 0 },
            { id: 19, name: 'Asistente', weight: 0 }
          ],
          selectedOptions: [],
          searchQuery: '',
          showDropdown: false
        },
        {
          id: 7,
          name: 'Área de Trabajo',
          totalWeight: 0,
          options: [
            { id: 20, name: 'Finanzas', weight: 0 },
            { id: 21, name: 'Ventas', weight: 0 },
            { id: 22, name: 'Producción', weight: 0 },
            { id: 23, name: 'Administración', weight: 0 }
          ],
          filteredOptions: [
            { id: 20, name: 'Finanzas', weight: 0 },
            { id: 21, name: 'Ventas', weight: 0 },
            { id: 22, name: 'Producción', weight: 0 },
            { id: 23, name: 'Administración', weight: 0 }
          ],
          selectedOptions: [],
          searchQuery: '',
          showDropdown: false
        }
      ]
    }
  ];




  private getNextSectionId(): number {
    return Math.max(...this.sections.map(s => s.id), 0) + 1;
  }

  private getNextSubsectionId(): number {
    return Math.max(...this.sections.flatMap(s => s.subsections.map(sub => sub.id)), 0) + 1;
  }

  addSection(): void {
    if (this.newSectionName.trim()) {
      const newSection: Section = {
        id: this.getNextSectionId(),
        name: this.newSectionName,
        totalWeight: 0,
        subsections: []
      };
      this.sections.push(newSection);
      this.newSectionName = '';
    }
  }

  addSubsection(sectionId: number): void {
    if (this.newSubsectionName.trim()) {
      const section = this.sections.find(s => s.id === sectionId);
      if (section) {
        const newSubsection: Subsection = {
          id: this.getNextSubsectionId(),
          name: this.newSubsectionName,
          totalWeight: 0,
          options: [], // Inicializa con opciones vacías (puedes llenarlas después)
          filteredOptions: [], // Copia las opciones desde el inicio
          selectedOptions: [],
          showDropdown: false,
          searchQuery: ''
        };

        newSubsection.filteredOptions = [...newSubsection.options]; // Asegurar que tenga opciones disponibles
        section.subsections.push(newSubsection);
        this.newSubsectionName = '';
        this.selectedSectionForSubsection = null;
      }
    }
  }



  removeSection(sectionId: number): void {
    const index = this.sections.findIndex(s => s.id === sectionId);
    if (index !== -1) {
      this.sections.splice(index, 1);
    }
  }

  removeSubsection(sectionId: number, subsectionId: number): void {
    const section = this.sections.find(s => s.id === sectionId);
    if (section) {
      const index = section.subsections.findIndex(sub => sub.id === subsectionId);
      if (index !== -1) {
        section.subsections.splice(index, 1);
      }
    }
  }

  calculateTotalWeight(sectionIndex: number): number {
    const section = this.sections[sectionIndex];
    const total = section.subsections.reduce((sum, subsection) => {
      return sum + (subsection.totalWeight || 0);
    }, 0);
    return total;
  }

  navigateTo(view: string): void {
    this.currentView = view;
  }

  filterOptions(subsection: Subsection): void {
    const query = subsection.searchQuery.toLowerCase();
    subsection.filteredOptions = subsection.options.filter(option =>
      option.name.toLowerCase().includes(query)
    );
  }
  toggleOption(subsection: Subsection, optionId: number): void {
    const index = subsection.selectedOptions.indexOf(optionId);

    if (index === -1) {
      subsection.selectedOptions.push(optionId);

      // Asignar un peso predeterminado si es necesario
      const option = subsection.options.find(opt => opt.id === optionId);
      if (option && option.weight === 0) {
        option.weight = 10; // Ajusta este valor si es necesario
      }
    } else {
      subsection.selectedOptions.splice(index, 1);
    }

    this.calculateSubsectionWeight(subsection);
  }

  calculateSubsectionWeight(subsection: Subsection): void {
    subsection.totalWeight = subsection.options.reduce((total, option) => {
      return subsection.selectedOptions.includes(option.id) ? total + option.weight : total;
    }, 0);

    this.calculateSectionWeight();
  }

  calculateSectionWeight(): void {
    this.sections.forEach(section => {
      section.totalWeight = section.subsections.reduce((total, subsection) => total + subsection.totalWeight, 0);
    });
  }

  // NUEVO: Función para actualizar el peso de la opción y recalcular
  updateSubsectionWeight(subsection: Subsection, section: Section): void {
    this.calculateSubsectionWeight(subsection);
  }

  updateProfile(): void {
    this.isLoading = true;
    const transformedProfile = this.transformSections();

    this.apiService.publishProfile(transformedProfile).subscribe(
      (response) => {
        console.log("Perfil actualizado correctamente:", response);
        alert("El perfil se ha actualizado con éxito.");
      },
      (error) => {
        console.error("Error al actualizar el perfil:", error);
        alert("Hubo un error al actualizar el perfil.");
      }
    ).add(() => {
      this.isLoading = false;
    });
  }







  toggleDropdown(subsection: Subsection): void {
    // Cerrar otros dropdowns antes de abrir el actual
    this.sections.forEach(section => {
      section.subsections.forEach(sub => {
        if (sub !== subsection) {
          sub.showDropdown = false;
        }
      });
    });

    // Alternar el dropdown de la subsección actual
    subsection.showDropdown = !subsection.showDropdown;
  }


  // Cerrar el menú cuando se haga clic fuera
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    this.sections.forEach(section => {
      section.subsections.forEach(subsection => {
        const targetElement = event.target as HTMLElement;
        if (!targetElement.closest('.dropdown-container')) {
          subsection.showDropdown = false;
        }
      });
    });
  }


  selectOption(subsection: Subsection, option: { id: number; name: string; weight: number }): void {
    // Verificar si la opción ya está seleccionada
    const index = subsection.selectedOptions.indexOf(option.id);
    if (index === -1) {
      // Agregar la opción si no está seleccionada
      subsection.selectedOptions.push(option.id);
    } else {
      // Remover la opción si ya está seleccionada
      subsection.selectedOptions.splice(index, 1);
    }

    // Actualizar el texto mostrado en el dropdown con todas las opciones seleccionadas
    subsection.searchQuery = subsection.options
      .filter(opt => subsection.selectedOptions.includes(opt.id))
      .map(opt => opt.name)
      .join(", ");

    // Cerrar el dropdown después de seleccionar
    subsection.showDropdown = false;
  }



  isOptionSelected(subsection: Subsection, optionId: number): boolean {
    return subsection.selectedOptions.includes(optionId);
  }

  hideDropdown(subsection: Subsection): void {
    setTimeout(() => {
      subsection.showDropdown = false;
    }, 200); // Esperar para evitar conflictos con el clic en las opciones
  }


  printProfile(): void {
    const profileData = this.transformSections();
    console.log("Perfil Transformado:", JSON.stringify(profileData, null, 2));
  }


  transformSections(): any {
    const transformedData = {
      "Secciones": [] as Array<{
        name: string;
        ponderacion: number;
        Subsecciones: Array<{
          name: string;
          values: Array<{ name: string; ponderacion: number }>;
          ponderacion: number;
        }>
      }>,
      "Tag": "Transformación e Innovación" // Puedes hacerlo dinámico si lo deseas
    };

    this.sections.forEach(section => {
      const transformedSection = {
        name: section.name,
        ponderacion: section.totalWeight,
        Subsecciones: [] as Array<{
          name: string;
          values: Array<{ name: string; ponderacion: number }>;
          ponderacion: number;
        }>
      };

      section.subsections.forEach(subsection => {
        const selectedValues = subsection.options
          .filter(option => subsection.selectedOptions.includes(option.id))
          .map(option => ({
            name: option.name,
            ponderacion: option.weight
          }));

        transformedSection.Subsecciones.push({
          name: subsection.name,
          values: selectedValues,
          ponderacion: subsection.totalWeight
        });
      });

      transformedData.Secciones.push(transformedSection);
    });

    return transformedData;
  }

  sendProfile(): void {
    this.isLoading = true;
    const transformedProfile = this.transformSections(); // Convertir el formulario a JSON

    this.apiService.publishProfile(transformedProfile).subscribe(
        (response) => {
            console.log("Perfil actualizado correctamente:", response);
            alert("El perfil se ha actualizado con éxito.");
        },
        (error) => {
            console.error("Error al actualizar el perfil:", error);
            alert("Hubo un error al actualizar el perfil.");
        }
    ).add(() => {
        this.isLoading = false;
    });
}


  generateAIProfile(): void {
    if (!this.aiPrompt.trim()) {
      alert("Por favor ingresa un prompt antes de generar el perfil.");
      return;
    }

    this.isLoading = true;

    this.apiService.getAIProfile(this.aiPrompt).subscribe(
      (response) => {
        console.log("Respuesta IA:", response);
        this.sections = this.parseAPIResponseToSections(response.data); // Transformar la respuesta
        this.profileGenerated = true; // Indica que los datos vienen de IA
        this.currentView = 'crear-perfil-estructurado'; // Cambia la vista
      },
      (error) => {
        console.error("Error al obtener el perfil de IA:", error);
        alert("Hubo un error al generar el perfil.");
      }
    ).add(() => {
      this.isLoading = false; // Deshabilita la carga
    });
  }




  parseAPIResponseToSections(apiResponse: any): Section[] {
    return apiResponse.Secciones.map((sectionData: any, sectionIndex: number) => ({
      id: sectionIndex + 1, // ID autogenerado
      name: sectionData.name,
      totalWeight: sectionData.ponderacion,
      subsections: sectionData.Subsecciones.map((subData: any, subIndex: number) => ({
        id: subIndex + 1,
        name: subData.name,
        totalWeight: subData.ponderacion,
        options: subData.values.map((value: any, optionIndex: number) => ({
          id: optionIndex + 1,
          name: value.name,
          weight: value.ponderacion
        })),
        filteredOptions: subData.values.map((value: any, optionIndex: number) => ({
          id: optionIndex + 1,
          name: value.name,
          weight: value.ponderacion
        })),
        selectedOptions: subData.values
          .filter((value: any) => value.ponderacion > 0) // Solo selecciona opciones con peso mayor a 0
          .map((value: any, optionIndex: number) => optionIndex + 1),
        searchQuery: '',
        showDropdown: false
      }))
    }));
  }










}