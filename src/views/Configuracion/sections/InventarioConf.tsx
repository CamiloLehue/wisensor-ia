import  { useState } from 'react';
import { Edit, Trash2, Plus, X, Package } from 'lucide-react';
import { Registro3, FormData3 } from '../../../assets/types/Configuracion';
import { usePermission } from '../../../hooks/rolesypermisos/usePermission';
export const InventarioConf = () => {
  const crearInventario = usePermission("crear empresas");
  const [registros, setRegistros] = useState<Registro3[]>([
    { id: 1, nombre: 'Boya', estado: 'Activo' },
    { id: 2, nombre: 'Red', estado: 'Activo' },
    { id: 3, nombre: 'Pasador', estado: 'Inactivo' },
  ]);

  const [modalAbierto, setModalAbierto] = useState(false);
  const [modalEdicion, setModalEdicion] = useState(false);
  const [formData, setFormData] = useState<FormData3>({
    id: '',
    nombre: '',
    estado: 'Activo'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const abrirModalNuevo = () => {
    setFormData({
      id: '',
      nombre: '',
      estado: 'Activo'
    });
    setModalAbierto(true);
    setModalEdicion(false);
  };

  const abrirModalEdicion = (registro: Registro3) => {
    setFormData({
      id: registro.id.toString(), // number → string
      nombre: registro.nombre,
      estado: registro.estado
    });
    setModalAbierto(true);
    setModalEdicion(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (modalEdicion) {
      // Convertir formData.id a number para actualizar
      const idNumero = Number(formData.id);
      setRegistros(
        registros.map(reg => 
          reg.id === idNumero 
            ? { ...formData, id: idNumero } // Asegurar que el id sea number
            : reg
        )
      );
    } else {
      // Nuevo registro: generar id numérico
      const nuevoId = registros.length > 0 ? Math.max(...registros.map(r => r.id)) + 1 : 1;
      setRegistros([
        ...registros, 
        { 
          nombre: formData.nombre, 
          estado: formData.estado, 
          id: nuevoId 
        }
      ]);
    }
    
    setModalAbierto(false);
  };

  const eliminarRegistro = (id:number) => {
    setRegistros(registros.filter(reg => reg.id !== id));
  };

  return (
    <div className="p-4 h-full">
      <div className="w-full mx-auto h-full flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-700">
          <div>
            <h1 className="text-2xl font-bold text-white">Gestión de Inventario</h1>
            <p className="text-gray-400 text-sm">Administra los productos del sistema</p>
          </div>
          {crearInventario&&(<button
            onClick={abrirModalNuevo}
            className="bg-red-dark hover:bg-red-dark/90 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
          >
            <Plus size={18} className="mr-2" />
            Agregar Producto
          </button>)}
          
        </div>

        {/* Tabla */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="overflow-x-auto rounded-lg border border-gray-700 flex-1">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-darkL">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Producto
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Estado
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-dark divide-y divide-gray-700">
                {registros.map((registro) => (
                  <tr key={registro.id} className="hover:bg-gray-darkL transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gray-700 rounded-full flex items-center justify-center mr-3">
                          <Package size={18} className="text-gray-300" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">{registro.nombre}</div>
                          <div className="text-xs text-gray-400">ID: {registro.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${registro.estado === 'Activo' 
                          ? 'bg-green-900/30 text-green-400 border border-green-800' 
                          : 'bg-red-900/30 text-red-400 border border-red-800'}`}>
                        {registro.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <button
                        onClick={() => abrirModalEdicion(registro)}
                        className="text-blue-400 hover:text-blue-300 p-1 rounded hover:bg-gray-700/50 transition-colors"
                        title="Editar"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => eliminarRegistro(registro.id)}
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
                    {modalEdicion ? 'Editar Producto' : 'Nuevo Producto'}
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
                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-300 mb-1">
                      Nombre *
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gray-dark border border-gray-700 rounded-md text-gray-100 focus:outline-none focus:ring-1 focus:ring-red-dark focus:border-red-dark"
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <label htmlFor="estado" className="block text-sm font-medium text-gray-300 mb-1">
                      Estado
                    </label>
                    <select
                      id="estado"
                      name="estado"
                      value={formData.estado}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gray-dark border border-gray-700 rounded-md text-gray-100 focus:outline-none focus:ring-1 focus:ring-red-dark focus:border-red-dark"
                    >
                      <option value="Activo">Activo</option>
                      <option value="Inactivo">Inactivo</option>
                    </select>
                  </div>

                  <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
                    <button
                      type="button"
                      onClick={() => setModalAbierto(false)}
                      className="px-4 py-2 border border-gray-600 rounded-md text-gray-300 hover:bg-gray-700 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-red-dark rounded-md text-white hover:bg-red-dark/90 transition-colors"
                    >
                      {modalEdicion ? 'Actualizar' : 'Guardar'}
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