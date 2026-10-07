import React, { useState } from 'react';
import { PRACTICAL_CASES } from '../../data/initialData';

export const CasosPracticosScreen: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  const handleSelectOption = (caseId: string, optionId: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [caseId]: optionId,
    }));
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <span className="text-[16px]">💡</span>
          <span className="text-[12px] font-bold uppercase tracking-wider text-[#0F3D56] bg-blue-50 px-2 py-0.5 rounded">
            Casos de la Vida Real
          </span>
        </div>
        <h1 className="text-[24px] sm:text-[28px] font-bold text-[#0F3D56] tracking-tight">
          ¿Qué harías tú?
        </h1>
        <p className="text-[14px] text-[#6B7280]">
          Analiza situaciones cotidianas sobre créditos, cobranzas y pagos. Selecciona una alternativa y descubre la recomendación adecuada.
        </p>
      </div>

      {/* List of Practical Cases */}
      <div className="flex flex-col gap-5">
        {PRACTICAL_CASES.map((item, index) => {
          const currentSelection = selectedOptions[item.id];
          const selectedOptionObj = item.options.find((opt) => opt.id === currentSelection);

          return (
            <div
              key={item.id}
              className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-7 shadow-xs flex flex-col gap-4"
            >
              {/* Header */}
              <div className="flex items-center justify-between gap-2 border-b border-[#F7F8FA] pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#0F3D56] text-white flex items-center justify-center font-bold text-[13px]">
                    {index + 1}
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase text-[#6B7280] block">
                      Caso práctico #{index + 1}
                    </span>
                    <h2 className="text-[16px] sm:text-[17px] font-bold text-[#0F3D56]">
                      {item.title}
                    </h2>
                  </div>
                </div>
              </div>

              {/* Situation Description */}
              <div className="p-4 rounded-xl bg-[#F7F8FA] border border-[#E5E7EB] text-[13px] sm:text-[14px] text-[#25313C] leading-relaxed">
                {item.situation}
              </div>

              {/* Question */}
              <div className="flex flex-col gap-2.5 pt-1">
                <span className="font-bold text-[14px] text-[#0F3D56] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px]">help_outline</span>
                  <span>{item.question}</span>
                </span>

                {/* Options */}
                <div className="flex flex-col gap-2">
                  {item.options.map((opt) => {
                    const isPicked = currentSelection === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleSelectOption(item.id, opt.id)}
                        className={`p-3.5 rounded-xl border text-left text-[13px] leading-relaxed transition-all cursor-pointer flex items-start gap-3 ${
                          isPicked
                            ? opt.isRecommended
                              ? 'bg-emerald-50 border-[#149B8A] text-[#0F3D56] font-medium'
                              : 'bg-red-50 border-[#D64545] text-[#25313C]'
                            : 'bg-white border-[#E5E7EB] text-[#25313C] hover:bg-[#F7F8FA] hover:border-[#0F3D56]/40'
                        }`}
                      >
                        <span
                          className={`w-5 h-5 rounded-full border flex items-center justify-center text-[11px] shrink-0 mt-0.5 ${
                            isPicked
                              ? opt.isRecommended
                                ? 'border-[#149B8A] bg-[#149B8A] text-white font-bold'
                                : 'border-[#D64545] bg-[#D64545] text-white font-bold'
                              : 'border-[#6B7280] text-[#6B7280]'
                          }`}
                        >
                          {isPicked ? (opt.isRecommended ? '✓' : '✕') : ''}
                        </span>
                        <span>{opt.text}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Interactive Feedback & Explanation */}
              {selectedOptionObj && (
                <div
                  className={`p-4 rounded-xl border flex flex-col gap-2 animate-fadeIn ${
                    selectedOptionObj.isRecommended
                      ? 'bg-emerald-50/70 border-emerald-200 text-[#0F3D56]'
                      : 'bg-amber-50/70 border-amber-200 text-[#25313C]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[20px]">
                      {selectedOptionObj.isRecommended ? 'check_circle' : 'info'}
                    </span>
                    <span className="font-bold text-[13px] uppercase tracking-wider">
                      {selectedOptionObj.isRecommended
                        ? 'Respuesta recomendada'
                        : 'Recomendación alternativa'}
                    </span>
                  </div>

                  <p className="text-[13px] leading-relaxed">
                    {selectedOptionObj.feedback}
                  </p>

                  <div className="pt-2 border-t border-black/5 text-[12px] text-[#6B7280] font-medium">
                    <strong>Conclusión educativa:</strong> {item.educationalTakeaway}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
