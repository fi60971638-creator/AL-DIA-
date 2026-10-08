import React, { useState } from 'react';
import { FAQ_DATA } from '../../data/initialData';

export const PreguntasFrecuentesScreen: React.FC = () => {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    'faq-1': true,
    'faq-2': false,
  });
  const [searchTerm, setSearchTerm] = useState('');

  const toggleAccordion = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredFaqs = FAQ_DATA.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <span className="text-[16px]">❓</span>
          <span className="text-[12px] font-bold uppercase tracking-wider text-[#0F3B82] bg-blue-50 px-2 py-0.5 rounded">
            Preguntas Frecuentes
          </span>
        </div>
        <h1 className="text-[24px] sm:text-[28px] font-bold text-[#0F3B82] tracking-tight">
          Respuestas a tus dudas financieras
        </h1>
        <p className="text-[14px] text-[#5E6E82]">
          Información clara y directa sobre los conceptos, derechos y situaciones más comunes.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <span className="material-symbols-outlined absolute left-3.5 top-3 text-[#5E6E82] text-[20px]">
          search
        </span>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Escribe tu consulta o palabra clave..."
          className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-white border border-[#E2E8F0] text-[14px] text-[#1A2B42] focus:outline-none focus:border-[#0F3B82] shadow-2xs"
        />
      </div>

      {/* Accordion List */}
      <div className="flex flex-col gap-2.5">
        {filteredFaqs.map((faq, index) => {
          const isOpen = !!openIds[faq.id];
          return (
            <div
              key={faq.id}
              className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden transition-all shadow-2xs"
            >
              <button
                type="button"
                onClick={() => toggleAccordion(faq.id)}
                className="w-full p-4 sm:p-4.5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#F0F4F9] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#0F3B82]/5 text-[#0F3B82] text-[12px] font-bold flex items-center justify-center shrink-0">
                    {index + 1}
                  </span>
                  <span className="font-bold text-[14px] sm:text-[15px] text-[#0F3B82]">
                    {faq.question}
                  </span>
                </div>

                <span
                  className={`material-symbols-outlined text-[20px] text-[#5E6E82] transition-transform duration-200 shrink-0 ${
                    isOpen ? 'rotate-180 text-[#0F3B82]' : ''
                  }`}
                >
                  expand_more
                </span>
              </button>

              {isOpen && (
                <div className="px-4 pb-4.5 pt-1 sm:px-4.5 border-t border-[#F0F4F9] bg-white">
                  <div className="p-4 rounded-xl bg-[#F0F4F9] border border-[#E2E8F0] text-[13px] sm:text-[14px] text-[#1A2B42] leading-relaxed">
                    {faq.answer}
                  </div>
                  {faq.category && (
                    <div className="pt-2 flex justify-end">
                      <span className="text-[11px] font-medium text-[#5E6E82] bg-white border border-[#E2E8F0] px-2 py-0.5 rounded">
                        Categoría: {faq.category}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {filteredFaqs.length === 0 && (
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-8 text-center text-[#5E6E82] text-[14px]">
            No encontramos respuestas para "{searchTerm}". Intenta buscar con otros términos como "TCEA", "Mora" o "Cobranza".
          </div>
        )}
      </div>
    </div>
  );
};
