import { useState } from "react";
import { questionAnalyzerService } from "../services/questionAnalyzerService";

export interface Message {
  sender: "user" | "bot" | "bot-bienvenida";
  text: string;
  audioBase64?: string | null;
  contexto_previo?: [] | null;
  chart?: {
    type: string;
    title: string;
    xAxis: string[];
    series: { name: string; data: number[] }[];
  } | null;
}

export function useChatIA() {
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

  console.log("messages", messages);
  

  // 3. Modificamos handleAskQuestion para que trabaje con el array.
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
        contexto_previo:messages,
      });

      const botResponse: Message = {
        sender: "bot",
        text: response.answer,
        audioBase64: response.audio_base64 || null,
        chart: response.chart || null,
      };

      setMessages((prevMessages) => [
        ...prevMessages.slice(0, -1),
        botResponse,
      ]);
    } catch (err: any) {
      const errorMessage: Message = {
        sender: "bot",
        text: `Lo siento, hubo un error al procesar tu pregunta: ${
          err.message || "Error desconocido"
        }.`,
      };
      setMessages((prevMessages) => [
        ...prevMessages.slice(0, -1),
        errorMessage,
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
  };
}
