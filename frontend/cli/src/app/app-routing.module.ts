import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EmpresasComponent } from './empresas/empresas.component';
import { EmpresaDetailComponent } from './empresas/empresa-detail.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { ProyectoDetailComponent } from './proyectos/proyecto-detail.component';
import { OperariosComponent } from './operarios/operarios.component';
import { OperarioDetailComponent } from './operarios/operario-detail.component';
import { PartesInformesComponent } from './partes/partes-informes.component';
import { ParteDetailComponent } from './partes/parte-detail.component';
import { PartesInvalidosComponent } from './partes/partes-invalidos.component';
import { PartesComponent } from './partes/partes.component';
import { ChartsComponent } from './charts/charts.component';

const routes: Routes = [{ path: '', component: HomeComponent },
{ path: 'empresas', component: EmpresasComponent },
{ path: 'empresas/:id', component: EmpresaDetailComponent },
{ path: 'proyectos', component: ProyectosComponent },
{ path: 'proyectos/:id', component: ProyectoDetailComponent },
{ path: 'operarios', component: OperariosComponent},
{ path: 'operarios/:id', component: OperarioDetailComponent},
{ path: 'partes/informes', component: PartesInformesComponent},
{ path: 'partes/:id', component: ParteDetailComponent},
{ path: 'partes/informes/invalidos', component: PartesInvalidosComponent},
{ path: 'partes/informes/validaciones', component: PartesComponent},
{ path: 'estadisticas', component: ChartsComponent},]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
