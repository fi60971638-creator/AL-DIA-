import React, { useState } from 'react';
import { ADMIN_AUTH_CONFIG } from '../../data/initialData';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password.trim();

    if (!cleanEmail || !cleanPass) {
      setErrorMsg('Por favor completa el correo y la contraseña.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      if (
        cleanEmail === ADMIN_AUTH_CONFIG.authorizedEmail.toLowerCase() &&
        cleanPass === ADMIN_AUTH_CONFIG.authorizedPassword
      ) {
        setIsLoading(false);
        onLoginSuccess();
        onClose();
      } else {
        setIsLoading(false);
        setErrorMsg('Credenciales de administrador incorrectas. Verifica el correo o contraseña.');
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-md p-6 sm:p-7 shadow-2xl border border-blue-100 flex flex-col gap-5 relative animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {/* Header Icon & Title */}
        <div className="text-center pt-2">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#0037b0] to-blue-600 text-white flex items-center justify-center mx-auto shadow-md mb-3">
            <span className="material-symbols-outlined text-[32px]">admin_panel_settings</span>
          </div>
          <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-[#0037b0] font-label-sm text-[11px] font-bold uppercase tracking-wider mb-1">
            Acceso Restringido
          </span>
          <h2 className="font-headline-md text-[22px] font-extrabold text-[#131b2e]">
            Panel de Administrador
          </h2>
          <p className="font-body-sm text-[13px] text-[#434655] mt-1">
            Ingresa las credenciales autorizadas para gestionar la plataforma AlDía.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-[13px] font-medium flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-rose-600 shrink-0">error</span>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="font-label-sm text-[12px] font-bold text-[#434655] block mb-1.5">
              Correo de Administrador
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
                mail
              </span>
              <input
                type="email"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 text-[14px] font-medium text-[#131b2e] focus:border-[#0037b0] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="font-label-sm text-[12px] font-bold text-[#434655] block mb-1.5">
              Contraseña
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
                lock
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-11 py-3 rounded-xl border border-slate-300 text-[14px] font-medium text-[#131b2e] focus:border-[#0037b0] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 w-full py-3.5 rounded-2xl bg-[#0037b0] hover:bg-[#002f99] active:scale-[0.98] text-white font-label-lg text-[15px] font-bold shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <span className="material-symbols-outlined text-[20px] animate-spin">progress_activity</span>
                <span>Verificando...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[20px]">login</span>
                <span>Ingresar al Panel</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
