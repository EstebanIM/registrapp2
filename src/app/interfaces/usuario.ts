import { AsistenciaPage } from '../pages/asistencia/asistencia.page';
export interface Usuario {
    uid:string;
    username:string;
    password:string;
    correo:string;
}

export interface Asignatura {
    id:string;
    nombre: string;
    profesor: string;
    
}

export interface Asistencia { 
    id: string;
    fecha: any;
    nombre: string;
}
