import React, { useState } from 'react';
import { TabType } from '../types';

interface BottomNavProps {
  currentTab: TabType;
  onNavigate: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onNavigate }) => {
  const [showLearnMenu, setShowLearnMenu] = useState(false);

  const learnItems: { id: TabType; label: string; icon: string; desc: string }[] = [
    { id: 'aprende_articulos', label: 'Guías y Artículos', icon: 'menu_book', desc: 'Presupuestos, deudas y ahorro' },
    { id: 'aprende_diccionario', label: 'Diccionario financiero', icon: 'auto_stories', desc: 'Términos bancarios sencillos' },
    { id: 'aprende_derechos', label: 'Derechos del usuario', icon: 'verified_user', desc: 'Normas SBS e Indecopi' },
    { id: 'categorias_crediticias', label: 'Categorías crediticias', icon: 'speed', desc: 'Niveles de riesgo según la SBS' },
    { id: 'market', label: 'AL DÍA Market', icon: 'storefront', desc: 'Tienda: útiles, oficina y uso diario' },
    { id: 'play', label: 'AL DÍA Play', icon: 'sports_esports', desc: 'Juegos interactivos y en línea' },
  ];

  const isAprendeActive =
    currentTab.startsWith('aprende_') || currentTab === 'categorias_crediticias';

  return (
    <>
      {/* Mobile Learn Quick Drawer */}
      {showLearnMenu && (
        <div className="fixed inset-0 z-50 md:hidden flex flex-col justify-end">
          <div
            onClick={() => setShowLearnMenu(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          />
          <div className="relative bg-white rounded-t-3xl p-5 border-t border-slate-200 shadow-2xl z-50 flex flex-col gap-3 max-h-[82vh] overflow-y-auto text-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00A3E0]" />
                <h3 className="text-[16px] font-heading font-bold text-[#0B3B60]">
                  Todas las secciones educativas
                </h3>
              </div>
              <button
                onClick={() => setShowLearnMenu(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {learnItems.map((item) => {
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      setShowLearnMenu(false);
                    }}
                    className={`flex items-start gap-3 p-3 rounded-2xl text-left transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#0B3B60] text-white shadow-xs'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200'
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        isActive ? 'bg-white/20 text-[#00A3E0]' : 'bg-white text-slate-600 border border-slate-200'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                    </div>
                    <div>
                      <span className="text-[13px] font-heading font-semibold block leading-snug">
                        {item.label}
                      </span>
                      <span
                        className={`text-[11px] font-sans font-normal leading-tight block mt-0.5 ${
                          isActive ? 'text-sky-200' : 'text-slate-500'
                        }`}
                      >
                        {item.desc}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Bar (visible ONLY on mobile screens < 768px, avoids duplicate nav on tablets) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 px-1 py-1.5 flex items-center justify-around shadow-[0_-4px_20px_rgba(11,59,96,0.08)]">
        {/* 1. Inicio */}
        <button
          onClick={() => onNavigate('inicio')}
          className={`flex-1 py-1 flex flex-col items-center justify-center gap-0.5 rounded-xl transition-all cursor-pointer ${
            currentTab === 'inicio' ? 'text-[#0B3B60] font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <span
            className="material-symbols-outlined text-[22px]"
            style={{
              color: currentTab === 'inicio' ? '#007EAF' : '#64748B',
              fontVariationSettings: currentTab === 'inicio' ? "'FILL' 1" : "'FILL' 0",
            }}
          >
            home
          </span>
          <span className="text-[10px] tracking-tight">Inicio</span>
        </button>

        {/* 2. Temas / Aprender (Drawer) */}
        <button
          onClick={() => setShowLearnMenu(true)}
          className={`flex-1 py-1 flex flex-col items-center justify-center gap-0.5 rounded-xl transition-all cursor-pointer relative ${
            isAprendeActive ? 'text-[#0B3B60] font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <div className="relative">
            <span
              className="material-symbols-outlined text-[22px]"
              style={{
                color: isAprendeActive ? '#007EAF' : '#64748B',
                fontVariationSettings: isAprendeActive ? "'FILL' 1" : "'FILL' 0",
              }}
            >
              school
            </span>
          </div>
          <span className="text-[10px] tracking-tight">Aprende</span>
        </button>

        {/* 3. AL DÍA Market */}
        <button
          onClick={() => onNavigate('market')}
          className={`flex-1 py-1 flex flex-col items-center justify-center gap-0.5 rounded-xl transition-all cursor-pointer ${
            currentTab === 'market' ? 'text-[#0B3B60] font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <span
            className="material-symbols-outlined text-[22px]"
            style={{
              color: currentTab === 'market' ? '#007EAF' : '#64748B',
              fontVariationSettings: currentTab === 'market' ? "'FILL' 1" : "'FILL' 0",
            }}
          >
            storefront
          </span>
          <span className="text-[10px] tracking-tight">Market</span>
        </button>

        {/* 4. AL DÍA Play */}
        <button
          onClick={() => onNavigate('play')}
          className={`flex-1 py-1 flex flex-col items-center justify-center gap-0.5 rounded-xl transition-all cursor-pointer relative ${
            currentTab === 'play' ? 'text-[#0B3B60] font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <div className="relative">
            <span
              className="material-symbols-outlined text-[22px]"
              style={{
                color: currentTab === 'play' ? '#007EAF' : '#64748B',
                fontVariationSettings: currentTab === 'play' ? "'FILL' 1" : "'FILL' 0",
              }}
            >
              sports_esports
            </span>
            <span className="absolute -top-1 -right-1.5 w-2 h-2 rounded-full bg-[#00A3E0]" />
          </div>
          <span className="text-[10px] tracking-tight">Play</span>
        </button>

        {/* 5. Videos (reemplaza Orientación) */}
        <button
          onClick={() => onNavigate('videos')}
          className={`flex-1 py-1 flex flex-col items-center justify-center gap-0.5 rounded-xl transition-all cursor-pointer ${
            currentTab === 'videos' ? 'text-[#0B3B60] font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <span
            className="material-symbols-outlined text-[22px]"
            style={{
              color: currentTab === 'videos' ? '#007EAF' : '#64748B',
              fontVariationSettings: currentTab === 'videos' ? "'FILL' 1" : "'FILL' 0",
            }}
          >
            smart_display
          </span>
          <span className="text-[10px] tracking-tight">Videos</span>
        </button>
      </nav>
    </>
  );
};
