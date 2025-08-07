export interface MessagesType {
answer: string;
chart: null;
audio_base64: null;
debug_context: DebugContext;
}

export interface DebugContext {
pirquen_id: string;
informe_pirquen_20: InformePirquen20;
coordendadas: Coordendadas;
}

export interface Coordendadas {
id: string;
name: string;
coordinates: Array<number[]>;
color: string;
zoom: number;
}

export interface InformePirquen20 {
filename: string;
fecha_informe: string;
comentarios: string[];
resultados_promedios: ResultadosPromedio[];
resultados_filmaciones_submarinas: ResultadosFilmacionesSubmarina[];
}

export interface ResultadosFilmacionesSubmarina {
jaula: string;
n_taxas: number;
n_especies: number;
puntos_especificos_microorganismos: number;
cobertura_microorganismos: number;
}

export interface ResultadosPromedio {
jaula: string;
oxigeno_disuelto_mgL: number;
pH: number;
redox: number;
MOT: number;
riqueza: number;
dominancia: number;
shannon_wiener: number;
}