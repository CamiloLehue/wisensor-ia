import { useState } from 'react';
import * as service from '../services/usuariosRolesPermisosService';

export function useUsuariosRolesPermisos() {
  // Usuarios
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [rolesWithPermissions, setRolesWithPermissions] = useState<any[]>([]);
  const [permissions, setPermissions] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Usuarios
  const cargarUsuarios = async () => {
    try {
      setUsuarios(await service.getUsuarios());
    } catch (e) { setError('Error al cargar usuarios'); }
  };
  const crearUsuario = async (data: any) => service.createUsuario(data);
  const actualizarUsuario = async (id: number, data: any) => service.updateUsuario(id, data);
  const eliminarUsuario = async (id: number) => service.deleteUsuario(id);

  // Roles
  const cargarRoles = async () => {
    try {
      setRoles(await service.getRoles());
    } catch (e) { setError('Error al cargar roles'); }
  };
  const cargarRolesWithPermissions = async () => {
    try {
      setRolesWithPermissions(await service.getRolesWithPermissions());
    } catch (e) { setError('Error al cargar roles y permisos'); }
  };
  const crearRol = async (data: any) => service.createRole(data);
  const actualizarRol = async (id: number, data: any) => service.updateRole(id, data);
  const eliminarRol = async (id: number) => service.deleteRole(id);

  // Permisos
  const cargarPermisos = async () => {
    try {
      setPermissions(await service.getPermisos());
    } catch (e) { setError('Error al cargar permisos'); }
  };
  const crearPermiso = async (data: any) => service.createPermiso(data);
  const actualizarPermiso = async (id: number, data: any) => service.updatePermiso(id, data);
  const eliminarPermiso = async (id: number) => service.deletePermiso(id);

  return {
    usuarios, roles, rolesWithPermissions, permissions, error,
    cargarUsuarios, crearUsuario, actualizarUsuario, eliminarUsuario,
    cargarRoles, cargarRolesWithPermissions, crearRol, actualizarRol, eliminarRol,
    cargarPermisos, crearPermiso, actualizarPermiso, eliminarPermiso
  };
} 