import React, { useState, useEffect, useRef } from 'react';
import { TabType } from '../types';

interface HeaderProps {
  currentTab: TabType;
  onNavigate: (tab: TabType) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileExpandedSection, setMobileExpandedSection] = useState<string | null>('aprende');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Scroll detection for sticky shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click or escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveDropdown(null);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Prevent background scroll when full-screen mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleNavigate = (tab: TabType) => {
    onNavigate(tab);
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToConocenos = () => {
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
    if (currentTab !== 'inicio') {
      onNavigate('inicio');
      setTimeout(() => {
        const el = document.getElementById('conocenos');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 180);
    } else {
      const el = document.getElementById('conocenos');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Sub-items for "Aprende" (Guías, Diccionario, Derechos)
  const aprendeItems: { id: TabType; title: string; desc: string; icon: string }[] = [
    {
      id: 'aprende_articulos',
      title: 'Guías y Artículos',
      desc: 'Lecturas prácticas sobre crédito, tasas (TEA vs TCEA) y presupuestos.',
      icon: 'menu_book',
    },
    {
      id: 'aprende_diccionario',
      title: 'Diccionario financiero',
      desc: 'Conceptos bancarios explicados de forma clara y sin tecnicismos.',
      icon: 'auto_stories',
    },
    {
      id: 'aprende_derechos',
      title: 'Derechos del usuario',
      desc: 'Normas y límites de cobranza según INDECOPI y la SBS.',
      icon: 'verified_user',
    },
  ];

  const isAprendeActive = currentTab.startsWith('aprende_');
  const isVideosActive = currentTab === 'videos' || currentTab === 'aprende_videos' || currentTab === 'orientacion';
  const isCategoriasActive = currentTab === 'categorias_crediticias';
  const isSeguridadActive = currentTab === 'seguridad';
  const isMarketActive = currentTab === 'market';
  const isPlayActive = currentTab === 'play';

  return (
    <div className="sticky top-0 z-40 w-full">
      {/* ============================================================== */}
      {/* 1. FRANJA SUPERIOR MUY DELGADA                                  */}
      {/* ============================================================== */}
      <div className="w-full bg-[#0B3B60] text-white border-b border-[#082E4D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between text-[11.5px] sm:text-[12px] font-sans">
          {/* Frase institucional en el lado izquierdo */}
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00A3E0] animate-pulse shrink-0" />
            <span className="font-medium text-slate-100 tracking-tight">
              “Organiza tus pagos. Evita atrasos.”
            </span>
          </div>

          {/* Enlace pequeño a la derecha */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavigate('aprende_derechos')}
              className="inline-flex items-center gap-1 text-sky-200 hover:text-white transition-colors cursor-pointer group"
              title="Conoce tus derechos como usuario financiero"
            >
              <span>Conoce tus derechos como consumidor</span>
              <span className="material-symbols-outlined text-[13px] group-hover:translate-x-0.5 transition-transform text-[#00A3E0]">
                arrow_forward
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. ENCABEZADO FIJO DE UNA SOLA FILA                             */}
      {/* ============================================================== */}
      <header
        className={`w-full bg-white/98 backdrop-blur-md transition-shadow duration-300 border-b border-slate-200/80 ${
          isScrolled
            ? 'shadow-[0_4px_20px_rgba(11,59,96,0.08)]'
            : 'shadow-[0_1px_3px_rgba(11,59,96,0.03)]'
        }`}
      >
        <div
          ref={dropdownRef}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-[68px] flex items-center justify-between gap-4"
        >
          {/* --- LOGO A LA IZQUIERDA --- */}
          <button
            onClick={() => handleNavigate('inicio')}
            className="flex items-center gap-2.5 sm:gap-3 text-left group cursor-pointer focus:outline-hidden shrink-0"
            title="Ir al inicio de aldia"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white p-1 shadow-2xs border border-slate-200 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-200">
              <img
                src="/logo-aldia.svg"
                alt="Logotipo aldia"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[21px] sm:text-[23px] font-heading font-extrabold tracking-tight leading-none text-[#0B3B60]">
                aldia
              </span>
              <span className="text-[9px] sm:text-[9.5px] text-[#526E88] font-sans font-normal leading-tight mt-0.5 hidden sm:block">
                Plataforma digital para el asesoramiento en cobranzas
              </span>
            </div>
          </button>

          {/* --- 4 MENÚS CENTRALES CON DESPLEGABLES EN COLUMNAS (ESCRITORIO) --- */}
          <nav
            aria-label="Menú principal de navegación"
            className="hidden md:flex items-center gap-1 lg:gap-2 h-full"
          >
            {/* 1. Menú: Aprende (Desplegable en columnas) */}
            <div
              className="relative h-full flex items-center"
              onMouseEnter={() => setActiveDropdown('aprende')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() =>
                  setActiveDropdown((prev) => (prev === 'aprende' ? null : 'aprende'))
                }
                aria-expanded={activeDropdown === 'aprende'}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-[13.5px] transition-all cursor-pointer font-sans select-none ${
                  isAprendeActive || activeDropdown === 'aprende'
                    ? 'text-[#0B3B60] font-bold bg-sky-50/70 shadow-2xs'
                    : 'text-slate-700 hover:text-[#0B3B60] hover:bg-slate-50 font-medium'
                }`}
              >
                <span>Aprende</span>
                <span
                  className={`material-symbols-outlined text-[18px] transition-transform duration-200 ${
                    activeDropdown === 'aprende' ? 'rotate-180 text-[#00A3E0]' : 'text-slate-400'
                  }`}
                >
                  expand_more
                </span>
                {isAprendeActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00A3E0] ml-0.5 shrink-0" />
                )}
              </button>

              {/* Desplegable Aprende */}
              {activeDropdown === 'aprende' && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[380px] sm:w-[420px] bg-white rounded-2xl shadow-xl border border-slate-200/90 p-3 flex flex-col gap-1.5 z-50 fade-in">
                  {aprendeItems.map((item) => {
                    const isItemActive = currentTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavigate(item.id)}
                        className={`flex items-start gap-3 p-3 rounded-xl text-left transition-all cursor-pointer group ${
                          isItemActive
                            ? 'bg-sky-50/80 border border-sky-200 text-[#0B3B60]'
                            : 'hover:bg-slate-50 text-slate-700 border border-transparent'
                        }`}
                      >
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                            isItemActive
                              ? 'bg-[#0B3B60] text-white shadow-2xs'
                              : 'bg-sky-50 text-[#007EAF] border border-sky-100'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[19px]">
                            {item.icon}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`text-[13px] font-heading font-bold block leading-snug ${
                                isItemActive ? 'text-[#0B3B60]' : 'group-hover:text-[#0B3B60]'
                              }`}
                            >
                              {item.title}
                            </span>
                            {isItemActive && (
                              <span className="w-1.5 h-1.5 rounded-full bg-[#00A3E0]" />
                            )}
                          </div>
                          <p className="text-[11.5px] font-sans font-normal text-slate-500 leading-tight mt-0.5 line-clamp-2">
                            {item.desc}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 2. Menú: Seguridad (sin icono según solicitud) */}
            <button
              onClick={() => handleNavigate('seguridad')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-[13.5px] transition-all cursor-pointer font-sans select-none relative ${
                isSeguridadActive
                  ? 'text-[#0B3B60] font-bold bg-sky-50/70 shadow-2xs'
                  : 'text-slate-700 hover:text-[#0B3B60] hover:bg-slate-50 font-medium'
              }`}
            >
              <span>Seguridad</span>
              {isSeguridadActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#00A3E0] ml-0.5 shrink-0" />
              )}
            </button>

            {/* 3. Menú: Categorías SBS */}
            <div
              className="relative h-full flex items-center"
              onMouseEnter={() => setActiveDropdown('categorias')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => handleNavigate('categorias_crediticias')}
                aria-expanded={activeDropdown === 'categorias'}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-[13.5px] transition-all cursor-pointer font-sans select-none ${
                  isCategoriasActive || activeDropdown === 'categorias'
                    ? 'text-[#0B3B60] font-bold bg-sky-50/70 shadow-2xs'
                    : 'text-slate-700 hover:text-[#0B3B60] hover:bg-slate-50 font-medium'
                }`}
              >
                <span>Categorías SBS</span>
                <span
                  className={`material-symbols-outlined text-[18px] transition-transform duration-200 ${
                    activeDropdown === 'categorias' ? 'rotate-180 text-[#00A3E0]' : 'text-slate-400'
                  }`}
                >
                  expand_more
                </span>
                {isCategoriasActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00A3E0] ml-0.5 shrink-0" />
                )}
              </button>

              {/* Desplegable Categorías SBS */}
              {activeDropdown === 'categorias' && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200/90 p-3 flex flex-col gap-1.5 z-50 fade-in">
                  <div className="px-3 py-1.5 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#007EAF]">
                      Central de Riesgos SBS
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium">
                      5 Niveles Oficiales
                    </span>
                  </div>

                  <button
                    onClick={() => handleNavigate('categorias_crediticias')}
                    className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left cursor-pointer group"
                  >
                    <span className="material-symbols-outlined text-[20px] text-[#00A3E0] mt-0.5">
                      speed
                    </span>
                    <div>
                      <span className="text-[13px] font-heading font-bold text-[#0B3B60] block leading-snug group-hover:text-[#007EAF]">
                        Escala Normal a Pérdida
                      </span>
                      <span className="text-[11px] text-slate-500 font-normal leading-tight block mt-0.5">
                        Conoce qué significa Normal (0), CPP (1), Deficiente (2), Dudoso (3) y Pérdida (4).
                      </span>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNavigate('categorias_crediticias')}
                    className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left cursor-pointer group"
                  >
                    <span className="material-symbols-outlined text-[20px] text-[#00A3E0] mt-0.5">
                      fact_check
                    </span>
                    <div>
                      <span className="text-[13px] font-heading font-bold text-[#0B3B60] block leading-snug group-hover:text-[#007EAF]">
                        Días de mora e impacto crediticio
                      </span>
                      <span className="text-[11px] text-slate-500 font-normal leading-tight block mt-0.5">
                        Rangos de atraso referenciales y cómo afecta a tus nuevos créditos.
                      </span>
                    </div>
                  </button>

                  <a
                    href="https://www.sbs.gob.pe/usuarios/nuestros-servicios/reporte-de-deudas"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 mt-1 rounded-xl bg-sky-50 hover:bg-sky-100/80 text-[#0B3B60] transition-colors text-left group"
                  >
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px] text-[#00A3E0]">
                        account_balance
                      </span>
                      <span className="text-[12px] font-heading font-bold">
                        Consulta tu reporte oficial SBS con DNI
                      </span>
                    </div>
                    <span className="material-symbols-outlined text-[14px] text-slate-400 group-hover:translate-x-0.5 transition-transform">
                      open_in_new
                    </span>
                  </a>
                </div>
              )}
            </div>

            {/* 4. Menú: Videos */}
            <button
              onClick={() => handleNavigate('videos')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-[13.5px] transition-all cursor-pointer font-sans select-none relative ${
                isVideosActive
                  ? 'text-[#0B3B60] font-bold bg-sky-50/70 shadow-2xs'
                  : 'text-slate-700 hover:text-[#0B3B60] hover:bg-slate-50 font-medium'
              }`}
            >
              <span className="material-symbols-outlined text-[18px] text-[#00A3E0]">smart_display</span>
              <span>Videos</span>
              {isVideosActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#00A3E0] ml-0.5 shrink-0" />
              )}
            </button>

            {/* 5. Menú: Market */}
            <button
              onClick={() => handleNavigate('market')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-[13.5px] transition-all cursor-pointer font-sans select-none ${
                isMarketActive
                  ? 'text-[#0B3B60] font-bold bg-sky-50/70 shadow-2xs'
                  : 'text-slate-700 hover:text-[#0B3B60] hover:bg-slate-50 font-medium'
              }`}
            >
              <span className="material-symbols-outlined text-[18px] text-[#00A3E0]">storefront</span>
              <span>Market</span>
              {isMarketActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#00A3E0] ml-0.5 shrink-0" />
              )}
            </button>

            {/* 5. Menú: Play */}
            <button
              onClick={() => handleNavigate('play')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-[13.5px] transition-all cursor-pointer font-sans select-none relative ${
                isPlayActive
                  ? 'text-[#0B3B60] font-bold bg-sky-50/70 shadow-2xs'
                  : 'text-slate-700 hover:text-[#0B3B60] hover:bg-slate-50 font-medium'
              }`}
            >
              <span className="material-symbols-outlined text-[18px] text-[#00A3E0]">sports_esports</span>
              <span>Play</span>
              <span className="px-1.5 py-0.2 bg-[#F97316] text-white rounded-full text-[9px] font-black uppercase tracking-wider">
                Juegos
              </span>
              {isPlayActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#00A3E0] ml-0.5 shrink-0" />
              )}
            </button>

            {/* 6. Menú: Conócenos */}
            <div
              className="relative h-full flex items-center"
              onMouseEnter={() => setActiveDropdown('conocenos')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={handleGoToConocenos}
                aria-expanded={activeDropdown === 'conocenos'}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-[13.5px] transition-all cursor-pointer font-sans select-none ${
                  activeDropdown === 'conocenos'
                    ? 'text-[#0B3B60] font-bold bg-sky-50/70 shadow-2xs'
                    : 'text-slate-700 hover:text-[#0B3B60] hover:bg-slate-50 font-medium'
                }`}
              >
                <span>Conócenos</span>
                <span
                  className={`material-symbols-outlined text-[18px] transition-transform duration-200 ${
                    activeDropdown === 'conocenos' ? 'rotate-180 text-[#00A3E0]' : 'text-slate-400'
                  }`}
                >
                  expand_more
                </span>
              </button>

              {/* Desplegable Conócenos */}
              {activeDropdown === 'conocenos' && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-84 bg-white rounded-2xl shadow-xl border border-slate-200/90 p-3.5 flex flex-col gap-2 z-50 fade-in">
                  <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                    <div className="w-8 h-8 rounded-lg bg-sky-50 text-[#007EAF] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[18px]">info</span>
                    </div>
                    <div>
                      <h4 className="text-[13px] font-heading font-bold text-[#0B3B60]">
                        Plataforma aldia
                      </h4>
                      <p className="text-[10.5px] text-slate-500 font-sans">
                        Asesoramiento en cobranzas y educación financiera
                      </p>
                    </div>
                  </div>

                  <p className="text-[12px] text-slate-600 leading-relaxed font-sans">
                    aldia es una plataforma digital creada para brindar información imparcial, transparente y accesible sobre obligaciones crediticias y derechos del consumidor en el Perú.
                  </p>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600">
                    <strong className="text-[#0B3B60] block mb-0.5">Aviso educativo importante:</strong>
                    No somos una entidad bancaria ni realizamos cobranzas. No solicitamos contraseñas ni datos sensibles.
                  </div>

                  <button
                    onClick={handleGoToConocenos}
                    className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0B3B60] font-heading font-semibold text-[12px] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Ver más sobre nuestro propósito</span>
                    <span className="material-symbols-outlined text-[15px]">arrow_downward</span>
                  </button>
                </div>
              )}
            </div>
          </nav>



          {/* --- BOTÓN HAMBURGUESA PARA CELULARES --- */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Abrir menú principal"
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0B3B60] transition-colors cursor-pointer flex items-center justify-center focus:outline-hidden"
            >
              <span className="material-symbols-outlined text-[24px]">menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* ============================================================== */}
      {/* 3. MENÚ HAMBURGUESA A PANTALLA COMPLETA (CELULARES)            */}
      {/* ============================================================== */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col h-[100dvh] overflow-hidden fade-in md:hidden">
          {/* Barra superior del menú móvil */}
          <div className="px-5 py-4 border-b border-slate-200/90 flex items-center justify-between bg-white shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white p-1 shadow-2xs border border-slate-200 flex items-center justify-center">
                <img
                  src="/logo-aldia.svg"
                  alt="aldia"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[20px] font-heading font-extrabold text-[#0B3B60] leading-none">
                  aldia
                </span>
                <span className="text-[9px] text-[#526E88] font-sans">
                  Educación y asesoramiento
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Cerrar menú"
              className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center cursor-pointer transition-colors"
            >
              <span className="material-symbols-outlined text-[22px]">close</span>
            </button>
          </div>

          {/* Franja de lema móvil */}
          <div className="bg-[#0B3B60] px-5 py-2 text-white text-[12px] flex items-center justify-between shrink-0">
            <span className="font-medium text-slate-100">“Organiza tus pagos. Evita atrasos.”</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00A3E0]" />
          </div>

          {/* Cuerpo scrollable con los 4 menús */}
          <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3.5">
            {/* 1. SECCIÓN: APRENDE */}
            <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white">
              <button
                onClick={() =>
                  setMobileExpandedSection((prev) => (prev === 'aprende' ? null : 'aprende'))
                }
                className="w-full p-4 flex items-center justify-between text-left font-heading font-bold text-[15px] text-[#0B3B60] bg-slate-50/70 cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-sky-100 text-[#007EAF] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[19px]">school</span>
                  </div>
                  <span>Aprende (6 secciones)</span>
                </div>
                <span
                  className={`material-symbols-outlined text-[20px] text-slate-500 transition-transform ${
                    mobileExpandedSection === 'aprende' ? 'rotate-180 text-[#00A3E0]' : ''
                  }`}
                >
                  expand_more
                </span>
              </button>

              {mobileExpandedSection === 'aprende' && (
                <div className="p-2 divide-y divide-slate-100 bg-white">
                  {aprendeItems.map((item) => {
                    const isItemActive = currentTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavigate(item.id)}
                        className={`w-full p-3 rounded-xl flex items-start gap-3 text-left transition-colors cursor-pointer ${
                          isItemActive
                            ? 'bg-sky-50 text-[#0B3B60] font-bold'
                            : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <span
                          className={`material-symbols-outlined text-[20px] shrink-0 mt-0.5 ${
                            isItemActive ? 'text-[#00A3E0]' : 'text-slate-500'
                          }`}
                        >
                          {item.icon}
                        </span>
                        <div>
                          <span className="text-[13.5px] font-heading font-semibold block leading-snug">
                            {item.title}
                          </span>
                          <span className="text-[11.5px] font-sans font-normal text-slate-500 block mt-0.5 leading-tight">
                            {item.desc}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 2. SECCIÓN: VIDEOS (REEMPLAZA ORIENTACIÓN) */}
            {/* 2. SECCIÓN: SEGURIDAD */}
            <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white">
              <button
                onClick={() => handleNavigate('seguridad')}
                className={`w-full p-4 flex items-center justify-between text-left font-heading font-bold text-[15px] cursor-pointer transition-colors ${
                  isSeguridadActive
                    ? 'bg-sky-50 text-[#0B3B60]'
                    : 'bg-white hover:bg-slate-50 text-[#0B3B60]'
                }`}
              >
                <div>
                  <span>Seguridad</span>
                  <span className="text-[11.5px] font-sans font-normal text-slate-500 block">
                    Protege tu dinero, evita estafas y pide ayuda
                  </span>
                </div>
                <span className="material-symbols-outlined text-[20px] text-slate-400">
                  chevron_right
                </span>
              </button>
            </div>

            {/* 3. SECCIÓN: CATEGORÍAS SBS */}
            <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white">
              <button
                onClick={() => handleNavigate('categorias_crediticias')}
                className={`w-full p-4 flex items-center justify-between text-left font-heading font-bold text-[15px] cursor-pointer transition-colors ${
                  isCategoriasActive
                    ? 'bg-sky-50 text-[#0B3B60]'
                    : 'bg-white hover:bg-slate-50 text-[#0B3B60]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-sky-100 text-[#007EAF] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[19px]">speed</span>
                  </div>
                  <div>
                    <span>Categorías SBS</span>
                    <span className="text-[11.5px] font-sans font-normal text-slate-500 block">
                      Escala Normal, CPP, Deficiente, Dudoso, Pérdida
                    </span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[20px] text-slate-400">
                  chevron_right
                </span>
              </button>
            </div>

            {/* 4. SECCIÓN: VIDEOS */}
            <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white">
              <button
                onClick={() => handleNavigate('videos')}
                className={`w-full p-4 flex items-center justify-between text-left font-heading font-bold text-[15px] cursor-pointer transition-colors ${
                  isVideosActive
                    ? 'bg-sky-50 text-[#0B3B60]'
                    : 'bg-white hover:bg-slate-50 text-[#0B3B60]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-sky-100 text-[#007EAF] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[19px]">smart_display</span>
                  </div>
                  <div>
                    <span>Videos</span>
                    <span className="text-[11.5px] font-sans font-normal text-slate-500 block">
                      Videoteca oficial SBS sobre créditos, cuotas y derechos
                    </span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[20px] text-slate-400">
                  chevron_right
                </span>
              </button>
            </div>

            {/* 5. SECCIÓN: AL DÍA MARKET */}
            <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white">
              <button
                onClick={() => handleNavigate('market')}
                className={`w-full p-4 flex items-center justify-between text-left font-heading font-bold text-[15px] cursor-pointer transition-colors ${
                  isMarketActive
                    ? 'bg-sky-50 text-[#0B3B60]'
                    : 'bg-white hover:bg-slate-50 text-[#0B3B60]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-sky-100 text-[#007EAF] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[19px]">storefront</span>
                  </div>
                  <div>
                    <span>AL DÍA Market</span>
                    <span className="text-[11.5px] font-sans font-normal text-slate-500 block">
                      Tienda virtual: útiles de oficina y escritorio
                    </span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[20px] text-slate-400">
                  chevron_right
                </span>
              </button>
            </div>

            {/* 5. SECCIÓN: AL DÍA PLAY */}
            <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white">
              <button
                onClick={() => handleNavigate('play')}
                className={`w-full p-4 flex items-center justify-between text-left font-heading font-bold text-[15px] cursor-pointer transition-colors ${
                  isPlayActive
                    ? 'bg-sky-50 text-[#0B3B60]'
                    : 'bg-white hover:bg-slate-50 text-[#0B3B60]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-orange-100 text-[#F97316] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[19px]">sports_esports</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span>AL DÍA Play</span>
                      <span className="px-1.5 py-0.2 bg-[#F97316] text-white rounded-full text-[9px] font-black uppercase">
                        Juegos
                      </span>
                    </div>
                    <span className="text-[11.5px] font-sans font-normal text-slate-500 block">
                      Trivia, mitos v/s verdades, retos de presupuesto y casos
                    </span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[20px] text-slate-400">
                  chevron_right
                </span>
              </button>
            </div>

            {/* 6. SECCIÓN: CONÓCENOS */}
            <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white">
              <button
                onClick={handleGoToConocenos}
                className="w-full p-4 flex items-center justify-between text-left font-heading font-bold text-[15px] text-[#0B3B60] bg-white hover:bg-slate-50 cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-sky-100 text-[#007EAF] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[19px]">info</span>
                  </div>
                  <div>
                    <span>Conócenos</span>
                    <span className="text-[11.5px] font-sans font-normal text-slate-500 block">
                      Propósito pedagógico y quiénes somos
                    </span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[20px] text-slate-400">
                  chevron_right
                </span>
              </button>
            </div>

            {/* Aviso pedagógico rápido */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-[11.5px] text-slate-600 leading-relaxed">
              <strong className="text-[#0B3B60] block mb-0.5">Plataforma pedagógica aldia:</strong>
              Educación financiera basada en la normativa oficial de la SBS e INDECOPI.
            </div>
          </div>

          {/* Pie del menú móvil con el botón "Ver videos" */}
          <div className="p-4 border-t border-slate-200 bg-white shrink-0 flex flex-col gap-2">
            <button
              onClick={() => handleNavigate('videos')}
              className="w-full py-3.5 rounded-xl bg-[#0B3B60] active:scale-95 text-white font-heading font-bold text-[15px] flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px] text-[#00A3E0]">
                smart_display
              </span>
              <span>Ver videos</span>
            </button>
            <p className="text-center text-[10.5px] text-slate-400 font-sans mt-0.5">
              Material audiovisual oficial y 100% gratuito
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
