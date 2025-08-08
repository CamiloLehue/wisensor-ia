import axios from "axios";
import { QuestionRequest, QuestionResponse } from "../types/MessageType";

const API_URL = import.meta.env.VITE_API_BASE_URL;


export const questionAnalyzerService = {
  async analyzeQuestion(data: QuestionRequest): Promise<QuestionResponse> {
    const response = await axios.post<QuestionResponse>(
      `${API_URL}/question-analyzer/analyze-question/`,
      data
    );
    return response.data;
  },
};
