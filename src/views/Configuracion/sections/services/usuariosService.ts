import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_BASE_URL;

export const getUsers = async () => {
  return axios.get(`${apiUrl}/users/`).then(r => r.data);
};

export const createUser = async (data: any) => {
  return axios.post(`${apiUrl}/users/`, data).then(r => r.data);
};

export const updateUser = async (id: number, data: any) => {
  return axios.put(`${apiUrl}/users/${id}/`, data).then(r => r.data);
};

export const deleteUser = async (id: number) => {
  return axios.delete(`${apiUrl}/users/${id}/`).then(r => r.data);
};

export const getRoles = async () => {
  return axios.get(`${apiUrl}/roles/`).then(r => r.data);
}; 