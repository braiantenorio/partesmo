import { Location, Time } from "@angular/common";
import { Component, Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Parte } from "./parte";
import { ParteService } from "./parte.service";
import { ProyectoService } from "../proyectos/proyecto.service";
import { OperarioService } from "../operarios/operario.service";
import { Proyecto } from "../proyectos/proyecto";
import { Operario } from "../operarios/operario";
import { Tarea } from "../tareas/tarea";
import { Turno } from "../operarios/turno";
import { Observable, of, OperatorFunction } from "rxjs";
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  tap,
  switchMap,
  map,
} from "rxjs/operators";
import { DatePipe } from "@angular/common";
import {
  NgbCalendar,
  NgbDate,
  NgbDateAdapter,
  NgbDateNativeAdapter,
  NgbDateNativeUTCAdapter,
  NgbDatepickerModule,
  NgbDateStruct,
  NgbInputDatepickerConfig,
  NgbDateParserFormatter
} from "@ng-bootstrap/ng-bootstrap";
import { formatDate } from "@angular/common";
import { DataPackage } from "../data-package";
import { ConstantPool } from "@angular/compiler";
import { FormsModule } from '@angular/forms';

@Component({
  selector: "app-parte-detail",
  template: `
    <div class="componente-con-espacio">
      <form #form="ngForm" class="row g-3 needs-validation" novalidate>
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
          </div>
        </div>
        <div class="col-md-4">
          <label for="operario" class="form-label">Operario</label>
          <input
            [(ngModel)]="parte.operario"
            name="operario"
            id="operario"
            class="form-control"
            [ngbTypeahead]="searchOperario"
            [resultFormatter]="resultFormat"
            [inputFormatter]="inputFormat"
            type="text"
            (ngModelChange)="onOperarioChange($event)"
          />
        </div>
        <div class="col-md-4">
          <label for="legajo" class="form-label">Legajo</label>
          <input
            [(ngModel)]="parte.operario.legajo"
            name="legajo"
            id="legajo"
            class="form-control"
            disabled
          />
        </div>
        <div class="col-md-4">
          <label for="turnos" class="form-label">Turno</label>
          <input
            [(ngModel)]="turno.nombre"
            name="turnos"
            id="turnos"
            class="form-control"
            disabled
          />
        </div>
        <div class="col-md-6">
          <label for="proyecto" class="form-label">Proyecto</label>
          <input
            [(ngModel)]="parte.proyecto"
            name="proyecto"
            id="proyecto"
            class="form-control"
            [ngbTypeahead]="searchProyecto"
            [resultFormatter]="resultFormatDescripcion"
            [inputFormatter]="inputFormatDescripcion"
            type="text"
          />
        </div>

        <div class="col-md-6">
          <label for="tareas" class="form-label">Tarea</label>
          <select
            class="form-select"
            name="tareas"
            id="tareas"
            [(ngModel)]="parte.tarea"
            [compareWith]="compareTareas"
          >
            <option
              *ngFor="let tarea of parte.proyecto.tareas"
              [ngValue]="tarea"
            >
              {{ tarea.descripcion }}
            </option>
          </select>
        </div>

        <div class="mb-3 col-md-2">
          <label for="horaDesde" class="form-label">Hora desde</label>
          <input
            [(ngModel)]="parte.horaDesde"
            type="time"
            name="horaDesde"
            id="horaDesde"
            class="form-control"
          />
        </div>
        <div class="mb-3 col-md-2">
          <label for="horaHasta" class="form-label">Hora hasta</label>
          <input
            [(ngModel)]="parte.horaHasta"
            type="time"
            name="horaHasta"
            id="horaHasta"
            class="form-control"
          />
        </div>

        <div class="col-md-2">
          <label for="total" class="form-label">Total</label>
          <input
            name="total"
            id="total"
            class="form-control"
            disabled
            [value]="calculateTotal(parte.horaDesde, parte.horaHasta)"
          />
        </div>

        <div class="col-md-4">
        <label for="supervisor" class="form-label">Supervisor</label>
        <select
          [(ngModel)]="parte.supervisor"
          class="form-control"
          id="categoria"
          name="categoria"
        >
          <option value="Roberto Torres">Roberto Torres</option>
          <option value="Ana Herrera">Ana Herrera</option>
          <option value="Javier Méndez">Javier Méndez</option>
        </select>
      </div>
      </form>
      <div *ngIf="parte.logValidacionParteMO" class="componente-con-espacio">
        <h2>Logs&nbsp;</h2>
        <div class="table-responsive">
          <table class="table table-striped table-sm">
            <thead >
              <tr>
                <th>#</th>
                <th>Tipo</th>
                <th>Nombre</th>
                <th>Descripcion</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr
                *ngFor="let log of this.parte.logValidacionParteMO; index as i"
              >
                <td>{{ i + 1 }}</td>
                <td>{{ log.validacionParteMO.tipo }}</td>
                <td>{{ log.validacionParteMO.nombre }}</td>
                <td>{{ log.validacionParteMO.descripcion }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="d-grid gap-2 d-md-flex componente-con-menos-espacio">
        <button type="submit" (click)="save()" class="btn btn-success">
          Guardar
        </button>
        <button type="button" (click)="goBack()" class="btn btn-danger ">
          Atrás
        </button>
      </div>
    </div>
  `,
  styles: [],
  providers: [NgbDateNativeUTCAdapter ]
})
export class ParteDetailComponent {
  parte!: Parte;
  operario!: Operario;
  turno!: Turno;
  model!: NgbDateStruct;
  searching: boolean = false;
  searchFailed: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private parteService: ParteService,
    private operarioService: OperarioService,
    private proyectoService: ProyectoService,
    private parser: NgbDateParserFormatter,
    private calendar: NgbCalendar

  ) { }

  ngOnInit() {
    this.get();
  }

  get(): void {
    const id = this.route.snapshot.paramMap.get("id")!;
    if (id === "new") {
      this.parte = <Parte>{};
      this.parte.operario = <Operario>{};
      this.parte.tarea = <Tarea>{};
      this.parte.proyecto = <Proyecto>{};
      this.turno = <Turno>{};
      this.model = this.calendar.getToday();
      this.parte.fecha = this.parser.format(this.calendar.getToday());
    } else {
      this.parteService.get(+id).subscribe((dataPackage) => {
        this.parte = <Parte>dataPackage.data;
        this.getTurno();
        console.log(this.parte);
        console.log(this.parte.fecha);
        console.log(this.parser.parse(this.parte.fecha)!);
        this.model = this.parser.parse(this.parte.fecha)!;
        console.log(this.model);
      });
    }
  }

  goBack(): void {
    this.location.back();
  }

  getTurno(): void {
    this.operarioService
      .getTurno(this.parte.operario.legajo, this.parte.fecha)
      .subscribe((dataPackage) => (this.turno = <Turno>dataPackage.data));
  }

  save(): void {
    this.prueba();
    const id = this.route.snapshot.paramMap.get("id")!;
    if (id === "new") {
      this.parteService.add(this.parte).subscribe((parte) => {
        this.parte = this.parte;
        this.goBack();
      });
    } else {
      this.parteService.update(this.parte).subscribe((parte) => {
        this.parte = this.parte;
        this.goBack();
      });
    }
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

  searchProyecto = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => (this.searching = true)),
      switchMap((term) =>
        this.proyectoService.search(term).pipe(
          map((response) => <[Proyecto]>response.data),
          tap(() => (this.searchFailed = false)),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          })
        )
      ),
      tap(() => (this.searching = false))
    );

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

  resultFormatDescripcion(value: any) {
    return value && value.codigo && value.descripcion
      ? `${value.codigo} - ${value.descripcion}`
      : "";
  }

  inputFormatDescripcion(value: any) {
    return value && value.codigo && value.descripcion
      ? `${value.codigo} - ${value.descripcion}`
      : "";
  }

  compareTareas(tarea1: any, tarea2: any): boolean {
    return tarea1 && tarea2 && tarea1.descripcion === tarea2.descripcion;
  }

  prueba(): void {
    const forms = document.querySelectorAll(
      ".needs-validation"
    ) as NodeListOf<HTMLFormElement>;

    forms.forEach((form) => {
      form.addEventListener("submit", (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add("was-validated");
      });
    });
  }

  calculateTotal(horaDesde: Time, horaHasta: Time): string {
    const desde = new Date(`2000-01-01T${horaDesde}`);
    const hasta = new Date(`2000-01-01T${horaHasta}`);
    const diff = hasta.getTime() - desde.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const total = `${hours}h ${minutes}m`;
    return total;
  }

  onOperarioChange(newValue: any) {
    this.getTurno();
  }

  onDateChange(date: NgbDateStruct): void {
    this.parte.fecha= this.parser.format(date);

    console.log(this.parte);
  }
  

}
