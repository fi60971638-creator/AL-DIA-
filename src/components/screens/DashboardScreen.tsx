import React from 'react';
import { TabType } from '../../types';
import { HeroBannerCarousel } from '../HeroBannerCarousel';

interface DashboardScreenProps {
  onNavigate: (tab: TabType) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl mx-auto w-full pb-14 pt-1 sm:pt-2 gap-8">
      {/* ============================================================== */}
      {/* 1. CARRUSEL PRINCIPAL DE BANNERS (INSPIRADO EN BCP Y ALFIN)     */}
      {/* ============================================================== */}
      <HeroBannerCarousel onNavigate={onNavigate} />

      {/* ============================================================== */}
      {/* 2. FRANJA INSTITUCIONAL ALDÍA (IDENTIDAD Y PROPÓSITO CLARO)     */}
      {/* ============================================================== */}
      <section className="w-full rounded-2xl bg-white p-5 sm:p-6 border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-white p-1.5 shadow-sm border border-slate-200 flex items-center justify-center shrink-0">
            <img
              src="/logo-aldia.svg"
              alt="Logo aldia"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2.5">
              <span className="text-[22px] sm:text-[24px] font-heading font-extrabold text-[#0B3B60] tracking-tight leading-none">
                aldia
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-sky-50 border border-sky-200 text-[#0B3B60] text-[10.5px] font-heading font-semibold">
                Asesoramiento en Cobranzas
              </span>
            </div>
            <p className="text-[13px] text-[#526E88] font-sans font-normal mt-1 leading-snug">
              “Organiza tus pagos. Evita atrasos.” · Plataforma digital para el asesoramiento en cobranzas
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto shrink-0 justify-end">
          <button
            onClick={() => onNavigate('orientacion')}
            className="w-full md:w-auto px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0B3B60] font-heading font-semibold text-[13px] transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px] text-[#00A3E0]">lightbulb</span>
            <span>Ver orientación</span>
          </button>
          <button
            onClick={() => onNavigate('aprende_articulos')}
            className="w-full md:w-auto px-4 py-2.5 rounded-xl bg-[#0B3B60] hover:bg-[#082E4D] text-white font-heading font-bold text-[13px] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <span className="material-symbols-outlined text-[18px] text-[#00A3E0]">menu_book</span>
            <span>Explorar guías</span>
          </button>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. TRES ACCESOS RÁPIDOS PRINCIPALES (TARJETAS BLANCAS NÍTIDAS) */}
      {/* ============================================================== */}
      <section className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Acceso 1: Aprende sobre créditos */}
        <button
          onClick={() => onNavigate('aprende_articulos')}
          className="bg-white hover:bg-slate-50/90 border border-slate-200/90 hover:border-[#00A3E0] rounded-2xl p-5 text-left transition-all duration-200 shadow-xs hover:shadow-md group flex flex-col justify-between gap-4 cursor-pointer"
        >
          <div className="flex items-start justify-between">
            <div className="w-11 h-11 rounded-xl bg-sky-50 border border-sky-100 text-[#007EAF] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[24px]">menu_book</span>
            </div>
            <span className="material-symbols-outlined text-[18px] text-slate-400 group-hover:text-[#00A3E0] group-hover:translate-x-0.5 transition-all">
              arrow_forward
            </span>
          </div>
          <div>
            <h3 className="text-[16px] sm:text-[17px] font-heading font-semibold text-[#0B3B60] leading-snug group-hover:text-[#007EAF] transition-colors">
              Aprende sobre créditos
            </h3>
            <p className="text-[13px] sm:text-[13.5px] font-sans font-normal text-slate-600 mt-1.5 leading-relaxed">
              Guías claras sobre tasas de interés (TEA vs TCEA), comparación de préstamos y prevención del sobreendeudamiento.
            </p>
          </div>
        </button>

        {/* Acceso 2: Conoce tus derechos */}
        <button
          onClick={() => onNavigate('aprende_derechos')}
          className="bg-white hover:bg-slate-50/90 border border-slate-200/90 hover:border-[#00A3E0] rounded-2xl p-5 text-left transition-all duration-200 shadow-xs hover:shadow-md group flex flex-col justify-between gap-4 cursor-pointer"
        >
          <div className="flex items-start justify-between">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[24px]">verified_user</span>
            </div>
            <span className="material-symbols-outlined text-[18px] text-slate-400 group-hover:text-[#00A3E0] group-hover:translate-x-0.5 transition-all">
              arrow_forward
            </span>
          </div>
          <div>
            <h3 className="text-[16px] sm:text-[17px] font-heading font-semibold text-[#0B3B60] leading-snug group-hover:text-[#007EAF] transition-colors">
              Conoce tus derechos
            </h3>
            <p className="text-[13px] sm:text-[13.5px] font-sans font-normal text-slate-600 mt-1.5 leading-relaxed">
              Límites legales de cobranza, pagos anticipados sin penalidad, reclamos formales y protección al consumidor financiero.
            </p>
          </div>
        </button>

        {/* Acceso 3: Comprende tu clasificación crediticia */}
        <button
          onClick={() => onNavigate('categorias_crediticias')}
          className="bg-white hover:bg-slate-50/90 border border-slate-200/90 hover:border-[#00A3E0] rounded-2xl p-5 text-left transition-all duration-200 shadow-xs hover:shadow-md group flex flex-col justify-between gap-4 cursor-pointer"
        >
          <div className="flex items-start justify-between">
            <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 text-[#0B3B60] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[24px]">speed</span>
            </div>
            <span className="material-symbols-outlined text-[18px] text-slate-400 group-hover:text-[#00A3E0] group-hover:translate-x-0.5 transition-all">
              arrow_forward
            </span>
          </div>
          <div>
            <h3 className="text-[16px] sm:text-[17px] font-heading font-semibold text-[#0B3B60] leading-snug group-hover:text-[#007EAF] transition-colors">
              Comprende tu clasificación crediticia
            </h3>
            <p className="text-[13px] sm:text-[13.5px] font-sans font-normal text-slate-600 mt-1.5 leading-relaxed">
              Descubre qué significan las 5 categorías oficiales de la SBS (Normal, CPP, Deficiente, Dudoso, Pérdida) y cómo cuidarlas.
            </p>
          </div>
        </button>
      </section>

      {/* ============================================================== */}
      {/* 4. DOS BLOQUES INFORMATIVOS VISUALES (NÍITIDOS Y LEGIBLES)     */}
      {/* ============================================================== */}
      <section id="conocenos" className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-left scroll-mt-24">
        {/* Bloque 1: ¿Qué es aldia? */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs flex flex-col gap-2.5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 text-[#007EAF] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[22px]">info</span>
            </div>
            <h2 className="text-[17px] sm:text-[18px] font-heading font-bold text-[#0B3B60] tracking-tight">
              ¿Qué es aldia?
            </h2>
          </div>
          <p className="text-[13.5px] font-sans font-normal text-slate-600 leading-relaxed">
            aldia es una plataforma digital de educación y orientación sobre cobranzas, pagos y finanzas personales en el Perú, creada para facilitar el acceso a información clara, imparcial y sin tecnicismos complejos.
          </p>
        </div>

        {/* Bloque 2: Nuestro propósito */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs flex flex-col gap-2.5">
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
