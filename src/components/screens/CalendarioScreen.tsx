import React, { useState } from 'react';
import { QuotaItem } from '../../types';

interface CalendarioScreenProps {
  quotas: QuotaItem[];
  onPayQuota: (quota: QuotaItem) => void;
  onToggleReminder: (quotaId: string) => void;
  onDeleteQuota: (quotaId: string) => void;
}

export const CalendarioScreen: React.FC<CalendarioScreenProps> = ({
  quotas,
  onPayQuota,
  onToggleReminder,
  onDeleteQuota,
}) => {
  const [selectedDay, setSelectedDay] = useState<number>(30); // Default to Sept 30
  const [currentMonthName] = useState<string>('Septiembre 2026');

  const totalDaysInMonth = 30;
  const startDayOfWeek = 2; // 0=Sun, 1=Mon, 2=Tue...

  // Map quotas to days
  const quotasByDay: { [key: number]: QuotaItem[] } = {};
  quotas.forEach((q) => {
    const day = q.dueDateDay || parseInt(q.dueDate.match(/\d+/)?.[0] || '1');
    if (!quotasByDay[day]) {
      quotasByDay[day] = [];
    }
    quotasByDay[day].push(q);
  });

  const selectedDayQuotas = quotasByDay[selectedDay] || [];

  // Summary counts
  const paidCount = quotas.filter((q) => q.status === 'paid').length;
  const pendingCount = quotas.filter((q) => q.status === 'pending').length;
  const overdueCount = quotas.filter((q) => q.status === 'overdue').length;

  return (
    <div className="flex flex-col w-full px-4 py-3 gap-4 max-w-lg mx-auto pb-28">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline-lg text-[24px] font-bold text-[#131b2e] tracking-tight">
            Calendario de Pagos
          </h1>
          <p className="font-body-sm text-[12px] text-[#434655]">
            Organiza tus fechas de vencimiento y cuotas del mes
          </p>
        </div>
        <div className="px-3 py-1.5 rounded-2xl bg-white border border-[#eaedff] text-[13px] font-bold text-[#0037b0] shadow-xs">
          {currentMonthName}
        </div>
      </div>

      {/* Color Legend required: verde = pagado, amarillo = próximo, rojo = atrasado */}
      <div className="flex items-center justify-around bg-white p-3 rounded-2xl border border-[#eaedff] shadow-xs text-[11px] font-bold">
        <div className="flex items-center gap-1.5 text-emerald-700">
          <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
          <span>🟢 Pagado ({paidCount})</span>
        </div>
        <div className="flex items-center gap-1.5 text-amber-700">
          <span className="w-3 h-3 rounded-full bg-amber-500"></span>
          <span>🟡 Próximo ({pendingCount})</span>
        </div>
        <div className="flex items-center gap-1.5 text-rose-700">
          <span className="w-3 h-3 rounded-full bg-rose-500"></span>
          <span>🔴 Atrasado ({overdueCount})</span>
        </div>
      </div>

      {/* Monthly Calendar Grid */}
      <div className="bg-white p-4 rounded-3xl border border-[#eaedff] shadow-xs flex flex-col gap-3">
        {/* Days Header */}
        <div className="grid grid-cols-7 text-center font-label-sm text-[11px] font-bold text-[#747686]">
          <span>Dom</span>
          <span>Lun</span>
          <span>Mar</span>
          <span>Mié</span>
          <span>Jue</span>
          <span>Vie</span>
          <span>Sáb</span>
        </div>

        {/* Days Matrix */}
        <div className="grid grid-cols-7 gap-1.5">
          {/* Empty prefix slots */}
          {Array.from({ length: startDayOfWeek }).map((_, i) => (
            <div key={`empty-${i}`} className="h-11"></div>
          ))}

          {/* Month days */}
          {Array.from({ length: totalDaysInMonth }).map((_, i) => {
            const dayNum = i + 1;
            const dayQuotas = quotasByDay[dayNum] || [];
            const isSelected = selectedDay === dayNum;
            const hasPaid = dayQuotas.some((q) => q.status === 'paid');
            const hasOverdue = dayQuotas.some((q) => q.status === 'overdue');
            const hasPending = dayQuotas.some((q) => q.status === 'pending');

            return (
              <button
                type="button"
                key={dayNum}
                onClick={() => setSelectedDay(dayNum)}
                className={`h-11 rounded-2xl relative flex flex-col items-center justify-center transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#0037b0] text-white font-bold shadow-md scale-105 z-10'
                    : 'bg-[#faf8ff] text-[#131b2e] hover:bg-[#eaedff]'
                }`}
              >
                <span className="text-[12px]">{dayNum}</span>

                {/* Status Dot indicators */}
                {dayQuotas.length > 0 && (
                  <div className="flex items-center gap-0.5 mt-0.5">
                    {hasPaid && (
                      <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-emerald-300' : 'bg-emerald-500'}`}></span>
                    )}
                    {hasPending && (
                      <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-amber-300' : 'bg-amber-500'}`}></span>
                    )}
                    {hasOverdue && (
                      <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-rose-300' : 'bg-rose-500 animate-pulse'}`}></span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Date Details Panel */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="font-headline-sm text-[16px] font-bold text-[#131b2e]">
            Compromisos del día {selectedDay} de Septiembre
          </h2>
          <span className="text-[11px] text-[#747686]">
            {selectedDayQuotas.length} {selectedDayQuotas.length === 1 ? 'cuota' : 'cuotas'}
          </span>
        </div>

        {selectedDayQuotas.length === 0 ? (
          <div className="p-6 rounded-3xl bg-white border border-[#eaedff] text-center flex flex-col items-center gap-2">
            <span className="material-symbols-outlined text-[36px] text-[#747686]">event_available</span>
            <p className="font-label-md text-[13px] font-semibold text-[#131b2e]">
              No tienes cuotas programadas para este día
            </p>
            <p className="text-[11px] text-[#747686]">
              Selecciona los días con puntos de color (5, 10, 15, 30) para ver y pagar tus cuotas.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2.5">
            {selectedDayQuotas.map((quota) => {
              const isPaid = quota.status === 'paid';
              const isOverdue = quota.status === 'overdue';

              return (
                <div
                  key={quota.id}
                  className={`rounded-3xl p-4 sm:p-5 border transition-all flex flex-col gap-3 ${
                    isPaid
                      ? 'bg-emerald-50/40 border-emerald-200'
                      : isOverdue
                      ? 'bg-rose-50/40 border-rose-200'
                      : 'bg-white border-[#eaedff] shadow-xs'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#0037b0] block">
                        {quota.debtType || 'Crédito'}
                      </span>
                      <h3 className="font-headline-sm text-[16px] font-bold text-[#131b2e]">
                        {quota.entity}
                      </h3>
                      <span className="text-[12px] text-[#747686]">{quota.quotaNumber}</span>
                    </div>

                    {/* Status badge */}
                    <div>
                      {isPaid && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                          Pagado
                        </span>
                      )}
                      {quota.status === 'pending' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold">
                          <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                          Próximo
                        </span>
                      )}
                      {isOverdue && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 text-[11px] font-bold">
                          <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                          Atrasado ({quota.daysLate || 14} días)
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Amount and Expiry */}
                  <div className="flex items-center justify-between bg-white/80 p-3 rounded-2xl border border-[#eaedff]">
                    <div>
                      <span className="text-[10px] text-[#747686] block">Monto de la cuota</span>
                      <span className="font-headline-sm text-[18px] font-extrabold text-[#131b2e]">
                        S/ {quota.amount.toLocaleString()}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-[#747686] block">Fecha límite</span>
                      <span className="font-label-md text-[13px] font-bold text-[#0037b0]">
                        {quota.dueDate}
                      </span>
                    </div>
                  </div>

                  {/* Action row: [Marcar como pagado] */}
                  <div className="flex items-center gap-2 pt-1">
                    {!isPaid ? (
                      <button
                        type="button"
                        onClick={() => onPayQuota(quota)}
                        className="flex-1 py-2.5 rounded-xl bg-emerald-600 text-white font-label-md text-[13px] font-bold hover:bg-emerald-700 active:scale-95 transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[18px]">check_circle</span>
                        <span>Marcar como pagado</span>
                      </button>
                    ) : (
                      <div className="flex-1 py-2 rounded-xl bg-emerald-100/80 text-emerald-800 text-[12px] font-bold text-center flex items-center justify-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">verified</span>
                        <span>Pagado ({quota.operationNumber || 'OP-782910'})</span>
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => onToggleReminder(quota.id)}
                      className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                        quota.hasReminder
                          ? 'bg-amber-100 text-amber-700 border-amber-300'
                          : 'bg-white text-[#747686] border-[#eaedff] hover:text-[#131b2e]'
                      }`}
                      title={quota.hasReminder ? 'Recordatorio activo' : 'Activar recordatorio'}
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {quota.hasReminder ? 'notifications_active' : 'notification_add'}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onDeleteQuota(quota.id)}
                      className="p-2.5 rounded-xl bg-white text-[#747686] hover:text-rose-600 border border-[#eaedff] transition-colors cursor-pointer"
                      title="Eliminar cuota"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Full Month Quota List Summary */}
      <div className="flex flex-col gap-2 pt-2">
        <h2 className="font-headline-sm text-[16px] font-bold text-[#131b2e]">
          Todas las cuotas de Septiembre
        </h2>
        <div className="flex flex-col gap-2">
          {quotas.map((q) => (
            <div
              key={`list-${q.id}`}
              onClick={() => setSelectedDay(q.dueDateDay || 30)}
              className="p-3 rounded-2xl bg-white border border-[#eaedff] flex items-center justify-between hover:border-[#0037b0]/30 cursor-pointer transition-all"
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-3 h-3 rounded-full ${
                    q.status === 'paid'
                      ? 'bg-emerald-500'
                      : q.status === 'overdue'
                      ? 'bg-rose-500'
                      : 'bg-amber-500'
                  }`}
                ></div>
                <div>
                  <span className="font-label-md text-[13px] font-bold text-[#131b2e] block">
                    {q.entity}
                  </span>
                  <span className="text-[11px] text-[#747686]">
                    {q.quotaNumber} • Vence el {q.dueDate}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="font-headline-sm text-[14px] font-extrabold text-[#131b2e] block">
                  S/ {q.amount.toLocaleString()}
                </span>
                <span
                  className={`text-[10px] font-bold ${
                    q.status === 'paid'
                      ? 'text-emerald-700'
                      : q.status === 'overdue'
                      ? 'text-rose-700'
                      : 'text-amber-700'
                  }`}
                >
                  {q.statusLabel}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
