import React, { useState } from 'react';
import { TabType } from './types';
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
import { PerfilScreen } from './components/screens/PerfilScreen';

// Modals and Utilities
import { RegisterPaymentModal } from './components/modals/RegisterPaymentModal';
import { AddDebtModal } from './components/modals/AddDebtModal';
import { AddGoalModal } from './components/modals/AddGoalModal';
import { DebtDetailModal } from './components/modals/DebtDetailModal';
import { OnboardingModal } from './components/modals/OnboardingModal';
import { ToastNotification } from './components/common/ToastNotification';
import { QuickActionFAB } from './components/common/QuickActionFAB';

function AppContent() {
  const [currentTab, setCurrentTab] = useState<TabType>('inicio');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, debts, healthScore } = useFinance();

  const handleNavigate = (tab: TabType) => {
    setCurrentTab(tab);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
          <div className="relative w-4/5 max-w-xs bg-white min-h-screen p-5 flex flex-col justify-between shadow-2xl z-50 border-r border-slate-200 overflow-y-auto">
            <div className="flex flex-col gap-5">
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <img src="/logo-aldia.svg" alt="Logo AlDía" className="h-9 w-auto object-contain shrink-0" />
                  <div className="flex flex-col">
                    <div className="flex items-center text-[19px] font-extrabold tracking-tight leading-none">
                      <span className="text-[#0F3B82]">Al</span>
                      <span className="text-emerald-600 ml-0.5">Día</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase leading-none mt-1">
                      Finanzas Personales
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>

              {/* Slogan */}
              <p className="text-[11.5px] text-slate-500 italic px-1">
                “Entiende tus deudas. Organiza tus pagos. Avanza tranquilo.”
              </p>

              {/* Navigation Links */}
              <div className="flex flex-col gap-1">
                <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400 px-2 mb-1">
                  Menú Principal
                </span>
                {navItems.map((item) => {
                  const isActive = currentTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavigate(item.id)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[13.5px] font-semibold transition-all text-left cursor-pointer ${
                        isActive
                          ? 'bg-[#0F3B82] text-white shadow-2xs'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="material-symbols-outlined text-[20px]"
                          style={{ color: isActive ? '#FFFFFF' : '#64748B' }}
                        >
                          {item.icon}
                        </span>
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                            isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Drawer Bottom User Info */}
            <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0F3B82] text-white font-extrabold flex items-center justify-center text-[14px]">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[13px] font-bold text-slate-900 truncate">
                  {user.name}
                </span>
                <span className="text-[11px] text-emerald-700 font-semibold truncate">
                  Salud: {healthScore.totalScore}/100
                </span>
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

        <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 pt-6 sm:pt-8 pb-16">
          {currentTab === 'inicio' && <DashboardScreen onNavigate={handleNavigate} />}
          {currentTab === 'deudas' && <MisDeudasScreen />}
          {currentTab === 'pagos' && <PagosScreen />}
          {currentTab === 'presupuesto' && <PresupuestoScreen />}
          {currentTab === 'objetivos' && <ObjetivosScreen />}
          {currentTab === 'salud' && <SaludFinancieraScreen onNavigate={handleNavigate} />}
          {currentTab === 'aprende' && <AprendeFinanzasScreen />}
          {currentTab === 'perfil' && <PerfilScreen />}
        </main>

        <Footer onNavigate={handleNavigate} />

        {/* 4. Mobile Bottom Bar Navigation */}
        <BottomNav currentTab={currentTab} onNavigate={handleNavigate} />

        {/* 5. Floating Action Button (FAB) */}
        <QuickActionFAB onNavigate={handleNavigate} />

        {/* 6. Reactive Modals and Toast */}
        <RegisterPaymentModal />
        <AddDebtModal />
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
