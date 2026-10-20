import React from 'react';
import { TabType } from '../types';
import { OFFICIAL_SOURCES_DATA } from '../data/initialData';

interface FooterProps {
  onNavigate: (tab: TabType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-20 pb-28 lg:pb-12 pt-12 text-[13px] text-slate-600">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col gap-10">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Col 1: Brand & Slogan */}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => onNavigate('inicio')}
              className="flex items-center gap-2.5 text-left group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-white p-1 shadow-xs border border-slate-200 flex items-center justify-center shrink-0">
                <img
                  src="/logo-aldia.svg"
                  alt="Logo aldia"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[22px] font-heading font-extrabold tracking-tight leading-none text-[#0B3B60]">
                  aldia
                </span>
                <span className="text-[9.5px] text-[#526E88] font-sans font-medium mt-0.5">
                  Plataforma digital para el asesoramiento en cobranzas
                </span>
              </div>
            </button>

            <p className="text-[#0B3B60] font-heading font-semibold text-[14px]">
              “Organiza tus pagos. Evita atrasos.”
            </p>

            <p className="text-[12.5px] text-slate-600 font-sans font-normal leading-relaxed">
              Plataforma digital de orientación sobre cobranzas, pagos y educación financiera creada para brindar información clara y ayudar a las personas a comprender sus obligaciones y conocer sus derechos.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="flex flex-col gap-2">
            <span className="text-[11.5px] font-heading font-bold text-[#007EAF] uppercase tracking-wider">
              Secciones Educativas
            </span>
            <div className="grid grid-cols-2 gap-2 text-[13px]">
              <button
                onClick={() => onNavigate('inicio')}
                className="text-left text-slate-600 hover:text-[#007EAF] transition-colors cursor-pointer"
              >
                Inicio
              </button>
              <button
                onClick={() => onNavigate('aprende_articulos')}
                className="text-left text-slate-600 hover:text-[#007EAF] transition-colors cursor-pointer"
              >
                Guías y Artículos
              </button>
              <button
                onClick={() => onNavigate('videos')}
                className="text-left text-slate-600 hover:text-[#007EAF] transition-colors cursor-pointer flex items-center gap-1"
              >
                <span>Videos</span>
                <span className="material-symbols-outlined text-[13px] text-[#00A3E0]">smart_display</span>
              </button>
              <button
                onClick={() => onNavigate('aprende_diccionario')}
                className="text-left text-slate-600 hover:text-[#007EAF] transition-colors cursor-pointer"
              >
                Diccionario financiero
              </button>
              <button
                onClick={() => onNavigate('aprende_derechos')}
                className="text-left text-slate-600 hover:text-[#007EAF] transition-colors cursor-pointer"
              >
                Derechos del usuario
              </button>
              <button
                onClick={() => onNavigate('seguridad')}
                className="text-left text-slate-600 hover:text-[#007EAF] transition-colors cursor-pointer flex items-center gap-1 font-semibold text-[#0B3B60]"
              >
                <span>Seguridad</span>
              </button>
              <button
                onClick={() => onNavigate('categorias_crediticias')}
                className="text-left text-slate-600 hover:text-[#007EAF] transition-colors cursor-pointer"
              >
                Categorías crediticias
              </button>
              <button
                onClick={() => onNavigate('market')}
                className="text-left text-[#007EAF] font-semibold hover:text-[#0B3B60] transition-colors cursor-pointer flex items-center gap-1"
              >
                <span>AL DÍA Market</span>
                <span className="material-symbols-outlined text-[13px]">storefront</span>
              </button>
              <button
                onClick={() => onNavigate('play')}
                className="text-left text-[#007EAF] font-semibold hover:text-[#0B3B60] transition-colors cursor-pointer flex items-center gap-1"
              >
                <span>AL DÍA Play (Juegos)</span>
                <span className="material-symbols-outlined text-[13px]">sports_esports</span>
              </button>
            </div>
          </div>

          {/* Col 3: Official References */}
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-bold text-[#007EAF] uppercase tracking-wider">
              Marco y Fuentes Oficiales
            </span>
            <p className="text-[12px] text-slate-600 leading-snug">
              Información sustentada en la normativa de protección al usuario financiero de:
            </p>
            <div className="flex flex-col gap-1.5 mt-1 text-[12.5px]">
              {OFFICIAL_SOURCES_DATA.map((src) => (
                <a
                  key={src.id}
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-[#007EAF] font-semibold flex items-center justify-between group py-0.5"
                >
                  <span>{src.name} — {src.fullName}</span>
                  <span className="material-symbols-outlined text-[14px] text-slate-400 group-hover:text-[#007EAF]">
                    open_in_new
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Disclaimer Note */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-[12px] text-slate-600 leading-relaxed text-center sm:text-left">
          <strong className="text-[#0B3B60]">Aviso educativo aldia:</strong> Esta plataforma es un prototipo pedagógico de orientación financiera y derechos del consumidor en el Perú. No es un banco, no otorga préstamos, no realiza cobranzas judiciales ni extrajudiciales, no administra deudas personales ni solicita claves o información bancaria confidencial.
        </div>

        {/* Bottom copyright */}
        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-slate-500">
          <span>© {new Date().getFullYear()} aldia · Plataforma digital para el asesoramiento en cobranzas.</span>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('aprende_articulos')}
              className="hover:text-[#007EAF] transition-colors cursor-pointer"
            >
              Educación Financiera
            </button>
            <span>·</span>
            <button
              onClick={() => onNavigate('aprende_derechos')}
              className="hover:text-[#007EAF] transition-colors cursor-pointer"
            >
              Derechos del Consumidor
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
