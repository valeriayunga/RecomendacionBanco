import { Component } from '@angular/core';

@Component({
  selector: 'app-crear-perfil',
  templateUrl: './crear-perfil.component.html',
  styleUrls: ['./crear-perfil.component.css']
})
export class CrearPerfilComponent {
  sections = [
    {
      name: 'Información Académica',
      totalWeight: 60,
      subsections: [
        { id: 1, name: 'Área de Estudio', weight: 20, value: '', additionalInfo: '' },
        { id: 2, name: 'Nivel de Estudio', weight: 20, value: '', additionalInfo: '' },
        { id: 3, name: 'Estado de Estudio', weight: 20, value: '', additionalInfo: '' },
      ],
    },
    {
      name: 'Idioma',
      totalWeight: 20,
      subsections: [
        { id: 4, name: 'Idioma', weight: 10, value: '', additionalInfo: '' },
        { id: 5, name: 'Nivel de Escritura', weight: 5, value: '', additionalInfo: '' },
        { id: 6, name: 'Nivel de Habla', weight: 5, value: '', additionalInfo: '' },
      ],
    },
  ];

  options = {
    areas: ['Tecnología', 'Recursos Humanos', 'Educación', 'Administración'],
    states: ['Graduado', 'En Curso', 'Abandonado'],
    languages: ['Español', 'Inglés', 'Francés'],
  };

  newArea: string = '';

  updateWeight(sectionIndex: number, subsectionId: number, event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const weight = parseInt(inputElement.value, 10) || 0;

    const section = this.sections[sectionIndex];
    const subsection = section.subsections.find(sub => sub.id === subsectionId);
    if (subsection) {
      subsection.weight = weight;

      // Actualizar el total de la sección
      section.totalWeight = this.calculateTotalWeight(sectionIndex);
    }
  }

  calculateTotalWeight(sectionIndex: number): number {
    return this.sections[sectionIndex].subsections.reduce(
      (sum, sub) => sum + sub.weight,
      0
    );
  }

  addNewArea(): void {
    if (this.newArea.trim()) {
      this.options.areas.push(this.newArea.trim());
      this.newArea = ''; // Limpiar el campo
    }
  }
}
