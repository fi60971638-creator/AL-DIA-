import React, { useState } from 'react';
import { TabType, EducationalArticle } from '../../types';
import { HeroBannerCarousel } from '../HeroBannerCarousel';
import { EDUCATIONAL_ARTICLES } from '../../data/articles';
import { ArticleModal } from '../modals/ArticleModal';

interface DashboardScreenProps {
  onNavigate: (tab: TabType) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ onNavigate }) => {
  const [selectedArticle, setSelectedArticle] = useState<EducationalArticle | null>(null);

  // 3 artículos destacados de EDUCATIONAL_ARTICLES
  const featuredArticles = EDUCATIONAL_ARTICLES.slice(0, 3);

  // Botones de ayuda rápida con icono y color propio
  const helpButtons = [
    {
      id: 'atraso',
      title: 'Quiero salir de un atraso',
      desc: 'Alternativas de reprogramación y videos explicativos.',
      icon: 'smart_display',
      target: 'videos' as TabType,
      bgColor: 'bg-orange-50/70 hover:bg-orange-50',
      borderColor: 'border-orange-200/90 hover:border-orange-400',
      iconBg: 'bg-orange-100 text-[#EA580C]',
      hoverText: 'group-hover:text-[#EA580C]',
      arrowColor: 'group-hover:text-[#EA580C]',
    },
    {
      id: 'credito',
      title: 'Quiero entender mi crédito',
      desc: 'Guías claras sobre tasas TCEA vs TEA y cronogramas.',
      icon: 'menu_book',
      target: 'aprende_articulos' as TabType,
      bgColor: 'bg-sky-50/70 hover:bg-sky-50',
      borderColor: 'border-sky-200/90 hover:border-[#00A3E0]',
      iconBg: 'bg-sky-100 text-[#007EAF]',
      hoverText: 'group-hover:text-[#007EAF]',
      arrowColor: 'group-hover:text-[#00A3E0]',
    },
    {
      id: 'derechos',
      title: 'Quiero conocer mis derechos',
      desc: 'Límites legales de cobranza y protección al consumidor.',
      icon: 'verified_user',
      target: 'aprende_derechos' as TabType,
      bgColor: 'bg-emerald-50/70 hover:bg-emerald-50',
      borderColor: 'border-emerald-200/90 hover:border-emerald-400',
      iconBg: 'bg-emerald-100 text-[#059669]',
      hoverText: 'group-hover:text-[#059669]',
      arrowColor: 'group-hover:text-[#059669]',
    },
    {
      id: 'categoria',
      title: 'Quiero saber mi categoría crediticia',
      desc: 'Escala oficial de la SBS y cómo cuidar tu calificación.',
      icon: 'speed',
      target: 'categorias_crediticias' as TabType,
      bgColor: 'bg-cyan-50/70 hover:bg-cyan-50',
      borderColor: 'border-cyan-200/90 hover:border-[#00A3E0]',
      iconBg: 'bg-cyan-100 text-[#0284C7]',
      hoverText: 'group-hover:text-[#0284C7]',
      arrowColor: 'group-hover:text-[#00A3E0]',
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center max-w-6xl mx-auto w-full pb-14 pt-1 sm:pt-2 gap-10 sm:gap-14">
      {/* Modal para lectura de artículos destacados */}
      <ArticleModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />

      {/* ============================================================== */}
      {/* 1. CARRUSEL PRINCIPAL DE BANNERS (PRIMER ELEMENTO)             */}
      {/* ============================================================== */}
      <HeroBannerCarousel onNavigate={onNavigate} />

      {/* ============================================================== */}
      {/* 2. ¿CON QUÉ PODEMOS AYUDARTE HOY? (BOTONES GRANDES)            */}
      {/* ============================================================== */}
      <section className="w-full flex flex-col gap-5 text-left">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[22px] sm:text-[26px] font-heading font-extrabold text-[#0B3B60] tracking-tight">
              ¿Con qué podemos ayudarte hoy?
            </h2>
            <p className="text-[13.5px] sm:text-[14.5px] text-slate-500 font-sans mt-0.5">
              Accede a orientación clara y herramientas según tu situación actual
            </p>
          </div>
        </div>

        {/* Fila de botones grandes: 1 columna en celular, 4 en escritorio */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {helpButtons.map((btn) => (
            <button
              key={btn.id}
              onClick={() => onNavigate(btn.target)}
              className={`p-5 sm:p-6 rounded-3xl border transition-all duration-300 shadow-xs hover:shadow-lg hover:-translate-y-1 text-left flex flex-col justify-between gap-4 cursor-pointer group ${btn.bgColor} ${btn.borderColor}`}
            >
              <div className="flex items-center justify-between">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-110 transition-transform duration-300 ${btn.iconBg}`}
                >
                  <span className="material-symbols-outlined text-[26px]">
                    {btn.icon}
                  </span>
                </div>
                <span
                  className={`material-symbols-outlined text-[20px] text-slate-400 group-hover:translate-x-1 transition-all duration-200 ${btn.arrowColor}`}
                >
                  arrow_forward
                </span>
              </div>

              <div>
                <h3
                  className={`text-[16px] sm:text-[17px] font-heading font-bold text-[#0B3B60] leading-snug transition-colors ${btn.hoverText}`}
                >
                  {btn.title}
                </h3>
                <p className="text-[12.5px] sm:text-[13px] font-sans font-normal text-slate-600 mt-1.5 leading-relaxed">
                  {btn.desc}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. TRES TARJETAS PRINCIPALES (MÁS ESPACIO Y BORDES REDONDEADOS) */}
      {/* ============================================================== */}
      <section className="w-full flex flex-col gap-5 text-left">
        <div>
          <h2 className="text-[20px] sm:text-[23px] font-heading font-bold text-[#0B3B60] tracking-tight">
            Pilares de orientación financiera
          </h2>
          <p className="text-[13px] sm:text-[14px] text-slate-500 font-sans mt-0.5">
            Recursos permanentes fundamentados en la regulación de la SBS e INDECOPI
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Tarjeta 1: Aprende sobre créditos */}
          <button
            onClick={() => onNavigate('aprende_articulos')}
            className="bg-white hover:bg-slate-50/90 border border-slate-200/90 hover:border-[#00A3E0] rounded-3xl p-6 sm:p-7 text-left transition-all duration-300 shadow-xs hover:shadow-xl hover:-translate-y-1 group flex flex-col justify-between gap-5 cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-100 text-[#007EAF] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[26px]">menu_book</span>
              </div>
              <span className="material-symbols-outlined text-[19px] text-slate-400 group-hover:text-[#00A3E0] group-hover:translate-x-1 transition-all">
                arrow_forward
              </span>
            </div>
            <div>
              <h3 className="text-[17px] sm:text-[18px] font-heading font-bold text-[#0B3B60] leading-snug group-hover:text-[#007EAF] transition-colors">
                Aprende sobre créditos
              </h3>
              <p className="text-[13px] sm:text-[13.5px] font-sans font-normal text-slate-600 mt-2 leading-relaxed">
                Guías claras sobre tasas de interés (TEA vs TCEA), comparación de préstamos y prevención del sobreendeudamiento.
              </p>
            </div>
          </button>

          {/* Tarjeta 2: Conoce tus derechos */}
          <button
            onClick={() => onNavigate('aprende_derechos')}
            className="bg-white hover:bg-slate-50/90 border border-slate-200/90 hover:border-[#00A3E0] rounded-3xl p-6 sm:p-7 text-left transition-all duration-300 shadow-xs hover:shadow-xl hover:-translate-y-1 group flex flex-col justify-between gap-5 cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[26px]">verified_user</span>
              </div>
              <span className="material-symbols-outlined text-[19px] text-slate-400 group-hover:text-[#00A3E0] group-hover:translate-x-1 transition-all">
                arrow_forward
              </span>
            </div>
            <div>
              <h3 className="text-[17px] sm:text-[18px] font-heading font-bold text-[#0B3B60] leading-snug group-hover:text-[#007EAF] transition-colors">
                Conoce tus derechos
              </h3>
              <p className="text-[13px] sm:text-[13.5px] font-sans font-normal text-slate-600 mt-2 leading-relaxed">
                Límites legales de cobranza, pagos anticipados sin penalidad, reclamos formales y protección al consumidor financiero.
              </p>
            </div>
          </button>

          {/* Tarjeta 3: Comprende tu clasificación crediticia */}
          <button
            onClick={() => onNavigate('categorias_crediticias')}
            className="bg-white hover:bg-slate-50/90 border border-slate-200/90 hover:border-[#00A3E0] rounded-3xl p-6 sm:p-7 text-left transition-all duration-300 shadow-xs hover:shadow-xl hover:-translate-y-1 group flex flex-col justify-between gap-5 cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 text-[#0B3B60] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[26px]">speed</span>
              </div>
              <span className="material-symbols-outlined text-[19px] text-slate-400 group-hover:text-[#00A3E0] group-hover:translate-x-1 transition-all">
                arrow_forward
              </span>
            </div>
            <div>
              <h3 className="text-[17px] sm:text-[18px] font-heading font-bold text-[#0B3B60] leading-snug group-hover:text-[#007EAF] transition-colors">
                Comprende tu clasificación crediticia
              </h3>
              <p className="text-[13px] sm:text-[13.5px] font-sans font-normal text-slate-600 mt-2 leading-relaxed">
                Descubre qué significan las 5 categorías oficiales de la SBS (Normal, CPP, Deficiente, Dudoso, Pérdida) y cómo cuidarlas.
              </p>
            </div>
          </button>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. HERRAMIENTAS INTERACTIVAS: AL DÍA MARKET & AL DÍA PLAY      */}
      {/* ============================================================== */}
      <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 text-left">
        {/* Banner AL DÍA Market */}
        <div className="bg-gradient-to-br from-white to-sky-50/70 rounded-3xl p-6 sm:p-7 border border-sky-100 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between gap-5 group">
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100/80 text-[#007EAF] text-[11px] font-bold">
                <span className="material-symbols-outlined text-[15px]">storefront</span>
                <span>Tienda de Productos Cotidianos</span>
              </span>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Precios en Soles (S/)
              </span>
            </div>
            <h3 className="text-[20px] font-heading font-extrabold text-[#0B3B60]">
              AL DÍA Market
            </h3>
            <p className="text-[13.5px] font-sans text-slate-600 leading-relaxed">
              Catálogo de artículos esenciales de uso diario: útiles escolares completos, insumos de oficina y artículos prácticos con carrito de compras y revisión de pedidos.
            </p>
          </div>
          <button
            onClick={() => onNavigate('market')}
            className="self-start px-4 py-2.5 rounded-xl bg-[#0B3B60] hover:bg-[#082E4D] text-white font-heading font-semibold text-[13px] transition-all flex items-center gap-2 cursor-pointer shadow-xs group-hover:gap-3"
          >
            <span>Ver tienda Market</span>
            <span className="material-symbols-outlined text-[16px] text-[#00A3E0]">arrow_forward</span>
          </button>
        </div>

        {/* Banner AL DÍA Play */}
        <div className="bg-gradient-to-br from-white to-orange-50/50 rounded-3xl p-6 sm:p-7 border border-orange-100 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between gap-5 group">
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100/80 text-[#F97316] text-[11px] font-bold">
                <span className="material-symbols-outlined text-[15px]">sports_esports</span>
                <span>Desafíos & Juegos en Línea</span>
              </span>
              <span className="text-[11px] font-black text-[#F97316] bg-orange-50 px-2 py-0.5 rounded-full border border-orange-200 uppercase">
                5 Modos
              </span>
            </div>
            <h3 className="text-[20px] font-heading font-extrabold text-[#0B3B60]">
              AL DÍA Play
            </h3>
            <p className="text-[13.5px] font-sans text-slate-600 leading-relaxed">
              Aprende y diviértete: trivia financiera, mitos vs verdades, simulador de presupuesto, casos prácticos y accesos a juegos en línea (Poki, CrazyGames e itch.io).
            </p>
          </div>
          <button
            onClick={() => onNavigate('play')}
            className="self-start px-4 py-2.5 rounded-xl bg-[#0B3B60] hover:bg-[#082E4D] text-white font-heading font-semibold text-[13px] transition-all flex items-center gap-2 cursor-pointer shadow-xs group-hover:gap-3"
          >
            <span>Jugar y aprender</span>
            <span className="material-symbols-outlined text-[16px] text-[#00A3E0]">sports_esports</span>
          </button>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. SECCIÓN "APRENDE CON AL DÍA" (3 ARTÍCULOS DESTACADOS)       */}
      {/* ============================================================== */}
      <section className="w-full flex flex-col gap-5 text-left">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-[#0B3B60] text-[11.5px] font-bold border border-sky-200 mb-1.5">
              <span className="material-symbols-outlined text-[15px] text-[#00A3E0]">menu_book</span>
              <span>Educación Práctica</span>
            </div>
            <h2 className="text-[22px] sm:text-[25px] font-heading font-extrabold text-[#0B3B60] tracking-tight">
              Aprende con AL DÍA
            </h2>
            <p className="text-[13px] sm:text-[14px] text-slate-500 font-sans mt-0.5">
              Lecturas esenciales para tomar el control de tus finanzas personales y créditos
            </p>
          </div>

          <button
            onClick={() => onNavigate('aprende_articulos')}
            className="self-start sm:self-auto px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-[#0B3B60] border border-slate-200 hover:border-[#00A3E0] font-heading font-semibold text-[13px] transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer group"
          >
            <span>Ver más artículos</span>
            <span className="material-symbols-outlined text-[16px] text-[#00A3E0] group-hover:translate-x-0.5 transition-transform">
              arrow_forward
            </span>
          </button>
        </div>

        {/* Grid de 3 Artículos Destacados */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featuredArticles.map((art) => (
            <div
              key={art.id}
              onClick={() => setSelectedArticle(art)}
              className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-[#00A3E0] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between gap-5 group cursor-pointer"
            >
              <div>
                {/* Categoría y tiempo de lectura */}
                <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider mb-3">
                  <span className="text-[#007EAF] bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-100">
                    {art.category}
                  </span>
                  <div className="flex items-center gap-1 text-slate-400">
                    <span className="material-symbols-outlined text-[14px]">schedule</span>
                    <span>{art.readTime}</span>
                  </div>
                </div>

                {/* Título del artículo */}
                <h3 className="text-[16.5px] font-heading font-bold text-[#0B3B60] group-hover:text-[#007EAF] transition-colors leading-snug">
                  {art.title}
                </h3>

                {/* Resumen breve */}
                <p className="text-[13px] font-sans font-normal text-slate-600 mt-2.5 leading-relaxed line-clamp-3">
                  {art.shortDesc}
                </p>
              </div>

              {/* Botón de lectura */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11.5px] font-medium text-slate-400 font-sans">
                  AL DÍA Educa
                </span>
                <span className="inline-flex items-center gap-1 text-[12.5px] font-heading font-bold text-[#0B3B60] group-hover:text-[#00A3E0] transition-colors">
                  <span>Leer guía</span>
                  <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. DOS BLOQUES INFORMATIVOS VISUALES (CONÓCENOS)               */}
      {/* ============================================================== */}
      <section
        id="conocenos"
        className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-left scroll-mt-24"
      >
        {/* Bloque 1: ¿Qué es aldia? */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs flex flex-col gap-2.5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 text-[#007EAF] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[22px]">info</span>
            </div>
            <h2 className="text-[17px] sm:text-[18px] font-heading font-bold text-[#0B3B60] tracking-tight">
              ¿Qué es AL DÍA?
            </h2>
          </div>
          <p className="text-[13.5px] font-sans font-normal text-slate-600 leading-relaxed">
            AL DÍA es una plataforma digital de educación y orientación sobre cobranzas, pagos y finanzas personales en el Perú, creada para facilitar el acceso a información clara, imparcial y sin tecnicismos complejos.
          </p>
        </div>

        {/* Bloque 2: Nuestro propósito */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs flex flex-col gap-2.5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 text-[#F97316] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[22px]">flag</span>
            </div>
            <h2 className="text-[17px] sm:text-[18px] font-heading font-bold text-[#0B3B60] tracking-tight">
              Nuestro propósito
            </h2>
          </div>
          <p className="text-[13.5px] font-sans font-normal text-slate-600 leading-relaxed">
            Brindar orientación accesible para que las personas puedan comprender mejor los contratos de crédito, conocer sus derechos ante agencias de cobranza y tomar decisiones financieras con total serenidad.
          </p>
        </div>
      </section>

      {/* Pie institucional */}
      <p className="text-[12px] font-sans font-medium text-slate-400 tracking-wide text-center">
        Plataforma digital para el asesoramiento en cobranzas · Educación Financiera Perú
      </p>
    </div>
  );
};
