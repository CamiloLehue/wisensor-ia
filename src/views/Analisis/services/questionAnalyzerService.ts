import axios from "axios";
import { QuestionRequest, QuestionRequestAudio, QuestionResponse } from "../types/MessageType";

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
  // Returns the raw audio Blob from streaming endpoint
  async analyzeAudio(data: QuestionRequestAudio): Promise<Blob> {
    console.log("📡 Making audio request to endpoint:", data);
    
    const response = await axios.post(
      `${API_URL}/question-analyzer/analyze-question-audio-streaming/`,
      data,
      {
        headers: {
          "Accept": "audio/mpeg",
          "Content-Type": "application/json",
        },
        responseType: "blob",
      }
    );
    
    console.log("📦 Audio response received:", {
      status: response.status,
      contentType: response.headers['content-type'],
      size: response.data.size
    });
    
    return response.data as Blob;
  },
};
