import React from 'react';
import { TabType } from '../types';

interface BottomNavProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  onOpenProfile?: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onSelectTab, onOpenProfile }) => {
  const tabs = [
    { id: 'inicio' as TabType, label: 'Inicio', icon: 'home' },
    { id: 'mis-deudas' as TabType, label: 'Deudas', icon: 'account_balance_wallet' },
    { id: 'calendario' as TabType, label: 'Calendario', icon: 'calendar_today' },
    { id: 'perfil_action' as const, label: 'Perfil', icon: 'person' },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-[#FFFFFF] border-t border-[#E5E7EB] md:hidden">
      <div className="max-w-md mx-auto flex justify-around items-center h-14 px-2">
        {tabs.map((tab) => {
          const isProfile = tab.id === 'perfil_action';
          const isActive = !isProfile && currentTab === tab.id;

          const handleClick = () => {
            if (isProfile) {
              if (onOpenProfile) onOpenProfile();
            } else {
              onSelectTab(tab.id);
            }
          };

          return (
            <button
              key={tab.label}
              onClick={handleClick}
              className={`flex-1 flex flex-col items-center justify-center py-1 transition-colors cursor-pointer ${
                isActive ? 'text-[#0F3D56]' : 'text-[#6B7280] hover:text-[#25313C]'
              }`}
            >
              <span
                className="material-symbols-outlined text-[20px]"
                style={{
                  fontVariationSettings: isActive ? "'FILL' 1, 'wght' 500" : "'FILL' 0, 'wght' 400",
                }}
              >
                {tab.icon}
              </span>
              <span
                className={`text-[11px] mt-0.5 ${
                  isActive ? 'font-semibold text-[#0F3D56]' : 'font-normal text-[#6B7280]'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
