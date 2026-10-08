import React, { useState } from 'react';
import { TabType } from '../types';
import { useFinance } from '../context/FinanceContext';

interface HeaderProps {
  currentTab: TabType;
  onNavigate: (tab: TabType) => void;
  onOpenMobileMenu?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onNavigate,
  onOpenMobileMenu,
}) => {
  const {
    user,
    alerts,
    markAlertRead,
    openRegisterPaymentModal,
  } = useFinance();

  const [isAlertsOpen, setIsAlertsOpen] = useState(false);

  const unreadAlertsCount = alerts.filter((a) => !a.isRead).length;

  const tabTitles: Record<TabType, { title: string; subtitle: string }> = {
    inicio: { title: 'Centro de Control', subtitle: 'Resumen financiero general' },
    deudas: { title: 'Mis deudas', subtitle: 'Obligaciones y amortizaciones' },
    pagos: { title: 'Gestión de pagos', subtitle: 'Vencimientos e historial' },
    presupuesto: { title: 'Mi presupuesto', subtitle: 'Ingresos, gastos y disponibles' },
    objetivos: { title: 'Mis objetivos', subtitle: 'Metas financieras' },
    salud: { title: 'Salud financiera', subtitle: 'Diagnóstico y puntuación' },
    aprende: { title: 'Aprende sobre finanzas', subtitle: 'Guías, videos y herramientas' },
    perfil: { title: 'Mi perfil', subtitle: 'Configuración de cuenta' },
  };

  const currentInfo = tabTitles[currentTab] || { title: 'AlDía', subtitle: '' };

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 py-3.5 transition-all">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
        {/* Left Side: Mobile Menu Button & Breadcrumb */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
            title="Abrir menú"
          >
            <span className="material-symbols-outlined text-[24px]">menu</span>
          </button>

          <div className="flex flex-col">
            <h2 className="text-[17px] sm:text-[19px] font-extrabold text-[#0F172A] tracking-tight leading-tight">
              {currentInfo.title}
            </h2>
            <span className="text-[11.5px] text-slate-500 hidden sm:block">
              {currentInfo.subtitle}
            </span>
          </div>
        </div>

        {/* Right Side: Quick Action + Notification Bell + User Avatar */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Pay CTA (hidden on very small phones) */}
          <button
            onClick={() => openRegisterPaymentModal()}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-[12.5px] font-bold transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[17px]">add_circle</span>
            <span>Registrar pago</span>
          </button>

          {/* Notification Bell with Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsAlertsOpen(!isAlertsOpen)}
              className="w-10 h-10 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200 flex items-center justify-center transition-all relative cursor-pointer"
              title="Notificaciones"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              {unreadAlertsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-600 text-white text-[9.5px] font-extrabold flex items-center justify-center animate-pulse">
                  {unreadAlertsCount}
                </span>
              )}
            </button>

            {/* Alerts Dropdown Panel */}
            {isAlertsOpen && (
              <>
                <div
                  onClick={() => setIsAlertsOpen(false)}
                  className="fixed inset-0 z-40 bg-transparent"
                />
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-50 flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[14px] font-bold text-slate-900">Notificaciones</span>
                      <span className="text-[11px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                        {alerts.length}
                      </span>
                    </div>
                    <span className="text-[11.5px] text-slate-400">AlDía Alertas</span>
                  </div>

                  <div className="flex flex-col gap-2 max-h-72 overflow-y-auto">
                    {alerts.map((alert) => (
                      <div
                        key={alert.id}
                        onClick={() => {
                          markAlertRead(alert.id);
                          if (alert.targetTab) onNavigate(alert.targetTab);
                          setIsAlertsOpen(false);
                        }}
                        className={`p-3 rounded-xl border transition-all cursor-pointer text-left ${
                          alert.isRead
                            ? 'bg-white border-slate-100 text-slate-500'
                            : 'bg-emerald-50/50 border-emerald-100 text-slate-800'
                        } hover:bg-slate-50`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[12.5px] font-bold text-slate-900">
                            {alert.title}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {alert.timeAgo}
                          </span>
                        </div>
                        <p className="text-[12px] leading-snug line-clamp-2">
                          {alert.message}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-slate-100 text-center">
                    <span className="text-[11px] text-slate-400">
                      Entiende tus deudas. Organiza tus pagos. Avanza tranquilo.
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* User Avatar Chip */}
          <button
            onClick={() => onNavigate('perfil')}
            className="flex items-center gap-2 p-1 sm:px-2.5 sm:py-1 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 transition-colors cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-[#0F3B82] text-white font-extrabold flex items-center justify-center text-[12px] shadow-2xs">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <span className="text-[13px] font-bold text-slate-900 hidden sm:block group-hover:text-emerald-700">
              {user.name}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
