import { StatCardProps } from './types';

export const StatCard = ({ title, value, gradient }: StatCardProps) => {
  return (
    <div className={`${gradient} p-4 rounded-lg`}>
      <h3 className="text-white text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  );
};
