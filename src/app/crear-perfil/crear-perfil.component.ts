import { Component } from '@angular/core';

interface Entry {
  value: string;
  weight: number;
}

interface Subsection {
  id: number;
  name: string;
  totalWeight: number;
  options: string[];
  filteredOptions: string[]; // Lista de opciones filtradas
  selectedOption: string; // Opción seleccionada o escrita
  showDropdown: boolean; // Para mostrar/ocultar el dropdown
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
          options: ['Tecnología', 'Recursos Humanos', 'Educación', 'Administración'],
          filteredOptions: ['Tecnología', 'Recursos Humanos', 'Educación', 'Administración'],
          selectedOption: '',
          showDropdown: false
        },
        {
          id: 2,
          name: 'Nivel de Estudio',
          totalWeight: 0,
          options: ['Graduado', 'En Curso', 'Abandonado'],
          filteredOptions: ['Graduado', 'En Curso', 'Abandonado'],
          selectedOption: '',
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
          options: ['Español', 'Inglés', 'Francés'],
          filteredOptions: ['Español', 'Inglés', 'Francés'],
          selectedOption: '',
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
          options: ['Liderazgo', 'Trabajo en Equipo', 'Comunicación'],
          filteredOptions: ['Liderazgo', 'Trabajo en Equipo', 'Comunicación'],
          selectedOption: '',
          showDropdown: false
        },
        {
          id: 5,
          name: 'Habilidades Técnicas',
          totalWeight: 0,
          options: ['Programación', 'Análisis de Datos', 'Diseño Gráfico'],
          filteredOptions: ['Programación', 'Análisis de Datos', 'Diseño Gráfico'],
          selectedOption: '',
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
          options: ['Gerente', 'Analista', 'Asistente'],
          filteredOptions: ['Gerente', 'Analista', 'Asistente'],
          selectedOption: '',
          showDropdown: false
        },
        {
          id: 7,
          name: 'Área de Trabajo',
          totalWeight: 0,
          options: ['Finanzas', 'Ventas', 'Producción', 'Administración'],
          filteredOptions: ['Finanzas', 'Ventas', 'Producción', 'Administración'],
          selectedOption: '',
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
          options: [],
          filteredOptions: [],
          selectedOption: '',
          showDropdown: false
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
    const query = subsection.selectedOption.toLowerCase();
    subsection.filteredOptions = subsection.options.filter(option =>
      option.toLowerCase().includes(query)
    );
    subsection.showDropdown = true; // Mostrar el dropdown mientras se escribe
  }
  
  selectOption(subsection: Subsection, option: string): void {
    subsection.selectedOption = option; // Establecer la opción seleccionada
    subsection.showDropdown = false; // Ocultar el dropdown
  }
  
  hideDropdown(subsection: Subsection): void {
    setTimeout(() => {
      subsection.showDropdown = false;
    }, 200); // Esperar para evitar conflictos con el clic en las opciones
  }
  
}