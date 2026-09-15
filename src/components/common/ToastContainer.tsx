import React from 'react';
import { useLogistics } from '../../context/LogisticsContext';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useLogistics();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-60 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const getStyles = () => {
          switch (toast.type) {
            case 'success':
              return {
                border: 'border-emerald-200 bg-white text-emerald-900',
                icon: <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              };
            case 'warning':
              return {
                border: 'border-amber-200 bg-white text-amber-900',
                icon: <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              };
            case 'error':
              return {
                border: 'border-rose-200 bg-white text-rose-900',
                icon: <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              };
            default:
              return {
                border: 'border-blue-200 bg-white text-blue-900',
                icon: <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              };
          }
        };

        const { border, icon } = getStyles();

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-lg transition-all animate-in slide-in-from-bottom-3 duration-200 ${border}`}
          >
            {icon}
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-semibold tracking-tight">{toast.title}</h4>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-700 p-0.5 rounded transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
