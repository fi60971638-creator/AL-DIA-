import React from 'react';
import { EducationalArticle } from '../../types';

interface ArticleModalProps {
  article: EducationalArticle | null;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose }) => {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs fade-in">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] text-slate-800">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2 text-slate-500 text-[12px] font-semibold">
            <span className="text-[#007EAF] font-bold">{article.category}</span>
            <span>·</span>
            <span>{article.readTime}</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto flex flex-col gap-6">
          <div>
            <h2 className="text-[22px] sm:text-[25px] font-extrabold text-[#0B3B60] tracking-tight leading-snug font-heading">
              {article.title}
            </h2>
            <p className="text-[14px] sm:text-[15px] text-slate-600 mt-2 leading-relaxed">
              {article.summary}
            </p>
          </div>

          {/* Key Takeaway Box */}
          <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 text-[#0B3B60] flex items-start gap-3">
            <span className="material-symbols-outlined text-[22px] text-[#00A3E0] shrink-0 mt-0.5">
              lightbulb
            </span>
            <div className="text-[13px] leading-relaxed">
              <strong className="font-bold block mb-0.5 text-[#0B3B60]">Recomendación clave:</strong>
              {article.keyTakeaway}
            </div>
          </div>

          {/* Article Sections */}
          <div className="flex flex-col gap-6">
            {article.sections.map((sec, i) => (
              <div key={i} className="flex flex-col gap-2.5">
                <h3 className="text-[16px] font-bold text-[#0B3B60] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00A3E0]" />
                  <span>{sec.title}</span>
                </h3>
                {sec.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="text-[13.5px] sm:text-[14px] text-slate-700 leading-relaxed">
                    {p}
                  </p>
                ))}
                {sec.tips && sec.tips.length > 0 && (
                  <div className="mt-2 bg-slate-50 rounded-xl p-4 border border-slate-200 flex flex-col gap-2">
                    <span className="text-[11.5px] font-bold uppercase tracking-wider text-[#007EAF]">
                      Ejemplos y consejos prácticos:
                    </span>
                    {sec.tips.map((tip, tIdx) => (
                      <div key={tIdx} className="flex items-start gap-2 text-[12.5px] text-slate-800">
                        <span className="material-symbols-outlined text-[16px] text-[#00A3E0] shrink-0 mt-0.5">
                          check_circle
                        </span>
                        <span>{tip}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Official Source Footnote */}
          {article.source && (
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[12px] text-slate-600 flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-[#00A3E0]">verified</span>
              <span><strong>Fuente oficial consultada:</strong> {article.source}</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between bg-slate-50/80">
          <span className="text-[11.5px] text-slate-500">
            aldia · Plataforma digital para el asesoramiento en cobranzas
          </span>
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
