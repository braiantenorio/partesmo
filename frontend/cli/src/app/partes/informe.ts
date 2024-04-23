import { Time } from "@angular/common";

export interface Informe {
    fecha: Date;
    legajo: string;
    nombre: string;
    ingreso: Time;
    egreso: Time;
    horas: Time;
    horasPartes: Time;
    estado: string;
}