import React, { useState, useEffect } from 'react';
import { SITUATIONS_DATA } from '../../data/initialData';
import { SituationId } from '../../types';

interface SituacionesScreenProps {
  selectedSituationId?: SituationId;
  onSelectSituation?: (id: SituationId) => void;
}

export const SituacionesScreen: React.FC<SituacionesScreenProps> = ({
  selectedSituationId = 'no-puedo-pagar',
  onSelectSituation,
}) => {
  const [currentId, setCurrentId] = useState<SituationId>(selectedSituationId);

  useEffect(() => {
    if (selectedSituationId) {
      setCurrentId(selectedSituationId);
    }
  }, [selectedSituationId]);

  const handleSelect = (id: SituationId) => {
    setCurrentId(id);
    if (onSelectSituation) {
      onSelectSituation(id);
    }
  };

  const currentSituation =
    SITUATIONS_DATA.find((s) => s.id === currentId) || SITUATIONS_DATA[0];

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <span className="text-[12px] font-bold uppercase tracking-wider text-[#149B8A] bg-emerald-50 px-2 py-0.5 rounded">
            Guía de orientación
          </span>
        </div>
        <h1 className="text-[24px] sm:text-[28px] font-bold text-[#0F3D56] tracking-tight">
          ¿Qué situación tienes?
        </h1>
        <p className="text-[14px] text-[#6B7280]">
          Selecciona una situación para conocer su significado, qué pasos puedes dar y qué acciones debes evitar.
        </p>
      </div>

      {/* Situation Selector Buttons (Horizontal Scroll / Grid) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {SITUATIONS_DATA.map((item) => {
          const isSelected = item.id === currentId;
          return (
            <button
              key={item.id}
              onClick={() => handleSelect(item.id)}
              className={`p-3 rounded-xl border text-left flex flex-col justify-between gap-2 transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#0F3D56] text-white border-[#0F3D56] shadow-sm font-semibold'
                  : 'bg-white text-[#25313C] border-[#E5E7EB] hover:border-[#0F3D56]/50 hover:bg-[#F7F8FA]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">
                {item.icon}
              </span>
              <span className="text-[12px] leading-tight font-medium">
                {item.homeTitle}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Situation Card Detail */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col gap-6">
        {/* Situation Header */}
        <div className="flex items-start gap-4 pb-5 border-b border-[#E5E7EB]">
          <div className="w-12 h-12 rounded-xl bg-[#F7F8FA] border border-[#E5E7EB] flex items-center justify-center text-[#0F3D56] shrink-0">
            <span className="material-symbols-outlined text-[28px]">
              {currentSituation.icon}
            </span>
          </div>

          <div className="flex flex-col min-w-0">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280]">
              Orientación financiera
            </span>
            <h2 className="text-[22px] sm:text-[24px] font-bold text-[#0F3D56] tracking-tight leading-snug">
              {currentSituation.title}
            </h2>
            <p className="text-[13px] sm:text-[14px] text-[#6B7280] mt-0.5">
              {currentSituation.subtitle}
            </p>
          </div>
        </div>

        {/* 1. ¿Qué significa? */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#0F3D56]">
              help_outline
            </span>
            <h3 className="text-[16px] font-bold text-[#0F3D56]">
              ¿Qué significa?
            </h3>
          </div>
          <p className="text-[14px] text-[#25313C] leading-relaxed bg-[#F7F8FA] p-4 rounded-xl border border-[#E5E7EB]">
            {currentSituation.meaning}
          </p>
        </div>

        {/* 2. ¿Qué puedes hacer? */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#149B8A]">
              check_circle
            </span>
            <h3 className="text-[16px] font-bold text-[#0F3D56]">
              ¿Qué puedes hacer?
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-2.5">
            {currentSituation.whatCanYouDo.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-[#E5E7EB]"
              >
                <span className="w-6 h-6 rounded-full bg-emerald-50 text-[#149B8A] font-bold text-[12px] flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="text-[13px] sm:text-[14px] text-[#25313C] leading-relaxed">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 3. ¿Qué deberías evitar? */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#D64545]">
              cancel
            </span>
            <h3 className="text-[16px] font-bold text-[#0F3D56]">
              ¿Qué deberías evitar?
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-2.5">
            {currentSituation.whatToAvoid.map((avoid, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-red-50/40 border border-red-100"
              >
                <span className="material-symbols-outlined text-[18px] text-[#D64545] shrink-0 mt-0.5">
                  warning
                </span>
                <span className="text-[13px] sm:text-[14px] text-[#25313C] leading-relaxed">
                  {avoid}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Consejo práctico */}
        <div className="p-4.5 rounded-xl bg-amber-50/60 border border-amber-200/80 flex items-start gap-3.5">
          <span className="material-symbols-outlined text-[22px] text-[#D99A24] shrink-0 mt-0.5">
            lightbulb
          </span>
          <div className="flex flex-col gap-1">
            <span className="text-[12px] font-bold uppercase tracking-wider text-[#92400e]">
              Consejo práctico
            </span>
            <p className="text-[13px] sm:text-[14px] text-[#25313C] font-medium leading-relaxed">
              {currentSituation.practicalAdvice}
            </p>
          </div>
        </div>

        {/* 5. Fuente oficial */}
        <div className="pt-4 border-t border-[#E5E7EB] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#F7F8FA] p-4 rounded-xl">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[20px] text-[#0F3D56]">
              verified
            </span>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280] block">
                Fuente oficial
              </span>
              <span className="text-[13px] font-semibold text-[#0F3D56]">
                {currentSituation.officialSource.name}
              </span>
            </div>
          </div>

          <a
            href={currentSituation.officialSource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white border border-[#E5E7EB] text-[#0F3D56] hover:bg-[#0F3D56] hover:text-white text-[12px] font-semibold transition-all cursor-pointer"
          >
            <span>Consultar portal oficial</span>
            <span className="material-symbols-outlined text-[14px]">open_in_new</span>
          </a>
        </div>
      </div>
    </div>
  );
};
