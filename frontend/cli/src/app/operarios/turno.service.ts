import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { DataPackage } from "../data-package";

@Injectable({
  providedIn: 'root'
})
export class TurnoService {
  private turnosUrl = 'rest/turnos';  // URL to web api
  private OperarioturnosUrl = 'rest/operarioTurnos';  // URL to web api

  constructor(
    private http: HttpClient
  ) { }

  all(): Observable<DataPackage> {
    return this.http.get<DataPackage>(this.turnosUrl); // REST
  }

  allOperarioTurnos(legajo: number): Observable<DataPackage> {
    return this.http.get<DataPackage>(`${this.OperarioturnosUrl}/porOperario?legajo=${legajo}`); // REST
  }

}
