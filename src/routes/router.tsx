import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import Dashboard from "../views/Dashboard/Dashboard";
import Configuracion from "../views/Configuracion/Configuracion";
import Login from "../views/login/Login";
import { useAuth } from "../contexts/AuthContext";
import { UsuariosRolesPermisos } from "../views/Configuracion/sections/UsuariosRolesPermisos";
import { InventarioConf } from "../views/Configuracion/sections/InventarioConf";
import { Inventario } from "../views/Inventario/Inventario";
import { Analisis } from "../views/Analisis/Analisis"; // Importar la nueva vista de Análisis
import PdfUploadView from "../views/Analisis/components/PdfUploadView"; // Importar la nueva vista de carga de PDF
import { Centros } from "../views/Configuracion/sections/Centros"; // Importar el componente Centros
import Inicio from "../views/Inicio/Inicio";
import { Futuro } from "../views/Futuro/Futuro";

//rutas protegidas
function AuthorizedRoute({
  children,
  requiredPermission,
}: {
  children: React.ReactNode;
  requiredPermission?: string;
}) {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) return <div>Cargando...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  // cuando no hay permisos
  if (requiredPermission && !user?.permisos?.includes(requiredPermission)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div>Cargando...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return <>{children}</>;
}

//invitados
function GuestRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div>Cargando...</div>;
  if (isAuthenticated) return <Navigate to="/analisis" replace />;

  return <>{children}</>;
}

export default createBrowserRouter([
  {
    path: "/login",
    element: (
      <GuestRoute>
        <Login />
      </GuestRoute>
    ),
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/inicio" replace />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },


      {
        path: "/configuracion",
        element: (
            <Configuracion />
        ),
      },



      {
        path: "/configuracion/usuarios-roles-permisos",
        element: (
          <AuthorizedRoute /* requiredPermission="ver usuario" */>
            <UsuariosRolesPermisos />
          </AuthorizedRoute>
        ),
      },
      {
        path: "/configuracion/inventario",
        element: (
          <AuthorizedRoute /* requiredPermission="ver inventario conf" */>
            <InventarioConf />
          </AuthorizedRoute>
        ),
      },
      {
        path: "/configuracion/centros", // Nueva ruta para Centros
        element: (
          <AuthorizedRoute requiredPermission="gestionar_configuracion"> {/* Asumiendo el permiso */} 
            <Centros />
          </AuthorizedRoute>
        ),
      },
      {
        path: "/inventario",
        element: (
          <AuthorizedRoute /* requiredPermission="ver inventario" */>
            <Inventario />
          </AuthorizedRoute>
        ),
      },
      {
        path: "/analisis", // Nueva ruta para la vista de Análisis
        element: (
          <ProtectedRoute>
            <Analisis />
          </ProtectedRoute>
        ),
      }
      ,
      {
        path: "/futuro", // Nueva ruta para la vista de Análisis
        element: (
          <ProtectedRoute>
            <Futuro />
          </ProtectedRoute>
        ),
      },
      {
        path: "/analisis/pdf-upload", // Sub-ruta para la carga de PDF
        element: (
          <ProtectedRoute>
            <PdfUploadView />
          </ProtectedRoute>
        ),
      },
      {
        path: "/inicio",
        element: (
          <ProtectedRoute>
            <Inicio />
          </ProtectedRoute>
        ),
      },
    ],
  },
  // Ruta all para redirigir si no existe
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);
