import React, { useState } from 'react';
import {
  ADVISORY_RESPONSES,
  FAQ_DATA,
  OFFICIAL_SOURCES_DATA,
} from '../../data/initialData';
import { AdvisoryResult, TabType } from '../../types';

interface OrientacionScreenProps {
  onNavigate?: (tab: TabType) => void;
}

export const OrientacionScreen: React.FC<OrientacionScreenProps> = () => {
  const [activeTab, setActiveTab] = useState<'situaciones' | 'faq' | 'canales'>('situaciones');

  // Situaciones interactivas
  const [selectedSituationKey, setSelectedSituationKey] = useState<string>('no-puedo-pagar');
  const [result, setResult] = useState<AdvisoryResult | null>(ADVISORY_RESPONSES['no-puedo-pagar']);

  // Estado para acordeón de FAQs
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

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

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto pb-14 fade-in">
      {/* 1. Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col gap-2.5 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-[#0B3B60] text-[12px] font-bold border border-sky-200 w-fit">
            <span className="material-symbols-outlined text-[16px] text-[#00A3E0]">lightbulb</span>
            <span>Orientación Financiera aldia</span>
          </div>
          <h1 className="text-[26px] sm:text-[32px] font-extrabold text-[#0B3B60] tracking-tight leading-tight">
            Guía clara para tus créditos y pagos
          </h1>
          <p className="text-[14px] sm:text-[15.5px] text-slate-600 leading-relaxed font-normal">
            Aprende cómo actuar ante dificultades en los pagos, cómo comunicarte formalmente con tu entidad financiera, evitar cobros indebidos y ejercer tus derechos como consumidor financiero.
          </p>
        </div>

        <div className="hidden sm:flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center w-48 shrink-0">
          <span className="material-symbols-outlined text-[36px] text-[#007EAF] mb-1">
            support_agent
          </span>
          <span className="text-[13px] font-bold text-[#0B3B60]">
            Orientación Gratuita
          </span>
          <span className="text-[11px] text-slate-500 mt-0.5">
            100% Pedagógica
          </span>
        </div>
      </div>

      {/* 2. Selector de Pestañas Visuales */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        {[
          { id: 'situaciones', label: 'Situaciones y soluciones', icon: 'tips_and_updates' },
          { id: 'faq', label: 'Preguntas frecuentes', icon: 'help_outline' },
          { id: 'canales', label: 'Canales oficiales y reclamos', icon: 'gavel' },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-[13.5px] font-bold transition-all flex items-center gap-2 cursor-pointer ${
                isActive
                  ? 'bg-[#0B3B60] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-[#0B3B60] hover:bg-slate-50 border border-slate-200'
              }`}
            >
              <span
                className="material-symbols-outlined text-[19px]"
                style={{ color: isActive ? '#00A3E0' : '#64748B' }}
              >
                {tab.icon}
              </span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: SITUACIONES Y SOLUCIONES */}
      {activeTab === 'situaciones' && (
        <div className="flex flex-col gap-6 fade-in">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs flex flex-col gap-3">
            <h2 className="text-[18px] font-extrabold text-[#0B3B60] tracking-tight">
              ¿Qué situación estás afrontando?
            </h2>
            <p className="text-[13px] text-slate-500">
              Elige una consulta frecuente para ver el análisis, los pasos recomendados y qué debes evitar hacer:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
              {situationsList.map((sit) => {
                const isSelected = selectedSituationKey === sit.key;
                return (
                  <button
                    key={sit.key}
                    onClick={() => handleSelectSituation(sit.key)}
                    className={`p-3.5 rounded-2xl border text-left transition-all flex items-center gap-3 cursor-pointer ${
                      isSelected
                        ? 'border-[#00A3E0] bg-sky-50/70 text-[#0B3B60] font-bold shadow-xs'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span
                      className="material-symbols-outlined text-[22px] shrink-0"
                      style={{ color: isSelected ? '#007EAF' : '#64748B' }}
                    >
                      {sit.icon}
                    </span>
                    <span className="text-[13px] font-bold leading-snug">
                      {sit.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Resultado de la Orientación */}
          {result && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col gap-6">
              <div className="flex items-start gap-4 pb-4 border-b border-slate-100">
                <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-200 text-[#007EAF] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[28px]">verified</span>
                </div>
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#0B3B60] bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
                    Ruta orientativa aldia
                  </span>
                  <h3 className="text-[20px] sm:text-[22px] font-extrabold text-[#0B3B60] mt-1.5 tracking-tight">
                    {result.title}
                  </h3>
                </div>
              </div>

              {/* 1. Qué significa esto */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[11.5px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                  1. Diagnóstico de la situación
                </span>
                <p className="text-[13.5px] sm:text-[14px] text-slate-800 leading-relaxed font-normal">
                  {result.whatItMeans}
                </p>
              </div>

              {/* 2. Qué revisar antes de actuar */}
              {result.whatToCheck && result.whatToCheck.length > 0 && (
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[11.5px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
                    2. Qué debes verificar primero
                  </span>
                  <ul className="space-y-1.5 text-[13px] text-slate-800">
                    {result.whatToCheck.map((chk, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-[16px] text-[#007EAF] shrink-0 mt-0.5">
                          check
                        </span>
                        <span>{chk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 3. Pasos recomendados */}
              <div>
                <span className="text-[12px] font-bold uppercase tracking-wider text-slate-500 block mb-3">
                  3. Pasos recomendados a seguir
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {result.whatToDo.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl border border-slate-200 bg-white shadow-xs flex items-start gap-3"
                    >
                      <span className="w-6 h-6 rounded-full bg-[#0B3B60] text-white text-[12px] font-black flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span className="text-[13px] font-medium text-slate-800 leading-snug">
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Consejo Clave vs Qué evitar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-sky-50/80 border border-sky-200">
                  <span className="text-[12px] font-bold uppercase tracking-wider text-[#0B3B60] flex items-center gap-1.5 mb-2">
                    <span className="material-symbols-outlined text-[18px] text-[#007EAF]">check_circle</span>
                    <span>Consejo clave aldia</span>
                  </span>
                  <p className="text-[13px] text-[#0B3B60] leading-relaxed font-medium">
                    {result.advice}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200">
                  <span className="text-[12px] font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5 mb-2">
                    <span className="material-symbols-outlined text-[18px] text-amber-700">warning</span>
                    <span>Qué debes evitar</span>
                  </span>
                  <ul className="text-[13px] text-amber-950 leading-relaxed space-y-1.5 font-medium">
                    {result.whatToAvoid.map((avoid, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-amber-600 font-bold">•</span>
                        <span>{avoid}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Pie con fuente oficial */}
              <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100 text-[12px] text-slate-500">
                <span>
                  Marco normativo referencial:{' '}
                  <strong className="text-slate-800">{result.officialSource.name}</strong>
                </span>
                <a
                  href={result.officialSource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#0B3B60] hover:bg-[#082E4D] text-white font-bold transition-colors inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Portal oficial</span>
                  <span className="material-symbols-outlined text-[15px]">open_in_new</span>
                </a>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: PREGUNTAS FRECUENTES DESPLEGABLES */}
      {activeTab === 'faq' && (
        <div className="flex flex-col gap-4 fade-in">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs flex flex-col gap-2">
            <h2 className="text-[18px] font-extrabold text-[#0B3B60] tracking-tight">
              Preguntas frecuentes sobre créditos, mora y cobranzas
            </h2>
            <p className="text-[13px] text-slate-500">
              Respuestas fundamentadas en la regulación peruana de la SBS e INDECOPI para resolver las dudas más comunes.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {FAQ_DATA.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-2 h-2 rounded-full bg-[#00A3E0] shrink-0" />
                      <span className="text-[14.5px] sm:text-[15.5px] font-bold text-[#0B3B60] leading-snug">
                        {faq.question}
                      </span>
                    </div>
                    <span
                      className={`material-symbols-outlined text-[20px] text-[#007EAF] shrink-0 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    >
                      expand_more
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-[13.5px] text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/60 fade-in">
                      <p className="pt-2">{faq.answer}</p>
                      <div className="mt-3 flex items-center gap-2 text-[11.5px] text-[#0B3B60] font-bold">
                        <span className="material-symbols-outlined text-[15px] text-[#00A3E0]">verified</span>
                        <span>Categoría: {faq.category}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: CANALES OFICIALES Y RECLAMOS */}
      {activeTab === 'canales' && (
        <div className="flex flex-col gap-6 fade-in">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs flex flex-col gap-2">
            <h2 className="text-[18px] font-extrabold text-[#0B3B60] tracking-tight">
              Canales oficiales de orientación, supervisión y reclamos
            </h2>
            <p className="text-[13px] text-slate-500">
              Si tienes problemas con una entidad financiera o agencia de cobranza, estos son los canales oficiales del Estado Peruano a los que puedes acudir de forma gratuita.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {OFFICIAL_SOURCES_DATA.map((src) => (
              <div
                key={src.id}
                className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs flex flex-col justify-between gap-4"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="text-[18px] font-extrabold text-[#0B3B60]">{src.name}</span>
                    <span className="material-symbols-outlined text-[18px] text-slate-400">
                      account_balance
                    </span>
                  </div>
                  <h4 className="text-[13.5px] font-bold text-[#0B3B60] mt-2 leading-snug">
                    {src.fullName}
                  </h4>
                  <p className="text-[12px] text-slate-600 mt-1.5 leading-relaxed">
                    {src.description}
                  </p>

                  <div className="mt-3.5 flex flex-col gap-1.5 text-[11.5px] text-slate-700">
                    <span className="font-bold text-[#0B3B60] uppercase text-[10px] tracking-wider">
                      Servicios destacados:
                    </span>
                    {src.services.map((srv, i) => (
                      <div key={i} className="flex items-start gap-1.5">
                        <span className="material-symbols-outlined text-[13px] text-[#00A3E0] shrink-0 mt-0.5">
                          check_circle
                        </span>
                        <span className="leading-tight">{srv}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-[#0B3B60] hover:bg-[#082E4D] text-white text-[12.5px] font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Visitar sitio oficial</span>
                  <span className="material-symbols-outlined text-[15px]">open_in_new</span>
                </a>
              </div>
            ))}
          </div>

          {/* Caja explicativa de cómo reclamar */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs flex flex-col gap-3">
            <div className="flex items-center gap-2 text-[#0B3B60]">
              <span className="material-symbols-outlined text-[20px] text-[#00A3E0]">receipt_long</span>
              <h3 className="text-[15px] font-extrabold text-[#0B3B60]">
                ¿Cómo presentar un reclamo formal correctamente?
              </h3>
            </div>
            <p className="text-[13px] text-slate-600 leading-relaxed font-normal">
              1. <strong>Libro de Reclamaciones:</strong> Solicítalo primero en la propia entidad financiera (físico o digital). La entidad tiene un plazo legal máximo de <strong>15 días hábiles</strong> para responderte. Guarda tu número de reclamo.
              <br /><br />
              2. <strong>Si no te responden o no estás conforme:</strong> Acude a <strong>Reclama Virtual de INDECOPI</strong> (reclamos.gob.pe) o a la plataforma de atención ciudadana de la <strong>SBS</strong>.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
