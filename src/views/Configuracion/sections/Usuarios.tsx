import { useState, useEffect } from 'react';
import { Edit, Trash2, Plus, X, User, Shield } from 'lucide-react';
import { usePermission } from '../../../hooks/rolesypermisos/usePermission';
import { useUsuarios } from './hooks/useUsuarios';

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

export const Usuarios = () => {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modalEdicion, setModalEdicion] = useState(false);
  const crearUsuarios = usePermission("gestionar_configuracion");
  const { usuarios, roles, error, cargarUsuarios, cargarRoles, crearUsuario, actualizarUsuario, eliminarUsuario } = useUsuarios();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    roles: [],
    status: 'Activo'
  });

  useEffect(() => {
    cargarUsuarios();
    cargarRoles();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRoles = Array.from(e.target.selectedOptions, option => option.value);
    setFormData(prev => ({
      ...prev,
      roles: selectedRoles
    }));
  };

  const abrirModalNuevo = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      roles: [],
      status: 'Activo'
    });
    setModalAbierto(true);
    setModalEdicion(false);
  };

  const abrirModalEdicion = (usuario: Usuario) => {
    setFormData({
      id: usuario.id,
      name: usuario.name,
      email: usuario.email,
      password: '',
      roles: usuario.roles.map(rol => rol.name),
      status: usuario.status
    });
    setModalAbierto(true);
    setModalEdicion(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (modalEdicion) {
        await actualizarUsuario(formData.id!, formData);
      } else {
        await crearUsuario(formData);
      }
      
      setModalAbierto(false);
      cargarUsuarios();
    } catch (error: any) {
      console.error('Error al procesar la solicitud:', error);
    }
  };

  const handleEliminarUsuario = async (id: number) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      return;
    }

    try {
      await eliminarUsuario(id);
      cargarUsuarios();
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  };

  return (
    <div className="p-4 h-full">
      <div className="w-full mx-auto h-full flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-700">
          <div>
            <h1 className="text-2xl font-bold text-white">Gestión de Usuarios</h1>
            <p className="text-gray-400 text-sm">Administra los usuarios del sistema</p>
          </div>
          {crearUsuarios && (
            <button
              onClick={abrirModalNuevo}
              className="bg-red-dark hover:bg-red-dark/90 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
            >
              <Plus size={18} className="mr-2" />
              Nuevo Usuario
            </button>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-4 p-4 bg-red-900/30 border border-red-800 rounded-lg text-red-400">
            {error}
          </div>
        )}

        {/* Tabla */}
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
                        {usuario.roles.map((rol: { name: string }, index: number) => (
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
                          : 'bg-red-900/30 text-red-400 border border-red-800'}`}>
                        {usuario.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <button
                        onClick={() => abrirModalEdicion(usuario)}
                        className="text-blue-400 hover:text-blue-300 p-1 rounded hover:bg-gray-700/50 transition-colors"
                        title="Editar"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleEliminarUsuario(usuario.id)}
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
        </div>

        {/* Modal */}
        {modalAbierto && (
          <div className="fixed inset-0 bg-gray-600/40 bg-opacity-70 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-darkL rounded-lg shadow-2xl w-full max-w-md border border-gray-700">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-white">
                    {modalEdicion ? 'Editar Usuario' : 'Nuevo Usuario'}
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
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gray-dark border border-gray-700 rounded-md text-gray-100 focus:outline-none focus:ring-1 focus:ring-red-dark focus:border-red-dark"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                      Contraseña {modalEdicion ? '(dejar en blanco para mantener)' : '*'}
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gray-dark border border-gray-700 rounded-md text-gray-100 focus:outline-none focus:ring-1 focus:ring-red-dark focus:border-red-dark"
                      required={!modalEdicion}
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="roles" className="block text-sm font-medium text-gray-300 mb-1">
                      Roles
                    </label>
                    <select
                      id="roles"
                      name="roles"
                      multiple
                      value={formData.roles}
                      onChange={handleRoleChange}
                      className="w-full px-3 py-2 bg-gray-dark border border-gray-700 rounded-md text-gray-100 focus:outline-none focus:ring-1 focus:ring-red-dark focus:border-red-dark"
                    >
                      {roles.map((role) => (
                        <option key={role.id} value={role.name}>
                          {role.name}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-400 mt-1">Mantén presionado Ctrl para seleccionar múltiples roles</p>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="status" className="block text-sm font-medium text-gray-300 mb-1">
                      Estado
                    </label>
                    <select
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gray-dark border border-gray-700 rounded-md text-gray-100 focus:outline-none focus:ring-1 focus:ring-red-dark focus:border-red-dark"
                    >
                      <option value="Activo">Activo</option>
                      <option value="Inactivo">Inactivo</option>
                    </select>
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
      </div>
    </div>
  );
};