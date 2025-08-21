import { StatCard } from './StatCard';
import { DashboardData } from './types';

interface DashboardHeaderProps {
  data: DashboardData[] | null;
  selectedCenters: string[];
  compareCenters: boolean;
}

export const DashboardHeader = ({ data, selectedCenters, compareCenters }: DashboardHeaderProps) => {
  const getHeaderTitle = () => {
    if (compareCenters && selectedCenters.length > 1) {
      return `Comparación: ${selectedCenters.join(', ')}`;
    }
    return selectedCenters.length > 0 ? selectedCenters[0] : 'Centro de Datos';
  };

  return (
    <div className="flex justify-center items-center w-full gap-3  pb-1 h-17 ">
      <div className="h-full px-5 text-white flex flex-col justify-center items-center text-center border border-dashed border-[#34b6c4] bg-[#1a3626] rounded-md ">
        <small className='text-nowrap'>Centro Seleccionado</small>
        <h1 className='inline-block text-xl font-bold '>
          {getHeaderTitle()}
        </h1>
      </div>
      <div className="grid grid-cols-4 gap-3 w-full h-full">
        {data?.[0]?.promedios && (
          <>
            <StatCard
              title="FCR Promedio"
              value={data[0].promedios.fcr_promedio.toFixed(2)}
              gradient="bg-gradient-to-r from-blue-600 to-blue-800"
            />
            <StatCard
              title="Peso Promedio"
              value={`${data[0].promedios.peso_promedio.toFixed(1)} kg`}
              gradient="bg-gradient-to-r from-green-600 to-green-800"
            />
            <StatCard
              title="Temperatura Promedio"
              value={`${data[0].promedios.temperatura_promedio.toFixed(1)}°C`}
              gradient="bg-gradient-to-r from-orange-600 to-orange-800"
            />
            <StatCard
              title="Precipitación Promedio"
              value={`${data[0].promedios.precipitacion_promedio.toFixed(1)} mm`}
              gradient="bg-gradient-to-r from-purple-600 to-purple-800"
            />
          </>
        )}
      </div>
    </div>
  );
};
