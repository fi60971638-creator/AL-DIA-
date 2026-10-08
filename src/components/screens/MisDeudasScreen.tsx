import React, { useState } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { Debt } from '../../types';

export const MisDeudasScreen: React.FC = () => {
  const {
    debts,
    totalDebt,
    totalInitialDebt,
    totalPaidDebt,
    debtProgressPercentage,
    openAddDebtModal,
    openRegisterPaymentModal,
    openDebtDetailModal,
  } = useFinance();

  const [filter, setFilter] = useState<'todos' | 'tarjetas' | 'prestamos' | 'alta_tasa'>('todos');
  const [strategy, setStrategy] = useState<'avalancha' | 'bola_nieve'>('avalancha');

  const filteredDebts = debts.filter((d) => {
    if (filter === 'tarjetas') return d.type === 'tarjeta_credito';
    if (filter === 'prestamos') return d.type === 'prestamo_personal';
    if (filter === 'alta_tasa') return d.interestRate >= 30;
    return true;
  });

  // Sorted debts by strategy
  const sortedDebts = [...filteredDebts].sort((a, b) => {
    if (strategy === 'avalancha') {
      return b.interestRate - a.interestRate; // Highest interest first
    } else {
      return a.currentBalance - b.currentBalance; // Smallest balance first
    }
  });

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto">
      {/* 1. Encabezado de la página */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
              Control de obligaciones
            </span>
          </div>
          <h1 className="text-[26px] sm:text-[32px] font-extrabold text-[#0F172A] tracking-tight mt-1">
            Mis deudas
          </h1>
          <p className="text-[14px] text-slate-500">
            Visualiza saldos, tasas y programa tus pagos para liquidar cada obligación.
          </p>
        </div>

        {/* Botón Principal: + Agregar deuda */}
        <button
          onClick={openAddDebtModal}
          className="px-5 py-3 rounded-2xl bg-[#0F3B82] hover:bg-[#0A295C] text-white font-bold text-[14px] shadow-sm hover:shadow transition-all flex items-center gap-2 self-start sm:self-auto cursor-pointer active:scale-[0.99]"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          <span>+ Agregar deuda</span>
        </button>
      </div>

      {/* 2. Resumen Superior */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-2xs grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div>
          <span className="text-[12px] font-bold uppercase tracking-wider text-slate-400 block">
            Deuda total activa
          </span>
          <span className="text-[26px] sm:text-[30px] font-extrabold text-[#0F172A] mt-1 block">
            S/ {totalDebt.toLocaleString('es-PE')}
          </span>
          <span className="text-[12px] text-slate-500">
            Deuda original: S/ {totalInitialDebt.toLocaleString('es-PE')}
          </span>
        </div>

        <div>
          <span className="text-[12px] font-bold uppercase tracking-wider text-slate-400 block">
            Amortizado a la fecha
          </span>
          <span className="text-[26px] sm:text-[30px] font-extrabold text-emerald-700 mt-1 block">
            S/ {totalPaidDebt.toLocaleString('es-PE')}
          </span>
          <div className="w-full h-2 rounded-full bg-slate-100 mt-2 overflow-hidden">
            <div
              className="h-full bg-emerald-600 rounded-full"
              style={{ width: `${debtProgressPercentage}%` }}
            />
          </div>
        </div>

        <div>
          <span className="text-[12px] font-bold uppercase tracking-wider text-slate-400 block">
            Cuota mensual consolidada
          </span>
          <span className="text-[26px] sm:text-[30px] font-extrabold text-[#0F3B82] mt-1 block">
            S/ {debts.reduce((sum, d) => sum + d.monthlyPayment, 0).toLocaleString('es-PE')}
          </span>
          <span className="text-[12px] text-slate-500">
            Suma de tus pagos mínimos requeridos
          </span>
        </div>
      </div>

      {/* 3. Selector de Estrategia Inteligente */}
      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <span className="material-symbols-outlined text-[22px] text-[#0F3B82]">
            tune
          </span>
          <div>
            <span className="text-[13px] font-bold text-slate-900 block">
              Estrategia de pago sugerida
            </span>
            <span className="text-[12px] text-slate-500">
              {strategy === 'avalancha'
                ? 'Ordenado por mayor tasa (Avalancha: ahorras el máximo de intereses)'
                : 'Ordenado por menor saldo (Bola de nieve: victorias rápidas)'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200 self-start sm:self-auto">
          <button
            onClick={() => setStrategy('avalancha')}
            className={`px-3 py-1.5 rounded-lg text-[12px] font-bold transition-all cursor-pointer ${
              strategy === 'avalancha'
                ? 'bg-[#0F3B82] text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Avalancha (Mayor TEA)
          </button>
          <button
            onClick={() => setStrategy('bola_nieve')}
            className={`px-3 py-1.5 rounded-lg text-[12px] font-bold transition-all cursor-pointer ${
              strategy === 'bola_nieve'
                ? 'bg-[#0F3B82] text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Bola de nieve (Menor saldo)
          </button>
        </div>
      </div>

      {/* 4. Filtros de categoría */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'todos', label: 'Todas las deudas' },
          { id: 'tarjetas', label: 'Tarjetas de crédito' },
          { id: 'prestamos', label: 'Préstamos personales' },
          { id: 'alta_tasa', label: 'Tasa alta (> 30%)' },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id as typeof filter)}
            className={`px-3.5 py-1.5 rounded-xl text-[12.5px] font-semibold border transition-all whitespace-nowrap cursor-pointer ${
              filter === f.id
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* 5. Lista de Tarjetas de Deuda */}
      {sortedDebts.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 flex flex-col items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center">
            <span className="material-symbols-outlined text-[32px]">credit_card_off</span>
          </div>
          <h3 className="text-[17px] font-bold text-slate-800">
            No se encontraron deudas con este filtro
          </h3>
          <p className="text-[13px] text-slate-500 max-w-sm">
            Puedes cambiar de filtro o agregar una nueva deuda con el botón superior.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sortedDebts.map((debt, index) => {
            const isPriority = index === 0;
            return (
              <div
                key={debt.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between gap-5 relative group"
              >
                {/* Prioridad sugerida badge */}
                {isPriority && (
                  <div className="absolute -top-3 right-6 bg-emerald-600 text-white text-[10.5px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-2xs flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px]">bolt</span>
                    <span>Prioridad #1</span>
                  </div>
                )}

                {/* Encabezado: Nombre e Institución */}
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0F3B82] border border-blue-100 flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[26px]">
                          {debt.categoryIcon || 'credit_card'}
                        </span>
                      </div>
                      <div>
                        <h2 className="text-[17px] font-extrabold text-slate-900 leading-snug">
                          {debt.name}
                        </h2>
                        <span className="text-[12px] font-bold text-slate-500">
                          {debt.institution}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Estado */}
                  <div className="mt-3 flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        debt.status === 'proximo'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : debt.status === 'se_acerca'
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : debt.status === 'pagado'
                          ? 'bg-slate-100 text-slate-600'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}
                    >
                      <span>
                        {debt.status === 'proximo'
                          ? '🟢 Próximo'
                          : debt.status === 'se_acerca'
                          ? '🟡 Se acerca'
                          : debt.status === 'pagado'
                          ? '✅ Pagado'
                          : '🟢 Al día'}
                      </span>
                    </span>
                    <span className="text-[11.5px] text-slate-400">
                      Vence: {debt.dueDateFormatted}
                    </span>
                  </div>
                </div>

                {/* Métricas: Saldo y Cuota */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex flex-col gap-2.5">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[12px] text-slate-500">Saldo pendiente:</span>
                    <span className="text-[18px] font-extrabold text-[#0F172A]">
                      S/ {debt.currentBalance.toLocaleString('es-PE')}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-[12px] text-slate-500">Cuota mensual:</span>
                    <span className="text-[14px] font-bold text-slate-800">
                      S/ {debt.monthlyPayment.toLocaleString('es-PE')} / mes
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between pt-1 border-t border-slate-200 text-[11.5px]">
                    <span className="text-slate-500">Tasa de interés:</span>
                    <span className="font-bold text-emerald-700">
                      {debt.interestRate}% TCEA
                    </span>
                  </div>
                </div>

                {/* Barra de progreso y Porcentaje Pagado */}
                <div>
                  <div className="flex items-center justify-between text-[12px] mb-1.5 font-medium">
                    <span className="text-slate-500">Progreso</span>
                    <span className="font-bold text-emerald-700">{debt.paidPercentage}% pagado</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-[#00B49F] rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, Math.max(0, debt.paidPercentage))}%` }}
                    />
                  </div>
                </div>

                {/* Botones: Ver detalle & Registrar pago */}
                <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => openDebtDetailModal(debt)}
                    className="flex-1 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-[12.5px] font-bold transition-colors cursor-pointer text-center"
                  >
                    Ver detalle
                  </button>
                  <button
                    onClick={() => openRegisterPaymentModal(debt.id)}
                    className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[12.5px] font-bold shadow-2xs hover:shadow transition-all flex items-center justify-center gap-1 cursor-pointer active:scale-[0.99]"
                  >
                    <span className="material-symbols-outlined text-[16px]">payments</span>
                    <span>Registrar pago</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
