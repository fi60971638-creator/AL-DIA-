import React, { useState } from 'react';
import { TabType, SituationId } from './types';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { Footer } from './components/Footer';
import { InicioScreen } from './components/screens/InicioScreen';
import { SituacionesScreen } from './components/screens/SituacionesScreen';
import { VideosScreen } from './components/screens/VideosScreen';
import { AprendeScreen } from './components/screens/AprendeScreen';
import { CasosPracticosScreen } from './components/screens/CasosPracticosScreen';
import { PreguntasFrecuentesScreen } from './components/screens/PreguntasFrecuentesScreen';
import { AsesoramientoScreen } from './components/screens/AsesoramientoScreen';
import { DerechosScreen } from './components/screens/DerechosScreen';
import { FuentesOficialesScreen } from './components/screens/FuentesOficialesScreen';
import {
  APP_NAME,
  APP_SUBTITLE,
  APP_LOGO_URL,
  OFFICIAL_SOURCES_DATA,
} from './data/initialData';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('inicio');
  const [selectedSituationId, setSelectedSituationId] = useState<SituationId>('no-puedo-pagar');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigate = (tab: TabType) => {
    setCurrentTab(tab);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectSituation = (id: SituationId) => {
    setSelectedSituationId(id);
    setCurrentTab('situaciones');
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems: { id: TabType; label: string; icon: string; emoji?: string }[] = [
    { id: 'inicio', label: 'Inicio', icon: 'home' },
    { id: 'situaciones', label: 'Situaciones', icon: 'category' },
    { id: 'videos', label: 'Videos', icon: 'smart_display', emoji: '🎥' },
    { id: 'aprende', label: 'Aprende', icon: 'school', emoji: '📚' },
    { id: 'casos', label: 'Casos prácticos', icon: 'psychology', emoji: '💡' },
    { id: 'preguntas', label: 'Preguntas frecuentes', icon: 'help_outline', emoji: '❓' },
    { id: 'asesoramiento', label: 'Orientación personalizada', icon: 'support_agent', emoji: '👤' },
    { id: 'derechos', label: 'Mis derechos', icon: 'shield', emoji: '🛡️' },
    { id: 'fuentes', label: 'Fuentes oficiales', icon: 'verified', emoji: '🔗' },
  ];

  return (
    <div className="min-h-screen bg-[#F7F8FA] text-[#25313C] flex font-sans antialiased selection:bg-teal-100">
      {/* 1. Desktop Sidebar Navigation (Left column, compact) */}
      <Sidebar currentTab={currentTab} onNavigate={handleNavigate} />

      {/* 2. Mobile Left Drawer Sheet */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-2xs transition-opacity"
          />

          {/* Drawer Content */}
          <div className="relative w-4/5 max-w-xs bg-white min-h-screen p-5 flex flex-col justify-between shadow-2xl z-50 border-r border-[#E5E7EB] overflow-y-auto">
            <div className="flex flex-col gap-5">
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
                <div className="flex items-center gap-2.5">
                  <img src={APP_LOGO_URL} alt={APP_NAME} className="h-7 w-auto object-contain" />
                  <div className="flex flex-col">
                    <span className="text-[17px] font-bold text-[#0F3D56] leading-none">
                      {APP_NAME}
                    </span>
                    <span className="text-[10px] text-[#6B7280] font-medium leading-none mt-0.5">
                      {APP_SUBTITLE}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-[#6B7280] hover:bg-[#F7F8FA] cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280] px-2 mb-1">
                  Menú Principal
                </span>
                {navItems.map((item) => {
                  const isActive = currentTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavigate(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all text-left cursor-pointer ${
                        isActive
                          ? 'bg-[#0F3D56] text-white font-semibold shadow-2xs'
                          : 'text-[#25313C] hover:bg-[#F7F8FA]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {item.emoji ? (
                          <span className="text-[15px]">{item.emoji}</span>
                        ) : (
                          <span
                            className="material-symbols-outlined text-[20px]"
                            style={{ color: isActive ? '#FFFFFF' : '#6B7280' }}
                          >
                            {item.icon}
                          </span>
                        )}
                        <span>{item.label}</span>
                      </div>
                      <span className="material-symbols-outlined text-[16px] opacity-60">
                        chevron_right
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Drawer Bottom Sources */}
            <div className="pt-4 border-t border-[#E5E7EB] flex flex-col gap-2">
              <span className="text-[11px] font-bold text-[#0F3D56]">Fuentes oficiales</span>
              <div className="grid grid-cols-3 gap-1.5 text-center text-[11px]">
                {OFFICIAL_SOURCES_DATA.map((s) => (
                  <a
                    key={s.id}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-[#F7F8FA] border border-[#E5E7EB] font-bold text-[#0F3D56]"
                  >
                    {s.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Main Content Column */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          currentTab={currentTab}
          onNavigate={handleNavigate}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        />

        <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 pt-6 sm:pt-8 pb-12">
          {currentTab === 'inicio' && (
            <InicioScreen
              onNavigate={handleNavigate}
              onSelectSituation={handleSelectSituation}
            />
          )}

          {currentTab === 'situaciones' && (
            <SituacionesScreen
              selectedSituationId={selectedSituationId}
              onSelectSituation={(id) => setSelectedSituationId(id)}
            />
          )}

          {currentTab === 'videos' && <VideosScreen />}

          {currentTab === 'aprende' && <AprendeScreen />}

          {currentTab === 'casos' && <CasosPracticosScreen />}

          {currentTab === 'preguntas' && <PreguntasFrecuentesScreen />}

          {currentTab === 'asesoramiento' && <AsesoramientoScreen />}

          {currentTab === 'derechos' && <DerechosScreen />}

          {currentTab === 'fuentes' && <FuentesOficialesScreen />}
        </main>

        <Footer onNavigate={handleNavigate} />

        <BottomNav currentTab={currentTab} onNavigate={handleNavigate} />
      </div>
    </div>
  );
}
