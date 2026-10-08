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
          <span className="text-[12px] font-bold uppercase tracking-wider text-[#009688] bg-[#E6F7F5] px-2.5 py-0.5 rounded">
            Guía de orientación
          </span>
        </div>
        <h1 className="text-[26px] sm:text-[30px] font-extrabold text-[#0F3B82] tracking-tight">
          ¿Qué situación tienes?
        </h1>
        <p className="text-[14px] text-[#5E6E82]">
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
              className={`p-3 rounded-xl border text-left flex flex-col justify-between gap-2.5 transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#0F3B82] text-white border-[#0F3B82] shadow-sm font-semibold'
                  : 'bg-white text-[#1A2B42] border-[#E2E8F0] hover:border-[#0F3B82]/50 hover:bg-[#F0F4F9]'
              }`}
            >
              <span className="material-symbols-outlined text-[24px]">
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
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col gap-6">
        {/* Situation Header con Icono Grande */}
        <div className="flex items-start gap-4 pb-5 border-b border-[#E2E8F0]">
          <div className="w-16 h-16 rounded-2xl bg-[#E6F7F5] border border-[#B2ECE4] flex items-center justify-center text-[#00B49F] shrink-0 shadow-2xs">
            <span className="material-symbols-outlined text-[36px]">
              {currentSituation.icon}
            </span>
          </div>

          <div className="flex flex-col min-w-0">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#5E6E82]">
              Orientación financiera
            </span>
            <h2 className="text-[22px] sm:text-[25px] font-extrabold text-[#0F3B82] tracking-tight leading-snug">
              {currentSituation.title}
            </h2>
            <p className="text-[13px] sm:text-[14px] text-[#5E6E82] mt-0.5">
              {currentSituation.subtitle}
            </p>
          </div>
        </div>

        {/* 1. ¿Qué significa? */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[22px] text-[#0F3B82]">
              help_outline
            </span>
            <h3 className="text-[16px] font-bold text-[#0F3B82]">
              ¿Qué significa?
            </h3>
          </div>
          <p className="text-[14px] text-[#1A2B42] leading-relaxed bg-[#F0F4F9] p-4.5 rounded-xl border border-[#E2E8F0]">
            {currentSituation.meaning}
          </p>
        </div>

        {/* 2. ¿Qué puedes hacer? */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[22px] text-[#00B49F]">
              check_circle
            </span>
            <h3 className="text-[16px] font-bold text-[#0F3B82]">
              ¿Qué puedes hacer?
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-2.5">
            {currentSituation.whatCanYouDo.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-[#E2E8F0] shadow-2xs"
              >
                <span className="w-6 h-6 rounded-full bg-[#E6F7F5] text-[#009688] font-bold text-[12px] flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="text-[13px] sm:text-[14px] text-[#1A2B42] leading-relaxed">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 3. ¿Qué deberías evitar? */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[22px] text-[#D64545]">
              cancel
            </span>
            <h3 className="text-[16px] font-bold text-[#0F3B82]">
              ¿Qué deberías evitar?
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-2.5">
            {currentSituation.whatToAvoid.map((avoid, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-rose-50/50 border border-rose-100"
              >
                <span className="material-symbols-outlined text-[18px] text-[#D64545] shrink-0 mt-0.5">
                  warning
                </span>
                <span className="text-[13px] sm:text-[14px] text-[#1A2B42] leading-relaxed">
                  {avoid}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Consejo práctico */}
        <div className="p-4.5 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3.5">
          <span className="material-symbols-outlined text-[24px] text-[#D99A24] shrink-0 mt-0.5">
            lightbulb
          </span>
          <div className="flex flex-col gap-1">
            <span className="text-[12px] font-bold uppercase tracking-wider text-[#92400e]">
              Consejo práctico
            </span>
            <p className="text-[13px] sm:text-[14px] text-[#1A2B42] font-medium leading-relaxed">
              {currentSituation.practicalAdvice}
            </p>
          </div>
        </div>

        {/* 5. Fuente oficial */}
        <div className="pt-4 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#F0F4F9] p-4 rounded-xl border border-[#E2E8F0]">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[20px] text-[#0F3B82]">
              verified
            </span>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#5E6E82] block">
                Fuente oficial
              </span>
              <span className="text-[13px] font-semibold text-[#0F3B82]">
                {currentSituation.officialSource.name}
              </span>
            </div>
          </div>

          <a
            href={currentSituation.officialSource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-[#E2E8F0] text-[#0F3B82] hover:bg-[#0F3B82] hover:text-white text-[12px] font-bold transition-all cursor-pointer shadow-2xs"
          >
            <span>Consultar portal oficial</span>
            <span className="material-symbols-outlined text-[14px]">open_in_new</span>
          </a>
        </div>
      </div>
    </div>
  );
};
