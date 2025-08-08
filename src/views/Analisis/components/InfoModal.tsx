import { X } from "lucide-react";

export const InfoModal = ({ onClose: onClose }: { onClose: () => void }) => {

  type InfoModalProps = {
    children?: React.ReactNode;
    title?: string;
    subtitle?: string;
  };

  const CardStyles = ({ children, title, subtitle }: InfoModalProps) => {
    const colorSelect = (title: string | undefined) => {
      if (title?.includes("Datos")) {
        return "#1dddff";
      } else if (title?.includes("Sistema")) {
        return "#ffcd16";
      } else {
        return "#bbf451";
      }
    };

    return (
      <div className="relative  cursor-pointer hover:mx-2 transition-all duration-300 bg-gradient-to-b from-[#04040a] to-[#0dcac7] h-160 w-100 rounded-2xl p-[1px] shadow-xl shadow-amber-400/10">
        <div className="relative bg-[#04090a] opacity-90 overflow-hidden   h-full w-full rounded-2xl">
          <div className="absolute -bottom-20 left-[50%] -translate-x-1/2 h-20 w-50 rounded-full bg-lime-500 blur-3xl opacity-15"></div>
          <div
            style={{
              backgroundColor: colorSelect(title),
            }}
            className="absolute -bottom-13 left-[50%] -translate-x-1/2 h-30 w-30 rounded-full bg-sky-500 blur-2xl opacity-15"
          ></div>
          <div className="relative h-10 w-full flex justify-end items-center px-4 border-b border-b-[#29293f]">
            <h2
              className="absolute left-[50%]  -translate-x-1/2 text-sky-400 text-nowrap text-center text-lg"
              style={{
                color: colorSelect(title),
              }}
            >
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
            <h3 className="text-gray-400 text-xs py-5">{subtitle}</h3>
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
          <p className="text-sky-300 border border-sky-300/50 px-2 rounded">
            Clima
          </p>
          <p className="text-amber-300 border border-amber-300/50 px-2 rounded">
            Alimentación
          </p>
          <div className=" flex flex-col justify-center items-center">
            <p className="text-lime-300 border border-lime-300/50 px-2 rounded">
              Informes Ambientales{" "}
            </p>
            <span className="text-gray-300 text-xs">
              (exclusivo para Pirquen)
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
            <div className="mb-2 w-full max-w-[300px] mx-auto">
              <p className="mb-5 text-gray-100 text-center font-bold ">
                Información meteorológica que incluye temperatura, velocidad del
                viento y presión atmosférica.
              </p>
              <p className="text-center bg-sky-700/20 rounded mb-2 py-0.5 text-white">
                {" "}
                Ejemplos de consulta
              </p>
              <p className="text-xs italic text-gray-400 mb-6 text-center ">
                Puedes solicitar datos de estas variables dentro de rangos
                temporales específicos.
              </p>
              <ul className="mb-3 space-y-0.5 text-sm text-white">
                <li className="hover:bg-sky-950 border-s border-s-sky-400 ps-3 min-h-16 border-b border-neutral-400/40 py-3">
                  Muestra un gráfico de registros de temperatura del 1 de junio
                  para Pirquen
                </li>
                <li className="hover:bg-sky-950 border-s border-s-sky-400 ps-3 min-h-16 border-b border-neutral-400/40 py-3">
                  ¿Cuál fue la temperatura el 3 de mayo en pirquen?
                </li>
                <li className="hover:bg-sky-950 border-s border-s-sky-400 ps-3 min-h-16 border-b border-neutral-400/40 py-3">
                  ¿Me puedes dar un grafico de clima y alimentación para
                  pirquen?
                </li>
              </ul>
            </div>
          </CardStyles>
          <CardStyles
            subtitle="Rango de 2024-09-01 a 2025-06-24"
            title=" Sistema de Alimentación"
          >
            <div className="mb-2 w-full max-w-[300px] mx-auto">
              <p className="mb-5 text-gray-100 text-center font-bold ">
                Datos detallados sobre el estado de los sistemas de alimentación
                en ambos centros.
              </p>
              <p className="text-center bg-amber-400/20 rounded mb-2 py-0.5 text-white">
                {" "}
                Ejemplos de consulta
              </p>
              <p className="text-xs italic text-gray-400 mb-6 text-center ">
                Puedes solicitar datos de estas variables dentro de rangos
                temporales específicos.
              </p>
              <ul className="mb-3 space-y-0.5 text-sm text-white">
                <li className="hover:bg-amber-950 border-s border-s-amber-400 ps-3 min-h-16 border-b border-neutral-400/40 py-3">
                  Muestrame datos de alimentación para pirquen
                </li>
                <li className="hover:bg-amber-950 border-s border-s-amber-400 ps-3 min-h-16 border-b border-neutral-400/40 py-3">
                  Generame un gráfico de alimentación para pirquen
                </li>
                <li className="hover:bg-amber-950 border-s border-s-amber-400 ps-3 min-h-16 border-b border-neutral-400/40 py-3">
                  Entrégame un análisis de los últimos datos de alimentación de
                  pirquen
                </li>
              </ul>
            </div>
          </CardStyles>
          <CardStyles
            subtitle="Rango de 8 informes del 2023 al 2024"
            title="Informes Ambientales"
          >
            <div className="mb-2 w-full max-w-[300px] mx-auto">
              <p className="mb-5 text-gray-100 text-center font-bold ">
                Resúmenes de datos ambientales del fondo marino (actualmente
                disponible solo para Pirquen).
              </p>
              <p className="text-center bg-lime-700/20 rounded mb-2 py-0.5 text-white">
                {" "}
                Ejemplos de consulta
              </p>
              <p className="text-xs italic text-gray-400 mb-6 text-center ">
                Puedes solicitar datos de estas variables dentro de rangos
                temporales específicos.
              </p>
              <ul className="mb-3 space-y-0.5 text-sm text-white">
                <li className="hover:bg-lime-950 border-s border-s-lime-400 ps-3 min-h-16 border-b border-neutral-400/40 py-3">
                  Muestra el último informe ambiental de Pirquen
                </li>
                <li className="hover:bg-lime-950 border-s border-s-lime-400 ps-3 min-h-16 border-b border-neutral-400/40 py-3">
                  ¿Dame datos del último informe comparativo de pirquen?
                </li>
                <li className="hover:bg-lime-950 border-s border-s-lime-400 ps-3 min-h-16 border-b border-neutral-400/40 py-3">
                  ¿Según el último informe consideras que es un ambiente óptimo para el crecimiento de salmones, en pirquen?
                </li>
              </ul>
            </div>
          </CardStyles>
        </div>
      }
    </div>
  );
};
export default InfoModal;
