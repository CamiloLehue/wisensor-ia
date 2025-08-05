import { useState } from "react";
import { questionAnalyzerService } from "../services/questionAnalyzerService";

export interface Message {
  sender: "user" | "bot";
  text: string;
  audioBase64?: string | null;
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
      sender: "bot",
      text: "¡Hola! Soy WIS-AI Bienvenido a la sección de Análisis, una interfaz diseñada para ofrecer acceso a datos específicos y detallados organizados por centros. Actualmente disponemos de información de los centros PIRQUEN y POLOCUHE. A modo de demostración, la plataforma permite consultar tres bases de datos principales: Clima, Alimentación e Informes Ambientales (este último exclusivo para Pirquen).1. Datos Climáticos 2. Sistema de Alimentación 3. Informes Ambientales",
    },
  ]);

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
        sender: "bot",
        text: "¡Hola! Soy WIS-AI Bienvenido a la sección de Análisis, una interfaz diseñada para ofrecer acceso a datos específicos y detallados organizados por centros. Actualmente disponemos de información de los centros PIRQUEN y POLOCUHE. A modo de demostración, la plataforma permite consultar tres bases de datos principales: Clima, Alimentación e Informes Ambientales (este último exclusivo para Pirquen).1. Datos Climáticos 2. Sistema de Alimentación 3. Informes Ambientales",
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
