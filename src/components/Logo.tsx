import React from 'react';
import { APP_NAME, APP_SUBTITLE } from '../data/initialData';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = 'h-10 w-auto', showText = false }) => {
  return (
    <div className={`flex items-center gap-2.5 ${showText ? '' : 'justify-center'}`}>
      <img
        src="/logo-aldia.svg"
        alt={`${APP_NAME} - ${APP_SUBTITLE}`}
        className={`${className} object-contain transition-transform select-none shrink-0`}
      />
      {showText && (
        <div className="flex flex-col text-left">
          <div className="flex items-center font-extrabold text-[19px] tracking-tight leading-tight">
            <span className="text-[#0F3B82]">AL </span>
            <span className="text-[#00B49F] ml-1">DÍA</span>
          </div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#6B7280] leading-tight">
            {APP_SUBTITLE}
          </span>
        </div>
      )}
    </div>
  );
};
