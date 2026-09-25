import React from 'react';
import { APP_LOGO_URL, APP_NAME } from '../data/initialData';
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
        return 'Panel Principal';
      case 'mis-deudas':
        return 'Mis Deudas';
      case 'calendario':
        return 'Calendario de Pagos';
      case 'capacidad':
        return 'Capacidad & Simulador';
      case 'educacion':
        return 'Educación & Reporte SBS';
      case 'asesor':
        return 'Asesor AlDía';
      default:
        return 'Inicio';
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-[#faf8ff]/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] pt-safe border-b border-[#eaedff]">
      <div className="max-w-lg mx-auto h-16 px-4 flex items-center justify-between gap-2">
        <button
          onClick={onOpenWelcome}
          title="Ver bienvenida de AlDía"
          className="flex items-center gap-2.5 min-w-0 text-left hover:opacity-80 transition-opacity cursor-pointer"
        >
          <img
            alt={`Logo ${APP_NAME}`}
            className="h-8 w-auto object-contain flex-shrink-0"
            src={APP_LOGO_URL}
          />
          <div className="flex flex-col min-w-0">
            <span className="font-headline-sm text-[18px] font-extrabold text-[#0037b0] tracking-tight truncate leading-tight">
              {APP_NAME}
            </span>
            <span className="font-label-sm text-[11px] text-[#434655] font-medium truncate leading-tight">
              {getSubTitle()}
            </span>
          </div>
        </button>

        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button
            aria-label="Notificaciones y recordatorios"
            onClick={onOpenNotifications}
            className="relative w-10 h-10 flex items-center justify-center rounded-2xl text-[#434655] hover:text-[#0037b0] hover:bg-blue-50/60 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-amber-500 ring-2 ring-white animate-pulse"></span>
            )}
          </button>

          <button
            aria-label="Perfil de usuario"
            onClick={onOpenProfile}
            className="w-9 h-9 rounded-2xl bg-[#0037b0] flex items-center justify-center flex-shrink-0 shadow-xs active:scale-95 transition-transform cursor-pointer"
          >
            <span className="material-symbols-outlined text-white text-[18px]">person</span>
          </button>
        </div>
      </div>
    </header>
  );
};
