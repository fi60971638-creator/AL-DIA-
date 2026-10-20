import React from 'react';
import { SecurityTopic } from '../../data/securityData';

interface SecurityTopicModalProps {
  topic: SecurityTopic | null;
  onClose: () => void;
}

export const SecurityTopicModal: React.FC<SecurityTopicModalProps> = ({ topic, onClose }) => {
  if (!topic) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs fade-in">
      {/* Backdrop */}
      <div onClick={onClose} className="fixed inset-0" />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-3xl w-full max-w-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] text-slate-800 z-10 text-left">
        {/* Header Bar */}
        <div className="px-5 sm:px-6 py-4 border-b border-slate-200/90 flex items-center justify-between bg-slate-50/90 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#0B3B60] text-white flex items-center justify-center shrink-0 shadow-xs">
              <span className="material-symbols-outlined text-[20px] text-[#00A3E0]">
                {topic.icon}
              </span>
            </div>
            <div>
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${topic.badgeColor}`}>
                {topic.badge}
              </span>
              <span className="ml-2 text-slate-400 text-[11px] font-medium hidden sm:inline">
                {topic.category}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Cerrar modal"
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 sm:p-8 overflow-y-auto flex flex-col gap-6">
          {/* Title & Short Description */}
          <div>
            <h2 className="text-[22px] sm:text-[26px] font-extrabold text-[#0B3B60] tracking-tight leading-snug font-heading">
              {topic.title}
            </h2>
            <p className="text-[14px] sm:text-[15px] text-slate-600 mt-2 leading-relaxed">
              {topic.shortDesc}
            </p>
          </div>

          {/* Key Rule Highlight Banner */}
          <div className="p-4 rounded-2xl bg-sky-50/80 border border-sky-200 flex items-start gap-3">
            <span className="material-symbols-outlined text-[24px] text-[#007EAF] shrink-0 mt-0.5">
              shield
            </span>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#007EAF] block mb-0.5">
                Regla de Oro de Seguridad
              </span>
              <p className="text-[13.5px] font-bold text-[#0B3B60] leading-snug">
                {topic.keyRule}
              </p>
            </div>
          </div>

          {/* 1. Focos Rojos: Señales de Alerta */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-rose-900 font-bold text-[14px] font-heading">
              <span className="material-symbols-outlined text-[20px] text-rose-600">
                warning
              </span>
              <span>Señales de alerta (Focos rojos a detectar)</span>
            </div>
            <div className="grid grid-cols-1 gap-2.5">
              {topic.alertSignals.map((signal, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-rose-50/50 border border-rose-200/70 text-[13px] text-rose-950 flex items-start gap-2.5"
                >
                  <span className="material-symbols-outlined text-[17px] text-rose-600 shrink-0 mt-0.5">
                    cancel
                  </span>
                  <span className="leading-relaxed">{signal}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Recomendaciones Paso a Paso */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-[#0B3B60] font-bold text-[14px] font-heading">
              <span className="material-symbols-outlined text-[20px] text-[#00A3E0]">
                checklist
              </span>
              <span>Recomendaciones paso a paso</span>
            </div>
            <div className="flex flex-col gap-2.5">
              {topic.stepByStep.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-[13px] text-slate-700">
                  <span className="w-5 h-5 rounded-full bg-[#0B3B60] text-white flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5 shadow-2xs">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Ejemplo Cotidiano Peruano */}
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 border border-amber-200 text-slate-800 flex flex-col gap-2.5">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-[13.5px] font-heading">
              <span className="material-symbols-outlined text-[20px] text-amber-600">
                person_pin_circle
              </span>
              <span>Ejemplo cotidiano peruano: {topic.ejemploPeruano.titulo}</span>
            </div>
            <p className="text-[13px] text-amber-950 leading-relaxed">
              {topic.ejemploPeruano.situacion}
            </p>
            <div className="p-3 rounded-xl bg-white border border-amber-200/80 text-[12.5px] text-emerald-900 flex items-start gap-2">
              <span className="material-symbols-outlined text-[18px] text-emerald-600 shrink-0 mt-0.5">
                verified
              </span>
              <div className="leading-relaxed">
                <strong className="block font-heading text-emerald-800">Desenlace seguro aplicado:</strong>
                {topic.ejemploPeruano.desenlaceSeguro}
              </div>
            </div>
          </div>

          {/* 4. Consejo de Seguridad AL DÍA */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-sky-50 via-blue-50 to-sky-50 border border-sky-200 text-[#0B3B60] flex items-start gap-3 shadow-2xs">
            <span className="material-symbols-outlined text-[24px] text-[#00A3E0] shrink-0 mt-0.5">
              lightbulb
            </span>
            <div className="text-[13.5px] leading-relaxed">
              <strong className="font-heading font-bold block mb-1 text-[#0B3B60]">
                Consejo AL DÍA:
              </strong>
              {topic.consejoAlDia}
            </div>
          </div>

          {/* 5. Fuente Oficial Verificada */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-[#007EAF]">
                verified
              </span>
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Fuente oficial del Estado Peruano
                </span>
                <span className="text-[13px] font-bold text-[#0B3B60]">
                  {topic.fuenteOficialNombre}
                </span>
              </div>
            </div>

            <a
              href={topic.fuenteOficialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-white hover:bg-[#0B3B60] text-[#0B3B60] hover:text-white border border-slate-200 hover:border-[#0B3B60] font-heading font-semibold text-[12.5px] transition-colors flex items-center gap-1.5 cursor-pointer shrink-0 shadow-2xs"
            >
              <span>Consultar fuente oficial</span>
              <span className="material-symbols-outlined text-[16px]">open_in_new</span>
            </a>
          </div>
        </div>

        {/* Footer Bar */}
        <div className="px-5 sm:px-6 py-3.5 border-t border-slate-200 flex items-center justify-between bg-slate-50/90 shrink-0">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-1 text-[13px] font-bold text-slate-600 hover:text-[#0B3B60] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Volver al Centro de Seguridad</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-[13px] font-bold bg-[#0B3B60] hover:bg-[#082E4D] text-white shadow-xs transition-colors cursor-pointer"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
