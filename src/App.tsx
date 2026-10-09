import React, { useState } from 'react';
import { TabType, AprendeSubTab } from './types';
import { FinanceProvider, useFinance } from './context/FinanceContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { Footer } from './components/Footer';

// Screens
import { DashboardScreen } from './components/screens/DashboardScreen';
import { MisDeudasScreen } from './components/screens/MisDeudasScreen';
import { PagosScreen } from './components/screens/PagosScreen';
import { PresupuestoScreen } from './components/screens/PresupuestoScreen';
import { ObjetivosScreen } from './components/screens/ObjetivosScreen';
import { SaludFinancieraScreen } from './components/screens/SaludFinancieraScreen';
import { AprendeFinanzasScreen } from './components/screens/AprendeFinanzasScreen';
import { OrientacionScreen } from './components/screens/OrientacionScreen';
import { CategoriasCrediticiasScreen } from './components/screens/CategoriasCrediticiasScreen';
import { PerfilScreen } from './components/screens/PerfilScreen';

// Modals and Utilities
import { RegisterPaymentModal } from './components/modals/RegisterPaymentModal';
import { AddGoalModal } from './components/modals/AddGoalModal';
import { DebtDetailModal } from './components/modals/DebtDetailModal';
import { OnboardingModal } from './components/modals/OnboardingModal';
import { ToastNotification } from './components/common/ToastNotification';

function AppContent() {
  const [currentTab, setCurrentTab] = useState<TabType>('inicio');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [aprendeSubTab, setAprendeSubTab] = useState<AprendeSubTab>('articulos');
  const { user, healthScore } = useFinance();

  const handleNavigate = (tab: TabType) => {
    if (tab.startsWith('aprende_')) {
      const sub = tab.replace('aprende_', '') as AprendeSubTab;
      setAprendeSubTab(sub);
      setCurrentTab(tab);
    } else if (tab === 'aprende') {
      setCurrentTab('aprende');
    } else {
      setCurrentTab(tab);
    }
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const drawerNavItems: { id: TabType; label: string; icon: string }[] = [
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
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex font-sans antialiased selection:bg-emerald-100 selection:text-emerald-900">
      {/* 1. Desktop Sidebar Navigation */}
      <Sidebar currentTab={currentTab} onNavigate={handleNavigate} />

      {/* 2. Mobile Left Drawer Sheet */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex animate-in fade-in duration-200">
          {/* Backdrop */}
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-2xs transition-opacity"
          />

          {/* Drawer Content */}
          <div className="relative w-4/5 max-w-xs bg-[#0B1A35] min-h-screen p-5 flex flex-col justify-between shadow-2xl z-50 border-r border-[#172E54] overflow-y-auto text-slate-100">
            <div className="flex flex-col gap-5">
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <img src="/logo-aldia.svg" alt="Logo AlDía" className="h-9 w-auto object-contain shrink-0" />
                  <div className="flex flex-col">
                    <div className="flex items-center text-[19px] font-black tracking-tight leading-none text-white">
                      AL<span className="text-[#00D2A8] ml-0.5">DÍA</span>
                    </div>
                    <span className="text-[9.5px] text-slate-400 font-semibold uppercase leading-none mt-1">
                      Asesoramiento en Cobranzas
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>

              {/* Slogan */}
              <p className="text-[12px] text-slate-300 font-medium px-1 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>“Organiza tus pagos. Evita atrasos.”</span>
              </p>

              {/* Navigation Links */}
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 mb-1">
                  Menú Principal
                </span>
                {drawerNavItems.map((item) => {
                  const isActive =
                    currentTab === item.id ||
                    (currentTab === 'aprende' && item.id === 'aprende_articulos');
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavigate(item.id)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[13px] font-semibold transition-all text-left cursor-pointer ${
                        isActive
                          ? 'bg-[#153B75] text-white font-bold border-l-4 border-emerald-400 shadow-2xs'
                          : 'text-slate-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="material-symbols-outlined text-[20px]"
                          style={{ color: isActive ? '#00D2A8' : '#94A3B8' }}
                        >
                          {item.icon}
                        </span>
                        <span>{item.label}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Drawer Bottom User Info */}
            <div className="pt-4 border-t border-white/10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#153B75] text-white font-extrabold flex items-center justify-center text-[14px] border border-white/10">
                {user.name?.trim() ? (
                  user.name.trim().charAt(0).toUpperCase()
                ) : (
                  <span className="material-symbols-outlined text-[20px] text-[#00D2A8]">person</span>
                )}
              </div>
              <div className="flex flex-col min-w-0">
                {user.name?.trim() && (
                  <span className="text-[13px] font-bold text-white truncate">
                    {user.name.trim()}
                  </span>
                )}
                <span className="text-[11px] text-emerald-400 font-semibold truncate">
                  Salud: {healthScore.totalScore}/100
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Main Content Column */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        <Header
          currentTab={currentTab}
          onNavigate={handleNavigate}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        />

        <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 pt-6 sm:pt-8 pb-16">
          {currentTab === 'inicio' && <DashboardScreen onNavigate={handleNavigate} />}
          {currentTab === 'deudas' && <MisDeudasScreen />}
          {(currentTab === 'calendario' || currentTab === 'pagos') && <PagosScreen />}
          {currentTab === 'orientacion' && <OrientacionScreen onNavigate={handleNavigate} />}
          {currentTab === 'categorias_crediticias' && <CategoriasCrediticiasScreen />}
          {(currentTab === 'aprende' || currentTab.startsWith('aprende_')) && (
            <AprendeFinanzasScreen
              initialTab={aprendeSubTab}
              onTabChange={(sub) => {
                setAprendeSubTab(sub);
                setCurrentTab(`aprende_${sub}` as TabType);
              }}
            />
          )}
          {currentTab === 'presupuesto' && <PresupuestoScreen />}
          {currentTab === 'objetivos' && <ObjetivosScreen />}
          {currentTab === 'salud' && <SaludFinancieraScreen onNavigate={handleNavigate} />}
          {currentTab === 'perfil' && <PerfilScreen />}
        </main>

        <Footer onNavigate={handleNavigate} />

        {/* 4. Mobile Bottom Bar Navigation */}
        <BottomNav currentTab={currentTab} onNavigate={handleNavigate} />

        {/* 5. Reactive Modals and Toast */}
        <RegisterPaymentModal />
        <AddGoalModal />
        <DebtDetailModal />
        <OnboardingModal />
        <ToastNotification />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <FinanceProvider>
      <AppContent />
    </FinanceProvider>
  );
}
