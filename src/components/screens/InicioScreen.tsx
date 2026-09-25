import React from 'react';
import { TabType, DebtItem, QuotaItem, UserProfile } from '../../types';

interface InicioScreenProps {
  user: UserProfile;
  debts: DebtItem[];
  quotas: QuotaItem[];
  onNavigate: (tab: TabType) => void;
  onPayQuota: (quota: QuotaItem) => void;
  onViewDebtDetail: (debt: DebtItem) => void;
  onOpenAdvisorChat: (initialMsg?: string) => void;
  onOpenReminders: () => void;
  onOpenActionGuide: (topicId: string) => void;
}

export const InicioScreen: React.FC<InicioScreenProps> = ({
  user,
  debts,
  quotas,
  onNavigate,
  onPayQuota,
  onViewDebtDetail,
  onOpenAdvisorChat,
  onOpenReminders,
  onOpenActionGuide,
}) => {
  // Calculations
  const totalBalance = debts.reduce((sum, d) => sum + d.balance, 0);
  const debtsCount = debts.length;

  const alDiaCount = debts.filter((d) => d.status === 'al_dia').length;
  const proximoCount = debts.filter((d) => d.status === 'proximo').length;
  const atrasadoCount = debts.filter((d) => d.status === 'atrasado').length;

  // Primary upcoming quota & debt
  const upcomingQuota = quotas.find((q) => q.status === 'pending') || quotas[0];
  const upcomingDebt = debts.find((d) => d.status === 'proximo') || debts[0];

  const totalPaid = debts.reduce((sum, d) => sum + (d.paidAmount || 0), 0);
  const totalOriginal = debts.reduce((sum, d) => sum + (d.initialAmount || d.balance), 0);
  const progressPercent = totalOriginal > 0 ? Math.min(100, Math.round((totalPaid / totalOriginal) * 100)) : 0;

  return (
    <div className="flex flex-col w-full px-4 py-3 gap-5 max-w-lg mx-auto pb-28">
      {/* 1. Saludo Header */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <h1 className="font-headline-lg text-[26px] font-bold text-[#131b2e] tracking-tight">
              Hola {user.name ? user.name.split(' ')[0] : ''}
            </h1>
            <span className="text-[24px] animate-bounce select-none">👋</span>
          </div>
          <p className="font-body-md text-[14px] font-medium text-[#434655]">
            Revisa tu situación financiera.
          </p>
        </div>

        <button
          onClick={onOpenReminders}
          title="Configurar recordatorios"
          className="relative w-11 h-11 rounded-2xl bg-white border border-[#eaedff] flex items-center justify-center text-[#0037b0] shadow-xs hover:bg-[#f2f5ff] transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[24px]">notifications_active</span>
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-amber-500 ring-2 ring-white"></span>
        </button>
      </div>

      {/* 2. Cuatro Tarjetas KPI Principales */}
      <div className="grid grid-cols-2 gap-2.5">
        {/* Total pendiente */}
        <div className="p-4 rounded-2xl bg-white border border-[#eaedff] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#747686]">
            <span className="font-label-sm text-[11px] font-semibold uppercase tracking-wider">
              Total pendiente
            </span>
            <span className="material-symbols-outlined text-[18px] text-[#0037b0]">account_balance_wallet</span>
          </div>
          <div className="mt-2">
            <span className="text-[13px] font-bold text-[#0037b0] mr-1">S/</span>
            <span className="font-headline-lg text-[22px] font-extrabold text-[#131b2e]">
              {totalBalance.toLocaleString()}
            </span>
          </div>
          <span className="font-body-sm text-[10px] text-[#747686] mt-0.5">En todas tus deudas</span>
        </div>

        {/* Próximo pago */}
        <div className="p-4 rounded-2xl bg-white border border-[#eaedff] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#747686]">
            <span className="font-label-sm text-[11px] font-semibold uppercase tracking-wider">
              Próximo pago
            </span>
            <span className="material-symbols-outlined text-[18px] text-amber-600">payments</span>
          </div>
          <div className="mt-2">
            <span className="text-[13px] font-bold text-amber-600 mr-1">S/</span>
            <span className="font-headline-lg text-[22px] font-extrabold text-[#131b2e]">
              {upcomingQuota ? upcomingQuota.amount.toLocaleString() : '350'}
            </span>
          </div>
          <span className="font-body-sm text-[10px] text-[#747686] mt-0.5 truncate">
            {upcomingQuota?.entity || 'Banco Principal'}
          </span>
        </div>

        {/* Próximo vencimiento */}
        <div className="p-4 rounded-2xl bg-white border border-[#eaedff] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#747686]">
            <span className="font-label-sm text-[11px] font-semibold uppercase tracking-wider">
              Próximo vencimiento
            </span>
            <span className="material-symbols-outlined text-[18px] text-blue-600">calendar_today</span>
          </div>
          <div className="mt-2">
            <span className="font-headline-sm text-[16px] font-bold text-[#131b2e] leading-snug truncate">
              {upcomingDebt ? upcomingDebt.dueDate : '30 de septiembre'}
            </span>
          </div>
          <span className="font-body-sm text-[10px] text-amber-700 font-semibold mt-0.5">
            Vence en {upcomingQuota?.daysRemaining || 5} días
          </span>
        </div>

        {/* Deudas registradas */}
        <div className="p-4 rounded-2xl bg-white border border-[#eaedff] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#747686]">
            <span className="font-label-sm text-[11px] font-semibold uppercase tracking-wider">
              Deudas
            </span>
            <span className="material-symbols-outlined text-[18px] text-indigo-600">receipt_long</span>
          </div>
          <div className="mt-2">
            <span className="font-headline-lg text-[22px] font-extrabold text-[#131b2e]">
              {debtsCount}
            </span>
            <span className="font-label-md text-[13px] font-semibold text-[#434655] ml-1">registradas</span>
          </div>
          <button
            onClick={() => onNavigate('mis-deudas')}
            className="font-body-sm text-[10px] text-[#0037b0] font-bold hover:underline text-left mt-0.5 cursor-pointer"
          >
            Ver listado completo →
          </button>
        </div>
      </div>

      {/* 3. Semáforo de Estado */}
      <div className="rounded-2xl bg-white p-3.5 border border-[#eaedff] shadow-xs flex items-center justify-between">
        <span className="font-label-sm text-[12px] font-bold text-[#131b2e]">Semáforo:</span>
        <div className="flex items-center gap-1.5">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            {alDiaCount} al día
          </span>

          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-[11px] font-bold">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            {proximoCount} próxima
          </span>

          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-50 text-rose-800 border border-rose-200 text-[11px] font-bold">
            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
            {atrasadoCount} atrasada
          </span>
        </div>
      </div>

      {/* 4. Tarjeta Próximo Pago Destacado */}
      <div className="rounded-3xl bg-gradient-to-br from-[#0037b0] to-[#00257a] text-white p-5 shadow-lg relative overflow-hidden flex flex-col gap-4">
        <div className="absolute right-3 top-3 opacity-10 pointer-events-none">
          <span className="material-symbols-outlined text-[100px]">payments</span>
        </div>

        <div className="flex items-center justify-between relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white text-[12px] font-semibold backdrop-blur-xs">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span>Próximo pago</span>
          </div>
          <span className="text-[12px] text-white/80 font-medium">
            Vence en {upcomingQuota?.daysRemaining || 5} días
          </span>
        </div>

        <div className="flex flex-col relative z-10">
          <span className="text-[13px] text-white/80 font-medium">
            {upcomingDebt?.type || 'Crédito personal'} • {upcomingDebt?.entity || 'Banco Principal'}
          </span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-[20px] font-bold text-blue-200">S/</span>
            <span className="text-[36px] font-black tracking-tight leading-none">
              {upcomingQuota ? upcomingQuota.amount.toLocaleString() : '350'}
            </span>
          </div>
          <span className="text-[12px] text-white/70 mt-1">
            Fecha límite: {upcomingDebt?.dueDate || '30 de septiembre'}
          </span>
        </div>

        {/* Botones: [Ver detalles] [Marcar como pagado] */}
        <div className="grid grid-cols-2 gap-2.5 pt-1 relative z-10">
          <button
            type="button"
            onClick={() => upcomingDebt && onViewDebtDetail(upcomingDebt)}
            className="py-2.5 px-3 rounded-xl bg-white/20 hover:bg-white/30 text-white font-label-md text-[13px] font-semibold text-center backdrop-blur-xs transition-all cursor-pointer flex items-center justify-center gap-1"
          >
            <span className="material-symbols-outlined text-[18px]">visibility</span>
            <span>Ver detalles</span>
          </button>

          <button
            type="button"
            onClick={() => upcomingQuota && onPayQuota(upcomingQuota)}
            className="py-2.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-label-md text-[13px] font-bold text-center shadow-md active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1"
          >
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            <span>Marcar como pagado</span>
          </button>
        </div>
      </div>

      {/* 5. Progreso General */}
      <div className="rounded-2xl bg-white p-4 border border-[#eaedff] shadow-xs flex flex-col gap-2">
        <div className="flex justify-between items-center text-[#131b2e]">
          <span className="font-label-md text-[13px] text-[#434655] font-semibold">
            Progreso general de pago de deudas
          </span>
          <span className="font-label-md text-[13px] font-bold text-[#0037b0]">
            {progressPercent}% cancelado
          </span>
        </div>
        <div className="w-full h-2.5 rounded-full bg-[#eaedff] overflow-hidden">
          <div
            className="h-full rounded-full bg-[#0037b0] transition-all duration-700"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-[11px] text-[#747686]">
          <span>Cancelado: S/ {totalPaid.toLocaleString()}</span>
          <span>Pendiente: S/ {totalBalance.toLocaleString()}</span>
        </div>
      </div>

      {/* 6. Sección: ¿Qué necesitas hacer hoy? */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="font-headline-sm text-[18px] font-bold text-[#131b2e] tracking-tight">
            ¿Qué necesitas hacer hoy?
          </h2>
          <span className="text-[11px] text-[#747686]">Opciones rápidas</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {/* 1. Quiero saber cuánto debo */}
          <button
            type="button"
            onClick={() => onNavigate('mis-deudas')}
            className="p-3.5 rounded-2xl bg-white border border-[#eaedff] hover:border-[#0037b0]/50 hover:bg-blue-50/30 text-left flex items-center gap-3 transition-all group shadow-xs cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0037b0] flex items-center justify-center group-hover:scale-105 transition-transform flex-shrink-0">
              <span className="material-symbols-outlined text-[22px]">calculate</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-label-md text-[13px] font-bold text-[#131b2e] group-hover:text-[#0037b0]">
                Quiero saber cuánto debo
              </span>
              <span className="font-body-sm text-[11px] text-[#747686] truncate">
                Resumen total de tus créditos y saldos
              </span>
            </div>
          </button>

          {/* 2. Quiero organizar mis pagos */}
          <button
            type="button"
            onClick={() => onNavigate('calendario')}
            className="p-3.5 rounded-2xl bg-white border border-[#eaedff] hover:border-[#0037b0]/50 hover:bg-blue-50/30 text-left flex items-center gap-3 transition-all group shadow-xs cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center group-hover:scale-105 transition-transform flex-shrink-0">
              <span className="material-symbols-outlined text-[22px]">calendar_month</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-label-md text-[13px] font-bold text-[#131b2e] group-hover:text-[#0037b0]">
                Quiero organizar mis pagos
              </span>
              <span className="font-body-sm text-[11px] text-[#747686] truncate">
                Calendario mensual de cuotas y fechas
              </span>
            </div>
          </button>

          {/* 3. Tengo un pago próximo */}
          <button
            type="button"
            onClick={() => onNavigate('calendario')}
            className="p-3.5 rounded-2xl bg-white border border-[#eaedff] hover:border-amber-300 hover:bg-amber-50/30 text-left flex items-center gap-3 transition-all group shadow-xs cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center group-hover:scale-105 transition-transform flex-shrink-0">
              <span className="material-symbols-outlined text-[22px]">alarm</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-label-md text-[13px] font-bold text-[#131b2e] group-hover:text-amber-700">
                Tengo un pago próximo
              </span>
              <span className="font-body-sm text-[11px] text-[#747686] truncate">
                Revisa cuotas que vencen en los próximos días
              </span>
            </div>
          </button>

          {/* 4. Estoy atrasado */}
          <button
            type="button"
            onClick={() => onOpenActionGuide('atrasado')}
            className="p-3.5 rounded-2xl bg-white border border-[#eaedff] hover:border-rose-300 hover:bg-rose-50/30 text-left flex items-center gap-3 transition-all group shadow-xs cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center group-hover:scale-105 transition-transform flex-shrink-0">
              <span className="material-symbols-outlined text-[22px]">warning_amber</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-label-md text-[13px] font-bold text-rose-700">
                Estoy atrasado
              </span>
              <span className="font-body-sm text-[11px] text-[#747686] truncate">
                Guía de primeros pasos para regularizar
              </span>
            </div>
          </button>

          {/* 5. No puedo pagar este mes */}
          <button
            type="button"
            onClick={() => onOpenActionGuide('no-puedo-pagar')}
            className="p-3.5 rounded-2xl bg-white border border-[#eaedff] hover:border-purple-300 hover:bg-purple-50/30 text-left flex items-center gap-3 transition-all group shadow-xs cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center group-hover:scale-105 transition-transform flex-shrink-0">
              <span className="material-symbols-outlined text-[22px]">handshake</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-label-md text-[13px] font-bold text-[#131b2e] group-hover:text-purple-700">
                No puedo pagar este mes
              </span>
              <span className="font-body-sm text-[11px] text-[#747686] truncate">
                Opciones de reprogramación y gracia
              </span>
            </div>
          </button>

          {/* 6. No entiendo mi deuda */}
          <button
            type="button"
            onClick={() => onNavigate('educacion')}
            className="p-3.5 rounded-2xl bg-white border border-[#eaedff] hover:border-cyan-300 hover:bg-cyan-50/30 text-left flex items-center gap-3 transition-all group shadow-xs cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-700 flex items-center justify-center group-hover:scale-105 transition-transform flex-shrink-0">
              <span className="material-symbols-outlined text-[22px]">school</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-label-md text-[13px] font-bold text-[#131b2e] group-hover:text-cyan-700">
                No entiendo mi deuda
              </span>
              <span className="font-body-sm text-[11px] text-[#747686] truncate">
                Aprende TEA, TCEA, comisiones y Reporte SBS
              </span>
            </div>
          </button>

          {/* 7. Quiero saber si estoy mejorando */}
          <button
            type="button"
            onClick={() => onNavigate('capacidad')}
            className="p-3.5 rounded-2xl bg-white border border-[#eaedff] hover:border-emerald-300 hover:bg-emerald-50/30 text-left flex items-center gap-3 transition-all group shadow-xs cursor-pointer sm:col-span-2"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-105 transition-transform flex-shrink-0">
              <span className="material-symbols-outlined text-[22px]">trending_up</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-label-md text-[13px] font-bold text-[#131b2e] group-hover:text-emerald-700">
                Quiero saber si estoy mejorando
              </span>
              <span className="font-body-sm text-[11px] text-[#747686] truncate">
                Calcula tu capacidad de pago, dinero disponible y simula nuevas cuotas
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Banner Orientación Virtual Asesor AlDía */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border border-blue-200/60 flex items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-11 h-11 rounded-2xl bg-[#0037b0] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
            <span className="material-symbols-outlined text-[22px]">support_agent</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-label-md text-[13px] font-bold text-[#131b2e] truncate">
              Asesor AlDía
            </span>
            <span className="font-body-sm text-[11px] text-[#434655] truncate">
              Orientación personalizada y respuestas a tus dudas
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => onOpenAdvisorChat()}
          className="px-4 py-2 rounded-xl bg-[#0037b0] text-white text-[12px] font-bold hover:bg-[#002f99] active:scale-95 transition-all shadow-xs flex-shrink-0 cursor-pointer"
        >
          Preguntar
        </button>
      </div>
    </div>
  );
};
