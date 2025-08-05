import React, { useState } from 'react';

const PdfUploadView = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const uploadPdf = async (file: File) => {
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null); 

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://10.20.7.102:3000/api/pdf-analysis/analyze-pdf/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Error al analizar el PDF.');
      }

      const result = await response.json();
      setAnalysisResult(result);
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error desconocido.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
      uploadPdf(file);
    } else {
      setSelectedFile(null);
      setFileName(null);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      setFileName(file.name);
      uploadPdf(file);
    } else if (file) {
      alert("Por favor, arrastra solo archivos PDF.");
      setSelectedFile(null);
      setFileName(null);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className="flex flex-col h-full w-full bg-gray-dark text-white p-4 gap-4">
      {/* Sección de Subida de PDF (Compacta en la parte superior) */}
      <div className="card-hover p-4 rounded-lg border border-[#2a2d32] shadow-md flex flex-col items-center justify-center relative">
        <h2 className="text-xl font-bold mb-3 text-gray-300">Carga de Documentos PDF</h2>
        <div
          className="border-2 border-dashed border-gray-600 rounded-lg p-6 w-full max-w-lg text-center cursor-pointer hover:border-blue-500 transition-colors duration-200"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <input
            type="file"
            accept=".pdf"
            className="hidden"
            id="pdf-upload-input"
            onChange={handleFileChange}
          />
          <label htmlFor="pdf-upload-input" className="flex flex-col items-center justify-center w-full h-full">
            <p className="text-gray-400 text-sm mb-2">Arrastra y suelta un PDF aquí o</p>
            <span className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-semibold">
              Seleccionar Archivo PDF
            </span>
          </label>
          {fileName && <p className="mt-2 text-gray-300 text-sm">Archivo seleccionado: <span className="font-medium">{fileName}</span></p>}
        </div>

        <button
          onClick={() => window.history.back()}
          className="absolute top-4 left-4 bg-gray-600 hover:bg-gray-700 text-white px-4 py-1 rounded-lg transition-colors duration-200 text-sm font-semibold"
        >
          Volver
        </button>
      </div>

      {/* Sección de Resultados del Análisis */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto">
        {isLoading && (
          <div className="col-span-full text-center text-gray-400">Cargando análisis...</div>
        )}
        {error && (
          <div className="col-span-full text-center text-red-500">Error: {error}</div>
        )}
        {analysisResult && (
          <>
            {/* Resumen Clave */}
            <div className="bg-gray-darkL p-4 rounded-lg border border-gray-700 shadow-md flex flex-col justify-center">
              <h3 className="text-lg font-semibold mb-2 text-gray-300">Resumen Clave</h3>
              <p className="text-gray-500 text-sm">{analysisResult.summary || 'No se pudo generar un resumen.'}</p>
            </div>

            {/* Temas Principales (ejemplo de card) */}
            <div className="bg-gray-darkL p-4 rounded-lg border border-gray-700 shadow-md flex flex-col justify-center">
              <h3 className="text-lg font-semibold mb-2 text-gray-300">Temas Principales</h3>
              <ul className="text-gray-500 text-sm list-disc pl-5">
                {analysisResult.topics && analysisResult.topics.length > 0 ? (
                  analysisResult.topics.map((topic: string, index: number) => (
                    <li key={index}>{topic}</li>
                  ))
                ) : (
                  <li>No se identificaron temas.</li>
                )}
              </ul>
            </div>

            {/* Entidades Detectadas (ejemplo de card) */}
            <div className="bg-gray-darkL p-4 rounded-lg border border-gray-700 shadow-md flex flex-col justify-center">
              <h3 className="text-lg font-semibold mb-2 text-gray-300">Entidades Detectadas</h3>
              <ul className="text-gray-500 text-sm list-disc pl-5">
                {analysisResult.entities && analysisResult.entities.length > 0 ? (
                  analysisResult.entities.map((entity: string, index: number) => (
                    <li key={index}>{entity}</li>
                  ))
                ) : (
                  <li>No se detectaron entidades.</li>
                )}
              </ul>
            </div>

            {/* Análisis Detallado de Contenido */}
            <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-gray-darkL p-4 rounded-lg border border-gray-700 shadow-md flex flex-col">
              <h3 className="text-lg font-semibold mb-2 text-gray-300">Análisis Detallado de Contenido</h3>
              <p className="text-gray-500 text-sm whitespace-pre-wrap">{analysisResult.full_analysis || 'No se pudo generar un análisis detallado.'}</p>
            </div>
          </>
        )}
        {!isLoading && !error && !analysisResult && (
            <div className="col-span-full text-center text-gray-400">Sube un PDF para comenzar el análisis.</div>
        )}
      </div>
    </div>
  );
};

export default PdfUploadView; 