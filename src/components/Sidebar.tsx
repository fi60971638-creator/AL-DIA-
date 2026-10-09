import React from 'react';
import { TabType } from '../types';
import { useFinance } from '../context/FinanceContext';

interface SidebarProps {
  currentTab: TabType;
  onNavigate: (tab: TabType) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, onNavigate }) => {
  const { debts, user } = useFinance();

  // Menú Principal: Inicio, todas las opciones de Aprender, y Orientación
  const navItems: { id: TabType; label: string; icon: string; badge?: string }[] = [
    { id: 'inicio', label: 'Inicio', icon: 'home' },
    { id: 'aprende_articulos', label: 'Guías y Artículos', icon: 'menu_book' },
    { id: 'aprende_videos', label: 'Videos SBS', icon: 'smart_display' },
    { id: 'aprende_diccionario', label: 'Diccionario financiero', icon: 'auto_stories' },
    { id: 'aprende_mitos', label: 'Mitos y verdades', icon: 'fact_check' },
    { id: 'aprende_casos', label: 'Casos prácticos', icon: 'tips_and_updates' },
    { id: 'aprende_derechos', label: 'Derechos del usuario', icon: 'verified_user' },
    { id: 'categorias_crediticias', label: 'Categorías crediticias', icon: 'speed' },
    { id: 'orientacion', label: 'Orientación', icon: 'lightbulb' },
  ];



  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-[#0B1A35] border-r border-[#172E54] fixed left-0 top-0 h-screen h-[100dvh] p-5 justify-between z-30 shadow-[4px_0_24px_rgba(0,0,0,0.15)] text-slate-100">
      {/* Brand Logo & Slogan en parte superior izquierda (Fijo, no se desplaza) */}
      <div className="shrink-0 pb-3 border-b border-white/10">
        <button
          onClick={() => onNavigate('inicio')}
          className="w-full flex items-center gap-3 text-left hover:opacity-95 transition-opacity cursor-pointer px-1 group"
        >
          <img
            src="/logo-aldia.svg"
            alt="Logo AlDía"
            className="h-10 w-10 object-contain shrink-0 group-hover:scale-105 transition-transform drop-shadow-md"
          />
          <div className="flex flex-col">
            <div className="flex items-center text-[22px] font-black tracking-tight leading-none text-white">
              AL<span className="text-[#00D2A8] ml-0.5">DÍA</span>
            </div>
            <span className="text-[9.5px] text-slate-400 font-bold tracking-wider uppercase leading-none mt-1">
              Asesoramiento en Cobranzas
            </span>
          </div>
        </button>
      </div>

      {/* Área de navegación con desplazamiento independiente si supera la altura disponible */}
      <div className="flex-1 overflow-y-auto min-h-0 py-3.5 flex flex-col gap-5 dark-sidebar-scroll pr-1 -mr-1">
        {/* Quick Slogan Card */}
        <div className="px-3.5 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-[12px] text-slate-200 font-medium leading-snug flex items-center gap-2 shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
          <span>“Organiza tus pagos. Evita atrasos.”</span>
        </div>

        {/* Menú Principal Completo */}
        <nav className="flex flex-col gap-1">
          <div className="flex items-center justify-between px-3 mb-1">
            <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400">
              Menú Principal
            </span>
          </div>
          {navItems.map((item) => {
            const isActive =
              currentTab === item.id ||
              (currentTab === 'aprende' && item.id === 'aprende_articulos');

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-[13px] font-semibold transition-all cursor-pointer text-left relative ${
                  isActive
                    ? 'bg-[#153B75] text-white font-bold border-l-4 border-emerald-400 shadow-xs'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="material-symbols-outlined text-[20px] shrink-0"
                    style={{
                      color: isActive ? '#00D2A8' : '#94A3B8',
                    }}
                  >
                    {item.icon}
                  </span>
                  <span className="truncate">{item.label}</span>
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Mini badge informativo de AlDía (Fijo en la parte inferior) */}
      <div className="shrink-0 pt-4 border-t border-white/10 flex flex-col gap-2">
        <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-400/30">
            <span className="material-symbols-outlined text-[18px]">verified</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[11.5px] font-bold text-white truncate">
              AlDía contigo
            </span>
            <span className="text-[10.5px] text-emerald-400 truncate">
              Tranquilidad en cada cuota
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};
