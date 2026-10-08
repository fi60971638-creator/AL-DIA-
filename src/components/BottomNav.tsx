import React from 'react';
import { TabType } from '../types';
import { useFinance } from '../context/FinanceContext';

interface BottomNavProps {
  currentTab: TabType;
  onNavigate: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onNavigate }) => {
  const { debts } = useFinance();

  const mobileTabs: { id: TabType; label: string; icon: string; badge?: string }[] = [
    { id: 'inicio', label: 'Inicio', icon: 'dashboard' },
    { id: 'deudas', label: 'Deudas', icon: 'credit_card', badge: debts.length.toString() },
    { id: 'pagos', label: 'Pagos', icon: 'calendar_month' },
    { id: 'aprende', label: 'Aprende', icon: 'school' },
    { id: 'perfil', label: 'Perfil', icon: 'person' },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1 flex items-center justify-around shadow-[0_-4px_16px_rgba(0,0,0,0.04)]">
      {mobileTabs.map((tab) => {
        const isActive = currentTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onNavigate(tab.id)}
            className={`flex-1 py-1.5 flex flex-col items-center justify-center gap-0.5 rounded-xl transition-all cursor-pointer relative ${
              isActive ? 'text-[#0F3B82] font-bold' : 'text-slate-400 hover:text-slate-700'
            }`}
          >
            <div className="relative">
              <span
                className="material-symbols-outlined text-[23px]"
                style={{
                  color: isActive ? '#0F3B82' : '#94A3B8',
                  fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0",
                }}
              >
                {tab.icon}
              </span>
              {tab.badge && (
                <span className="absolute -top-1 -right-2 w-4 h-4 bg-emerald-600 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                  {tab.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] tracking-tight">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
