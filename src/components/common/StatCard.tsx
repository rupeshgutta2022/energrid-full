import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  subtitle?: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick?: () => void;
  accentColor?: 'blue' | 'emerald' | 'amber' | 'rose' | 'slate' | 'indigo';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  changeType = 'positive',
  subtitle,
  icon: Icon,
  onClick,
  accentColor = 'blue'
}) => {
  const getIconColor = () => {
    switch (accentColor) {
      case 'emerald':
        return 'text-emerald-600 bg-emerald-50 border-emerald-100';
      case 'amber':
        return 'text-amber-600 bg-amber-50 border-amber-100';
      case 'rose':
        return 'text-rose-600 bg-rose-50 border-rose-100';
      case 'indigo':
        return 'text-indigo-600 bg-indigo-50 border-indigo-100';
      case 'slate':
        return 'text-slate-600 bg-slate-100 border-slate-200';
      default:
        return 'text-blue-600 bg-blue-50 border-blue-100';
    }
  };

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs transition-all ${
        onClick ? 'cursor-pointer hover:border-slate-300 hover:shadow-sm' : ''
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-medium text-slate-500 tracking-wide uppercase">{title}</span>
        <div className={`p-2 rounded-lg border shrink-0 ${getIconColor()}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div className="mt-3 flex items-baseline justify-between gap-2">
        <div className="text-2xl font-semibold text-slate-900 tracking-tight">{value}</div>
        {change && (
          <div
            className={`inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full ${
              changeType === 'positive'
                ? 'text-emerald-700 bg-emerald-50'
                : changeType === 'negative'
                ? 'text-rose-700 bg-rose-50'
                : 'text-slate-600 bg-slate-100'
            }`}
          >
            {changeType === 'positive' && <ArrowUpRight className="w-3 h-3 mr-0.5" />}
            {changeType === 'negative' && <ArrowDownRight className="w-3 h-3 mr-0.5" />}
            {changeType === 'neutral' && <Minus className="w-3 h-3 mr-0.5" />}
            {change}
          </div>
        )}
      </div>

      {subtitle && (
        <div className="mt-1.5 text-xs text-slate-500 truncate">{subtitle}</div>
      )}
    </div>
  );
};
