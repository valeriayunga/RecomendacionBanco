import { Component } from '@angular/core';

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
  newSubsectionName: string = '';
  selectedSectionForSubsection: number | null = null;
  currentView: string = 'crear-perfil-estructurado';

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
          options: [], // Inicializar con las opciones que necesites
          filteredOptions: [], // Inicializar vacío
          selectedOptions: [], // Inicializar como array vacío
          showDropdown: false,
          searchQuery: '' // Inicializar como string vacío
        };
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
  
  toggleDropdown(subsection: Subsection): void {
    // Cerrar todos los dropdowns de subsecciones
    this.sections.forEach(section =>
      section.subsections.forEach(sub => (sub.showDropdown = false))
    );
  
    // Abrir el dropdown correspondiente
    subsection.showDropdown = true;
  }
  
  selectOption(subsection: Subsection, option: { id: number; name: string; weight: number }): void {
    if (!subsection.selectedOptions.includes(option.id)) {
      subsection.selectedOptions.push(option.id);
      subsection.searchQuery = option.name; // Mostrar la selección en el input
    }
    subsection.showDropdown = false; // Cerrar el dropdown
  }
  

  isOptionSelected(subsection: Subsection, optionId: number): boolean {
    return subsection.selectedOptions.includes(optionId);
  }

  hideDropdown(subsection: Subsection): void {
    setTimeout(() => {
      subsection.showDropdown = false;
    }, 200); // Esperar para evitar conflictos con el clic en las opciones
  }

}