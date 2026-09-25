import React, { useState } from 'react';
import { ReminderConfig } from '../../types';

interface RemindersModalProps {
  reminders: ReminderConfig;
  onClose: () => void;
  onSaveReminders: (updated: ReminderConfig) => void;
}

export const RemindersModal: React.FC<RemindersModalProps> = ({
  reminders,
  onClose,
  onSaveReminders,
}) => {
  const [enabled, setEnabled] = useState(reminders.enabled);
  const [days7, setDays7] = useState(reminders.days7);
  const [days3, setDays3] = useState(reminders.days3);
  const [days1, setDays1] = useState(reminders.days1);
  const [savedToast, setSavedToast] = useState(false);

  const handleSave = () => {
    onSaveReminders({
      enabled,
      days7,
      days3,
      days1,
    });
    setSavedToast(true);
    setTimeout(() => {
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-md p-5 sm:p-6 shadow-2xl border border-[#eaedff] my-auto animate-in fade-in zoom-in-95 duration-200 flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#eaedff]">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#0037b0]/10 text-[#0037b0] flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">notifications_active</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-[18px] font-bold text-[#131b2e] leading-tight">
                Recordatorios de pago
              </h3>
              <p className="font-body-sm text-[12px] text-[#434655]">
                Configura tus alertas para no olvidar ninguna fecha
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#747686] hover:text-[#131b2e]"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Master Toggle */}
        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#f2f5ff] border border-[#eaedff]">
          <div className="flex flex-col">
            <span className="font-label-md text-[13px] font-bold text-[#131b2e]">
              Notificaciones automáticas
            </span>
            <span className="font-body-sm text-[12px] text-[#434655]">
              {enabled ? 'Alertas activadas' : 'Alertas desactivadas'}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setEnabled(!enabled)}
            className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
              enabled ? 'bg-[#0037b0]' : 'bg-gray-300'
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                enabled ? 'translate-x-6' : 'translate-x-0'
              }`}
            ></div>
          </button>
        </div>

        {/* Reminder Options */}
        <div className={`flex flex-col gap-2.5 transition-opacity ${enabled ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
          <span className="font-label-sm text-[12px] font-bold text-[#131b2e]">
            Recibir avisos con anticipación:
          </span>

          {/* 7 días antes */}
          <label className="flex items-center justify-between p-3 rounded-2xl bg-white border border-[#eaedff] hover:border-[#0037b0]/40 cursor-pointer transition-all">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0037b0] flex items-center justify-center font-bold text-[12px]">
                7d
              </div>
              <div className="flex flex-col">
                <span className="font-label-md text-[13px] font-semibold text-[#131b2e]">
                  7 días antes
                </span>
                <span className="font-body-sm text-[11px] text-[#747686]">
                  Para planificar tu dinero del mes con tiempo
                </span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={days7}
              onChange={(e) => setDays7(e.target.checked)}
              className="w-5 h-5 rounded-md text-[#0037b0] focus:ring-[#0037b0] border-[#c4c5d7] cursor-pointer"
            />
          </label>

          {/* 3 días antes */}
          <label className="flex items-center justify-between p-3 rounded-2xl bg-white border border-[#eaedff] hover:border-[#0037b0]/40 cursor-pointer transition-all">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-[12px]">
                3d
              </div>
              <div className="flex flex-col">
                <span className="font-label-md text-[13px] font-semibold text-[#131b2e]">
                  3 días antes
                </span>
                <span className="font-body-sm text-[11px] text-[#747686]">
                  Aviso preventivo antes del cierre de ciclo
                </span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={days3}
              onChange={(e) => setDays3(e.target.checked)}
              className="w-5 h-5 rounded-md text-[#0037b0] focus:ring-[#0037b0] border-[#c4c5d7] cursor-pointer"
            />
          </label>

          {/* 1 día antes */}
          <label className="flex items-center justify-between p-3 rounded-2xl bg-white border border-[#eaedff] hover:border-[#0037b0]/40 cursor-pointer transition-all">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center font-bold text-[12px]">
                1d
              </div>
              <div className="flex flex-col">
                <span className="font-label-md text-[13px] font-semibold text-[#131b2e]">
                  1 día antes (Urgente)
                </span>
                <span className="font-body-sm text-[11px] text-[#747686]">
                  Para evitar recargos por mora al día siguiente
                </span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={days1}
              onChange={(e) => setDays1(e.target.checked)}
              className="w-5 h-5 rounded-md text-[#0037b0] focus:ring-[#0037b0] border-[#c4c5d7] cursor-pointer"
            />
          </label>
        </div>

        {/* Live Example Card */}
        <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200/70 flex items-start gap-3">
          <span className="material-symbols-outlined text-[#0037b0] text-[20px] mt-0.5">info</span>
          <div className="flex flex-col">
            <span className="font-label-sm text-[11px] font-bold text-[#0037b0] uppercase">
              Ejemplo de recordatorio que verás:
            </span>
            <p className="font-body-sm text-[12px] text-[#131b2e] mt-0.5 italic">
              “🔔 Tu cuota de S/ 350 vence en 3 días (Banco Principal).”
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="pt-2 flex flex-col gap-2">
          <button
            type="button"
            onClick={handleSave}
            className="w-full py-3 rounded-2xl bg-[#0037b0] text-white font-label-lg text-[14px] font-bold hover:bg-[#002f99] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">check</span>
            <span>{savedToast ? '¡Guardado!' : 'Guardar preferencias'}</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2 rounded-xl text-[#747686] hover:text-[#131b2e] font-label-md text-[13px]"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
