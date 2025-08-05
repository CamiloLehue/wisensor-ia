import { useState } from 'react';
import * as service from '../services/rolesPermisosService';

export function useRolesPermisos() {
  const [roles, setRoles] = useState<any[]>([]);
  const [permissions, setPermissions] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Roles
  const cargarRoles = async () => {
    try {
      setRoles(await service.getRoles());
    } catch (e) { setError('Error al cargar roles'); }
  };
  const crearRol = async (data: any) => service.createRole(data);
  const actualizarRol = async (id: number, data: any) => service.updateRole(id, data);
  const eliminarRol = async (id: number) => service.deleteRole(id);

  // Permisos
  const cargarPermisos = async () => {
    try {
      setPermissions(await service.getPermissions());
    } catch (e) { setError('Error al cargar permisos'); }
  };
  const crearPermiso = async (data: any) => service.createPermission(data);
  const actualizarPermiso = async (id: number, data: any) => service.updatePermission(id, data);
  const eliminarPermiso = async (id: number) => service.deletePermission(id);

  return {
    roles, permissions, error,
    cargarRoles, crearRol, actualizarRol, eliminarRol,
    cargarPermisos, crearPermiso, actualizarPermiso, eliminarPermiso
  };
} 