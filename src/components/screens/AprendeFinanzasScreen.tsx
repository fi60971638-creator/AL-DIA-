import React, { useState } from 'react';
import { EDUCATIONAL_ARTICLES } from '../../data/financeData';
import {
  VIDEOS_DATA,
  FINANCIAL_TERMS,
  MYTHS_AND_TRUTHS,
  PRACTICAL_CASES,
  RIGHTS_TOPICS,
  OFFICIAL_SOURCES_DATA,
} from '../../data/initialData';
import { EducationalArticle, VideoItem } from '../../types';
import { ArticleModal } from '../modals/ArticleModal';

export const AprendeFinanzasScreen: React.FC = () => {
  const [activeMainTab, setActiveMainTab] = useState<'articulos' | 'videos' | 'diccionario' | 'mitos' | 'casos' | 'derechos'>('articulos');
  const [selectedCategory, setSelectedCategory] = useState<string>('TODOS');
  const [selectedArticle, setSelectedArticle] = useState<EducationalArticle | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [practicalCaseAnswers, setPracticalCaseAnswers] = useState<Record<string, string>>({});

  const categories = [
    'TODOS',
    'Deudas',
    'Tarjetas',
    'Presupuesto',
    'Intereses',
    'Fondo de emergencia',
    'Historial crediticio',
    'Ahorro',
  ];

  const filteredArticles = EDUCATIONAL_ARTICLES.filter((art) => {
    const matchCategory = selectedCategory === 'TODOS' || art.category === selectedCategory;
    const matchSearch =
      art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.shortDesc.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  const filteredTerms = FINANCIAL_TERMS.filter(
    (t) =>
      t.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto">
      {/* Article Reader Modal */}
      <ArticleModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />

      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-[12px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
            Educación Financiera
          </span>
        </div>
        <h1 className="text-[26px] sm:text-[32px] font-extrabold text-[#0F172A] tracking-tight mt-1">
          Aprende sobre tus finanzas
        </h1>
        <p className="text-[14px] text-slate-500">
          Guías prácticas, explicaciones sin rodeos y herramientas para tomar mejores decisiones.
        </p>
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-200 scrollbar-none">
        {[
          { id: 'articulos', label: '📖 Guías y Artículos' },
          { id: 'videos', label: '🎥 Videos oficiales SBS' },
          { id: 'diccionario', label: '📚 Diccionario financiero' },
          { id: 'mitos', label: '🔍 Mitos y verdades' },
          { id: 'casos', label: '💡 Casos prácticos' },
          { id: 'derechos', label: '🛡️ Derechos del usuario' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveMainTab(tab.id as typeof activeMainTab)}
            className={`px-4 py-2.5 text-[13.5px] font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeMainTab === tab.id
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: ARTÍCULOS LEFI-STYLE */}
      {activeMainTab === 'articulos' && (
        <div className="flex flex-col gap-6">
          {/* Search and Category Filters */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <span className="material-symbols-outlined absolute left-3.5 top-2.5 text-slate-400 text-[18px]">
                search
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar tema, concepto o duda..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-[13.5px] focus:outline-none focus:border-emerald-600"
              />
            </div>

            {/* Filter tags */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-[12px] font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-slate-900 text-white shadow-2xs'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid de Artículos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredArticles.map((art) => (
              <div
                key={art.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between gap-5 group"
              >
                <div>
                  <div className="flex items-center justify-between text-[11.5px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    <span className="text-emerald-700">{art.category}</span>
                    <span>{art.readTime}</span>
                  </div>

                  <h3 className="text-[17px] font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
                    {art.title}
                  </h3>

                  <p className="text-[13px] text-slate-500 mt-2 leading-relaxed line-clamp-3">
                    {art.shortDesc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[12px] font-semibold text-slate-400">
                    AlDía Finanzas
                  </span>
                  <button
                    onClick={() => setSelectedArticle(art)}
                    className="px-4 py-2 rounded-xl bg-slate-50 hover:bg-emerald-600 text-slate-700 hover:text-white font-bold text-[12.5px] transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <span>Aprender</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: VIDEOS OFICIALES SBS */}
      {activeMainTab === 'videos' && (
        <div className="flex flex-col gap-6">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-[13px] text-slate-600 flex items-center gap-3">
            <span className="material-symbols-outlined text-[22px] text-emerald-600">smart_display</span>
            <span>
              Videos oficiales producidos por la Superintendencia de Banca, Seguros y AFP (SBS) de Perú para comprender tus créditos y derechos.
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {VIDEOS_DATA.map((video) => (
              <div
                key={video.id}
                className="bg-white rounded-3xl p-5 border border-slate-200 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between gap-4"
              >
                <div>
                  <div className="relative aspect-video rounded-2xl bg-slate-900 flex items-center justify-center overflow-hidden mb-3">
                    <div className="w-12 h-12 rounded-full bg-white/90 text-emerald-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-[28px] ml-0.5">play_arrow</span>
                    </div>
                    <span className="absolute bottom-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded bg-black/70 text-white">
                      {video.duracion}
                    </span>
                  </div>

                  <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">
                    {video.categoria}
                  </span>
                  <h4 className="text-[15px] font-bold text-slate-900 mt-1 leading-snug">
                    {video.titulo}
                  </h4>
                  {video.descripcion && (
                    <p className="text-[12.5px] text-slate-500 mt-1 line-clamp-2">
                      {video.descripcion}
                    </p>
                  )}
                </div>

                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-slate-50 hover:bg-slate-900 text-slate-700 hover:text-white border border-slate-200 text-[12.5px] font-bold transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Ver en YouTube</span>
                  <span className="material-symbols-outlined text-[15px]">open_in_new</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: DICCIONARIO FINANCIERO */}
      {activeMainTab === 'diccionario' && (
        <div className="flex flex-col gap-5">
          <div className="relative max-w-md">
            <span className="material-symbols-outlined absolute left-3.5 top-2.5 text-slate-400 text-[18px]">
              search
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar término (TCEA, mora, amortización...)"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-[14px] focus:outline-none focus:border-emerald-600"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTerms.map((term) => (
              <div
                key={term.id}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs flex flex-col gap-2.5"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-[16px] font-extrabold text-[#0F3B82]">
                    {term.term}
                  </h4>
                  <span className="material-symbols-outlined text-[18px] text-slate-400">
                    help_outline
                  </span>
                </div>
                <p className="text-[13px] text-slate-600 leading-relaxed">
                  {term.definition}
                </p>
                <div className="pt-2 border-t border-slate-100 text-[12px] text-slate-500">
                  <strong className="text-slate-700">Ejemplo práctico:</strong> {term.example}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: MITOS Y VERDADES */}
      {activeMainTab === 'mitos' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {MYTHS_AND_TRUTHS.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs flex flex-col gap-4"
            >
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-[13.5px] flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[20px] text-rose-600 shrink-0 mt-0.5">
                  cancel
                </span>
                <div>
                  <strong className="font-bold block text-rose-950">Mito:</strong>
                  “{item.myth}”
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-[13.5px] flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[20px] text-emerald-600 shrink-0 mt-0.5">
                  check_circle
                </span>
                <div>
                  <strong className="font-bold block text-emerald-950">Verdad:</strong>
                  {item.truth}
                </div>
              </div>

              <p className="text-[12.5px] text-slate-500 leading-relaxed pt-1">
                {item.explanation}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* TAB 5: CASOS PRÁCTICOS */}
      {activeMainTab === 'casos' && (
        <div className="flex flex-col gap-6">
          {PRACTICAL_CASES.map((pc, idx) => {
            const currentSelected = practicalCaseAnswers[pc.id];
            const selectedOpt = pc.options.find((o) => o.id === currentSelected);

            return (
              <div
                key={pc.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-2xs flex flex-col gap-5"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#0F3B82] font-extrabold flex items-center justify-center text-[15px]">
                    #{idx + 1}
                  </div>
                  <div>
                    <span className="text-[11.5px] font-bold text-slate-400 uppercase">
                      Caso de {pc.character}
                    </span>
                    <h3 className="text-[17px] font-bold text-slate-900">
                      {pc.title}
                    </h3>
                  </div>
                </div>

                <p className="text-[13.5px] text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  {pc.situation}
                </p>

                <div className="flex flex-col gap-2">
                  <span className="text-[13px] font-bold text-slate-900">
                    {pc.question}
                  </span>
                  {pc.options.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() =>
                        setPracticalCaseAnswers((prev) => ({ ...prev, [pc.id]: opt.id }))
                      }
                      className={`p-3.5 rounded-xl border text-left text-[13px] transition-all cursor-pointer ${
                        currentSelected === opt.id
                          ? opt.isRecommended
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold'
                            : 'bg-rose-50 border-rose-300 text-rose-900'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {opt.text}
                    </button>
                  ))}
                </div>

                {selectedOpt && (
                  <div
                    className={`p-4 rounded-2xl text-[13px] flex items-start gap-2.5 ${
                      selectedOpt.isRecommended
                        ? 'bg-emerald-50 border border-emerald-200 text-emerald-950'
                        : 'bg-amber-50 border border-amber-200 text-amber-900'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px] shrink-0 mt-0.5">
                      {selectedOpt.isRecommended ? 'verified' : 'info'}
                    </span>
                    <div>
                      <strong className="block font-bold mb-0.5">
                        {selectedOpt.isRecommended ? '¡Excelente decisión!' : 'Alternativa riesgosa:'}
                      </strong>
                      {selectedOpt.feedback}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 6: DERECHOS Y FUENTES */}
      {activeMainTab === 'derechos' && (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {RIGHTS_TOPICS.map((topic) => (
              <div
                key={topic.id}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs flex flex-col gap-3"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0F3B82] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px]">{topic.icon}</span>
                  </div>
                  <h4 className="text-[15px] font-bold text-slate-900">
                    {topic.title}
                  </h4>
                </div>
                <p className="text-[12.5px] text-slate-600 leading-relaxed">
                  {topic.summary}
                </p>
                <div className="pt-2 border-t border-slate-100 flex flex-col gap-1">
                  {topic.points.map((pt, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-[12px] text-slate-700">
                      <span className="material-symbols-outlined text-[15px] text-emerald-600 shrink-0">check</span>
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
            <h4 className="text-[16px] font-bold text-slate-900 mb-2">
              Fuentes oficiales del Estado Peruano
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {OFFICIAL_SOURCES_DATA.map((src) => (
                <a
                  key={src.id}
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 bg-white rounded-xl border border-slate-200 hover:border-emerald-500 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <span className="font-extrabold text-[#0F3B82] text-[15px] block">{src.name}</span>
                    <span className="text-[11.5px] text-slate-500 line-clamp-2 mt-0.5">{src.fullName}</span>
                  </div>
                  <span className="text-[11.5px] font-bold text-emerald-700 mt-2 flex items-center gap-1">
                    Sitio oficial ↗
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
