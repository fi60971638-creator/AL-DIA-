import React from 'react';
import { TabType } from '../../types';

interface DashboardScreenProps {
  onNavigate: (tab: TabType) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl mx-auto w-full pb-12 pt-2 sm:pt-4">
      {/* CONTENEDOR HERO PRINCIPAL - PRESENTACIÓN MODERNA Y PROFESIONAL */}
      <section className="relative w-full overflow-hidden rounded-3xl bg-gradient-to-b from-[#08152B] via-[#0B1E40] to-[#0F2D5C] text-white p-6 sm:p-12 lg:p-16 shadow-2xl border border-blue-900/40 flex flex-col items-center text-center">
        {/* Glows ambientales sutiles turquesa y azul */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[520px] h-[340px] sm:h-[520px] bg-[#00D2A8]/15 rounded-full blur-3xl pointer-events-none animate-aldia-glow" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#00B49F]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Patrón de líneas sutil de fondo para profundidad geométrica */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* ============================================================== */}
        {/* ILUSTRACIONES LATERALES Y LOGOTIPO CENTRAL CON MOVIMIENTO */}
        {/* ============================================================== */}
        <div className="relative z-10 w-full flex items-center justify-center py-4 sm:py-8">
          {/* ILUSTRACIÓN IZQUIERDA: Organización de Pagos y Calendario */}
          <div className="hidden md:flex flex-col gap-3.5 absolute left-2 lg:left-6 xl:left-10 top-1/2 -translate-y-1/2 animate-aldia-float-slow select-none pointer-events-none">
            {/* Tarjeta flotante 1: Calendario de fechas */}
            <div className="w-48 bg-[#0F2852]/80 backdrop-blur-md rounded-2xl p-3.5 border border-cyan-500/20 shadow-xl shadow-blue-950/40 transform -rotate-3 hover:rotate-0 transition-transform">
              <div className="flex items-center gap-2.5 pb-2 border-b border-white/10">
                <div className="w-8 h-8 rounded-xl bg-[#00D2A8]/20 text-[#00D2A8] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                </div>
                <div className="text-left">
                  <span className="text-[11px] font-bold text-white block leading-tight">
                    Fechas y Pagos
                  </span>
                  <span className="text-[9.5px] text-cyan-200/70 block">
                    Cronograma claro
                  </span>
                </div>
              </div>
              <div className="mt-2.5 flex items-center justify-between text-[10.5px]">
                <span className="text-slate-300 font-medium">Recordatorio</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 font-bold text-[9.5px] border border-emerald-400/30">
                  Sin atrasos
                </span>
              </div>
            </div>

            {/* Tarjeta flotante 2: Documentos y derechos */}
            <div className="w-44 ml-6 bg-[#0B2044]/85 backdrop-blur-md rounded-2xl p-3 border border-blue-400/20 shadow-xl shadow-blue-950/40 transform rotate-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-300 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[16px]">description</span>
                </div>
                <div className="text-left min-w-0">
                  <span className="text-[10.5px] font-bold text-white block truncate">
                    Normativa SBS
                  </span>
                  <span className="text-[9px] text-blue-200/70 block truncate">
                    Tus derechos
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* LOGOTIPO CENTRAL CON MOVIMIENTO Y HALO TURQUESA */}
          <div className="flex flex-col items-center justify-center relative">
            {/* Círculo decorativo exterior animado (halo turquesa) */}
            <div className="relative flex items-center justify-center">
              {/* Resplandor suave turquesa de fondo */}
              <div className="absolute w-56 h-56 sm:w-72 sm:h-72 rounded-full bg-[#00D2A8]/25 blur-2xl animate-aldia-glow pointer-events-none" />

              {/* Anillo decorativo rotatorio suave con gradiente y borde discontinuo */}
              <div className="absolute w-52 h-52 sm:w-64 sm:h-64 rounded-full border border-dashed border-[#00D2A8]/40 animate-aldia-spin-slow pointer-events-none" />

              {/* Segundo aro concéntrico fino con gradiente turquesa */}
              <div className="absolute w-44 h-44 sm:w-56 sm:h-56 rounded-full border border-cyan-400/30 pointer-events-none" />

              {/* Contenedor del Logo con Flotación Vertical Suave */}
              <div className="relative z-10 w-40 h-40 sm:w-52 sm:h-52 rounded-full bg-gradient-to-b from-[#0F3269]/90 to-[#0A2248]/95 p-3.5 sm:p-4 shadow-2xl shadow-cyan-950/50 border-2 border-[#00D2A8]/50 backdrop-blur-md flex items-center justify-center animate-aldia-float">
                {/* Logo Original de AlDía */}
                <img
                  src="/logo-aldia.svg"
                  alt="Logotipo oficial AlDía"
                  className="w-full h-full object-contain drop-shadow-[0_8px_20px_rgba(0,210,168,0.35)]"
                />
              </div>
            </div>

            {/* Nombre y Slogan de Marca bajo el Logo Central */}
            <div className="mt-5 flex flex-col items-center">
              <div className="flex items-center text-[34px] sm:text-[44px] font-black tracking-tight leading-none">
                <span className="text-white drop-shadow-sm">AL</span>
                <span className="text-[#00D2A8] ml-1.5 drop-shadow-[0_0_15px_rgba(0,210,168,0.4)]">
                  DÍA
                </span>
              </div>
              <span className="text-[11.5px] sm:text-[13px] font-extrabold uppercase tracking-[0.22em] text-cyan-200/90 mt-2">
                ASESORAMIENTO EN COBRANZAS
              </span>
            </div>
          </div>

          {/* ILUSTRACIÓN DERECHA: Educación Financiera y Claridad */}
          <div className="hidden md:flex flex-col gap-3.5 absolute right-2 lg:right-6 xl:right-10 top-1/2 -translate-y-1/2 animate-aldia-float-alt select-none pointer-events-none">
            {/* Tarjeta flotante 3: Educación Financiera */}
            <div className="w-48 bg-[#0F2852]/80 backdrop-blur-md rounded-2xl p-3.5 border border-cyan-500/20 shadow-xl shadow-blue-950/40 transform rotate-3 hover:rotate-0 transition-transform">
              <div className="flex items-center gap-2.5 pb-2 border-b border-white/10">
                <div className="w-8 h-8 rounded-xl bg-cyan-400/20 text-cyan-300 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">school</span>
                </div>
                <div className="text-left">
                  <span className="text-[11px] font-bold text-white block leading-tight">
                    Educación Clara
                  </span>
                  <span className="text-[9.5px] text-cyan-200/70 block">
                    Guías y conceptos
                  </span>
                </div>
              </div>
              <div className="mt-2.5 flex items-center justify-between text-[10.5px]">
                <span className="text-slate-300 font-medium">Orientación</span>
                <span className="px-2 py-0.5 rounded-full bg-cyan-400/20 text-cyan-300 font-bold text-[9.5px] border border-cyan-400/30">
                  100% Gratuito
                </span>
              </div>
            </div>

            {/* Tarjeta flotante 4: Tranquilidad y Protección */}
            <div className="w-44 mr-6 bg-[#0B2044]/85 backdrop-blur-md rounded-2xl p-3 border border-emerald-400/20 shadow-xl shadow-blue-950/40 transform -rotate-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[16px]">verified_user</span>
                </div>
                <div className="text-left min-w-0">
                  <span className="text-[10.5px] font-bold text-white block truncate">
                    Consumidor protegido
                  </span>
                  <span className="text-[9px] text-emerald-200/70 block truncate">
                    INDECOPI
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* TÍTULO Y PRESENTACIÓN */}
        {/* ============================================================== */}
        <div className="relative z-10 flex flex-col items-center mt-3 sm:mt-5 max-w-2xl">
          <h1 className="text-[28px] sm:text-[38px] font-extrabold text-white tracking-tight leading-tight">
            Bienvenido a AlDía
          </h1>

          <p className="text-[16px] sm:text-[18px] font-bold text-cyan-200 mt-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00D2A8] animate-pulse" />
            <span>«Organiza tus pagos. Evita atrasos.»</span>
          </p>

          <p className="text-[13.5px] sm:text-[14.5px] text-blue-100/80 mt-2 leading-relaxed text-center max-w-xl">
            Tu punto de encuentro para informarte, conocer las normas vigentes y resolver dudas sobre procesos de cobranza y gestión financiera en el Perú.
          </p>
        </div>

        {/* ============================================================== */}
        {/* DOS BLOQUES INFORMATIVOS VISUALES */}
        {/* ============================================================== */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-8 sm:mt-10 w-full max-w-3xl text-left">
          {/* Bloque 1: ¿Qué es AlDía? */}
          <div className="bg-white/[0.07] hover:bg-white/[0.1] backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-white/15 transition-all duration-300 shadow-lg flex flex-col gap-2.5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#00D2A8]/20 border border-[#00D2A8]/30 text-[#00D2A8] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[22px]">info</span>
              </div>
              <h2 className="text-[17px] font-extrabold text-white tracking-tight">
                ¿Qué es AlDía?
              </h2>
            </div>
            <p className="text-[13px] sm:text-[13.5px] text-blue-100/90 leading-relaxed">
              AlDía es un prototipo de plataforma digital de orientación sobre cobranzas, pagos y educación financiera, creado para facilitar el acceso a información útil y ayudar a las personas a comprender sus obligaciones y conocer sus derechos como usuarios financieros.
            </p>
          </div>

          {/* Bloque 2: Nuestro propósito */}
          <div className="bg-white/[0.07] hover:bg-white/[0.1] backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-white/15 transition-all duration-300 shadow-lg flex flex-col gap-2.5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-400/20 border border-cyan-400/30 text-cyan-300 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[22px]">flag</span>
              </div>
              <h2 className="text-[17px] font-extrabold text-white tracking-tight">
                Nuestro propósito
              </h2>
            </div>
            <p className="text-[13px] sm:text-[13.5px] text-blue-100/90 leading-relaxed">
              Brindar orientación clara y accesible para que las personas puedan comprender mejor las cobranzas, informarse sobre sus derechos y tomar decisiones financieras más conscientes.
            </p>
          </div>
        </div>

        {/* ============================================================== */}
        {/* BOTÓN PRINCIPAL DESTACADO Y PIE */}
        {/* ============================================================== */}
        <div className="relative z-10 flex flex-col items-center gap-4 mt-8 sm:mt-10">
          <button
            onClick={() => onNavigate('aprende_articulos')}
            className="group px-8 sm:px-10 py-4 rounded-2xl bg-[#00D2A8] hover:bg-[#00BF98] active:scale-[0.98] text-[#08152B] font-black text-[15px] sm:text-[16px] shadow-xl shadow-teal-950/40 hover:shadow-cyan-400/20 transition-all duration-200 flex items-center gap-2.5 cursor-pointer"
          >
            <span>Explorar la plataforma</span>
            <span className="text-[18px] group-hover:translate-x-1 transition-transform">→</span>
          </button>

          {/* Pie del bloque */}
          <p className="text-[12px] font-medium text-cyan-200/70 tracking-wide mt-1">
            Prototipo educativo · Huánuco, Perú
          </p>
        </div>
      </section>
    </div>
  );
};
