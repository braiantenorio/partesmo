import { Component, OnInit } from '@angular/core';
import { Empresa } from './empresa';
import { EmpresaService } from './empresa.service';

@Component({
  selector: "app-empresas",
  template: `
  <div class="componente-con-espacio">

  <h2>Empresas&nbsp;
    <a routerLink="/empresas/new" class="btn btn-success float-right">Nuevo cliente</a>
  </h2>
  <div class="table-responsive">
    <table class="table table-striped table-sm">
        <thead>
            <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Cuit</th>
                <th>Observaciones</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr *ngFor="let empresa of empresas; index as i">
                <td>{{ i + 1 }}</td>
                <td>{{ empresa.nombre }}</td>
                <td>{{ empresa.cuit }}</td>
                <td>{{ empresa.observaciones }}</td>
                <td>
                  <a (click)="eliminarEmpresa(empresa.id)">
                    <i class="fa fa-trash"></i>
                  </a>
                </td>
                <td>
                  <a routerLink="/empresas/{{ empresa.id }}">
                    <i class="fa fa-pencil"></i>
                  </a>
                </td>
            </tr>
        </tbody>
    </table>
  </div>
  `,
  styles: [],
})
export class EmpresasComponent {
  empresas: Empresa[] = <Empresa[]>[];

  constructor(
    private empresaService: EmpresaService,
    ) { }

  ngOnInit() {
    this.getEmpresas();
  }

  getEmpresas(): void {
    this.empresaService.all().subscribe(dataPackage => this.empresas = <Empresa[]>dataPackage.data);
  }

  eliminarEmpresa(id: number): void{
    this.empresaService.delete(id).subscribe(() => {this.getEmpresas();});
  }


}
