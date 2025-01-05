import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CrearPerfilComponent } from './crear-perfil/crear-perfil.component';
import { VerPdfComponent } from './ver-pdf/ver-pdf.component';
import { CandidatoIdoneoComponent } from './candidato-idoneo/candidato-idoneo.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'crear-perfil', component: CrearPerfilComponent },
  { path: 'ver-pdf/:id', component: VerPdfComponent},
  { path: 'candidato-idoneo', component: CandidatoIdoneoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
