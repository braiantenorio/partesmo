import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { EmpresasComponent } from './empresas/empresas.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { ProyectoDetailComponent } from './proyectos/proyecto-detail.component';
import { EmpresaDetailComponent } from './empresas/empresa-detail.component';
import { OperariosComponent } from './operarios/operarios.component';
import { OperarioDetailComponent } from './operarios/operario-detail.component';
import { PartesInformesComponent } from './partes/partes-informes.component';
import { ParteDetailComponent } from './partes/parte-detail.component';
import { PartesInvalidosComponent } from './partes/partes-invalidos.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { PartesComponent } from './partes/partes.component';
import { ChartsComponent } from './charts/charts.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EmpresasComponent,
    EmpresaDetailComponent,
    ProyectosComponent,
    ProyectoDetailComponent,
    OperariosComponent,
    OperarioDetailComponent,
    PartesInformesComponent,
    ParteDetailComponent,
    PartesInvalidosComponent,
    PartesComponent,
    ChartsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    NgbDropdownModule,
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
