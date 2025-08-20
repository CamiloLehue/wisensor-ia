export interface DashboardType {
    nombreCentro: string;
    semanales:    Semanales;
    ciclos:       Ciclos;
    promedios:    Promedios;
}

export interface Ciclos {
    id_ciclo:      string;
    fecha_inicio:  string; // Cambio de Date a string para coincidir con el JSON
    fecha_termino: string; // Cambio de Date a string para coincidir con el JSON
    meses:         Mese[];
    resumen_ciclo: Resumen;
}

export interface Mese {
    idMes: number;
    año: number; // Año al que pertenece este mes en el ciclo
    datos: Datos;
}

export interface Datos {
    consumo_alimentos: { [key: string]: number };
    fcr:               { [key: string]: number };
    peso_promedio:     { [key: string]: number };
    clima:             { [key: string]: Clima };
    resumen_mensual:   Resumen;
}

export interface Clima {
    temperatura:   number;
    precipitacion: number;
}

export interface Resumen {
    consumoTotal:        number;
    fcrPromedio:         number;
    pesoPromedio:        number;
    temperaturaPromedio: number;
    precipitacionTotal:  number;
}

export interface Promedios {
    fcr_promedio:           number;
    peso_promedio:          number;
    temperatura_promedio:   number;
    precipitacion_promedio: number;
}

export interface Semanales {
    consumo_alimentos: { [key: string]: number };
    fcr:               { [key: string]: number };
    peso_promedio:     { [key: string]: number };
    clima:             { [key: string]: Clima };
}
