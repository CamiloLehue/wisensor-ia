import React, { useEffect, useRef } from "react";
import { Info, Trash2 } from "lucide-react";
import { gsap } from "gsap";
import { ChatBotSvgStatic } from "./svg/ChatBotSvg";
interface ChatHeaderProps {
  handleToggleInfoModal: () => void;
  handleClearChat: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  handleToggleInfoModal,
  handleClearChat,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación secuencial usando timeline
      const tl = gsap.timeline();

      // 1. Título Bot Agente (izquierda)
      tl.from(".bot-title", {
        scale: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.5)",
        opacity: 1
      });

      // 2. Botón de información
      tl.from(".info-button", {
        scale: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.5)",
        opacity: 1
      }, "-=0.4");

      // 3. Título principal (centro)
      tl.from(".main-title", {
        scale: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.5)",
        opacity: 1
      }, "-=0.4");

      // 4. Botón de eliminar (derecha)
      tl.from(".delete-button", {
        scale: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.5)",
        opacity: 1
      }, "-=0.4");
    }, containerRef); // scope al contenedor

    return () => ctx.revert(); // cleanup

  }, []);
  return (
    <div className="flex justify-between items-center mb-10 pb-3 px-5 border-b border-b-[#283a53]">
      <div ref={containerRef} className="flex items-center gap-2">
        <h3 className="bot-title text-base font-normal text-white flex items-center justify-center gap-2 py-1 border border-[#0074f857] px-6 rounded-full ">
          <ChatBotSvgStatic />
          <p className="text-transparent bg-clip-text text-clip bg-gradient-to-br from-[#9448f8] to-[#44fff6]">
            Bot Agente
          </p>
          <p className="text-transparent border border-[#0074f8] rounded px-1 font-bold bg-clip-text text-clip bg-gradient-to-br from-[#0074f8] to-[#6eb2ff]">
            IA
          </p>
        </h3>
        <div
          onClick={handleToggleInfoModal}
          className="info-button group relative flex justify-center cursor-pointer items-center gap-1 bg-amber-800/40 rounded-full px-2 pe-3 py-1 border border-amber-400 "
        >
          <Info
            size={20}
            className="cursor-pointer transform transition-transform group-hover:scale-130 text-amber-400"
          />
          <p>Información</p>
        </div>
      </div>
      <div className="main-title absolute left-[50%] -translate-x-1/2 ">
        <h2 className="text-base font-light text-white">
          <span className="text-red-500">WIS-AI</span> ANÁLISIS
        </h2>
      </div>
      <div
        onClick={handleClearChat}
        className="delete-button flex space-x-2 cursor-pointer "
      >
        <button className="p-1 px-4 flex items-center justify-center gap-1 text-red-100 hover:text-red-500 rounded-full hover:bg-[#080d11] transition-colors">
          <Trash2 size={16} />
          <p className="text-nowrap cursor-pointer">Eliminar conversación</p>
        </button>
      </div>
    </div>
  );
};
