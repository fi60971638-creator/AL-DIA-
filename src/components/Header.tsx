import React from 'react';
import { APP_NAME, APP_SUBTITLE, APP_LOGO_URL } from '../data/initialData';
import { TabType } from '../types';

interface HeaderProps {
  currentTab: TabType;
  onNavigate: (tab: TabType) => void;
  onOpenMobileMenu?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onNavigate,
  onOpenMobileMenu,
}) => {
  const getTabLabel = () => {
    switch (currentTab) {
      case 'inicio':
        return 'Inicio';
      case 'situaciones':
        return 'Situaciones';
      case 'videos':
        return '🎥 Videos';
      case 'aprende':
        return '📚 Aprende';
      case 'casos':
        return '💡 Casos prácticos';
      case 'preguntas':
        return '❓ Preguntas frecuentes';
      case 'asesoramiento':
        return '👤 Orientación personalizada';
      case 'derechos':
        return '🛡️ Mis derechos';
      case 'fuentes':
        return '🔗 Fuentes oficiales';
      default:
        return 'AL DÍA';
    }
  };

  return (
    <header className="sticky top-0 z-20 bg-white border-b border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-3">
        {/* Left Side: Mobile Menu Button + Brand on Mobile */}
        <div className="flex items-center gap-3">
          {onOpenMobileMenu && (
            <button
              onClick={onOpenMobileMenu}
              aria-label="Abrir menú"
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-[#E5E7EB] text-[#0F3D56] hover:bg-[#F7F8FA] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">menu</span>
            </button>
          )}

          <button
            onClick={() => onNavigate('inicio')}
            className="flex items-center gap-2 text-left hover:opacity-90 transition-opacity cursor-pointer lg:hidden"
          >
            <img
              src={APP_LOGO_URL}
              alt={`Logo ${APP_NAME}`}
              className="h-7 w-auto object-contain"
            />
            <div className="flex flex-col">
              <span className="text-[16px] font-bold text-[#0F3D56] tracking-tight leading-none">
                {APP_NAME}
              </span>
              <span className="text-[9px] text-[#6B7280] font-medium leading-none mt-0.5">
                {APP_SUBTITLE}
              </span>
            </div>
          </button>

          {/* Desktop Current Section Indicator */}
          <div className="hidden lg:flex items-center gap-2">
            <span className="text-[14px] font-bold text-[#0F3D56]">
              {getTabLabel()}
            </span>
            <span className="text-[12px] text-[#6B7280]">·</span>
            <span className="text-[12px] text-[#6B7280]">
              {APP_NAME} · {APP_SUBTITLE}
            </span>
          </div>
        </div>

        {/* Right Side: Quick Action Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('asesoramiento')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[12px] sm:text-[13px] font-semibold transition-all cursor-pointer shadow-2xs ${
              currentTab === 'asesoramiento'
                ? 'bg-[#149B8A] text-white'
                : 'bg-[#0F3D56] hover:bg-[#0c2f42] text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">support_agent</span>
            <span className="hidden sm:inline">Orientación personalizada</span>
            <span className="sm:hidden">Orientación</span>
          </button>
        </div>
      </div>
    </header>
  );
};
