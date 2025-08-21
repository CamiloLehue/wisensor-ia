import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, Area, AreaChart } from 'recharts';
import { ChartData } from './types';

interface ChartRendererProps {
  data: ChartData[];
  dataKeys: string[];
  colors: string[];
  chartType: string;
}

export const ChartRenderer = ({ data, dataKeys, colors, chartType }: ChartRendererProps) => {
  const ChartComponent = chartType === 'bar' ? BarChart : chartType === 'area' ? AreaChart : LineChart;
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ChartComponent data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
        <XAxis dataKey="month" stroke="#E5E7EB" fontSize={12} />
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
        {chartType === 'bar' ? (
          dataKeys.map((key, index) => (
            <Bar key={key} dataKey={key} fill={colors[index % colors.length]} name={key} />
          ))
        ) : chartType === 'area' ? (
          dataKeys.map((key, index) => (
            <Area key={key} type="monotone" dataKey={key} stackId={index + 1} stroke={colors[index % colors.length]} fill={colors[index % colors.length]} name={key} />
          ))
        ) : (
          dataKeys.map((key, index) => (
            <Line key={key} type="monotone" dataKey={key} stroke={colors[index % colors.length]} name={key} strokeWidth={2} />
          ))
        )}
      </ChartComponent>
    </ResponsiveContainer>
  );
};
