import { useState, useEffect } from 'react';
import { Edit, Trash2, Plus, X, Shield, Key } from 'lucide-react';
import { usePermission } from '../../../hooks/rolesypermisos/usePermission';
import { useRolesPermisos } from './hooks/useRolesPermisos';

interface Role {
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

interface FormData {
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

export const RolesPermisos = () => {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modalEdicion, setModalEdicion] = useState(false);
  const [modalPermisoAbierto, setModalPermisoAbierto] = useState(false);
  const [modalPermisoEdicion, setModalPermisoEdicion] = useState(false);
  const [activeTab, setActiveTab] = useState<'roles' | 'permissions'>('roles');
  const crearRoles = usePermission("gestionar_configuracion");
  const { 
    roles, 
    permissions, 
    error, 
    cargarRoles, 
    cargarPermisos, 
    crearRol, 
    actualizarRol, 
    eliminarRol, 
    crearPermiso, 
    actualizarPermiso, 
    eliminarPermiso 
  } = useRolesPermisos();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    permissions: []
  });

  const [permissionFormData, setPermissionFormData] = useState<PermissionFormData>({
    name: '',
    description: ''
  });

  useEffect(() => {
    cargarRoles();
    cargarPermisos();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
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

  const handlePermissionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPermissions = Array.from(e.target.selectedOptions, option => option.value);
    setFormData(prev => ({
      ...prev,
      permissions: selectedPermissions
    }));
  };

  const abrirModalNuevo = () => {
    setFormData({
      name: '',
      description: '',
      permissions: []
    });
    setModalAbierto(true);
    setModalEdicion(false);
  };

  const abrirModalEdicion = (role: Role) => {
    setFormData({
      id: role.id,
      name: role.name,
      description: role.description,
      permissions: role.permissions.map(p => p.name)
    });
    setModalAbierto(true);
    setModalEdicion(true);
  };

  const abrirModalPermisoNuevo = () => {
    setPermissionFormData({
      name: '',
      description: ''
    });
    setModalPermisoAbierto(true);
    setModalPermisoEdicion(false);
  };

  const abrirModalPermisoEdicion = (permission: Permission) => {
    setPermissionFormData({
      id: permission.id,
      name: permission.name,
      description: permission.description
    });
    setModalPermisoAbierto(true);
    setModalPermisoEdicion(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (modalEdicion) {
        await actualizarRol(formData.id!, formData);
      } else {
        await crearRol(formData);
      }
      
      setModalAbierto(false);
      cargarRoles();
    } catch (error: any) {
      console.error('Error al procesar la solicitud:', error);
    }
  };

  const handlePermissionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (modalPermisoEdicion) {
        await actualizarPermiso(permissionFormData.id!, permissionFormData);
      } else {
        await crearPermiso(permissionFormData);
      }
      
      setModalPermisoAbierto(false);
      cargarPermisos();
    } catch (error: any) {
      console.error('Error al procesar la solicitud:', error);
    }
  };

  const handleEliminarRol = async (id: number) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este rol?')) {
      return;
    }

    try {
      await eliminarRol(id);
      cargarRoles();
    } catch (error) {
      console.error('Error al eliminar rol:', error);
    }
  };

  const handleEliminarPermiso = async (id: number) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este permiso?')) {
      return;
    }

    try {
      await eliminarPermiso(id);
      cargarPermisos();
    } catch (error: any) {
      console.error('Error al eliminar permiso:', error);
      alert(error.response?.data?.error || 'Error al eliminar el permiso');
    }
  };

  return (
    <div className="p-4 h-full">
      <div className="w-full mx-auto h-full flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-700">
          <div>
            <h1 className="text-2xl font-bold text-white">Gestión de Roles y Permisos</h1>
            <p className="text-gray-400 text-sm">Administra los roles y sus permisos asociados</p>
          </div>
          {crearRoles && (
            <div className="flex gap-2">
              <button
                onClick={abrirModalPermisoNuevo}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
              >
                <Key size={18} className="mr-2" />
                Nuevo Permiso
              </button>
              <button
                onClick={abrirModalNuevo}
                className="bg-red-dark hover:bg-red-dark/90 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
              >
                <Plus size={18} className="mr-2" />
                Nuevo Rol
              </button>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-700 mb-6">
          <button
            onClick={() => setActiveTab('roles')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'roles'
                ? 'text-red-dark border-b-2 border-red-dark'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            Roles
          </button>
          <button
            onClick={() => setActiveTab('permissions')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'permissions'
                ? 'text-red-dark border-b-2 border-red-dark'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            Permisos
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-4 p-4 bg-red-900/30 border border-red-800 rounded-lg text-red-400">
            {error}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {activeTab === 'roles' ? (
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
                  {roles.map((role) => (
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
                          {role.permissions?.map((permission: Permission, index: number) => (
                            <span key={index} className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-900/30 text-purple-400 border border-purple-800">
                              <Key size={12} className="mr-1" />
                              {permission.name}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                        <button
                          onClick={() => abrirModalEdicion(role)}
                          className="text-blue-400 hover:text-blue-300 p-1 rounded hover:bg-gray-700/50 transition-colors"
                          title="Editar"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleEliminarRol(role.id)}
                          className="text-red-400 hover:text-red-300 p-1 rounded hover:bg-gray-700/50 transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
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
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                        <button
                          onClick={() => abrirModalPermisoEdicion(permission)}
                          className="text-blue-400 hover:text-blue-300 p-1 rounded hover:bg-gray-700/50 transition-colors"
                          title="Editar"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleEliminarPermiso(permission.id)}
                          className="text-red-400 hover:text-red-300 p-1 rounded hover:bg-gray-700/50 transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal para Roles */}
        {modalAbierto && (
          <div className="fixed inset-0 bg-gray-600/40 bg-opacity-70 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-darkL rounded-lg shadow-2xl w-full max-w-md border border-gray-700">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-white">
                    {modalEdicion ? 'Editar Rol' : 'Nuevo Rol'}
                  </h2>
                  <button
                    onClick={() => setModalAbierto(false)}
                    className="text-gray-400 hover:text-gray-300 p-1 rounded-full hover:bg-gray-700"
                  >
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                      Nombre *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gray-dark border border-gray-700 rounded-md text-gray-100 focus:outline-none focus:ring-1 focus:ring-red-dark focus:border-red-dark"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                      Descripción
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-3 py-2 bg-gray-dark border border-gray-700 rounded-md text-gray-100 focus:outline-none focus:ring-1 focus:ring-red-dark focus:border-red-dark"
                    />
                  </div>

                  <div className="mb-6">
                    <label htmlFor="permissions" className="block text-sm font-medium text-gray-300 mb-1">
                      Permisos
                    </label>
                    <select
                      id="permissions"
                      name="permissions"
                      multiple
                      value={formData.permissions}
                      onChange={handlePermissionChange}
                      className="w-full px-3 py-2 bg-gray-dark border border-gray-700 rounded-md text-gray-100 focus:outline-none focus:ring-1 focus:ring-red-dark focus:border-red-dark"
                    >
                      {permissions.map((permission) => (
                        <option key={permission.id} value={permission.name}>
                          {permission.name}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-400 mt-1">Mantén presionado Ctrl para seleccionar múltiples permisos</p>
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setModalAbierto(false)}
                      className="px-4 py-2 text-gray-400 hover:text-gray-300 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-red-dark hover:bg-red-dark/90 text-white rounded-lg transition-colors"
                    >
                      {modalEdicion ? 'Actualizar' : 'Crear'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Modal para Permisos */}
        {modalPermisoAbierto && (
          <div className="fixed inset-0 bg-gray-600/40 bg-opacity-70 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-darkL rounded-lg shadow-2xl w-full max-w-md border border-gray-700">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-white">
                    {modalPermisoEdicion ? 'Editar Permiso' : 'Nuevo Permiso'}
                  </h2>
                  <button
                    onClick={() => setModalPermisoAbierto(false)}
                    className="text-gray-400 hover:text-gray-300 p-1 rounded-full hover:bg-gray-700"
                  >
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handlePermissionSubmit}>
                  <div className="mb-4">
                    <label htmlFor="permissionName" className="block text-sm font-medium text-gray-300 mb-1">
                      Nombre *
                    </label>
                    <input
                      type="text"
                      id="permissionName"
                      name="name"
                      value={permissionFormData.name}
                      onChange={handlePermissionFormChange}
                      className="w-full px-3 py-2 bg-gray-dark border border-gray-700 rounded-md text-gray-100 focus:outline-none focus:ring-1 focus:ring-red-dark focus:border-red-dark"
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <label htmlFor="permissionDescription" className="block text-sm font-medium text-gray-300 mb-1">
                      Descripción
                    </label>
                    <textarea
                      id="permissionDescription"
                      name="description"
                      value={permissionFormData.description}
                      onChange={handlePermissionFormChange}
                      rows={3}
                      className="w-full px-3 py-2 bg-gray-dark border border-gray-700 rounded-md text-gray-100 focus:outline-none focus:ring-1 focus:ring-red-dark focus:border-red-dark"
                    />
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setModalPermisoAbierto(false)}
                      className="px-4 py-2 text-gray-400 hover:text-gray-300 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      {modalPermisoEdicion ? 'Actualizar' : 'Crear'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};