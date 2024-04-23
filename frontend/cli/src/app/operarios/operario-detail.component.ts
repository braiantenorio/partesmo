import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { Operario } from "./operario";
import { OperarioService } from "./operario.service";
import { OperarioTurno } from "./operario-turno";
import { Turno } from "./turno";
import { TurnoService } from "./turno.service";

@Component({
  selector: "app-operario-detail",
  template: `
    <div *ngIf="operario">
      <form #form="ngForm" class="row g-3 needs-validation" novalidate>
        <div class="d-grid gap-2 d-md-flex justify-content-end">
          <button type="submit" (click)="save()" class="btn btn-success">
            Guardar
          </button>
          <button type="button" (click)="goBack()" class="btn btn-danger ">
            Atrás
          </button>
        </div>

        <div class="col-md-6">
          <label for="legajo" class="form-label">Legajo</label>
          <input
            [(ngModel)]="operario.legajo"
            type="text"
            id="legajo"
            name="legajo"
            placeholder="Legajo"
            class="form-control"
            required
            #legajo="ngModel"
          />
          <div class="invalid-feedback">Ingrese un legajo valido.</div>
        </div>
        <div class="col-md-6">
          <label for="nombre" class="form-label">Nombre</label>
          <input
            [(ngModel)]="operario.nombre"
            id="nombre"
            name="nombre"
            placeholder="Nombre"
            class="form-control"
            required
            #nombre="ngModel"
          />
          <div class="invalid-feedback">Ingrese un nombre valido.</div>
        </div>
        <div class="col-md-6 mb-3">
          <label for="categoria" class="form-label">Categoria</label>
          <select
            [(ngModel)]="operario.categoria"
            class="form-control"
            id="categoria"
            name="categoria"
          >
            <option value="Oficial Especializado">Oficial Especializado</option>
            <option value="Oficial Albañil">Oficial Albañil</option>
            <option value="Medio Oficial Albañil">Medio Oficial Albañil</option>
            <option value="Oficial Carpintero">Oficial Carpintero</option>
            <option value="Oficial Armador">Oficial Armador</option>
            <option value="Medio Oficial Armador">Medio Oficial Armador</option>
            <option value="Ayudante">Ayudante</option>
          </select>
        </div>
      </form>
    </div>
    <h2>
      Turnos&nbsp;
      <a
        type="button"
        class="btn btn-success float-right"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        >Nuevo Turno</a
      >
    </h2>

    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Nueva tarea</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form #form="ngForm">
              <div class="mb-3">
                <label for="turno" class="col-form-label">Código:</label>
                <select
                  [(ngModel)]="selectedTurno"
                  class="form-select"
                  name="turno"
                  id="turno"
                >
                  <option *ngFor="let turno of turnos" [ngValue]="turno">
                    {{ turno.nombre }}
                  </option>
                </select>
              </div>
              <div class="md-3">
                <label for="fechaDesde" class="col-form-label">Desde:</label>
                <input
                  type="date"
                  class="form-control"
                  id="fechaDesde"
                  name="fechaDesde"
                  #fechaDesde
                />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancelar
            </button>
            <button
              type="button"
              class="btn btn-primary"
              id="guardar"
              (click)="saveTurno(selectedTurno, fechaDesde.value)"
              data-bs-dismiss="modal"
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class OperarioDetailComponent {
  operarioTurno!: OperarioTurno;
  operario!: Operario;
  selectedTurno!: Turno;
  turnos: Turno[] = <Turno[]>[];
  operarioTurnos: OperarioTurno[] = <OperarioTurno[]>[];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private operarioService: OperarioService,
    private turnoService: TurnoService
  ) {}

  ngOnInit() {
    this.get();
    this.getTurnos();
    this.operarioTurno = <OperarioTurno>{};
  }

  get(): void {
    const id = this.route.snapshot.paramMap.get("id")!;
    if (id === "new") {
      this.operario = <Operario>{};
    } else {
      this.operarioService
        .get(+id)
        .subscribe(
          (dataPackage) => {
            this.operario = <Operario>dataPackage.data;
            this.getOperarioTurnos();
          }
        );
    }
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.prueba();
    const id = this.route.snapshot.paramMap.get("id")!;
    this.operarioTurno.operario = this.operario;
    if (id === "new") {
      this.operarioService.add(this.operarioTurno).subscribe((operario) => {
        this.operario = this.operario;
        this.goBack();
      });
    } else {
      this.operarioService.update(this.operario).subscribe((operario) => {
        this.operario = this.operario;
        this.goBack();
      });
    }
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

  getTurnos(): void {
    this.turnoService
      .all()
      .subscribe((dataPackage) => (this.turnos = <Turno[]>dataPackage.data));
  }


  getOperarioTurnos(): void{
    this.turnoService.allOperarioTurnos(this.operario.legajo).subscribe((dataPackage) => (this.operarioTurnos = <OperarioTurno[]>dataPackage.data));
    console.log(this.operarioTurnos);
  }

  saveTurno(turno: Turno, fechaDesde: string) {
    this.operarioTurno.fechaDesde = fechaDesde;
    this.operarioTurno.turno = turno;
    this.save();
  }
}
