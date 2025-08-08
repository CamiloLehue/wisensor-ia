import axios from "axios";
import { QuestionRequest, QuestionRequestAudio, QuestionResponse, QuestionResponseAudio } from "../types/MessageType";

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



export const getAudioService = {
  async analyzeAudio(data: QuestionRequestAudio): Promise<QuestionResponseAudio> {
    const response = await axios.post<QuestionResponseAudio>(
      `${API_URL}/question-analyzer/analyze-question-audio/`,
      data
    );
    return response.data;
  },
};
