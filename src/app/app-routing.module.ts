import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CrearPerfilComponent } from './crear-perfil/crear-perfil.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'crear-perfil', component: CrearPerfilComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
