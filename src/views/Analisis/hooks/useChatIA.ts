import { useState } from "react";
import { questionAnalyzerService } from "../services/questionAnalyzerService";
import { Message } from "../types/MessageType";
import { WeatherType } from "../../zones/types/Zone";

interface UseChatIAProps {
  onWeatherChange?: (clima: WeatherType) => void;
}

export function useChatIA({ onWeatherChange }: UseChatIAProps = {}) {
  const [question, setQuestion] = useState("");
  const [isLoadingResponse, setIsLoadingResponse] = useState(false);
  const [answer, setAnswer] = useState("");
  
  // bienvenida del bot.
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot-bienvenida",
      text: "sin-pregunta",
    },
  ]);

  const handleAskQuestion = async () => {
    if (!question.trim() || isLoadingResponse) return;
    setIsLoadingResponse(true);

    // Añadimos la pregunta del usuario al historial
    const userMessage: Message = { sender: "user", text: question };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Mostramos un mensaje de "cargando" del bot
    const loadingMessage: Message = {
      sender: "bot",
      text: "Buscando en WI-DB... Por favor, espera.",
    };
    setMessages((prevMessages) => [...prevMessages, loadingMessage]);

    setQuestion("");

    try {
      const response = await questionAnalyzerService.analyzeQuestion({
        user_question: question,
        contexto_previo: messages,
      });

      
      // Si hay un debug_context con clima, actualizamos el estado del clima
      if (response.debug_context?.coordendadas?.clima && onWeatherChange) {
        console.log("Clima detectado en la respuesta:", response.debug_context.coordendadas.clima);
        onWeatherChange(response.debug_context.coordendadas.clima as WeatherType);
      }

      const botResponse: Message = {
        sender: "bot",
        text: response.answer,
        audioBase64: response.audio_base64 || null,
        chart: response.chart || null,
        debug_context: response.debug_context,
      };

      setMessages((prevMessages) => [
        ...prevMessages.slice(0, -1),
        botResponse,
      ]);
    } catch (err: unknown) {
      let errorMessage = "Error desconocido";

      if (err instanceof Error) {
        errorMessage = err.message;
      }

      const errorResponse: Message = {
        sender: "bot",
        text: `Lo siento, hubo un error al procesar tu pregunta: ${errorMessage}.`,
      };

      setMessages((prevMessages) => [
        ...prevMessages.slice(0, -1),
        errorResponse,
      ]);
    } finally {
      setIsLoadingResponse(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        sender: "bot-bienvenida",
        text: "sin-pregunta",
      },
    ]);
    setQuestion("");
  };

  return {
    question,
    setQuestion,
    messages,
    isLoadingResponse,
    handleAskQuestion,
    handleClearChat,
    setAnswer,
    answer,
  };
}
