import React from 'react';

// 1. Ilustración de Bienvenida: Tranquilidad y cumplimiento financiero
export const TranquilityIllustration: React.FC<{ className?: string }> = ({
  className = 'w-48 h-48',
}) => {
  return (
    <svg
      viewBox="0 0 320 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="tq-sky" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EFF6FF" />
          <stop offset="100%" stopColor="#DBEAFE" />
        </linearGradient>
        <linearGradient id="tq-green" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="tq-navy" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E40AF" />
          <stop offset="100%" stopColor="#0F3B82" />
        </linearGradient>
      </defs>

      {/* Fondo suave circular */}
      <circle cx="160" cy="130" r="105" fill="url(#tq-sky)" />
      <circle cx="240" cy="70" r="28" fill="#E0F2FE" />
      <circle cx="75" cy="180" r="18" fill="#ECFDF5" />

      {/* Calendario flotante ordenado */}
      <g transform="translate(45, 60)">
        <rect x="0" y="0" width="105" height="110" rx="14" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
        {/* Barra superior de calendario */}
        <rect x="0" y="0" width="105" height="28" rx="14" fill="url(#tq-navy)" />
        <rect x="0" y="18" width="105" height="10" fill="url(#tq-navy)" />
        {/* Espirales */}
        <rect x="22" y="-5" width="6" height="12" rx="3" fill="#64748B" />
        <rect x="50" y="-5" width="6" height="12" rx="3" fill="#64748B" />
        <rect x="78" y="-5" width="6" height="12" rx="3" fill="#64748B" />
        {/* Grilla con checks de pago puntual */}
        <circle cx="28" cy="46" r="8" fill="#DCFCE7" />
        <path d="M25 46L27 48L32 43" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        
        <circle cx="53" cy="46" r="8" fill="#DCFCE7" />
        <path d="M50 46L52 48L57 43" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

        <circle cx="78" cy="46" r="8" fill="#DCFCE7" />
        <path d="M75 46L77 48L82 43" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

        <circle cx="28" cy="72" r="8" fill="#DCFCE7" />
        <path d="M25 72L27 74L32 69" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

        <circle cx="53" cy="72" r="8" fill="#FEF3C7" />
        <text x="50" y="75" fontFamily="sans-serif" fontSize="9" fontWeight="bold" fill="#D97706">15</text>

        <circle cx="78" cy="72" r="8" fill="#F1F5F9" />
        <text x="75" y="75" fontFamily="sans-serif" fontSize="9" fill="#94A3B8">16</text>

        <rect x="20" y="90" width="65" height="6" rx="3" fill="#E2E8F0" />
      </g>

      {/* Tarjeta de pago "Al Día" aprobada */}
      <g transform="translate(140, 110)">
        <rect x="0" y="0" width="130" height="85" rx="14" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" filter="drop-shadow(0px 8px 16px rgba(15, 59, 130, 0.08))" />
        <rect x="14" y="16" width="32" height="22" rx="4" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
        <circle cx="22" cy="27" r="4" fill="#CBD5E1" />
        <rect x="54" y="18" width="55" height="7" rx="3.5" fill="url(#tq-navy)" />
        <rect x="54" y="30" width="38" height="5" rx="2.5" fill="#94A3B8" />

        <rect x="14" y="52" width="60" height="14" rx="7" fill="#DCFCE7" />
        <circle cx="22" cy="59" r="4" fill="#10B981" />
        <path d="M20.5 59L21.5 60L23.5 58" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <text x="29" y="62.5" fontFamily="sans-serif" fontSize="8.5" fontWeight="bold" fill="#047857">AL DÍA</text>

        <circle cx="106" cy="59" r="14" fill="url(#tq-green)" />
        <path d="M101 59L104.5 62.5L111.5 55.5" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* Destellos de éxito y tranquilidad */}
      <path d="M160 30L163 38L171 41L163 44L160 52L157 44L149 41L157 38Z" fill="#10B981" opacity="0.8" />
      <path d="M275 140L277 145L282 147L277 149L275 154L273 149L268 147L273 145Z" fill="#F59E0B" opacity="0.85" />
      <path d="M35 150L37 154L41 156L37 158L35 162L33 158L29 156L33 154Z" fill="#3B82F6" opacity="0.7" />
    </svg>
  );
};

// 2. Ilustración de Calendario y Fechas de Pago
export const CalendarActionIllustration: React.FC<{ className?: string }> = ({
  className = 'w-24 h-24',
}) => {
  return (
    <svg
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="20" y="25" width="120" height="110" rx="18" fill="#F0FDF4" stroke="#86EFAC" strokeWidth="2.5" />
      <rect x="20" y="25" width="120" height="34" rx="18" fill="#059669" />
      <rect x="20" y="45" width="120" height="14" fill="#059669" />
      
      {/* Pines */}
      <rect x="45" y="16" width="8" height="18" rx="4" fill="#0F172A" />
      <rect x="107" y="16" width="8" height="18" rx="4" fill="#0F172A" />

      {/* Día destacado */}
      <circle cx="80" cy="92" r="24" fill="#10B981" />
      <text x="80" y="99" textAnchor="middle" fontFamily="sans-serif" fontSize="18" fontWeight="900" fill="#FFFFFF">
        ✓
      </text>

      <circle cx="45" cy="85" r="5" fill="#CBD5E1" />
      <circle cx="45" cy="105" r="5" fill="#CBD5E1" />
      <circle cx="115" cy="85" r="5" fill="#CBD5E1" />
      <circle cx="115" cy="105" r="5" fill="#CBD5E1" />
    </svg>
  );
};

// 3. Ilustración de Orientación y Sabiduría Financiera
export const GuidanceActionIllustration: React.FC<{ className?: string }> = ({
  className = 'w-24 h-24',
}) => {
  return (
    <svg
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="80" cy="80" r="60" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="2" />
      {/* Bombilla grande */}
      <path
        d="M80 40C63.4 40 50 53.4 50 70C50 80.5 55.4 89.8 63.5 95.1V104C63.5 106.2 65.3 108 67.5 108H92.5C94.7 108 96.5 106.2 96.5 104V95.1C104.6 89.8 110 80.5 110 70C110 53.4 96.6 40 80 40Z"
        fill="#FDE047"
        stroke="#EAB308"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Filamento */}
      <path d="M72 75L76 60L84 60L88 75" stroke="#CA8A04" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Base */}
      <rect x="68" y="111" width="24" height="4" rx="2" fill="#94A3B8" />
      <rect x="72" y="117" width="16" height="4" rx="2" fill="#64748B" />

      {/* Rayos */}
      <path d="M80 26V32" stroke="#EAB308" strokeWidth="3" strokeLinecap="round" />
      <path d="M48 48L53 53" stroke="#EAB308" strokeWidth="3" strokeLinecap="round" />
      <path d="M112 48L107 53" stroke="#EAB308" strokeWidth="3" strokeLinecap="round" />
      <path d="M36 75H42" stroke="#EAB308" strokeWidth="3" strokeLinecap="round" />
      <path d="M124 75H118" stroke="#EAB308" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
};

// 4. Ilustración de Control de Deuda
export const DebtActionIllustration: React.FC<{ className?: string }> = ({
  className = 'w-24 h-24',
}) => {
  return (
    <svg
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="22" y="32" width="116" height="86" rx="16" fill="#FFFFFF" stroke="#93C5FD" strokeWidth="2.5" />
      <rect x="22" y="50" width="116" height="20" fill="#1E40AF" />
      <circle cx="44" cy="94" r="8" fill="#E2E8F0" />
      <rect x="60" y="90" width="45" height="8" rx="4" fill="#CBD5E1" />
      
      {/* Sello de control */}
      <circle cx="115" cy="95" r="18" fill="#3B82F6" />
      <path d="M115 87V103M107 95H123" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
};

// 5. Ilustración de Registro de Pago
export const PaymentActionIllustration: React.FC<{ className?: string }> = ({
  className = 'w-24 h-24',
}) => {
  return (
    <svg
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="80" cy="80" r="58" fill="#ECFDF5" stroke="#A7F3D0" strokeWidth="2" />
      {/* Billetes organizados */}
      <rect x="42" y="48" width="76" height="46" rx="10" fill="#059669" />
      <rect x="46" y="52" width="68" height="38" rx="8" fill="#10B981" />
      <circle cx="80" cy="71" r="10" fill="#34D399" />
      <text x="80" y="76" textAnchor="middle" fontFamily="sans-serif" fontSize="14" fontWeight="900" fill="#064E3B">
        S/
      </text>

      {/* Mano o Check de confirmación */}
      <circle cx="106" cy="100" r="18" fill="#0F3B82" stroke="#FFFFFF" strokeWidth="2.5" />
      <path d="M99 100L104 105L113 96" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};
