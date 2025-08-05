import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout() {
  return (
    <>
      {/* <Header /> */}
      {/* Aquí se renderizará el contenido dinámico */}
      <div className="text-gray-200 overflow-hidden h-screen flex bg-azul-dark">
        <Sidebar />
        <div className="flex-1 flex flex-col h-full ml-16 min-h-0">
          <Header />
          <div className="flex-1 flex flex-col min-h-0">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
