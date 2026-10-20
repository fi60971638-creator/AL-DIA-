import React, { useState, useMemo } from 'react';
import { TabType, VideoItem } from '../../types';
import { VIDEOS_DATA } from '../../data/initialData';

interface VideosScreenProps {
  onNavigate?: (tab: TabType) => void;
}

// Componente para miniatura con fallback automático
const VideoThumbnail: React.FC<{ url: string; fallbackTitle: string; initialThumbnail?: string; duracion: string }> = ({
  url,
  fallbackTitle,
  initialThumbnail,
  duracion,
}) => {
  const [imgSrc, setImgSrc] = useState<string>(() => {
    if (initialThumbnail) return initialThumbnail;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : '';
  });
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative aspect-video w-full bg-slate-900 overflow-hidden">
      {!hasError && imgSrc ? (
        <img
          src={imgSrc}
          alt={fallbackTitle}
          onError={() => {
            if (imgSrc.includes('hqdefault.jpg')) {
              setImgSrc(imgSrc.replace('hqdefault.jpg', 'mqdefault.jpg'));
            } else {
              setHasError(true);
            }
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-[#0B3B60] via-[#09476B] to-slate-900 flex items-center justify-center p-4 text-center">
          <span className="material-symbols-outlined text-white/40 text-[48px]">smart_display</span>
        </div>
      )}

      {/* Overlay de gradiente */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

      {/* Botón de reproducción central estilo YouTube */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-13 h-13 rounded-2xl bg-[#EA4335]/95 text-white flex items-center justify-center shadow-xl group-hover:scale-115 group-hover:bg-[#CC0000] transition-all duration-200">
          <span className="material-symbols-outlined text-[30px] ml-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
            play_arrow
          </span>
        </div>
      </div>

      {/* Duración del video */}
      <span className="absolute bottom-2.5 right-2.5 z-10 text-[11px] font-bold px-2 py-0.5 rounded-md bg-black/85 text-white backdrop-blur-xs flex items-center gap-1 shadow-xs">
        <span className="material-symbols-outlined text-[13px]">schedule</span>
        <span>{duracion}</span>
      </span>

      {/* Indicador de apertura en YouTube */}
      <span className="absolute top-2.5 right-2.5 z-10 px-2 py-0.5 rounded-md bg-black/70 text-white/90 text-[10.5px] font-medium backdrop-blur-xs flex items-center gap-1 opacity-90 group-hover:opacity-100 transition-opacity">
        <span>YouTube</span>
        <span className="material-symbols-outlined text-[12px]">open_in_new</span>
      </span>
    </div>
  );
};

export const VideosScreen: React.FC<VideosScreenProps> = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // 6 Categorías funcionales solicitadas
  const categoryFilters = [
    { id: 'todos', label: 'Todos los videos', icon: 'apps' },
    { id: 'sbs_oficiales', label: 'SBS y entidades oficiales', icon: 'account_balance' },
    { id: 'creditos_historial', label: 'Créditos e historial crediticio', icon: 'speed' },
    { id: 'pagos_cobranzas', label: 'Pagos y cobranzas', icon: 'payments' },
    { id: 'presupuesto_ahorro', label: 'Presupuesto y ahorro', icon: 'savings' },
    { id: 'educacion_general', label: 'Educación financiera general', icon: 'school' },
  ];

  // Filtrado de videos
  const filteredVideos = useMemo(() => {
    return VIDEOS_DATA.filter((video) => {
      // Filtro de categoría
      const matchCategory =
        selectedCategory === 'todos' ||
        (selectedCategory === 'sbs_oficiales' &&
          (video.categoriaFiltro === 'sbs_oficiales' || video.tipoFuente === 'Entidad Oficial')) ||
        video.categoriaFiltro === selectedCategory;

      // Filtro de búsqueda
      const q = searchTerm.toLowerCase().trim();
      const matchSearch =
        !q ||
        video.titulo.toLowerCase().includes(q) ||
        video.canal.toLowerCase().includes(q) ||
        video.fuente.toLowerCase().includes(q) ||
        (video.descripcion && video.descripcion.toLowerCase().includes(q)) ||
        video.categoria.toLowerCase().includes(q);

      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchTerm]);

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
              <span>Videoteca Educativa Perú</span>
            </span>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Fuentes Verificadas
            </span>
          </div>

          <h1 className="text-[28px] sm:text-[34px] font-heading font-extrabold text-[#0B3B60] tracking-tight leading-tight">
            Videos de Educación Financiera
          </h1>

          <p className="text-[14px] sm:text-[15px] text-slate-600 font-sans leading-relaxed">
            Aprende sobre créditos, TCEA, Central de Riesgos, cobranzas y ahorro familiar con producciones oficiales de la <strong>SBS</strong>, <strong>BCRP</strong>, <strong>INDECOPI</strong>, <strong>MEF</strong> y especialistas reconocidos.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1 text-[11.5px] text-slate-500 font-medium">
            <span className="flex items-center gap-1 text-slate-600">
              <span className="material-symbols-outlined text-[15px] text-[#007EAF]">verified</span>
              Entidades oficiales y especialistas
            </span>
            <span>·</span>
            <span>Clic en la tarjeta para ver en YouTube</span>
            <span>·</span>
            <span>Acceso 100% gratuito</span>
          </div>
        </div>

        {/* Insignia visual */}
        <div className="hidden md:flex flex-col items-center justify-center p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center w-52 shrink-0">
          <div className="w-12 h-12 rounded-2xl bg-[#0B3B60] text-[#00A3E0] flex items-center justify-center shadow-xs mb-2">
            <span className="material-symbols-outlined text-[26px]">play_circle</span>
          </div>
          <span className="text-[13px] font-heading font-bold text-[#0B3B60]">
            {VIDEOS_DATA.length} Videos Disponibles
          </span>
          <span className="text-[11px] text-slate-500 mt-0.5">
            Canales Oficiales y Especialistas
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
            placeholder="Buscar videos por tema, entidad o canal (SBS, BCRP, TCEA, deudas...)"
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

        {/* 6 Chips de categorías funcionales */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categoryFilters.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-[12.5px] sm:text-[13px] font-sans font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-[#0B3B60] text-white shadow-xs'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 hover:border-slate-300'
                }`}
              >
                <span className="material-symbols-outlined text-[17px] opacity-80">{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ============================================================== */}
      {/* 3. GRID DE VIDEOS EDUCATIVOS - TARJETA CLICABLE COMPLETA       */}
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
            Prueba buscando con palabras como "crédito", "intereses", "SBS", "BCRP", "tarjetas" o selecciona otra categoría.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('todos');
            }}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0B3B60] text-[13px] font-semibold cursor-pointer"
          >
            Ver todos los videos
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {filteredVideos.map((video) => (
            <a
              key={video.id}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-[#00A3E0] transition-all duration-300 overflow-hidden flex flex-col justify-between group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#00A3E0]"
              aria-label={`Ver video en YouTube: ${video.titulo} por ${video.canal}`}
            >
              <div>
                {/* Miniatura oficial real de YouTube con botón play interactivo */}
                <VideoThumbnail
                  url={video.url}
                  fallbackTitle={video.titulo}
                  initialThumbnail={video.thumbnailUrl}
                  duracion={video.duracion}
                />

                {/* Contenido descriptivo del video */}
                <div className="p-5 flex flex-col gap-2.5">
                  {/* Fila de fuente y tipo */}
                  <div className="flex items-center justify-between text-[11px] gap-2">
                    <span
                      className={`font-bold px-2 py-0.5 rounded-md truncate max-w-[70%] ${
                        video.tipoFuente === 'Entidad Oficial'
                          ? 'bg-blue-50 text-[#0B3B60] border border-blue-200'
                          : 'bg-amber-50 text-amber-900 border border-amber-200'
                      }`}
                    >
                      {video.fuente}
                    </span>

                    <span className="text-slate-400 text-[10.5px] truncate">
                      {video.categoria}
                    </span>
                  </div>

                  {/* Canal de publicación */}
                  <div className="flex items-center gap-1.5 text-[11.5px] text-slate-500 font-medium">
                    <span className="material-symbols-outlined text-[15px] text-red-600">
                      subscriptions
                    </span>
                    <span className="truncate">{video.canal}</span>
                  </div>

                  {/* Título del video */}
                  <h3 className="text-[16px] font-heading font-bold text-[#0B3B60] group-hover:text-[#007EAF] transition-colors leading-snug line-clamp-2">
                    {video.titulo}
                  </h3>

                  {/* Descripción breve */}
                  {video.descripcion && (
                    <p className="text-[12.5px] text-slate-600 font-sans leading-relaxed line-clamp-2">
                      {video.descripcion}
                    </p>
                  )}

                  {/* Puntos clave */}
                  {video.keyTakeaways && video.keyTakeaways.length > 0 && (
                    <div className="mt-1 pt-2 border-t border-slate-100 flex flex-col gap-1">
                      <span className="text-[10.5px] font-bold text-[#007EAF] uppercase tracking-wider">
                        Qué aprenderás:
                      </span>
                      <ul className="text-[11.5px] text-slate-600 space-y-1">
                        {video.keyTakeaways.slice(0, 2).map((point, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="material-symbols-outlined text-[13px] text-emerald-600 shrink-0 mt-0.5">
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

              {/* Pie de tarjeta con llamada a la acción visual limpia (sin botones repetidos) */}
              <div className="px-5 pb-4 pt-1 flex items-center justify-between text-[12px] text-slate-500 group-hover:text-[#007EAF] transition-colors border-t border-slate-100">
                <span className="font-semibold flex items-center gap-1">
                  <span>Ver video en canal oficial</span>
                </span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform text-[#00A3E0]">
                  open_in_new
                </span>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};
