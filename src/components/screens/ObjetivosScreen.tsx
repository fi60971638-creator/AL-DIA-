import React, { useState } from 'react';
import { useFinance } from '../../context/FinanceContext';

export const ObjetivosScreen: React.FC = () => {
  const { goals, openAddGoalModal, updateGoalAmount } = useFinance();

  const [editingGoalId, setEditingGoalId] = useState<string | null>(null);
  const [contributionInput, setContributionInput] = useState<string>('');

  const handleContribute = (goalId: string, current: number) => {
    const addVal = parseFloat(contributionInput);
    if (!isNaN(addVal) && addVal > 0) {
      updateGoalAmount(goalId, current + addVal);
      setEditingGoalId(null);
      setContributionInput('');
    }
  };

  const totalTarget = goals.reduce((sum, g) => sum + g.targetAmount, 0);
  const totalSaved = goals.reduce((sum, g) => sum + g.currentAmount, 0);
  const totalPercentage = totalTarget > 0 ? ((totalSaved / totalTarget) * 100).toFixed(1) : 0;

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
              Metas de Futuro
            </span>
          </div>
          <h1 className="text-[26px] sm:text-[32px] font-extrabold text-[#0F172A] tracking-tight mt-1">
            Mis objetivos
          </h1>
          <p className="text-[14px] text-slate-500">
            Crea metas financieras, monitorea tu progreso y celebra cada paso cumplido.
          </p>
        </div>

        <button
          onClick={openAddGoalModal}
          className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[14px] shadow-sm hover:shadow transition-all flex items-center gap-2 self-start sm:self-auto cursor-pointer active:scale-[0.99]"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          <span>+ Nuevo objetivo</span>
        </button>
      </div>

      {/* Resumen Global de Objetivos */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-2xs grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div>
          <span className="text-[12px] font-bold uppercase tracking-wider text-slate-400 block">
            Ahorro acumulado en metas
          </span>
          <span className="text-[26px] sm:text-[30px] font-extrabold text-emerald-700 mt-1 block">
            S/ {totalSaved.toLocaleString('es-PE')}
          </span>
          <span className="text-[12px] text-slate-500">
            Meta global: S/ {totalTarget.toLocaleString('es-PE')}
          </span>
        </div>

        <div>
          <span className="text-[12px] font-bold uppercase tracking-wider text-slate-400 block">
            Progreso consolidado
          </span>
          <span className="text-[26px] sm:text-[30px] font-extrabold text-[#0F172A] mt-1 block">
            {totalPercentage}%
          </span>
          <div className="w-full h-2 rounded-full bg-slate-100 mt-2 overflow-hidden">
            <div
              className="h-full bg-emerald-600 rounded-full"
              style={{ width: `${totalPercentage}%` }}
            />
          </div>
        </div>

        <div>
          <span className="text-[12px] font-bold uppercase tracking-wider text-slate-400 block">
            Metas en curso
          </span>
          <span className="text-[26px] sm:text-[30px] font-extrabold text-[#0F3B82] mt-1 block">
            {goals.length} objetivos
          </span>
          <span className="text-[12px] text-slate-500">
            Fondo de emergencia, deudas y proyectos
          </span>
        </div>
      </div>

      {/* Grid de Objetivos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {goals.map((goal) => {
          const isComplete = goal.percentage >= 100;
          const isEditing = editingGoalId === goal.id;

          return (
            <div
              key={goal.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between gap-5"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[26px]">
                      {goal.icon}
                    </span>
                  </div>

                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      isComplete
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {isComplete ? '🎉 Cumplido' : `${goal.percentage}%`}
                  </span>
                </div>

                <div className="mt-4">
                  <h3 className="text-[17px] font-bold text-slate-900 leading-snug">
                    {goal.title}
                  </h3>
                  {goal.deadline && (
                    <span className="text-[12px] text-slate-400 block mt-0.5">
                      Meta: {goal.deadline}
                    </span>
                  )}
                </div>
              </div>

              {/* Progress and Numbers */}
              <div>
                <div className="flex items-baseline justify-between text-[13px] mb-2 font-medium">
                  <span className="text-[18px] font-extrabold text-[#0F172A]">
                    S/ {goal.currentAmount.toLocaleString('es-PE')}
                  </span>
                  <span className="text-slate-500 text-[12px]">
                    de S/ {goal.targetAmount.toLocaleString('es-PE')}
                  </span>
                </div>

                <div className="w-full h-3 rounded-full bg-slate-100 p-0.5 border border-slate-200">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-[#00B49F] rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, goal.percentage)}%` }}
                  />
                </div>
              </div>

              {/* Aportar monto interactivo */}
              {isEditing ? (
                <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
                  <span className="text-[11.5px] font-semibold text-slate-600">
                    Sumar abono a la meta (S/):
                  </span>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      step="10"
                      value={contributionInput}
                      onChange={(e) => setContributionInput(e.target.value)}
                      placeholder="Ej. 200"
                      className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 text-[13px] font-bold focus:outline-none focus:border-emerald-600"
                    />
                    <button
                      onClick={() => handleContribute(goal.id, goal.currentAmount)}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-[12px] hover:bg-emerald-700"
                    >
                      Abonar
                    </button>
                    <button
                      onClick={() => setEditingGoalId(null)}
                      className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ) : (
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => {
                      setEditingGoalId(goal.id);
                      setContributionInput('');
                    }}
                    className="w-full py-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 text-[12.5px] font-bold border border-slate-200 hover:border-emerald-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">add</span>
                    <span>Aportar a esta meta</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
