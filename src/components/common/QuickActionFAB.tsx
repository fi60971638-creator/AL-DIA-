import React, { useState } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { TabType } from '../../types';

interface QuickActionFABProps {
  onNavigate: (tab: TabType) => void;
}

export const QuickActionFAB: React.FC<QuickActionFABProps> = ({ onNavigate }) => {
  const { openRegisterPaymentModal, openAddDebtModal, openAddGoalModal } = useFinance();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen((prev) => !prev);

  const handleAction = (action: () => void) => {
    action();
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-20 lg:bottom-8 right-4 lg:right-8 z-40 flex flex-col items-end">
      {/* Menu overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/20 backdrop-blur-2xs z-30 transition-opacity"
        />
      )}

      {/* Floating Action Menu Items */}
      {isOpen && (
        <div className="flex flex-col gap-2.5 mb-3 z-40 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <button
            onClick={() => handleAction(() => openRegisterPaymentModal())}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white text-slate-800 shadow-lg border border-slate-200 text-[13px] font-bold hover:bg-emerald-50 hover:text-emerald-700 transition-all cursor-pointer group"
          >
            <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">payments</span>
            </span>
            <span>Registrar pago</span>
          </button>

          <button
            onClick={() => handleAction(openAddDebtModal)}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white text-slate-800 shadow-lg border border-slate-200 text-[13px] font-bold hover:bg-blue-50 hover:text-[#0F3B82] transition-all cursor-pointer group"
          >
            <span className="w-8 h-8 rounded-full bg-blue-100 text-[#0F3B82] flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">add_card</span>
            </span>
            <span>Agregar deuda</span>
          </button>

          <button
            onClick={() => handleAction(() => onNavigate('presupuesto'))}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white text-slate-800 shadow-lg border border-slate-200 text-[13px] font-bold hover:bg-amber-50 hover:text-amber-700 transition-all cursor-pointer group"
          >
            <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">receipt_long</span>
            </span>
            <span>Registrar gasto</span>
          </button>

          <button
            onClick={() => handleAction(openAddGoalModal)}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white text-slate-800 shadow-lg border border-slate-200 text-[13px] font-bold hover:bg-purple-50 hover:text-purple-700 transition-all cursor-pointer group"
          >
            <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">flag</span>
            </span>
            <span>Crear objetivo</span>
          </button>
        </div>
      )}

      {/* Main Trigger Button */}
      <button
        onClick={toggle}
        className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center text-white transition-all transform active:scale-95 cursor-pointer z-40 ${
          isOpen
            ? 'bg-slate-800 rotate-45'
            : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/30'
        }`}
        title="Acciones rápidas"
      >
        <span className="material-symbols-outlined text-[28px] transition-transform">
          add
        </span>
      </button>
    </div>
  );
};
