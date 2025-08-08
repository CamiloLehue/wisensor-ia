import { useState } from "react";
import { getAudioService } from "../services/questionAnalyzerService";

export function useTextAudio() {
  const [textAudio, setTextAudio] = useState<string | null>(null);
const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const handleTextAudio = async (answer: string) => {
    setIsLoadingAudio(true);
    try {
      const response = await getAudioService.analyzeAudio({
        user_question: answer,
        text:answer
      });

      setTextAudio(response.audio_base64);
      setIsLoadingAudio(false);

    } catch (error) {
      console.error("Error fetching audio:", error);
      setTextAudio(null);
    }
  };

  return { handleTextAudio, textAudio, isLoadingAudio };
}
