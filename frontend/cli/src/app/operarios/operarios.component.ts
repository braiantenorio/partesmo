import { Component, OnInit } from "@angular/core";
import { Operario } from "./operario";
import { ResultsPage } from "../results-page";
import { OperarioService } from "./operario.service";

@Component({
  selector: "app-operarios",
  template: `
    <div class="componente-con-espacio">
      <h2>
        Operarios&nbsp;
        <a routerLink="/operarios/new" class="btn btn-success float-right"
          >Nuevo operario</a
        >
      </h2>

      <div class="table-responsive">
        <table class="table table-striped table-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Legajo</th>
              <th>Nombre</th>
              <th>Categoria</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let operario of operarios; index as i">
              <td>{{ i + resultsPage.size*resultsPage.number + 1 }}</td>
              <td>{{ operario.legajo }}</td>
              <td>{{ operario.nombre }}</td>
              <td>{{ operario.categoria }}</td>
              <td>
                <a (click)="eliminarOperario(operario.id)">
                  <i class="fa fa-trash"></i>
                </a>
              </td>
              <td>
                <a routerLink="/operarios/{{ operario.id }}">
                  <i class="fa fa-pencil"></i>
                </a>
              </td>
            </tr>
          </tbody>
          <tfoot>
          <tr>
            <td colspan="5">
              <nav aria-label="Page navigation example">
                <ul class="pagination pagination-centered">
                  <li class="page-item">
                    <a class="page-link" (click)="showPage(-2)">&laquo;</a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" (click)="showPage(-1)">&lsaquo;</a>
                  </li>
                  <li *ngFor="let t of pages;">
                    <a class="page-link" (click)="showPage(t)" [ngClass]="{'active': t === currentPage}"> {{t+1}} </a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" (click)="showPage(-3)">&rsaquo;</a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" (click)="showPage(-4)">&raquo;</a>
                  </li>
                </ul>
              </nav>        
            </td>
          </tr>
        </tfoot>
        </table>
      </div>
    </div>
  `,
  styles: [],
})
export class OperariosComponent {
  operarios: Operario[] = <Operario[]>[];
  resultsPage: ResultsPage = <ResultsPage>{};
  pages: number[] = [];
  currentPage: number = 0;

  constructor(private operarioService: OperarioService) {}

  ngOnInit() {
    this.getOperarios();
  }

  getOperarios(): void {
    this.operarioService.byPage(this.currentPage, 5).subscribe((dataPackage) => {
      this.resultsPage = <ResultsPage>dataPackage.data;
      this.operarios = <Operario[]>this.resultsPage.content;
      this.pages = Array.from(Array(this.resultsPage.totalPages).keys());
    });
  }

  eliminarOperario(id: number): void {
    this.operarioService.delete(id).subscribe(() => {
      this.getOperarios();
    });
  }

  showPage(pageId: number): void {
    let page = pageId;
    if (pageId == -2) { // First
      page = 0;
    }
    if (pageId == -1) { // Previous
      page = this.currentPage > 0 ? this.currentPage -1 : this.currentPage;
    }
    if (pageId == -3) { // Next
      page = !this.resultsPage.last ? this.currentPage + 1 : this.currentPage;
    }
    if (pageId == -4) { // Last
      page = this.resultsPage.totalPages-1;
    }
    if (pageId > 1 && this.pages.length >= pageId) { // Number
      page = this.pages[pageId - 1] + 1;
    }
    this.currentPage = page;
    this.getOperarios();
  };


}
