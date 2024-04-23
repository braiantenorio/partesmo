import { Component } from "@angular/core";
import { Informe } from "./informe";
import { ParteService } from "./parte.service";
import { ModalService } from "../modal.service";
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";

import {
  NgbCalendar,
  NgbDate,
  NgbDateAdapter,
  NgbDateNativeAdapter,
  NgbDateNativeUTCAdapter,
  NgbDatepickerModule,
  NgbDateStruct,
  NgbInputDatepickerConfig,
  NgbDateParserFormatter,
} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-partes-informes",
  template: `
    <div class="componente-con-espacio">
      <h2>
        Informe Partes&nbsp;
        <a (click)="validar()" class="btn btn-success float-right">Validar</a>
        <span class="col col-form-label" *ngIf="loading">  Loading...</span>
      </h2>
      <div class="col-md-12">
        <div class="row">
          <div class="col-md-2">
            <label for="fecha" class="form-label">Fecha</label>
            <div class="input-group">
              <input
                class="form-control"
                placeholder="yyyy-mm-dd"
                name="dp"
                [(ngModel)]="model"
                (ngModelChange)="onFechaChange($event)"
                ngbDatepicker
                #d="ngbDatepicker"
              />
              <button
                class="btn btn-outline-secondary fa fa-calendar"
                (click)="d.toggle()"
                type="button"
              ></button>
            </div>
          </div>
        </div>
      </div>
      <div class="table-responsive componente-con-espacio">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Estado</th>
              <th>Legajo</th>
              <th>Nombre</th>
              <th style="text-align: center;">Horario Ingreso</th>
              <th style="text-align: center;">Horario Egreso</th>
              <th style="text-align: center;">Horas</th>
              <th style="text-align: center;">Horas Partes</th>
              <th style="text-align: center;">Partes</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let informe of informes; index as i">
              <td>{{ i + 1 }}</td>
              <td>
                <span
                  *ngIf="informe.estado === 'válido'"
                  class="badge text-bg-success"
                  >Válido</span
                >
                <span
                  *ngIf="informe.estado === 'validado'"
                  class="badge text-bg-success"
                  >Validado</span
                >
                <span
                  *ngIf="informe.estado === 'inválido'"
                  class="badge text-bg-danger"
                  >Inválido</span
                >
                <span
                  *ngIf="informe.estado === 'A Validar'"
                  class="badge text-bg-warning"
                  >A validar</span
                >
              </td>
              <td>{{ informe.legajo }}</td>
              <td>{{ informe.nombre }}</td>
              <td style="text-align: center;">{{ informe.ingreso }}</td>
              <td style="text-align: center;">{{ informe.egreso }}</td>
              <td style="text-align: center;">{{ informe.horas }}</td>
              <td style="text-align: center;">{{ informe.horasPartes }}</td>
              <td style="text-align: center;">
                <a
                  [routerLink]="['/partes/informes/validaciones']"
                  [queryParams]="{ fecha: fecha, legajo: informe.legajo }"
                >
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
export class PartesInformesComponent {
  fecha!: string;
  informes: Informe[] = <Informe[]>[];
  model!: NgbDateStruct;
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private partesService: ParteService,
    private parser: NgbDateParserFormatter,
    private calendar: NgbCalendar,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.fecha = this.parser.format(this.calendar.getToday());
    this.model = this.calendar.getToday();
    this.getInformes();
  }

  getInformes(): void {
    this.partesService.getInformes(this.fecha).subscribe((dataPackage) => {
      this.informes = <Informe[]>dataPackage.data;
      this.informes.forEach((informe) =>
        this.partesService
          .getEstadoInforme(this.fecha, informe.legajo)
          .subscribe(
            (dataPackage) =>
              (informe.estado = dataPackage.data as unknown as string)
          )
      );
      console.log(this.informes);
    });
  }

  refresh(): void {
    this.location.go(this.location.path());
    window.location.reload();
  }

  onFechaChange(date: NgbDateStruct): void {
    this.fecha = this.parser.format(date);
    this.getInformes();
  }

  validar(): void {
    this.modalService
      .confirm(
        "Validar partes",
        "¿Está seguro de validar los partes a la fecha indicada?",
        " "
      )
      .then(
        () => {
          this.loading = true;
          this.partesService.validar(this.fecha).subscribe((dataPackage) => {
            this.refresh();
            this.loading = false;
          });
        },
        () => {}
      );
  }
}
