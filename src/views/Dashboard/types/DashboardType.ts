
export interface DashboardType {
    nombreCentro: string;
    semanales:    Semanales;
    ciclos:       Ciclos;
    promedios:    Promedios;
}

export interface Ciclos {
    consumo_alimentos: ConsumoAlimento[];
    fcr:               Fcr[];
    peso_promedio:     Fcr[];
    clima:             ClimaElement[];
}

export interface ClimaElement {
    id_año: number;
    meses:  ClimaMese[];
}

export interface ClimaMese {
    id_mes: number;
    datos:  PurpleDatos | null;
}

export interface PurpleDatos {
    dias:            { [key: string]: ClimaValue };
    promedioMensual: PromedioMensual;
}

export interface ClimaValue {
    temperatura:   number;
    precipitacion: number;
}

export interface PromedioMensual {
    temperatura:        number;
    precipitacionTotal: number;
}

export interface ConsumoAlimento {
    id_año: number;
    meses:  ConsumoAlimentoMese[];
}

export interface ConsumoAlimentoMese {
    id_mes: number;
    datos:  FluffyDatos | null;
}

export interface FluffyDatos {
    dias:                { [key: string]: number };
    consumoTotalMensual: number;
}

export interface Fcr {
    id_año: number;
    meses:  FcrMese[];
}

export interface FcrMese {
    id_mes: number;
    datos:  TentacledDatos | null;
}

export interface TentacledDatos {
    dias: { [key: string]: number };
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
    clima:             { [key: string]: ClimaValue };
}