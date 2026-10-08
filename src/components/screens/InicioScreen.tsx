import React from 'react';
import {
  APP_NAME,
  APP_SUBTITLE,
  APP_HERO_QUESTION,
  APP_HERO_SUBTITLE,
  SITUATIONS_DATA,
  VIDEOS_DATA,
  OFFICIAL_SOURCES_DATA,
} from '../../data/initialData';
import { TabType, SituationId } from '../../types';

interface InicioScreenProps {
  onNavigate: (tab: TabType) => void;
  onSelectSituation: (id: SituationId) => void;
}

export const InicioScreen: React.FC<InicioScreenProps> = ({
  onNavigate,
  onSelectSituation,
}) => {
  const featuredVideos = VIDEOS_DATA.filter((v) => v.isFeatured).slice(0, 3);

  // Dedicated visual styling for each situation icon
  const getSituationStyle = (id: SituationId) => {
    switch (id) {
      case 'no-puedo-pagar':
        return {
          iconBg: 'bg-rose-50 text-[#D64545] border border-rose-100',
          badgeText: 'Dificultad de pago',
          badgeColor: 'bg-rose-50 text-[#D64545]',
        };
      case 'me-atrase':
        return {
          iconBg: 'bg-amber-50 text-[#D99A24] border border-amber-100',
          badgeText: 'Pago atrasado',
          badgeColor: 'bg-amber-50 text-[#D99A24]',
        };
      case 'me-estan-cobrando':
        return {
          iconBg: 'bg-blue-50 text-[#0F3B82] border border-blue-100',
          badgeText: 'Cobranza activa',
          badgeColor: 'bg-blue-50 text-[#0F3B82]',
        };
      case 'no-entiendo-credito':
        return {
          iconBg: 'bg-teal-50 text-[#00A896] border border-teal-100',
          badgeText: 'Conceptos clave',
          badgeColor: 'bg-teal-50 text-[#00A896]',
        };
      case 'quiero-pagar-antes':
        return {
          iconBg: 'bg-sky-50 text-[#0284C7] border border-sky-100',
          badgeText: 'Pago anticipado',
          badgeColor: 'bg-sky-50 text-[#0284C7]',
        };
      case 'cuidar-historial':
        return {
          iconBg: 'bg-emerald-50 text-[#059669] border border-emerald-100',
          badgeText: 'Historial SBS',
          badgeColor: 'bg-emerald-50 text-[#059669]',
        };
      case 'varias-obligaciones':
        return {
          iconBg: 'bg-indigo-50 text-[#4F46E5] border border-indigo-100',
          badgeText: 'Sobreendeudamiento',
          badgeColor: 'bg-indigo-50 text-[#4F46E5]',
        };
      default:
        return {
          iconBg: 'bg-blue-50 text-[#0F3B82] border border-blue-100',
          badgeText: 'Orientación',
          badgeColor: 'bg-blue-50 text-[#0F3B82]',
        };
    }
  };

  return (
    <div className="flex flex-col gap-10 max-w-4xl mx-auto">
      {/* 1. Encabezado / Hero Principal - Ordenado, Limpio y con Nueva Identidad */}
      <section className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_rgba(15,59,130,0.04)] flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#F0F4F9]">
          <div className="flex items-center gap-3">
            <img
              src="/logo-aldia.svg"
              alt={`${APP_NAME} Logo`}
              className="h-12 w-12 sm:h-14 sm:w-14 object-contain shrink-0"
            />
            <div className="flex flex-col">
              <div className="flex items-center text-[22px] sm:text-[24px] font-extrabold tracking-tight leading-none">
                <span className="text-[#0F3B82]">AL</span>
                <span className="text-[#00B49F] ml-1.5">DÍA</span>
              </div>
              <span className="text-[11px] sm:text-[12px] font-bold uppercase tracking-wider text-[#5E6E82] mt-1">
                {APP_SUBTITLE}
              </span>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E6F7F5] border border-[#B2ECE4] text-[#009688] text-[12px] font-semibold self-start sm:self-auto">
            <span className="w-2 h-2 rounded-full bg-[#00B49F] animate-pulse" />
            <span>Orientación 100% gratuita</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 max-w-2xl">
          <h1 className="text-[26px] sm:text-[34px] font-extrabold text-[#0F3B82] tracking-tight leading-tight">
            {APP_HERO_QUESTION}
          </h1>
          <p className="text-[15px] sm:text-[16px] text-[#5E6E82] leading-relaxed">
            {APP_HERO_SUBTITLE}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <a
            href="#situaciones-seccion"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0F3B82] hover:bg-[#0A295C] text-white text-[14px] font-bold transition-all shadow-xs cursor-pointer active:scale-[0.99]"
          >
            <span>Ver situaciones</span>
            <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
          </a>

          <button
            type="button"
            onClick={() => onNavigate('aprende')}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-[#F0F4F9] border border-[#E2E8F0] text-[#0F3B82] text-[14px] font-semibold transition-all cursor-pointer active:scale-[0.99]"
          >
            <span>Aprender sobre créditos</span>
            <span className="material-symbols-outlined text-[18px]">school</span>
          </button>
        </div>

        {/* Trust Badges Bar */}
        <div className="pt-3 border-t border-[#F0F4F9] grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-[12px] text-[#5E6E82]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-[#00B49F]">verified</span>
            <span>No solicita datos bancarios sensibles</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-[#00B49F]">account_balance</span>
            <span>Basado en normas SBS e INDECOPI</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-[#00B49F]">support</span>
            <span>Guías prácticas paso a paso</span>
          </div>
        </div>
      </section>

      {/* 2. Sección: ¿QUÉ SITUACIÓN TIENES? (7 Tarjetas con Iconos Más Grandes y Muy Ordenadas) */}
      <section id="situaciones-seccion" className="flex flex-col gap-5 scroll-mt-20">
        <div className="flex items-start justify-between flex-wrap gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-bold uppercase tracking-wider text-[#00B49F] bg-[#E6F7F5] px-2.5 py-0.5 rounded">
                Orientación por caso
              </span>
            </div>
            <h2 className="text-[22px] sm:text-[24px] font-extrabold text-[#0F3B82] mt-1 tracking-tight">
              ¿Qué situación tienes?
            </h2>
            <p className="text-[13px] sm:text-[14px] text-[#5E6E82]">
              Selecciona una situación y conoce qué puedes hacer, qué evitar y tus derechos aplicables.
            </p>
          </div>
        </div>

        {/* Grid de 7 Tarjetas con Iconos Grandes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SITUATIONS_DATA.map((situation, index) => {
            const style = getSituationStyle(situation.id);
            const isLast = index === SITUATIONS_DATA.length - 1; // 7ma tarjeta

            return (
              <button
                key={situation.id}
                type="button"
                onClick={() => onSelectSituation(situation.id)}
                className={`bg-white border border-[#E2E8F0] hover:border-[#0F3B82] rounded-2xl p-5 text-left flex flex-col justify-between gap-4 shadow-xs hover:shadow-md transition-all cursor-pointer group hover:-translate-y-1 active:translate-y-0 ${
                  isLast ? 'sm:col-span-2 lg:col-span-1' : ''
                }`}
              >
                {/* Header: Icono Grande + Badge */}
                <div className="flex items-start justify-between gap-3">
                  {/* ICONO GRANDE DESTACADO */}
                  <div
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform ${style.iconBg}`}
                  >
                    <span className="material-symbols-outlined text-[30px] sm:text-[34px]">
                      {situation.icon}
                    </span>
                  </div>

                  <span
                    className={`text-[10.5px] font-bold px-2 py-0.5 rounded-full shrink-0 ${style.badgeColor}`}
                  >
                    {style.badgeText}
                  </span>
                </div>

                {/* Body Content */}
                <div className="flex flex-col min-w-0">
                  <h3 className="text-[16px] sm:text-[17px] font-bold text-[#1A2B42] group-hover:text-[#0F3B82] transition-colors leading-snug">
                    {situation.homeTitle}
                  </h3>
                  <p className="text-[13px] text-[#5E6E82] mt-1.5 leading-relaxed line-clamp-2">
                    {situation.shortDesc}
                  </p>
                </div>

                {/* Action Link Footer */}
                <div className="pt-3 border-t border-[#F0F4F9] flex items-center justify-between text-[12.5px] font-bold text-[#0F3B82] group-hover:text-[#00B49F] transition-colors">
                  <span>Ver orientación</span>
                  <div className="w-7 h-7 rounded-full bg-[#F0F4F9] group-hover:bg-[#E6F7F5] flex items-center justify-center transition-colors">
                    <span className="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">
                      arrow_forward
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. Sección: 🎥 APRENDE EN 1 MINUTO (3 Videos Destacados) */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[18px]">🎥</span>
              <h2 className="text-[20px] font-extrabold text-[#0F3B82]">
                Aprende en 1 minuto
              </h2>
            </div>
            <p className="text-[13px] text-[#5E6E82]">
              Videos educativos oficiales de la SBS explicados de forma clara y directa.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('videos')}
            className="text-[13px] font-bold text-[#0F3B82] hover:text-[#00B49F] inline-flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>Ver todos los videos</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {featuredVideos.map((video) => (
            <div
              key={video.id}
              className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md transition-all group hover:-translate-y-1"
            >
              {/* Video Header Card */}
              <div className="p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#0F3B82]/10 text-[#0F3B82]">
                    {video.categoria}
                  </span>
                  <span className="text-[11px] font-medium text-[#5E6E82] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px]">timer</span>
                    {video.duracion}
                  </span>
                </div>

                <div className="relative aspect-video rounded-xl bg-[#0F3B82] flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:12px_12px]" />
                  <div className="w-12 h-12 rounded-full bg-white/95 text-[#0F3B82] flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-[#00B49F] group-hover:text-white transition-all">
                    <span className="material-symbols-outlined text-[26px] ml-0.5">play_arrow</span>
                  </div>
                  <span className="absolute bottom-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded bg-black/70 text-white">
                    {video.fuente}
                  </span>
                </div>

                <h3 className="text-[13.5px] font-bold text-[#1A2B42] line-clamp-2 leading-snug group-hover:text-[#0F3B82] transition-colors">
                  {video.titulo}
                </h3>
              </div>

              <div className="px-4 pb-4 pt-1 border-t border-[#F0F4F9]">
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 rounded-xl bg-[#F0F4F9] hover:bg-[#0F3B82] text-[#0F3B82] hover:text-white border border-[#E2E8F0] hover:border-[#0F3B82] text-[12px] font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <span className="material-symbols-outlined text-[15px]">open_in_new</span>
                  <span>Ver video en YouTube</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Sección: 📚 APRENDE DE FORMA SENCILLA (Iconos Grandes y Diseño Limpio) */}
      <section className="flex flex-col gap-4">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-[18px]">📚</span>
            <h2 className="text-[20px] font-extrabold text-[#0F3B82]">
              Aprende de forma sencilla
            </h2>
          </div>
          <p className="text-[13px] text-[#5E6E82]">
            Educación práctica y herramientas para comprender mejor tus obligaciones financieras.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            type="button"
            onClick={() => onNavigate('aprende')}
            className="p-5 rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#00B49F] text-left flex flex-col gap-3 transition-all shadow-xs hover:shadow-md group cursor-pointer hover:-translate-y-1"
          >
            <div className="w-13 h-13 rounded-2xl bg-[#E6F7F5] text-[#00B49F] flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[28px]">school</span>
            </div>
            <div>
              <h3 className="text-[15px] font-bold text-[#1A2B42] group-hover:text-[#00B49F] transition-colors">
                Conoce tu crédito
              </h3>
              <p className="text-[12px] text-[#5E6E82] mt-1 leading-snug">
                Conceptos clave, TCEA, comisiones y condiciones.
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('aprende')}
            className="p-5 rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#0F3B82] text-left flex flex-col gap-3 transition-all shadow-xs hover:shadow-md group cursor-pointer hover:-translate-y-1"
          >
            <div className="w-13 h-13 rounded-2xl bg-blue-50 text-[#0F3B82] flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[28px]">menu_book</span>
            </div>
            <div>
              <h3 className="text-[15px] font-bold text-[#1A2B42] group-hover:text-[#0F3B82] transition-colors">
                Diccionario financiero
              </h3>
              <p className="text-[12px] text-[#5E6E82] mt-1 leading-snug">
                Definiciones claras de términos bancarios habituales.
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('aprende')}
            className="p-5 rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#D99A24] text-left flex flex-col gap-3 transition-all shadow-xs hover:shadow-md group cursor-pointer hover:-translate-y-1"
          >
            <div className="w-13 h-13 rounded-2xl bg-amber-50 text-[#D99A24] flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[28px]">search_insights</span>
            </div>
            <div>
              <h3 className="text-[15px] font-bold text-[#1A2B42] group-hover:text-[#D99A24] transition-colors">
                Mitos y verdades
              </h3>
              <p className="text-[12px] text-[#5E6E82] mt-1 leading-snug">
                Aclaramos creencias falsas sobre deudas y cobranzas.
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('casos')}
            className="p-5 rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#4F46E5] text-left flex flex-col gap-3 transition-all shadow-xs hover:shadow-md group cursor-pointer hover:-translate-y-1"
          >
            <div className="w-13 h-13 rounded-2xl bg-indigo-50 text-[#4F46E5] flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[28px]">psychology</span>
            </div>
            <div>
              <h3 className="text-[15px] font-bold text-[#1A2B42] group-hover:text-[#4F46E5] transition-colors">
                Casos prácticos
              </h3>
              <p className="text-[12px] text-[#5E6E82] mt-1 leading-snug">
                Ejemplos interactivos para saber qué harías tú.
              </p>
            </div>
          </button>
        </div>
      </section>

      {/* 5. Sección: 🛡️ CONOCE TUS DERECHOS (Icono Grande y Llamado Claro) */}
      <section className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-xs">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#0F3B82] border border-blue-100 flex items-center justify-center shrink-0 shadow-2xs">
            <span className="material-symbols-outlined text-[32px]">shield</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F3B82] bg-blue-50 px-2 py-0.5 rounded self-start">
              Protección al consumidor
            </span>
            <h3 className="text-[16px] sm:text-[18px] font-bold text-[#0F3B82] mt-1">
              Conoce tus derechos como usuario financiero
            </h3>
            <p className="text-[13px] text-[#5E6E82] leading-snug mt-0.5">
              Infórmate sobre horarios legales de cobro, prohibición de hostigamiento a terceros y pagos anticipados sin penalidad.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('derechos')}
          className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#0F3B82] hover:bg-[#0A295C] text-white font-bold text-[13px] transition-all shadow-xs shrink-0 cursor-pointer flex items-center justify-center gap-2"
        >
          <span>Conocer mis derechos</span>
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </section>

      {/* 6. Sección: 👤 ¿NECESITAS UNA ORIENTACIÓN MÁS ESPECÍFICA? */}
      <section className="bg-white border-2 border-[#00B49F]/30 rounded-2xl p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-xs">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#E6F7F5] text-[#00B49F] border border-[#B2ECE4] flex items-center justify-center shrink-0 shadow-2xs">
            <span className="material-symbols-outlined text-[32px]">support_agent</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#009688] bg-[#E6F7F5] px-2 py-0.5 rounded self-start">
              Orientación guiada
            </span>
            <h3 className="text-[16px] sm:text-[18px] font-bold text-[#0F3B82] mt-1">
              ¿Necesitas una orientación más específica?
            </h3>
            <p className="text-[13px] text-[#5E6E82] leading-snug mt-0.5">
              Accede a nuestro formulario estructurado sin datos personales ni confidenciales para conocer pasos exactos.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('asesoramiento')}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#00B49F] hover:bg-[#009688] text-white font-bold text-[13px] transition-all shadow-xs shrink-0 cursor-pointer flex items-center justify-center gap-2"
        >
          <span>Acceder a orientación</span>
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </section>

      {/* 7. Sección: 🔗 FUENTES OFICIALES */}
      <section className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-7 flex flex-col gap-4 shadow-xs">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-[18px]">🔗</span>
            <h3 className="text-[17px] font-extrabold text-[#0F3B82]">
              Fuentes oficiales del sistema financiero peruano
            </h3>
          </div>
          <p className="text-[12.5px] text-[#5E6E82] mt-0.5">
            Entidades públicas de regulación, supervisión y protección al consumidor en el Perú.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          {OFFICIAL_SOURCES_DATA.map((source) => (
            <div
              key={source.id}
              className="p-4 rounded-xl bg-[#F0F4F9] border border-[#E2E8F0] flex flex-col justify-between gap-3"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-white border border-[#E2E8F0] flex items-center justify-center font-extrabold text-[#0F3B82] text-[14px] shadow-2xs mb-2">
                  {source.name}
                </div>
                <span className="font-bold text-[14px] text-[#0F3B82] block">
                  {source.name}
                </span>
                <span className="text-[11px] font-medium text-[#1A2B42] block mt-0.5 leading-snug">
                  {source.fullName}
                </span>
              </div>

              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11.5px] font-bold text-[#0F3B82] hover:text-[#00B49F] inline-flex items-center gap-1 self-start pt-1 transition-colors"
              >
                <span>Portal oficial</span>
                <span className="material-symbols-outlined text-[13px]">open_in_new</span>
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
