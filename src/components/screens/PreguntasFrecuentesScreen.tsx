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
          <span className="text-[12px] font-bold uppercase tracking-wider text-[#0F3D56] bg-blue-50 px-2 py-0.5 rounded">
            Preguntas Frecuentes
          </span>
        </div>
        <h1 className="text-[24px] sm:text-[28px] font-bold text-[#0F3D56] tracking-tight">
          Respuestas a tus dudas financieras
        </h1>
        <p className="text-[14px] text-[#6B7280]">
          Información clara y directa sobre los conceptos, derechos y situaciones más comunes.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <span className="material-symbols-outlined absolute left-3.5 top-3 text-[#6B7280] text-[20px]">
          search
        </span>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Escribe tu consulta o palabra clave..."
          className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-white border border-[#E5E7EB] text-[14px] text-[#25313C] focus:outline-none focus:border-[#0F3D56] shadow-2xs"
        />
      </div>

      {/* Accordion List */}
      <div className="flex flex-col gap-2.5">
        {filteredFaqs.map((faq, index) => {
          const isOpen = !!openIds[faq.id];
          return (
            <div
              key={faq.id}
              className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden transition-all shadow-2xs"
            >
              <button
                type="button"
                onClick={() => toggleAccordion(faq.id)}
                className="w-full p-4 sm:p-4.5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#F7F8FA] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#0F3D56]/5 text-[#0F3D56] text-[12px] font-bold flex items-center justify-center shrink-0">
                    {index + 1}
                  </span>
                  <span className="font-bold text-[14px] sm:text-[15px] text-[#0F3D56]">
                    {faq.question}
                  </span>
                </div>

                <span
                  className={`material-symbols-outlined text-[20px] text-[#6B7280] transition-transform duration-200 shrink-0 ${
                    isOpen ? 'rotate-180 text-[#0F3D56]' : ''
                  }`}
                >
                  expand_more
                </span>
              </button>

              {isOpen && (
                <div className="px-4 pb-4.5 pt-1 sm:px-4.5 border-t border-[#F7F8FA] bg-white">
                  <div className="p-4 rounded-xl bg-[#F7F8FA] border border-[#E5E7EB] text-[13px] sm:text-[14px] text-[#25313C] leading-relaxed">
                    {faq.answer}
                  </div>
                  {faq.category && (
                    <div className="pt-2 flex justify-end">
                      <span className="text-[11px] font-medium text-[#6B7280] bg-white border border-[#E5E7EB] px-2 py-0.5 rounded">
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
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8 text-center text-[#6B7280] text-[14px]">
            No encontramos respuestas para "{searchTerm}". Intenta buscar con otros términos como "TCEA", "Mora" o "Cobranza".
          </div>
        )}
      </div>
    </div>
  );
};
