import React from 'react';
import { useFinance } from '../../context/FinanceContext';
import { DEBT_REDUCTION_CHART_DATA } from '../../data/financeData';
import { TabType } from '../../types';

interface DashboardScreenProps {
  onNavigate: (tab: TabType) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ onNavigate }) => {
  const {
    user,
    debts,
    totalDebt,
    totalInitialDebt,
    totalPaidDebt,
    debtProgressPercentage,
    monthlyPaidAmount,
    nextPayment,
    openDebtDetailModal,
    alerts,
  } = useFinance();

  const topAlert = alerts.find((a) => !a.isRead) || alerts[0];

  return (
    <div className="flex flex-col gap-9 max-w-5xl mx-auto pb-8">
      {/* 1. HERO BANNER VISUAL (Inspirado en la gran sección destacada de LEFI) */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B1E40] via-[#0F3574] to-[#15438D] text-white p-7 sm:p-9 shadow-lg shadow-blue-950/20 border border-blue-900/40">
        {/* Glows ambientales sutiles para profundidad visual */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00D2A8]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-10 -left-10 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 sm:gap-10">
          <div className="flex flex-col gap-4 max-w-xl">
            {/* Tag / Slogan con Logo oficial en cápsula elegante */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 w-fit shadow-xs">
              <img
                src="/logo-aldia.svg"
                alt="AlDía Logo"
                className="w-4 h-4 object-contain"
              />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[12px] font-bold tracking-wide text-emerald-300">
                AlDía · Asesoramiento en Cobranzas
              </span>
            </div>

            {/* Título Principal con jerarquía clara y tipografía moderna */}
            <h1 className="text-[30px] sm:text-[38px] font-black tracking-tight text-white leading-[1.15]">
              Organiza tus pagos. Evita atrasos.
            </h1>

            {/* Texto introductorio */}
            <p className="text-[16px] sm:text-[17.5px] font-medium text-blue-100 leading-snug">
              Orientación clara, oportuna y 100% gratuita para tus créditos, pagos y cobranzas.
            </p>

            <p className="text-[13.5px] text-blue-200/85 leading-relaxed">
              Mantén el control de tus fechas de pago, conoce tus derechos frente a las entidades financieras y avanza hacia tu tranquilidad con guías y videos oficiales SBS e INDECOPI.
            </p>

            {/* Badges de confianza con diseño sutil y espaciado */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1 text-[12px] text-blue-100 font-semibold">
              <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-white/10">
                <span className="material-symbols-outlined text-[16px] text-[#00D2A8]">verified</span>
                <span>Orientación gratuita</span>
              </div>
              <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-white/10">
                <span className="material-symbols-outlined text-[16px] text-[#00D2A8]">lock</span>
                <span>Sin datos bancarios</span>
              </div>
              <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-white/10">
                <span className="material-symbols-outlined text-[16px] text-[#00D2A8]">account_balance</span>
                <span>Normas SBS e INDECOPI</span>
              </div>
            </div>

            {/* Botones de acción principales destacados */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('aprende_articulos')}
                className="px-6 py-3.5 rounded-2xl bg-[#00D2A8] hover:bg-[#00BF98] text-[#0B1A35] font-black text-[13.5px] shadow-lg shadow-teal-950/20 transition-all flex items-center gap-2 cursor-pointer active:scale-[0.98]"
              >
                <span className="material-symbols-outlined text-[20px]">school</span>
                <span>Aprender finanzas</span>
              </button>

              <button
                onClick={() => onNavigate('orientacion')}
                className="px-6 py-3.5 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-bold text-[13.5px] backdrop-blur-md border border-white/20 transition-all flex items-center gap-2 cursor-pointer active:scale-[0.98]"
              >
                <span className="material-symbols-outlined text-[20px]">lightbulb</span>
                <span>Buscar orientación</span>
              </button>
            </div>
          </div>

          {/* Elemento visual principal destacado (Tarjeta de Presentación y Estado AlDía) */}
          <div className="hidden sm:flex items-center justify-center shrink-0">
            <div className="w-[320px] bg-white rounded-3xl p-6 text-slate-900 shadow-2xl shadow-blue-950/30 border border-white/30 relative overflow-hidden backdrop-blur-md">
              {/* Header de la tarjeta con Logo AlDía */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center p-1.5 shadow-2xs">
                    <img
                      src="/logo-aldia.svg"
                      alt="AlDía Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center font-black text-[17px] tracking-tight leading-none text-[#0F3B82]">
                      <span>AL</span>
                      <span className="text-[#00D2A8] ml-1">DÍA</span>
                    </div>
                    <span className="text-[9.5px] font-bold uppercase tracking-wider text-slate-400 mt-1">
                      Asesoramiento en Cobranzas
                    </span>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-black border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Al Día</span>
                </div>
              </div>

              {/* Contenido destacado de la tarjeta */}
              <div className="py-4 flex flex-col gap-3.5">
                <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/70">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Estado Financiero
                  </span>
                  <div className="flex items-center justify-between">
                    <span className="text-[14.5px] font-extrabold text-slate-800">
                      Cumplimiento y Control
                    </span>
                    <span className="text-[13px] font-black text-emerald-600">100%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden mt-2">
                    <div className="h-full bg-gradient-to-r from-[#0F3B82] via-[#0284C7] to-[#00D2A8] rounded-full w-full" />
                  </div>
                </div>

                {/* Info chips de verificación */}
                <div className="grid grid-cols-2 gap-2 text-[11.5px]">
                  <div className="p-3 rounded-xl bg-blue-50/80 border border-blue-100 flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[18px] text-[#0F3B82]">check_circle</span>
                    <div className="flex flex-col">
                      <span className="font-extrabold text-[#0F3B82] leading-tight">Sin atrasos</span>
                      <span className="text-[9.5px] text-slate-500">Cronograma</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-teal-50/80 border border-teal-100 flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[18px] text-[#009688]">verified_user</span>
                    <div className="flex flex-col">
                      <span className="font-extrabold text-[#00796B] leading-tight">Protegido</span>
                      <span className="text-[9.5px] text-slate-500">Normas SBS</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer de la tarjeta con lema */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11.5px]">
                <span className="text-slate-500 font-medium italic">
                  “Organiza tus pagos. Evita atrasos.”
                </span>
                <span className="font-bold text-[#0F3B82]">aldia.pe</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alerta Destacada no invasiva */}
      {topAlert && (
        <div className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-4 flex items-start sm:items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#0F3B82] flex items-center justify-center shrink-0 font-bold">
              <span className="material-symbols-outlined text-[22px]">notifications_active</span>
            </div>
            <div>
              <span className="text-[13.5px] font-bold text-blue-950 block">
                {topAlert.title}
              </span>
              <p className="text-[12.5px] text-blue-900/80 leading-snug">
                {topAlert.message}
              </p>
            </div>
          </div>
          {topAlert.actionText && (
            <button
              onClick={() => {
                if (topAlert.targetTab) onNavigate(topAlert.targetTab);
                else onNavigate('aprende');
              }}
              className="text-[12.5px] font-bold text-[#0F3B82] hover:text-blue-900 underline whitespace-nowrap shrink-0 cursor-pointer"
            >
              {topAlert.actionText}
            </button>
          )}
        </div>
      )}

      {/* 2. CUATRO TARJETAS PRINCIPALES DEL DASHBOARD */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-[18px] sm:text-[20px] font-extrabold text-[#0F172A] tracking-tight">
            Resumen de hoy
          </h2>
          <span className="text-[12px] font-medium text-slate-400">
            Actualizado en tiempo real
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Tarjeta 1: Próximo pago */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between group">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[13px] font-bold text-slate-500">
                Próximo pago
              </span>
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">calendar_month</span>
              </div>
            </div>

            <div className="my-3">
              <span className="text-[26px] font-extrabold text-[#0F172A] tracking-tight block">
                S/ {nextPayment.amount.toLocaleString('es-PE')}
              </span>
              <div className="flex items-center gap-1.5 mt-1 text-[12.5px] font-semibold text-amber-700">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <span>Vence en {nextPayment.daysLeft} días ({nextPayment.dueDateFormatted})</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[12px] text-slate-500 truncate max-w-[140px] font-medium">
                {nextPayment.debtName}
              </span>
              <span className="text-[11.5px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                Programado
              </span>
            </div>
          </div>

          {/* Tarjeta 2: Total pendiente */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[13px] font-bold text-slate-500">
                Total pendiente
              </span>
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0F3B82] flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">credit_card</span>
              </div>
            </div>

            <div className="my-3">
              <span className="text-[26px] font-extrabold text-[#0F172A] tracking-tight block">
                S/ {totalDebt.toLocaleString('es-PE')}
              </span>
              <div className="flex items-center gap-1 mt-1 text-[12px] font-bold text-emerald-600">
                <span className="material-symbols-outlined text-[15px]">trending_down</span>
                <span>↓ 8.5% respecto al mes anterior</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[12px] text-slate-500">
              <span>{debts.length} obligaciones activas</span>
              <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                En seguimiento
              </span>
            </div>
          </div>

          {/* Tarjeta 3: Pagos del mes */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[13px] font-bold text-slate-500">
                Pagos del mes
              </span>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">check_circle</span>
              </div>
            </div>

            <div className="my-3">
              <span className="text-[26px] font-extrabold text-[#0F172A] tracking-tight block">
                S/ {monthlyPaidAmount.toLocaleString('es-PE')}
              </span>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden mt-2">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: '76%' }}
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11.5px] text-slate-500">
              <span>Meta mensual</span>
              <span className="text-emerald-700 font-bold">76% cubierto</span>
            </div>
          </div>

          {/* Tarjeta 4: Estado de pagos */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[13px] font-bold text-slate-500">
                Estado de pagos
              </span>
              <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">verified</span>
              </div>
            </div>

            <div className="my-3 flex items-baseline gap-2">
              <span className="text-[28px] font-black text-emerald-700 tracking-tight">
                78
              </span>
              <span className="text-[14px] font-bold text-slate-400">/ 100</span>
              <span className="text-[12px] font-bold text-emerald-600 ml-auto bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                🟢 Al día
              </span>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[12px] font-bold text-slate-700">
                Vas por buen camino.
              </span>
              <button
                onClick={() => onNavigate('orientacion')}
                className="text-[11.5px] font-bold text-[#0F3B82] hover:underline cursor-pointer"
              >
                Diagnóstico
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SECCIÓN: PRÓXIMOS PAGOS (Tarjetas visuales amplias) */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between px-1">
          <div>
            <h2 className="text-[20px] sm:text-[22px] font-extrabold text-[#0F172A] tracking-tight">
              Próximos pagos
            </h2>
            <p className="text-[13px] text-slate-500 mt-0.5">
              Tus obligaciones más cercanas para programar y mantener tu récord al día.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {debts.slice(0, 2).map((debt) => {
            const isGreen = debt.status === 'proximo';
            return (
              <div
                key={debt.id}
                className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between gap-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                        isGreen ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[26px]">
                        {debt.categoryIcon || 'credit_card'}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-[17px] font-extrabold text-slate-900 leading-snug">
                        {debt.name}
                      </h3>
                      <span className="text-[12.5px] text-slate-500 font-medium">
                        {debt.institution}
                      </span>
                    </div>
                  </div>

                  {/* Estado sutil no invasivo */}
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11.5px] font-bold ${
                      isGreen
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/80'
                        : 'bg-amber-50 text-amber-800 border border-amber-200/80'
                    }`}
                  >
                    <span>{isGreen ? '🟢 Próximo' : '🟡 Se acerca'}</span>
                  </span>
                </div>

                {/* Monto de la cuota y vencimiento */}
                <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/70 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider block">
                      Cuota mensual
                    </span>
                    <span className="text-[22px] font-black text-[#0F172A] mt-0.5 block">
                      S/ {debt.monthlyPayment.toLocaleString('es-PE')}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider block">
                      Vencimiento
                    </span>
                    <span className="text-[14px] font-bold text-slate-700 mt-0.5 block">
                      Vence: {debt.dueDateFormatted}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      en {debt.daysLeft} días
                    </span>
                  </div>
                </div>

                {/* Botón Ver detalle */}
                <div className="pt-1">
                  <button
                    onClick={() => openDebtDetailModal(debt)}
                    className="w-full py-3 rounded-2xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-[13.5px] font-bold transition-all cursor-pointer shadow-2xs flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">visibility</span>
                    <span>Ver detalle</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. SECCIÓN: OPCIONES DE APRENDER Y GESTIÓN (Reemplaza a deudas y calendario) */}
      <section className="flex flex-col gap-5">
        <div className="flex items-center justify-between px-1">
          <div>
            <h2 className="text-[20px] sm:text-[22px] font-extrabold text-[#0F172A] tracking-tight">
              Opciones de Aprender y Educación Financiera
            </h2>
            <p className="text-[13px] text-slate-500 mt-0.5">
              Accede a todas las herramientas educativas, guías, videos SBS, diccionario, mitos, casos prácticos y derechos.
            </p>
          </div>
        </div>

        {/* Acciones principales de gestión */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Acción: Buscar orientación */}
          <div
            onClick={() => onNavigate('orientacion')}
            className="group bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-amber-300 transition-all flex items-center justify-between gap-4 cursor-pointer text-left"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-13 h-13 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[26px]">lightbulb</span>
              </div>
              <div>
                <h3 className="text-[16px] font-extrabold text-slate-900">
                  Orientación financiera
                </h3>
                <p className="text-[12.5px] text-slate-500 mt-0.5 leading-snug">
                  Guía ante atrasos, derechos y consejos de negociación.
                </p>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNavigate('orientacion');
              }}
              className="px-4 py-2.5 rounded-xl bg-amber-50 group-hover:bg-amber-600 text-amber-800 group-hover:text-white font-bold text-[13px] transition-colors shrink-0 cursor-pointer"
            >
              Ver orientación
            </button>
          </div>

          {/* Acción: Centro de aprendizaje */}
          <div
            onClick={() => onNavigate('aprende_articulos')}
            className="group bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-emerald-300 transition-all flex items-center justify-between gap-4 cursor-pointer text-left"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-13 h-13 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[26px]">school</span>
              </div>
              <div>
                <h3 className="text-[16px] font-extrabold text-slate-900">
                  Centro de aprendizaje
                </h3>
                <p className="text-[12.5px] text-slate-500 mt-0.5 leading-snug">
                  Guías prácticas, videos oficiales SBS y derechos crediticios.
                </p>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNavigate('aprende_articulos');
              }}
              className="px-4 py-2.5 rounded-xl bg-emerald-50 group-hover:bg-emerald-600 text-emerald-700 group-hover:text-white font-bold text-[13px] transition-colors shrink-0 cursor-pointer"
            >
              Explorar guías
            </button>
          </div>
        </div>

        {/* Las 6 Opciones de Aprender que reemplazan a los botones de deudas y calendario */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Opción 1: Guías y Artículos */}
          <div
            onClick={() => onNavigate('aprende_articulos')}
            className="group bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between cursor-pointer text-left"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[24px]">menu_book</span>
                </div>
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                  Lecturas prácticas
                </span>
              </div>
              <h3 className="text-[16px] font-extrabold text-slate-900">
                Guías y Artículos
              </h3>
              <p className="text-[12.5px] text-slate-500 mt-1 leading-snug">
                Presupuestos, control de obligaciones y consejos para ahorrar sin privaciones.
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNavigate('aprende_articulos');
              }}
              className="w-full mt-4 py-2.5 rounded-xl bg-slate-50 group-hover:bg-emerald-600 text-slate-700 group-hover:text-white font-bold text-[13px] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Explorar guías</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>

          {/* Opción 2: Videos oficiales SBS */}
          <div
            onClick={() => onNavigate('aprende_videos')}
            className="group bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between cursor-pointer text-left"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-11 h-11 rounded-2xl bg-blue-50 text-[#0F3B82] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[24px]">smart_display</span>
                </div>
                <span className="text-[11px] font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200/60">
                  Oficial SBS
                </span>
              </div>
              <h3 className="text-[16px] font-extrabold text-slate-900">
                Videos oficiales SBS
              </h3>
              <p className="text-[12.5px] text-slate-500 mt-1 leading-snug">
                Material audiovisual directo para entender tasas, estados de cuenta y tus créditos.
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNavigate('aprende_videos');
              }}
              className="w-full mt-4 py-2.5 rounded-xl bg-slate-50 group-hover:bg-[#0F3B82] text-slate-700 group-hover:text-white font-bold text-[13px] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Ver videos SBS</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>

          {/* Opción 3: Diccionario financiero */}
          <div
            onClick={() => onNavigate('aprende_diccionario')}
            className="group bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-teal-300 transition-all flex flex-col justify-between cursor-pointer text-left"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-11 h-11 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[24px]">auto_stories</span>
                </div>
                <span className="text-[11px] font-bold text-teal-900 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200/60">
                  Glosario claro
                </span>
              </div>
              <h3 className="text-[16px] font-extrabold text-slate-900">
                Diccionario financiero
              </h3>
              <p className="text-[12.5px] text-slate-500 mt-1 leading-snug">
                Significado de TCEA, TEA, interés moratorio, amortización y términos bancarios.
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNavigate('aprende_diccionario');
              }}
              className="w-full mt-4 py-2.5 rounded-xl bg-slate-50 group-hover:bg-teal-700 text-slate-700 group-hover:text-white font-bold text-[13px] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Abrir diccionario</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>

          {/* Opción 4: Mitos y verdades */}
          <div
            onClick={() => onNavigate('aprende_mitos')}
            className="group bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-purple-300 transition-all flex flex-col justify-between cursor-pointer text-left"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-11 h-11 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[24px]">fact_check</span>
                </div>
                <span className="text-[11px] font-bold text-purple-900 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200/60">
                  Verificación
                </span>
              </div>
              <h3 className="text-[16px] font-extrabold text-slate-900">
                Mitos y verdades
              </h3>
              <p className="text-[12.5px] text-slate-500 mt-1 leading-snug">
                Despeja mitos sobre embargo por deudas personales, infocorp y amenazas de cobranza.
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNavigate('aprende_mitos');
              }}
              className="w-full mt-4 py-2.5 rounded-xl bg-slate-50 group-hover:bg-purple-700 text-slate-700 group-hover:text-white font-bold text-[13px] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Ver mitos y verdades</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>

          {/* Opción 5: Casos prácticos */}
          <div
            onClick={() => onNavigate('aprende_casos')}
            className="group bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-amber-300 transition-all flex flex-col justify-between cursor-pointer text-left"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[24px]">tips_and_updates</span>
                </div>
                <span className="text-[11px] font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60">
                  Paso a paso
                </span>
              </div>
              <h3 className="text-[16px] font-extrabold text-slate-900">
                Casos prácticos
              </h3>
              <p className="text-[12.5px] text-slate-500 mt-1 leading-snug">
                Aprende de situaciones comunes de atrasos, llamadas indebidas y acuerdos de pago.
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNavigate('aprende_casos');
              }}
              className="w-full mt-4 py-2.5 rounded-xl bg-slate-50 group-hover:bg-amber-600 text-slate-700 group-hover:text-white font-bold text-[13px] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Resolver casos</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>

          {/* Opción 6: Derechos del usuario */}
          <div
            onClick={() => onNavigate('aprende_derechos')}
            className="group bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-indigo-300 transition-all flex flex-col justify-between cursor-pointer text-left"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-11 h-11 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[24px]">verified_user</span>
                </div>
                <span className="text-[11px] font-bold text-indigo-900 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200/60">
                  Leyes y SBS
                </span>
              </div>
              <h3 className="text-[16px] font-extrabold text-slate-900">
                Derechos del usuario
              </h3>
              <p className="text-[12.5px] text-slate-500 mt-1 leading-snug">
                Conoce las leyes que te respaldan ante abusos de cobranza, llamadas nocturnas y terceros.
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNavigate('aprende_derechos');
              }}
              className="w-full mt-4 py-2.5 rounded-xl bg-slate-50 group-hover:bg-[#0F3B82] text-slate-700 group-hover:text-white font-bold text-[13px] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Ver mis derechos</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

      {/* 5. SECCIÓN: TU PROGRESO FINANCIERO */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[22px] text-emerald-600">trending_down</span>
              <h2 className="text-[20px] sm:text-[22px] font-extrabold text-[#0F172A] tracking-tight">
                Tu progreso financiero
              </h2>
            </div>
            <p className="text-[13px] text-slate-500 mt-0.5">
              Reducción acumulada de tus deudas a través del tiempo.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-[12.5px] font-bold self-start sm:self-auto border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>“¡Excelente! Este mes estás avanzando.”</span>
          </div>
        </div>

        {/* Métricas: Deuda inicial, Deuda actual, Deuda pagada, Progreso */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-[11.5px] font-bold text-slate-400 uppercase tracking-wider block">
              Deuda inicial
            </span>
            <span className="text-[18px] sm:text-[20px] font-black text-slate-700 mt-1 block">
              S/ {totalInitialDebt.toLocaleString('es-PE')}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-[11.5px] font-bold text-slate-400 uppercase tracking-wider block">
              Deuda actual
            </span>
            <span className="text-[18px] sm:text-[20px] font-black text-[#0F172A] mt-1 block">
              S/ {totalDebt.toLocaleString('es-PE')}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80">
            <span className="text-[11.5px] font-bold text-emerald-800 uppercase tracking-wider block">
              Deuda pagada
            </span>
            <span className="text-[18px] sm:text-[20px] font-black text-emerald-700 mt-1 block">
              S/ {totalPaidDebt.toLocaleString('es-PE')}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80">
            <span className="text-[11.5px] font-bold text-emerald-800 uppercase tracking-wider block">
              Progreso
            </span>
            <span className="text-[18px] sm:text-[20px] font-black text-emerald-700 mt-1 block">
              {debtProgressPercentage}%
            </span>
          </div>
        </div>

        {/* Barra de progreso visual */}
        <div>
          <div className="flex items-center justify-between text-[12.5px] mb-2 font-medium">
            <span className="text-slate-600">Porcentaje de reducción de deuda</span>
            <span className="text-emerald-700 font-bold">{debtProgressPercentage}% liquidado</span>
          </div>
          <div className="w-full h-3.5 rounded-full bg-slate-100 p-0.5 border border-slate-200/80">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-700"
              style={{ width: `${Math.min(100, Math.max(0, debtProgressPercentage))}%` }}
            />
          </div>
        </div>

        {/* Gráfica Elegante */}
        <div className="pt-2">
          <div className="flex items-center justify-between mb-3 text-[12px] text-slate-500">
            <span>Reducción de saldo mes a mes (S/)</span>
            <span className="font-semibold text-emerald-700">↓ S/ 6,550 liberados desde Mayo</span>
          </div>

          <div className="bg-slate-50/70 rounded-2xl p-5 border border-slate-200/80">
            <div className="relative h-44 w-full">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 500 160" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Grid lines */}
                <line x1="0" y1="30" x2="500" y2="30" stroke="#E2E8F0" strokeDasharray="3 3" />
                <line x1="0" y1="80" x2="500" y2="80" stroke="#E2E8F0" strokeDasharray="3 3" />
                <line x1="0" y1="130" x2="500" y2="130" stroke="#E2E8F0" strokeDasharray="3 3" />

                {/* Area fill */}
                <path
                  d="M 20 20 L 110 40 L 205 60 L 305 85 L 400 100 L 480 130 L 480 155 L 20 155 Z"
                  fill="url(#chartGradient)"
                />

                {/* Trend line */}
                <path
                  d="M 20 20 L 110 40 L 205 60 L 305 85 L 400 100 L 480 130"
                  fill="none"
                  stroke="#059669"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Puntos */}
                {[
                  { x: 20, y: 20, val: '25.0k' },
                  { x: 110, y: 40, val: '23.8k' },
                  { x: 205, y: 60, val: '22.4k' },
                  { x: 305, y: 85, val: '20.9k' },
                  { x: 400, y: 100, val: '20.1k' },
                  { x: 480, y: 130, val: '18.4k' },
                ].map((pt, i) => (
                  <g key={i}>
                    <circle cx={pt.x} cy={pt.y} r="5" fill="#FFFFFF" stroke="#059669" strokeWidth="2.5" />
                    <text
                      x={pt.x}
                      y={pt.y - 10}
                      textAnchor="middle"
                      fill="#0F172A"
                      fontSize="10"
                      fontWeight="bold"
                    >
                      {pt.val}
                    </text>
                  </g>
                ))}
              </svg>
            </div>

            <div className="flex justify-between px-2 pt-3 border-t border-slate-200 text-[12px] font-bold text-slate-500">
              {DEBT_REDUCTION_CHART_DATA.map((d) => (
                <span key={d.month}>{d.month}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
