import React, { useState } from 'react';
import { QuotaItem } from '../../types';
import { PIGGY_BANK_IMG_URL, ADVISOR_PHOTO_URL } from '../../data/initialData';

interface MisCuotasScreenProps {
  quotas: QuotaItem[];
  onPayQuota: (quota: QuotaItem) => void;
  onOpenNegotiation: (quota: QuotaItem) => void;
  onOpenReceipt: (quota: QuotaItem) => void;
  onOpenAdvisorChat: (context?: string) => void;
  onToggleReminder: (quotaId: string) => void;
  onDeleteQuota?: (quotaId: string) => void;
}

export const MisCuotasScreen: React.FC<MisCuotasScreenProps> = ({
  quotas,
  onPayQuota,
  onOpenNegotiation,
  onOpenReceipt,
  onOpenAdvisorChat,
  onToggleReminder,
  onDeleteQuota,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'pending' | 'overdue' | 'paid'>('all');
  const [quotaToDelete, setQuotaToDelete] = useState<QuotaItem | null>(null);
  const [toastMsg, setToastMsg] = useState('');
  const [showToast, setShowToast] = useState(false);

  // Filter calculations
  const paidCount = quotas.filter((q) => q.status === 'paid').length;
  const pendingCount = quotas.filter((q) => q.status === 'pending').length;
  const overdueCount = quotas.filter((q) => q.status === 'overdue').length;

  const filteredQuotas = quotas.filter((q) => {
    if (activeFilter === 'all') return true;
    return q.status === activeFilter;
  });

  const totalAmount = quotas.reduce((sum, q) => sum + q.amount, 0);
  const paidAmount = quotas.filter((q) => q.status === 'paid').reduce((sum, q) => sum + q.amount, 0);
  const nextAmount = quotas.filter((q) => q.status === 'pending').reduce((sum, q) => sum + q.amount, 0);
  const overdueAmount = quotas.filter((q) => q.status === 'overdue').reduce((sum, q) => sum + q.amount, 0);

  const completionPercent = totalAmount > 0 ? Math.round((paidAmount / totalAmount) * 100) : 33;

  return (
    <div className="flex flex-col w-full px-4 py-3 gap-4 max-w-md mx-auto pb-24">
      {/* Encabezado contextual con ilustración empática 3D */}
      <div className="bg-[#f2f3ff] rounded-2xl p-4 shadow-xs border border-[#eaedff] relative overflow-hidden">
        <div className="relative z-10 flex items-start justify-between gap-3">
          <div className="flex flex-col gap-1 min-w-0">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#dae2fd] text-[#0037b0] font-label-sm text-[11px] font-semibold w-fit">
              <span className="material-symbols-outlined text-[14px]">calendar_month</span>
              <span>Periodo Actual</span>
            </div>
            <h1 className="font-headline-md text-[22px] font-bold text-[#131b2e] tracking-tight">
              Mis Cuotas
            </h1>
            <p className="font-body-md text-[13px] text-[#434655]">
              Cronograma de pagos del mes de{' '}
              <span className="font-label-lg text-[13px] font-semibold text-[#131b2e]">
                Septiembre 2026
              </span>
            </p>
          </div>
          <div className="w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0 shadow-sm border border-white">
            <img
              className="w-full h-full object-cover"
              alt="Alcancía 3D y calendario"
              src={PIGGY_BANK_IMG_URL}
            />
          </div>
        </div>

        {/* Progreso del Mes */}
        <div className="mt-3.5 bg-white rounded-xl p-3 shadow-xs border border-[#eaedff] flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-[#131b2e] font-label-md text-[12px]">
            <span>Progreso de cumplimiento</span>
            <span className="text-[#0037b0] font-semibold">
              {paidCount} de {quotas.length} cuotas ({completionPercent}%)
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-[#e2e7ff] overflow-hidden">
            <div
              className="h-full bg-[#1d4ed8] rounded-full transition-all duration-500"
              style={{ width: `${completionPercent}%` }}
            ></div>
          </div>
          <div className="flex justify-between items-center text-[#434655] font-body-sm text-[11px]">
            <span>S/ {paidAmount} abonados</span>
            <span>Meta mensual: S/ {totalAmount}</span>
          </div>
        </div>
      </div>

      {/* Pestañas / Filtros de estado */}
      <div className="w-full overflow-x-auto no-scrollbar -mx-4 px-4 pt-0.5 pb-1">
        <div className="flex items-center gap-2 min-w-max">
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`px-3.5 py-1.5 rounded-full font-label-md text-[12px] shadow-xs transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 ${
              activeFilter === 'all'
                ? 'bg-[#0037b0] text-white font-semibold'
                : 'bg-[#eaedff] text-[#434655] hover:bg-[#e2e7ff]'
            }`}
          >
            <span>Todas</span>
            <span
              className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                activeFilter === 'all' ? 'bg-white/20 text-white' : 'bg-[#dae2fd] text-[#434655]'
              }`}
            >
              {quotas.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter('pending')}
            className={`px-3.5 py-1.5 rounded-full font-label-md text-[12px] shadow-xs transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 ${
              activeFilter === 'pending'
                ? 'bg-[#0037b0] text-white font-semibold'
                : 'bg-[#eaedff] text-[#434655] hover:bg-[#e2e7ff]'
            }`}
          >
            <span>Pendientes</span>
            <span
              className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                activeFilter === 'pending'
                  ? 'bg-white/20 text-white'
                  : 'bg-[#dae2fd] text-[#434655]'
              }`}
            >
              {pendingCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter('overdue')}
            className={`px-3.5 py-1.5 rounded-full font-label-md text-[12px] shadow-xs transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 ${
              activeFilter === 'overdue'
                ? 'bg-[#0037b0] text-white font-semibold'
                : 'bg-[#eaedff] text-[#434655] hover:bg-[#e2e7ff]'
            }`}
          >
            <span>Vencidas</span>
            <span className="px-1.5 py-0.5 bg-[#ffdad6] text-[#93000a] rounded-full text-[10px] font-bold">
              {overdueCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter('paid')}
            className={`px-3.5 py-1.5 rounded-full font-label-md text-[12px] shadow-xs transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 ${
              activeFilter === 'paid'
                ? 'bg-[#0037b0] text-white font-semibold'
                : 'bg-[#eaedff] text-[#434655] hover:bg-[#e2e7ff]'
            }`}
          >
            <span>Pagadas</span>
            <span
              className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                activeFilter === 'paid' ? 'bg-white/20 text-white' : 'bg-[#dae2fd] text-[#434655]'
              }`}
            >
              {paidCount}
            </span>
          </button>
        </div>
      </div>

      {/* Lista de Cuotas */}
      <div className="flex flex-col space-y-3.5">
        {filteredQuotas.length === 0 ? (
          <div className="bg-white rounded-2xl p-6 text-center border border-[#eaedff] flex flex-col items-center gap-2.5 shadow-xs">
            <div className="w-12 h-12 rounded-full bg-[#f2f3ff] text-[#0037b0] flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">event_busy</span>
            </div>
            <h3 className="font-headline-sm text-[15px] font-bold text-[#131b2e]">
              No hay cuotas en esta sección
            </h3>
            <p className="font-body-sm text-[12px] text-[#434655] max-w-xs">
              {activeFilter === 'all'
                ? 'No tienes cuotas registradas en tu calendario de pagos.'
                : `No se encontraron cuotas con estado "${activeFilter}".`}
            </p>
          </div>
        ) : (
          filteredQuotas.map((quota) => {
            if (quota.status === 'paid') {
              return (
                /* Cuota Verde - Pagada */
                <article
                  key={quota.id}
                  className="bg-white rounded-2xl p-4 shadow-xs border border-[#eaedff] relative overflow-hidden flex flex-col space-y-2.5"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#16a34a]"></div>
                  <div className="flex items-center justify-between gap-2 pl-1.5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#dcfce7] text-[#15803d] font-label-sm text-[11px] font-semibold">
                      <span className="w-2 h-2 rounded-full bg-[#16a34a] animate-pulse"></span>
                      <span>Pagada</span>
                    </span>
                    <div className="flex items-center gap-1">
                      <div className="w-7 h-7 rounded-full bg-[#dcfce7] flex items-center justify-center text-[#15803d]">
                        <span
                          className="material-symbols-outlined text-[18px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          check_circle
                        </span>
                      </div>
                      {onDeleteQuota && (
                        <button
                          type="button"
                          onClick={() => setQuotaToDelete(quota)}
                          title="Eliminar cuota"
                          aria-label={`Eliminar cuota ${quota.quotaNumber} de ${quota.entity}`}
                          className="w-7 h-7 rounded-full flex items-center justify-center text-[#747686] hover:text-[#ba1a1a] hover:bg-[#ffdad6]/40 transition-colors cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[17px]">delete</span>
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="pl-1.5 flex flex-col">
                    <span className="font-body-sm text-[12px] text-[#434655]">
                      {quota.entity} • {quota.quotaNumber}
                    </span>
                    <div className="flex items-baseline justify-between mt-1">
                      <span className="font-amount-card text-[22px] font-bold text-[#131b2e] tracking-tight">
                        S/ {quota.amount}
                      </span>
                      <span className="font-label-md text-[12px] font-semibold text-[#15803d] flex items-center gap-1">
                        <span className="material-symbols-outlined text-[15px]">event_available</span>
                        {quota.dueDate}
                      </span>
                    </div>
                  </div>

                  <div className="pl-1.5 bg-[#f2f3ff] rounded-xl p-2.5 flex items-center justify-between text-[#434655] border border-[#eaedff]">
                    <span className="font-body-sm text-[11px] flex items-center gap-1 text-[#131b2e]">
                      <span className="material-symbols-outlined text-[15px] text-[#16a34a]">
                        verified
                      </span>
                      Operación N° {quota.operationNumber || '849204'}
                    </span>
                    <button
                      onClick={() => onOpenReceipt(quota)}
                      type="button"
                      className="font-label-sm text-[11px] font-semibold text-[#0037b0] hover:underline flex items-center cursor-pointer"
                    >
                      <span>Constancia</span>
                      <span className="material-symbols-outlined text-[15px]">chevron_right</span>
                    </button>
                  </div>
                </article>
              );
            }

            if (quota.status === 'overdue') {
              return (
                /* Cuota Roja - Vencida */
                <article
                  key={quota.id}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-[#eaedff] relative overflow-hidden flex flex-col space-y-2.5"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#dc2626]"></div>
                  <div className="flex items-center justify-between gap-2 pl-1.5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fee2e2] text-[#b91c1c] font-label-sm text-[11px] font-bold">
                      <span className="w-2 h-2 rounded-full bg-[#dc2626]"></span>
                      <span>Vencida</span>
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="font-label-sm text-[11px] text-[#b91c1c] bg-[#fee2e2] px-2 py-0.5 rounded-md font-semibold">
                        Atraso de {quota.daysLate || 10} días
                      </span>
                      {onDeleteQuota && (
                        <button
                          type="button"
                          onClick={() => setQuotaToDelete(quota)}
                          title="Eliminar cuota"
                          aria-label={`Eliminar cuota vencida ${quota.quotaNumber} de ${quota.entity}`}
                          className="w-7 h-7 rounded-full flex items-center justify-center text-[#747686] hover:text-[#ba1a1a] hover:bg-[#ffdad6]/40 transition-colors cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[17px]">delete</span>
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="pl-1.5 flex flex-col">
                    <span className="font-body-sm text-[12px] text-[#434655]">
                      {quota.entity} • {quota.quotaNumber}
                    </span>
                    <div className="flex items-baseline justify-between mt-1">
                      <span className="font-amount-card text-[22px] font-bold text-[#131b2e] tracking-tight">
                        S/ {quota.amount}
                      </span>
                      <span className="font-label-md text-[12px] font-semibold text-[#b91c1c] flex items-center gap-1">
                        <span className="material-symbols-outlined text-[15px]">event_busy</span>
                        {quota.dueDate}
                      </span>
                    </div>
                  </div>

                  {/* Alerta empática con enlace de resolución inmediata */}
                  <div className="pl-1.5 bg-[#ffdad6]/40 rounded-xl p-3 flex flex-col gap-2 border border-[#ffdad6]">
                    <div className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-[#ba1a1a] text-[18px] mt-0.5 flex-shrink-0">
                        warning
                      </span>
                      <p className="font-body-sm text-[12px] text-[#131b2e] leading-snug">
                        ¿Dificultades para abonar? Revisa opciones de refinanciamiento en{' '}
                        <button
                          onClick={() => onOpenAdvisorChat('Tengo una cuota vencida y necesito opciones')}
                          className="font-label-md font-semibold text-[#ba1a1a] underline cursor-pointer"
                        >
                          Asesoramiento
                        </button>
                        .
                      </p>
                    </div>
                    <div className="flex items-center justify-end gap-2 pt-1">
                      <button
                        onClick={() => onOpenNegotiation(quota)}
                        type="button"
                        className="px-3.5 py-1.5 rounded-lg bg-white text-[#131b2e] font-label-sm text-[12px] font-semibold hover:bg-[#eaedff] transition-colors shadow-xs border border-[#eaedff] cursor-pointer"
                      >
                        Negociar
                      </button>
                      <button
                        onClick={() => onPayQuota(quota)}
                        type="button"
                        className="px-4 py-1.5 rounded-lg bg-[#0037b0] text-white font-label-sm text-[12px] font-semibold shadow-xs hover:bg-[#002f99] transition-colors flex items-center gap-1 cursor-pointer active:scale-95"
                      >
                        <span className="material-symbols-outlined text-[16px]">payments</span>
                        <span>Pagar ahora</span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            }

            // Cuota Amarilla - Próxima
            return (
              <article
                key={quota.id}
                className="bg-white rounded-2xl p-4 shadow-xs border border-[#eaedff] relative overflow-hidden flex flex-col space-y-2.5"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#d97706]"></div>
                <div className="flex items-center justify-between gap-2 pl-1.5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fef3c7] text-[#b45309] font-label-sm text-[11px] font-semibold">
                    <span className="w-2 h-2 rounded-full bg-[#d97706]"></span>
                    <span>Próxima</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-body-sm text-[11px] text-[#434655] flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px] text-[#d97706]">
                        hourglass_top
                      </span>
                      En {quota.daysRemaining || 5} días
                    </span>
                    {onDeleteQuota && (
                      <button
                        type="button"
                        onClick={() => setQuotaToDelete(quota)}
                        title="Eliminar cuota"
                        aria-label={`Eliminar cuota ${quota.quotaNumber} de ${quota.entity}`}
                        className="w-7 h-7 rounded-full flex items-center justify-center text-[#747686] hover:text-[#ba1a1a] hover:bg-[#ffdad6]/40 transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[17px]">delete</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="pl-1.5 flex flex-col">
                  <span className="font-body-sm text-[12px] text-[#434655]">
                    {quota.entity} • {quota.quotaNumber}
                  </span>
                  <div className="flex items-baseline justify-between mt-1">
                    <span className="font-amount-card text-[22px] font-bold text-[#131b2e] tracking-tight">
                      S/ {quota.amount}
                    </span>
                    <span className="font-label-md text-[12px] font-semibold text-[#b45309] flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px]">calendar_today</span>
                      {quota.dueDate}
                    </span>
                  </div>
                </div>

                <div className="pl-1.5 pt-1 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => onToggleReminder(quota.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-label-sm text-[11px] transition-colors border border-[#eaedff] cursor-pointer ${
                      quota.hasReminder
                        ? 'bg-[#dcfce7] text-[#15803d] font-semibold'
                        : 'bg-[#f2f3ff] text-[#131b2e] hover:bg-[#eaedff]'
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined text-[16px] ${
                        quota.hasReminder ? 'text-[#16a34a]' : 'text-[#d97706]'
                      }`}
                    >
                      {quota.hasReminder ? 'check_circle' : 'notifications_active'}
                    </span>
                    <span>{quota.hasReminder ? 'Recordatorio activo' : 'Ver recordatorio'}</span>
                  </button>

                  <button
                    onClick={() => onPayQuota(quota)}
                    type="button"
                    className="px-3.5 py-1.5 rounded-xl bg-[#316bf3] text-white font-label-md text-[12px] font-semibold shadow-xs hover:bg-[#0051d5] transition-colors flex items-center gap-1 active:scale-95 cursor-pointer"
                  >
                    <span>Adelantar cuota</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
              </article>
            );
          })
        )}
      </div>

      {/* Resumen mensual destacado / Tarjeta inferior */}
      <div className="bg-[#dae2fd]/60 rounded-2xl p-4 shadow-xs border border-[#eaedff] flex flex-col space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#0037b0] flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-md text-[13px] font-semibold text-[#131b2e]">
                Total Cuotas Septiembre
              </span>
              <span className="font-body-sm text-[11px] text-[#434655]">
                {quotas.length} compromisos registrados
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="font-amount-card text-[22px] font-bold text-[#131b2e]">
              S/ {totalAmount}
            </span>
          </div>
        </div>

        {/* Desglose inline simplificado */}
        <div className="grid grid-cols-3 gap-2 pt-1">
          <div className="bg-white rounded-xl p-2 text-center flex flex-col shadow-2xs border border-[#eaedff]">
            <span className="font-body-sm text-[11px] text-[#434655]">Pagado</span>
            <span className="font-label-md text-[13px] font-bold text-[#15803d]">
              S/ {paidAmount}
            </span>
          </div>
          <div className="bg-white rounded-xl p-2 text-center flex flex-col shadow-2xs border border-[#eaedff]">
            <span className="font-body-sm text-[11px] text-[#434655]">Próximo</span>
            <span className="font-label-md text-[13px] font-bold text-[#b45309]">
              S/ {nextAmount}
            </span>
          </div>
          <div className="bg-white rounded-xl p-2 text-center flex flex-col shadow-2xs border border-[#eaedff]">
            <span className="font-body-sm text-[11px] text-[#434655]">Vencido</span>
            <span className="font-label-md text-[13px] font-bold text-[#b91c1c]">
              S/ {overdueAmount}
            </span>
          </div>
        </div>

        {/* Tip empático amigable */}
        <div className="flex items-center gap-2 pt-1 text-[#434655] font-body-sm text-[12px]">
          <span className="material-symbols-outlined text-[#0037b0] text-[18px]">lightbulb</span>
          <span>Pagar a tiempo mejora tu calificación crediticia en el sistema financiero.</span>
        </div>
      </div>

      {/* Tarjeta de contacto con Asesora Especialista */}
      <div
        onClick={() => onOpenAdvisorChat('Quiero reprogramar mis cuotas pendientes')}
        className="bg-[#f2f3ff] rounded-2xl p-4 flex items-center gap-3.5 border border-[#eaedff] shadow-xs cursor-pointer hover:bg-[#eaedff] transition-all"
      >
        <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 shadow-xs border border-white">
          <img
            className="w-full h-full object-cover"
            alt="Asesora de cobranza fácil"
            src={ADVISOR_PHOTO_URL}
          />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="font-label-md text-[13px] font-bold text-[#131b2e]">
            ¿Necesitas reprogramar tus pagos?
          </span>
          <p className="font-body-sm text-[12px] text-[#434655] line-clamp-2 mt-0.5">
            Nuestros asesores te ayudan sin cargos adicionales a ordenar tus cuotas pendientes.
          </p>
        </div>
      </div>

      {/* Delete Quota Confirmation Modal */}
      {quotaToDelete && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-5 shadow-2xl border border-[#eaedff] animate-in fade-in zoom-in duration-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[22px]">delete_forever</span>
              </div>
              <div>
                <h3 className="font-headline-sm text-[16px] font-bold text-[#131b2e]">
                  ¿Eliminar cuota?
                </h3>
                <span className="font-body-sm text-[11px] text-[#747686]">
                  Se retirará de tu cronograma
                </span>
              </div>
            </div>

            <p className="font-body-sm text-[13px] text-[#434655] leading-relaxed mb-4">
              ¿Deseas retirar la cuota <strong className="text-[#131b2e]">{quotaToDelete.quotaNumber}</strong> de{' '}
              <strong className="text-[#131b2e]">{quotaToDelete.entity}</strong> por{' '}
              <strong className="text-[#0037b0]">S/ {quotaToDelete.amount}</strong>?
            </p>

            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  const quotaInfo = `${quotaToDelete.entity} (${quotaToDelete.quotaNumber})`;
                  if (onDeleteQuota) {
                    onDeleteQuota(quotaToDelete.id);
                  }
                  setQuotaToDelete(null);
                  setToastMsg(`Cuota de ${quotaInfo} eliminada.`);
                  setShowToast(true);
                  setTimeout(() => setShowToast(false), 3200);
                }}
                className="w-full py-2.5 rounded-xl bg-[#ba1a1a] hover:bg-[#93000a] text-white font-label-md text-[13px] font-semibold transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer active:scale-98"
              >
                <span className="material-symbols-outlined text-[18px]">delete</span>
                <span>Sí, eliminar cuota</span>
              </button>
              <button
                type="button"
                onClick={() => setQuotaToDelete(null)}
                className="w-full py-2 rounded-xl text-[#747686] hover:text-[#131b2e] font-label-sm text-[12px] cursor-pointer"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      {showToast && (
        <div className="fixed bottom-20 left-4 right-4 z-50 max-w-sm mx-auto bg-[#283044] text-white px-4 py-3 rounded-xl shadow-xl flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="material-symbols-outlined text-[#ffdad6] text-[20px]">check_circle</span>
            <span className="font-body-sm text-[12px]">{toastMsg}</span>
          </div>
          <button
            aria-label="Cerrar aviso"
            onClick={() => setShowToast(false)}
            className="text-[#cad3ff] hover:text-white p-1"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}
    </div>
  );
};
