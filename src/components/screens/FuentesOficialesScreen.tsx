import React from 'react';
import { OFFICIAL_SOURCES_DATA } from '../../data/initialData';

export const FuentesOficialesScreen: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <span className="text-[16px]">🔗</span>
          <span className="text-[12px] font-bold uppercase tracking-wider text-[#0F3B82] bg-blue-50 px-2 py-0.5 rounded">
            Entidades Públicas
          </span>
        </div>
        <h1 className="text-[24px] sm:text-[28px] font-bold text-[#0F3B82] tracking-tight">
          Fuentes oficiales del Estado Peruano
        </h1>
        <p className="text-[14px] text-[#5E6E82]">
          Canales y plataformas de las entidades estatales encargadas de la supervisión, regulación y defensa de los usuarios financieros en el Perú.
        </p>
      </div>

      {/* Grid of Sources */}
      <div className="grid grid-cols-1 gap-5">
        {OFFICIAL_SOURCES_DATA.map((source) => (
          <div
            key={source.id}
            className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-7 shadow-xs flex flex-col gap-4"
          >
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#F0F4F9] pb-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#0F3B82]/5 text-[#0F3B82] border border-[#E2E8F0] flex items-center justify-center font-extrabold text-[16px]">
                  {source.name}
                </div>
                <div>
                  <h2 className="text-[18px] font-bold text-[#0F3B82]">
                    {source.name}
                  </h2>
                  <span className="text-[12px] text-[#5E6E82] font-medium block">
                    {source.fullName}
                  </span>
                </div>
              </div>

              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0F3B82] hover:bg-[#0c2f42] text-white text-[12px] sm:text-[13px] font-semibold transition-all shadow-2xs cursor-pointer self-start sm:self-auto"
              >
                <span>Visitar sitio oficial</span>
                <span className="material-symbols-outlined text-[15px]">open_in_new</span>
              </a>
            </div>

            {/* Description */}
            <p className="text-[13px] sm:text-[14px] text-[#1A2B42] leading-relaxed">
              {source.description}
            </p>

            {/* Main Services / Portal Access */}
            <div className="flex flex-col gap-2 pt-1">
              <span className="text-[12px] font-bold uppercase tracking-wider text-[#5E6E82]">
                Servicios y trámites ciudadanos destacados:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {source.services.map((srv, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-3 rounded-xl bg-[#F0F4F9] border border-[#E2E8F0] flex items-center gap-2.5 text-[12px] font-medium text-[#1A2B42]"
                  >
                    <span className="material-symbols-outlined text-[16px] text-[#00B49F]">
                      verified
                    </span>
                    <span>{srv}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Security Recommendation */}
      <div className="p-4.5 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
        <span className="material-symbols-outlined text-[22px] text-[#D99A24] shrink-0 mt-0.5">
          security
        </span>
        <div className="flex flex-col gap-0.5 text-[12px] text-[#1A2B42]">
          <span className="font-bold text-[#92400e]">Consejo de seguridad web:</span>
          <p className="leading-relaxed">
            Verifica siempre que los portales gubernamentales cuenten con el dominio oficial <strong>.gob.pe</strong> o <strong>.sbs.gob.pe</strong> antes de ingresar datos personales en sus trámites en línea.
          </p>
        </div>
      </div>
    </div>
  );
};
