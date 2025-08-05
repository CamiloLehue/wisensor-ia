import { X } from "lucide-react";

export const InfoModal = ({ onClose: onClose }: { onClose: () => void }) => {
  const infoContent = (
    <>
      <div className="mb-2">
        <h3 className="text-xl font-semibold mb-3">
          ¡Hola! Soy WIS-AI <span className="text-red-500">WIS-AI</span>
        </h3>
        <p className="text-gray-400 leading-relaxed">
          Bienvenido a la sección de Análisis, una interfaz diseñada para
          ofrecer acceso a datos específicos y detallados organizados por
          centros. Actualmente disponemos de información de los centros PIRQUEN
          y POLOCUHE. A modo de demostración, la plataforma permite consultar
          tres bases de datos principales: Clima, Alimentación e Informes
          Ambientales (este último exclusivo para Pirquen).
        </p>
      </div>

      <div className="mb-2">
        <h4 className="font-bold text-lg mb-3 text-[#b6d6f0] border-b pb-1">
          1. Datos Climáticos
        </h4>
        <p className="mb-2 text-gray-400">
          Información meteorológica que incluye temperatura, velocidad del
          viento y presión atmosférica.
        </p>
        <p className="text-sm italic text-gray-500 mb-3">
          Ejemplos de consulta: Puede solicitar datos de estas variables dentro
          de rangos temporales específicos.
        </p>
        <ul className="list-disc list-inside ml-4 mb-3 space-y-1 text-sm text-gray-400">
          <li>
            "Muestra un gráfico de registros de temperatura del 1 de junio para
            Pirquen"
          </li>
          <li>"¿Cuál fue la temperatura el 3 de mayo en pirquen?"</li>
          <li>
            ¿me puedes dar un grafico de clima y alimentacion para pirquen?
          </li>
        </ul>
      </div>

      <div className="mb-2">
        <h4 className="font-bold text-lg mb-3 text-[#b6d6f0] border-b pb-1">
          2. Sistema de Alimentación
        </h4>
        <p className="mb-2 text-gray-400">
          Datos detallados sobre el estado de los sistemas de alimentación en
          ambos centros.
        </p>
        <p className="text-sm italic text-gray-500 mb-3">
          Ejemplos de consulta: Puede indagar sobre el estado del suministro y
          posibles incidencias.
        </p>
        <ul className="list-disc list-inside ml-4 mb-3 space-y-1 text-sm text-gray-400">
          <li>"muestrame datos de alimentación para pirquen"</li>
        </ul>
      </div>

      <div className="mb-2">
        <h4 className="font-bold text-lg mb-3 text-[#b6d6f0] border-b pb-1">
          3. Informes Ambientales
        </h4>
        <p className="mb-2 text-gray-400">
          Resúmenes de datos ambientales del fondo marino (actualmente
          disponible solo para Pirquen).
        </p>
        <p className="text-sm italic text-gray-500 mb-3">
          Ejemplos de consulta: Solicite informes para evaluar condiciones del
          fondo marino, especialmente útiles para cultivos.
        </p>
        <ul className="list-disc list-inside ml-4 mb-3 space-y-1 text-sm text-gray-400">
          <li>"Muestra el último informe ambiental de Pirquen"</li>
          <li>Dame datos del último informe comparativo de pirquen</li>
        </ul>
      </div>
    </>
  );

  type InfoModalProps = {
    children?: React.ReactNode;
    title?: string;
    subtitle?: string;
  };

  const CardStyles = ({ children, title, subtitle }: InfoModalProps) => {
    return (
      <div className="relative hover:scale-102 cursor-pointer hover:mx-2 transition-all duration-300 bg-gradient-to-b from-[#04040a] to-[#0dcac7] h-160 w-100 rounded-2xl p-[1px] shadow-xl shadow-amber-400/10">
        <div className="relative bg-[#04040a] opacity-90 overflow-hidden   h-full w-full rounded-2xl">
          <div className="relative h-10 w-full flex justify-end items-center px-4 border-b border-b-[#29293f]">
            <h2 className="absolute left-[50%] -translate-x-1/2 text-sky-400 text-nowrap text-center text-lg">
              {title}
            </h2>
            <button
              className="cursor-pointer hover:text-sky-500v "
              onClick={onClose}
            >
              <X />
            </button>
          </div>
          <div className="w-full flex flex-col justify-center items-center ">
            <h3 className="text-gray-400 text-xs">{subtitle}</h3>
          </div>
          <div className=" w-full h-full py-2 px-5">{children}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-lg  flex flex-col items-center justify-center gap-2 z-50 p-4">
      <div className="w-full max-w-3xl mx-auto flex flex-col justify-center items-center mb-5 ">
        <p className="text-balance text-center text-gray-200">
          ¡Te damos la bienvenida a la sección de Análisis!
        </p>
        <p className="text-balance text-center text-amber-500 mb-4">
          (Versión beta)
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
          <p className="text-sky-300 border border-sky-300/50 px-2 rounded">
            Clíma
          </p>
          <p className="text-amber-300 border border-amber-300/50 px-2 rounded">
            Alimentación
          </p>
          <div className=" flex flex-col justify-center items-center">
            <p className="text-lime-300 border border-lime-300/50 px-2 rounded">
              Informes Ambientales{" "}
            </p>
            <span className="text-gray-300 text-xs">
              (exclusivo para Pirquén)
            </span>
          </div>
        </div>
      </div>

      {
        <div className="flex  gap-2 items-start justify-center">
          <CardStyles
            subtitle="Rango de 2025-05-03 a 2025-07-14"
            title="Datos Climáticos"
          >
            <div className="mb-2 w-full">
              <p className="mb-2 text-gray-100 text-center ">
                Información meteorológica que incluye temperatura, velocidad del
                viento y presión atmosférica.
              </p>
              <span className="text-center"> Ejemplos de consulta</span>
              <p className="text-xs italic text-gray-400 mb-3 text-center">
                , Puedes solicitar datos de estas variables dentro de rangos
                temporales específicos.
              </p>
              <ul className="list-disc list-inside ml-4 mb-3 space-y-1 text-sm text-gray-400">
                <li>
                  "Muestra un gráfico de registros de temperatura del 1 de junio
                  para Pirquen"
                </li>
                <li>"¿Cuál fue la temperatura el 3 de mayo en pirquen?"</li>
                <li>
                  ¿me puedes dar un grafico de clima y alimentacion para
                  pirquen?
                </li>
              </ul>
            </div>
          </CardStyles>
          <CardStyles
            subtitle="Rango de 2024-09-01 a 2025-06-24"
            title=" Sistema de Alimentación"
          >
            <h1>Prueba</h1>
          </CardStyles>
          <CardStyles
            subtitle="Rango de 8 informes del 2023 al 2024"
            title="Informes Ambientales"
          >
            <h1>Prueba</h1>
          </CardStyles>
        </div>
      }
    </div>
  );
};
export default InfoModal;
