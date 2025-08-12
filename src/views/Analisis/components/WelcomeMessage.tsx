import React, { useRef } from "react";
import {ChatBotSvg} from "./svg/ChatBotSvg";
import { useRobotAnimation } from "../hooks/useRobotAnimation";

export const WelcomeMessage: React.FC = () => {
  const container = useRef<HTMLDivElement>(null);
  
  useRobotAnimation(container, {
    floatHeight: 5,
    floatDuration: 10,
    entryDuration: 1.5
  });

  return (
    <div className="relative w-full max-w-5xl mx-auto flex flex-col justify-center items-center mb-5">
      <div className="absolute top-25 left-[50%] -translate-x-1/2 h-20 w-50 rounded-full bg-red-300 group-hover:bg-blue-500 transition-all duration-1000 blur-3xl opacity-25"></div>
      <div ref={container} className="py-5 h-30 w-30 container">
        <ChatBotSvg />
      </div>
      <p className="text-balance text-center text-gray-200">
        ¡Te damos la bienvenida a la sección de Análisis!
      </p>
      <p className="text-balance text-center text-amber-500 mb-4">
        (Versión beta) Beta 1.0.2
      </p>
      <p className="text-balance text-center text-gray-300">
        Actualmente, puedes acceder a información de los centros{"  "}
        <span className="font-bold text-white">PIRQUEN y POLOCUHE</span>.
      </p>
      <p className="text-balance text-center text-gray-300 mb-4">
        {" "}
        la plataforma te permite consultar tres bases de datos principales
      </p>
      <div className="flex justify-center items-start gap-5">
        <p className=" cursor-default py-1 text-sky-300 border border-dashed border-sky-300/50 px-4 rounded">
          Clima
        </p>
        <p className=" cursor-default py-1 text-amber-300 border border-dashed border-amber-300/50 px-4 rounded">
          Alimentación
        </p>
        <div className=" cursor-default flex flex-col justify-center items-center">
          <p className="text-lime-300 py-1 border border-dashed border-lime-300/50 px-4 rounded">
            Informes Ambientales{" "}
          </p>
          <span className="text-gray-500 text-xs">
            (Exclusivo para Pirquen)
          </span>
        </div>
      </div>
    </div>
  );
};
