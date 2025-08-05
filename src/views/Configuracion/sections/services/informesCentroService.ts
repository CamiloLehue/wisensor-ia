import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export interface InformeCentro {
  id: number;
  center_id: number;
  report_type: string;
  file_path: string;
  filename: string;
  created_at: string;
  updated_at: string;
  is_analyzed: boolean; // Nuevo campo para indicar si el informe ha sido analizado
}

export interface CreateInformeCentroData {
  center_id: number;
  report_type: string;
  file: File;
}

export interface UpdateInformeCentroData {
  report_type?: string;
  file_path?: string;
  filename?: string;
  is_analyzed?: boolean;
}

export const informesCentroService = {
  async createInformeCentro(data: CreateInformeCentroData): Promise<InformeCentro> {
    const formData = new FormData();
    formData.append('center_id', data.center_id.toString());
    formData.append('report_type', data.report_type);
    formData.append('file', data.file);

    const response = await axios.post<InformeCentro>(`${API_URL}/informes-centro/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async getInformeCentroById(id: number): Promise<InformeCentro> {
    const response = await axios.get<InformeCentro>(`${API_URL}/informes-centro/${id}`);
    return response.data;
  },

  async getInformesByCenterId(centerId: number): Promise<InformeCentro[]> {
    const response = await axios.get<InformeCentro[]>(`${API_URL}/informes-centro/by_center/${centerId}`);
    return response.data;
  },

  async updateInformeCentro(id: number, data: UpdateInformeCentroData): Promise<InformeCentro> {
    const response = await axios.put<InformeCentro>(`${API_URL}/informes-centro/${id}/`, data);
    return response.data;
  },

  async deleteInformeCentro(id: number): Promise<void> {
    await axios.delete(`${API_URL}/informes-centro/${id}/`);
  },

  async analyzePdfAndExtractData(centerId: number, reportType: string, file?: File, filePath?: string): Promise<any> {
    const formData = new FormData();
    formData.append('center_id', centerId.toString());
    formData.append('report_type', reportType);

    if (file) {
      formData.append('file', file);
    } else if (filePath) {
      formData.append('file_path', filePath);
    } else {
      throw new Error("Debe proporcionar un archivo o una ruta de archivo para el análisis.");
    }

    const response = await axios.post(`${API_URL}/pdf-data-extractor/extract-pdf-data/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
}; 