import { Time } from "@angular/common";
import { Operario } from "../operarios/operario";
import { Proyecto } from "../proyectos/proyecto";
import { Tarea } from "../tareas/tarea";
import { Estado } from "./estado";
import { LogValidacion } from "./logValidacion";

export interface Parte {
    id: number;
    estado: Estado;
    fecha: string;
    horaDesde: Time;
    horaHasta: Time;
    operario: Operario;
    proyecto: Proyecto;
    tarea: Tarea;
    logValidacionParteMO: LogValidacion[];
    supervisor: string;
}