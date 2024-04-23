import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { DataPackage } from "../data-package";
import { Parte } from './parte';
@Injectable({
  providedIn: 'root'
})
export class ParteService {

  private partesUrl = 'rest/partes';  // URL to web api
  private _loading$ = new BehaviorSubject<boolean>(true);


  constructor(
    private http: HttpClient
  ) { }

  all(): Observable<DataPackage> {
    return this.http.get<DataPackage>(this.partesUrl); // REST
  }

  get(id: number): Observable<DataPackage> {
    return this.http.get<DataPackage>(`${this.partesUrl}/id/${id}`);
  }

  add(parte: Parte): Observable<DataPackage> {
    return this.http.post<DataPackage>(this.partesUrl, parte); // REST
  }

  update(parte: Parte): Observable<DataPackage> {
    return this.http.put<DataPackage>(this.partesUrl, parte); // REST
  }

  delete(id: number): Observable<DataPackage> {
    return this.http.delete<DataPackage>(`${this.partesUrl}/id/${id}`);
  }

  getInformes(fecha: string): Observable<DataPackage> {
    return this.http.get<DataPackage>(`${this.partesUrl}/informes?fecha=${fecha}`);
  }

  getInfomesInvalidos(): Observable<DataPackage> {
    return this.http.get<DataPackage>(`${this.partesUrl}/informes/invalidos`);
  }

  getPartesOperario(fecha: any, legajo: number): Observable<DataPackage> {
    return this.http.get<DataPackage>(`${this.partesUrl}/informes/validaciones?fecha=${fecha}&legajo=${legajo}`);
  }


  validar(fecha: any): Observable<DataPackage> {
    return this.http.post<DataPackage>(`${this.partesUrl}/informes/validaciones?fecha=${fecha}`, null);
  }

  getEstadoInforme(fecha: string, legajo: string): Observable<DataPackage> {
    return this.http.get<DataPackage>(`${this.partesUrl}/informes/estado?fecha=${fecha}&legajo=${legajo}`);
  }

  forzarValidacion(parte: Parte): Observable<DataPackage> {
    return this.http.put<DataPackage>(`${this.partesUrl}/forzarvalidacion`, parte );
  }

  getStatsProject(): Observable<DataPackage> {
    return this.http.get<DataPackage>(`${this.partesUrl}/proyectos/estadisticas`);
  }

  getStatsClient(): Observable<DataPackage> {
    return this.http.get<DataPackage>(`${this.partesUrl}/clientes/estadisticas`);
  }

  getSupervisorValidos(): Observable<DataPackage> {
    return this.http.get<DataPackage>(`${this.partesUrl}/validos/estadisticas`);
  }

  
  getSupervisorErrores(): Observable<DataPackage> {
    return this.http.get<DataPackage>(`${this.partesUrl}/errores/estadisticas`);
  }

}
