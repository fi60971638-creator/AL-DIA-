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
    { id: 'aprende_videos', label: 'Videos oficiales SBS', icon: 'smart_display', desc: 'Material audiovisual educativo' },
    { id: 'aprende_diccionario', label: 'Diccionario financiero', icon: 'auto_stories', desc: 'Términos bancarios sencillos' },
    { id: 'aprende_mitos', label: 'Mitos y verdades', icon: 'fact_check', desc: 'Desmitifica cobranzas y créditos' },
    { id: 'aprende_casos', label: 'Casos prácticos', icon: 'tips_and_updates', desc: 'Situaciones reales explicadas' },
    { id: 'aprende_derechos', label: 'Derechos del usuario', icon: 'verified_user', desc: 'Normas SBS e Indecopi' },
  ];

  const isAprendeActive =
    currentTab === 'aprende' || currentTab.startsWith('aprende_');

  return (
    <>
      {/* Mobile Learn Quick Drawer */}
      {showLearnMenu && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end">
          <div
            onClick={() => setShowLearnMenu(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-2xs transition-opacity"
          />
          <div className="relative bg-white rounded-t-3xl p-5 border-t border-slate-200 shadow-2xl z-50 flex flex-col gap-3 max-h-[80vh] overflow-y-auto animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <h3 className="text-[16px] font-extrabold text-slate-900">
                  Todas las opciones de Aprender
                </h3>
              </div>
              <button
                onClick={() => setShowLearnMenu(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 cursor-pointer"
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
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-800'
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        isActive ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                    </div>
                    <div>
                      <span className="text-[13px] font-bold block leading-snug">
                        {item.label}
                      </span>
                      <span
                        className={`text-[11px] leading-tight block mt-0.5 ${
                          isActive ? 'text-emerald-100' : 'text-slate-500'
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

      {/* Mobile Bottom Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 px-2 py-1.5 flex items-center justify-around shadow-[0_-4px_20px_rgba(15,23,42,0.06)]">
        {/* 1. Inicio */}
        <button
          onClick={() => onNavigate('inicio')}
          className={`flex-1 py-1 flex flex-col items-center justify-center gap-0.5 rounded-xl transition-all cursor-pointer ${
            currentTab === 'inicio' ? 'text-[#0F3B82] font-bold' : 'text-slate-400 hover:text-slate-700'
          }`}
        >
          <span
            className="material-symbols-outlined text-[24px]"
            style={{
              color: currentTab === 'inicio' ? '#0F3B82' : '#94A3B8',
              fontVariationSettings: currentTab === 'inicio' ? "'FILL' 1" : "'FILL' 0",
            }}
          >
            home
          </span>
          <span className="text-[10.5px] tracking-tight">Inicio</span>
        </button>

        {/* 2. Guías */}
        <button
          onClick={() => onNavigate('aprende_articulos')}
          className={`flex-1 py-1 flex flex-col items-center justify-center gap-0.5 rounded-xl transition-all cursor-pointer ${
            currentTab === 'aprende_articulos' ? 'text-emerald-700 font-bold' : 'text-slate-400 hover:text-slate-700'
          }`}
        >
          <span
            className="material-symbols-outlined text-[24px]"
            style={{
              color: currentTab === 'aprende_articulos' ? '#059669' : '#94A3B8',
              fontVariationSettings: currentTab === 'aprende_articulos' ? "'FILL' 1" : "'FILL' 0",
            }}
          >
            menu_book
          </span>
          <span className="text-[10.5px] tracking-tight">Guías</span>
        </button>

        {/* 3. Todas las opciones de Aprender */}
        <button
          onClick={() => setShowLearnMenu(true)}
          className={`flex-1 py-1 flex flex-col items-center justify-center gap-0.5 rounded-xl transition-all cursor-pointer relative ${
            isAprendeActive ? 'text-emerald-700 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <div className="relative">
            <span
              className="material-symbols-outlined text-[26px]"
              style={{
                color: isAprendeActive ? '#059669' : '#475569',
                fontVariationSettings: isAprendeActive ? "'FILL' 1" : "'FILL' 0",
              }}
            >
              school
            </span>
            <span className="absolute -top-1 -right-2.5 px-1 py-0.2 bg-emerald-600 text-white rounded-full text-[8.5px] font-extrabold">
              6
            </span>
          </div>
          <span className="text-[10.5px] tracking-tight">Aprender</span>
        </button>

        {/* 4. Videos SBS */}
        <button
          onClick={() => onNavigate('aprende_videos')}
          className={`flex-1 py-1 flex flex-col items-center justify-center gap-0.5 rounded-xl transition-all cursor-pointer ${
            currentTab === 'aprende_videos' ? 'text-emerald-700 font-bold' : 'text-slate-400 hover:text-slate-700'
          }`}
        >
          <span
            className="material-symbols-outlined text-[24px]"
            style={{
              color: currentTab === 'aprende_videos' ? '#059669' : '#94A3B8',
              fontVariationSettings: currentTab === 'aprende_videos' ? "'FILL' 1" : "'FILL' 0",
            }}
          >
            smart_display
          </span>
          <span className="text-[10.5px] tracking-tight">Videos SBS</span>
        </button>

        {/* 5. Orientación */}
        <button
          onClick={() => onNavigate('orientacion')}
          className={`flex-1 py-1 flex flex-col items-center justify-center gap-0.5 rounded-xl transition-all cursor-pointer ${
            currentTab === 'orientacion' ? 'text-[#0F3B82] font-bold' : 'text-slate-400 hover:text-slate-700'
          }`}
        >
          <span
            className="material-symbols-outlined text-[24px]"
            style={{
              color: currentTab === 'orientacion' ? '#0F3B82' : '#94A3B8',
              fontVariationSettings: currentTab === 'orientacion' ? "'FILL' 1" : "'FILL' 0",
            }}
          >
            lightbulb
          </span>
          <span className="text-[10.5px] tracking-tight">Orientación</span>
        </button>
      </nav>
    </>
  );
};
