export interface Message {
  sender: "user" | "bot" | "bot-bienvenida";
  text: string;
  audioBase64?: string | null;
  contexto_previo?: null | unknown;
  chart?: {
    type: string;
    title: string;
    xAxis: string[];
    series: { name: string; data: number[] }[];
  } | null;
  debug_context?: DebugContext;
}

export interface MessageAudio {
  audioBase64?: string | null;
}

export interface MessagesType {
  chart: null;
  debug_context: DebugContext;
}

import { WeatherType } from "../../zones/types/Zone";

export interface Coordenadas {
  id: string;
  name: string;
  coordinates: [number, number][];
  color: string;
  zoom: number;
  clima: WeatherType;
}

export interface DebugContext {
  pirquen_id?: {
    center_id: number;
    center_name: string;
  };
  coordendadas?: Coordenadas;
  centros: Array<CentroClass[] | CentroClass>;
  datos_centro: Array<DatosCentroClass[] | DatosCentroClass>;
}
export interface CentroClass {
    center_id:   number;
    center_name: string;
}


export interface DatosCentroClass {
    count:              number;
    data:               Datum[];
    default_limit_used: boolean;
}

export interface Datum {
    fecha:              Date;
    temperatura_maxima: number;
    viento:             number;
    precipitacion:      number;
}

export interface QuestionRequest {
  user_question: string;
  informe_filename?: string; // Opcional si la pregunta es sobre un informe específico
  contexto_previo?: null | unknown;
  debug_context?: DebugContext;
}

export interface QuestionResponse {
  answer: string;
  audio_base64?: string | null;
  chart?: {
    type: string;
    title: string;
    xAxis: string[];
    series: { name: string; data: number[] }[];
  };
  debug_context?: DebugContext;
}

export interface QuestionRequestAudio {
  user_question: string;
  text: string;
}

export interface QuestionResponseAudio {
  audio_base64: string;
}

export interface Coordendadas {
  id: string;
  name: string;
  coordinates: Array<number[]>;
  color: string;
  zoom: number;
  clima?: string;
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
