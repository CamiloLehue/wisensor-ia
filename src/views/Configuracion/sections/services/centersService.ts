import axios from 'axios';
import { InformeCentro } from './informesCentroService';

const apiUrl = import.meta.env.VITE_API_BASE_URL;

export interface Center {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  code: string;
  name1: string | null;
  name2: string | null;
  created_at: string;
  updated_at: string | null;
  informes: InformeCentro[]; // Añadido para incluir informes
}

export interface CreateCenterData {
  name: string;
  latitude: number;
  longitude: number;
  code: string;
  name1: string | null;
  name2: string | null;
}

export interface UpdateCenterData {
  name?: string;
  latitude?: number;
  longitude?: number;
  code?: string;
  name1?: string | null;
  name2?: string | null;
}

export const getCenters = async (): Promise<Center[]> => {
  return axios.get(`${apiUrl}/centers/`).then(r => r.data);
};

export const createCenter = async (data: CreateCenterData): Promise<Center> => {
  return axios.post(`${apiUrl}/centers/`, data).then(r => r.data);
};

export const updateCenter = async (id: number, data: UpdateCenterData): Promise<Center> => {
  return axios.put(`${apiUrl}/centers/${id}`, data).then(r => r.data);
};

export const deleteCenter = async (id: number): Promise<void> => {
  return axios.delete(`${apiUrl}/centers/${id}`).then(r => r.data);
}; 