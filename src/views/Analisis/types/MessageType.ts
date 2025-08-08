export interface Message {
  sender: "user" | "bot" | "bot-bienvenida";
  text: string;
  audioBase64?: string | null;
  contexto_previo?:  null | unknown;
  chart?: {
    type: string;
    title: string;
    xAxis: string[];
    series: { name: string; data: number[] }[];
  } | null;
  debug_context?: DebugContext;
  
}

export interface MessagesType {
  chart: null;
  debug_context: DebugContext;
}

export interface DebugContext {
  pirquen_id: string;
  informe_pirquen_20: InformePirquen20;
  coordendadas: Coordendadas;
}

export interface QuestionRequest {
  user_question: string;
  informe_filename?: string; // Opcional si la pregunta es sobre un informe específico
  contexto_previo?:  null | unknown; 
  debug_context?:DebugContext;
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
