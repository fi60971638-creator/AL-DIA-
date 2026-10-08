import React, { useState } from 'react';
import { useFinance } from '../../context/FinanceContext';

export const PresupuestoScreen: React.FC = () => {
  const { user, budgetItems, updateUserBudget, addBudgetItem } = useFinance();

  const [isEditingBudget, setIsEditingBudget] = useState(false);
  const [incomeInput, setIncomeInput] = useState(user.monthlyIncome.toString());
  const [expensesInput, setExpensesInput] = useState(user.monthlyExpenses.toString());

  const available = user.monthlyIncome - user.monthlyExpenses;
  const savingsRate = user.monthlyIncome > 0 ? ((available / user.monthlyIncome) * 100).toFixed(1) : 0;

  const totalSpentAcrossCategories = budgetItems.reduce((sum, b) => sum + b.spentAmount, 0);

  const handleSaveBudget = (e: React.FormEvent) => {
    e.preventDefault();
    const inc = parseFloat(incomeInput) || 5500;
    const exp = parseFloat(expensesInput) || 3150;
    updateUserBudget(inc, exp);
    setIsEditingBudget(false);
  };

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
              Control de Ingresos y Gastos
            </span>
          </div>
          <h1 className="text-[26px] sm:text-[32px] font-extrabold text-[#0F172A] tracking-tight mt-1">
            Mi presupuesto
          </h1>
          <p className="text-[14px] text-slate-500">
            Organiza tus entradas y salidas mensuales para asegurar tu capacidad de pago.
          </p>
        </div>

        <button
          onClick={() => setIsEditingBudget(!isEditingBudget)}
          className="px-4 py-2.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold text-[13px] shadow-2xs transition-all flex items-center gap-2 self-start sm:self-auto cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">edit</span>
          <span>{isEditingBudget ? 'Cerrar edición' : 'Ajustar presupuesto'}</span>
        </button>
      </div>

      {/* Editor Modal/Panel si está activo */}
      {isEditingBudget && (
        <form onSubmit={handleSaveBudget} className="bg-white rounded-3xl p-6 border-2 border-emerald-500/30 shadow-md flex flex-col gap-4 animate-in fade-in duration-200">
          <h3 className="text-[16px] font-bold text-slate-900">
            Ajustar ingresos y gastos base
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[12.5px] font-semibold text-slate-700 mb-1">
                Ingresos mensuales netos (S/)
              </label>
              <input
                type="number"
                value={incomeInput}
                onChange={(e) => setIncomeInput(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-[15px] font-bold focus:outline-none focus:border-emerald-600"
              />
            </div>
            <div>
              <label className="block text-[12.5px] font-semibold text-slate-700 mb-1">
                Gastos fijos y variables base (S/)
              </label>
              <input
                type="number"
                value={expensesInput}
                onChange={(e) => setExpensesInput(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-[15px] font-bold focus:outline-none focus:border-emerald-600"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsEditingBudget(false)}
              className="px-4 py-2 rounded-xl text-[13px] font-semibold text-slate-600 hover:bg-slate-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-[13px] font-bold bg-emerald-600 text-white hover:bg-emerald-700 shadow-2xs"
            >
              Guardar cambios
            </button>
          </div>
        </form>
      )}

      {/* 1. Tarjetas Principales: Ingresos / Gastos / Disponible */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {/* Ingresos */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-bold uppercase tracking-wider text-slate-400">
              Ingresos del mes
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">trending_up</span>
            </div>
          </div>
          <div className="my-3">
            <span className="text-[28px] font-extrabold text-slate-900 block tracking-tight">
              S/ {user.monthlyIncome.toLocaleString('es-PE')}
            </span>
            <span className="text-[12px] text-slate-500">
              Sueldo neto + otros ingresos
            </span>
          </div>
          <div className="pt-2 border-t border-slate-100 text-[11.5px] text-emerald-700 font-semibold">
            100% de base financiera
          </div>
        </div>

        {/* Gastos */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-bold uppercase tracking-wider text-slate-400">
              Gastos del mes
            </span>
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
            </div>
          </div>
          <div className="my-3">
            <span className="text-[28px] font-extrabold text-slate-900 block tracking-tight">
              S/ {user.monthlyExpenses.toLocaleString('es-PE')}
            </span>
            <span className="text-[12px] text-slate-500">
              Vivienda, alimentación, etc.
            </span>
          </div>
          <div className="pt-2 border-t border-slate-100 text-[11.5px] text-rose-600 font-semibold">
            57.3% de tus ingresos totales
          </div>
        </div>

        {/* Disponible */}
        <div className="bg-gradient-to-br from-emerald-600 to-[#00B49F] text-white rounded-3xl p-6 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-bold uppercase tracking-wider text-emerald-100">
              Disponible para cuotas y ahorro
            </span>
            <div className="w-8 h-8 rounded-lg bg-white/20 text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">savings</span>
            </div>
          </div>
          <div className="my-3">
            <span className="text-[28px] font-extrabold text-white block tracking-tight">
              S/ {available.toLocaleString('es-PE')}
            </span>
            <span className="text-[12px] text-emerald-100">
              Margen neto libre del mes
            </span>
          </div>
          <div className="pt-2 border-t border-white/20 text-[11.5px] text-white/90 font-semibold flex items-center justify-between">
            <span>Tasa de margen: {savingsRate}%</span>
            <span>Rango saludable ✓</span>
          </div>
        </div>
      </div>

      {/* 2. Desglose por Categorías Solicitadas */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs flex flex-col gap-6">
        <div>
          <h2 className="text-[20px] font-extrabold text-[#0F172A] tracking-tight">
            Distribución por categorías
          </h2>
          <p className="text-[13px] text-slate-500 mt-0.5">
            Supervisa el consumo en cada rubro clave para mantener equilibrio en tus finanzas.
          </p>
        </div>

        {/* Gráfico de Barra Segmentada Proporcional */}
        <div className="flex flex-col gap-2">
          <div className="h-4 rounded-full overflow-hidden flex bg-slate-100 p-0.5 border border-slate-200">
            {budgetItems.map((item) => {
              const widthPct = (item.spentAmount / totalSpentAcrossCategories) * 100;
              return (
                <div
                  key={item.id}
                  title={`${item.category}: S/ ${item.spentAmount}`}
                  style={{
                    width: `${widthPct}%`,
                    backgroundColor: item.color,
                  }}
                  className="h-full first:rounded-l-full last:rounded-r-full transition-all"
                />
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[12px] pt-1">
            {budgetItems.map((item) => (
              <div key={item.id} className="flex items-center gap-1.5">
                <span
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-slate-600 font-medium">{item.category}</span>
                <span className="text-slate-400">
                  ({Math.round((item.spentAmount / totalSpentAcrossCategories) * 100)}%)
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Lista de Categorías con Barras Individuales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {budgetItems.map((item) => {
            const pct = Math.min(100, Math.round((item.spentAmount / item.budgetedAmount) * 100));
            const isFull = pct >= 95;
            return (
              <div
                key={item.id}
                className="bg-slate-50/70 rounded-2xl p-4 border border-slate-200 flex flex-col justify-between gap-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-white shrink-0"
                      style={{ backgroundColor: item.color }}
                    >
                      <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                    </div>
                    <span className="text-[14px] font-bold text-slate-900">
                      {item.category}
                    </span>
                  </div>

                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      isFull ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {pct}%
                  </span>
                </div>

                <div>
                  <div className="flex justify-between text-[12.5px] mb-1.5">
                    <span className="text-slate-500">Gastado:</span>
                    <span className="font-extrabold text-slate-900">
                      S/ {item.spentAmount.toLocaleString('es-PE')}
                      <span className="text-slate-400 font-normal"> / S/ {item.budgetedAmount}</span>
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${pct}%`,
                        backgroundColor: item.color,
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Regla 50 / 30 / 20 */}
      <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col gap-4">
        <div className="flex items-center gap-2 text-emerald-400">
          <span className="material-symbols-outlined text-[22px]">auto_awesome</span>
          <h3 className="text-[18px] font-bold text-white">
            Estructura recomendada (Regla 50 / 30 / 20)
          </h3>
        </div>
        <p className="text-[13.5px] text-slate-300 leading-relaxed max-w-2xl">
          Para tus ingresos de S/ {user.monthlyIncome.toLocaleString('es-PE')}, el equilibrio financiero ideal recomienda:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="bg-white/10 rounded-2xl p-4 border border-white/10">
            <span className="text-[12px] font-bold text-emerald-400 block">50% Necesidades</span>
            <span className="text-[20px] font-extrabold text-white mt-1 block">
              S/ {(user.monthlyIncome * 0.5).toLocaleString('es-PE')}
            </span>
            <span className="text-[11.5px] text-slate-300">Vivienda, comida, luz, agua</span>
          </div>

          <div className="bg-white/10 rounded-2xl p-4 border border-white/10">
            <span className="text-[12px] font-bold text-amber-400 block">30% Deseos</span>
            <span className="text-[20px] font-extrabold text-white mt-1 block">
              S/ {(user.monthlyIncome * 0.3).toLocaleString('es-PE')}
            </span>
            <span className="text-[11.5px] text-slate-300">Salidas, suscripciones, compras</span>
          </div>

          <div className="bg-white/10 rounded-2xl p-4 border border-white/10">
            <span className="text-[12px] font-bold text-blue-400 block">20% Progreso y Deudas</span>
            <span className="text-[20px] font-extrabold text-white mt-1 block">
              S/ {(user.monthlyIncome * 0.2).toLocaleString('es-PE')}
            </span>
            <span className="text-[11.5px] text-slate-300">Amortización extra y ahorro</span>
          </div>
        </div>
      </section>
    </div>
  );
};
