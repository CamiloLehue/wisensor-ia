import { LogIn, Mail, Lock } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Version from "../../components/Version";
import { useLogin } from "./hooks/useLogin";
import { AdvancedButton } from "../../components/ui/AdvancedButton";

export const Login = () => {
  const { login: loginContext } = useAuth();
  const { login, loading, error } = useLogin();
  const [formError, setFormError] = useState<string[] | null>(null);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = (e.target as HTMLFormElement).email.value;
    const password = (e.target as HTMLFormElement).password.value;
    setFormError(null);
    const result = await login({ email, password });
    if (result) {
      loginContext(result.token, result.refresh_token, result.user);
    } else {
      setFormError([error || 'Error al iniciar sesión']);
    }
  };

  return (
    <div className="relative h-screen w-full flex flex-col lg:flex-row bg-azul-dark overflow-hidden">
      {/* Imagen de fondo global con overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center scale-105"
          style={{ backgroundImage: "url('assets/fondoblanco4.png')" }}
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Columna izquierda vacía en desktop (solo fondo) */}
      <div className="hidden lg:block lg:w-3/5" />

      {/* Columna derecha con el card */}
      <div className="relative z-10 w- flex-1 flex items-center justify-center lg:w-2/5">
        <div className="w-full max-w-sm mx-auto flex flex-col items-center justify-center">
          <div className="w-90 bg-[#08141e53] border border-[#182a38] rounded-2xl shadow-2xl p-8 flex flex-col items-center animate-fade-in backdrop-blur-md">
            {/* Logo y branding dentro del card */}
            <div className="flex flex-col items-center mb-6">
              <span className="text-3xl  text-cyan-100 tracking-wide drop-shadow-lg mb-2">Wi<span className="text-cyan-100">sensor</span><span className="text-cyan-400">IA</span></span>
              <span className="text-xs text-gray-400 mb-2">Sistema Inteligente para la Industria Salmonera</span>
              <span className="text-xs text-gray-500"> <Version /></span>
            </div>

            {/* Formulario */}
            <form
              method="POST"
              className="space-y-5 w-70"
              onSubmit={handleLogin}
            >
              {(formError && formError.length > 0) && (
                <div className="mb-2 p-2 bg-red-900/30 border border-red-800 rounded-md text-red-400 text-xs">
                  {formError.map((err, index) => (
                    <div key={index}>{err}</div>
                  ))}
                </div>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-medium text-gray-300 mb-1"
                >
                  Correo Electrónico
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    className="w-full pl-10 pr-4 py-2  border border-[#182a38] rounded-lg focus:ring-1 focus:ring-cyan-800 focus:border-cyan-800 outline-none transition text-sm"
                    placeholder="usuario@ejemplo.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-xs font-medium text-gray-300 mb-1"
                >
                  Contraseña
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    id="password"
                    className="w-full pl-10 pr-4 py-2  border border-[#182a38] rounded-lg focus:ring-1 focus:ring-cyan-800 focus:border-cyan-800 outline-none transition text-sm"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <AdvancedButton
                type="submit"
                variant="solid"
                size="large"
                className="w-full !bg-cyan-500/90 hover:!bg-cyan-600 flex items-center justify-center gap-2 !shadow-md mt-2"
                disabled={loading}
              >
                <LogIn className="h-5 w-5" />
                {loading ? 'Ingresando...' : 'Ingresar al sistema'}
              </AdvancedButton>
            </form>
          </div>
          {/* Footer fuera del card, centrado */}
          <div className="mt-8 text-center text-xs text-gray-500">
            <p>© {new Date().getFullYear()} Wisensor. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
