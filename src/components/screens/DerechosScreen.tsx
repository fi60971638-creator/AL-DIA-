import React from 'react';
import { RIGHTS_TOPICS } from '../../data/initialData';

export const DerechosScreen: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <span className="text-[16px]">🛡️</span>
          <span className="text-[12px] font-bold uppercase tracking-wider text-[#0F3D56] bg-blue-50 px-2 py-0.5 rounded">
            Marco Normativo y Protección
          </span>
        </div>
        <h1 className="text-[24px] sm:text-[28px] font-bold text-[#0F3D56] tracking-tight">
          Mis derechos como consumidor financiero
        </h1>
        <p className="text-[14px] text-[#6B7280]">
          La ley peruana y los reglamentos de la SBS e INDECOPI te otorgan derechos fundamentales que las entidades y empresas de cobranza deben respetar.
        </p>
      </div>

      {/* Featured Alert Box: ¿Te están cobrando? */}
      <div className="bg-[#0F3D56] text-white rounded-2xl p-6 sm:p-7 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#149B8A] shrink-0">
            <span className="material-symbols-outlined text-[24px]">gavel</span>
          </div>
          <div className="flex flex-col">
            <h2 className="text-[17px] font-bold text-white">
              ¿Te están cobrando y no sabes qué puedes hacer?
            </h2>
            <p className="text-[13px] text-white/80 leading-snug mt-0.5">
              Conoce los horarios legales, las prohibiciones de cobro a terceros y cómo presentar un reclamo formal ante INDECOPI.
            </p>
          </div>
        </div>

        <a
          href="https://www.gob.pe/indecopi"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#149B8A] hover:bg-[#107d6f] text-white font-semibold text-[13px] transition-all shrink-0 flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
        >
          <span>INDECOPI Reclamos</span>
          <span className="material-symbols-outlined text-[15px]">open_in_new</span>
        </a>
      </div>

      {/* List of Rights Cards */}
      <div className="flex flex-col gap-4">
        {RIGHTS_TOPICS.map((topic, index) => (
          <div
            key={topic.id}
            className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs flex flex-col gap-4"
          >
            {/* Topic Header */}
            <div className="flex items-start gap-3.5 pb-3 border-b border-[#F7F8FA]">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#149B8A] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">
                  {topic.icon}
                </span>
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase text-[#6B7280] block">
                  Derecho #{index + 1}
                </span>
                <h3 className="text-[16px] sm:text-[17px] font-bold text-[#0F3D56]">
                  {topic.title}
                </h3>
              </div>
            </div>

            {/* Topic Summary */}
            <p className="text-[13px] sm:text-[14px] text-[#25313C] leading-relaxed">
              {topic.summary}
            </p>

            {/* Bullet Points */}
            <div className="grid grid-cols-1 gap-2 pt-1">
              {topic.points.map((pt, pIdx) => (
                <div
                  key={pIdx}
                  className="p-3 rounded-xl bg-[#F7F8FA] border border-[#E5E7EB] flex items-start gap-2.5 text-[12px] sm:text-[13px] text-[#25313C]"
                >
                  <span className="material-symbols-outlined text-[16px] text-[#149B8A] shrink-0 mt-0.5">
                    check_circle
                  </span>
                  <span>{pt}</span>
                </div>
              ))}
            </div>

            {/* Legal Basis / Official Source */}
            <div className="pt-2 border-t border-[#F7F8FA] flex items-center justify-between flex-wrap gap-2 text-[12px]">
              <span className="text-[#6B7280]">
                Base normativa: <strong>{topic.officialSourceText}</strong>
              </span>
              <a
                href={topic.officialSourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0F3D56] hover:text-[#149B8A] font-semibold inline-flex items-center gap-1"
              >
                <span>Consultar norma oficial</span>
                <span className="material-symbols-outlined text-[13px]">open_in_new</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
