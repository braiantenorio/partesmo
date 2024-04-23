import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { DataPackage } from "../data-package";
import { Operario } from "./operario";
import { OperarioTurno } from "./operario-turno";
@Injectable({
  providedIn: 'root'
})
export class OperarioService {
  private operariosUrl = 'rest/operarios';  // URL to web api

  constructor(
    private http: HttpClient
  ) { }

  all(): Observable<DataPackage> {
    return this.http.get<DataPackage>(this.operariosUrl); // REST
  }

  get(id: number): Observable<DataPackage> {
    return this.http.get<DataPackage>(`${this.operariosUrl}/id/${id}`);
  }

  add(operarioTurno: OperarioTurno): Observable<DataPackage> {
    return this.http.post<DataPackage>(this.operariosUrl, operarioTurno); // REST
  }

  update(operario: Operario): Observable<DataPackage> {
    return this.http.put<DataPackage>(this.operariosUrl, operario); // REST
  }

  delete(id: number): Observable<DataPackage> {
    return this.http.delete<DataPackage>(`${this.operariosUrl}/id/${id}`);
  }

  search(text: string): Observable<DataPackage> {
    return this.http.get<DataPackage>(`${this.operariosUrl}/search/${text}`);
  }

  getByLegajo(legajo: number): Observable<DataPackage> {
    return this.http.get<DataPackage>(`${this.operariosUrl}/${legajo}`)
  }

  getTurno(legajo: number, fecha: any): Observable<DataPackage> {
    return this.http.get<DataPackage>(`${this.operariosUrl}/turnos?fecha=${fecha}&legajo=${legajo}`);
  }

  byPage(page: number, cant: number): Observable<DataPackage> {
    return this.http.get<DataPackage>(
      `${this.operariosUrl}/page?page=${page}&cant=${cant}`
    );
  }

}
