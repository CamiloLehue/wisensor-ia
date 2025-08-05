import { useState, useEffect } from 'react';
import { Edit, Trash2, Plus, X, MapPin, FileText, Upload } from 'lucide-react';
import { usePermission } from '../../../hooks/rolesypermisos/usePermission';
import { useCentros } from './hooks/useCentros';
import { Center, CreateCenterData, UpdateCenterData } from './services/centersService';
import { CreateInformeCentroData, InformeCentro, informesCentroService } from './services/informesCentroService';


export const Centros = () => {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modalEdicion, setModalEdicion] = useState(false);
  const [informeModalAbierto, setInformeModalAbierto] = useState(false);
  const [selectedCenterForInforme, setSelectedCenterForInforme] = useState<Center | null>(null);
  const [reportType, setReportType] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [editingCenterId, setEditingCenterId] = useState<number | null>(null); // Nuevo estado para el ID del centro en edición
  const [analysisMessage, setAnalysisMessage] = useState<string | null>(null); // Nuevo estado para mensajes de análisis

  const gestionarConfiguracion = usePermission("gestionar_configuracion");
  const { 
    centros, 
    isLoading, 
    error, 
    cargarCentros, 
    crearCentro, 
    actualizarCentro, 
    eliminarCentro, 
    asignarInformeACentro, 
    eliminarInformeDeCentro, 
    selectedCenter, 
    setSelectedCenter // Asegúrate de que esto esté disponible si lo vas a usar en el componente
  } = useCentros();

  const [formData, setFormData] = useState<CreateCenterData | UpdateCenterData>({
    name: '',
    latitude: 0,
    longitude: 0,
    code: '',
    name1: null,
    name2: null,
  });

  useEffect(() => {
    cargarCentros();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: CreateCenterData | UpdateCenterData) => ({
      ...prev,
      [name]: name === 'latitude' || name === 'longitude' ? parseFloat(value) : value
    }));
  };

  const abrirModalNuevo = () => {
    setFormData({
      name: '',
      latitude: 0,
      longitude: 0,
      code: '',
      name1: null,
      name2: null,
    });
    setEditingCenterId(null); // Resetear ID de edición
    setModalAbierto(true);
    setModalEdicion(false);
  };

  const abrirModalEdicion = (center: Center) => {
    setFormData({
      name: center.name,
      latitude: center.latitude,
      longitude: center.longitude,
      code: center.code,
      name1: center.name1,
      name2: center.name2,
    });
    setEditingCenterId(center.id); // Guardar el ID del centro para edición
    setModalAbierto(true);
    setModalEdicion(true);
  };

  const abrirModalInformes = (center: Center) => {
    setSelectedCenterForInforme(center);
    setInformeModalAbierto(true);
    setReportType(''); // Resetear tipo de informe
    setSelectedFile(null); // Resetear archivo seleccionado
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  const handleReportTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setReportType(e.target.value);
  };

  const handleAsignarInforme = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCenterForInforme || !reportType || !selectedFile) {
      // Aquí puedes mostrar un mensaje de error al usuario
      console.error("Faltan datos para asignar el informe.");
      return;
    }
    
    const informeData: CreateInformeCentroData = {
      center_id: selectedCenterForInforme.id,
      report_type: reportType,
      file: selectedFile,
    };

    try {
      await asignarInformeACentro(selectedCenterForInforme.id, informeData);
      
      // Eliminado: Llamada automática a la función de análisis de PDF después de la subida exitosa
      /*
      if (selectedFile) {
        console.log("Iniciando análisis detallado del PDF...");
        await informesCentroService.analyzePdfAndExtractData(
          selectedCenterForInforme.id,
          reportType,
          selectedFile
        );
        console.log("Análisis detallado de PDF completado y guardado en MongoDB.");
        // Aquí podrías añadir una notificación de éxito para el usuario
      }
      */

      setInformeModalAbierto(false);
      setSelectedCenterForInforme(null);
      setReportType('');
      setSelectedFile(null);
    } catch (err) {
      console.error("Error al asignar el informe:", err);
      // Manejar error en la UI
    }
  };

  const handleEliminarInforme = async (informeId: number, centerId: number) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este informe?')) {
      return;
    }
    try {
      await eliminarInformeDeCentro(informeId, centerId);
    } catch (err) {
      console.error("Error al eliminar informe:", err);
      // Manejar error en la UI
    }
  };

  const handleAnalyzeExistingPdf = async (informe: InformeCentro) => {
    if (!selectedCenterForInforme) {
      console.error("Error: No hay centro seleccionado para analizar informe.");
      setAnalysisMessage("Error: No se pudo identificar el centro para el análisis.");
      return;
    }

    setAnalysisMessage(`Analizando "${informe.filename}"... Esto puede tomar unos segundos.`);

    try {
      await informesCentroService.analyzePdfAndExtractData(
        selectedCenterForInforme.id,
        informe.report_type,
        undefined, // No file provided, as it's an existing one
        informe.file_path // Pass the file path
      );
      
      // Actualizar is_analyzed a true después del análisis exitoso
      await informesCentroService.updateInformeCentro(informe.id, { is_analyzed: true });
      
      setAnalysisMessage(`Análisis de "${informe.filename}" completado y guardado en MongoDB.`);
      
      // Recargar los datos del centro para reflejar el cambio
      await cargarCentros();
    } catch (err: any) {
      console.error("Error al analizar el PDF existente:", err);
      setAnalysisMessage(`Error al analizar "${informe.filename}": ${err.message || 'Error desconocido'}.`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (modalEdicion) {
        // Usar editingCenterId y asegurar que formData sea UpdateCenterData
        if (editingCenterId === null) {
          console.error("Error: No hay ID de centro para actualizar.");
          return;
        }
        await actualizarCentro(editingCenterId, formData as UpdateCenterData);
      } else {
        await crearCentro(formData as CreateCenterData);
      }
      
      setModalAbierto(false);
      setEditingCenterId(null); // Limpiar el ID de edición después de cerrar el modal
    } catch (error: any) {
      console.error('Error al procesar la solicitud:', error);
    }
  };

  const handleEliminarCentro = async (id: number) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este centro?')) {
      return;
    }

    try {
      await eliminarCentro(id);
    } catch (error) {
      console.error('Error al eliminar centro:', error);
    }
  };

  return (
    <div className="p-4 h-full">
      <div className="w-full mx-auto h-full flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-700">
          <div>
            <h1 className="text-2xl font-bold text-white">Gestión de Centros</h1>
            <p className="text-gray-400 text-sm">Administra los centros de operaciones</p>
          </div>
          {gestionarConfiguracion && (
            <button
              onClick={abrirModalNuevo}
              className="bg-red-dark hover:bg-red-dark/90 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
            >
              <Plus size={18} className="mr-2" />
              Nuevo Centro
            </button>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-4 p-4 bg-red-900/30 border border-red-800 rounded-lg text-red-400">
            {error}
          </div>
        )}

        {/* Loading Display */}
        {isLoading && (
            <div className="mb-4 p-4 bg-blue-900/30 border border-blue-800 rounded-lg text-blue-400">
                Cargando centros...
            </div>
        )}

        {/* Tabla */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="overflow-x-auto rounded-lg border border-gray-700 flex-1">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-darkL">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Nombre</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Código</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Latitud</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Longitud</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Informes</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-gray-dark divide-y divide-gray-700">
                {centros.length === 0 && !isLoading && !error ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                      No hay centros disponibles.
                    </td>
                  </tr>
                ) : (
                  centros.map((center) => (
                    <tr key={center.id} className="hover:bg-gray-darkL transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gray-700 rounded-full flex items-center justify-center mr-3">
                            <MapPin size={18} className="text-gray-300" />
                          </div>
                          <div className="text-sm font-medium text-white">{center.name}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{center.code}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{center.latitude}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{center.longitude}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        <button
                            onClick={() => abrirModalInformes(center)}
                            className="text-green-400 hover:text-green-300 p-1 rounded hover:bg-gray-700/50 transition-colors flex items-center"
                            title="Gestionar Informes"
                        >
                            <FileText size={16} className="mr-1" /> ({center.informes ? center.informes.length : 0} informes)
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                        <button
                          onClick={() => abrirModalEdicion(center)}
                          className="text-blue-400 hover:text-blue-300 p-1 rounded hover:bg-gray-700/50 transition-colors"
                          title="Editar"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleEliminarCentro(center.id)}
                          className="text-red-400 hover:text-red-300 p-1 rounded hover:bg-gray-700/50 transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal de Creación/Edición de Centro */}
        {modalAbierto && (
          <div className="fixed inset-0 bg-gray-600/40 bg-opacity-70 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-darkL rounded-lg shadow-2xl w-full max-w-md border border-gray-700">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-white">
                    {modalEdicion ? 'Editar Centro' : 'Nuevo Centro'}
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
                    <label htmlFor="code" className="block text-sm font-medium text-gray-300 mb-1">
                      Código *
                    </label>
                    <input
                      type="text"
                      id="code"
                      name="code"
                      value={formData.code}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gray-dark border border-gray-700 rounded-md text-gray-100 focus:outline-none focus:ring-1 focus:ring-red-dark focus:border-red-dark"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="latitude" className="block text-sm font-medium text-gray-300 mb-1">
                      Latitud *
                    </label>
                    <input
                      type="number"
                      id="latitude"
                      name="latitude"
                      value={formData.latitude}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gray-dark border border-gray-700 rounded-md text-gray-100 focus:outline-none focus:ring-1 focus:ring-red-dark focus:border-red-dark"
                      step="any"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="longitude" className="block text-sm font-medium text-gray-300 mb-1">
                      Longitud *
                    </label>
                    <input
                      type="number"
                      id="longitude"
                      name="longitude"
                      value={formData.longitude}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gray-dark border border-gray-700 rounded-md text-gray-100 focus:outline-none focus:ring-1 focus:ring-red-dark focus:border-red-dark"
                      step="any"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="name1" className="block text-sm font-medium text-gray-300 mb-1">
                      Nombre Adicional 1
                    </label>
                    <input
                      type="text"
                      id="name1"
                      name="name1"
                      value={formData.name1 || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gray-dark border border-gray-700 rounded-md text-gray-100 focus:outline-none focus:ring-1 focus:ring-red-dark focus:border-red-dark"
                    />
                  </div>

                  <div className="mb-6">
                    <label htmlFor="name2" className="block text-sm font-medium text-gray-300 mb-1">
                      Nombre Adicional 2
                    </label>
                    <input
                      type="text"
                      id="name2"
                      name="name2"
                      value={formData.name2 || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gray-dark border border-gray-700 rounded-md text-gray-100 focus:outline-none focus:ring-1 focus:ring-red-dark focus:border-red-dark"
                    />
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setModalAbierto(false)}
                      className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
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

        {/* Modal de Gestión de Informes */}
        {informeModalAbierto && selectedCenterForInforme && (
            <div className="fixed inset-0 bg-gray-600/40 bg-opacity-70 flex items-center justify-center p-4 z-50">
                <div className="bg-gray-darkL rounded-lg shadow-2xl w-full max-w-2xl border border-gray-700">
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-white">Informes para: {selectedCenterForInforme.name}</h2>
                            <button
                                onClick={() => setInformeModalAbierto(false)}
                                className="text-gray-400 hover:text-gray-300 p-1 rounded-full hover:bg-gray-700"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Sección de Subida de Informe */}
                        <div className="mb-6 p-4 border border-gray-700 rounded-lg">
                            <h3 className="text-lg font-semibold text-white mb-3">Subir Nuevo Informe</h3>
                            {selectedCenterForInforme.informes.length >= 10 ? (
                                <p className="text-red-400">Este centro ya tiene el máximo de 10 informes asignados.</p>
                            ) : (
                                <form onSubmit={handleAsignarInforme} className="space-y-4">
                                    <div>
                                        <label htmlFor="reportType" className="block text-sm font-medium text-gray-300 mb-1">Tipo de Informe *</label>
                                        <select
                                            id="reportType"
                                            name="reportType"
                                            value={reportType}
                                            onChange={handleReportTypeChange}
                                            className="w-full px-3 py-2 bg-gray-dark border border-gray-700 rounded-md text-gray-100 focus:outline-none focus:ring-1 focus:ring-red-dark focus:border-red-dark"
                                            required
                                        >
                                            <option value="">Seleccione un tipo</option>
                                            <option value="informe ambiental">Informe Ambiental</option>
                                            <option value="informe inspeccion general">Informe Inspección General</option>
                                            <option value="comparativo">Comparativo</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="file" className="block text-sm font-medium text-gray-300 mb-1">Archivo PDF *</label>
                                        <input
                                            type="file"
                                            id="file"
                                            name="file"
                                            accept=".pdf"
                                            onChange={handleFileChange}
                                            className="w-full text-gray-100 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-700 file:text-white hover:file:bg-gray-600"
                                            required
                                        />
                                    </div>
                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-red-dark hover:bg-red-dark/90 text-white rounded-lg flex items-center transition-colors"
                                            disabled={!reportType || !selectedFile}
                                        >
                                            <Upload size={18} className="mr-2" />
                                            Asignar Informe
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>

                        {/* Lista de Informes Asignados */}
                        <div className="p-4 border border-gray-700 rounded-lg">
                            <h3 className="text-lg font-semibold text-white mb-3">Informes Asignados</h3>
                            {selectedCenterForInforme.informes.length === 0 ? (
                                <p className="text-gray-500">No hay informes asignados a este centro.</p>
                            ) : (
                                <div className="max-h-[300px] overflow-y-auto">
                                    <ul className="space-y-2">
                                        {selectedCenterForInforme.informes.map((informe: InformeCentro) => (
                                        <li key={informe.id} className="flex justify-between items-center bg-gray-dark p-3 rounded-md">
                                            <div className="flex flex-col">
                                                <span className="text-white font-medium">{informe.filename}</span>
                                                <span className="text-sm text-gray-400">Tipo: {informe.report_type}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <a
                                                  href={`${import.meta.env.VITE_API_URL}/informes-centro/download/${informe.filename}`}
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                  className="text-green-400 hover:text-green-300 p-1 rounded hover:bg-gray-600 transition-colors"
                                                  title="Descargar"
                                                >
                                                  <Upload size={16} className="rotate-180" />
                                                </a>
                                                {/* Botón de Analizar PDF */}
                                                <button
                                                  onClick={() => {
                                                    if (informe.is_analyzed) {
                                                      if (!window.confirm('Este informe ya ha sido analizado. ¿Deseas analizarlo de nuevo?')) {
                                                        return;
                                                      }
                                                    }
                                                    handleAnalyzeExistingPdf(informe);
                                                  }}
                                                  className={`p-1 rounded transition-colors ${informe.is_analyzed ? "bg-gray-600 text-gray-400 cursor-not-allowed" : "text-purple-400 hover:text-purple-300 hover:bg-gray-600"}`}
                                                  title={informe.is_analyzed ? "Informe ya analizado" : "Analizar PDF"}
                                                  disabled={informe.is_analyzed} // Deshabilitar si ya está analizado
                                                >
                                                  {informe.is_analyzed ? "Analizado" : "Analizar"}
                                                </button>
                                                <button
                                                  onClick={() => handleEliminarInforme(informe.id, selectedCenterForInforme.id)}
                                                  className="text-red-400 hover:text-red-300 p-1 rounded hover:bg-gray-600 transition-colors"
                                                  title="Eliminar"
                                                >
                                                  <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                </div>
                            )}
                        </div>

                        {/* Mensaje de análisis */}
                        {analysisMessage && (
                          <div className={`mb-4 p-3 rounded-lg text-sm ${analysisMessage.includes("Error") ? "bg-red-900/30 text-red-400 border border-red-800" : "bg-blue-900/30 text-blue-400 border border-blue-800"}`}>
                            {analysisMessage}
                          </div>
                        )}

                    </div>
                </div>
            </div>
        )}

      </div>
    </div>
  );
};