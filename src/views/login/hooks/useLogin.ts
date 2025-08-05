import { useState } from 'react';
import { loginService, LoginPayload, LoginResponse } from '../services/loginService';

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (payload: LoginPayload): Promise<LoginResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const data = await loginService(payload);
      setLoading(false);
      return data;
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Error al iniciar sesión');
      setLoading(false);
      return null;
    }
  };

  return { login, loading, error };
} 