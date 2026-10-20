import React from 'react';
import { EducationalArticle } from '../../types';

interface ArticleModalProps {
  article: EducationalArticle | null;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose }) => {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs fade-in">
      {/* Backdrop */}
      <div onClick={onClose} className="fixed inset-0" />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-3xl w-full max-w-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] text-slate-800 z-10 text-left">
        {/* Header Bar */}
        <div className="px-5 sm:px-6 py-3.5 border-b border-slate-200/90 flex items-center justify-between bg-slate-50/90 shrink-0">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-sky-100/80 text-[#0B3B60]">
              {article.category}
            </span>
            <span className="text-slate-400 text-[12px]">·</span>
            <span className="text-slate-500 text-[12px] flex items-center gap-1 font-medium">
              <span className="material-symbols-outlined text-[14px]">schedule</span>
              {article.readTime}
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Cerrar guía"
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 sm:p-8 overflow-y-auto flex flex-col gap-6">
          {/* Imagen realista peruana */}
          {article.imageSrc && (
            <div className="relative w-full rounded-2xl overflow-hidden shadow-xs border border-slate-200 aspect-[16/9] max-h-72 bg-slate-100">
              <img
                src={article.imageSrc}
                alt={article.imageAlt || article.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <span className="absolute bottom-3 left-4 text-white text-[12px] font-medium drop-shadow-md flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[15px] text-[#00A3E0]">photo_camera</span>
                <span>Contexto real peruano · aldia Educa</span>
              </span>
            </div>
          )}

          {/* Title and Short Summary */}
          <div>
            <h2 className="text-[22px] sm:text-[27px] font-extrabold text-[#0B3B60] tracking-tight leading-snug font-heading">
              {article.title}
            </h2>
            <p className="text-[14px] sm:text-[15px] text-slate-600 mt-2 leading-relaxed">
              {article.summary}
            </p>
          </div>

          {/* 1. Situación cotidiana en el Perú */}
          {article.situacionCotidiana && (
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 border border-amber-200 text-slate-800 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-[13px] font-heading">
                <span className="material-symbols-outlined text-[20px] text-amber-600">person_pin_circle</span>
                <span>Situación cotidiana en el Perú</span>
              </div>
              <p className="text-[13.5px] text-amber-950/90 leading-relaxed font-sans">
                {article.situacionCotidiana}
              </p>
            </div>
          )}

          {/* 2. Explicación sencilla */}
          {article.explicacionSencilla && (
            <div className="flex flex-col gap-2">
              <h3 className="text-[16px] font-bold text-[#0B3B60] font-heading flex items-center gap-2">
                <span className="material-symbols-outlined text-[19px] text-[#00A3E0]">menu_book</span>
                <span>Explicación sencilla</span>
              </h3>
              <p className="text-[14px] text-slate-700 leading-relaxed">
                {article.explicacionSencilla}
              </p>
            </div>
          )}

          {/* 3. Pasos prácticos paso a paso */}
          {article.pasosPracticos && article.pasosPracticos.length > 0 && (
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-3">
              <h3 className="text-[15px] font-bold text-[#0B3B60] font-heading flex items-center gap-2">
                <span className="material-symbols-outlined text-[19px] text-[#007EAF]">checklist</span>
                <span>Pasos prácticos recomendados</span>
              </h3>
              <div className="flex flex-col gap-2.5">
                {article.pasosPracticos.map((paso, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-[13px] text-slate-700">
                    <span className="w-5 h-5 rounded-full bg-[#0B3B60] text-white flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{paso}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. Ejemplo en Soles (S/) */}
          {article.ejemploSoles && (
            <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-emerald-900 font-bold text-[13.5px] font-heading">
                <span className="material-symbols-outlined text-[20px] text-emerald-700">payments</span>
                <span>{article.ejemploSoles.titulo || 'Ejemplo real en soles (S/)'}</span>
              </div>
              <p className="text-[13px] text-emerald-950 leading-relaxed">
                {article.ejemploSoles.detalle}
              </p>
              {article.ejemploSoles.calculo && (
                <div className="p-2.5 rounded-xl bg-white border border-emerald-200 text-[12.5px] font-bold text-emerald-900 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[17px] text-emerald-600">calculate</span>
                  <span>{article.ejemploSoles.calculo}</span>
                </div>
              )}
            </div>
          )}

          {/* 5. Recuadro destacado: Consejo AL DÍA */}
          {article.consejoAlDia && (
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-sky-50 via-blue-50 to-sky-50 border border-sky-200 text-[#0B3B60] flex items-start gap-3 shadow-2xs">
              <span className="material-symbols-outlined text-[24px] text-[#00A3E0] shrink-0 mt-0.5">
                lightbulb
              </span>
              <div className="text-[13.5px] leading-relaxed">
                <strong className="font-heading font-bold block mb-1 text-[#0B3B60]">
                  Consejo AL DÍA:
                </strong>
                {article.consejoAlDia}
              </div>
            </div>
          )}

          {/* Secciones detalladas adicionales si existen */}
          {article.sections && article.sections.length > 0 && (
            <div className="flex flex-col gap-5 pt-2 border-t border-slate-100">
              {article.sections.map((sec, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <h4 className="text-[15px] font-bold text-[#0B3B60] flex items-center gap-2 font-heading">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00A3E0]" />
                    <span>{sec.title}</span>
                  </h4>
                  {sec.paragraphs.map((p, pIdx) => (
                    <p key={pIdx} className="text-[13.5px] text-slate-700 leading-relaxed">
                      {p}
                    </p>
                  ))}
                  {sec.tips && sec.tips.length > 0 && (
                    <div className="mt-1 bg-slate-50 rounded-xl p-3 border border-slate-200 flex flex-col gap-1.5">
                      {sec.tips.map((tip, tIdx) => (
                        <div key={tIdx} className="flex items-start gap-2 text-[12px] text-slate-700">
                          <span className="material-symbols-outlined text-[15px] text-[#00A3E0] shrink-0 mt-0.5">
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
          )}

          {/* 6. Enlace a Fuente Oficial Relacionada */}
          {article.fuenteOficialUrl && (
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
                    {article.fuenteOficialNombre || article.source || 'Portal Oficial del Estado Peruano'}
                  </span>
                </div>
              </div>

              <a
                href={article.fuenteOficialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-white hover:bg-[#0B3B60] text-[#0B3B60] hover:text-white border border-slate-200 hover:border-[#0B3B60] font-heading font-semibold text-[12.5px] transition-colors flex items-center gap-1.5 cursor-pointer shrink-0 shadow-2xs"
              >
                <span>Consultar fuente oficial</span>
                <span className="material-symbols-outlined text-[16px]">open_in_new</span>
              </a>
            </div>
          )}
        </div>

        {/* Footer Bar */}
        <div className="px-5 sm:px-6 py-3.5 border-t border-slate-200 flex items-center justify-between bg-slate-50/90 shrink-0">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-1 text-[13px] font-bold text-slate-600 hover:text-[#0B3B60] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Volver a la lista de guías</span>
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
