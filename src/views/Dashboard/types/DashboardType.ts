export interface DashboardType {
    nombreCentro: string;
    semanales:    Semanales;
    mensuales:    Mensuales;
    promedios:    Promedios;
}

export interface Mensuales {
    consumo_alimentos: { [key: string]: number };
    fcr:               { [key: string]: number };
    peso_promedio:     { [key: string]: number };
    clima:             Clima;
}

export interface Clima {
    "2023-12-17":    The20231217;
    "2023-12-18":    The20231217;
    "2023-12-19":    The20231217;
    "2023-12-20":    The20231217;
    "2023-12-21":    The20231217;
    "2023-12-22":    The20231217;
    "2023-12-23":    The20231217;
    "2023-12-24":    The20231217;
    "2023-12-25":    The20231217;
    "2023-12-26":    The20231217;
    "2023-12-27":    The20231217;
    "2023-12-28":    The20231217;
    "2023-12-29":    The20231217;
    "2023-12-30":    The20231217;
    "2023-12-31":    The20231217;
    "2024-01-01":    The20231217;
    "2024-01-02":    The20231217;
    "2024-01-03":    The20231217;
    "2024-01-04":    The20231217;
    "2024-01-05":    The20231217;
    "2024-01-06":    The20231217;
    "2024-01-07":    The20231217;
    "2024-01-08":    The20231217;
    "2024-01-09":    The20231217;
    "2024-01-10":    The20231217;
    "2024-01-11":    The20231217;
    "2024-01-12":    The20231217;
    "2024-01-13":    The20231217;
    "2024-01-14":    The20231217;
    "2024-01-15":    The20231217;
    promedioMensual: PromedioMensual;
}

export interface The20231217 {
    temperatura:   number;
    precipitacion: number;
}

export interface PromedioMensual {
    temperatura:        number;
    precipitacionTotal: number;
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
    clima:             { [key: string]: The20231217 };
}