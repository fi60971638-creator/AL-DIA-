import React, { useState } from 'react';
import { EDUCATIONAL_ARTICLES } from '../../data/articles';
import {
  FINANCIAL_TERMS,
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

  // Solo las 3 secciones conservadas: Guías y Artículos, Diccionario financiero, Derechos del usuario
  const navTabs: { id: AprendeSubTab; label: string; icon: string }[] = [
    { id: 'articulos', label: 'Guías y Artículos', icon: 'menu_book' },
    { id: 'diccionario', label: 'Diccionario financiero', icon: 'auto_stories' },
    { id: 'derechos', label: 'Derechos del usuario', icon: 'verified_user' },
  ];

  const categories = [
    'TODOS',
    'Pagos y cuotas',
    'Créditos y préstamos',
    'Cobranzas responsables',
    'Historial crediticio',
    'Presupuesto familiar',
    'Finanzas para emprendedores',
    'Derechos del consumidor',
    'Pagos digitales y seguridad',
  ];

  const filteredArticles = EDUCATIONAL_ARTICLES.filter((art) => {
    const matchCategory =
      selectedCategory === 'TODOS' ||
      art.category.toLowerCase() === selectedCategory.toLowerCase();
    const q = searchTerm.toLowerCase().trim();
    const matchSearch =
      !q ||
      art.title.toLowerCase().includes(q) ||
      art.shortDesc.toLowerCase().includes(q) ||
      art.category.toLowerCase().includes(q);
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

      {/* Sub-navigation Tabs: Guías, Diccionario y Derechos */}
      <div className="bg-white rounded-2xl p-2 border border-slate-200/90 shadow-xs flex items-center gap-1.5 overflow-x-auto scrollbar-none">
        {navTabs.map((t) => {
          const isActive = activeMainTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => handleTabClick(t.id)}
              className={`px-4 py-2.5 rounded-xl text-[13px] font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer shrink-0 ${
                isActive
                  ? 'bg-[#0B3B60] text-white shadow-xs'
                  : 'text-slate-600 hover:text-[#0B3B60] hover:bg-slate-100'
              }`}
            >
              <span
                className="material-symbols-outlined text-[19px]"
                style={{ color: isActive ? '#00A3E0' : '#64748B' }}
              >
                {t.icon}
              </span>
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* ============================================================== */}
      {/* TAB 1: GUÍAS Y ARTÍCULOS                                       */}
      {/* ============================================================== */}
      {activeMainTab === 'articulos' && (
        <div className="flex flex-col gap-6">
          {/* Header intro */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs flex flex-col gap-2 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-[#0B3B60] text-[12px] font-bold border border-sky-200 w-fit">
              <span className="material-symbols-outlined text-[16px] text-[#00A3E0]">menu_book</span>
              <span>Guías y Artículos Financieros aldia</span>
            </div>
            <h1 className="text-[24px] sm:text-[30px] font-extrabold text-[#0B3B60] tracking-tight font-heading">
              Educación Financiera para el Perú Real
            </h1>
            <p className="text-[14px] text-slate-600 leading-relaxed max-w-3xl">
              Artículos prácticos con situaciones cotidianas peruanas, ejemplos reales en soles y consejos claros para ordenar tus cuotas, proteger tu negocio familiar y exigir tus derechos.
            </p>
          </div>

          {/* Search and Category Filter */}
          <div className="flex flex-col gap-3.5">
            <div className="relative w-full max-w-md">
              <span className="material-symbols-outlined absolute left-3.5 top-2.5 text-slate-400 text-[18px]">
                search
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por tema (cuotas, bodega, Yape, SBS, TCEA...)"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 placeholder-slate-400 text-[14px] focus:outline-none focus:border-[#00A3E0] shadow-2xs"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              )}
            </div>

            {/* Chips de las 8 Categorías */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-[12px] font-bold whitespace-nowrap transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#0B3B60] text-white shadow-xs'
                      : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                  }`}
                >
                  {cat === 'TODOS' ? 'Todas las guías' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Articles Grid con imágenes realistas */}
          {filteredArticles.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 flex flex-col items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[44px] text-slate-300">search_off</span>
              <h3 className="text-[16px] font-bold text-[#0B3B60]">
                No encontramos guías para "{searchTerm}"
              </h3>
              <p className="text-[13px] text-slate-500">
                Prueba buscando por cuota, bodega, crédito o selecciona otra categoría.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('TODOS');
                }}
                className="mt-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0B3B60] text-[12.5px] font-bold"
              >
                Ver todas las guías
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredArticles.map((article) => (
                <div
                  key={article.id}
                  onClick={() => setSelectedArticle(article)}
                  className="bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-lg hover:border-[#00A3E0] transition-all duration-200 flex flex-col justify-between overflow-hidden text-left cursor-pointer group"
                >
                  <div>
                    {/* Fotografía realista peruana */}
                    {article.imageSrc && (
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                        <img
                          src={article.imageSrc}
                          alt={article.imageAlt || article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                        <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-white/95 text-[#0B3B60] shadow-xs backdrop-blur-xs">
                          {article.category}
                        </span>
                        <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md text-[10.5px] font-bold bg-black/75 text-white backdrop-blur-xs flex items-center gap-1">
                          <span className="material-symbols-outlined text-[12px]">schedule</span>
                          <span>{article.readTime}</span>
                        </span>
                      </div>
                    )}

                    <div className="p-5 flex flex-col gap-2">
                      <h3 className="text-[16.5px] font-bold text-[#0B3B60] leading-snug font-heading group-hover:text-[#007EAF] transition-colors">
                        {article.title}
                      </h3>

                      <p className="text-[12.5px] text-slate-600 line-clamp-2 leading-relaxed">
                        {article.shortDesc}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 pb-5 pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px] text-emerald-600">verified</span>
                      <span>aldia Educa</span>
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedArticle(article);
                      }}
                      className="inline-flex items-center gap-1 text-[13px] font-bold text-[#0B3B60] group-hover:text-[#007EAF] transition-colors cursor-pointer"
                    >
                      <span>Leer guía</span>
                      <span className="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">
                        arrow_forward
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 2: DICCIONARIO FINANCIERO                                  */}
      {/* ============================================================== */}
      {activeMainTab === 'diccionario' && (
        <div className="flex flex-col gap-6 text-left">
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

      {/* ============================================================== */}
      {/* TAB 3: DERECHOS DEL USUARIO                                    */}
      {/* ============================================================== */}
      {activeMainTab === 'derechos' && (
        <div className="flex flex-col gap-6 text-left">
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
