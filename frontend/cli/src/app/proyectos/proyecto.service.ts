import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { DataPackage } from "../data-package";
import { Proyecto } from "./proyecto";

@Injectable({
  providedIn: "root",
})
export class ProyectoService {
  private proyectosUrl = 'rest/proyectos';  // URL to web api

  constructor(
    private http: HttpClient
  ) { }

  all(): Observable<DataPackage> {
    return this.http.get<DataPackage>(this.proyectosUrl); // REST
  }

  get(id: number): Observable<DataPackage> {
    return this.http.get<DataPackage>(`${this.proyectosUrl}/id/${id}`);
  }

  add(proyecto: Proyecto): Observable<DataPackage> {
    return this.http.post<DataPackage>(this.proyectosUrl, proyecto); // REST
  }

  update(proyecto: Proyecto): Observable<DataPackage> {
    return this.http.put<DataPackage>(this.proyectosUrl, proyecto); // REST
  }

  delete(id: number): Observable<DataPackage> {
    return this.http.delete<DataPackage>(`${this.proyectosUrl}/id/${id}`);
  }

  search(text: string): Observable<DataPackage> {
    return this.http.get<DataPackage>(`${this.proyectosUrl}/search/${text}`);
  }

}
