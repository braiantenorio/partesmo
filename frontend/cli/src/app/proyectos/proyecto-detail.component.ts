import { Location } from "@angular/common";
import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Proyecto } from "./proyecto";
import { ProyectoService } from "./proyecto.service";
import { EmpresaService } from "../empresas/empresa.service";
import { Empresa } from "../empresas/empresa";
import { Tarea } from "../tareas/tarea";
import { Observable, of, OperatorFunction } from "rxjs";
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  tap,
  switchMap,
  map,
} from "rxjs/operators";

@Component({
  selector: "app-proyecto-detail",
  template: `
  <div class="componente-con-espacio">
    <div *ngIf="proyecto">
      <form #form="ngForm" class="row g-3 needs-validation" novalidate>
        <div class="col-md-6">
          <label for="empresa" class="form-label">Cliente</label>

          <input
            [(ngModel)]="proyecto.empresa"
            name="empresa"
            id="empresa"
            class="form-control"
            [ngbTypeahead]="searchEmpresa"
            [resultFormatter]="resultFormat"
            [inputFormatter]="inputFormat"
            type="text"
          />
          
        </div>
        <div class="col-md-6">
          <label for="name" class="form-label">Cuit</label>
          <input
            [(ngModel)]="proyecto.empresa.cuit"
            name="cuit"
            class="form-control"
            disabled
            #cuit="ngModel"
          />
          <div class="invalid-feedback">Ingrese un cuit valido.</div>
        </div>
        <div class="col-md-6">
          <label for="type" class="form-label">Codigo</label>
          <input
            [(ngModel)]="proyecto.codigo"
            name="codigo"
            class="form-control"
          />
        </div>
        <div class="col-md-6">
          <label for="type" class="form-label">Descripcion</label>
          <input
            [(ngModel)]="proyecto.descripcion"
            name="descripcion"
            class="form-control"
          />
        </div>
        <div class="d-grid gap-2 d-md-flex">
          <button type="submit" (click)="save()" class="btn btn-success">
            Guardar
          </button>
          <button type="button" (click)="goBack()" class="btn btn-danger ">
            Atrás
          </button>
        </div>
        <h2>
          Tareas&nbsp;
          <a
            type="button"
            class="btn btn-success float-right"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            >Nueva tarea</a
          >
        </h2>
      </form>
    </div>
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
          <tr *ngFor="let tarea of proyecto.tareas; index as i">
            <td>{{ i + 1 }}</td>
            <td>{{ tarea.codigo }}</td>
            <td>{{ tarea.descripcion }}</td>
          </tr>
        </tbody>
      </table>
    </div>

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
                <label for="codigo" class="col-form-label">Código:</label>
                <input
                  type="text"
                  class="form-control"
                  id="codigo"
                  name="codigo"
                  #codigo
                />
              </div>
              <div class="md-3">
                <label for="descripcion" class="col-form-label"
                  >Descripción:</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="descripcion"
                  name="descripcion"
                  #descripcion
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
              (click)="saveTarea(codigo.value, descripcion.value)"
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
export class ProyectoDetailComponent {
  proyecto!: Proyecto;
  searching: boolean = false;
  searchFailed: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private proyectoService: ProyectoService,
    private empresaService: EmpresaService
  ) { }

  ngOnInit() {
    this.get();
  }

  get(): void {
    const id = this.route.snapshot.paramMap.get("id")!;
    if (id === "new") {
      this.proyecto = <Proyecto>{};
      this.proyecto.empresa = <Empresa>{};
      this.proyecto.tareas = <Tarea[]>[];
    } else {
      this.proyectoService
        .get(+id)
        .subscribe(
          (dataPackage) => (this.proyecto = <Proyecto>dataPackage.data)
        );
    }
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    const id = this.route.snapshot.paramMap.get("id")!;
    if (id === "new") {
      this.proyectoService.add(this.proyecto).subscribe((proyecto) => {
        this.proyecto = this.proyecto;
        this.goBack();
      });
    } else {
      this.proyectoService.update(this.proyecto).subscribe((proyecto) => {
        this.proyecto = this.proyecto;
        this.goBack();
      });
    }
  }

  //funciona
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

  saveTarea(codigo: string, descripcion: string): void {
    this.proyecto.tareas.push({ codigo, descripcion });
  }

  resultFormat(value: any) {
    return value && value.cuit && value.nombre
      ? `${value.cuit} - ${value.nombre}`
      : "";
  }

  inputFormat(value: any) {
    return value && value.cuit && value.nombre
      ? `${value.cuit} - ${value.nombre}`
      : "";
  }

  searchEmpresa = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    tap(() => (this.searching = true)),
    switchMap((term) =>
      this.empresaService.search(term).pipe(
        map((response) => <[Empresa]> response.data),
        tap(() => (this.searchFailed = false)),
        catchError(() => {
          this.searchFailed = true;
          return of([]);
        })
      )
    ),
    tap(() => (this.searching = false))
  );

}
