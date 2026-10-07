import React, { useState } from 'react';
import { TabType } from '../types';

interface BottomNavProps {
  currentTab: TabType;
  onNavigate: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onNavigate }) => {
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const mainTabs = [
    { id: 'inicio' as TabType, label: 'Inicio', icon: 'home' },
    { id: 'situaciones' as TabType, label: 'Situaciones', icon: 'category' },
    { id: 'videos' as TabType, label: 'Videos', icon: 'smart_display', emoji: '🎥' },
    { id: 'aprende' as TabType, label: 'Aprende', icon: 'school', emoji: '📚' },
  ];

  const moreTabs = [
    { id: 'casos' as TabType, label: '💡 Casos prácticos', icon: 'psychology' },
    { id: 'preguntas' as TabType, label: '❓ Preguntas frecuentes', icon: 'help_outline' },
    { id: 'asesoramiento' as TabType, label: '👤 Orientación personalizada', icon: 'support_agent' },
    { id: 'derechos' as TabType, label: '🛡️ Mis derechos', icon: 'shield' },
    { id: 'fuentes' as TabType, label: '🔗 Fuentes oficiales', icon: 'verified' },
  ];

  const handleSelectTab = (tab: TabType) => {
    onNavigate(tab);
    setShowMoreMenu(false);
  };

  const isMoreActive = moreTabs.some((t) => t.id === currentTab);

  return (
    <>
      {/* More Options Drawer Sheet on Mobile */}
      {showMoreMenu && (
        <div className="fixed inset-0 z-50 bg-black/40 lg:hidden flex flex-col justify-end">
          <div className="bg-white rounded-t-2xl p-5 border-t border-[#E5E7EB] shadow-xl flex flex-col gap-3 max-w-lg mx-auto w-full animate-slideUp">
            <div className="flex items-center justify-between pb-2 border-b border-[#E5E7EB]">
              <span className="text-[14px] font-bold text-[#0F3D56]">Más opciones</span>
              <button
                onClick={() => setShowMoreMenu(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[#6B7280] hover:bg-[#F7F8FA] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="flex flex-col gap-1">
              {moreTabs.map((item) => {
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectTab(item.id)}
                    className={`flex items-center gap-3 p-3 rounded-xl text-[14px] font-medium transition-colors text-left cursor-pointer ${
                      isActive
                        ? 'bg-[#0F3D56] text-white font-semibold'
                        : 'text-[#25313C] hover:bg-[#F7F8FA]'
                    }`}
                  >
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Persistent Bottom Bar for Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E5E7EB] lg:hidden shadow-[0_-2px_10px_rgba(0,0,0,0.04)]">
        <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
          {mainTabs.map((tab) => {
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  onNavigate(tab.id);
                  setShowMoreMenu(false);
                }}
                className={`flex flex-col items-center justify-center flex-1 py-1 px-2 rounded-lg transition-colors cursor-pointer ${
                  isActive ? 'text-[#0F3D56]' : 'text-[#6B7280]'
                }`}
              >
                <span
                  className="material-symbols-outlined text-[22px]"
                  style={{
                    fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0",
                    color: isActive ? '#0F3D56' : '#6B7280',
                  }}
                >
                  {tab.icon}
                </span>
                <span
                  className={`text-[11px] mt-0.5 ${
                    isActive ? 'font-bold text-[#0F3D56]' : 'font-medium'
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}

          {/* More Button */}
          <button
            onClick={() => setShowMoreMenu(!showMoreMenu)}
            className={`flex flex-col items-center justify-center flex-1 py-1 px-2 rounded-lg transition-colors cursor-pointer ${
              isMoreActive || showMoreMenu ? 'text-[#0F3D56]' : 'text-[#6B7280]'
            }`}
          >
            <span
              className="material-symbols-outlined text-[22px]"
              style={{
                color: isMoreActive || showMoreMenu ? '#0F3D56' : '#6B7280',
              }}
            >
              more_horiz
            </span>
            <span
              className={`text-[11px] mt-0.5 ${
                isMoreActive || showMoreMenu ? 'font-bold text-[#0F3D56]' : 'font-medium'
              }`}
            >
              Más
            </span>
          </button>
        </div>
      </nav>
    </>
  );
};
