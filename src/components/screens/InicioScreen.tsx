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

  return (
    <div className="flex flex-col gap-9 max-w-4xl mx-auto">
      {/* 1. Encabezado / Hero Principal */}
      <section className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#149B8A]" />
          <span className="text-[12px] font-bold text-[#0F3D56] uppercase tracking-wider">
            {APP_NAME} · {APP_SUBTITLE}
          </span>
        </div>

        <div className="flex flex-col gap-1.5 max-w-2xl">
          <h1 className="text-[26px] sm:text-[32px] font-bold text-[#0F3D56] tracking-tight leading-tight">
            {APP_HERO_QUESTION}
          </h1>
          <p className="text-[15px] sm:text-[16px] text-[#6B7280] leading-relaxed">
            {APP_HERO_SUBTITLE}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href="#situaciones-seccion"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0F3D56] hover:bg-[#0c2f42] text-white text-[13px] sm:text-[14px] font-semibold transition-all shadow-xs cursor-pointer active:scale-[0.99]"
          >
            <span>Ver situaciones</span>
            <span className="material-symbols-outlined text-[17px]">arrow_downward</span>
          </a>

          <button
            type="button"
            onClick={() => onNavigate('aprende')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F7F8FA] hover:bg-[#E5E7EB] border border-[#E5E7EB] text-[#0F3D56] text-[13px] sm:text-[14px] font-semibold transition-all cursor-pointer active:scale-[0.99]"
          >
            <span>Aprender sobre créditos</span>
            <span className="material-symbols-outlined text-[17px]">school</span>
          </button>
        </div>
      </section>

      {/* 2. Sección: ¿QUÉ SITUACIÓN TIENES? (7 Tarjetas) */}
      <section id="situaciones-seccion" className="flex flex-col gap-4 scroll-mt-20">
        <div className="flex flex-col gap-0.5">
          <h2 className="text-[20px] font-bold text-[#0F3D56]">
            ¿Qué situación tienes?
          </h2>
          <p className="text-[13px] text-[#6B7280]">
            Selecciona una situación y conoce qué puedes hacer.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {SITUATIONS_DATA.map((situation) => (
            <button
              key={situation.id}
              type="button"
              onClick={() => onSelectSituation(situation.id)}
              className="bg-white border border-[#E5E7EB] hover:border-[#0F3D56] rounded-xl p-4.5 text-left flex flex-col justify-between gap-3 shadow-2xs hover:shadow-xs transition-all cursor-pointer group hover:-translate-y-0.5 active:translate-y-0"
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#F7F8FA] group-hover:bg-[#0F3D56]/5 border border-[#E5E7EB] flex items-center justify-center text-[#0F3D56] shrink-0 transition-colors">
                  <span className="material-symbols-outlined text-[20px]">
                    {situation.icon}
                  </span>
                </div>

                <div className="flex flex-col min-w-0">
                  <h3 className="text-[15px] font-bold text-[#25313C] group-hover:text-[#0F3D56] transition-colors leading-snug">
                    {situation.homeTitle}
                  </h3>
                  <p className="text-[12px] text-[#6B7280] mt-1 leading-relaxed line-clamp-2">
                    {situation.shortDesc}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-1 text-[12px] font-semibold text-[#0F3D56] group-hover:text-[#149B8A] pt-1 transition-colors">
                <span>Ver orientación</span>
                <span className="material-symbols-outlined text-[15px] group-hover:translate-x-0.5 transition-transform">
                  arrow_forward
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 3. Sección: 🎥 APRENDE EN 1 MINUTO (3 Videos Destacados) */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[16px]">🎥</span>
              <h2 className="text-[20px] font-bold text-[#0F3D56]">
                Aprende en 1 minuto
              </h2>
            </div>
            <p className="text-[13px] text-[#6B7280]">
              Videos educativos oficiales de la SBS explicados de forma clara y directa.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('videos')}
            className="text-[13px] font-semibold text-[#0F3D56] hover:text-[#149B8A] inline-flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>Ver todos los videos</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {featuredVideos.map((video) => (
            <div
              key={video.id}
              className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden flex flex-col justify-between shadow-2xs hover:shadow-xs transition-all group"
            >
              {/* Video Header Card */}
              <div className="p-4 flex flex-col gap-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#0F3D56]/5 text-[#0F3D56]">
                    {video.categoria}
                  </span>
                  <span className="text-[11px] font-medium text-[#6B7280] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px]">timer</span>
                    {video.duracion}
                  </span>
                </div>

                <div className="relative aspect-video rounded-lg bg-[#0F3D56] flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:12px_12px]" />
                  <div className="w-10 h-10 rounded-full bg-white/90 text-[#0F3D56] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-[24px] ml-0.5">play_arrow</span>
                  </div>
                  <span className="absolute bottom-2 right-2 text-[10px] font-bold px-1.5 py-0.5 rounded bg-black/60 text-white">
                    {video.fuente}
                  </span>
                </div>

                <h3 className="text-[13px] font-bold text-[#25313C] line-clamp-2 leading-snug group-hover:text-[#0F3D56] transition-colors">
                  {video.titulo}
                </h3>
              </div>

              <div className="px-4 pb-4 pt-1 border-t border-[#F7F8FA]">
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 rounded-lg bg-[#F7F8FA] hover:bg-[#0F3D56] text-[#0F3D56] hover:text-white border border-[#E5E7EB] hover:border-[#0F3D56] text-[12px] font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                  <span>Ver video en YouTube</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Sección: 📚 APRENDE DE FORMA SENCILLA */}
      <section className="flex flex-col gap-4">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-[16px]">📚</span>
            <h2 className="text-[20px] font-bold text-[#0F3D56]">
              Aprende de forma sencilla
            </h2>
          </div>
          <p className="text-[13px] text-[#6B7280]">
            Educación práctica y herramientas para comprender mejor tus obligaciones.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          <button
            type="button"
            onClick={() => onNavigate('aprende')}
            className="p-4.5 rounded-xl bg-white border border-[#E5E7EB] hover:border-[#149B8A] text-left flex flex-col gap-2.5 transition-all shadow-2xs hover:shadow-xs group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-[#149B8A] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">school</span>
            </div>
            <div>
              <h3 className="text-[14px] font-bold text-[#25313C] group-hover:text-[#149B8A] transition-colors">
                Conoce tu crédito
              </h3>
              <p className="text-[12px] text-[#6B7280] mt-0.5 leading-snug">
                Conceptos clave, TCEA, comisiones y condiciones.
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('aprende')}
            className="p-4.5 rounded-xl bg-white border border-[#E5E7EB] hover:border-[#0F3D56] text-left flex flex-col gap-2.5 transition-all shadow-2xs hover:shadow-xs group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#0F3D56] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">menu_book</span>
            </div>
            <div>
              <h3 className="text-[14px] font-bold text-[#25313C] group-hover:text-[#0F3D56] transition-colors">
                Diccionario financiero
              </h3>
              <p className="text-[12px] text-[#6B7280] mt-0.5 leading-snug">
                Definiciones claras de términos bancarios habituales.
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('aprende')}
            className="p-4.5 rounded-xl bg-white border border-[#E5E7EB] hover:border-[#D99A24] text-left flex flex-col gap-2.5 transition-all shadow-2xs hover:shadow-xs group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-amber-50 text-[#D99A24] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">search_insights</span>
            </div>
            <div>
              <h3 className="text-[14px] font-bold text-[#25313C] group-hover:text-[#D99A24] transition-colors">
                Mitos y verdades
              </h3>
              <p className="text-[12px] text-[#6B7280] mt-0.5 leading-snug">
                Aclaramos creencias falsas sobre deudas y cobranzas.
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('casos')}
            className="p-4.5 rounded-xl bg-white border border-[#E5E7EB] hover:border-[#6366F1] text-left flex flex-col gap-2.5 transition-all shadow-2xs hover:shadow-xs group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-indigo-50 text-[#6366F1] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">psychology</span>
            </div>
            <div>
              <h3 className="text-[14px] font-bold text-[#25313C] group-hover:text-[#6366F1] transition-colors">
                Casos prácticos
              </h3>
              <p className="text-[12px] text-[#6B7280] mt-0.5 leading-snug">
                Ejemplos interactivos para saber qué harías tú.
              </p>
            </div>
          </button>
        </div>
      </section>

      {/* 5. Sección: 🛡️ CONOCE TUS DERECHOS */}
      <section className="bg-white border border-[#E5E7EB] rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0F3D56] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[22px]">shield</span>
          </div>
          <div className="flex flex-col">
            <h3 className="text-[15px] font-bold text-[#0F3D56]">
              Conoce tus derechos como usuario financiero
            </h3>
            <p className="text-[13px] text-[#6B7280] leading-snug mt-0.5">
              Infórmate sobre tus derechos relacionados con créditos, pagos anticipados y límites legales de cobranza.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('derechos')}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#0F3D56] hover:bg-[#0c2f42] text-white font-semibold text-[13px] transition-all shadow-xs shrink-0 cursor-pointer flex items-center justify-center gap-1.5"
        >
          <span>Conocer mis derechos</span>
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </section>

      {/* 6. Sección: 👤 ¿NECESITAS UNA ORIENTACIÓN MÁS ESPECÍFICA? */}
      <section className="bg-white border border-[#E5E7EB] rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#149B8A] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[22px]">support_agent</span>
          </div>
          <div className="flex flex-col">
            <h3 className="text-[15px] font-bold text-[#0F3D56]">
              ¿Necesitas una orientación más específica?
            </h3>
            <p className="text-[13px] text-[#6B7280] leading-snug mt-0.5">
              Completa un formulario sencillo sin datos confidenciales para recibir recomendaciones estructuradas.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('asesoramiento')}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#149B8A] hover:bg-[#107d6f] text-white font-semibold text-[13px] transition-all shadow-xs shrink-0 cursor-pointer flex items-center justify-center gap-1.5"
        >
          <span>Ver orientación</span>
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </section>

      {/* 7. Sección: 🔗 FUENTES OFICIALES */}
      <section className="bg-white border border-[#E5E7EB] rounded-2xl p-5 sm:p-6 flex flex-col gap-3">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-[15px]">🔗</span>
            <h3 className="text-[15px] font-bold text-[#0F3D56]">
              Fuentes oficiales del sistema financiero
            </h3>
          </div>
          <p className="text-[12px] text-[#6B7280]">
            Entidades públicas de regulación, supervisión y protección al consumidor en el Perú.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
          {OFFICIAL_SOURCES_DATA.map((source) => (
            <div
              key={source.id}
              className="p-3.5 rounded-xl bg-[#F7F8FA] border border-[#E5E7EB] flex flex-col justify-between gap-2"
            >
              <div>
                <span className="font-bold text-[14px] text-[#0F3D56] block">
                  {source.name}
                </span>
                <span className="text-[11px] font-medium text-[#25313C] block mt-0.5 leading-snug">
                  {source.fullName}
                </span>
              </div>

              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-semibold text-[#0F3D56] hover:text-[#149B8A] inline-flex items-center gap-1 self-start pt-1"
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
