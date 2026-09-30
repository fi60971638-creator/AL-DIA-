import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = 'h-10 w-auto', showText = false }) => {
  return (
    <div className={`flex items-center gap-2.5 ${showText ? '' : 'justify-center'}`}>
      <img
        src="/logo-aldia.svg"
        alt="AlDía Finanzas"
        className={`${className} object-contain transition-transform select-none`}
      />
      {showText && (
        <div className="flex flex-col text-left">
          <span className="font-extrabold text-[19px] text-[#0c3260] tracking-tight leading-tight">
            AlDía
          </span>
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#128549] leading-tight">
            Finanzas
          </span>
        </div>
      )}
    </div>
  );
};
