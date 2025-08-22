import React from "react";

interface SuggestedQuestionsProps {
  onQuestionSelect: (question: string) => void;
}

export const SuggestedQuestions: React.FC<SuggestedQuestionsProps> = ({
  onQuestionSelect,
}) => {
  const suggestedQuestions = [
    "¿Cuál es el clima actual en Pirquen?",
    "¿Cómo está la alimentación de los peces en Polocuhe?",
    "Muéstrame los informes ambientales de Pirquen",
    "¿Cuáles son las condiciones meteorológicas de la semana?",
    "¿Muéstrame la mortalidad de cada centro de cultivo?",
    "¿Que variables puede mostrarme para cada centro de cultivo?",
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 mb-6">
      <h3 className="text-white/80 text-sm mb-4 text-center">
        Preguntas sugeridas para comenzar:
      </h3>
      <small className="text-white/50">
        <span className="text-sky-300 font-italic">
          (Dos clic para búsqueda rápida)
        </span>
      </small>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {suggestedQuestions.map((question, index) => (
          <button
            key={index}
            onClick={() => onQuestionSelect(question)}
            className="group cursor-pointer relative overflow-hidden bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-400/30 rounded-lg p-4 text-left transition-all duration-300 hover:border-blue-400/60 hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-cyan-500/20 hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex justify-center items-center gap-2">
              <p className="text-white/90 text-sm leading-relaxed group-hover:text-white transition-colors duration-300">
                {question}
              </p>
              <div className="relative  bg-blue-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                <div className="w-full h-full rounded-full border border-blue-400/50 flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
