import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  selectedProfile: string = ''; // o establece un valor por defecto

  selectProfile(profile: string) {
    this.selectedProfile = profile;
  }

}
