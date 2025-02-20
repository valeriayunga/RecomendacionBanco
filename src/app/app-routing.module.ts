import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CrearPerfilComponent } from './crear-perfil/crear-perfil.component';
import { VerPdfComponent } from './ver-pdf/ver-pdf.component';
import { CandidatoIdoneoComponent } from './candidato-idoneo/candidato-idoneo.component';
import { BuscarCandidatoComponent } from './buscar-candidato/buscar-candidato.component';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'crear-perfil', component: CrearPerfilComponent },
  { path: 'ver-pdf/:id', component: VerPdfComponent},
  { path: 'candidato-idoneo', component: CandidatoIdoneoComponent},
  { path: 'buscar-candidato', component: BuscarCandidatoComponent},
  {path: 'perfil/:_id', component: ProfileDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
