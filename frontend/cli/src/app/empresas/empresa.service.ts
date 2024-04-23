import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { DataPackage } from "../data-package";
import { Empresa } from "./empresa";

@Injectable({
  providedIn: "root",
})
export class EmpresaService {
  private empresasUrl = 'rest/empresas';  // URL to web api

  constructor(
    private http: HttpClient
  ) { }

  all(): Observable<DataPackage> {
    return this.http.get<DataPackage>(this.empresasUrl); // REST
  }

  get(id: number): Observable<DataPackage> {
    return this.http.get<DataPackage>(`${this.empresasUrl}/id/${id}`);
  }

  add(empresa: Empresa): Observable<DataPackage> {
    return this.http.post<DataPackage>(this.empresasUrl, empresa); // REST
  }

  update(empresa: Empresa): Observable<DataPackage> {
    return this.http.put<DataPackage>(this.empresasUrl, empresa); // REST
  }

  delete(id: number): Observable<DataPackage> {
    return this.http.delete<DataPackage>(`${this.empresasUrl}/id/${id}`);
  }

  search(text: string): Observable<DataPackage> {
    return this.http.get<DataPackage>(`${this.empresasUrl}/search/${text}`);
  }

}
