import { ReactNode } from 'react';

interface StatCardProps {
  icon: ReactNode;
  value: string;
  label: string;
}

const StatCard = ({ icon, value, label }: StatCardProps) => {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col items-start gap-2">
      <div className="flex items-center gap-2">
        <div className="text-primary">{icon}</div>
        <span className="text-lg font-semibold text-card-foreground">{value}</span>
      </div>
      <p className="text-sm text-card-foreground/70">{label}</p>
    </div>
  );
};

export default StatCard;
