import { useState } from 'react';
import * as service from '../services/usuariosService';

export function useUsuarios() {
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const cargarUsuarios = async () => {
    try {
      setUsuarios(await service.getUsers());
    } catch (e) { setError('Error al cargar usuarios'); }
  };
  const crearUsuario = async (data: any) => service.createUser(data);
  const actualizarUsuario = async (id: number, data: any) => service.updateUser(id, data);
  const eliminarUsuario = async (id: number) => service.deleteUser(id);

  const cargarRoles = async () => {
    try {
      setRoles(await service.getRoles());
    } catch (e) { setError('Error al cargar roles'); }
  };

  return {
    usuarios, roles, error,
    cargarUsuarios, crearUsuario, actualizarUsuario, eliminarUsuario,
    cargarRoles
  };
} 