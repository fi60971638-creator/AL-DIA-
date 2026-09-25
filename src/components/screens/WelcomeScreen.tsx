import React, { useState } from 'react';
import { APP_LOGO_URL, APP_NAME, APP_SLOGAN, LEGAL_DISCLAIMER } from '../../data/initialData';
import { UserProfile } from '../../types';

interface WelcomeScreenProps {
  onStart: () => void;
  onRegisterSuccess: (user: UserProfile) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart, onRegisterSuccess }) => {
  const [viewState, setViewState] = useState<'landing' | 'register' | 'login' | 'registered_success'>('landing');

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Por favor ingresa tu nombre completo.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Ingresa un correo electrónico válido.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Las contraseñas no coinciden.');
      return;
    }

    const newUser: UserProfile = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim() || '987 654 321',
      isLoggedIn: true,
    };

    onRegisterSuccess(newUser);
    setViewState('registered_success');
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setErrorMsg('Ingresa tu correo registrado.');
      return;
    }
    const user: UserProfile = {
      name: name || 'Carlos Mendoza',
      email: email.trim(),
      phone: '987 654 321',
      isLoggedIn: true,
    };
    onRegisterSuccess(user);
    onStart();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f2f5ff] via-[#faf8ff] to-white flex flex-col justify-between p-4 sm:p-6 max-w-lg mx-auto">
      {/* Top Brand Bar */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <img src={APP_LOGO_URL} alt="Logo AlDía" className="h-8 w-auto object-contain" />
          <span className="font-headline-md text-[20px] font-extrabold text-[#0037b0] tracking-tight">
            {APP_NAME}
          </span>
        </div>
        {viewState !== 'landing' && (
          <button
            onClick={() => setViewState('landing')}
            className="text-[13px] font-semibold text-[#0037b0] hover:underline cursor-pointer"
          >
            ← Volver al inicio
          </button>
        )}
      </div>

      {/* Main Container by State */}
      <div className="my-auto py-6">
        {/* 1. Landing View */}
        {viewState === 'landing' && (
          <div className="flex flex-col gap-6 text-center animate-in fade-in duration-300">
            {/* Mascot / Icon Badge */}
            <div className="mx-auto w-24 h-24 rounded-3xl bg-[#0037b0]/10 flex items-center justify-center text-[#0037b0] shadow-sm border border-[#eaedff]">
              <span className="material-symbols-outlined text-[48px]">account_balance_wallet</span>
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="font-headline-lg text-[32px] font-extrabold text-[#131b2e] tracking-tight leading-tight">
                {APP_NAME}
              </h1>
              <p className="font-headline-sm text-[18px] font-semibold text-[#0037b0] leading-snug">
                “{APP_SLOGAN}”
              </p>
              <p className="font-body-md text-[14px] text-[#434655] max-w-sm mx-auto mt-1 leading-relaxed">
                Una forma sencilla de conocer tus obligaciones, organizar tus pagos y recibir orientación financiera.
              </p>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-3 gap-2.5 max-w-sm mx-auto text-left pt-2">
              <div className="bg-white p-3 rounded-2xl border border-[#eaedff] shadow-xs">
                <span className="material-symbols-outlined text-[#0037b0] text-[20px]">fact_check</span>
                <span className="font-label-md text-[12px] font-bold text-[#131b2e] block mt-1">
                  Claridad
                </span>
                <span className="text-[10px] text-[#747686]">Conoce cuánto debes exactamente</span>
              </div>

              <div className="bg-white p-3 rounded-2xl border border-[#eaedff] shadow-xs">
                <span className="material-symbols-outlined text-emerald-600 text-[20px]">event_repeat</span>
                <span className="font-label-md text-[12px] font-bold text-[#131b2e] block mt-1">
                  Calendario
                </span>
                <span className="text-[10px] text-[#747686]">Fechas y alertas a tiempo</span>
              </div>

              <div className="bg-white p-3 rounded-2xl border border-[#eaedff] shadow-xs">
                <span className="material-symbols-outlined text-amber-600 text-[20px]">lightbulb</span>
                <span className="font-label-md text-[12px] font-bold text-[#131b2e] block mt-1">
                  Orientación
                </span>
                <span className="text-[10px] text-[#747686]">Guías y apoyo gratuito</span>
              </div>
            </div>

            {/* Action Buttons: [Crear cuenta] [Iniciar sesión] */}
            <div className="flex flex-col gap-3 pt-4 max-w-sm mx-auto w-full">
              <button
                type="button"
                onClick={() => setViewState('register')}
                className="w-full py-3.5 rounded-2xl bg-[#0037b0] text-white font-label-lg text-[15px] font-bold shadow-md hover:bg-[#002f99] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[20px]">person_add</span>
                <span>Crear cuenta</span>
              </button>

              <button
                type="button"
                onClick={() => setViewState('login')}
                className="w-full py-3.5 rounded-2xl bg-white text-[#0037b0] font-label-lg text-[15px] font-bold border border-[#0037b0]/30 shadow-xs hover:bg-[#f2f5ff] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[20px]">login</span>
                <span>Iniciar sesión</span>
              </button>

              <button
                type="button"
                onClick={onStart}
                className="text-[13px] text-[#747686] hover:text-[#131b2e] underline mt-1 cursor-pointer"
              >
                Continuar como invitado / demo
              </button>
            </div>
          </div>
        )}

        {/* 2. Register Form */}
        {viewState === 'register' && (
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-[#eaedff] animate-in fade-in zoom-in-95 duration-200">
            <div className="text-center pb-4">
              <h2 className="font-headline-md text-[22px] font-bold text-[#131b2e]">
                Crear tu cuenta en AlDía
              </h2>
              <p className="font-body-sm text-[13px] text-[#434655] mt-1">
                Toma el control de tus finanzas hoy mismo
              </p>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-2xl bg-rose-50 text-rose-700 text-[12px] font-semibold flex items-center gap-2 border border-rose-200">
                <span className="material-symbols-outlined text-[18px]">error</span>
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-3.5">
              <div>
                <label className="font-label-sm text-[12px] font-semibold text-[#434655] block mb-1">
                  Nombre completo
                </label>
                <input
                  type="text"
                  placeholder="Ej. Carlos Mendoza"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#c4c5d7] text-[14px] text-[#131b2e] focus:border-[#0037b0] outline-none"
                />
              </div>

              <div>
                <label className="font-label-sm text-[12px] font-semibold text-[#434655] block mb-1">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  placeholder="carlos@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#c4c5d7] text-[14px] text-[#131b2e] focus:border-[#0037b0] outline-none"
                />
              </div>

              <div>
                <label className="font-label-sm text-[12px] font-semibold text-[#434655] block mb-1">
                  Número de celular
                </label>
                <input
                  type="tel"
                  placeholder="987 654 321"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#c4c5d7] text-[14px] text-[#131b2e] focus:border-[#0037b0] outline-none"
                />
              </div>

              <div>
                <label className="font-label-sm text-[12px] font-semibold text-[#434655] block mb-1">
                  Contraseña
                </label>
                <input
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#c4c5d7] text-[14px] text-[#131b2e] focus:border-[#0037b0] outline-none"
                />
              </div>

              <div>
                <label className="font-label-sm text-[12px] font-semibold text-[#434655] block mb-1">
                  Confirmar contraseña
                </label>
                <input
                  type="password"
                  placeholder="Repite tu contraseña"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#c4c5d7] text-[14px] text-[#131b2e] focus:border-[#0037b0] outline-none"
                />
              </div>

              <button
                type="submit"
                className="mt-2 w-full py-3.5 rounded-2xl bg-[#0037b0] text-white font-label-lg text-[15px] font-bold shadow-md hover:bg-[#002f99] active:scale-[0.98] transition-all cursor-pointer"
              >
                Crear mi cuenta
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setViewState('login')}
                  className="text-[13px] text-[#0037b0] hover:underline font-medium cursor-pointer"
                >
                  ¿Ya tienes cuenta? Inicia sesión aquí
                </button>
              </div>
            </form>
          </div>
        )}

        {/* 3. Welcome Registered Success */}
        {viewState === 'registered_success' && (
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-[#eaedff] text-center flex flex-col gap-5 animate-in zoom-in-95 duration-200">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <span className="material-symbols-outlined text-[44px]">task_alt</span>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="font-headline-lg text-[26px] font-bold text-[#131b2e]">
                ¡Bienvenido a AlDía!
              </h2>
              <p className="font-body-md text-[15px] text-[#434655] leading-relaxed">
                Comencemos organizando tus obligaciones financieras de manera sencilla y segura.
              </p>
            </div>

            <button
              type="button"
              onClick={onStart}
              className="w-full py-3.5 rounded-2xl bg-[#0037b0] text-white font-label-lg text-[15px] font-bold shadow-md hover:bg-[#002f99] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Comenzar</span>
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>
          </div>
        )}

        {/* 4. Login View */}
        {viewState === 'login' && (
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-[#eaedff] animate-in fade-in zoom-in-95 duration-200">
            <div className="text-center pb-4">
              <h2 className="font-headline-md text-[22px] font-bold text-[#131b2e]">
                Iniciar Sesión en AlDía
              </h2>
              <p className="font-body-sm text-[13px] text-[#434655] mt-1">
                Ingresa para revisar tu estado de cuentas
              </p>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-2xl bg-rose-50 text-rose-700 text-[12px] font-semibold flex items-center gap-2 border border-rose-200">
                <span className="material-symbols-outlined text-[18px]">error</span>
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="flex flex-col gap-3.5">
              <div>
                <label className="font-label-sm text-[12px] font-semibold text-[#434655] block mb-1">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  placeholder="tu@correo.com"
                  defaultValue="carlos@aldia.pe"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#c4c5d7] text-[14px] text-[#131b2e] focus:border-[#0037b0] outline-none"
                />
              </div>

              <div>
                <label className="font-label-sm text-[12px] font-semibold text-[#434655] block mb-1">
                  Contraseña
                </label>
                <input
                  type="password"
                  defaultValue="123456"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#c4c5d7] text-[14px] text-[#131b2e] focus:border-[#0037b0] outline-none"
                />
              </div>

              <button
                type="submit"
                className="mt-2 w-full py-3.5 rounded-2xl bg-[#0037b0] text-white font-label-lg text-[15px] font-bold shadow-md hover:bg-[#002f99] active:scale-[0.98] transition-all cursor-pointer"
              >
                Ingresar a mi cuenta
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setViewState('register')}
                  className="text-[13px] text-[#0037b0] hover:underline font-medium cursor-pointer"
                >
                  ¿No tienes cuenta? Regístrate aquí
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Bottom Legal Disclaimer */}
      <footer className="pt-4 pb-2 border-t border-[#eaedff] text-center">
        <p className="text-[11px] text-[#747686] leading-relaxed">
          {LEGAL_DISCLAIMER}
        </p>
      </footer>
    </div>
  );
};
