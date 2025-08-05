import axios from 'axios';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  refresh_token: string;
  user: {
    id: number;
    name: string;
    email: string;
    roles: string[];
    permisos: string[];
  };
}

export async function loginService(payload: LoginPayload): Promise<LoginResponse> {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const response = await axios.post(`${apiUrl}/auth/login`, payload);
  return response.data;
} 