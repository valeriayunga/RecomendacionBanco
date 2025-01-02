import { Component } from '@angular/core';

@Component({
  selector: 'app-crear-perfil',
  templateUrl: './crear-perfil.component.html',
  styleUrls: ['./crear-perfil.component.css']
})
export class CrearPerfilComponent {
  isOpen = false;
  searchValue = '';
  selectedAreas: any[] = [];
  areas = [
    { id: 1, name: 'Ingenieria en Telecomunicaciones', weight: 0, selected: false },
    { id: 2, name: 'Ingenieria en Empresas', weight: 0, selected: false },
    { id: 3, name: 'Ingenieria Ambiental', weight: 0, selected: false },
    { id: 4, name: 'Ingenieria Computacion', weight: 0, selected: false },
    { id: 5, name: 'Ingenieria Turismo', weight: 0, selected: false },
    { id: 6, name: 'Licenciado en Computacion', weight: 0, selected: false },
    { id: 7, name: 'Bellas Artes', weight: 0, selected: false },
    { id: 8, name: 'Ciencias Politicas', weight: 0, selected: false }
  ];

  get filteredAreas() {
    return this.areas.filter(area =>
      area.name.toLowerCase().includes(this.searchValue.toLowerCase())
    );
  }

  get totalWeight() {
    return this.selectedAreas.reduce((sum, area) => sum + area.weight, 0);
  }

  isAreaSelected(areaId: number): boolean {
    return this.selectedAreas.some(area => area.id === areaId);
  }

  toggleArea(area: any): void {
    if (this.isAreaSelected(area.id)) {
      this.selectedAreas = this.selectedAreas.filter(a => a.id !== area.id);
    } else {
      this.selectedAreas = [...this.selectedAreas, { ...area }];
    }
  }

  updateWeight(areaId: number, event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.value) {
      const weight = parseInt(inputElement.value, 10);
      this.selectedAreas = this.selectedAreas.map(area =>
        area.id === areaId ? { ...area, weight: isNaN(weight) ? 0 : weight } : area
      );
    }
  }

}
