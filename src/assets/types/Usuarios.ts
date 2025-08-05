// types/inventario.d.ts
export interface Registro {
    id: number;
    nombre: string;
    estado: 'Activo' | 'Inactivo';
  }
  
export type FormData = Omit<Registro, 'id'> & {
    id: string; // Temporal para formularios
  };