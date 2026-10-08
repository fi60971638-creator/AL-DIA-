import React from 'react';
import { TabType } from '../types';
import { useFinance } from '../context/FinanceContext';

interface SidebarProps {
  currentTab: TabType;
  onNavigate: (tab: TabType) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, onNavigate }) => {
  const { debts, healthScore, user } = useFinance();

  const navItems: { id: TabType; label: string; icon: string; badge?: string }[] = [
    { id: 'inicio', label: 'Inicio', icon: 'dashboard' },
    { id: 'deudas', label: 'Mis deudas', icon: 'credit_card', badge: debts.length.toString() },
    { id: 'pagos', label: 'Próximos pagos', icon: 'calendar_month' },
    { id: 'presupuesto', label: 'Mi presupuesto', icon: 'pie_chart' },
    { id: 'objetivos', label: 'Mis objetivos', icon: 'flag' },
    { id: 'salud', label: 'Salud financiera', icon: 'verified', badge: `${healthScore.totalScore}` },
    { id: 'aprende', label: 'Aprende', icon: 'school' },
    { id: 'perfil', label: 'Mi perfil', icon: 'person' },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-white border-r border-slate-200 min-h-screen sticky top-0 p-5 justify-between z-30 shadow-[2px_0_12px_rgba(0,0,0,0.02)]">
      <div className="flex flex-col gap-6">
        {/* Brand Logo & Slogan */}
        <button
          onClick={() => onNavigate('inicio')}
          className="flex items-center gap-3 text-left hover:opacity-90 transition-opacity cursor-pointer px-1 group"
        >
          <img
            src="/logo-aldia.svg"
            alt="Logo AlDía"
            className="h-10 w-auto object-contain flex-shrink-0 group-hover:scale-105 transition-transform"
          />
          <div className="flex flex-col">
            <div className="flex items-center text-[20px] font-extrabold tracking-tight leading-tight">
              <span className="text-[#0F3B82]">Al</span>
              <span className="text-emerald-600 ml-0.5">Día</span>
            </div>
            <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase leading-tight mt-0.5">
              Fintech Personal
            </span>
          </div>
        </button>

        {/* Quick Slogan Badge */}
        <div className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-600 leading-snug">
          “Entiende tus deudas. Organiza tus pagos. Avanza tranquilo.”
        </div>

        {/* Navigation Menu */}
        <nav className="flex flex-col gap-1">
          <span className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-400 px-3 mb-1">
            Menú Principal
          </span>
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[13.5px] font-semibold transition-all cursor-pointer text-left ${
                  isActive
                    ? 'bg-[#0F3B82] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="material-symbols-outlined text-[20px] shrink-0"
                    style={{
                      color: isActive ? '#FFFFFF' : '#64748B',
                    }}
                  >
                    {item.icon}
                  </span>
                  <span className="truncate">{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* User profile bottom chip */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
        <button
          onClick={() => onNavigate('perfil')}
          className="flex items-center gap-2.5 text-left hover:opacity-80 transition-opacity cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-[#0F3B82] text-white font-bold flex items-center justify-center text-[13px] shadow-2xs">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[13px] font-bold text-slate-900 truncate group-hover:text-emerald-700">
              {user.name}
            </span>
            <span className="text-[11px] text-slate-400 truncate">
              {user.primaryGoal}
            </span>
          </div>
        </button>

        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" title="Al día" />
      </div>
    </aside>
  );
};
