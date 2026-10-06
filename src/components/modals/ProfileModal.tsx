import React, { useState } from 'react';
import { APP_NAME, LEGAL_DISCLAIMER } from '../../data/initialData';
import { UserProfile } from '../../types';

interface ProfileModalProps {
  user: UserProfile;
  onClose: () => void;
  onRestartWelcome: () => void;
  onLogout: () => void;
  onOpenAdmin?: () => void;
  onLoadDemoData?: () => void;
  onClearAllData?: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  user,
  onClose,
  onRestartWelcome,
  onLogout,
  onOpenAdmin,
  onLoadDemoData,
  onClearAllData,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name || '');
  const [email, setEmail] = useState(user.email || '');
  const [phone, setPhone] = useState(user.phone || '');
  const [showReminders, setShowReminders] = useState(false);
  const [reminder7, setReminder7] = useState(true);
  const [reminder3, setReminder3] = useState(true);
  const [reminder1, setReminder1] = useState(true);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    user.name = name;
    user.email = email;
    user.phone = phone;
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-[#FFFFFF] rounded-xl w-full max-w-md p-6 border border-[#E5E7EB] shadow-lg flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
          <h2 className="text-[18px] font-bold text-[#0F3D56]">
            Perfil de usuario
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#6B7280] hover:text-[#25313C] hover:bg-[#F7F8FA] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {isEditing ? (
          <form onSubmit={handleSaveProfile} className="flex flex-col gap-3">
            <div>
              <label className="text-[13px] font-medium text-[#25313C] block mb-1">Nombre</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#E5E7EB] text-[14px] outline-none focus:border-[#0F3D56]"
              />
            </div>
            <div>
              <label className="text-[13px] font-medium text-[#25313C] block mb-1">Correo electrónico</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#E5E7EB] text-[14px] outline-none focus:border-[#0F3D56]"
              />
            </div>
            <div>
              <label className="text-[13px] font-medium text-[#25313C] block mb-1">Teléfono</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#E5E7EB] text-[14px] outline-none focus:border-[#0F3D56]"
              />
            </div>
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="flex-1 py-2 rounded-lg border border-[#E5E7EB] text-[#25313C] text-[13px] font-medium cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 py-2 rounded-lg bg-[#0F3D56] text-white text-[13px] font-medium cursor-pointer"
              >
                Guardar
              </button>
            </div>
          </form>
        ) : showReminders ? (
          <div className="flex flex-col gap-3">
            <h3 className="text-[15px] font-bold text-[#0F3D56]">Configurar recordatorios</h3>
            <p className="text-[13px] text-[#6B7280]">
              Elige con cuánta anticipación deseas recibir avisos antes del vencimiento:
            </p>
            <div className="flex flex-col gap-2 pt-1 text-[13px]">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={reminder7}
                  onChange={(e) => setReminder7(e.target.checked)}
                  className="rounded text-[#0F3D56]"
                />
                <span>7 días antes del vencimiento</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={reminder3}
                  onChange={(e) => setReminder3(e.target.checked)}
                  className="rounded text-[#0F3D56]"
                />
                <span>3 días antes del vencimiento</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={reminder1}
                  onChange={(e) => setReminder1(e.target.checked)}
                  className="rounded text-[#0F3D56]"
                />
                <span>1 día antes del vencimiento</span>
              </label>
            </div>
            <button
              type="button"
              onClick={() => setShowReminders(false)}
              className="mt-2 w-full py-2 rounded-lg bg-[#0F3D56] text-white text-[13px] font-medium cursor-pointer"
            >
              Guardar preferencias
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {/* User Info Block */}
            <div className="bg-[#F7F8FA] p-4 rounded-lg border border-[#E5E7EB] flex flex-col gap-1">
              <span className="text-[16px] font-bold text-[#25313C]">
                {user.name || 'Mi perfil'}
              </span>
              <span className="text-[13px] text-[#6B7280]">
                {user.email || 'Sin correo registrado'}
              </span>
              {user.phone && (
                <span className="text-[13px] text-[#6B7280]">
                  Tel: {user.phone}
                </span>
              )}
            </div>

            {/* Options List */}
            <div className="flex flex-col gap-1.5 text-[14px]">
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="w-full py-2 px-3 rounded-lg border border-[#E5E7EB] hover:bg-[#F7F8FA] text-[#25313C] text-left flex items-center justify-between cursor-pointer"
              >
                <span>Editar información</span>
                <span className="material-symbols-outlined text-[18px] text-[#6B7280]">edit</span>
              </button>

              <button
                type="button"
                onClick={() => setShowReminders(true)}
                className="w-full py-2 px-3 rounded-lg border border-[#E5E7EB] hover:bg-[#F7F8FA] text-[#25313C] text-left flex items-center justify-between cursor-pointer"
              >
                <span>Recordatorios</span>
                <span className="material-symbols-outlined text-[18px] text-[#6B7280]">notifications</span>
              </button>

              {onLoadDemoData && (
                <button
                  type="button"
                  onClick={() => {
                    onLoadDemoData();
                    onClose();
                  }}
                  className="w-full py-2 px-3 rounded-lg border border-[#E5E7EB] hover:bg-[#F7F8FA] text-[#25313C] text-left flex items-center justify-between cursor-pointer"
                >
                  <span>Cargar datos de ejemplo</span>
                  <span className="material-symbols-outlined text-[18px] text-[#6B7280]">sync</span>
                </button>
              )}

              {onClearAllData && (
                <button
                  type="button"
                  onClick={() => {
                    onClearAllData();
                    onClose();
                  }}
                  className="w-full py-2 px-3 rounded-lg border border-[#E5E7EB] hover:bg-rose-50 text-[#6B7280] hover:text-[#D64545] text-left flex items-center justify-between cursor-pointer"
                >
                  <span>Limpiar cuenta (Empezar de cero)</span>
                  <span className="material-symbols-outlined text-[18px]">clear_all</span>
                </button>
              )}

              {onOpenAdmin && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenAdmin();
                  }}
                  className="w-full py-2 px-3 rounded-lg border border-[#E5E7EB] hover:bg-[#F7F8FA] text-[#0F3D56] font-medium text-left flex items-center justify-between cursor-pointer"
                >
                  <span>Panel Administrador</span>
                  <span className="material-symbols-outlined text-[18px]">admin_panel_settings</span>
                </button>
              )}
            </div>

            {/* Disclaimer */}
            <p className="text-[11px] text-[#6B7280] leading-relaxed pt-2 border-t border-[#E5E7EB]">
              {LEGAL_DISCLAIMER}
            </p>

            {/* Logout */}
            <button
              type="button"
              onClick={() => {
                onClose();
                onLogout();
              }}
              className="w-full py-2 rounded-lg text-[#D64545] hover:bg-rose-50 text-[13px] font-medium transition-colors cursor-pointer text-center"
            >
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
