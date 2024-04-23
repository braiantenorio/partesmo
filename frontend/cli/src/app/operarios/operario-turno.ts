import { Operario } from "./operario";
import { Turno } from "./turno";

export interface OperarioTurno {
    id: number;
    operario: Operario;
    turno: Turno;
    fechaDesde: string;
    fechaHasta: string;
    }