import React, { useState } from 'react';
import { useFinance } from '../../context/FinanceContext';

export const PagosScreen: React.FC = () => {
  const {
    debts,
    payments,
    openRegisterPaymentModal,
    openDebtDetailModal,
  } = useFinance();

  const [activeTab, setActiveTab] = useState<'proximos' | 'historial'>('proximos');

  const totalPaidThisYear = payments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
              Calendario y Registro
            </span>
          </div>
          <h1 className="text-[26px] sm:text-[32px] font-extrabold text-[#0F172A] tracking-tight mt-1">
            Gestión de pagos
          </h1>
          <p className="text-[14px] text-slate-500">
            Controla tus fechas de vencimiento y mantén el registro de cada cuota amortizada.
          </p>
        </div>

        <button
          onClick={() => openRegisterPaymentModal()}
          className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[14px] shadow-sm hover:shadow transition-all flex items-center gap-2 self-start sm:self-auto cursor-pointer active:scale-[0.99]"
        >
          <span className="material-symbols-outlined text-[20px]">payments</span>
          <span>+ Registrar pago</span>
        </button>
      </div>

      {/* Tabs Switcher: Próximos Pagos vs Historial */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-1">
        <button
          onClick={() => setActiveTab('proximos')}
          className={`px-4 py-2.5 text-[14px] font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'proximos'
              ? 'border-emerald-600 text-emerald-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">calendar_month</span>
          <span>Próximos pagos ({debts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('historial')}
          className={`px-4 py-2.5 text-[14px] font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'historial'
              ? 'border-emerald-600 text-emerald-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">history</span>
          <span>Historial de pagos ({payments.length})</span>
        </button>
      </div>

      {/* TAB 1: PRÓXIMOS PAGOS */}
      {activeTab === 'proximos' && (
        <div className="flex flex-col gap-6">
          {/* Banner de Recordatorio de Puntualidad */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-xs">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 text-emerald-400 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[26px]">alarm</span>
              </div>
              <div>
                <h3 className="text-[17px] font-bold text-white">
                  Tip de puntualidad AlDía
                </h3>
                <p className="text-[13px] text-slate-300 mt-0.5 leading-relaxed max-w-xl">
                  Pagar 2 a 3 días hábiles antes del vencimiento garantiza que tu abono se procese a tiempo ante la SBS, evitando cargos por cobranza y preservando tu calificación Normal.
                </p>
              </div>
            </div>

            <button
              onClick={() => openRegisterPaymentModal()}
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-[13px] transition-all shrink-0 cursor-pointer"
            >
              Adelantar un pago
            </button>
          </div>

          {/* Grid de Próximos Pagos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {debts.map((debt) => {
              const isUrgent = debt.daysLeft <= 5;
              return (
                <div
                  key={debt.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs flex flex-col justify-between gap-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                        <span className="material-symbols-outlined text-[22px]">
                          {debt.categoryIcon || 'credit_card'}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-[16px] font-bold text-slate-900">
                          {debt.name}
                        </h4>
                        <span className="text-[12px] text-slate-500">
                          {debt.institution}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        isUrgent
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}
                    >
                      {isUrgent ? `🟡 Vence en ${debt.daysLeft} días` : `🟢 Vence en ${debt.daysLeft} días`}
                    </span>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex items-baseline justify-between">
                    <div>
                      <span className="text-[11px] text-slate-400 uppercase font-semibold block">
                        Monto de la cuota
                      </span>
                      <span className="text-[22px] font-extrabold text-[#0F172A]">
                        S/ {debt.monthlyPayment.toLocaleString('es-PE')}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[11px] text-slate-400 uppercase font-semibold block">
                        Fecha límite
                      </span>
                      <span className="text-[14px] font-bold text-slate-700">
                        {debt.dueDateFormatted}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => openRegisterPaymentModal(debt.id)}
                      className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[13px] shadow-2xs hover:shadow transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.99]"
                    >
                      <span className="material-symbols-outlined text-[17px]">payments</span>
                      <span>Pagar cuota</span>
                    </button>
                    <button
                      onClick={() => openDebtDetailModal(debt)}
                      className="px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold text-[13px] transition-colors cursor-pointer"
                    >
                      Ver detalle
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: HISTORIAL DE PAGOS */}
      {activeTab === 'historial' && (
        <div className="flex flex-col gap-6">
          {/* Métrica de Pagos Históricos */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[12px] font-bold uppercase tracking-wider text-slate-400 block">
                Total pagado registrado
              </span>
              <span className="text-[28px] font-extrabold text-emerald-700 mt-1 block">
                S/ {totalPaidThisYear.toLocaleString('es-PE')}
              </span>
              <span className="text-[12.5px] text-slate-500">
                Sumatoria de todos los abonos registrados en tu cuenta
              </span>
            </div>

            <div className="px-4 py-2.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[13px] font-semibold flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-emerald-600">verified</span>
              <span>¡Cada pago reduce tu carga de intereses futuros!</span>
            </div>
          </div>

          {/* Listado de Pagos */}
          {payments.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center">
                <span className="material-symbols-outlined text-[32px]">receipt</span>
              </div>
              <h3 className="text-[17px] font-bold text-slate-800">
                Aún no has registrado pagos
              </h3>
              <p className="text-[13px] text-slate-500 max-w-sm">
                Cuando abones una cuota, haz clic en "Registrar pago" para que se refleje de inmediato en tu progreso.
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between text-[12px] font-bold uppercase tracking-wider text-slate-500">
                <span>Detalle del abono</span>
                <span>Monto y estado</span>
              </div>

              <div className="divide-y divide-slate-100">
                {payments.map((p) => (
                  <div
                    key={p.id}
                    className="p-5 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/50 transition-colors"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="material-symbols-outlined text-[20px]">check</span>
                      </div>
                      <div>
                        <h4 className="text-[15px] font-bold text-slate-900 leading-snug">
                          {p.debtName}
                        </h4>
                        <div className="flex flex-wrap items-center gap-2 text-[12px] text-slate-500 mt-0.5">
                          <span>{p.institution}</span>
                          <span>·</span>
                          <span>{p.date}</span>
                          <span>·</span>
                          <span>{p.paymentMethod}</span>
                        </div>
                        {p.note && (
                          <p className="text-[12px] text-slate-600 italic mt-1">
                            "{p.note}"
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="text-left sm:text-right pl-13 sm:pl-0">
                      <span className="text-[18px] font-extrabold text-[#0F172A] block">
                        S/ {p.amount.toLocaleString('es-PE')}
                      </span>
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full inline-block mt-0.5">
                        Confirmado
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
