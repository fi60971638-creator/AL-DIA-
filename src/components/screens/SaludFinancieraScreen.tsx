import React from 'react';
import { useFinance } from '../../context/FinanceContext';
import { TabType } from '../../types';

interface SaludFinancieraScreenProps {
  onNavigate: (tab: TabType) => void;
}

export const SaludFinancieraScreen: React.FC<SaludFinancieraScreenProps> = ({ onNavigate }) => {
  const { healthScore, user, totalDebt } = useFinance();

  const { totalScore, statusText, breakdown, recommendations } = healthScore;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-700 bg-emerald-50 border-emerald-200';
    if (score >= 65) return 'text-amber-800 bg-amber-50 border-amber-200';
    return 'text-rose-700 bg-rose-50 border-rose-200';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Excelente':
        return 'bg-emerald-100 text-emerald-800';
      case 'Bueno':
        return 'bg-blue-100 text-blue-800';
      case 'Atención':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-rose-100 text-rose-800';
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-[12px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
            Diagnóstico Integral
          </span>
        </div>
        <h1 className="text-[26px] sm:text-[32px] font-extrabold text-[#0F172A] tracking-tight mt-1">
          Tu salud financiera
        </h1>
        <p className="text-[14px] text-slate-500">
          Evaluación personalizada basada en tus deudas, capacidad de pago, puntualidad y ahorro.
        </p>
      </div>

      {/* Hero Score Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          {/* Radial visual indicator */}
          <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#E2E8F0"
                strokeWidth="8"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#059669"
                strokeWidth="8"
                strokeDasharray={2 * Math.PI * 40}
                strokeDashoffset={2 * Math.PI * 40 * (1 - totalScore / 100)}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-[32px] font-extrabold text-slate-900 leading-none">
                {totalScore}
              </span>
              <span className="text-[12px] font-bold text-slate-400 mt-0.5">
                de 100
              </span>
            </div>
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{statusText}</span>
            </div>
            <h2 className="text-[20px] sm:text-[22px] font-extrabold text-slate-900 leading-snug">
              Buen estado crediticio{user.name?.trim() ? ` para ${user.name.trim()}` : ''}
            </h2>
            <p className="text-[13.5px] text-slate-500 max-w-md mt-1 leading-relaxed">
              Mantienes un balance positivo entre tus ingresos de S/ {user.monthlyIncome.toLocaleString('es-PE')} y tus cuotas mensuales. Siguiendo las recomendaciones podrías subir a 88+ puntos.
            </p>
          </div>
        </div>

        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col gap-2.5 w-full md:w-64 text-[13px]">
          <div className="flex justify-between">
            <span className="text-slate-500">Deuda activa:</span>
            <span className="font-bold text-slate-900">S/ {totalDebt.toLocaleString('es-PE')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Capacidad disponible:</span>
            <span className="font-bold text-emerald-700">S/ {(user.monthlyIncome - user.monthlyExpenses).toLocaleString('es-PE')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Puntualidad SBS:</span>
            <span className="font-bold text-blue-700">100% Normal</span>
          </div>
        </div>
      </div>

      {/* 5 Pilares de Desglose */}
      <section className="flex flex-col gap-4">
        <h3 className="text-[18px] font-extrabold text-[#0F172A] tracking-tight">
          Desglose de los 5 pilares financieros
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(breakdown).map(([key, item]: [string, { score: number; label: string; status: 'Excelente' | 'Bueno' | 'Atención' | 'Crítico'; detail: string }]) => (
            <div
              key={key}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs flex flex-col justify-between gap-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-[14px] font-bold text-slate-900">
                  {item.label}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${getStatusBadge(item.status)}`}>
                  {item.status}
                </span>
              </div>

              <div>
                <div className="flex items-baseline justify-between text-[13px] mb-1.5">
                  <span className="font-extrabold text-[18px] text-slate-900">
                    {item.score} <span className="text-[12px] text-slate-400 font-normal">/ 100</span>
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-emerald-600 rounded-full"
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>

              <p className="text-[12px] text-slate-500 leading-relaxed pt-1 border-t border-slate-100">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Recomendaciones para subir la puntuación */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs flex flex-col gap-5">
        <div>
          <h3 className="text-[19px] font-extrabold text-[#0F172A] tracking-tight">
            Recomendaciones para mejorar tu puntuación
          </h3>
          <p className="text-[13px] text-slate-500 mt-0.5">
            Acciones concretas que te permitirán optimizar tu costo financiero y subir a calificación excelente.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-emerald-300 transition-colors"
            >
              <div className="flex items-start gap-3.5">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                    rec.priority === 'alta'
                      ? 'bg-rose-100 text-rose-700'
                      : rec.priority === 'media'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-blue-100 text-blue-700'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {rec.priority === 'alta' ? 'priority_high' : 'tips_and_updates'}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-bold text-slate-900">
                      {rec.title}
                    </span>
                    <span
                      className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                        rec.priority === 'alta'
                          ? 'bg-rose-50 text-rose-700'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      Prioridad {rec.priority}
                    </span>
                  </div>
                  <p className="text-[12.5px] text-slate-600 mt-0.5 leading-snug">
                    {rec.description}
                  </p>
                </div>
              </div>

              <button
                onClick={() => onNavigate(rec.actionTab)}
                className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 text-[12.5px] font-bold transition-all shadow-2xs shrink-0 self-start sm:self-auto cursor-pointer"
              >
                {rec.actionLabel} →
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
