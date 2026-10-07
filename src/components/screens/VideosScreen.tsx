import React, { useState } from 'react';
import { VIDEOS_DATA } from '../../data/initialData';

type VideoCategoryFilter =
  | 'TODOS'
  | 'CRÉDITOS'
  | 'PAGOS'
  | 'COBRANZAS'
  | 'HISTORIAL'
  | 'DERECHOS'
  | 'FINANZAS PERSONALES';

export const VideosScreen: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<VideoCategoryFilter>('TODOS');

  const categories: VideoCategoryFilter[] = [
    'TODOS',
    'CRÉDITOS',
    'PAGOS',
    'COBRANZAS',
    'HISTORIAL',
    'DERECHOS',
    'FINANZAS PERSONALES',
  ];

  const filteredVideos = VIDEOS_DATA.filter((video) => {
    if (activeFilter === 'TODOS') return true;
    if (activeFilter === 'CRÉDITOS') return video.categoria === 'Créditos';
    if (activeFilter === 'PAGOS') return video.categoria === 'Pagos';
    if (activeFilter === 'COBRANZAS') return video.categoria === 'Cobranzas';
    if (activeFilter === 'HISTORIAL') return video.categoria === 'Historial';
    if (activeFilter === 'DERECHOS') return video.categoria === 'Derechos';
    if (activeFilter === 'FINANZAS PERSONALES') return video.categoria === 'Finanzas personales';
    return true;
  });

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <span className="text-[16px]">🎥</span>
          <span className="text-[12px] font-bold uppercase tracking-wider text-[#0F3D56] bg-blue-50 px-2 py-0.5 rounded">
            Videos Educativos
          </span>
        </div>
        <h1 className="text-[24px] sm:text-[28px] font-bold text-[#0F3D56] tracking-tight">
          Aprende en pocos minutos
        </h1>
        <p className="text-[14px] text-[#6B7280]">
          Videos educativos oficiales de la SBS para comprender mejor tus créditos, pagos y derechos de cobranza.
        </p>
      </div>

      {/* Categories Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => {
          const isActive = activeFilter === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-[12px] font-semibold transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-[#0F3D56] text-white shadow-2xs'
                  : 'bg-white text-[#6B7280] hover:text-[#0F3D56] hover:bg-[#F7F8FA] border border-[#E5E7EB]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredVideos.map((video) => (
          <div
            key={video.id}
            className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden flex flex-col justify-between shadow-2xs hover:shadow-xs transition-all group"
          >
            {/* Top Container */}
            <div className="p-4 flex flex-col gap-3">
              {/* Badges */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#0F3D56]/5 text-[#0F3D56]">
                  {video.categoria}
                </span>
                <span className="text-[11px] font-medium text-[#6B7280] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px]">timer</span>
                  {video.duracion}
                </span>
              </div>

              {/* Video Thumbnail Frame */}
              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative aspect-video rounded-lg bg-[#0F3D56] flex items-center justify-center overflow-hidden cursor-pointer group"
                aria-label={`Ver video ${video.titulo}`}
              >
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:12px_12px]" />
                <div className="w-11 h-11 rounded-full bg-white/90 text-[#0F3D56] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[26px] ml-0.5">play_arrow</span>
                </div>
                <span className="absolute bottom-2 right-2 text-[10px] font-bold px-1.5 py-0.5 rounded bg-black/70 text-white">
                  {video.fuente}
                </span>
              </a>

              {/* Title & Description */}
              <div>
                <h3 className="text-[14px] font-bold text-[#25313C] leading-snug group-hover:text-[#0F3D56] transition-colors">
                  {video.titulo}
                </h3>
                {video.descripcion && (
                  <p className="text-[12px] text-[#6B7280] mt-1 leading-snug">
                    {video.descripcion}
                  </p>
                )}
              </div>
            </div>

            {/* Bottom Action */}
            <div className="p-4 pt-0">
              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 rounded-lg bg-[#F7F8FA] hover:bg-[#0F3D56] text-[#0F3D56] hover:text-white border border-[#E5E7EB] hover:border-[#0F3D56] text-[12px] font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[15px]">open_in_new</span>
                <span>Ver video en YouTube</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {filteredVideos.length === 0 && (
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8 text-center flex flex-col items-center gap-2">
          <span className="material-symbols-outlined text-[32px] text-[#6B7280]">
            video_library
          </span>
          <span className="text-[14px] font-medium text-[#25313C]">
            No hay videos en esta categoría por el momento.
          </span>
          <button
            onClick={() => setActiveFilter('TODOS')}
            className="text-[13px] font-semibold text-[#0F3D56] hover:underline cursor-pointer mt-1"
          >
            Ver todos los videos
          </button>
        </div>
      )}

      {/* Official Footnote */}
      <div className="p-4 rounded-xl bg-[#F7F8FA] border border-[#E5E7EB] flex items-center justify-between gap-3 text-[12px] text-[#6B7280]">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] text-[#0F3D56]">verified</span>
          <span>Videos producidos oficialmente por el Programa de Educación Financiera de la SBS.</span>
        </div>
        <a
          href="https://www.sbs.gob.pe"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-[#0F3D56] hover:text-[#149B8A] inline-flex items-center gap-0.5 shrink-0"
        >
          <span>SBS Perú</span>
          <span className="material-symbols-outlined text-[13px]">open_in_new</span>
        </a>
      </div>
    </div>
  );
};
