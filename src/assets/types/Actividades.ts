export interface Actividad {
  id: number;
  titulo: string;
  descripcion: string;
  estado: "pendiente" | "en_progreso" | "completada" | "cancelada";
  prioridad: "baja" | "media" | "alta" | "urgente";
  fechaCreacion: string;
  fechaVencimiento?: string;
  asignado: string;
  categoria: string;
  etiquetas: string[];
}

export interface FormDataActividad {
  id: string;
  titulo: string;
  descripcion: string;
  estado: "pendiente" | "en_progreso" | "completada" | "cancelada";
  prioridad: "baja" | "media" | "alta" | "urgente";
  fechaCreacion: string;
  fechaVencimiento: string;
  asignado: string;
  categoria: string;
  etiquetas: string[];
} 