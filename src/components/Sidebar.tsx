import React from 'react';
import { APP_NAME, APP_SUBTITLE, APP_LOGO_URL } from '../data/initialData';
import { TabType } from '../types';

interface SidebarProps {
  currentTab: TabType;
  onNavigate: (tab: TabType) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, onNavigate }) => {
  const navItems: { id: TabType; label: string; icon: string; emoji?: string }[] = [
    { id: 'inicio', label: 'Inicio', icon: 'home' },
    { id: 'situaciones', label: 'Situaciones', icon: 'category' },
    { id: 'videos', label: 'Videos', icon: 'smart_display', emoji: '🎥' },
    { id: 'aprende', label: 'Aprende', icon: 'school', emoji: '📚' },
    { id: 'casos', label: 'Casos prácticos', icon: 'psychology', emoji: '💡' },
    { id: 'preguntas', label: 'Preguntas frecuentes', icon: 'help_outline', emoji: '❓' },
    { id: 'asesoramiento', label: 'Orientación personalizada', icon: 'support_agent', emoji: '👤' },
    { id: 'derechos', label: 'Mis derechos', icon: 'shield', emoji: '🛡️' },
    { id: 'fuentes', label: 'Fuentes oficiales', icon: 'verified', emoji: '🔗' },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-white border-r border-[#E5E7EB] min-h-screen sticky top-0 p-5 justify-between z-30">
      <div className="flex flex-col gap-5">
        {/* Brand Logo & Title */}
        <button
          onClick={() => onNavigate('inicio')}
          className="flex items-center gap-3 text-left hover:opacity-90 transition-opacity cursor-pointer px-1"
        >
          <img
            src={APP_LOGO_URL}
            alt={`Logo ${APP_NAME}`}
            className="h-8 w-auto object-contain flex-shrink-0"
          />
          <div className="flex flex-col">
            <span className="text-[18px] font-bold text-[#0F3D56] tracking-tight leading-tight">
              {APP_NAME}
            </span>
            <span className="text-[11px] text-[#6B7280] font-medium leading-tight">
              {APP_SUBTITLE}
            </span>
          </div>
        </button>

        {/* Navigation Menu Links */}
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] font-medium transition-all cursor-pointer text-left ${
                  isActive
                    ? 'bg-[#0F3D56] text-white font-semibold shadow-2xs'
                    : 'text-[#25313C] hover:text-[#0F3D56] hover:bg-[#F7F8FA]'
                }`}
              >
                {item.emoji ? (
                  <span className="text-[15px] shrink-0">{item.emoji}</span>
                ) : (
                  <span
                    className="material-symbols-outlined text-[19px] shrink-0"
                    style={{
                      color: isActive ? '#FFFFFF' : '#6B7280',
                    }}
                  >
                    {item.icon}
                  </span>
                )}
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Tag */}
      <div className="pt-4 border-t border-[#E5E7EB] text-[11px] text-[#6B7280] flex items-center gap-2">
        <span className="material-symbols-outlined text-[15px] text-[#149B8A]">verified_user</span>
        <span>Plataforma 100% informativa</span>
      </div>
    </aside>
  );
};
