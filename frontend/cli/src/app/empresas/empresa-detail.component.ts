import { Location } from "@angular/common";
import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Empresa } from "./empresa";
import { EmpresaService } from "./empresa.service";

@Component({
  selector: "app-empresa-detail",
  template: `
  <div class="componente-con-espacio">

  <div *ngIf="empresa">
  <form #form="ngForm" class="row g-3 needs-validation" novalidate>
      <div class="col-md-6">
          <label for="name" class="form-label">Nombre</label>
          <input [(ngModel)]="empresa.nombre" type="text" name="nombre" placeholder="Nombre" class="form-control" required
              #name="ngModel"/>
          <div class="invalid-feedback">
              Ingrese un nombre valido.
          </div>
      </div>
      <div class="col-md-6">
          <label for="name" class="form-label">Cuit</label>
          <input [(ngModel)]="empresa.cuit" name="cuit" maxlength="11" placeholder="cuit sin guiones" class="form-control" required #cuit="ngModel"/>
          <div class="invalid-feedback">
              Ingrese un cuit valido.
          </div>
      </div>
      <div class="mb-3">
          <label for="type" class="form-label">Observaciones</label>
          <input [(ngModel)]="empresa.observaciones" name="observaciones" placeholder="Observaciones"
              class="form-control" />
      </div>
      <div class="d-grid gap-2 d-md-flex">
          <button type="submit" (click)="save()" class="btn btn-success">Guardar</button>
          <button type="button" (click)="goBack()" class="btn btn-danger ">Atrás</button>
      </div>
  </form>
</div>
  `,
  styles: [],
})


export class EmpresaDetailComponent {
  empresa!: Empresa;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private empresaService: EmpresaService
  ) { }

  ngOnInit() {
    this.get();
  }

  get(): void {
    const id = this.route.snapshot.paramMap.get("id")!;
    if (id === "new") {
      this.empresa = <Empresa>{};
    } else {
      this.empresaService.get(+id).subscribe(dataPackage => this.empresa = <Empresa>dataPackage.data);
    }
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.prueba();
      const id = this.route.snapshot.paramMap.get("id")!;
      if (id === "new") {
        this.empresaService.add(this.empresa).subscribe((empresa) => {
          this.empresa = this.empresa;
          this.goBack();
        });
      } else {
        this.empresaService.update(this.empresa).subscribe((empresa) => {
          this.empresa = this.empresa;
          this.goBack();
        });
      }
  }

  prueba(): void {
    const forms = document.querySelectorAll('.needs-validation') as NodeListOf<HTMLFormElement>;

    forms.forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      });
    });
  }
}

