import { Component } from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { Parte } from "./parte";
import { ParteService } from "./parte.service";
import { Operario } from "../operarios/operario";
import { OperarioService } from "../operarios/operario.service";
import { ModalService } from "../modal.service";
import { Observable, of, OperatorFunction } from "rxjs";
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  tap,
  switchMap,
  map,
} from "rxjs/operators";
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
import { DataPackage } from "../data-package";
import { Validacion } from "./validacion";

@Component({
  selector: "app-partes",
  template: `
    <div class="componente-con-espacio">
      <h2>
        Partes Día/Operario&nbsp;
        <span *ngIf="estado === 'válido'" class="badge text-bg-success"
          >Válido</span
        >
        <span *ngIf="estado === 'validado'" class="badge text-bg-success"
          >Validado</span
        >
        <span *ngIf="estado === 'inválido'" class="badge text-bg-danger"
          >Inválido</span
        >
        <span *ngIf="estado === 'A validar'" class="badge text-bg-warning"
          >A validar</span
        >

      </h2>
      <div class="componente-con-espacio">
        <div class="row row-cols-lg-auto g-3 align-items-center">
          <div class="col-12">
            <label for="fecha" class="form-label">Fecha</label>
          </div>
          <div class="col-12">
            <div class="input-group">
              <input
                class="form-control"
                placeholder="yyyy-mm-dd"
                name="dp"
                [(ngModel)]="model"
                id="fecha"
                (ngModelChange)="onDateChange($event)"
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
          <div class="col-12">
            <label for="operario" class="form-label">Operario</label>
          </div>
          <div class="col-12">
            <input
              [(ngModel)]="operario"
              name="operario"
              class="form-control"
              [ngbTypeahead]="searchOperario"
              [resultFormatter]="resultFormat"
              [inputFormatter]="inputFormat"
              type="text"
            />
          </div>
          <div class="col-12">
            <button type="submit" (click)="getPartes()" class="btn btn-success">
              Buscar
            </button>
          </div>
          <div class="col-12">
            <button
              type="button"
              (click)="forzarValidacion()"
              class="btn btn-danger"
              [disabled]="partes.length == 0"
            >
              Forzar Validacion
            </button>
          </div>
        </div>
      </div>
      <div class="table-responsive componente-con-espacio">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Fecha</th>
              <th>Operario</th>
              <th>Proyecto</th>
              <th>Tarea</th>
              <th>Desde</th>
              <th>Hasta</th>
              <th>Total</th>
              <th>Logs</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let parte of partes; index as i">
              <td>{{ i + 1 }}</td>
              <td>{{ parte.fecha }}</td>
              <td>
                ({{ parte.operario.legajo }}) - {{ parte.operario.nombre }}
              </td>
              <td>
                ({{ parte.proyecto.codigo }}) - {{ parte.proyecto.descripcion }}
              </td>
              <td>
                ({{ parte.tarea.codigo }}) - {{ parte.tarea.descripcion }}
              </td>
              <td>{{ parte.horaDesde }}</td>
              <td>{{ parte.horaHasta }}</td>
              <td>{{ calcularTotal(parte) }}</td>
              <td>
                <a routerLink="/partes/{{ parte.id }}">
                  <i class="fa fa-plus" aria-hidden="true"></i>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
        <div *ngIf="validaciones.length > 0" class="componente-con-espacio">
          <h3>Logs&nbsp;</h3>
          <div class="table-responsive">
            <table class="table table-striped table-sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Tipo</th>
                  <th>Nombre</th>
                  <th>Descripcion</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let val of validaciones; index as i">
                  <td>{{ i + 1 }}</td>
                  <td>{{ val.tipo }}</td>
                  <td>{{ val.nombre }}</td>
                  <td>{{ val.descripcion }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class PartesComponent {
  fecha!: string;
  operario!: Operario;
  partes: Parte[] = <Parte[]>[];
  searching: boolean = false;
  searchFailed: boolean = false;
  mySet: Set<Validacion> = new Set();
  validaciones: Validacion[] = <Validacion[]>[];
  model!: NgbDateStruct;
  hayPartes!: boolean;
  estado!: string;

  constructor(
    private partesService: ParteService,
    private operarioService: OperarioService,
    private route: ActivatedRoute,
    private location: Location,
    private modalService: ModalService,
    private parser: NgbDateParserFormatter,
    private calendar: NgbCalendar
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.fecha = params["fecha"] || new Date();
      this.model = this.parser.parse(this.fecha)!;
      this.getOperario(params["legajo"]);
      // console.log(this.partes);
    });
  }

  getPartes(): void {
    this.partesService
      .getPartesOperario(this.fecha, this.operario.legajo)
      .subscribe((dataPackage) => {
        this.partes = <Parte[]>dataPackage.data;
        const uniqueValidacionParteMO = new Map();
        this.partes.forEach((parte) => {
          if (parte.logValidacionParteMO)
            parte.logValidacionParteMO.forEach((log) => {
              uniqueValidacionParteMO.set(
                log.validacionParteMO.id,
                log.validacionParteMO
              );
            });
        });
        this.validaciones = Array.from(uniqueValidacionParteMO.values());
        this.hayPartes = this.partes.length > 0;
        this.getEstado();
      });
  }

  getOperario(legajo: number): void {
    this.operarioService.getByLegajo(legajo).subscribe((dataPackage) => {
      this.operario = <Operario>dataPackage.data;
      this.getPartes();
    });
  }

  onFechaChange(): void {
    this.getPartes();
  }

  goBack(): void {
    this.location.back();
  }

  forzarValidacion(): void {
    this.modalService
      .confirm(
        "Forzar validacion",
        "¿Está seguro de forzar la validacion de este resumen?",
        " "
      )
      .then(
        () => {
          this.partes.forEach((parte) =>
            this.partesService
              .forzarValidacion(parte)
              .subscribe((dataPackage) => {
                parte = <Parte>dataPackage.data;
                this.goBack();
              })
          );
        },
        () => {}
      );
  }

  resultFormat(value: any) {
    return value && value.legajo && value.nombre
      ? `${value.legajo} - ${value.nombre}`
      : "";
  }

  inputFormat(value: any) {
    return value && value.legajo && value.nombre
      ? `${value.legajo} - ${value.nombre}`
      : "";
  }

  searchOperario = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => (this.searching = true)),
      switchMap((term) =>
        this.operarioService.search(term).pipe(
          map((response) => <[Operario]>response.data),
          tap(() => (this.searchFailed = false)),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          })
        )
      ),
      tap(() => (this.searching = false))
    );

  calcularTotal(parte: Parte): string {
    const horaDesde = new Date(`2000-01-01T${parte.horaDesde}`);
    const horaHasta = new Date(`2000-01-01T${parte.horaHasta}`);
    const diff = Math.abs(horaHasta.getTime() - horaDesde.getTime());
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const total = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}`;
    return total;
  }

  onDateChange(date: NgbDateStruct): void {
    this.fecha = this.parser.format(date);
  }

  getEstado(): void {
    let estados = new Set<string>();
    this.partes.map((parte) => {
      estados.add(parte.estado.nombre);
    });

    if(estados.has("generado") || estados.has('corregido'))
      this.estado = "A validar";
    else
     this.estado = Array.from(estados)[0];

    console.log(this.estado);
  }
}
