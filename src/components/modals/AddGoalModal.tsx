import React, { useState } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { FinancialGoal } from '../../types';

export const AddGoalModal: React.FC = () => {
  const { isAddGoalOpen, closeAddGoalModal, addGoal } = useFinance();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<FinancialGoal['category']>('emergencia');
  const [currentAmount, setCurrentAmount] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [deadline, setDeadline] = useState('');
  const [error, setError] = useState('');

  if (!isAddGoalOpen) return null;

  const categoryPresets: Record<FinancialGoal['category'], { label: string; icon: string }> = {
    emergencia: { label: 'Fondo de emergencia', icon: 'shield_lock' },
    salir_deudas: { label: 'Salir de deudas', icon: 'credit_card_off' },
    ahorro: { label: 'Ahorro general', icon: 'savings' },
    vivienda: { label: 'Comprar una vivienda', icon: 'home' },
    viaje: { label: 'Viajar', icon: 'flight' },
    mejorar_finanzas: { label: 'Mejorar mis finanzas', icon: 'trending_up' },
  };

  const handleCategorySelect = (cat: FinancialGoal['category']) => {
    setCategory(cat);
    if (!title || Object.values(categoryPresets).some((p) => p.label === title)) {
      setTitle(categoryPresets[cat].label);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const targetNum = parseFloat(targetAmount);
    const currentNum = parseFloat(currentAmount) || 0;

    if (!title.trim()) {
      setError('Por favor indica un título para tu objetivo.');
      return;
    }
    if (isNaN(targetNum) || targetNum <= 0) {
      setError('Ingresa un monto meta mayor a S/ 0.');
      return;
    }

    addGoal({
      title: title.trim(),
      category,
      currentAmount: currentNum,
      targetAmount: targetNum,
      deadline: deadline.trim() || undefined,
      icon: categoryPresets[category].icon,
    });

    setTitle('');
    setCurrentAmount('');
    setTargetAmount('');
    setDeadline('');
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">flag</span>
            </div>
            <div>
              <h3 className="text-[18px] font-bold text-slate-900 tracking-tight">
                Crear nuevo objetivo
              </h3>
              <p className="text-[12px] text-slate-500">
                Define metas financieras claras y sigue tu avance paso a paso.
              </p>
            </div>
          </div>
          <button
            onClick={closeAddGoalModal}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex flex-col gap-4">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-[13px] flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">error</span>
              <span>{error}</span>
            </div>
          )}

          {/* Categorías recomendadas */}
          <div>
            <label className="block text-[13px] font-semibold text-slate-700 mb-2">
              Elige el tipo de objetivo
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {(Object.keys(categoryPresets) as FinancialGoal['category'][]).map((cat) => {
                const isSelected = category === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleCategorySelect(cat)}
                    className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-800 font-semibold shadow-2xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px] text-emerald-600">
                      {categoryPresets[cat].icon}
                    </span>
                    <span className="text-[12px] truncate">{categoryPresets[cat].label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
              Título del objetivo <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej. Fondo de emergencia S/ 5,000"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-[14px] focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                Monto actual ahorrado (S/)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-slate-400 font-semibold text-[14px]">S/</span>
                <input
                  type="number"
                  step="0.01"
                  value={currentAmount}
                  onChange={(e) => setCurrentAmount(e.target.value)}
                  placeholder="2500.00"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-[14px] font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                Monto meta (S/) <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-slate-400 font-semibold text-[14px]">S/</span>
                <input
                  type="number"
                  step="0.01"
                  min="1"
                  value={targetAmount}
                  onChange={(e) => setTargetAmount(e.target.value)}
                  placeholder="5000.00"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-[14px] font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
              Fecha o plazo estimado
            </label>
            <input
              type="text"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              placeholder="Ej. Diciembre 2026 o en 6 meses"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-[14px] focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3 mt-2">
            <button
              type="button"
              onClick={closeAddGoalModal}
              className="px-4 py-2.5 rounded-xl text-[14px] font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-[14px] font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer active:scale-[0.99]"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              <span>Crear objetivo</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
