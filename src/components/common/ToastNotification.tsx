import React from 'react';
import { useFinance } from '../../context/FinanceContext';

export const ToastNotification: React.FC = () => {
  const { toast, hideToast } = useFinance();

  if (!toast.show) return null;

  return (
    <aside
      aria-label="Notificaciones del sistema"
      className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 max-w-sm w-[calc(100vw-2rem)] sm:w-auto animate-in fade-in slide-in-from-bottom-5 duration-300 pointer-events-auto"
    >
      <div className="bg-[#0F172A] text-white rounded-2xl p-4 shadow-2xl border border-slate-700/60 flex items-start gap-3 backdrop-blur-md">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-[24px]">check_circle</span>
        </div>
        <div className="flex-1 min-w-0 pt-0.5">
          <h4 className="text-[14px] font-bold text-white tracking-tight flex items-center gap-1.5">
            {toast.title}
          </h4>
          <p className="text-[12.5px] text-slate-300 mt-0.5 leading-snug">
            {toast.message}
          </p>
        </div>
        <button
          onClick={hideToast}
          className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          title="Cerrar notificación"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>
      </div>
    </aside>
  );
};
