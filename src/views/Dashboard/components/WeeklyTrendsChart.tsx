import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartData } from './types';

interface WeeklyTrendsChartProps {
  data: ChartData[];
}

export const WeeklyTrendsChart = ({ data }: WeeklyTrendsChartProps) => {
  return (
    <div className="relative bg-gradient-to-bl to-[#115dd76d] via-[#18182a] from-[#02c6fc7e] p-[1px] h-full">
      <div className="relative group overflow-hidden bg-gradient-to-t to-[#08141e] from-[#1b1b2e] border border-[#283a53] p-4 flex flex-col shadow-lg h-full">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-white mb-2">Tendencias Semanales</h2>
          <p className="text-sm text-gray-400">Datos semanales combinados - Últimas 8 semanas</p>
        </div>
        
        <div className="flex-1 w-full" style={{ minHeight: '300px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.length > 0 ? data.slice(0, 8) : []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
              <XAxis dataKey="semana" stroke="#E5E7EB" fontSize={12} />
              <YAxis stroke="#E5E7EB" fontSize={12} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="temperatura" stroke="#F59E0B" name="Temperatura" strokeWidth={2} />
              <Line type="monotone" dataKey="fcr" stroke="#8B5CF6" name="FCR" strokeWidth={2} />
              <Line type="monotone" dataKey="peso" stroke="#10B981" name="Peso" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
