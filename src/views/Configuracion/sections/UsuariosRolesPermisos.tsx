import { useState, useEffect } from 'react';
import axios from 'axios';
import { Edit, Trash2, Plus, X, User, Shield, Key } from 'lucide-react';
import { usePermission } from '../../../hooks/rolesypermisos/usePermission';

// Interfaces para Usuarios
interface Usuario {
  id: number;
  name: string;
  email: string;
  roles: { name: string }[];
  status: string;
}

interface FormData {
  id?: number;
  name: string;
  email: string;
  password: string;
  roles: string[];
  status: string;
}

interface Role {
  id: number;
  name: string;
  description: string;
}

// Interfaces para Roles y Permisos
interface RoleWithPermissions {
  id: number;
  name: string;
  description: string;
  permissions: Permission[];
}

interface Permission {
  id: number;
  name: string;
  description: string;
}

interface FormDataRole {
  id?: number;
  name: string;
  description: string;
  permissions: string[];
}

interface PermissionFormData {
  id?: number;
  name: string;
  description: string;
}

export const UsuariosRolesPermisos = () => {
  // Estados para Usuarios
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [modalUsuarioAbierto, setModalUsuarioAbierto] = useState(false);
  const [modalUsuarioEdicion, setModalUsuarioEdicion] = useState(false);
  const [formDataUsuario, setFormDataUsuario] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    roles: [],
    status: 'Activo'
  });

  // Estados para Roles y Permisos
  const [rolesWithPermissions, setRolesWithPermissions] = useState<RoleWithPermissions[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [modalRolAbierto, setModalRolAbierto] = useState(false);
  const [modalRolEdicion, setModalRolEdicion] = useState(false);
  const [modalPermisoAbierto, setModalPermisoAbierto] = useState(false);
  const [modalPermisoEdicion, setModalPermisoEdicion] = useState(false);
  const [formDataRol, setFormDataRol] = useState<FormDataRole>({
    name: '',
    description: '',
    permissions: []
  });
  const [permissionFormData, setPermissionFormData] = useState<PermissionFormData>({
    name: '',
    description: ''
  });

  // Estado general
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'usuarios' | 'roles' | 'permissions'>('usuarios');
  const crearUsuarios = usePermission("gestionar_configuracion");
  const crearRoles = usePermission("gestionar_configuracion");

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    cargarUsuarios();
    cargarRoles();
    cargarRolesWithPermissions();
    cargarPermisos();
  }, []);

  // Funciones para Usuarios
  const cargarUsuarios = async () => {
    try {
      const response = await axios.get(`${apiUrl}/users/`);
      setUsuarios(response.data);
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
    }
  };

  const cargarRoles = async () => {
    try {
      const response = await axios.get(`${apiUrl}/roles/`);
      setRoles(response.data);
    } catch (error) {
      console.error('Error al cargar roles:', error);
    }
  };

  const handleUsuarioChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormDataUsuario(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUsuarioRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRoles = Array.from(e.target.selectedOptions, option => option.value);
    setFormDataUsuario(prev => ({
      ...prev,
      roles: selectedRoles
    }));
  };

  const abrirModalUsuarioNuevo = () => {
    setFormDataUsuario({
      name: '',
      email: '',
      password: '',
      roles: [],
      status: 'Activo'
    });
    setModalUsuarioAbierto(true);
    setModalUsuarioEdicion(false);
    setError(null);
  };

  const abrirModalUsuarioEdicion = (usuario: Usuario) => {
    setFormDataUsuario({
      id: usuario.id,
      name: usuario.name,
      email: usuario.email,
      password: '',
      roles: usuario.roles.map(rol => rol.name),
      status: usuario.status
    });
    setModalUsuarioAbierto(true);
    setModalUsuarioEdicion(true);
    setError(null);
  };

  const handleUsuarioSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userPayload: any = {
        username: formDataUsuario.name,
        email: formDataUsuario.email,
        roles: formDataUsuario.roles.filter(r => r)
      };
      if (formDataUsuario.password) {
        userPayload.password = formDataUsuario.password;
      }
      if (formDataUsuario.status) {
        userPayload.is_active = formDataUsuario.status === 'Activo';
      }
      if (modalUsuarioEdicion) {
        await axios.put(`${apiUrl}/users/${formDataUsuario.id}/`, userPayload);
      } else {
        await axios.post(`${apiUrl}/users/`, userPayload);
      }
      setModalUsuarioAbierto(false);
      cargarUsuarios();
    } catch (error: any) {
      setError(error.response?.data?.error || 'Error al procesar la solicitud');
    }
  };

  const eliminarUsuario = async (id: number) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      return;
    }

    try {
      await axios.delete(`${apiUrl}/users/${id}/`);
      cargarUsuarios();
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  };

  // Funciones para Roles y Permisos
  const cargarRolesWithPermissions = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get(`${apiUrl}/roles/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRolesWithPermissions(response.data);
    } catch (error) {
      console.error('Error al cargar roles:', error);
    }
  };

  const cargarPermisos = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get(`${apiUrl}/permissions/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPermissions(response.data);
    } catch (error) {
      console.error('Error al cargar permisos:', error);
    }
  };

  const handleRolChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormDataRol(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePermissionFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPermissionFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRolPermissionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPermissions = Array.from(e.target.selectedOptions, option => option.value);
    setFormDataRol(prev => ({
      ...prev,
      permissions: selectedPermissions
    }));
  };

  const abrirModalRolNuevo = () => {
    setFormDataRol({
      name: '',
      description: '',
      permissions: []
    });
    setModalRolAbierto(true);
    setModalRolEdicion(false);
    setError(null);
  };

  const abrirModalRolEdicion = (role: RoleWithPermissions) => {
    setFormDataRol({
      id: role.id,
      name: role.name,
      description: role.description,
      permissions: role.permissions.map(p => p.name)
    });
    setModalRolAbierto(true);
    setModalRolEdicion(true);
    setError(null);
  };

  const abrirModalPermisoNuevo = () => {
    setPermissionFormData({
      name: '',
      description: ''
    });
    setModalPermisoAbierto(true);
    setModalPermisoEdicion(false);
    setError(null);
  };

  const abrirModalPermisoEdicion = (permission: Permission) => {
    setPermissionFormData({
      id: permission.id,
      name: permission.name,
      description: permission.description
    });
    setModalPermisoAbierto(true);
    setModalPermisoEdicion(true);
    setError(null);
  };

  const handleRolSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token');
    try {
      const rolePayload: any = {
        name: formDataRol.name,
        description: formDataRol.description,
        permissions: formDataRol.permissions.filter(p => p)
      };
      if (modalRolEdicion) {
        await axios.put(`${apiUrl}/roles/${formDataRol.id}/`, rolePayload, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(`${apiUrl}/roles/`, rolePayload, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setModalRolAbierto(false);
      cargarRolesWithPermissions();
      cargarRoles();
    } catch (error: any) {
      setError(error.response?.data?.error || 'Error al procesar la solicitud');
    }
  };

  const handlePermissionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token');
    
    try {
      if (modalPermisoEdicion) {
        await axios.put(`${apiUrl}/permissions/${permissionFormData.id}/`, permissionFormData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(`${apiUrl}/permissions/`, permissionFormData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      
      setModalPermisoAbierto(false);
      cargarPermisos();
    } catch (error: any) {
      setError(error.response?.data?.error || 'Error al procesar la solicitud');
    }
  };

  const eliminarRol = async (id: number) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este rol?')) {
      return;
    }

    try {
      const token = localStorage.getItem('access_token');
      await axios.delete(`${apiUrl}/roles/${id}/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      cargarRolesWithPermissions();
      cargarRoles(); // Recargar también los roles para usuarios
    } catch (error) {
      console.error('Error al eliminar rol:', error);
    }
  };

  const eliminarPermiso = async (id: number) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este permiso?')) {
      return;
    }

    try {
      const token = localStorage.getItem('access_token');
      await axios.delete(`${apiUrl}/permissions/${id}/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      cargarPermisos();
    } catch (error) {
      console.error('Error al eliminar permiso:', error);
    }
  };

  return (
    <div className="p-4 h-full">
      <div className="w-full mx-auto h-full flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-700">
          <div>
            <h1 className="text-2xl font-bold text-white">Gestión de Usuarios, Roles y Permisos</h1>
            <p className="text-gray-400 text-sm">Administra usuarios, roles y permisos del sistema</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-700 mb-6">
          <button
            onClick={() => setActiveTab('usuarios')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === 'usuarios'
                ? 'text-white border-b-2 border-red-dark'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <User size={16} className="inline mr-2" />
            Usuarios
          </button>
          <button
            onClick={() => setActiveTab('roles')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === 'roles'
                ? 'text-white border-b-2 border-red-dark'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Shield size={16} className="inline mr-2" />
            Roles
          </button>
          <button
            onClick={() => setActiveTab('permissions')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === 'permissions'
                ? 'text-white border-b-2 border-red-dark'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Key size={16} className="inline mr-2" />
            Permisos
          </button>
        </div>

        {/* Contenido de los tabs */}
        {activeTab === 'usuarios' && (
          <>
            {/* Header de Usuarios */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-white">Usuarios del Sistema</h2>
              {crearUsuarios && (
                <button
                  onClick={abrirModalUsuarioNuevo}
                  className="bg-red-dark hover:bg-red-dark/90 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
                >
                  <Plus size={18} className="mr-2" />
                  Nuevo Usuario
                </button>
              )}
            </div>

            {/* Tabla de Usuarios */}
            <div className="flex-1 overflow-hidden flex flex-col">
              <div className="overflow-x-auto rounded-lg border border-gray-700 flex-1">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-darkL">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Usuario</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Roles</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Estado</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-dark divide-y divide-gray-700">
                    {usuarios.map((usuario) => (
                      <tr key={usuario.id} className="hover:bg-gray-darkL transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-gray-700 rounded-full flex items-center justify-center mr-3">
                              <User size={18} className="text-gray-300" />
                            </div>
                            <div className="text-sm font-medium text-white">{usuario.name}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{usuario.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          <div className="flex flex-wrap gap-1">
                            {usuario.roles.map((rol, index) => (
                              <span key={index} className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-900/30 text-purple-400 border border-purple-800">
                                <Shield size={12} className="mr-1" />
                                {rol.name}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${usuario.status === 'Activo' 
                              ? 'bg-green-900/30 text-green-400 border border-green-800' 
                              : 'bg-red-900/30 text-red-400 border border-red-800'
                            }`}>
                            {usuario.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => abrirModalUsuarioEdicion(usuario)}
                              className="text-blue-400 hover:text-blue-300 transition-colors"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => eliminarUsuario(usuario.id)}
                              className="text-red-400 hover:text-red-300 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {activeTab === 'roles' && (
          <>
            {/* Header de Roles */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-white">Roles del Sistema</h2>
              {crearRoles && (
                <button
                  onClick={abrirModalRolNuevo}
                  className="bg-red-dark hover:bg-red-dark/90 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
                >
                  <Plus size={18} className="mr-2" />
                  Nuevo Rol
                </button>
              )}
            </div>

            {/* Tabla de Roles */}
            <div className="flex-1 overflow-hidden flex flex-col">
              <div className="overflow-x-auto rounded-lg border border-gray-700 flex-1">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-darkL">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Rol</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Descripción</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Permisos</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-dark divide-y divide-gray-700">
                    {rolesWithPermissions.map((role) => (
                      <tr key={role.id} className="hover:bg-gray-darkL transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-gray-700 rounded-full flex items-center justify-center mr-3">
                              <Shield size={18} className="text-gray-300" />
                            </div>
                            <div className="text-sm font-medium text-white">{role.name}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{role.description}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          <div className="flex flex-wrap gap-1">
                            {role.permissions.map((permission, index) => (
                              <span key={index} className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-900/30 text-blue-400 border border-blue-800">
                                <Key size={12} className="mr-1" />
                                {permission.name}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => abrirModalRolEdicion(role)}
                              className="text-blue-400 hover:text-blue-300 transition-colors"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => eliminarRol(role.id)}
                              className="text-red-400 hover:text-red-300 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {activeTab === 'permissions' && (
          <>
            {/* Header de Permisos */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-white">Permisos del Sistema</h2>
              {crearRoles && (
                <button
                  onClick={abrirModalPermisoNuevo}
                  className="bg-red-dark hover:bg-red-dark/90 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
                >
                  <Plus size={18} className="mr-2" />
                  Nuevo Permiso
                </button>
              )}
            </div>

            {/* Tabla de Permisos */}
            <div className="flex-1 overflow-hidden flex flex-col">
              <div className="overflow-x-auto rounded-lg border border-gray-700 flex-1">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-darkL">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Permiso</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Descripción</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-dark divide-y divide-gray-700">
                    {permissions.map((permission) => (
                      <tr key={permission.id} className="hover:bg-gray-darkL transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-gray-700 rounded-full flex items-center justify-center mr-3">
                              <Key size={18} className="text-gray-300" />
                            </div>
                            <div className="text-sm font-medium text-white">{permission.name}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{permission.description}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => abrirModalPermisoEdicion(permission)}
                              className="text-blue-400 hover:text-blue-300 transition-colors"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => eliminarPermiso(permission.id)}
                              className="text-red-400 hover:text-red-300 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* Modal para Usuarios */}
        {modalUsuarioAbierto && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-dark border border-gray-700 rounded-lg p-6 w-full max-w-md mx-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">
                  {modalUsuarioEdicion ? 'Editar Usuario' : 'Nuevo Usuario'}
                </h2>
                <button 
                  onClick={() => setModalUsuarioAbierto(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleUsuarioSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Nombre *</label>
                  <input
                    type="text"
                    name="name"
                    value={formDataUsuario.name}
                    onChange={handleUsuarioChange}
                    className="w-full bg-gray-darkL border border-gray-600 rounded px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-red-dark"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formDataUsuario.email}
                    onChange={handleUsuarioChange}
                    className="w-full bg-gray-darkL border border-gray-600 rounded px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-red-dark"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    {modalUsuarioEdicion ? 'Nueva Contraseña (dejar vacío para mantener)' : 'Contraseña *'}
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formDataUsuario.password}
                    onChange={handleUsuarioChange}
                    className="w-full bg-gray-darkL border border-gray-600 rounded px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-red-dark"
                    required={!modalUsuarioEdicion}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Roles</label>
                  <select
                    multiple
                    name="roles"
                    value={formDataUsuario.roles}
                    onChange={handleUsuarioRoleChange}
                    className="w-full bg-gray-darkL border border-gray-600 rounded px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-red-dark"
                  >
                    <option value="">Ninguno</option>
                    {roles.map(role => (
                      <option key={role.id} value={role.name}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Estado</label>
                  <select
                    name="status"
                    value={formDataUsuario.status}
                    onChange={handleUsuarioChange}
                    className="w-full bg-gray-darkL border border-gray-600 rounded px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-red-dark"
                  >
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                  </select>
                </div>

                {error && (
                  <div className="text-red-400 text-sm">{error}</div>
                )}

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setModalUsuarioAbierto(false)}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded text-sm transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-red-dark hover:bg-red-dark/90 text-white px-4 py-2 rounded text-sm transition-colors"
                  >
                    {modalUsuarioEdicion ? 'Actualizar' : 'Crear'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal para Roles */}
        {modalRolAbierto && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-dark border border-gray-700 rounded-lg p-6 w-full max-w-md mx-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">
                  {modalRolEdicion ? 'Editar Rol' : 'Nuevo Rol'}
                </h2>
                <button 
                  onClick={() => setModalRolAbierto(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleRolSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Nombre *</label>
                  <input
                    type="text"
                    name="name"
                    value={formDataRol.name}
                    onChange={handleRolChange}
                    className="w-full bg-gray-darkL border border-gray-600 rounded px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-red-dark"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Descripción</label>
                  <textarea
                    name="description"
                    value={formDataRol.description}
                    onChange={handleRolChange}
                    rows={3}
                    className="w-full bg-gray-darkL border border-gray-600 rounded px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-red-dark"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Permisos</label>
                  <select
                    multiple
                    name="permissions"
                    value={formDataRol.permissions}
                    onChange={handleRolPermissionChange}
                    className="w-full bg-gray-darkL border border-gray-600 rounded px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-red-dark"
                  >
                    {permissions.map(permission => (
                      <option key={permission.id} value={permission.name}>
                        {permission.name}
                      </option>
                    ))}
                  </select>
                </div>

                {error && (
                  <div className="text-red-400 text-sm">{error}</div>
                )}

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setModalRolAbierto(false)}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded text-sm transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-red-dark hover:bg-red-dark/90 text-white px-4 py-2 rounded text-sm transition-colors"
                  >
                    {modalRolEdicion ? 'Actualizar' : 'Crear'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal para Permisos */}
        {modalPermisoAbierto && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-dark border border-gray-700 rounded-lg p-6 w-full max-w-md mx-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">
                  {modalPermisoEdicion ? 'Editar Permiso' : 'Nuevo Permiso'}
                </h2>
                <button 
                  onClick={() => setModalPermisoAbierto(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handlePermissionSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Nombre *</label>
                  <input
                    type="text"
                    name="name"
                    value={permissionFormData.name}
                    onChange={handlePermissionFormChange}
                    className="w-full bg-gray-darkL border border-gray-600 rounded px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-red-dark"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Descripción</label>
                  <textarea
                    name="description"
                    value={permissionFormData.description}
                    onChange={handlePermissionFormChange}
                    rows={3}
                    className="w-full bg-gray-darkL border border-gray-600 rounded px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-red-dark"
                  />
                </div>

                {error && (
                  <div className="text-red-400 text-sm">{error}</div>
                )}

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setModalPermisoAbierto(false)}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded text-sm transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-red-dark hover:bg-red-dark/90 text-white px-4 py-2 rounded text-sm transition-colors"
                  >
                    {modalPermisoEdicion ? 'Actualizar' : 'Crear'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 