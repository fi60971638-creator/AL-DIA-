import React from 'react';
import { APP_LOGO_URL, APP_NAME, APP_SLOGAN } from '../data/initialData';
import { TabType } from '../types';

interface HeaderProps {
  currentTab: TabType;
  unreadNotificationsCount: number;
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
  onOpenWelcome: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  unreadNotificationsCount,
  onOpenNotifications,
  onOpenProfile,
  onOpenWelcome,
}) => {
  const getSubTitle = () => {
    switch (currentTab) {
      case 'inicio':
        return APP_SLOGAN;
      case 'mis-deudas':
        return 'Control de obligaciones de pago';
      case 'calendario':
        return 'Fechas y cronograma mensual';
      default:
        return APP_SLOGAN;
    }
  };

  return (
    <header className="sticky top-0 inset-x-0 z-40 bg-[#FFFFFF] border-b border-[#E5E7EB]">
      <div className="max-w-4xl mx-auto h-16 px-4 sm:px-6 flex items-center justify-between gap-3">
        <button
          onClick={onOpenWelcome}
          title="Ver bienvenida de AlDía"
          className="flex items-center gap-2.5 min-w-0 text-left hover:opacity-85 transition-opacity cursor-pointer"
        >
          <img
            alt={`Logo ${APP_NAME}`}
            className="h-8 w-auto object-contain flex-shrink-0"
            src={APP_LOGO_URL}
          />
          <div className="flex flex-col min-w-0">
            <span className="text-[18px] font-bold text-[#0F3D56] tracking-tight truncate leading-tight">
              {APP_NAME}
            </span>
            <span className="text-[12px] text-[#6B7280] font-normal truncate leading-tight">
              {getSubTitle()}
            </span>
          </div>
        </button>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            aria-label="Notificaciones y recordatorios"
            onClick={onOpenNotifications}
            className="relative w-9 h-9 flex items-center justify-center rounded-lg text-[#6B7280] hover:text-[#0F3D56] hover:bg-[#F7F8FA] border border-[#E5E7EB] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            {unreadNotificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#D64545] ring-2 ring-white"></span>
            )}
          </button>

          <button
            aria-label="Perfil de usuario"
            onClick={onOpenProfile}
            className="w-9 h-9 rounded-lg bg-[#0F3D56] hover:bg-[#0c2f42] text-white flex items-center justify-center flex-shrink-0 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">person</span>
          </button>
        </div>
      </div>
    </header>
  );
};
