import React, { useState } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { CalendarActionIllustration } from '../common/Illustrations';

export const PagosScreen: React.FC = () => {
  const {
    debts,
    payments,
    openRegisterPaymentModal,
    openDebtDetailModal,
  } = useFinance();

  const [activeTab, setActiveTab] = useState<'calendario' | 'proximos' | 'historial'>('calendario');
  const [selectedDayFilter, setSelectedDayFilter] = useState<number | null>(null);

  const totalPaidThisYear = payments.reduce((sum, p) => sum + p.amount, 0);

  // Días del mes (Octubre 2026 como base)
  // Mapeamos los días con sus deudas correspondientes
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  const getDebtsForDay = (day: number) => {
    return debts.filter((d) => d.dueDay === day);
  };

  const debtsForSelectedDay = selectedDayFilter ? getDebtsForDay(selectedDayFilter) : debts;

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto pb-8">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-[#0F3B82] to-[#14478f] text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-sm">
        <div className="flex flex-col gap-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-[12px] font-bold w-fit">
            <span className="material-symbols-outlined text-[16px]">calendar_month</span>
            <span>Calendario de Vencimientos</span>
          </div>
          <h1 className="text-[26px] sm:text-[32px] font-black tracking-tight leading-tight">
            Organiza tus pagos. Evita atrasos.
          </h1>
          <p className="text-[14px] sm:text-[15px] text-blue-100/90 leading-relaxed">
            Revisa con anticipación tus fechas límite, programa tus pagos y mantén tu calificación crediticia en verde.
          </p>
        </div>

        <button
          onClick={() => openRegisterPaymentModal()}
          className="px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-[14px] shadow-sm hover:shadow transition-all flex items-center gap-2 shrink-0 cursor-pointer active:scale-[0.98]"
        >
          <span className="material-symbols-outlined text-[20px]">payments</span>
          <span>+ Registrar pago</span>
        </button>
      </div>

      {/* 2. Switcher de Pestañas Visuales */}
      <div className="flex items-center gap-2 border-b border-slate-200/90 pb-3">
        <button
          onClick={() => setActiveTab('calendario')}
          className={`px-4 py-2.5 rounded-2xl text-[13.5px] font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'calendario'
              ? 'bg-[#0F3B82] text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <span className="material-symbols-outlined text-[19px]">calendar_month</span>
          <span>Calendario mensual</span>
        </button>

        <button
          onClick={() => setActiveTab('proximos')}
          className={`px-4 py-2.5 rounded-2xl text-[13.5px] font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'proximos'
              ? 'bg-[#0F3B82] text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <span className="material-symbols-outlined text-[19px]">view_agenda</span>
          <span>Próximos pagos ({debts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('historial')}
          className={`px-4 py-2.5 rounded-2xl text-[13.5px] font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'historial'
              ? 'bg-[#0F3B82] text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <span className="material-symbols-outlined text-[19px]">receipt_long</span>
          <span>Historial ({payments.length})</span>
        </button>
      </div>

      {/* TAB 1: CALENDARIO MENSUAL */}
      {activeTab === 'calendario' && (
        <div className="flex flex-col gap-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-[19px] font-extrabold text-[#0F172A] tracking-tight">
                  Octubre 2026
                </h3>
                <p className="text-[12.5px] text-slate-500">
                  Haz clic en un día con vencimiento para ver las obligaciones asociadas.
                </p>
              </div>

              {selectedDayFilter && (
                <button
                  onClick={() => setSelectedDayFilter(null)}
                  className="text-[12px] font-bold text-[#0F3B82] hover:underline cursor-pointer"
                >
                  Mostrar todos los días
                </button>
              )}
            </div>

            {/* Días de la semana */}
            <div className="grid grid-cols-7 gap-2 text-center text-[12px] font-extrabold text-slate-400 uppercase tracking-wider">
              <span>Lun</span>
              <span>Mar</span>
              <span>Mié</span>
              <span>Jue</span>
              <span>Vie</span>
              <span>Sáb</span>
              <span>Dom</span>
            </div>

            {/* Grilla de Días del Mes */}
            <div className="grid grid-cols-7 gap-2">
              {daysInMonth.map((day) => {
                const dayDebts = getDebtsForDay(day);
                const hasDebts = dayDebts.length > 0;
                const isSelected = selectedDayFilter === day;
                const isUrgent = dayDebts.some((d) => d.daysLeft <= 5);

                return (
                  <button
                    key={day}
                    onClick={() => {
                      if (hasDebts) {
                        setSelectedDayFilter(isSelected ? null : day);
                      }
                    }}
                    className={`min-h-[72px] sm:min-h-[84px] p-2 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                      hasDebts
                        ? isSelected
                          ? 'border-[#0F3B82] bg-blue-50/80 shadow-xs cursor-pointer'
                          : isUrgent
                          ? 'border-amber-300 bg-amber-50/60 hover:bg-amber-100/70 cursor-pointer'
                          : 'border-emerald-300 bg-emerald-50/60 hover:bg-emerald-100/70 cursor-pointer'
                        : 'border-slate-100 bg-slate-50/40 text-slate-400 cursor-default'
                    }`}
                  >
                    <span
                      className={`text-[12.5px] font-extrabold ${
                        hasDebts ? 'text-slate-900' : 'text-slate-400'
                      }`}
                    >
                      {day}
                    </span>

                    {hasDebts && (
                      <div className="flex flex-col gap-1 mt-1">
                        {dayDebts.map((d) => (
                          <div
                            key={d.id}
                            className={`px-1.5 py-0.5 rounded text-[10px] font-bold truncate ${
                              d.daysLeft <= 5
                                ? 'bg-amber-200/90 text-amber-950'
                                : 'bg-emerald-200/90 text-emerald-950'
                            }`}
                            title={`${d.name} - S/ ${d.monthlyPayment}`}
                          >
                            S/ {d.monthlyPayment}
                          </div>
                        ))}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Leyenda */}
            <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-slate-100 text-[12px] text-slate-500">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-md bg-emerald-100 border border-emerald-300" />
                <span>Fecha límite programada</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-md bg-amber-100 border border-amber-300" />
                <span>Vence en menos de 5 días</span>
              </div>
            </div>
          </div>

          {/* Tarjetas de Deudas del Día Seleccionado o Próximas */}
          <div className="flex flex-col gap-3">
            <h4 className="text-[16px] font-extrabold text-[#0F172A] px-1">
              {selectedDayFilter
                ? `Vencimientos del día ${selectedDayFilter} de Octubre (${debtsForSelectedDay.length})`
                : `Todas las cuotas de este mes (${debts.length})`}
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {debtsForSelectedDay.map((debt) => (
                <div
                  key={debt.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between gap-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-[16px] font-bold text-slate-900">
                        {debt.name}
                      </h4>
                      <span className="text-[12px] text-slate-500">
                        {debt.institution} · Tasa: {debt.interestRate}% TEA
                      </span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-[#0F3B82] border border-blue-200">
                      Día {debt.dueDay}
                    </span>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-4 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-slate-400 uppercase font-bold block">
                        Cuota a pagar
                      </span>
                      <span className="text-[20px] font-black text-[#0F172A]">
                        S/ {debt.monthlyPayment.toLocaleString('es-PE')}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] text-slate-400 uppercase font-bold block">
                        Vence
                      </span>
                      <span className="text-[13px] font-bold text-slate-700">
                        {debt.dueDateFormatted}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => openRegisterPaymentModal(debt.id)}
                      className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[13px] transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <span className="material-symbols-outlined text-[17px]">check_circle</span>
                      <span>Registrar pago</span>
                    </button>
                    <button
                      onClick={() => openDebtDetailModal(debt)}
                      className="px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold text-[13px] transition-colors cursor-pointer"
                    >
                      Ver detalle
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PRÓXIMOS PAGOS (Lista en Tarjetas) */}
      {activeTab === 'proximos' && (
        <div className="flex flex-col gap-6 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {debts.map((debt) => {
              const isUrgent = debt.daysLeft <= 5;
              return (
                <div
                  key={debt.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between gap-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                        <span className="material-symbols-outlined text-[24px]">
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

                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 flex items-baseline justify-between">
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

                  <div className="flex items-center gap-3 pt-1">
                    <button
                      onClick={() => openRegisterPaymentModal(debt.id)}
                      className="flex-1 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[13px] shadow-2xs transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.99]"
                    >
                      <span className="material-symbols-outlined text-[17px]">check_circle</span>
                      <span>Pagar cuota</span>
                    </button>
                    <button
                      onClick={() => openDebtDetailModal(debt)}
                      className="px-5 py-3 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold text-[13px] transition-colors cursor-pointer"
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

      {/* TAB 3: HISTORIAL DE PAGOS */}
      {activeTab === 'historial' && (
        <div className="flex flex-col gap-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[12px] font-bold uppercase tracking-wider text-slate-400 block">
                Total pagado registrado
              </span>
              <span className="text-[28px] font-extrabold text-emerald-700 mt-1 block">
                S/ {totalPaidThisYear.toLocaleString('es-PE')}
              </span>
              <span className="text-[12.5px] text-slate-500">
                Abonos confirmados y descontados de tu deuda
              </span>
            </div>

            <button
              onClick={() => openRegisterPaymentModal()}
              className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[13px] transition-colors cursor-pointer"
            >
              + Registrar nuevo pago
            </button>
          </div>

          {payments.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 flex flex-col items-center gap-3">
              <span className="material-symbols-outlined text-[36px] text-slate-400">receipt</span>
              <h3 className="text-[16px] font-bold text-slate-800">No hay pagos registrados</h3>
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
                      <span className="text-[18px] font-black text-[#0F172A] block">
                        S/ {p.amount.toLocaleString('es-PE')}
                      </span>
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full inline-block mt-0.5 border border-emerald-200">
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
