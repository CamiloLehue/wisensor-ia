import React, { useRef } from "react";
import { ChatBotSvg } from "./svg/ChatBotSvg";
import { useRobotAnimation } from "../hooks/useRobotAnimation";
import { SuggestedQuestions } from "./SuggestedQuestions";

interface WelcomeMessageProps {
  onQuestionSelect?: (question: string) => void;
}

export const WelcomeMessage: React.FC<WelcomeMessageProps> = ({
  onQuestionSelect,
}) => {
  const container = useRef<HTMLDivElement>(null);

  useRobotAnimation(container);

  return (
    <div className="relative w-full max-w-5xl mx-auto flex flex-col justify-center items-center mb-5">
      <div className="absolute top-25 left-[50%] -translate-x-1/2 h-20 w-50 rounded-full bg-red-300 group-hover:bg-blue-500 transition-all duration-1000 blur-3xl opacity-25"></div>
      <div ref={container} className="py-5 h-30 w-30 container">
        <ChatBotSvg />
      </div>
      <h2 className="text-balance text-center text-gray-100 text-2xl font-semibold mb-2">
        ¡Bienvenido al Asistente de Análisis IA!
      </h2>
      <small className="text-balance text-center text-amber-400 mb-6  font-medium">
        Versión Beta 1.0.3 - Tecnología en desarrollo
      </small>
      <p className="text-balance text-center text-gray-300 text-base mb-2">
        Tu asistente inteligente para consultar información histórica y en
        tiempo real de los centros{" "}
      </p>
      <p className="text-balance text-center text-gray-400 mb-6">
        Accede instantáneamente a tres bases de datos especializadas para tomar
        decisiones informadas
      </p>

      {onQuestionSelect && (
        <SuggestedQuestions onQuestionSelect={onQuestionSelect} />
      )}
    </div>
  );
};
