import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export interface QuestionRequest {
  user_question: string;
  informe_filename?: string; // Opcional si la pregunta es sobre un informe específico
  contexto_previo?: [] | null; //Usuario: Pregunta anterior \n Asistente: Respuesta anterior, 
}

export interface QuestionResponse {
  answer: string;
  // audio_base64?: string | null;
  chart?: {
    type: string;
    title: string;
    xAxis: string[];
    series: { name: string; data: number[] }[];
  };
}

export const questionAnalyzerService = {
  async analyzeQuestion(data: QuestionRequest): Promise<QuestionResponse> {
    const response = await axios.post<QuestionResponse>(
      `${API_URL}/question-analyzer/analyze-question/`,
      data
    );
    return response.data;
  },
};
