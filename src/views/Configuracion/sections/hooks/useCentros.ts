import { useState, useEffect } from 'react';
import { Center, CreateCenterData, UpdateCenterData, getCenters, createCenter, updateCenter, deleteCenter } from '../services/centersService';
import { informesCentroService, InformeCentro, CreateInformeCentroData } from '../services/informesCentroService';

export const useCentros = () => {
  const [centros, setCentros] = useState<Center[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCenter, setSelectedCenter] = useState<Center | null>(null);

  const cargarCentros = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getCenters();
      setCentros(data);
    } catch (err: any) {
      setError('Error al cargar los centros: ' + (err.response?.data?.detail || err.message));
      console.error('Error al cargar los centros:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const crearCentro = async (centerData: CreateCenterData) => {
    setIsLoading(true);
    setError(null);
    try {
      await createCenter(centerData);
      await cargarCentros(); // Recargar la lista después de crear
    } catch (err: any) {
      setError('Error al crear el centro: ' + (err.response?.data?.detail || err.message));
      console.error('Error al crear el centro:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const actualizarCentro = async (id: number, centerData: UpdateCenterData) => {
    setIsLoading(true);
    setError(null);
    try {
      await updateCenter(id, centerData);
      await cargarCentros(); // Recargar la lista después de actualizar
    } catch (err: any) {
      setError('Error al actualizar el centro: ' + (err.response?.data?.detail || err.message));
      console.error('Error al actualizar el centro:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const eliminarCentro = async (id: number) => {
    setIsLoading(true);
    setError(null);
    try {
      await deleteCenter(id);
      await cargarCentros(); // Recargar la lista después de eliminar
    } catch (err: any) {
      setError('Error al eliminar el centro: ' + (err.response?.data?.detail || err.message));
      console.error('Error al eliminar el centro:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const asignarInformeACentro = async (centerId: number, reportData: CreateInformeCentroData) => {
    setIsLoading(true);
    setError(null);
    try {
        await informesCentroService.createInformeCentro(reportData);
        // Si el centro al que se asignó el informe está actualmente seleccionado, actualiza su estado
        if (selectedCenter && selectedCenter.id === centerId) {
            const updatedCenter = await informesCentroService.getInformesByCenterId(centerId);
            setSelectedCenter({ ...selectedCenter, informes: updatedCenter });
        }
        await cargarCentros(); // Recargar todos los centros para asegurar consistencia
    } catch (err: any) {
        setError('Error al asignar informe al centro: ' + (err.response?.data?.detail || err.message));
        console.error('Error al asignar informe al centro:', err);
    } finally {
        setIsLoading(false);
    }
  };

  const eliminarInformeDeCentro = async (informeId: number, centerId: number) => {
    setIsLoading(true);
    setError(null);
    try {
        await informesCentroService.deleteInformeCentro(informeId);
        // Si el centro al que se eliminó el informe está actualmente seleccionado, actualiza su estado
        if (selectedCenter && selectedCenter.id === centerId) {
            const updatedCenter = await informesCentroService.getInformesByCenterId(centerId);
            setSelectedCenter({ ...selectedCenter, informes: updatedCenter });
        }
        await cargarCentros(); // Recargar todos los centros para asegurar consistencia
    } catch (err: any) {
        setError('Error al eliminar informe del centro: ' + (err.response?.data?.detail || err.message));
        console.error('Error al eliminar informe del centro:', err);
    } finally {
        setIsLoading(false);
    }
  };

  useEffect(() => {
    cargarCentros();
  }, []);

  return { 
    centros, 
    isLoading, 
    error, 
    selectedCenter, 
    setSelectedCenter, 
    cargarCentros, 
    crearCentro, 
    actualizarCentro, 
    eliminarCentro, 
    asignarInformeACentro, 
    eliminarInformeDeCentro 
  };
}; 