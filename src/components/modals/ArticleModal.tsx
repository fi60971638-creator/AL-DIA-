import React from 'react';
import { EducationalArticle } from '../../types';

interface ArticleModalProps {
  article: EducationalArticle | null;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose }) => {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2 text-slate-500 text-[12px] font-semibold">
            <span className="text-emerald-700 font-bold">{article.category}</span>
            <span>·</span>
            <span>{article.readTime}</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto flex flex-col gap-6">
          <div>
            <h2 className="text-[22px] sm:text-[26px] font-extrabold text-slate-900 tracking-tight leading-snug">
              {article.title}
            </h2>
            <p className="text-[14px] sm:text-[15px] text-slate-600 mt-2 leading-relaxed">
              {article.summary}
            </p>
          </div>

          {/* Key Takeaway Box */}
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-start gap-3">
            <span className="material-symbols-outlined text-[22px] text-emerald-700 shrink-0 mt-0.5">
              bookmark
            </span>
            <div className="text-[13px] leading-relaxed">
              <strong className="font-bold block mb-0.5 text-emerald-900">Idea clave:</strong>
              {article.keyTakeaway}
            </div>
          </div>

          {/* Article Sections */}
          <div className="flex flex-col gap-5">
            {article.sections.map((sec, i) => (
              <div key={i} className="flex flex-col gap-2.5">
                <h3 className="text-[16px] font-bold text-slate-900">
                  {sec.title}
                </h3>
                {sec.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="text-[14px] text-slate-600 leading-relaxed">
                    {p}
                  </p>
                ))}
                {sec.tips && sec.tips.length > 0 && (
                  <div className="mt-1 bg-slate-50 rounded-xl p-3.5 border border-slate-200 flex flex-col gap-1.5">
                    {sec.tips.map((tip, tIdx) => (
                      <div key={tIdx} className="flex items-start gap-2 text-[12.5px] text-slate-700">
                        <span className="material-symbols-outlined text-[16px] text-emerald-600 shrink-0 mt-0.5">
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
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
          <span className="text-[12px] text-slate-500">
            AlDía Educación Financiera
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-[13px] font-bold bg-[#0F3B82] hover:bg-[#0A295C] text-white shadow-2xs transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
