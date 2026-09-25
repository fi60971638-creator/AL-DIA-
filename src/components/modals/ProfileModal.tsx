import React from 'react';
import { APP_NAME, LEGAL_DISCLAIMER } from '../../data/initialData';
import { UserProfile } from '../../types';

interface ProfileModalProps {
  user: UserProfile;
  onClose: () => void;
  onRestartWelcome: () => void;
  onLogout: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  user,
  onClose,
  onRestartWelcome,
  onLogout,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-sm p-5 sm:p-6 shadow-2xl border border-[#eaedff] my-auto animate-in fade-in zoom-in-95 duration-200 flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#eaedff]">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-2xl bg-[#0037b0]/10 text-[#0037b0] flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-[20px]">person</span>
            </div>
            <h3 className="font-headline-sm text-[17px] font-bold text-[#131b2e]">
              Mi Perfil • {APP_NAME}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#747686] hover:text-[#131b2e]"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* User Card */}
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-3xl bg-[#0037b0] text-white flex items-center justify-center text-[22px] font-bold mb-2 shadow-md">
            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <h4 className="font-headline-sm text-[16px] font-bold text-[#131b2e]">
            {user.name || 'Usuario AlDía'}
          </h4>
          <span className="text-[12px] text-[#747686]">{user.email}</span>
          <span className="text-[11px] text-[#0037b0] font-semibold mt-0.5">
            📱 {user.phone || '987 654 321'}
          </span>
        </div>

        {/* Info Grid */}
        <div className="bg-[#faf8ff] rounded-2xl p-3.5 border border-[#eaedff] text-[12px] flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-[#434655]">Estado de cuenta:</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
              🟢 Activa / AlDía
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#434655]">Privacidad:</span>
            <span className="text-[#131b2e] font-medium flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-emerald-600">lock</span>
              Datos 100% privados
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#434655]">Orientadora:</span>
            <span className="text-[#0037b0] font-bold">Diana (Asesora AlDía)</span>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="p-3 rounded-2xl bg-blue-50/60 border border-blue-100 text-[10px] text-[#434655] leading-relaxed">
          {LEGAL_DISCLAIMER}
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-2 pt-1">
          <button
            type="button"
            onClick={() => {
              onClose();
              onRestartWelcome();
            }}
            className="w-full py-2.5 rounded-xl bg-[#faf8ff] hover:bg-[#eaedff] text-[#0037b0] font-label-md text-[13px] font-bold flex items-center justify-center gap-2 border border-[#eaedff] transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">play_circle</span>
            <span>Ver pantalla de bienvenida</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onLogout();
            }}
            className="w-full py-2 rounded-xl text-rose-600 hover:bg-rose-50 text-[12px] font-semibold flex items-center justify-center gap-1 transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">logout</span>
            <span>Cerrar sesión</span>
          </button>
        </div>
      </div>
    </div>
  );
};
