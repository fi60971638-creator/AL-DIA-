import React, { useState } from 'react';
import { EDUCATIONAL_ARTICLES } from '../../data/articles';
import {
  VIDEOS_DATA,
  FINANCIAL_TERMS,
  MYTHS_AND_TRUTHS,
  PRACTICAL_CASES,
  RIGHTS_TOPICS,
  OFFICIAL_SOURCES_DATA,
} from '../../data/initialData';
import { EducationalArticle, AprendeSubTab } from '../../types';
import { ArticleModal } from '../modals/ArticleModal';

interface AprendeFinanzasScreenProps {
  initialTab?: AprendeSubTab;
  onTabChange?: (tab: AprendeSubTab) => void;
}

export const AprendeFinanzasScreen: React.FC<AprendeFinanzasScreenProps> = ({
  initialTab = 'articulos',
  onTabChange,
}) => {
  const [activeMainTab, setActiveMainTab] = useState<AprendeSubTab>(initialTab);
  const [selectedCategory, setSelectedCategory] = useState<string>('TODOS');
  const [selectedArticle, setSelectedArticle] = useState<EducationalArticle | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [practicalCaseAnswers, setPracticalCaseAnswers] = useState<Record<string, string>>({});

  React.useEffect(() => {
    if (initialTab && initialTab !== activeMainTab) {
      setActiveMainTab(initialTab);
    }
  }, [initialTab]);

  const handleTabClick = (tab: AprendeSubTab) => {
    setActiveMainTab(tab);
    setSearchTerm('');
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  const navTabs: { id: AprendeSubTab; label: string; icon: string }[] = [
    { id: 'articulos', label: 'Guías y Artículos', icon: 'menu_book' },
    { id: 'videos', label: 'Videos SBS', icon: 'smart_display' },
    { id: 'diccionario', label: 'Diccionario financiero', icon: 'auto_stories' },
    { id: 'mitos', label: 'Mitos y verdades', icon: 'fact_check' },
    { id: 'casos', label: 'Casos prácticos', icon: 'tips_and_updates' },
    { id: 'derechos', label: 'Derechos del usuario', icon: 'verified_user' },
  ];

  const categories = [
    'TODOS',
    'Créditos y préstamos',
    'Organización del presupuesto',
    'Intereses y comisiones',
    'Pagos responsables',
    'Historial crediticio',
    'Prevención del sobreendeudamiento',
    'Derechos del consumidor',
  ];

  const filteredArticles = EDUCATIONAL_ARTICLES.filter((art) => {
    const matchCategory =
      selectedCategory === 'TODOS' ||
      art.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      (selectedCategory === 'Créditos y préstamos' && (art.category.includes('Deudas') || art.category.includes('Tarjetas')));
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
    <div className="flex flex-col gap-8 max-w-5xl mx-auto pb-14 fade-in">
      {/* Article Reader Modal */}
      <ArticleModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />

      {/* Sub-navigation Tabs */}
      <div className="bg-white rounded-2xl p-2 border border-slate-200/90 shadow-xs flex items-center gap-1.5 overflow-x-auto scrollbar-none">
        {navTabs.map((t) => {
          const isActive = activeMainTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => handleTabClick(t.id)}
              className={`px-3.5 py-2 rounded-xl text-[12.5px] font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer shrink-0 ${
                isActive
                  ? 'bg-[#0B3B60] text-white shadow-xs'
                  : 'text-slate-600 hover:text-[#0B3B60] hover:bg-slate-100'
              }`}
            >
              <span
                className="material-symbols-outlined text-[18px]"
                style={{ color: isActive ? '#00A3E0' : '#64748B' }}
              >
                {t.icon}
              </span>
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: GUÍAS Y ARTÍCULOS */}
      {activeMainTab === 'articulos' && (
        <div className="flex flex-col gap-6">
          {/* Header intro */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs flex flex-col gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-[#0B3B60] text-[12px] font-bold border border-sky-200 w-fit">
              <span className="material-symbols-outlined text-[16px] text-[#00A3E0]">menu_book</span>
              <span>Biblioteca Educativa aldia</span>
            </div>
            <h1 className="text-[24px] sm:text-[30px] font-extrabold text-[#0B3B60] tracking-tight font-heading">
              Guías y Artículos Financieros
            </h1>
            <p className="text-[14px] text-slate-600 leading-relaxed max-w-3xl">
              Lecturas prácticas diseñadas para entender cómo funcionan los préstamos, organizar presupuestos, interpretar tasas de interés y proteger tu salud crediticia.
            </p>
          </div>

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
                placeholder="Buscar guías (préstamos, TCEA, presupuesto...)"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 placeholder-slate-400 text-[13.5px] focus:outline-none focus:border-[#00A3E0] shadow-2xs"
              />
            </div>

            {/* Filter tags */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {categories.slice(0, 5).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-[12px] font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#0B3B60] text-white shadow-2xs'
                      : 'bg-white text-slate-600 hover:text-[#0B3B60] hover:bg-slate-100 border border-slate-200'
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
                className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-[#00A3E0] transition-all flex flex-col justify-between gap-5 group"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider mb-2.5">
                    <span className="text-[#007EAF]">{art.category}</span>
                    <span className="text-slate-400">{art.readTime}</span>
                  </div>

                  <h3 className="text-[17px] font-bold text-[#0B3B60] group-hover:text-[#007EAF] transition-colors leading-snug font-heading">
                    {art.title}
                  </h3>

                  <p className="text-[13px] text-slate-600 mt-2.5 leading-relaxed line-clamp-3">
                    {art.shortDesc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11.5px] font-medium text-slate-400">
                    aldia educación
                  </span>
                  <button
                    onClick={() => setSelectedArticle(art)}
                    className="px-4 py-2 rounded-xl bg-slate-50 hover:bg-[#0B3B60] text-slate-700 hover:text-white font-bold text-[12.5px] transition-all flex items-center gap-1.5 cursor-pointer border border-slate-200"
                  >
                    <span>Leer guía</span>
                    <span className="material-symbols-outlined text-[16px]">
                      arrow_forward
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: VIDEOS SBS */}
      {activeMainTab === 'videos' && (
        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs flex flex-col gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-[#0B3B60] text-[12px] font-bold border border-sky-200 w-fit">
              <span className="material-symbols-outlined text-[16px] text-[#00A3E0]">smart_display</span>
              <span>Superintendencia de Banca, Seguros y AFP (SBS)</span>
            </div>
            <h1 className="text-[24px] sm:text-[30px] font-extrabold text-[#0B3B60] tracking-tight font-heading">
              Videos Oficiales SBS
            </h1>
            <p className="text-[14px] text-slate-600 leading-relaxed max-w-3xl">
              Recursos audiovisuales producidos por la autoridad supervisora financiera para comprender créditos, derechos, compras seguras y prevención de estafas en el Perú.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {VIDEOS_DATA.map((video) => (
              <div
                key={video.id}
                className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-4"
              >
                <div>
                  <div className="relative aspect-video rounded-2xl bg-slate-900 flex items-center justify-center overflow-hidden mb-3 group">
                    <div className="w-12 h-12 rounded-full bg-white/95 text-[#0B3B60] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-[28px] ml-0.5 text-[#007EAF]">
                        play_arrow
                      </span>
                    </div>
                    <span className="absolute bottom-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded bg-black/80 text-white">
                      {video.duracion}
                    </span>
                  </div>

                  <span className="text-[11px] font-bold text-[#007EAF] uppercase tracking-wider block">
                    {video.categoria}
                  </span>
                  <h4 className="text-[15px] font-bold text-[#0B3B60] mt-1 leading-snug font-heading">
                    {video.titulo}
                  </h4>
                  {video.descripcion && (
                    <p className="text-[12.5px] text-slate-600 mt-1.5 line-clamp-2">
                      {video.descripcion}
                    </p>
                  )}
                </div>

                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-slate-50 hover:bg-[#0B3B60] text-slate-700 hover:text-white text-[12.5px] font-bold transition-all flex items-center justify-center gap-1.5 border border-slate-200 cursor-pointer"
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
        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs flex flex-col gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-[#0B3B60] text-[12px] font-bold border border-sky-200 w-fit">
              <span className="material-symbols-outlined text-[16px] text-[#00A3E0]">auto_stories</span>
              <span>Glosario aldia</span>
            </div>
            <h1 className="text-[24px] sm:text-[30px] font-extrabold text-[#0B3B60] tracking-tight font-heading">
              Diccionario Financiero
            </h1>
            <p className="text-[14px] text-slate-600 leading-relaxed max-w-3xl">
              Conceptos clave del sistema bancario peruano explicados con palabras simples y ejemplos de la vida real.
            </p>
          </div>

          <div className="relative max-w-md">
            <span className="material-symbols-outlined absolute left-3.5 top-2.5 text-slate-400 text-[18px]">
              search
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar término (TCEA, mora, amortización, refinanciamiento...)"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 placeholder-slate-400 text-[14px] focus:outline-none focus:border-[#00A3E0] shadow-2xs"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTerms.map((term) => (
              <div
                key={term.id}
                className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs flex flex-col gap-2.5"
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h4 className="text-[16px] font-bold text-[#0B3B60] font-heading">
                    {term.term}
                  </h4>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    {term.importance || 'Concepto SBS'}
                  </span>
                </div>
                <p className="text-[13.5px] text-slate-700 leading-relaxed">
                  {term.definition}
                </p>
                <div className="pt-2 border-t border-slate-100 text-[12.5px] text-slate-600 bg-slate-50 p-2.5 rounded-xl">
                  <strong className="text-[#0B3B60]">Ejemplo práctico:</strong> {term.example}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: MITOS Y VERDADES */}
      {activeMainTab === 'mitos' && (
        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs flex flex-col gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-[#0B3B60] text-[12px] font-bold border border-sky-200 w-fit">
              <span className="material-symbols-outlined text-[16px] text-[#00A3E0]">fact_check</span>
              <span>Desmitificando el Crédito</span>
            </div>
            <h1 className="text-[24px] sm:text-[30px] font-extrabold text-[#0B3B60] tracking-tight font-heading">
              Mitos y Verdades sobre Deudas y Cobranzas
            </h1>
            <p className="text-[14px] text-slate-600 leading-relaxed max-w-3xl">
              Diferencia los mitos populares de la realidad legal y financiera para tomar decisiones con seguridad y sin miedos infundados.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {MYTHS_AND_TRUTHS.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs flex flex-col gap-4"
              >
                {/* Tarjeta de Mito */}
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950 text-[13.5px] flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[20px] text-rose-600 shrink-0 mt-0.5">
                    cancel
                  </span>
                  <div>
                    <strong className="font-bold block text-rose-900">Mito popular:</strong>
                    “{item.myth}”
                  </div>
                </div>

                {/* Tarjeta de Verdad */}
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-[13.5px] flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[20px] text-emerald-600 shrink-0 mt-0.5">
                    check_circle
                  </span>
                  <div>
                    <strong className="font-bold block text-emerald-900">La verdad legal:</strong>
                    {item.truth}
                  </div>
                </div>

                <p className="text-[13px] text-slate-600 leading-relaxed pt-1">
                  {item.explanation}
                </p>

                {item.source && (
                  <div className="pt-2 border-t border-slate-100 text-[11.5px] text-slate-500 flex items-center justify-between">
                    <span>Fuente: <strong className="text-slate-800">{item.source}</strong></span>
                    <span className="text-[#007EAF] font-bold">{item.topic}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: CASOS PRÁCTICOS */}
      {activeMainTab === 'casos' && (
        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs flex flex-col gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-[#0B3B60] text-[12px] font-bold border border-sky-200 w-fit">
              <span className="material-symbols-outlined text-[16px] text-[#00A3E0]">tips_and_updates</span>
              <span>Aprendizaje Interactivo</span>
            </div>
            <h1 className="text-[24px] sm:text-[30px] font-extrabold text-[#0B3B60] tracking-tight font-heading">
              Casos Prácticos Cotidianos
            </h1>
            <p className="text-[14px] text-slate-600 leading-relaxed max-w-3xl">
              Situaciones del día a día con las que te puedes identificar. Pon a prueba tu criterio y conoce las recomendaciones pedagógicas de aldia.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {PRACTICAL_CASES.map((pc, idx) => {
              const currentSelected = practicalCaseAnswers[pc.id];
              const selectedOpt = pc.options.find((o) => o.id === currentSelected);

              return (
                <div
                  key={pc.id}
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs flex flex-col gap-5"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-sky-100 text-[#0B3B60] font-extrabold flex items-center justify-center text-[15px] font-heading">
                      #{idx + 1}
                    </div>
                    <div>
                      <span className="text-[11.5px] font-bold text-[#007EAF] uppercase tracking-wider">
                        {pc.character ? `Caso de ${pc.character}` : `Caso #${idx + 1}`}
                      </span>
                      <h3 className="text-[17px] font-bold text-[#0B3B60] font-heading">
                        {pc.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-[13.5px] text-slate-700 leading-relaxed bg-slate-50 p-4.5 rounded-2xl border border-slate-200">
                    {pc.situation}
                  </p>

                  <div className="flex flex-col gap-2.5">
                    <span className="text-[13.5px] font-bold text-[#0B3B60]">
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
                              : 'bg-rose-50 border-rose-300 text-rose-950'
                            : 'bg-white border-slate-200 text-slate-700 hover:text-[#0B3B60] hover:bg-slate-50'
                        }`}
                      >
                        {opt.text}
                      </button>
                    ))}
                  </div>

                  {selectedOpt && (
                    <div
                      className={`p-4 rounded-2xl text-[13px] flex items-start gap-2.5 border ${
                        selectedOpt.isRecommended
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                          : 'bg-amber-50 border-amber-200 text-amber-950'
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

                  {pc.educationalTakeaway && (
                    <div className="pt-2 border-t border-slate-100 text-[12px] text-slate-500 flex items-center gap-2">
                      <span className="material-symbols-outlined text-[16px] text-[#007EAF]">
                        school
                      </span>
                      <span><strong>Aprendizaje aldia:</strong> {pc.educationalTakeaway}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 6: DERECHOS DEL USUARIO */}
      {activeMainTab === 'derechos' && (
        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs flex flex-col gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-[#0B3B60] text-[12px] font-bold border border-sky-200 w-fit">
              <span className="material-symbols-outlined text-[16px] text-[#00A3E0]">verified_user</span>
              <span>Protección al Consumidor Financiero</span>
            </div>
            <h1 className="text-[24px] sm:text-[30px] font-extrabold text-[#0B3B60] tracking-tight font-heading">
              Derechos del Usuario Financiero
            </h1>
            <p className="text-[14px] text-slate-600 leading-relaxed max-w-3xl">
              Conoce tus derechos respaldados por el Código de Protección y Defensa del Consumidor (INDECOPI) y las resoluciones de la SBS.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {RIGHTS_TOPICS.map((topic) => (
              <div
                key={topic.id}
                className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs flex flex-col gap-3.5"
              >
                <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                  <div className="w-9 h-9 rounded-xl bg-sky-50 text-[#007EAF] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px]">{topic.icon}</span>
                  </div>
                  <h4 className="text-[15px] font-bold text-[#0B3B60] font-heading">
                    {topic.title}
                  </h4>
                </div>
                <p className="text-[13px] text-slate-600 leading-relaxed">
                  {topic.summary}
                </p>
                <div className="pt-2 border-t border-slate-100 flex flex-col gap-1.5">
                  {topic.points.map((pt, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-[12.5px] text-slate-700">
                      <span className="material-symbols-outlined text-[15px] text-[#00A3E0] shrink-0 mt-0.5">
                        check_circle
                      </span>
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
                {topic.officialSourceText && (
                  <div className="pt-2 text-[11px] text-slate-500 border-t border-slate-100">
                    Base legal: <strong className="text-slate-800">{topic.officialSourceText}</strong>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Tarjeta de fuentes del Estado Peruano */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs">
            <h4 className="text-[16px] font-bold text-[#0B3B60] mb-3 flex items-center gap-2 font-heading">
              <span className="material-symbols-outlined text-[#007EAF]">account_balance</span>
              <span>Organismos reguladores del sistema financiero</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {OFFICIAL_SOURCES_DATA.map((src) => (
                <a
                  key={src.id}
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-[#00A3E0] transition-colors flex flex-col justify-between"
                >
                  <div>
                    <span className="font-extrabold text-[#0B3B60] text-[15px] block font-heading">{src.name}</span>
                    <span className="text-[11.5px] text-slate-600 line-clamp-2 mt-1">{src.fullName}</span>
                  </div>
                  <span className="text-[11.5px] font-bold text-[#007EAF] mt-3 flex items-center gap-1">
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
