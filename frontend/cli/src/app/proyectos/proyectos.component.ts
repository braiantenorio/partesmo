import { Component, OnInit } from '@angular/core';
import { Proyecto } from './proyecto';
import { ProyectoService } from './proyecto.service';

@Component({
  selector: "app-proyectos",
  template: `
  <div class="componente-con-espacio">

  <h2>Proyectos&nbsp;
    <a routerLink="/proyectos/new" class="btn btn-success float-right">Nuevo proyecto</a>
  </h2>
  <div class="table-responsive">
    <table class="table table-striped table-sm">
        <thead>
            <tr>
                <th>#</th>
                <th>Codigo</th>
                <th>Descripcion</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr *ngFor="let proyecto of proyectos; index as i">
                <td>{{ i + 1 }}</td>
                <td>{{ proyecto.codigo }}</td>
                <td>{{ proyecto.descripcion }}</td>
                <td>
                  <a (click)="eliminarProyecto(proyecto.id)">
                    <i class="fa fa-trash"></i>
                  </a>
                </td>
                <td>
                    <a routerLink="/proyectos/{{ proyecto.id }}">
                        <i class="fa fa-pencil"></i>
                    </a>
                </td>
            </tr>
        </tbody>
    </table>
  </div>
  <div class="componente-con-espacio">

  `,
  styles: [],
})
export class ProyectosComponent {
  proyectos: Proyecto[] = <Proyecto[]>[];

  constructor(
    private proyectosService: ProyectoService,
    ) { }

  ngOnInit() {
    this.getProyectos();
  }

  getProyectos(): void {
    this.proyectosService.all().subscribe(dataPackage => this.proyectos = <Proyecto[]>dataPackage.data);
  }

  eliminarProyecto(id: number): void{
    this.proyectosService.delete(id).subscribe(() => {this.getProyectos();});
  }
}
