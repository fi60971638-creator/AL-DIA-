import React from 'react';
import {
  APP_NAME,
  APP_SUBTITLE,
  OFFICIAL_SOURCES_DATA,
  DISCLAIMER_NOTE,
} from '../data/initialData';
import { TabType } from '../types';

interface FooterProps {
  onNavigate: (tab: TabType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-white border-t border-[#E5E7EB] mt-16 pb-24 lg:pb-12 pt-10 text-[13px] text-[#6B7280]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col gap-8">
        {/* Top Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Col 1: Brand & Subtitle */}
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-2">
              <span className="text-[18px] font-bold text-[#0F3D56] tracking-tight">
                {APP_NAME}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-[#149B8A] font-bold uppercase tracking-wider">
                {APP_SUBTITLE}
              </span>
            </div>
            <p className="text-[#25313C] font-semibold text-[14px]">
              Orientación general sobre créditos, pagos y cobranzas.
            </p>
            <p className="text-[12px] text-[#6B7280] leading-relaxed">
              Educación financiera sencilla para comprender tus obligaciones y conocer qué puedes hacer ante diferentes situaciones.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div className="flex flex-col gap-2">
            <span className="text-[12px] font-bold text-[#0F3D56] uppercase tracking-wider">
              Navegación
            </span>
            <div className="grid grid-cols-2 gap-1.5 text-[13px]">
              <button
                onClick={() => onNavigate('inicio')}
                className="text-left text-[#6B7280] hover:text-[#0F3D56] transition-colors cursor-pointer"
              >
                Inicio
              </button>
              <button
                onClick={() => onNavigate('situaciones')}
                className="text-left text-[#6B7280] hover:text-[#0F3D56] transition-colors cursor-pointer"
              >
                Situaciones
              </button>
              <button
                onClick={() => onNavigate('videos')}
                className="text-left text-[#6B7280] hover:text-[#0F3D56] transition-colors cursor-pointer"
              >
                Videos SBS
              </button>
              <button
                onClick={() => onNavigate('aprende')}
                className="text-left text-[#6B7280] hover:text-[#0F3D56] transition-colors cursor-pointer"
              >
                Aprende
              </button>
              <button
                onClick={() => onNavigate('casos')}
                className="text-left text-[#6B7280] hover:text-[#0F3D56] transition-colors cursor-pointer"
              >
                Casos prácticos
              </button>
              <button
                onClick={() => onNavigate('preguntas')}
                className="text-left text-[#6B7280] hover:text-[#0F3D56] transition-colors cursor-pointer"
              >
                Preguntas frecuentes
              </button>
              <button
                onClick={() => onNavigate('derechos')}
                className="text-left text-[#6B7280] hover:text-[#0F3D56] transition-colors cursor-pointer"
              >
                Mis derechos
              </button>
              <button
                onClick={() => onNavigate('fuentes')}
                className="text-left text-[#6B7280] hover:text-[#0F3D56] transition-colors cursor-pointer"
              >
                Fuentes oficiales
              </button>
            </div>
          </div>

          {/* Col 3: Legal Notice */}
          <div className="flex flex-col gap-2">
            <span className="text-[12px] font-bold text-[#0F3D56] uppercase tracking-wider">
              Aviso legal y de orientación
            </span>
            <div className="p-3.5 rounded-xl bg-[#F7F8FA] border border-[#E5E7EB] flex flex-col gap-1.5 text-[11px] leading-relaxed">
              <p className="text-[#6B7280]">
                {DISCLAIMER_NOTE}
              </p>
            </div>
          </div>
        </div>

        {/* Official Sources Reference Links */}
        <div className="pt-6 border-t border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-bold text-[#0F3D56]">Fuentes oficiales:</span>
            <div className="flex items-center gap-3 text-[12px]">
              {OFFICIAL_SOURCES_DATA.map((s) => (
                <a
                  key={s.id}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#0F3D56] hover:text-[#149B8A] transition-colors"
                >
                  {s.name}
                </a>
              ))}
            </div>
          </div>

          <div className="text-[12px] text-[#6B7280]">
            © {new Date().getFullYear()} {APP_NAME} · {APP_SUBTITLE}
          </div>
        </div>
      </div>
    </footer>
  );
};
