import React, { useState } from 'react';
import { ADVISORY_RESPONSES, RIGHTS_TOPICS } from '../../data/initialData';
import { AdvisoryResult, TabType } from '../../types';
import { useFinance } from '../../context/FinanceContext';
import { GuidanceActionIllustration } from '../common/Illustrations';

interface OrientacionScreenProps {
  onNavigate?: (tab: TabType) => void;
}

export const OrientacionScreen: React.FC<OrientacionScreenProps> = ({ onNavigate }) => {
  const { healthScore, openRegisterPaymentModal } = useFinance();
  const [activeTab, setActiveTab] = useState<'situaciones' | 'derechos' | 'salud' | 'simulador'>('situaciones');

  // Situaciones interactivas
  const [selectedSituationKey, setSelectedSituationKey] = useState<string>('no-puedo-pagar');
  const [result, setResult] = useState<AdvisoryResult | null>(ADVISORY_RESPONSES['no-puedo-pagar']);

  const situationsList = [
    { key: 'no-puedo-pagar', label: 'No puedo pagar la cuota', icon: 'error_outline' },
    { key: 'me-atrase', label: 'Me atrasé en un pago', icon: 'schedule' },
    { key: 'me-estan-cobrando', label: 'Me están cobrando / llamadas', icon: 'phone_in_talk' },
    { key: 'no-entiendo-credito', label: 'No entiendo mi crédito o tasas', icon: 'help_outline' },
    { key: 'quiero-pagar-antes', label: 'Quiero amortizar o pagar antes', icon: 'payments' },
    { key: 'cuidar-historial', label: 'Quiero cuidar mi historial SBS', icon: 'verified_user' },
    { key: 'varias-obligaciones', label: 'Tengo varias deudas acumuladas', icon: 'account_tree' },
  ];

  const handleSelectSituation = (key: string) => {
    setSelectedSituationKey(key);
    setResult(ADVISORY_RESPONSES[key] || ADVISORY_RESPONSES['otro']);
  };

  // Simulador de Ahorro e Inversión (Inspirado en la pantalla de la referencia PDF)
  const [initialAmount, setInitialAmount] = useState<number>(1000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(200);
  const [years, setYears] = useState<number>(3);
  const [annualRate, setAnnualRate] = useState<number>(6.5);

  const calculateSavings = () => {
    let total = initialAmount;
    const monthlyRate = annualRate / 100 / 12;
    const totalMonths = years * 12;
    let totalContributed = initialAmount;

    for (let m = 0; m < totalMonths; m++) {
      total = (total + monthlyContribution) * (1 + monthlyRate);
      totalContributed += monthlyContribution;
    }
    const totalInterest = total - totalContributed;
    return {
      finalAmount: Math.round(total),
      contributed: Math.round(totalContributed),
      interestEarned: Math.round(totalInterest),
    };
  };

  const savingsCalc = calculateSavings();

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto pb-8">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-[#0F3B82] to-[#14478f] rounded-3xl p-6 sm:p-8 text-white shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col gap-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-[12px] font-bold w-fit">
            <span className="material-symbols-outlined text-[16px]">lightbulb</span>
            <span>Orientación Financiera AlDía</span>
          </div>
          <h1 className="text-[26px] sm:text-[32px] font-black tracking-tight leading-tight">
            Guía clara para tus créditos y pagos
          </h1>
          <p className="text-[14px] sm:text-[15px] text-blue-100/90 leading-relaxed">
            Aprende a negociar con entidades financieras, resolver atrasos, defender tus derechos y construir tranquilidad paso a paso.
          </p>
        </div>

        <div className="hidden sm:flex items-center justify-center shrink-0">
          <GuidanceActionIllustration className="w-28 h-28" />
        </div>
      </div>

      {/* 2. Selector de Pestañas Visuales (Estilo PDF con bordes suaves) */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200/90 pb-3">
        {[
          { id: 'situaciones', label: 'Situaciones y soluciones', icon: 'support_agent' },
          { id: 'derechos', label: 'Derechos del consumidor', icon: 'gavel' },
          { id: 'salud', label: 'Salud financiera', icon: 'verified' },
          { id: 'simulador', label: 'Simulador de ahorro', icon: 'savings' },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl text-[13.5px] font-bold transition-all flex items-center gap-2 cursor-pointer ${
                isActive
                  ? 'bg-[#0F3B82] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <span className="material-symbols-outlined text-[19px]">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: SITUACIONES Y SOLUCIONES */}
      {activeTab === 'situaciones' && (
        <div className="flex flex-col gap-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs">
            <h2 className="text-[18px] font-extrabold text-[#0F172A] tracking-tight mb-1">
              ¿Cuál es tu situación actual?
            </h2>
            <p className="text-[13px] text-slate-500 mb-4">
              Selecciona una opción para ver la orientación adecuada y pasos recomendados.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {situationsList.map((sit) => {
                const isSelected = selectedSituationKey === sit.key;
                return (
                  <button
                    key={sit.key}
                    onClick={() => handleSelectSituation(sit.key)}
                    className={`p-4 rounded-2xl border text-left transition-all flex items-center gap-3 cursor-pointer ${
                      isSelected
                        ? 'border-[#0F3B82] bg-blue-50/70 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined text-[24px] ${
                        isSelected ? 'text-[#0F3B82]' : 'text-slate-400'
                      }`}
                    >
                      {sit.icon}
                    </span>
                    <span
                      className={`text-[13.5px] font-bold ${
                        isSelected ? 'text-[#0F3B82]' : 'text-slate-800'
                      }`}
                    >
                      {sit.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Resultado de la Orientación */}
          {result && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col gap-6">
              <div className="flex items-start gap-4 pb-4 border-b border-slate-100">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[28px]">verified</span>
                </div>
                <div>
                  <span className="text-[11.5px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    Plan de acción sugerido
                  </span>
                  <h3 className="text-[22px] font-extrabold text-[#0F172A] mt-1 tracking-tight">
                    {result.title}
                  </h3>
                </div>
              </div>

              {/* Qué significa */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-[12px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                  1. Qué significa esto
                </span>
                <p className="text-[14px] text-slate-700 leading-relaxed">
                  {result.whatItMeans}
                </p>
              </div>

              {/* Pasos a seguir */}
              <div>
                <span className="text-[12px] font-bold uppercase tracking-wider text-slate-500 block mb-3">
                  2. Pasos recomendados
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {result.whatToDo.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl border border-slate-200 bg-white shadow-2xs flex items-start gap-3"
                    >
                      <span className="w-6 h-6 rounded-full bg-[#0F3B82] text-white text-[12px] font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span className="text-[13px] font-medium text-slate-700 leading-snug">
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Qué hacer vs Qué evitar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/90">
                  <span className="text-[12px] font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5 mb-2">
                    <span className="material-symbols-outlined text-[18px]">check_circle</span>
                    <span>Consejo clave AlDía</span>
                  </span>
                  <p className="text-[13px] text-emerald-950 leading-relaxed font-medium">
                    {result.advice}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/90">
                  <span className="text-[12px] font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5 mb-2">
                    <span className="material-symbols-outlined text-[18px]">warning</span>
                    <span>Qué evitar hacer</span>
                  </span>
                  <ul className="text-[13px] text-amber-950 leading-relaxed font-medium space-y-1">
                    {result.whatToAvoid.map((avoid, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-amber-600 font-bold">•</span>
                        <span>{avoid}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Botón de acción */}
              <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                <span className="text-[12px] text-slate-400">
                  Fuente: {result.officialSource.name}
                </span>
                <button
                  onClick={() => openRegisterPaymentModal()}
                  className="px-5 py-2.5 rounded-xl bg-[#0F3B82] hover:bg-blue-950 text-white font-bold text-[13px] transition-colors cursor-pointer"
                >
                  Registrar pago o abono
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: DERECHOS DEL CONSUMIDOR */}
      {activeTab === 'derechos' && (
        <div className="flex flex-col gap-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs">
            <h2 className="text-[18px] font-extrabold text-[#0F172A] tracking-tight mb-1">
              Conoce tus derechos financieros
            </h2>
            <p className="text-[13px] text-slate-500 mb-6">
              La ley peruana (Código de Protección al Consumidor y normativas SBS) te protege de abusos en cobranzas y cobros injustificados.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {RIGHTS_TOPICS.map((topic, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl border border-slate-200 hover:border-slate-300 bg-slate-50/50 flex flex-col justify-between gap-3 shadow-2xs"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#0F3B82] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[22px]">gavel</span>
                    </div>
                    <div>
                      <h4 className="text-[15px] font-bold text-slate-900">
                        {topic.title}
                      </h4>
                      <p className="text-[12.5px] text-slate-600 mt-1 leading-snug">
                        {topic.summary}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11.5px]">
                    <span className="font-bold text-emerald-700">✓ Regulado por SBS/Indecopi</span>
                    <span className="text-slate-400">Ley 29571</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SALUD FINANCIERA & DIAGNÓSTICO */}
      {activeTab === 'salud' && (
        <div className="flex flex-col gap-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-[20px] font-extrabold text-[#0F172A] tracking-tight">
                  Tu puntuación AlDía
                </h3>
                <p className="text-[13px] text-slate-500">
                  Evaluación basada en puntualidad, carga de endeudamiento y capacidad de ahorro.
                </p>
              </div>

              <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-2xl">
                <span className="text-[32px] font-black text-emerald-700 leading-none">
                  {healthScore.totalScore}
                </span>
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Sobre 100</span>
                  <span className="text-[12.5px] font-bold text-emerald-800">
                    {healthScore.statusText}
                  </span>
                </div>
              </div>
            </div>

            {/* 5 Dimensiones */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                healthScore.breakdown.nivelDeuda,
                healthScore.breakdown.capacidadPago,
                healthScore.breakdown.ahorro,
                healthScore.breakdown.puntualidad,
                healthScore.breakdown.presupuesto,
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[13px] font-bold text-slate-800">{item.label}</span>
                    <span className="text-[12px] font-black text-[#0F3B82]">{item.score}/100</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden mb-2">
                    <div
                      className="h-full bg-emerald-600 rounded-full"
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                  <span className="text-[11.5px] text-slate-500 leading-tight block">
                    {item.detail}
                  </span>
                </div>
              ))}
            </div>

            {/* Recomendaciones de acción */}
            <div>
              <h4 className="text-[15px] font-bold text-slate-900 mb-3">
                Recomendaciones personalizadas
              </h4>
              <div className="space-y-3">
                {healthScore.recommendations.map((rec) => (
                  <div
                    key={rec.id}
                    className="p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white"
                  >
                    <div>
                      <span className="text-[13.5px] font-bold text-slate-900 block">
                        {rec.title}
                      </span>
                      <p className="text-[12.5px] text-slate-600 mt-0.5">
                        {rec.description}
                      </p>
                    </div>
                    {onNavigate && (
                      <button
                        onClick={() => onNavigate(rec.actionTab)}
                        className="px-4 py-2 rounded-xl bg-blue-50 text-[#0F3B82] font-bold text-[12.5px] hover:bg-[#0F3B82] hover:text-white transition-colors shrink-0 cursor-pointer"
                      >
                        {rec.actionLabel}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SIMULADOR DE AHORRO (Inspirado en la pantalla de la referencia PDF) */}
      {activeTab === 'simulador' && (
        <div className="flex flex-col gap-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs flex flex-col gap-6">
            <div>
              <h3 className="text-[20px] font-extrabold text-[#0F172A] tracking-tight">
                Simulador de Ahorro y Crecimiento
              </h3>
              <p className="text-[13px] text-slate-500">
                Calcula cuánto dinero puedes acumular para crear tu fondo de tranquilidad y liquidar deudas.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Formulario de Parámetros */}
              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-[12px] font-bold uppercase text-slate-500 block mb-1.5">
                    Monto inicial (S/)
                  </label>
                  <input
                    type="number"
                    value={initialAmount}
                    onChange={(e) => setInitialAmount(Math.max(0, Number(e.target.value)))}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-[15px] font-bold text-[#0F172A] focus:outline-none focus:border-[#0F3B82]"
                  />
                </div>

                <div>
                  <label className="text-[12px] font-bold uppercase text-slate-500 block mb-1.5">
                    Aporte mensual periódico (S/)
                  </label>
                  <input
                    type="number"
                    value={monthlyContribution}
                    onChange={(e) => setMonthlyContribution(Math.max(0, Number(e.target.value)))}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-[15px] font-bold text-[#0F172A] focus:outline-none focus:border-[#0F3B82]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[12px] font-bold uppercase text-slate-500 block mb-1.5">
                      Plazo (años)
                    </label>
                    <select
                      value={years}
                      onChange={(e) => setYears(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-[14px] font-bold text-[#0F172A] focus:outline-none focus:border-[#0F3B82]"
                    >
                      <option value={1}>1 año (12 meses)</option>
                      <option value={2}>2 años (24 meses)</option>
                      <option value={3}>3 años (36 meses)</option>
                      <option value={5}>5 años (60 meses)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[12px] font-bold uppercase text-slate-500 block mb-1.5">
                      Tasa anual estim. (%)
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      value={annualRate}
                      onChange={(e) => setAnnualRate(Math.max(0, Number(e.target.value)))}
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-[15px] font-bold text-[#0F172A] focus:outline-none focus:border-[#0F3B82]"
                    />
                  </div>
                </div>
              </div>

              {/* Tarjeta de Resultado */}
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-3xl p-6 flex flex-col justify-between gap-5">
                <div>
                  <span className="text-[12px] font-bold uppercase tracking-wider text-emerald-800 block">
                    Monto total proyectado
                  </span>
                  <span className="text-[34px] font-black text-emerald-800 tracking-tight mt-1 block">
                    S/ {savingsCalc.finalAmount.toLocaleString('es-PE')}
                  </span>
                  <p className="text-[12.5px] text-emerald-900/80 mt-1">
                    En {years} años con aportes de S/ {monthlyContribution}/mes.
                  </p>
                </div>

                <div className="space-y-2 pt-3 border-t border-emerald-200/80 text-[13px]">
                  <div className="flex justify-between text-slate-700">
                    <span>Total aportado de tu bolsillo:</span>
                    <span className="font-bold">S/ {savingsCalc.contributed.toLocaleString('es-PE')}</span>
                  </div>
                  <div className="flex justify-between text-emerald-800">
                    <span>Intereses ganados a tu favor:</span>
                    <span className="font-extrabold">+ S/ {savingsCalc.interestEarned.toLocaleString('es-PE')}</span>
                  </div>
                </div>

                <div className="p-3 bg-white/80 rounded-2xl text-[12px] text-slate-600 leading-snug">
                  💡 Tip AlDía: Destinar este fondo a amortizar tu deuda más cara (como tarjetas de crédito) genera un retorno financiero aún mayor al evitar altos intereses.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
