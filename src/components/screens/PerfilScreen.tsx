import React from 'react';
import { useFinance } from '../../context/FinanceContext';

export const PerfilScreen: React.FC = () => {
  const {
    resetToDemoData,
  } = useFinance();

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-[12px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
            Configuración Personal
          </span>
        </div>
        <h1 className="text-[26px] sm:text-[32px] font-extrabold text-[#0F172A] tracking-tight mt-1">
          Mi perfil financiero
        </h1>
        <p className="text-[14px] text-slate-500">
          Administra tus datos, objetivos y herramientas de demostración.
        </p>
      </div>

      {/* Información del Sistema y Privacidad */}

      {/* Demo Data Management */}
      <div className="bg-slate-50 rounded-3xl p-6 sm:p-7 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-[16px] font-bold text-slate-900">
            Datos de demostración
          </h4>
          <p className="text-[13px] text-slate-500 mt-0.5 max-w-lg leading-relaxed">
            Si deseas reiniciar los valores predeterminados (S/ 18,450 en deudas, 78/100 de salud financiera), puedes restablecerlos en cualquier momento.
          </p>
        </div>

        <button
          onClick={() => {
            if (window.confirm('¿Deseas restablecer todos los datos al estado de demostración inicial?')) {
              resetToDemoData();
            }
          }}
          className="px-4 py-2.5 rounded-xl bg-white hover:bg-rose-50 text-rose-700 hover:text-rose-800 border border-slate-200 hover:border-rose-200 font-bold text-[12.5px] transition-colors shrink-0 cursor-pointer flex items-center gap-1.5"
        >
          <span className="material-symbols-outlined text-[17px]">history</span>
          <span>Restablecer datos demo</span>
        </button>
      </div>

      {/* Privacy Guarantee */}
      <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-[12.5px] text-emerald-950 flex items-center gap-3">
        <span className="material-symbols-outlined text-[20px] text-emerald-700 shrink-0">
          shield
        </span>
        <span>
          <strong>Privacidad garantizada:</strong> AlDía nunca solicita claves de cajero, tokens bancarios ni contraseñas secretas. Tus datos se procesan de forma privada y segura en tu navegador.
        </span>
      </div>
    </div>
  );
};
