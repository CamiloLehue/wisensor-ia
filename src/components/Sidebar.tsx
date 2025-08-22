import { Settings, BarChart2, Gauge, BotMessageSquare } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { path: "/analisis", icon: BarChart2, label: "Chat Análisis" },
    // { path: "/inicio", icon: House, label: "Inicio" },
    { path: "/dashboard", icon: Gauge, label: "Dashboard" },
    // { path: "/inventario", icon: ShoppingBag, label: "GraficosEj" },
    // Nueva entrada para la vista de Análisis
    { path: "/futuro", icon: BotMessageSquare, label: "Futuro" },
    { path: "/configuracion", icon: Settings, label: "Configuración" },
  ];

  return (
    <aside className="sidebar sidebarColor h-screen flex-shrink-0 flex flex-col border-r border-[#2a2d32] fixed z-50 transition-all duration-300 hover:w-56 w-16 group">
      {/* Logo */}
      <div className="p-4 border-b border-[#2a2d32] flex justify-center">
        <div className="bg-gray-800/20 rounded-lg p-2 min-w-[2.5rem] flex justify-center transition-all duration-300 group-hover:min-w-[10rem]">
          <img
            src="/assets/ASTlogo.png"
            alt="Logo AST"
            className="h-6 min-h-[1.5rem] transition-all duration-300 group-hover:scale-110"
          />
        </div>
      </div>

      {/* Menú */}
      <nav className="flex-1 overflow-y-auto no-scrollbar pt-2">
        <ul className="px-2 space-y-1">
          {menuItems.map((item, index) => (
            <li key={index} className="relative flex items-center">
              <Link
                to={item.path}
                className={`sidebar-menu-link relative flex items-center p-2 rounded-lg transition-all duration-200 group-hover:pl-3 text-xs font-semibold gap-2 w-full
              ${
                location.pathname === item.path
                  ? "bg-cyan-600/20 border border-dashed border-[#0af] text-white"
                  : "text-gray-400 hover:bg-gray-700/60 hover:text-white border border-transparent"
              }
            `}
              >
                {/* Barra lateral más delgada y sutil */}
                {location.pathname === item.path && (
                  <span className="absolute left-0 w-[2px] h-5 rounded-full bg-cyan-400 transition-all duration-300"></span>
                )}

                {item.path === "/analisis" ? (
                  <img
                    src="/public/logo-ia-animate.svg"
                    alt="Logo ia"
                    className="w-9"
                  />
                ) : (
                  <item.icon
                    size={20}
                    className={`flex-shrink-0 transition-all duration-200 ml-1
                ${
                  location.pathname === item.path
                    ? "text-cyan-400"
                    : "text-gray-400 group-hover:text-cyan-400"
                }
              `}
                  />
                )}

                {item.path === "/analisis" ? (
                  <span className="text-clip bg-clip-text text-transparent bg-gradient-to-bl from-red-300 font-bold to-sky-300 whitespace-nowrap transition-all duration-200 opacity-0 group-hover:opacity-100 group-hover:ml-2 overflow-hidden">
                    {item.label}
                  </span>
                ) : (
                  <span className="sidebar-text whitespace-nowrap transition-all duration-200 opacity-0 group-hover:opacity-100 group-hover:ml-2 overflow-hidden">
                    {item.label}
                  </span>
                )}

                {/* Texto del menú */}
              </Link>

              {/* Tooltip para estado colapsado */}
              <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 rounded-md bg-gray-900 text-white text-xs font-semibold shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-200 z-50 whitespace-nowrap">
                {item.label}
              </div>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer del sidebar */}
      <div className="p-3 border-t border-[#2a2d32] flex items-center justify-center">
        <span className="sidebar-wisensor text-[11px] font-semibold tracking-widest transition-all duration-300 opacity-0 group-hover:opacity-100">
          <span className="text-red-dark">WI</span>
          <span className="text-gray-300">SENSOR</span>
        </span>
      </div>
    </aside>
  );
}

export default Sidebar;
