import React from 'react';
import { TabType } from '../types';

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

  const tabTitles: Record<TabType, { title: string; subtitle: string }> = {
    inicio: { title: 'Inicio', subtitle: 'Organiza tus pagos. Evita atrasos.' },
    deudas: { title: 'Mis deudas', subtitle: 'Obligaciones, saldos y tasas' },
    calendario: { title: 'Calendario de pagos', subtitle: 'Fechas de vencimiento y amortizaciones' },
    pagos: { title: 'Calendario de pagos', subtitle: 'Fechas de vencimiento y amortizaciones' },
    orientacion: { title: 'Orientación financiera', subtitle: 'Guías, derechos y soluciones prácticas' },
    aprende: { title: 'Aprende finanzas', subtitle: 'Educación sencilla para avanzar tranquilo' },
    aprende_articulos: { title: 'Guías y Artículos', subtitle: 'Lecturas prácticas sobre finanzas y control de deudas' },
    aprende_videos: { title: 'Videos SBS', subtitle: 'Material audiovisual educativo de la SBS' },
    aprende_diccionario: { title: 'Diccionario Financiero', subtitle: 'Términos bancarios explicados de forma clara' },
    aprende_mitos: { title: 'Mitos y Verdades', subtitle: 'Desmitifica cobranzas, intereses y centrales de riesgo' },
    aprende_casos: { title: 'Casos Prácticos', subtitle: 'Aprende resolviendo situaciones financieras reales' },
    aprende_derechos: { title: 'Derechos del Usuario', subtitle: 'Protección al consumidor financiero y normativas' },
    categorias_crediticias: { title: 'Categorías crediticias', subtitle: 'Clasificación de riesgo de deudores según la SBS' },
    presupuesto: { title: 'Mi presupuesto', subtitle: 'Ingresos, gastos y disponibles' },
    objetivos: { title: 'Mis objetivos', subtitle: 'Metas de ahorro y tranquilidad' },
    salud: { title: 'Salud financiera', subtitle: 'Diagnóstico y puntuación' },
    perfil: { title: 'Mi perfil', subtitle: 'Configuración y metas personales' },
  };

  const currentInfo = tabTitles[currentTab] || { title: 'AlDía', subtitle: 'Organiza tus pagos. Evita atrasos.' };

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

      </div>
    </header>
  );
};
