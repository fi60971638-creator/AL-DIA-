import React, { useState, useMemo } from 'react';
import { TabType } from '../../types';
import { VIDEOS_DATA } from '../../data/initialData';
import { VideoItem } from '../../types';

interface VideosScreenProps {
  onNavigate?: (tab: TabType) => void;
}

export const VideosScreen: React.FC<VideosScreenProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('TODOS');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeVideoModal, setActiveVideoModal] = useState<VideoItem | null>(null);

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    VIDEOS_DATA.forEach((v) => {
      if (v.categoria) set.add(v.categoria);
    });
    return ['TODOS', ...Array.from(set)];
  }, []);

  // Filter videos
  const filteredVideos = useMemo(() => {
    return VIDEOS_DATA.filter((v) => {
      const matchCategory = selectedCategory === 'TODOS' || v.categoria === selectedCategory;
      const q = searchTerm.toLowerCase().trim();
      const matchSearch =
        !q ||
        v.titulo.toLowerCase().includes(q) ||
        (v.descripcion && v.descripcion.toLowerCase().includes(q)) ||
        v.categoria.toLowerCase().includes(q);
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchTerm]);

  // Helper to extract YouTube video ID for embed
  const getYouTubeEmbedUrl = (url: string) => {
    try {
      const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
      if (match && match[1]) {
        return `https://www.youtube-nocookie.com/embed/${match[1]}?autoplay=1&rel=0`;
      }
    } catch {
      // Fallback
    }
    return null;
  };

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto pb-14 fade-in text-slate-800">
      {/* ============================================================== */}
      {/* 1. ENCABEZADO DE LA SECCIÓN VIDEOS                             */}
      {/* ============================================================== */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-left">
        <div className="flex flex-col gap-2.5 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-[#007EAF] text-[11.5px] font-bold border border-sky-200">
              <span className="material-symbols-outlined text-[15px] text-[#00A3E0]">smart_display</span>
              <span>Videoteca Educativa Oficial</span>
            </span>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Videos Oficiales SBS
            </span>
          </div>

          <h1 className="text-[28px] sm:text-[34px] font-heading font-extrabold text-[#0B3B60] tracking-tight leading-tight">
            Videos
          </h1>

          <p className="text-[14px] sm:text-[15px] text-slate-600 font-sans leading-relaxed">
            Aprende de manera visual y entretenida sobre créditos, tarjetas, cobros indebidos, historial en la Central de Riesgos y derechos del usuario con la producción audiovisual oficial de la Superintendencia de Banca, Seguros y AFP (SBS).
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1 text-[11.5px] text-slate-500 font-medium">
            <span className="flex items-center gap-1 text-slate-600">
              <span className="material-symbols-outlined text-[15px] text-[#007EAF]">verified</span>
              Contenido avalado por la SBS
            </span>
            <span>·</span>
            <span>Acceso libre y 100% gratuito</span>
            <span>·</span>
            <span>Duración breve (2 a 4 minutos)</span>
          </div>
        </div>

        {/* Insignia visual SBS */}
        <div className="hidden md:flex flex-col items-center justify-center p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center w-52 shrink-0">
          <div className="w-12 h-12 rounded-2xl bg-[#0B3B60] text-[#00A3E0] flex items-center justify-center shadow-xs mb-2">
            <span className="material-symbols-outlined text-[26px]">play_circle</span>
          </div>
          <span className="text-[13px] font-heading font-bold text-[#0B3B60]">
            {VIDEOS_DATA.length} Videos Disponibles
          </span>
          <span className="text-[11px] text-slate-500 mt-0.5">
            Educación Financiera Perú
          </span>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. BUSCADOR Y FILTROS POR CATEGORÍA                            */}
      {/* ============================================================== */}
      <div className="flex flex-col gap-4">
        {/* Barra de búsqueda */}
        <div className="relative w-full max-w-xl">
          <span className="material-symbols-outlined absolute left-3.5 top-3 text-slate-400 text-[20px]">
            search
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar videos (TCEA, tarjeta de crédito, Central de Riesgos, deudas...)"
            className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-slate-800 placeholder-slate-400 text-[14px] focus:outline-none focus:border-[#00A3E0] shadow-2xs font-sans"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 text-[18px] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
        </div>

        {/* Chips de categorías */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-[12.5px] sm:text-[13px] font-sans font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-[#0B3B60] text-white shadow-xs'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 hover:border-slate-300'
                }`}
              >
                <span>{cat === 'TODOS' ? 'Todos los videos' : cat}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ============================================================== */}
      {/* 3. GRID DE VIDEOS EDUCATIVOS                                   */}
      {/* ============================================================== */}
      {filteredVideos.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 flex flex-col items-center justify-center gap-3">
          <span className="material-symbols-outlined text-[48px] text-slate-300">
            search_off
          </span>
          <h3 className="text-[17px] font-heading font-bold text-[#0B3B60]">
            No encontramos videos para "{searchTerm}"
          </h3>
          <p className="text-[13px] text-slate-500 max-w-md">
            Prueba buscando con palabras como "crédito", "intereses", "riesgos", "tarjetas" o selecciona otra categoría.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('TODOS');
            }}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0B3B60] text-[13px] font-semibold cursor-pointer"
          >
            Ver todos los videos
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-[#00A3E0] transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Miniatura interactiva con botón de reproducción */}
                <div
                  onClick={() => setActiveVideoModal(video)}
                  className="relative aspect-video bg-slate-900 cursor-pointer overflow-hidden flex items-center justify-center group/thumb"
                >
                  {/* Fondo visual estilizado */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0B3B60] via-[#09476B] to-slate-900 opacity-90 group-hover/thumb:scale-105 transition-transform duration-500" />

                  {/* Icono de play central */}
                  <div className="relative z-10 w-14 h-14 rounded-full bg-white/95 text-[#0B3B60] flex items-center justify-center shadow-xl group-hover/thumb:scale-110 group-hover/thumb:bg-[#00A3E0] group-hover/thumb:text-white transition-all duration-200">
                    <span className="material-symbols-outlined text-[32px] ml-1">
                      play_arrow
                    </span>
                  </div>

                  {/* Duración */}
                  <span className="absolute bottom-2.5 right-2.5 z-10 text-[11px] font-bold px-2 py-0.5 rounded-md bg-black/80 text-white backdrop-blur-xs flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px]">schedule</span>
                    <span>{video.duracion}</span>
                  </span>

                  {/* Categoría sobre miniatura */}
                  <span className="absolute top-2.5 left-2.5 z-10 text-[10.5px] font-bold px-2.5 py-0.5 rounded-full bg-white/90 text-[#0B3B60] backdrop-blur-xs">
                    {video.categoria}
                  </span>
                </div>

                {/* Contenido descriptivo */}
                <div className="p-5 flex flex-col gap-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
                    <span>{video.fuente}</span>
                    {video.isFeatured && (
                      <span className="text-[#007EAF] font-bold bg-sky-50 px-2 py-0.5 rounded-md">
                        Destacado
                      </span>
                    )}
                  </div>

                  <h3 className="text-[16px] font-heading font-bold text-[#0B3B60] group-hover:text-[#007EAF] transition-colors leading-snug">
                    {video.titulo}
                  </h3>

                  {video.descripcion && (
                    <p className="text-[12.5px] text-slate-600 font-sans leading-relaxed line-clamp-2">
                      {video.descripcion}
                    </p>
                  )}

                  {/* Ideas clave del video */}
                  {video.keyTakeaways && video.keyTakeaways.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-slate-100 flex flex-col gap-1">
                      <span className="text-[11px] font-bold text-[#007EAF] uppercase tracking-wider">
                        Puntos clave del video:
                      </span>
                      <ul className="text-[11.5px] text-slate-600 space-y-1">
                        {video.keyTakeaways.slice(0, 2).map((point, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="material-symbols-outlined text-[14px] text-emerald-600 shrink-0 mt-0.5">
                              check
                            </span>
                            <span className="line-clamp-1">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Botón de acción */}
              <div className="p-5 pt-0 flex gap-2">
                <button
                  onClick={() => setActiveVideoModal(video)}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-[#0B3B60] hover:bg-[#082E4D] active:scale-95 text-white font-heading font-semibold text-[13px] transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[17px] text-[#00A3E0]">
                    play_circle
                  </span>
                  <span>Ver video aquí</span>
                </button>

                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-[#0B3B60] transition-colors flex items-center justify-center cursor-pointer"
                  title="Abrir en YouTube oficial"
                >
                  <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ============================================================== */}
      {/* 4. MODAL DE REPRODUCCIÓN DE VIDEO                              */}
      {/* ============================================================== */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs fade-in">
          <div
            onClick={() => setActiveVideoModal(null)}
            className="fixed inset-0"
          />

          <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 z-10 overflow-hidden flex flex-col text-left max-h-[92vh]">
            {/* Header del modal */}
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[22px] text-[#00A3E0]">
                  smart_display
                </span>
                <span className="text-[13px] font-heading font-bold text-[#0B3B60]">
                  Reproductor de Video Educativo
                </span>
              </div>
              <button
                onClick={() => setActiveVideoModal(null)}
                className="w-8 h-8 rounded-full bg-slate-200/70 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {/* Contenedor Iframe YouTube o enlace */}
            <div className="relative w-full aspect-video bg-black">
              {getYouTubeEmbedUrl(activeVideoModal.url) ? (
                <iframe
                  src={getYouTubeEmbedUrl(activeVideoModal.url)!}
                  title={activeVideoModal.titulo}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-6 text-white text-center">
                  <span className="material-symbols-outlined text-[48px] text-[#00A3E0]">
                    video_library
                  </span>
                  <p className="text-[14px]">
                    Puedes visualizar este contenido directamente en el canal oficial de YouTube:
                  </p>
                  <a
                    href={activeVideoModal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-[#00A3E0] hover:bg-[#0089BC] text-white font-bold text-[13px] flex items-center gap-2"
                  >
                    <span>Abrir en YouTube oficial</span>
                    <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                  </a>
                </div>
              )}
            </div>

            {/* Detalles del video */}
            <div className="p-5 sm:p-6 overflow-y-auto flex flex-col gap-3">
              <div className="flex items-center justify-between text-[11px] text-slate-500 font-bold uppercase tracking-wider">
                <span className="text-[#007EAF]">{activeVideoModal.categoria}</span>
                <span>Duración: {activeVideoModal.duracion}</span>
              </div>

              <h2 className="text-[19px] sm:text-[21px] font-heading font-extrabold text-[#0B3B60] leading-snug">
                {activeVideoModal.titulo}
              </h2>

              {activeVideoModal.descripcion && (
                <p className="text-[13.5px] text-slate-600 leading-relaxed font-sans">
                  {activeVideoModal.descripcion}
                </p>
              )}

              {activeVideoModal.keyTakeaways && activeVideoModal.keyTakeaways.length > 0 && (
                <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100 flex flex-col gap-2 mt-1">
                  <strong className="text-[12.5px] font-heading font-bold text-[#0B3B60]">
                    Recomendaciones clave aprendidas:
                  </strong>
                  <ul className="text-[12.5px] text-slate-700 space-y-1.5">
                    {activeVideoModal.keyTakeaways.map((k, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-[16px] text-emerald-600 shrink-0 mt-0.5">
                          check_circle
                        </span>
                        <span>{k}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[12px] text-slate-500">
                <span>Fuente: <strong className="text-slate-800">{activeVideoModal.fuente}</strong></span>
                <a
                  href={activeVideoModal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#007EAF] hover:underline font-semibold flex items-center gap-1"
                >
                  <span>Ver en YouTube</span>
                  <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
