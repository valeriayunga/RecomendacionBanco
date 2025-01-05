import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CrearPerfilComponent } from './crear-perfil/crear-perfil.component';
import { FormsModule } from '@angular/forms';
import { VerPdfComponent } from './ver-pdf/ver-pdf.component';
import { HttpClientModule } from '@angular/common/http';
import { CandidatoIdoneoComponent } from './candidato-idoneo/candidato-idoneo.component';
import { BuscarCandidatoComponent } from './buscar-candidato/buscar-candidato.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidebarComponent,
    CrearPerfilComponent,
    VerPdfComponent,
    CandidatoIdoneoComponent,
    BuscarCandidatoComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
