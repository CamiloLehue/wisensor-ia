import { Link } from "react-router-dom";
/* import { usePermission } from "../../hooks/rolesypermisos/usePermission"; */

export const Configuracion = () => {
  //permisos
  /* const verUsuarios = usePermission("ver usuario");
  const verrolesyPermisos = usePermission("ver roles");
  const verInventario = usePermission("ver inventario"); */
  return (
    <div className="w-full h-screen p-2 bg-azul-dark font-montserrat">
      <div className="h-full rounded-lg   relative overflow-hidden">
        {/* Título */}
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-2xl font-bold text-white">
            Configuración del sistema{" "}
            <span className="text-gray-200">Wisensor<span className="text-cyan-300">IA</span></span> 
          </h1>
          <p className="text-gray-400 mt-1">Gestión completa del sistema</p>
        </div>

        {/* Tarjetas de configuración */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-6">
          {/* Tarjeta Usuarios, Roles y Permisos */}
          {/* {verUsuarios&&( */}
          <Link to="/configuracion/usuarios-roles-permisos" className="group">
            <div className="h-full rounded-lg border border-[#182a38] bg-[#08141e] p-5 shadow-md transition-all duration-300 hover:border-red-dark/50 hover:bg-[#08141e]/90 hover:shadow-lg">
              <div className="flex flex-col h-full">
                <h3 className="text-sm font-semibold text-gray-300 tracking-wide mb-3 group-hover:text-red-dark transition-colors">
                  Usuarios, Roles y Permisos
                </h3>
                <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-3"></div>
                <p className="text-gray-400 text-xs flex-1">
                  Administración completa de usuarios, roles y permisos del sistema
                </p>
                <div className="mt-4 text-red-dark font-medium flex items-center group-hover:translate-x-1 transition-transform">
                  Acceder
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </div>
            </div>
          </Link>
          {/* )} */}

          {/* Tarjeta Centros */}
          {/* {gestionarConfiguracion&&( */}
          <Link to="/configuracion/centros" className="group">
            <div className="h-full rounded-lg border border-[#182a38] bg-[#08141e] p-5 shadow-md transition-all duration-300 hover:border-red-dark/50 hover:bg-[#08141e]/90 hover:shadow-lg">
              <div className="flex flex-col h-full">
                <h3 className="text-sm font-semibold text-gray-300 tracking-wide mb-3 group-hover:text-red-dark transition-colors">
                  Gestión de Centros
                </h3>
                <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-3"></div>
                <p className="text-gray-400 text-xs flex-1">
                  Administración de los centros de operaciones para análisis de datos.
                </p>
                <div className="mt-4 text-red-dark font-medium flex items-center group-hover:translate-x-1 transition-transform">
                  Acceder
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </div>
            </div>
          </Link>
          {/* )} */}

          {/* Tarjeta Inventario */}
          {/* {verInventario&&( */}
         {/*  <Link to="/configuracion/inventario" className="group">
            <div className="h-full rounded-lg border border-[#182a38] bg-[#08141e] p-5 shadow-md transition-all duration-300 hover:border-red-dark/50 hover:bg-[#08141e]/90 hover:shadow-lg">
              <div className="flex flex-col h-full">
                <h3 className="text-sm font-semibold text-gray-300 tracking-wide mb-3 group-hover:text-red-dark transition-colors">
                  Inventario
                </h3>
                <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-3"></div>
                <p className="text-gray-400 text-xs flex-1">
                  Gestión de equipos y dispositivos
                </p>
                <div className="mt-4 text-red-dark font-medium flex items-center group-hover:translate-x-1 transition-transform">
                  Acceder
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </div>
            </div>
          </Link> */}
         {/*  )} */}
        </div>
      </div>
    </div>
  );
};
export default Configuracion;
