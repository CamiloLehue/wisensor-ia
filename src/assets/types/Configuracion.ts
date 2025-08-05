// types/inventario.d.ts
export interface Registro1 {
    id: number;
    nombre: string;
    email: string;
    rol: string;
    estado: 'Activo' | 'Inactivo';
  }
export interface Registro2 {
    id: number;
    nombre: string;
    email: string;
    rol: string;
    estado: 'Activo' | 'Inactivo';
  }
export interface Registro3 {
    id: number;
    nombre: string;
    estado: 'Activo' | 'Inactivo';
  }
  export interface Registro4 {
    id: number;
    nombre: string;
    direccion: string;
    detalle: string;
    estado: 'Activo' | 'Inactivo';
  }
  export interface Registro5 {
    id: number;
    nombre: string;
    codigo: string;
    fecha: Date;
    idEmpresa: number;
  }
  
export type FormData1 = Omit<Registro1, 'id'> & {
    id: string; // Temporal para formularios
  };
  export type FormData2 = Omit<Registro2, 'id'> & {
    id: string; // Temporal para formularios
  };
  export type FormData3 = Omit<Registro3, 'id'> & {
    id: string; // Temporal para formularios
  };
  export type FormData4 = Omit<Registro4, 'id'> & {
    id: string; // Temporal para formularios
  };
  export type FormData5 = Omit<Registro5, 'id'> & {
    id: string; // Temporal para formularios
  };