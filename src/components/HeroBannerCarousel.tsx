import React, { useState, useEffect, useRef, useCallback } from 'react';
import { TabType } from '../types';

interface HeroBannerCarouselProps {
  onNavigate: (tab: TabType) => void;
}

interface BannerSlide {
  id: number;
  tag: string;
  tagIcon: string;
  title: string;
  description: string;
  buttonText: string;
  targetTab: TabType;
  imageSrc: string;
  imageAlt: string;
  tagColor: string;
  bgGradient: string;
  buttonClass: string;
}

export const HeroBannerCarousel: React.FC<HeroBannerCarouselProps> = ({ onNavigate }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const slides: BannerSlide[] = [
    {
      id: 0,
      tag: 'Educación Financiera · SBS e INDECOPI',
      tagIcon: 'school',
      title: 'Aprende a manejar tu crédito',
      description: 'Conoce cómo evaluar tasas y cronogramas antes de solicitar un préstamo para tomar decisiones seguras.',
      buttonText: 'Aprender ahora',
      targetTab: 'aprende_articulos',
      imageSrc: '/src/assets/images/aldia_banner_credito_1792187860137.jpg',
      imageAlt: 'Profesional revisando guías de educación crediticia',
      tagColor: '#00A3E0',
      bgGradient: 'from-[#0B3B60] via-[#09476B] to-[#0A425C]',
      buttonClass: 'bg-[#00A3E0] hover:bg-[#0091C8] text-white shadow-md shadow-[#00A3E0]/30 border border-[#00A3E0]',
    },
    {
      id: 1,
      tag: 'Planificación Familiar y Presupuesto',
      tagIcon: 'calendar_month',
      title: 'Organiza tus pagos',
      description: 'Planifica tus fechas de vencimiento, prioriza tus obligaciones mensuales y evita recargos innecesarios.',
      buttonText: 'Ver consejos',
      targetTab: 'aprende_articulos',
      imageSrc: '/src/assets/images/aldia_banner_pagos_1792187859949.jpg',
      imageAlt: 'Persona organizando su calendario de pagos en tablet',
      tagColor: '#F97316',
      bgGradient: 'from-[#0A425C] via-[#085474] to-[#0B3B60]',
      buttonClass: 'bg-white hover:bg-slate-50 text-[#0B3B60] shadow-md shadow-black/15 border border-white',
    },
    {
      id: 2,
      tag: 'Orientación y Derechos del Consumidor',
      tagIcon: 'support_agent',
      title: '¿Se te dificulta pagar?',
      description: 'Descubre alternativas formales de reprogramación y conoce los límites legales que protegen tu tranquilidad.',
      buttonText: 'Encuentra orientación',
      targetTab: 'orientacion',
      imageSrc: '/src/assets/images/aldia_banner_orientacion_1792187860027.jpg',
      imageAlt: 'Asesora financiera orientando de manera empática a una usuaria',
      tagColor: '#00A3E0',
      bgGradient: 'from-[#083B56] via-[#0A4F70] to-[#0B3B60]',
      buttonClass: 'bg-[#00A3E0] hover:bg-[#0091C8] text-white shadow-md shadow-[#00A3E0]/30 border border-[#00A3E0]',
    },
  ];

  // Detect accessibility motion preferences
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => {
        setPrefersReducedMotion(e.matches);
      };
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  // Autoplay functionality: switches every 6 seconds (between 5 and 7 seconds)
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (prefersReducedMotion || isPaused || isHovered) {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
      return;
    }

    autoPlayTimerRef.current = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isPaused, isHovered, prefersReducedMotion, nextSlide]);

  // Touch Swipe Handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchStartX.current - touchEndX;

    if (deltaX > 45) {
      nextSlide();
    } else if (deltaX < -45) {
      prevSlide();
    }
    touchStartX.current = null;
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Banners informativos principales de aldia"
      className="relative w-full rounded-3xl overflow-hidden shadow-lg border border-slate-200/90 transition-all select-none group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Diapositivas en contenedor relativo */}
      <div className="relative w-full min-h-[500px] sm:min-h-[460px] lg:min-h-[410px] flex items-center">
        {slides.map((slide, index) => {
          const isActive = index === currentSlide;

          return (
            <div
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`Diapositiva ${index + 1} de ${slides.length}: ${slide.title}`}
              aria-hidden={!isActive}
              className={`absolute inset-0 w-full h-full transition-all duration-700 ease-out flex flex-col lg:flex-row items-center justify-between ${
                prefersReducedMotion ? 'duration-0' : ''
              } ${
                isActive
                  ? 'opacity-100 z-10 scale-100 pointer-events-auto'
                  : 'opacity-0 z-0 scale-[0.98] pointer-events-none'
              }`}
            >
              {/* Fondo del banner con degradado institucional AlDía */}
              <div className={`absolute inset-0 bg-gradient-to-br ${slide.bgGradient}`} />

              {/* Textura sutil y halos luminosos estilo banca moderna */}
              <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-[#00A3E0]/20 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 right-1/4 w-88 h-88 rounded-full bg-[#007EAF]/25 blur-3xl pointer-events-none" />
              <div
                className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
                  backgroundSize: '24px 24px',
                }}
              />

              {/* Columna Izquierda: Información Textual Clara y Acción */}
              <div className="relative z-20 w-full lg:w-[54%] p-6 sm:p-9 lg:p-12 pb-4 lg:pb-12 flex flex-col justify-center items-start text-left">
                {/* Badge temático */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/12 backdrop-blur-md border border-white/20 text-[11.5px] sm:text-[12.5px] font-heading font-semibold text-white mb-3 sm:mb-4 shadow-xs">
                  <span
                    className="material-symbols-outlined text-[16px]"
                    style={{ color: slide.tagColor }}
                  >
                    {slide.tagIcon}
                  </span>
                  <span className="tracking-wide">{slide.tag}</span>
                </div>

                {/* Título Breve y Contundente */}
                <h2 className="text-[26px] sm:text-[34px] lg:text-[40px] font-heading font-extrabold text-white tracking-tight leading-[1.15] mb-2 sm:mb-3">
                  {slide.title}
                </h2>

                {/* Descripción concisa (máximo dos líneas) */}
                <p className="text-[14px] sm:text-[16px] text-slate-100/90 font-sans font-normal leading-relaxed mb-6 sm:mb-7 max-w-xl line-clamp-2">
                  {slide.description}
                </p>

                {/* Botón de Acción Principal y Enlace Directo */}
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => onNavigate(slide.targetTab)}
                    className={`group/btn px-7 sm:px-8 py-3.5 rounded-xl font-heading font-semibold text-[14.5px] sm:text-[15.5px] transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer active:scale-95 w-full sm:w-auto ${slide.buttonClass}`}
                  >
                    <span>{slide.buttonText}</span>
                    <span className="material-symbols-outlined text-[19px] group-hover/btn:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </button>

                  {/* Sello de orientación 100% gratuita */}
                  <span className="hidden sm:inline-flex items-center gap-1.5 text-[12.5px] font-sans font-medium text-slate-200 pl-2">
                    <span className="w-2 h-2 rounded-full bg-[#00A3E0]" />
                    <span>Orientación gratuita</span>
                  </span>
                </div>
              </div>

              {/* Columna Derecha: Imagen Protagonista con Recorte y Efecto Bancario */}
              <div className="relative z-10 w-full lg:w-[46%] h-[190px] sm:h-[230px] lg:h-full flex items-center justify-center p-4 sm:p-6 lg:p-8 pb-14 lg:pb-8">
                <div className="relative w-full h-full max-h-[350px] rounded-2xl overflow-hidden border border-white/30 shadow-2xl group/img">
                  <img
                    src={slide.imageSrc}
                    alt={slide.imageAlt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transform group-hover/img:scale-105 transition-transform duration-700 ease-out"
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />

                  {/* Degradado sobre la imagen para integración visual armónica */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B3B60]/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#0B3B60]/60 lg:via-transparent lg:to-transparent pointer-events-none" />

                  {/* Pastilla flotante con insignia institucional oficial aldia */}
                  <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200/90 flex items-center gap-2 shadow-lg">
                    <img src="/logo-aldia.svg" alt="aldia" className="w-4 h-4 object-contain" />
                    <span className="text-[11.5px] font-heading font-extrabold text-[#0B3B60] tracking-tight">
                      aldia <span className="text-[#00A3E0]">educa</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ============================================================== */}
      {/* CONTROLES DEL CARRUSEL: FLECHAS LATERALES E INDICADORES        */}
      {/* ============================================================== */}

      {/* Flecha Izquierda (Anterior) */}
      <button
        onClick={prevSlide}
        aria-label="Ver diapositiva anterior"
        className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/90 hover:bg-white text-[#0B3B60] border border-slate-200 shadow-md backdrop-blur-md flex items-center justify-center transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
      >
        <span className="material-symbols-outlined text-[22px]">chevron_left</span>
      </button>

      {/* Flecha Derecha (Siguiente) */}
      <button
        onClick={nextSlide}
        aria-label="Ver siguiente diapositiva"
        className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/90 hover:bg-white text-[#0B3B60] border border-slate-200 shadow-md backdrop-blur-md flex items-center justify-center transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
      >
        <span className="material-symbols-outlined text-[22px]">chevron_right</span>
      </button>

      {/* Barra Inferior de Navegación: Indicadores y Control de Pausa */}
      <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-md">
        {/* Indicadores de diapositiva */}
        <div className="flex items-center gap-2">
          {slides.map((s, idx) => {
            const isCurrent = idx === currentSlide;
            return (
              <button
                key={s.id}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Ir a la diapositiva ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  isCurrent
                    ? 'w-7 sm:w-8 bg-[#00A3E0] shadow-[0_0_8px_rgba(0,163,224,0.5)]'
                    : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            );
          })}
        </div>

        {/* Separador vertical fino */}
        <div className="w-[1px] h-3.5 bg-slate-300 mx-0.5" />

        {/* Botón de Pausa / Reproducción */}
        <button
          onClick={() => setIsPaused((prev) => !prev)}
          aria-label={isPaused ? 'Reanudar carrusel automático' : 'Pausar carrusel automático'}
          title={isPaused ? 'Reanudar avance automático' : 'Pausar avance automático'}
          className="w-5 h-5 rounded-full flex items-center justify-center text-slate-600 hover:text-[#0B3B60] transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">
            {isPaused ? 'play_arrow' : 'pause'}
          </span>
        </button>
      </div>
    </section>
  );
};
