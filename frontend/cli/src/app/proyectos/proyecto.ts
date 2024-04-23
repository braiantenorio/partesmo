import { Empresa } from '../empresas/empresa';
import { Tarea } from '../tareas/tarea';

export interface Proyecto {
    id: number;
    codigo: string;
    descripcion: string;
    tareas: Tarea[];
    empresa: Empresa;
    }