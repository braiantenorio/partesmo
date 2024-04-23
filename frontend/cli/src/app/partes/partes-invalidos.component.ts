import { Component, OnInit } from '@angular/core';
import { ParteService } from './parte.service';
import { Informe } from './informe';

@Component({
  selector: "app-partes-invalidos",
  template: `
  <div class="componente-con-espacio">
  <h2>Partes inválidos</h2>
  <div *ngFor="let item of informesAgrupados | keyvalue">
  <h4>{{ item.key }}</h4>
    <table class="table table-striped table-sm">
    <thead>
      <tr>
        <th>#</th>
        <th>Legajo</th>
        <th>Nombre</th>
        <th>Horario Ingreso</th>
        <th>Horario Egreso</th>
        <th>Horas</th>
        <th>Horas Partes</th>
        <th></th>
      </tr>
    </thead>
      <tbody>
        <tr *ngFor="let informe of item.value; index as i">
          <td>{{ i + 1 }}</td>
          <td>{{ informe.legajo }}</td>
          <td>{{ informe.nombre }}</td>
          <td>{{ informe.ingreso }}</td>
          <td>{{ informe.egreso }}</td>
          <td>{{ informe.horas }}</td>
          <td>{{ informe.horasPartes }}</td>
          <td>
              <a [routerLink]="['/partes/informes/validaciones']" [queryParams]="{ fecha: item.key, legajo: informe.legajo }">
                <i class="fa fa-plus" aria-hidden="true"></i>
              </a>
            </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
  `,
  styles: [],
})
export class PartesInvalidosComponent {
  informes: Informe[] = <Informe[]>[];
  informesAgrupados!: Map<Date, Informe[]>;

  constructor(
    private parteService: ParteService,
  ) { }

  ngOnInit() {
    this.getInformes();
  }

  getInformes(): void {
    this.parteService.getInfomesInvalidos().subscribe(dataPackage => { this.informes = <Informe[]>dataPackage.data; this.informesAgrupados = this.groupBy(this.informes) });
  }

  groupBy(array: Informe[]): Map<Date, Informe[]> {
    const groupedMap = new Map<Date, Informe[]>();

    for (const item of array) {
      if (!groupedMap.has(item.fecha)) {
        groupedMap.set(item.fecha, [item]);
      } else {
        groupedMap.get(item.fecha)?.push(item);
      }
    }
    return groupedMap;
  }

}
