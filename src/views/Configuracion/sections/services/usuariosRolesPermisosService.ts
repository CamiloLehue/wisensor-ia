import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_BASE_URL;

// Usuarios
export const getUsuarios = async () => axios.get(`${apiUrl}/users/`).then(r => r.data);
export const createUsuario = async (data: any) => axios.post(`${apiUrl}/users/`, data).then(r => r.data);
export const updateUsuario = async (id: number, data: any) => axios.put(`${apiUrl}/users/${id}/`, data).then(r => r.data);
export const deleteUsuario = async (id: number) => axios.delete(`${apiUrl}/users/${id}/`).then(r => r.data);

// Roles
export const getRoles = async () => axios.get(`${apiUrl}/roles/`).then(r => r.data);
export const getRolesWithPermissions = async () => {
  const token = localStorage.getItem('access_token');
  return axios.get(`${apiUrl}/roles/`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.data);
};
export const createRole = async (data: any) => axios.post(`${apiUrl}/roles/`, data).then(r => r.data);
export const updateRole = async (id: number, data: any) => axios.put(`${apiUrl}/roles/${id}/`, data).then(r => r.data);
export const deleteRole = async (id: number) => axios.delete(`${apiUrl}/roles/${id}/`).then(r => r.data);

// Permisos
export const getPermisos = async () => axios.get(`${apiUrl}/permissions/`).then(r => r.data);
export const createPermiso = async (data: any) => axios.post(`${apiUrl}/permissions/`, data).then(r => r.data);
export const updatePermiso = async (id: number, data: any) => axios.put(`${apiUrl}/permissions/${id}/`, data).then(r => r.data);
export const deletePermiso = async (id: number) => axios.delete(`${apiUrl}/permissions/${id}/`).then(r => r.data); 