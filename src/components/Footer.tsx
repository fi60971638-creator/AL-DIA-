import React from 'react';
import { TabType } from '../types';
import { OFFICIAL_SOURCES_DATA } from '../data/initialData';

interface FooterProps {
  onNavigate: (tab: TabType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-20 pb-28 lg:pb-12 pt-12 text-[13px] text-slate-500">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col gap-10">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Col 1: Brand & Slogan */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <img
                src="/logo-aldia.svg"
                alt="Logo AlDía"
                className="h-10 w-auto object-contain shrink-0"
              />
              <div className="flex flex-col">
                <div className="flex items-center text-[20px] font-extrabold tracking-tight leading-tight">
                  <span className="text-[#0F3B82]">Al</span>
                  <span className="text-emerald-600 ml-0.5">Día</span>
                </div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  Finanzas & Pagos Personales
                </span>
              </div>
            </div>

            <p className="text-slate-800 font-bold text-[14px]">
              “Entiende tus deudas. Organiza tus pagos. Avanza tranquilo.”
            </p>

            <p className="text-[12.5px] text-slate-500 leading-relaxed">
              Plataforma moderna de educación financiera, gestión de deudas y progreso personal. Diseñada para personas que buscan claridad y tranquilidad en sus finanzas.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="flex flex-col gap-2">
            <span className="text-[12px] font-bold text-[#0F3B82] uppercase tracking-wider">
              Plataforma
            </span>
            <div className="grid grid-cols-2 gap-2 text-[13px]">
              <button
                onClick={() => onNavigate('inicio')}
                className="text-left text-slate-600 hover:text-emerald-700 transition-colors cursor-pointer"
              >
                Dashboard
              </button>
              <button
                onClick={() => onNavigate('deudas')}
                className="text-left text-slate-600 hover:text-emerald-700 transition-colors cursor-pointer"
              >
                Mis deudas
              </button>
              <button
                onClick={() => onNavigate('pagos')}
                className="text-left text-slate-600 hover:text-emerald-700 transition-colors cursor-pointer"
              >
                Próximos pagos
              </button>
              <button
                onClick={() => onNavigate('presupuesto')}
                className="text-left text-slate-600 hover:text-emerald-700 transition-colors cursor-pointer"
              >
                Mi presupuesto
              </button>
              <button
                onClick={() => onNavigate('objetivos')}
                className="text-left text-slate-600 hover:text-emerald-700 transition-colors cursor-pointer"
              >
                Mis objetivos
              </button>
              <button
                onClick={() => onNavigate('salud')}
                className="text-left text-slate-600 hover:text-emerald-700 transition-colors cursor-pointer"
              >
                Salud financiera
              </button>
              <button
                onClick={() => onNavigate('aprende')}
                className="text-left text-slate-600 hover:text-emerald-700 transition-colors cursor-pointer"
              >
                Educación financiera
              </button>
              <button
                onClick={() => onNavigate('perfil')}
                className="text-left text-slate-600 hover:text-emerald-700 transition-colors cursor-pointer"
              >
                Mi perfil
              </button>
            </div>
          </div>

          {/* Col 3: Official References */}
          <div className="flex flex-col gap-2">
            <span className="text-[12px] font-bold text-[#0F3B82] uppercase tracking-wider">
              Marco y Fuentes Oficiales
            </span>
            <p className="text-[12px] text-slate-500 leading-snug">
              Nuestras recomendaciones y estándares se apegan a la normativa de protección al consumidor financiero de:
            </p>
            <div className="flex flex-col gap-1.5 mt-1 text-[12.5px]">
              {OFFICIAL_SOURCES_DATA.map((src) => (
                <a
                  key={src.id}
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-700 hover:text-emerald-700 font-semibold flex items-center justify-between group"
                >
                  <span>{src.name} — {src.fullName}</span>
                  <span className="material-symbols-outlined text-[14px] text-slate-400 group-hover:text-emerald-700">
                    open_in_new
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Disclaimer Note */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-[12px] text-slate-500 leading-relaxed text-center sm:text-left">
          <strong>Aviso de transparencia:</strong> AlDía es una herramienta tecnológica independiente de educación, organización y gestión financiera personal. No es un banco, no otorga créditos, no realiza cobranzas judiciales ni extrajudiciales, no capta depósitos del público y no solicita credenciales bancarias.
        </div>

        {/* Bottom copyright */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-slate-400">
          <span>© {new Date().getFullYear()} AlDía. Todos los derechos reservados.</span>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('aprende')}
              className="hover:text-slate-600 transition-colors"
            >
              Educación Financiera
            </button>
            <span>·</span>
            <button
              onClick={() => onNavigate('perfil')}
              className="hover:text-slate-600 transition-colors"
            >
              Privacidad y Seguridad
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
