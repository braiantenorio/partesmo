import { Estado } from "./estado";
import { Validacion } from "./validacion";

export interface LogValidacion {
    id: number;
    estado: Estado;
    validacionParteMO: Validacion;
}