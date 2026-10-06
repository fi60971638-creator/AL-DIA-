import React, { useState } from 'react';
import { APP_NAME, APP_SLOGAN, LEGAL_DISCLAIMER, ADMIN_AUTH_CONFIG, APP_LOGO_URL } from '../../data/initialData';
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
  const [guestDataMode, setGuestDataMode] = useState<'demo' | 'clean'>('demo');

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
    onRegisterSuccess(user, true);
    onStart();
  };

  const handleGuestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = guestName.trim();
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
      setErrorMsg('Ingresa el correo y la contraseña.');
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
        setErrorMsg('Credenciales incorrectas. Verifica tus datos.');
      }
    }, 300);
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex flex-col justify-between p-4 sm:p-6 max-w-md mx-auto">
      {/* Top Header */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <img
            src={APP_LOGO_URL}
            alt="Logo AlDía"
            className="h-7 w-auto object-contain"
          />
          <span className="text-[18px] font-bold text-[#0F3D56]">
            {APP_NAME}
          </span>
        </div>

        {viewState !== 'landing' ? (
          <button
            onClick={() => {
              setErrorMsg('');
              setViewState('landing');
            }}
            className="text-[13px] font-medium text-[#0F3D56] hover:underline cursor-pointer flex items-center gap-1"
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
            className="px-2.5 py-1 rounded-md text-[12px] font-medium text-[#6B7280] hover:text-[#0F3D56] hover:bg-[#FFFFFF] border border-[#E5E7EB] transition-colors cursor-pointer"
          >
            Administrador
          </button>
        )}
      </div>

      {/* Main Body */}
      <div className="my-auto py-6">
        {/* 1. Landing View */}
        {viewState === 'landing' && (
          <div className="flex flex-col gap-6 text-center">
            <div className="flex flex-col gap-2">
              <h1 className="text-[28px] font-bold text-[#0F3D56] tracking-tight">
                {APP_NAME}
              </h1>
              <p className="text-[16px] font-semibold text-[#149B8A]">
                {APP_SLOGAN}
              </p>
              <p className="text-[14px] text-[#6B7280] max-w-sm mx-auto mt-1 leading-relaxed">
                Controla tus deudas, consulta tus próximas cuotas y mantén tus pagos organizados en un solo lugar.
              </p>
            </div>

            {/* Simple Feature Items */}
            <div className="grid grid-cols-3 gap-2 max-w-sm mx-auto text-center pt-1">
              <div className="bg-[#FFFFFF] p-3 rounded-lg border border-[#E5E7EB]">
                <span className="material-symbols-outlined text-[#0F3D56] text-[20px]">fact_check</span>
                <span className="text-[12px] font-semibold text-[#25313C] block mt-1">
                  Total claro
                </span>
                <span className="text-[11px] text-[#6B7280]">Cuánto debes</span>
              </div>

              <div className="bg-[#FFFFFF] p-3 rounded-lg border border-[#E5E7EB]">
                <span className="material-symbols-outlined text-[#149B8A] text-[20px]">event_repeat</span>
                <span className="text-[12px] font-semibold text-[#25313C] block mt-1">
                  Calendario
                </span>
                <span className="text-[11px] text-[#6B7280]">Cuándo pagar</span>
              </div>

              <div className="bg-[#FFFFFF] p-3 rounded-lg border border-[#E5E7EB]">
                <span className="material-symbols-outlined text-[#2563EB] text-[20px]">notifications_active</span>
                <span className="text-[12px] font-semibold text-[#25313C] block mt-1">
                  Alertas
                </span>
                <span className="text-[11px] text-[#6B7280]">Sin atrasos</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2.5 pt-2 max-w-sm mx-auto w-full">
              <button
                type="button"
                onClick={() => setViewState('guest_prompt')}
                className="w-full py-3 rounded-lg bg-[#0F3D56] hover:bg-[#0c2f42] text-white text-[14px] font-semibold transition-colors cursor-pointer"
              >
                Continuar como invitado
              </button>

              <button
                type="button"
                onClick={() => setViewState('register')}
                className="w-full py-2.5 rounded-lg bg-[#FFFFFF] border border-[#E5E7EB] hover:bg-[#F7F8FA] text-[#25313C] text-[14px] font-medium transition-colors cursor-pointer"
              >
                Crear cuenta
              </button>

              <button
                type="button"
                onClick={() => setViewState('login')}
                className="text-[13px] text-[#6B7280] hover:text-[#0F3D56] underline py-1 cursor-pointer"
              >
                ¿Ya tienes cuenta? Iniciar sesión
              </button>
            </div>
          </div>
        )}

        {/* 2. Guest Prompt Form */}
        {viewState === 'guest_prompt' && (
          <div className="bg-[#FFFFFF] rounded-xl p-6 border border-[#E5E7EB] shadow-xs flex flex-col gap-4">
            <div className="text-center">
              <h2 className="text-[20px] font-bold text-[#0F3D56]">
                Ingresar como Invitado
              </h2>
              <p className="text-[13px] text-[#6B7280] mt-0.5">
                Ingresa a la plataforma de forma rápida.
              </p>
            </div>

            <form onSubmit={handleGuestSubmit} className="flex flex-col gap-3.5">
              <div>
                <label className="text-[13px] font-medium text-[#25313C] block mb-1">
                  Nombre o apodo (Opcional)
                </label>
                <input
                  type="text"
                  placeholder=""
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  autoFocus
                  className="w-full px-3 py-2 rounded-lg border border-[#E5E7EB] text-[14px] text-[#25313C] outline-none focus:border-[#0F3D56]"
                />
              </div>

              <div>
                <label className="text-[13px] font-medium text-[#25313C] block mb-1.5">
                  Información inicial:
                </label>
                <div className="flex flex-col gap-2">
                  <label
                    onClick={() => setGuestDataMode('demo')}
                    className={`flex items-start gap-2.5 p-2.5 rounded-lg border transition-colors cursor-pointer ${
                      guestDataMode === 'demo'
                        ? 'bg-[#F7F8FA] border-[#0F3D56]'
                        : 'bg-white border-[#E5E7EB]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="guestMode"
                      checked={guestDataMode === 'demo'}
                      onChange={() => setGuestDataMode('demo')}
                      className="mt-0.5 text-[#0F3D56]"
                    />
                    <div className="flex flex-col">
                      <span className="font-semibold text-[13px] text-[#25313C]">
                        Con datos de ejemplo (Recomendado)
                      </span>
                      <span className="text-[11px] text-[#6B7280]">
                        Incluye 3 deudas de muestra (S/ 1,800.00 total) para probar.
                      </span>
                    </div>
                  </label>

                  <label
                    onClick={() => setGuestDataMode('clean')}
                    className={`flex items-start gap-2.5 p-2.5 rounded-lg border transition-colors cursor-pointer ${
                      guestDataMode === 'clean'
                        ? 'bg-[#F7F8FA] border-[#0F3D56]'
                        : 'bg-white border-[#E5E7EB]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="guestMode"
                      checked={guestDataMode === 'clean'}
                      onChange={() => setGuestDataMode('clean')}
                      className="mt-0.5 text-[#0F3D56]"
                    />
                    <div className="flex flex-col">
                      <span className="font-semibold text-[13px] text-[#25313C]">
                        En blanco / Limpio
                      </span>
                      <span className="text-[11px] text-[#6B7280]">
                        Inicia en S/ 0 para registrar tus deudas desde cero.
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="mt-1 w-full py-2.5 rounded-lg bg-[#0F3D56] hover:bg-[#0c2f42] text-white text-[14px] font-semibold transition-colors cursor-pointer"
              >
                Continuar
              </button>
            </form>
          </div>
        )}

        {/* 3. Register Form */}
        {viewState === 'register' && (
          <div className="bg-[#FFFFFF] rounded-xl p-6 border border-[#E5E7EB] shadow-xs flex flex-col gap-4">
            <div className="text-center">
              <h2 className="text-[20px] font-bold text-[#0F3D56]">
                Crear tu cuenta
              </h2>
              <p className="text-[13px] text-[#6B7280] mt-0.5">
                Organiza tus pagos y mantente al día
              </p>
            </div>

            {errorMsg && (
              <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-[#D64545] text-[12px] font-medium">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-3">
              <div>
                <label className="text-[13px] font-medium text-[#25313C] block mb-1">
                  Nombre completo
                </label>
                <input
                  type="text"
                  required
                  placeholder=""
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[#E5E7EB] text-[14px] text-[#25313C] outline-none focus:border-[#0F3D56]"
                />
              </div>

              <div>
                <label className="text-[13px] font-medium text-[#25313C] block mb-1">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  required
                  placeholder="correo@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[#E5E7EB] text-[14px] text-[#25313C] outline-none focus:border-[#0F3D56]"
                />
              </div>

              <div>
                <label className="text-[13px] font-medium text-[#25313C] block mb-1">
                  Teléfono (Opcional)
                </label>
                <input
                  type="tel"
                  placeholder="+51 900 000 000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[#E5E7EB] text-[14px] text-[#25313C] outline-none focus:border-[#0F3D56]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[13px] font-medium text-[#25313C] block mb-1">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Mín. 6 car."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#E5E7EB] text-[13px] text-[#25313C] outline-none focus:border-[#0F3D56]"
                  />
                </div>
                <div>
                  <label className="text-[13px] font-medium text-[#25313C] block mb-1">
                    Confirmar
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Repite clave"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#E5E7EB] text-[13px] text-[#25313C] outline-none focus:border-[#0F3D56]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[13px] font-medium text-[#25313C] block mb-1">
                  Modo de cuenta:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <label
                    onClick={() => setRegisterDataMode('clean')}
                    className={`flex items-center gap-2 p-2 rounded-lg border transition-colors cursor-pointer ${
                      registerDataMode === 'clean'
                        ? 'bg-[#F7F8FA] border-[#0F3D56]'
                        : 'bg-white border-[#E5E7EB]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="regMode"
                      checked={registerDataMode === 'clean'}
                      onChange={() => setRegisterDataMode('clean')}
                      className="text-[#0F3D56]"
                    />
                    <span className="text-[12px] font-medium text-[#25313C]">Desde cero</span>
                  </label>

                  <label
                    onClick={() => setRegisterDataMode('demo')}
                    className={`flex items-center gap-2 p-2 rounded-lg border transition-colors cursor-pointer ${
                      registerDataMode === 'demo'
                        ? 'bg-[#F7F8FA] border-[#0F3D56]'
                        : 'bg-white border-[#E5E7EB]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="regMode"
                      checked={registerDataMode === 'demo'}
                      onChange={() => setRegisterDataMode('demo')}
                      className="text-[#0F3D56]"
                    />
                    <span className="text-[12px] font-medium text-[#25313C]">Con ejemplo</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="mt-1 w-full py-2.5 rounded-lg bg-[#0F3D56] hover:bg-[#0c2f42] text-white text-[14px] font-semibold transition-colors cursor-pointer"
              >
                Crear cuenta
              </button>

              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setErrorMsg('');
                    setViewState('login');
                  }}
                  className="text-[13px] text-[#0F3D56] hover:underline"
                >
                  ¿Ya tienes cuenta? Inicia sesión aquí
                </button>
              </div>
            </form>
          </div>
        )}

        {/* 4. Registered Success */}
        {viewState === 'registered_success' && (
          <div className="bg-[#FFFFFF] rounded-xl p-6 border border-[#E5E7EB] shadow-xs text-center flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-[#149B8A] flex items-center justify-center">
              <span className="material-symbols-outlined text-[28px]">check_circle</span>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-[20px] font-bold text-[#0F3D56]">
                ¡Bienvenido a AlDía!
              </h2>
              <p className="text-[13px] text-[#6B7280]">
                Tu cuenta ha sido creada exitosamente.
              </p>
            </div>
            <button
              type="button"
              onClick={onStart}
              className="w-full py-2.5 rounded-lg bg-[#0F3D56] text-white text-[14px] font-semibold cursor-pointer"
            >
              Comenzar
            </button>
          </div>
        )}

        {/* 5. Login View */}
        {viewState === 'login' && (
          <div className="bg-[#FFFFFF] rounded-xl p-6 border border-[#E5E7EB] shadow-xs flex flex-col gap-4">
            <div className="text-center">
              <h2 className="text-[20px] font-bold text-[#0F3D56]">
                Iniciar sesión
              </h2>
              <p className="text-[13px] text-[#6B7280] mt-0.5">
                Ingresa a tu cuenta de AlDía
              </p>
            </div>

            {errorMsg && (
              <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-[#D64545] text-[12px] font-medium">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="flex flex-col gap-3.5">
              <div>
                <label className="text-[13px] font-medium text-[#25313C] block mb-1">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  required
                  placeholder="correo@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[#E5E7EB] text-[14px] text-[#25313C] outline-none focus:border-[#0F3D56]"
                />
              </div>

              <div>
                <label className="text-[13px] font-medium text-[#25313C] block mb-1">
                  Contraseña
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[#E5E7EB] text-[14px] text-[#25313C] outline-none focus:border-[#0F3D56]"
                />
              </div>

              <button
                type="submit"
                className="mt-1 w-full py-2.5 rounded-lg bg-[#0F3D56] hover:bg-[#0c2f42] text-white text-[14px] font-semibold transition-colors cursor-pointer"
              >
                Ingresar
              </button>

              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setErrorMsg('');
                    setViewState('register');
                  }}
                  className="text-[13px] text-[#0F3D56] hover:underline"
                >
                  ¿No tienes cuenta? Regístrate aquí
                </button>
              </div>
            </form>
          </div>
        )}

        {/* 6. Admin Login View */}
        {viewState === 'admin_login' && (
          <div className="bg-[#FFFFFF] rounded-xl p-6 border border-[#E5E7EB] shadow-xs flex flex-col gap-4">
            <div className="text-center">
              <h2 className="text-[20px] font-bold text-[#0F3D56]">
                Acceso Administrador
              </h2>
              <p className="text-[13px] text-[#6B7280] mt-0.5">
                Ingreso al panel de gestión
              </p>
            </div>

            {errorMsg && (
              <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-[#D64545] text-[12px] font-medium">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleAdminSubmit} className="flex flex-col gap-3.5">
              <div>
                <label className="text-[13px] font-medium text-[#25313C] block mb-1">
                  Correo
                </label>
                <input
                  type="email"
                  required
                  placeholder="correo@ejemplo.com"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[#E5E7EB] text-[14px] text-[#25313C] outline-none focus:border-[#0F3D56]"
                />
              </div>

              <div>
                <label className="text-[13px] font-medium text-[#25313C] block mb-1">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    type={showAdminPass ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#E5E7EB] text-[14px] text-[#25313C] outline-none focus:border-[#0F3D56]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowAdminPass(!showAdminPass)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#6B7280] text-[12px]"
                  >
                    {showAdminPass ? 'Ocultar' : 'Ver'}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isAdminLoading}
                className="mt-1 w-full py-2.5 rounded-lg bg-[#0F3D56] text-white text-[14px] font-semibold transition-colors cursor-pointer disabled:opacity-60"
              >
                {isAdminLoading ? 'Validando...' : 'Ingresar al panel'}
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Footer Legal */}
      <footer className="text-center pt-3 pb-1 border-t border-[#E5E7EB]">
        <p className="text-[11px] text-[#6B7280]">
          {LEGAL_DISCLAIMER}
        </p>
      </footer>
    </div>
  );
};
