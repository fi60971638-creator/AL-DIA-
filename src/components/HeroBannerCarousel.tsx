import React, { useState, useEffect, useRef, useCallback } from 'react';
import { TabType } from '../types';
import imgEstudiante from '../assets/images/aldia_banner_estudiante_1792268222609.jpg';
import imgPagos from '../assets/images/aldia_banner_pagos_1792187859949.jpg';
import imgOrientacion from '../assets/images/aldia_banner_orientacion_1792187860027.jpg';
import imgSeguridad from '../assets/images/seguridad_financiera_peru_1792456729584.jpg';

interface HeroBannerCarouselProps {
  onNavigate: (tab: TabType) => void;
}

interface BannerSlide {
  id: number;
  brandTag: string;
  tagPill?: string;
  title: string;
  description: string;
  buttonText: string;
  targetTab: TabType;
  imageSrc: string;
  imageAlt: string;
  bgGradient: string;
  theme: 'light-bank' | 'navy-bank';
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
      brandTag: 'AL DÍA',
      tagPill: 'Educación Financiera Perú',
      title: 'Tu bienestar financiero también es parte de tu futuro',
      description: 'Aprende, orientate y toma mejores decisiones para tu vida financiera.',
      buttonText: 'Explora ahora',
      targetTab: 'aprende_articulos',
      imageSrc: imgEstudiante,
      imageAlt: 'Estudiante peruana sonriente con cuadernos en un día soleado en Lima',
      bgGradient: 'from-[#CDE9FA] via-[#E1F3FD] to-[#BFE3FA]',
      theme: 'light-bank',
    },
    {
      id: 1,
      brandTag: 'AL DÍA',
      tagPill: 'Organización & Presupuesto',
      title: 'Organiza tus pagos y evita atrasos',
      description: 'Planifica tus fechas y prioriza tus obligaciones mensuales con total tranquilidad.',
      buttonText: 'Ver consejos prácticos',
      targetTab: 'aprende_articulos',
      imageSrc: imgPagos,
      imageAlt: 'Persona organizando sus cuentas y presupuesto familiar',
      bgGradient: 'from-[#C5E5F9] via-[#DEF0FC] to-[#B8DEF7]',
      theme: 'light-bank',
    },
    {
      id: 2,
      brandTag: 'AL DÍA',
      tagPill: 'Videos & Derechos',
      title: '¿Se te dificulta pagar a tiempo?',
      description: 'Conoce tus derechos como usuario, alternativas formales de reprogramación y videos explicativos.',
      buttonText: 'Ver videos explicativos',
      targetTab: 'videos',
      imageSrc: imgOrientacion,
      imageAlt: 'Asesoría y acompañamiento financiero transparente',
      bgGradient: 'from-[#CBE8FA] via-[#E2F3FD] to-[#BBE1FA]',
      theme: 'light-bank',
    },
    {
      id: 3,
      brandTag: 'AL DÍA',
      tagPill: 'Seguridad & Prevención',
      title: 'Protege tu dinero de fraudes y estafas',
      description: 'Identifica ofertas falsas, protege tus cuentas y conoce dónde pedir ayuda ante la SBS, Indecopi y PNP.',
      buttonText: 'Centro de Seguridad',
      targetTab: 'seguridad',
      imageSrc: imgSeguridad,
      imageAlt: 'Personas en el Perú revisando la seguridad de sus cuentas digitales',
      bgGradient: 'from-[#C2E3F8] via-[#DCF0FD] to-[#B3DCF6]',
      theme: 'light-bank',
    },
  ];

  // Accessibility motion check
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

  // Autoplay functionality: switches every 6.5s
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
    }, 6500);

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
      aria-label="Banner principal estilo Alfin Banco de AL DÍA"
      className="relative w-full rounded-3xl overflow-hidden shadow-xl border border-sky-200/90 transition-all select-none group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Contenedor con altura amplia estilo banca digital moderna */}
      <div className="relative w-full min-h-[520px] sm:min-h-[500px] lg:min-h-[480px] xl:min-h-[510px] flex items-stretch">
        {slides.map((slide, index) => {
          const isActive = index === currentSlide;

          return (
            <div
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${index + 1} de ${slides.length}: ${slide.title}`}
              aria-hidden={!isActive}
              className={`absolute inset-0 w-full h-full transition-all duration-700 ease-out flex flex-col lg:flex-row items-stretch justify-between ${
                prefersReducedMotion ? 'duration-0' : ''
              } ${
                isActive
                  ? 'opacity-100 z-10 scale-100 pointer-events-auto'
                  : 'opacity-0 z-0 scale-[0.98] pointer-events-none'
              }`}
            >
              {/* Fondo con degradado cielo luminoso de banca peruana moderna */}
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgGradient}`} />

              {/* Ondas decorativas fluidas en tonos celestes en la esquina inferior izquierda (estilo Alfin Banco) */}
              <div className="absolute -bottom-10 -left-10 w-96 h-64 pointer-events-none z-10 opacity-70 hidden sm:block">
                <svg viewBox="0 0 400 250" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <path
                    d="M-50 180 C80 140, 160 220, 260 170 C340 130, 390 190, 450 160 L450 300 L-50 300 Z"
                    fill="#9AD6F8"
                    fillOpacity="0.45"
                  />
                  <path
                    d="M-40 210 C90 170, 180 240, 290 195 C360 165, 410 210, 460 185 L460 300 L-40 300 Z"
                    fill="#75C6F5"
                    fillOpacity="0.55"
                  />
                  <path
                    d="M-30 235 C100 200, 200 260, 310 220 C380 195, 420 230, 470 210 L470 300 L-30 300 Z"
                    fill="#4DB3F1"
                    fillOpacity="0.35"
                  />
                </svg>
              </div>

              {/* Destello solar suave superior */}
              <div className="absolute -top-24 -left-16 w-96 h-96 rounded-full bg-white/40 blur-3xl pointer-events-none" />

              {/* ========================================================= */}
              {/* COLUMNA IZQUIERDA: TEXTOS GRANDES Y BOTÓN ESTILO ALFIN    */}
              {/* ========================================================= */}
              <div className="relative z-20 w-full lg:w-[48%] xl:w-[46%] p-6 sm:p-10 lg:p-14 lg:pr-4 flex flex-col justify-center items-start text-left shrink-0">
                {/* 1. Marca destacada en grande */}
                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                  <span className="text-[28px] sm:text-[34px] font-heading font-black tracking-tight text-[#0B3B60] leading-none">
                    {slide.brandTag}
                  </span>
                  {slide.tagPill && (
                    <span className="text-[11px] font-bold text-[#007EAF] bg-white/70 px-2.5 py-0.5 rounded-full border border-[#00A3E0]/30 shadow-2xs backdrop-blur-xs">
                      {slide.tagPill}
                    </span>
                  )}
                </div>

                {/* 2. Titular principal grande y con presencia visual */}
                <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-heading font-extrabold text-[#0B3B60] tracking-tight leading-[1.12] mb-3 sm:mb-4 max-w-md">
                  {slide.title}
                </h2>

                {/* 3. Subtítulo / línea de apoyo clara */}
                <p className="text-[15px] sm:text-[16.5px] text-[#1E4E79] font-sans font-medium leading-relaxed mb-6 sm:mb-8 max-w-md">
                  {slide.description}
                </p>

                {/* 4. Botón principal redondeado «Explora ahora →» */}
                <button
                  onClick={() => onNavigate(slide.targetTab)}
                  className="group/btn px-8 sm:px-9 py-3.5 rounded-full bg-[#007EAF] hover:bg-[#006994] active:scale-95 text-white font-heading font-bold text-[15px] sm:text-[16px] transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer shadow-md hover:shadow-lg hover:gap-3"
                >
                  <span>{slide.buttonText}</span>
                  <span className="material-symbols-outlined text-[19px] group-hover/btn:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </button>
              </div>

              {/* ========================================================= */}
              {/* COLUMNA DERECHA: IMAGEN GRANDE Y COMPLETA ESTILO ALFIN    */}
              {/* ========================================================= */}
              <div className="relative z-10 w-full lg:w-[52%] xl:w-[54%] h-[300px] sm:h-[380px] lg:h-auto min-h-full flex items-stretch justify-end overflow-hidden">
                {/* Fotografía a toda altura, sin recuadro interno ni padding */}
                <img
                  src={slide.imageSrc}
                  alt={slide.imageAlt}
                  className="w-full h-full object-cover object-top sm:object-[center_top] lg:object-[center_25%] transform group-hover:scale-105 transition-transform duration-1000 ease-out"
                  loading={index === 0 ? 'eager' : 'lazy'}
                />

                {/* Difuminado suave lateral izquierdo para fundir el cielo con el fondo celeste del texto */}
                <div className="absolute inset-y-0 left-0 w-20 sm:w-32 bg-gradient-to-r from-[#CDE9FA] via-[#CDE9FA]/40 to-transparent pointer-events-none hidden lg:block" />

                {/* Difuminado inferior en móviles */}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#BFE3FA]/90 to-transparent pointer-events-none lg:hidden" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Flechas de navegación elegantes */}
      <button
        onClick={prevSlide}
        aria-label="Ver slide anterior"
        className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#0B3B60] border border-sky-200 shadow-md backdrop-blur-md flex items-center justify-center transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
      >
        <span className="material-symbols-outlined text-[22px]">chevron_left</span>
      </button>

      <button
        onClick={nextSlide}
        aria-label="Ver slide siguiente"
        className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#0B3B60] border border-sky-200 shadow-md backdrop-blur-md flex items-center justify-center transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
      >
        <span className="material-symbols-outlined text-[22px]">chevron_right</span>
      </button>

      {/* Puntos de paginación discretos en la parte inferior central */}
      <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/25 backdrop-blur-md border border-white/20 shadow-xs">
        <div className="flex items-center gap-1.5">
          {slides.map((s, idx) => {
            const isCurrent = idx === currentSlide;
            return (
              <button
                key={s.id}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Ir al slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  isCurrent
                    ? 'w-7 bg-[#007EAF] shadow-[0_0_8px_rgba(0,126,175,0.7)]'
                    : 'w-2 bg-white/60 hover:bg-white'
                }`}
              />
            );
          })}
        </div>

        <div className="w-[1px] h-3 bg-white/30 mx-0.5" />

        <button
          onClick={() => setIsPaused((prev) => !prev)}
          aria-label={isPaused ? 'Reanudar carrusel automático' : 'Pausar carrusel automático'}
          title={isPaused ? 'Reanudar avance automático' : 'Pausar avance automático'}
          className="w-4 h-4 rounded-full flex items-center justify-center text-white hover:text-sky-200 transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[13px]">
            {isPaused ? 'play_arrow' : 'pause'}
          </span>
        </button>
      </div>
    </section>
  );
};
