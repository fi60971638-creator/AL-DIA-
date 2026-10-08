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
    openRegisterPaymentModal,
    openDebtDetailModal,
    alerts,
    goals,
  } = useFinance();

  // Find unread alerts or top alert
  const topAlert = alerts.find((a) => !a.isRead) || alerts[0];

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto">
      {/* 1. Header con Saludo Personalizado */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[26px] sm:text-[32px] font-extrabold text-[#0F172A] tracking-tight leading-tight flex items-center gap-2">
            <span>Buenos días, {user.name}</span>
            <span className="inline-block animate-bounce">👋</span>
          </h1>
          <p className="text-[14px] sm:text-[15px] text-slate-500 mt-0.5">
            Este es tu resumen financiero de hoy.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onNavigate('deudas')}
            className="px-4 py-2.5 rounded-xl text-[13px] font-bold bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <span className="material-symbols-outlined text-[18px] text-slate-500">credit_card</span>
            <span>Mis deudas</span>
          </button>
          <button
            onClick={() => openRegisterPaymentModal()}
            className="px-4 py-2.5 rounded-xl text-[13px] font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer active:scale-[0.99]"
          >
            <span className="material-symbols-outlined text-[18px]">payments</span>
            <span>Registrar pago</span>
          </button>
        </div>
      </div>

      {/* Alerta Destacada no invasiva */}
      {topAlert && (
        <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 flex items-start sm:items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">notifications_active</span>
            </div>
            <div>
              <span className="text-[13px] font-bold text-emerald-950 block">
                {topAlert.title}
              </span>
              <p className="text-[12.5px] text-emerald-800 leading-snug">
                {topAlert.message}
              </p>
            </div>
          </div>
          {topAlert.actionText && (
            <button
              onClick={() => {
                if (topAlert.targetTab) onNavigate(topAlert.targetTab);
                else openRegisterPaymentModal();
              }}
              className="text-[12px] font-bold text-emerald-700 hover:text-emerald-900 underline whitespace-nowrap shrink-0 cursor-pointer"
            >
              {topAlert.actionText}
            </button>
          )}
        </div>
      )}

      {/* 2. Cuatro Tarjetas Principales del Dashboard */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Tarjeta 1: Deuda Total */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[12.5px] font-semibold text-slate-500">
              Deuda total
            </span>
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">trending_down</span>
            </div>
          </div>
          <div className="my-3">
            <span className="text-[26px] font-extrabold text-[#0F172A] tracking-tight block">
              S/ {totalDebt.toLocaleString('es-PE')}
            </span>
            <span className="text-[12px] font-medium text-emerald-700 flex items-center gap-1 mt-1">
              <span className="material-symbols-outlined text-[15px]">arrow_downward</span>
              <span>↓ 8.5% respecto al mes anterior</span>
            </span>
          </div>
          <div className="pt-2 border-t border-slate-100 text-[11.5px] text-slate-400">
            {debts.length} obligaciones activas
          </div>
        </div>

        {/* Tarjeta 2: Próximo pago */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[12.5px] font-semibold text-slate-500">
              Próximo pago
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">calendar_today</span>
            </div>
          </div>
          <div className="my-3">
            <span className="text-[26px] font-extrabold text-[#0F172A] tracking-tight block">
              S/ {nextPayment.amount.toLocaleString('es-PE')}
            </span>
            <span className="text-[12px] font-medium text-amber-700 flex items-center gap-1 mt-1">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span>Vence en {nextPayment.daysLeft} días ({nextPayment.dueDateFormatted})</span>
            </span>
          </div>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11.5px] text-slate-500 truncate max-w-[110px]">
              {nextPayment.debtName}
            </span>
            <button
              onClick={() => openRegisterPaymentModal(nextPayment.debtId)}
              className="text-[12px] font-bold text-emerald-600 hover:text-emerald-700 cursor-pointer"
            >
              Ver pago →
            </button>
          </div>
        </div>

        {/* Tarjeta 3: Pagos del mes */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[12.5px] font-semibold text-slate-500">
              Pagos del mes
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">receipt_long</span>
            </div>
          </div>
          <div className="my-3">
            <span className="text-[26px] font-extrabold text-[#0F172A] tracking-tight block">
              S/ {monthlyPaidAmount.toLocaleString('es-PE')}
            </span>
            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden mt-2.5">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-500"
                style={{ width: '76%' }}
              />
            </div>
          </div>
          <div className="pt-2 border-t border-slate-100 text-[11.5px] text-slate-500 flex items-center justify-between">
            <span>Presupuestado: S/ 3,100</span>
            <span className="text-emerald-600 font-bold">76% cubierto</span>
          </div>
        </div>

        {/* Tarjeta 4: Salud financiera */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[12.5px] font-semibold text-slate-500">
              Salud financiera
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">verified</span>
            </div>
          </div>
          <div className="my-3 flex items-baseline gap-2">
            <span className="text-[28px] font-extrabold text-emerald-700 tracking-tight">
              78
            </span>
            <span className="text-[14px] font-bold text-slate-400">/ 100</span>
          </div>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[12px] font-bold text-emerald-700">
              Vas por buen camino.
            </span>
            <button
              onClick={() => onNavigate('salud')}
              className="text-[11.5px] text-slate-500 hover:text-slate-800 cursor-pointer"
            >
              Detalles
            </button>
          </div>
        </div>
      </section>

      {/* 3. Sección: TU PROGRESO FINANCIERO */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-emerald-600">show_chart</span>
              <h2 className="text-[20px] sm:text-[22px] font-extrabold text-[#0F172A] tracking-tight">
                Tu progreso financiero
              </h2>
            </div>
            <p className="text-[13px] text-slate-500 mt-0.5">
              Evolución acumulada de la reducción de tus deudas a través del tiempo.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-[12.5px] font-bold self-start sm:self-auto border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>“¡Excelente! Este mes estás avanzando.”</span>
          </div>
        </div>

        {/* Métricas clave de progreso */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-[11.5px] font-bold text-slate-400 uppercase tracking-wider block">
              Deuda inicial
            </span>
            <span className="text-[18px] sm:text-[20px] font-extrabold text-slate-700 mt-1 block">
              S/ {totalInitialDebt.toLocaleString('es-PE')}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-[11.5px] font-bold text-slate-400 uppercase tracking-wider block">
              Deuda actual
            </span>
            <span className="text-[18px] sm:text-[20px] font-extrabold text-[#0F172A] mt-1 block">
              S/ {totalDebt.toLocaleString('es-PE')}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200">
            <span className="text-[11.5px] font-bold text-emerald-700 uppercase tracking-wider block">
              Deuda pagada
            </span>
            <span className="text-[18px] sm:text-[20px] font-extrabold text-emerald-700 mt-1 block">
              S/ {totalPaidDebt.toLocaleString('es-PE')}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200">
            <span className="text-[11.5px] font-bold text-emerald-700 uppercase tracking-wider block">
              Progreso
            </span>
            <span className="text-[18px] sm:text-[20px] font-extrabold text-emerald-700 mt-1 block">
              {debtProgressPercentage}%
            </span>
          </div>
        </div>

        {/* Barra de progreso global */}
        <div>
          <div className="flex items-center justify-between text-[12.5px] mb-2 font-medium">
            <span className="text-slate-600">Amortización total lograda</span>
            <span className="text-emerald-700 font-bold">{debtProgressPercentage}% completado</span>
          </div>
          <div className="w-full h-3.5 rounded-full bg-slate-100 p-0.5 border border-slate-200">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-[#00B49F] rounded-full transition-all duration-700 shadow-2xs"
              style={{ width: `${Math.min(100, Math.max(0, debtProgressPercentage))}%` }}
            />
          </div>
        </div>

        {/* Gráfica Elegante de Reducción de Deuda (SVG interactivo) */}
        <div className="pt-2">
          <div className="flex items-center justify-between mb-3 text-[12px] text-slate-500">
            <span>Reducción de saldo mes a mes (S/)</span>
            <span className="font-semibold text-emerald-700">↓ S/ 6,550 liberados desde Mayo</span>
          </div>

          <div className="bg-slate-50/70 rounded-2xl p-5 border border-slate-200">
            {/* SVG Chart */}
            <div className="relative h-48 w-full">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 500 160" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Grid horizontal lines */}
                <line x1="0" y1="30" x2="500" y2="30" stroke="#E2E8F0" strokeDasharray="3 3" />
                <line x1="0" y1="80" x2="500" y2="80" stroke="#E2E8F0" strokeDasharray="3 3" />
                <line x1="0" y1="130" x2="500" y2="130" stroke="#E2E8F0" strokeDasharray="3 3" />

                {/* Area fill */}
                <path
                  d="M 20 20 L 110 40 L 205 60 L 305 85 L 400 100 L 480 130 L 480 155 L 20 155 Z"
                  fill="url(#chartGradient)"
                />

                {/* Primary Trend Line */}
                <path
                  d="M 20 20 L 110 40 L 205 60 L 305 85 L 400 100 L 480 130"
                  fill="none"
                  stroke="#059669"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Data Points */}
                {[
                  { x: 20, y: 20, label: 'May', val: '25.0k' },
                  { x: 110, y: 40, label: 'Jun', val: '23.8k' },
                  { x: 205, y: 60, label: 'Jul', val: '22.4k' },
                  { x: 305, y: 85, label: 'Ago', val: '20.9k' },
                  { x: 400, y: 100, label: 'Set', val: '20.1k' },
                  { x: 480, y: 130, label: 'Oct', val: '18.4k' },
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

            {/* Labels below chart */}
            <div className="flex justify-between px-2 pt-3 border-t border-slate-200 text-[12px] font-bold text-slate-500">
              {DEBT_REDUCTION_CHART_DATA.map((d) => (
                <span key={d.month}>{d.month}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Sección: PRÓXIMOS PAGOS */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[20px] font-extrabold text-[#0F172A] tracking-tight">
              Próximos pagos
            </h2>
            <p className="text-[13px] text-slate-500">
              Mantén el control de tus fechas límites para evitar intereses moratorios.
            </p>
          </div>
          <button
            onClick={() => onNavigate('pagos')}
            className="text-[13px] font-bold text-[#0F3B82] hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
          >
            <span>Ver todos</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {debts.slice(0, 2).map((debt) => {
            const isGreen = debt.status === 'proximo';
            return (
              <div
                key={debt.id}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between gap-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                        isGreen ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[24px]">
                        {debt.categoryIcon || 'credit_card'}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-[16px] font-bold text-slate-900 leading-snug">
                        {debt.name}
                      </h3>
                      <span className="text-[12px] text-slate-500">
                        {debt.institution}
                      </span>
                    </div>
                  </div>

                  {/* Estado sutil */}
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                      isGreen
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}
                  >
                    <span>{isGreen ? '🟢 Próximo' : '🟡 Se acerca'}</span>
                  </span>
                </div>

                <div className="flex items-center justify-between py-2 border-y border-slate-100">
                  <div>
                    <span className="text-[11px] text-slate-400 uppercase font-semibold block">
                      Monto a pagar
                    </span>
                    <span className="text-[20px] font-extrabold text-[#0F172A]">
                      S/ {debt.monthlyPayment.toLocaleString('es-PE')}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-slate-400 uppercase font-semibold block">
                      Vencimiento
                    </span>
                    <span className="text-[14px] font-bold text-slate-700">
                      Vence: {debt.dueDateFormatted}
                    </span>
                  </div>
                </div>

                {/* Botones Pagar / Ver detalle */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => openRegisterPaymentModal(debt.id)}
                    className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[13px] font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <span className="material-symbols-outlined text-[16px]">payments</span>
                    <span>Pagar</span>
                  </button>

                  <button
                    onClick={() => openDebtDetailModal(debt)}
                    className="px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-[13px] font-semibold transition-colors cursor-pointer"
                  >
                    Ver detalle
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Sección: RECOMENDADO PARA TI (Consejo de Hoy) */}
      <section className="bg-gradient-to-r from-blue-900 to-[#0F3B82] text-white rounded-3xl p-6 sm:p-7 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/10 text-amber-300 flex items-center justify-center text-[26px] shrink-0 border border-white/10">
            💡
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300 bg-white/10 px-2 py-0.5 rounded">
                Recomendado para ti
              </span>
              <span className="text-[12px] text-white/70">Tu consejo de hoy</span>
            </div>
            <p className="text-[14px] sm:text-[15px] text-white/95 mt-1.5 leading-relaxed font-medium">
              “Tu deuda con mayor tasa de interés (Tarjeta de crédito BCP, 39.5% TEA) puede estar generando más costos. Considera priorizarla dentro de tu estrategia de pago.”
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('aprende')}
          className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white hover:bg-emerald-50 text-[#0F3B82] font-bold text-[13px] transition-all shadow-sm shrink-0 cursor-pointer flex items-center justify-center gap-1.5"
        >
          <span>Ver estrategia</span>
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </section>

      {/* 6. Sección: MIS OBJETIVOS DESTACADOS */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-[20px] font-extrabold text-[#0F172A] tracking-tight">
            Tus metas activas
          </h2>
          <button
            onClick={() => onNavigate('objetivos')}
            className="text-[13px] font-bold text-[#0F3B82] hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
          >
            <span>Ver objetivos</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {goals.map((goal) => (
            <div
              key={goal.id}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs flex flex-col justify-between gap-3"
            >
              <div className="flex items-start justify-between">
                <span className="text-[14px] font-bold text-slate-900 leading-snug">
                  {goal.title}
                </span>
                <span className="material-symbols-outlined text-[20px] text-emerald-600">
                  {goal.icon}
                </span>
              </div>

              <div>
                <div className="flex items-baseline justify-between text-[13px] mb-1.5">
                  <span className="font-extrabold text-[#0F172A]">
                    S/ {goal.currentAmount.toLocaleString('es-PE')}
                  </span>
                  <span className="text-slate-500 text-[12px]">
                    de S/ {goal.targetAmount.toLocaleString('es-PE')}
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-emerald-600 rounded-full transition-all"
                    style={{ width: `${Math.min(100, goal.percentage)}%` }}
                  />
                </div>
              </div>

              <div className="text-[11.5px] text-emerald-700 font-semibold flex items-center justify-between">
                <span>{goal.percentage}% alcanzado</span>
                {goal.deadline && <span className="text-slate-400 font-normal">{goal.deadline}</span>}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
