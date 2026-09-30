import React, { useState } from 'react';
import { APP_NAME, APP_SLOGAN, LEGAL_DISCLAIMER, ADMIN_AUTH_CONFIG } from '../../data/initialData';
import { UserProfile } from '../../types';

interface WelcomeScreenProps {
  onStart: () => void;
  onRegisterSuccess: (user: UserProfile, loadDemoData?: boolean) => void;
  onOpenAdminLogin: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onStart,
  onRegisterSuccess,
  onOpenAdminLogin,
}) => {
  const [viewState, setViewState] = useState<
    'landing' | 'guest_prompt' | 'register' | 'login' | 'registered_success' | 'admin_login'
  >('landing');

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registerDataMode, setRegisterDataMode] = useState<'clean' | 'demo'>('clean');

  // Guest states
  const [guestName, setGuestName] = useState('');
  const [guestDataMode, setGuestDataMode] = useState<'demo' | 'clean'>('demo'); // Default with demo data as requested

  const [errorMsg, setErrorMsg] = useState('');

  // Admin login states
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [showAdminPass, setShowAdminPass] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(false);

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Por favor ingresa tu nombre.');
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
      phone: phone.trim(),
      isLoggedIn: true,
    };

    onRegisterSuccess(newUser, registerDataMode === 'demo');
    setViewState('registered_success');
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setErrorMsg('Ingresa tu correo registrado.');
      return;
    }
    const user: UserProfile = {
      name: name.trim() || email.split('@')[0],
      email: email.trim(),
      phone: '',
      isLoggedIn: true,
    };
    // Standard login keeps existing/demo data
    onRegisterSuccess(user, true);
    onStart();
  };

  const handleGuestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = guestName.trim() || 'Invitado';
    const guestUser: UserProfile = {
      name: finalName,
      email: '',
      phone: '',
      isLoggedIn: true,
    };
    onRegisterSuccess(guestUser, guestDataMode === 'demo');
    onStart();
  };

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const cleanEmail = adminEmail.trim().toLowerCase();
    const cleanPass = adminPassword.trim();

    if (!cleanEmail || !cleanPass) {
      setErrorMsg('Ingresa el correo y la contraseña del administrador.');
      return;
    }

    setIsAdminLoading(true);
    setTimeout(() => {
      if (
        cleanEmail === ADMIN_AUTH_CONFIG.authorizedEmail.toLowerCase() &&
        cleanPass === ADMIN_AUTH_CONFIG.authorizedPassword
      ) {
        setIsAdminLoading(false);
        const adminUser: UserProfile = {
          name: ADMIN_AUTH_CONFIG.adminName,
          email: ADMIN_AUTH_CONFIG.authorizedEmail,
          phone: '',
          isLoggedIn: true,
          isAdmin: true,
        };
        onRegisterSuccess(adminUser, true);
        onOpenAdminLogin();
      } else {
        setIsAdminLoading(false);
        setErrorMsg('Credenciales inválidas. Verifica tu correo o contraseña.');
      }
    }, 350);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f2f5ff] via-[#faf8ff] to-white flex flex-col justify-between p-4 sm:p-6 max-w-lg mx-auto">
      {/* Top Brand Bar */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2.5">
          <img
            src="/logo-aldia.svg"
            alt="Logo AlDía"
            className="h-10 w-10 object-contain drop-shadow-xs"
          />
          <div className="flex flex-col">
            <span className="font-headline-md text-[20px] font-black text-[#0c3260] tracking-tight leading-tight">
              {APP_NAME}
            </span>
            <span className="text-[10px] font-bold text-[#128549] tracking-widest uppercase leading-tight">
              Finanzas
            </span>
          </div>
        </div>

        {viewState !== 'landing' ? (
          <button
            onClick={() => {
              setErrorMsg('');
              setViewState('landing');
            }}
            className="text-[13px] font-semibold text-[#0037b0] hover:underline cursor-pointer flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Volver</span>
          </button>
        ) : (
          <button
            onClick={() => {
              setErrorMsg('');
              setViewState('admin_login');
            }}
            className="px-3 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-label-sm text-[12px] font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-[15px] text-amber-400">admin_panel_settings</span>
            <span>Administrador</span>
          </button>
        )}
      </div>

      {/* Main Container by State */}
      <div className="my-auto py-6">
        {/* 1. Landing View */}
        {viewState === 'landing' && (
          <div className="flex flex-col gap-6 text-center animate-in fade-in duration-300">
            {/* Official Circular Logo Display */}
            <div className="mx-auto w-32 h-32 rounded-full flex items-center justify-center p-1 hover:scale-105 transition-transform">
              <img
                src="/logo-aldia.svg"
                alt="Logo AlDía Finanzas"
                className="w-full h-full object-contain drop-shadow-md"
              />
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="font-headline-lg text-[32px] font-extrabold text-[#131b2e] tracking-tight leading-tight">
                {APP_NAME}
              </h1>
              <p className="font-headline-sm text-[17px] font-bold text-[#0037b0] leading-snug">
                “{APP_SLOGAN}”
              </p>
              <p className="font-body-md text-[14px] text-[#434655] max-w-sm mx-auto mt-1 leading-relaxed">
                Una forma sencilla de conocer tus obligaciones, organizar tus pagos y recibir orientación financiera con nuestro Bot IA.
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
                <span className="material-symbols-outlined text-indigo-600 text-[20px]">smart_toy</span>
                <span className="font-label-md text-[12px] font-bold text-[#131b2e] block mt-1">
                  Bot IA
                </span>
                <span className="text-[10px] text-[#747686]">Asesoramiento inteligente</span>
              </div>
            </div>

            {/* Action Buttons: [Crear cuenta] [Iniciar sesión] [Continuar como invitado] [Administrador] */}
            <div className="flex flex-col gap-2.5 pt-3 max-w-sm mx-auto w-full">
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
                onClick={() => setViewState('guest_prompt')}
                className="w-full py-3 rounded-2xl bg-emerald-50 text-emerald-800 font-label-md text-[14px] font-bold border border-emerald-200 hover:bg-emerald-100/80 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[19px]">person</span>
                <span>Continuar como invitado</span>
              </button>

              <button
                type="button"
                onClick={() => setViewState('admin_login')}
                className="w-full py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-label-md text-[13px] font-bold shadow-xs active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2 mt-1"
              >
                <span className="material-symbols-outlined text-[18px] text-amber-400">admin_panel_settings</span>
                <span>Acceso Administrador</span>
              </button>
            </div>
          </div>
        )}

        {/* 2. Guest Prompt Form (With options for preloaded demo data or clean start) */}
        {viewState === 'guest_prompt' && (
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-[#eaedff] animate-in fade-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto mb-3">
              <span className="material-symbols-outlined text-[32px]">badge</span>
            </div>

            <div className="text-center pb-3">
              <h2 className="font-headline-md text-[22px] font-bold text-[#131b2e]">
                Ingresar como Invitado
              </h2>
              <p className="font-body-sm text-[13px] text-[#434655] mt-1">
                Personaliza tu ingreso rápido para explorar AlDía.
              </p>
            </div>

            <form onSubmit={handleGuestSubmit} className="flex flex-col gap-4">
              <div>
                <label className="font-label-sm text-[12px] font-semibold text-[#434655] block mb-1.5">
                  ¿Cómo te gustaría que te llamemos? (Opcional)
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#747686] text-[20px]">
                    person
                  </span>
                  <input
                    type="text"
                    placeholder="Escribe tu nombre o apodo (ej. Invitado)"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    autoFocus
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#0037b0] text-[15px] font-semibold text-[#131b2e] focus:ring-2 focus:ring-[#0037b0]/20 outline-none"
                  />
                </div>
              </div>

              {/* Data mode selection for Guest */}
              <div>
                <label className="font-label-sm text-[12px] font-bold text-[#131b2e] block mb-2">
                  Selecciona el modo de inicio:
                </label>
                <div className="flex flex-col gap-2">
                  <label
                    onClick={() => setGuestDataMode('demo')}
                    className={`flex items-start gap-3 p-3 rounded-2xl border transition-all cursor-pointer ${
                      guestDataMode === 'demo'
                        ? 'bg-blue-50/70 border-[#0037b0] ring-1 ring-[#0037b0]'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="guestMode"
                      checked={guestDataMode === 'demo'}
                      onChange={() => setGuestDataMode('demo')}
                      className="mt-0.5 text-[#0037b0]"
                    />
                    <div className="flex flex-col">
                      <span className="font-bold text-[13px] text-[#131b2e] flex items-center gap-1">
                        <span>Con información y montos de ejemplo</span>
                        <span className="text-[10px] px-1.5 py-0.5 bg-emerald-100 text-emerald-800 font-extrabold rounded">
                          Recomendado
                        </span>
                      </span>
                      <span className="text-[11px] text-[#5b5e70] mt-0.5">
                        Incluye deudas simuladas (Banco, Caja, Tarjeta) y montos para ver la app en acción.
                      </span>
                    </div>
                  </label>

                  <label
                    onClick={() => setGuestDataMode('clean')}
                    className={`flex items-start gap-3 p-3 rounded-2xl border transition-all cursor-pointer ${
                      guestDataMode === 'clean'
                        ? 'bg-blue-50/70 border-[#0037b0] ring-1 ring-[#0037b0]'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="guestMode"
                      checked={guestDataMode === 'clean'}
                      onChange={() => setGuestDataMode('clean')}
                      className="mt-0.5 text-[#0037b0]"
                    />
                    <div className="flex flex-col">
                      <span className="font-bold text-[13px] text-[#131b2e]">
                        En blanco / Limpio (Sin información ni montos)
                      </span>
                      <span className="text-[11px] text-[#5b5e70] mt-0.5">
                        Inicia con tablero en S/ 0 para que agregues tus propias deudas manualmente.
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-[#0037b0] text-white font-label-lg text-[15px] font-bold shadow-md hover:bg-[#002f99] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2 mt-1"
              >
                <span>Continuar</span>
                <span className="material-symbols-outlined text-[19px]">arrow_forward</span>
              </button>
            </form>
          </div>
        )}

        {/* 3. Register Form (With options for clean start or demo data) */}
        {viewState === 'register' && (
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-[#eaedff] animate-in fade-in zoom-in-95 duration-200">
            <div className="text-center pb-3">
              <h2 className="font-headline-md text-[22px] font-bold text-[#131b2e]">
                Crear tu cuenta en AlDía
              </h2>
              <p className="font-body-sm text-[13px] text-[#434655] mt-1">
                Toma el control de tus finanzas hoy mismo
              </p>
            </div>

            {errorMsg && (
              <div className="mb-3 p-3 rounded-2xl bg-rose-50 text-rose-700 text-[12px] font-semibold flex items-center gap-2 border border-rose-200">
                <span className="material-symbols-outlined text-[18px]">error</span>
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-3">
              <div>
                <label className="font-label-sm text-[12px] font-semibold text-[#434655] block mb-1">
                  Nombre completo
                </label>
                <input
                  type="text"
                  placeholder="Ingresa tu nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-[#c4c5d7] text-[14px] text-[#131b2e] focus:border-[#0037b0] outline-none"
                />
              </div>

              <div>
                <label className="font-label-sm text-[12px] font-semibold text-[#434655] block mb-1">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  placeholder="correo@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-[#c4c5d7] text-[14px] text-[#131b2e] focus:border-[#0037b0] outline-none"
                />
              </div>

              <div>
                <label className="font-label-sm text-[12px] font-semibold text-[#434655] block mb-1">
                  Número de celular
                </label>
                <input
                  type="tel"
                  placeholder="Opcional"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-[#c4c5d7] text-[14px] text-[#131b2e] focus:border-[#0037b0] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-label-sm text-[12px] font-semibold text-[#434655] block mb-1">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    placeholder="Mín. 6 caracteres"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#c4c5d7] text-[13px] text-[#131b2e] focus:border-[#0037b0] outline-none"
                  />
                </div>
                <div>
                  <label className="font-label-sm text-[12px] font-semibold text-[#434655] block mb-1">
                    Confirmar
                  </label>
                  <input
                    type="password"
                    placeholder="Repite clave"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#c4c5d7] text-[13px] text-[#131b2e] focus:border-[#0037b0] outline-none"
                  />
                </div>
              </div>

              {/* Data Mode Choice for Registered Account */}
              <div className="pt-1">
                <label className="font-label-sm text-[12px] font-bold text-[#131b2e] block mb-1.5">
                  ¿Cómo prefieres iniciar tu cuenta?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <label
                    onClick={() => setRegisterDataMode('clean')}
                    className={`flex items-start gap-2 p-2.5 rounded-xl border transition-all cursor-pointer ${
                      registerDataMode === 'clean'
                        ? 'bg-blue-50/70 border-[#0037b0] ring-1 ring-[#0037b0]'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="registerMode"
                      checked={registerDataMode === 'clean'}
                      onChange={() => setRegisterDataMode('clean')}
                      className="mt-0.5 text-[#0037b0]"
                    />
                    <div className="flex flex-col">
                      <span className="font-bold text-[12px] text-[#131b2e]">✨ Cuenta limpia</span>
                      <span className="text-[10px] text-[#5b5e70]">Sin deudas ni montos cargados</span>
                    </div>
                  </label>

                  <label
                    onClick={() => setRegisterDataMode('demo')}
                    className={`flex items-start gap-2 p-2.5 rounded-xl border transition-all cursor-pointer ${
                      registerDataMode === 'demo'
                        ? 'bg-blue-50/70 border-[#0037b0] ring-1 ring-[#0037b0]'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="registerMode"
                      checked={registerDataMode === 'demo'}
                      onChange={() => setRegisterDataMode('demo')}
                      className="mt-0.5 text-[#0037b0]"
                    />
                    <div className="flex flex-col">
                      <span className="font-bold text-[12px] text-[#131b2e]">📊 Con datos de ejemplo</span>
                      <span className="text-[10px] text-[#5b5e70]">Montos y deudas de prueba</span>
                    </div>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="mt-1 w-full py-3.5 rounded-2xl bg-[#0037b0] text-white font-label-lg text-[15px] font-bold shadow-md hover:bg-[#002f99] active:scale-[0.98] transition-all cursor-pointer"
              >
                Crear mi cuenta
              </button>

              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setErrorMsg('');
                    setViewState('login');
                  }}
                  className="text-[13px] text-[#0037b0] hover:underline font-medium cursor-pointer"
                >
                  ¿Ya tienes cuenta? Inicia sesión aquí
                </button>
              </div>
            </form>
          </div>
        )}

        {/* 4. Welcome Registered Success */}
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
                {registerDataMode === 'demo'
                  ? 'Hemos precargado datos de ejemplo para que explores cómo organizar tus pagos y deudas.'
                  : 'Tu cuenta está lista y limpia para que registres tus obligaciones financieras con total tranquilidad.'}
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

        {/* 5. Login View */}
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
                  placeholder="correo@ejemplo.com"
                  value={email}
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
                  placeholder="Tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                  onClick={() => {
                    setErrorMsg('');
                    setViewState('register');
                  }}
                  className="text-[13px] text-[#0037b0] hover:underline font-medium cursor-pointer"
                >
                  ¿No tienes cuenta? Regístrate aquí
                </button>
              </div>
            </form>
          </div>
        )}

        {/* 6. Dedicated Admin Login View */}
        {viewState === 'admin_login' && (
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-blue-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="text-center pb-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-slate-900 to-blue-900 text-amber-400 flex items-center justify-center mx-auto mb-3 shadow-md">
                <span className="material-symbols-outlined text-[30px]">admin_panel_settings</span>
              </div>
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-50 text-[#0037b0] font-label-sm text-[10px] font-extrabold uppercase tracking-wider mb-1">
                Administración AlDía
              </span>
              <h2 className="font-headline-md text-[22px] font-extrabold text-[#131b2e]">
                Acceso Administrador
              </h2>
              <p className="font-body-sm text-[13px] text-[#434655] mt-1">
                Ingresa tus credenciales autorizadas de administrador.
              </p>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-2xl bg-rose-50 text-rose-700 text-[12px] font-semibold flex items-center gap-2 border border-rose-200">
                <span className="material-symbols-outlined text-[18px]">error</span>
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleAdminSubmit} className="flex flex-col gap-3.5">
              <div>
                <label className="font-label-sm text-[12px] font-bold text-[#434655] block mb-1">
                  Correo del Administrador
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
                    mail
                  </span>
                  <input
                    type="email"
                    placeholder="correo@ejemplo.com"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    autoFocus
                    className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-300 text-[14px] text-[#131b2e] focus:border-[#0037b0] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-label-sm text-[12px] font-bold text-[#434655] block mb-1">
                  Contraseña
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
                    lock
                  </span>
                  <input
                    type={showAdminPass ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="w-full pl-11 pr-11 py-2.5 rounded-xl border border-slate-300 text-[14px] text-[#131b2e] focus:border-[#0037b0] outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowAdminPass(!showAdminPass)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {showAdminPass ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isAdminLoading}
                className="mt-2 w-full py-3.5 rounded-2xl bg-slate-900 text-white font-label-lg text-[15px] font-bold shadow-md hover:bg-slate-800 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {isAdminLoading ? (
                  <>
                    <span className="material-symbols-outlined text-[20px] animate-spin">progress_activity</span>
                    <span>Validando...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[20px] text-amber-400">admin_panel_settings</span>
                    <span>Iniciar Sesión Administrador</span>
                  </>
                )}
              </button>
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
