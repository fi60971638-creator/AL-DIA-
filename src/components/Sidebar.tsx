import React from 'react';
import { APP_NAME, APP_LOGO_URL } from '../data/initialData';
import { TabType, UserProfile } from '../types';

interface SidebarProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  onOpenProfile: () => void;
  onOpenWelcome: () => void;
  user: UserProfile;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  onOpenProfile,
  onOpenWelcome,
  user,
}) => {
  const navItems = [
    { id: 'inicio' as TabType, label: 'Inicio', icon: 'home' },
    { id: 'mis-deudas' as TabType, label: 'Mis deudas', icon: 'account_balance_wallet' },
    { id: 'calendario' as TabType, label: 'Calendario', icon: 'calendar_today' },
  ];

  return (
    <aside className="hidden md:flex flex-col w-60 shrink-0 bg-[#FFFFFF] border-r border-[#E5E7EB] min-h-screen sticky top-0 p-4 justify-between">
      <div className="flex flex-col gap-6">
        {/* Logo & Brand */}
        <button
          onClick={onOpenWelcome}
          className="flex items-center gap-2.5 px-2 py-1 text-left hover:opacity-85 transition-opacity cursor-pointer"
        >
          <img
            src={APP_LOGO_URL}
            alt={`Logo ${APP_NAME}`}
            className="h-8 w-auto object-contain flex-shrink-0"
          />
          <div className="flex flex-col">
            <span className="text-[19px] font-bold text-[#0F3D56] tracking-tight leading-tight">
              {APP_NAME}
            </span>
            <span className="text-[11px] text-[#6B7280]">Finanzas personales</span>
          </div>
        </button>

        {/* Navigation Items */}
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] font-medium transition-colors cursor-pointer text-left ${
                  isActive
                    ? 'bg-[#F7F8FA] text-[#0F3D56] font-semibold border border-[#E5E7EB]'
                    : 'text-[#6B7280] hover:text-[#25313C] hover:bg-[#F7F8FA]'
                }`}
              >
                <span
                  className="material-symbols-outlined text-[19px]"
                  style={{
                    color: isActive ? '#0F3D56' : '#6B7280',
                  }}
                >
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}

          <button
            onClick={onOpenProfile}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] font-medium text-[#6B7280] hover:text-[#25313C] hover:bg-[#F7F8FA] transition-colors cursor-pointer text-left"
          >
            <span className="material-symbols-outlined text-[19px] text-[#6B7280]">
              person
            </span>
            <span>Perfil</span>
          </button>
        </nav>
      </div>

      {/* Bottom Profile Summary */}
      <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-between">
        <button
          onClick={onOpenProfile}
          className="flex items-center gap-2.5 min-w-0 text-left hover:opacity-80 transition-opacity cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-[#0F3D56] text-white flex items-center justify-center font-bold text-[13px] shrink-0">
            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[13px] font-semibold text-[#25313C] truncate">
              {user.name || 'Mi perfil'}
            </span>
            <span className="text-[11px] text-[#6B7280] truncate">
              {user.email || 'AlDía'}
            </span>
          </div>
        </button>
      </div>
    </aside>
  );
};
