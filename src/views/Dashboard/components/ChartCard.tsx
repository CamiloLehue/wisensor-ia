import { ChartCardProps } from './types';
import { ChartRenderer } from './ChartRenderer';

export const ChartCard = ({ 
  title, 
  subtitle, 
  data, 
  dataKeys, 
  colors, 
  chartType, 
  className = "" 
}: ChartCardProps) => {
  return (
    <div className={`relative bg-gradient-to-bl to-[#115dd7] via-[#18182a] from-[#02c6fc] p-[1px] rounded-lg h-full ${className}`}>
      <div className="relative group overflow-hidden bg-gradient-to-t to-[#08141e] from-[#1b1b2e] rounded-lg border border-[#283a53] p-4 flex flex-col shadow-lg h-full">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-white mb-2">{title}</h2>
          <p className="text-sm text-gray-400">{subtitle}</p>
        </div>
        
        <div className="flex-1 w-full" style={{ minHeight: '300px' }}>
          <ChartRenderer 
            data={data}
            dataKeys={dataKeys}
            colors={colors}
            chartType={chartType}
          />
        </div>
      </div>
    </div>
  );
};
