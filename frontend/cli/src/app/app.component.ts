import { Component } from "@angular/core";
import { NgbDropdownModule } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-root",
  template: `
    <nav class="navbar navbar-expand-md navbar-light bg-light">
      <div class="container-fluid">
        <span class="navbar-brand">PartesMO</span>
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <a class="nav-link" routerLink="/">Home</a>
          </li>

          <li class="nav-item">
            <a class="nav-link" routerLink="/empresas">Empresas</a>
          </li>

          <li class="nav-item">
            <a class="nav-link" routerLink="/proyectos">Proyectos</a>
          </li>

          <li class="nav-item">
            <a class="nav-link" routerLink="/operarios">Operarios</a>
          </li>

          <li
            class="nav-item"
            ngbDropdown
            display="static"
            placement="bottom-end"
          >
            <a
              class="nav-link"
              tabindex="0"
              ngbDropdownToggle
              id="navbarDropdown3"
              role="button"
              >Partes</a
            >
            <div
              ngbDropdownMenu
              aria-labelledby="navbarDropdown3"
              class="dropdown-menu"
            >
              <a ngbDropdownItem href="/partes/informes">Informes</a>
              <a ngbDropdownItem routerLink="/partes/new">Nuevo Parte</a>
              <a ngbDropdownItem href="/partes/informes/invalidos">Invalidos</a>
              <a ngbDropdownItem href="/partes/informes/validaciones">Partes</a>
            </div>
          </li>

          <li class="nav-item">
            <a class="nav-link" routerLink="/estadisticas">Estadisticas</a>
          </li>
          
        </ul>
      </div>
    </nav>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [],
})
export class AppComponent {
  title = "PartesMO";
}
