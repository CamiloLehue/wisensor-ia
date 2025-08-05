import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_BASE_URL;

// Roles
export const getRoles = async () => {
  const token = localStorage.getItem('access_token');
  return axios.get(`${apiUrl}/roles/`, {
    headers: { Authorization: `Bearer ${token}` }
  }).then(r => r.data);
};

export const createRole = async (data: any) => {
  const token = localStorage.getItem('access_token');
  return axios.post(`${apiUrl}/roles/`, data, {
    headers: { Authorization: `Bearer ${token}` }
  }).then(r => r.data);
};

export const updateRole = async (id: number, data: any) => {
  const token = localStorage.getItem('access_token');
  return axios.put(`${apiUrl}/roles/${id}/`, data, {
    headers: { Authorization: `Bearer ${token}` }
  }).then(r => r.data);
};

export const deleteRole = async (id: number) => {
  const token = localStorage.getItem('access_token');
  return axios.delete(`${apiUrl}/roles/${id}/`, {
    headers: { Authorization: `Bearer ${token}` }
  }).then(r => r.data);
};

// Permisos
export const getPermissions = async () => {
  const token = localStorage.getItem('access_token');
  return axios.get(`${apiUrl}/permissions/`, {
    headers: { Authorization: `Bearer ${token}` }
  }).then(r => r.data);
};

export const createPermission = async (data: any) => {
  const token = localStorage.getItem('access_token');
  return axios.post(`${apiUrl}/permissions/`, data, {
    headers: { Authorization: `Bearer ${token}` }
  }).then(r => r.data);
};

export const updatePermission = async (id: number, data: any) => {
  const token = localStorage.getItem('access_token');
  return axios.put(`${apiUrl}/permissions/${id}/`, data, {
    headers: { Authorization: `Bearer ${token}` }
  }).then(r => r.data);
};

export const deletePermission = async (id: number) => {
  const token = localStorage.getItem('access_token');
  return axios.delete(`${apiUrl}/permissions/${id}/`, {
    headers: { Authorization: `Bearer ${token}` }
  }).then(r => r.data);
}; 