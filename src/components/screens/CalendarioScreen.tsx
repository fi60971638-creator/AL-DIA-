import React, { useState } from 'react';
import { QuotaItem } from '../../types';

interface CalendarioScreenProps {
  quotas: QuotaItem[];
  onPayQuota: (quota: QuotaItem) => void;
  onToggleReminder: (quotaId: string) => void;
  onDeleteQuota?: (quotaId: string) => void;
}

export const CalendarioScreen: React.FC<CalendarioScreenProps> = ({
  quotas,
  onPayQuota,
}) => {
  const [viewMode, setViewMode] = useState<'lista' | 'mes'>('lista');

  const pendingQuotas = quotas.filter((q) => q.status !== 'paid');
  const paidQuotas = quotas.filter((q) => q.status === 'paid');

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto px-4 sm:px-6 py-5 gap-6 pb-24 md:pb-12">
      {/* Top Header & View Toggle */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[24px] sm:text-[26px] font-bold text-[#0F3D56] tracking-tight">
            Calendario de pagos
          </h1>
          <p className="text-[13px] text-[#6B7280]">
            Octubre 2026 • Cronograma de cuotas
          </p>
        </div>

        <div className="flex bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg p-0.5">
          <button
            type="button"
            onClick={() => setViewMode('lista')}
            className={`px-3 py-1 rounded-md text-[13px] font-medium transition-colors cursor-pointer ${
              viewMode === 'lista'
                ? 'bg-[#0F3D56] text-white'
                : 'text-[#6B7280] hover:text-[#25313C]'
            }`}
          >
            Lista
          </button>
          <button
            type="button"
            onClick={() => setViewMode('mes')}
            className={`px-3 py-1 rounded-md text-[13px] font-medium transition-colors cursor-pointer ${
              viewMode === 'mes'
                ? 'bg-[#0F3D56] text-white'
                : 'text-[#6B7280] hover:text-[#25313C]'
            }`}
          >
            Mes
          </button>
        </div>
      </div>

      {/* Month Simple Grid View */}
      {viewMode === 'mes' && (
        <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl p-5 flex flex-col gap-3">
          <div className="flex items-center justify-between font-semibold text-[15px] text-[#0F3D56] pb-2 border-b border-[#E5E7EB]">
            <span>Octubre 2026</span>
            <span className="text-[12px] text-[#6B7280]">3 pagos programados</span>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-[12px] font-semibold text-[#6B7280] pt-1">
            <span>D</span>
            <span>L</span>
            <span>M</span>
            <span>M</span>
            <span>J</span>
            <span>V</span>
            <span>S</span>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-[13px]">
            {/* Days placeholder for month view */}
            {Array.from({ length: 31 }).map((_, idx) => {
              const day = idx + 1;
              const matchedQuota = quotas.find((q) => q.dueDateDay === day);
              const isOverdue = matchedQuota?.status === 'overdue';
              const isPaid = matchedQuota?.status === 'paid';

              return (
                <div
                  key={day}
                  className={`h-9 rounded-lg flex flex-col items-center justify-center relative ${
                    matchedQuota
                      ? isPaid
                        ? 'bg-blue-50 text-[#2563EB] font-bold'
                        : isOverdue
                        ? 'bg-rose-50 text-[#D64545] font-bold'
                        : 'bg-amber-50 text-[#D99A24] font-bold'
                      : 'text-[#25313C] hover:bg-[#F7F8FA]'
                  }`}
                >
                  <span>{day}</span>
                  {matchedQuota && (
                    <span
                      className={`w-1 h-1 rounded-full ${
                        isPaid
                          ? 'bg-[#2563EB]'
                          : isOverdue
                          ? 'bg-[#D64545]'
                          : 'bg-[#D99A24]'
                      }`}
                    ></span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* List View */}
      <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl p-5 flex flex-col gap-4">
        <h3 className="text-[15px] font-bold text-[#0F3D56] pb-2 border-b border-[#E5E7EB]">
          Próximos vencimientos
        </h3>

        {pendingQuotas.length === 0 ? (
          <div className="py-6 text-center text-[#6B7280] text-[13px]">
            No tienes pagos pendientes programados en este momento.
          </div>
        ) : (
          <div className="divide-y divide-[#E5E7EB]">
            {pendingQuotas.map((q) => {
              const isOverdue = q.status === 'overdue';

              return (
                <div key={q.id} className="py-3.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {/* Date Block */}
                    <div className="w-12 h-12 rounded-lg bg-[#F7F8FA] border border-[#E5E7EB] flex flex-col items-center justify-center shrink-0">
                      <span className="text-[14px] font-bold text-[#25313C] leading-none">
                        {q.dueDateDay || 10}
                      </span>
                      <span className="text-[10px] uppercase text-[#6B7280] font-semibold mt-0.5">
                        OCT
                      </span>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-[15px] font-bold text-[#25313C]">
                        {q.entity}
                      </span>
                      <div className="flex items-center gap-2 text-[12px]">
                        <span
                          className={`font-medium ${
                            isOverdue ? 'text-[#D64545]' : 'text-[#D99A24]'
                          }`}
                        >
                          {isOverdue ? 'Vencido' : 'Próximo a vencer'}
                        </span>
                        {q.daysRemaining !== undefined && !isOverdue && (
                          <span className="text-[#6B7280]">• en {q.daysRemaining} días</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-[15px] font-bold text-[#25313C]">
                      S/ {q.amount.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
                    </span>

                    <button
                      type="button"
                      onClick={() => onPayQuota(q)}
                      className="px-3 py-1.5 rounded-lg bg-[#149B8A] hover:bg-[#107d6f] text-white text-[13px] font-medium transition-colors cursor-pointer"
                    >
                      Pagar
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Pagos Realizados */}
      {paidQuotas.length > 0 && (
        <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl p-5 flex flex-col gap-3">
          <h3 className="text-[14px] font-bold text-[#6B7280]">
            Pagos ya realizados
          </h3>
          <div className="divide-y divide-[#E5E7EB] text-[13px]">
            {paidQuotas.map((pq) => (
              <div key={pq.id} className="py-2.5 flex items-center justify-between text-[#6B7280]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-[#2563EB]">
                    check
                  </span>
                  <span>{pq.entity}</span>
                </div>
                <span className="font-medium text-[#25313C]">
                  S/ {pq.amount.toLocaleString('es-PE', { minimumFractionDigits: 2 })} (Pagado)
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
