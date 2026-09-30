import React, { useState } from 'react';
import { AdminReminderRule, NotificationItem } from '../../types';

interface AdminRemindersTabProps {
  rules: AdminReminderRule[];
  onAddRule: (rule: Omit<AdminReminderRule, 'id' | 'triggerCount'>) => void;
  onUpdateRule: (rule: AdminReminderRule) => void;
  onDeleteRule: (ruleId: string) => void;
  onSendBroadcast: (notification: NotificationItem) => void;
}

export const AdminRemindersTab: React.FC<AdminRemindersTabProps> = ({
  rules,
  onAddRule,
  onUpdateRule,
  onDeleteRule,
  onSendBroadcast,
}) => {
  const [isAddRuleOpen, setIsAddRuleOpen] = useState(false);
  const [isBroadcastOpen, setIsBroadcastOpen] = useState(false);
  const [broadcastSentToast, setBroadcastSentToast] = useState(false);

  // New Rule form
  const [name, setName] = useState('');
  const [timing, setTiming] = useState<AdminReminderRule['timing']>('3 días antes');
  const [channel, setChannel] = useState<AdminReminderRule['channel']>('Push In-App');
  const [template, setTemplate] = useState('');

  // Broadcast Form
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastDesc, setBroadcastDesc] = useState('');
  const [broadcastType, setBroadcastType] = useState<NotificationItem['type']>('info');

  const handleCreateRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !template.trim()) return;

    onAddRule({
      name: name.trim(),
      timing,
      channel,
      messageTemplate: template.trim(),
      isActive: true,
    });

    setName('');
    setTemplate('');
    setIsAddRuleOpen(false);
  };

  const handleToggleRule = (rule: AdminReminderRule) => {
    onUpdateRule({
      ...rule,
      isActive: !rule.isActive,
    });
  };

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastTitle.trim() || !broadcastDesc.trim()) return;

    const notif: NotificationItem = {
      id: `admin-broadcast-${Date.now()}`,
      title: broadcastTitle.trim(),
      desc: broadcastDesc.trim(),
      time: 'Justo ahora (Difusión Admin)',
      read: false,
      type: broadcastType,
    };

    onSendBroadcast(notif);
    setBroadcastTitle('');
    setBroadcastDesc('');
    setIsBroadcastOpen(false);
    setBroadcastSentToast(true);
    setTimeout(() => setBroadcastSentToast(false), 4000);
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Toast */}
      {broadcastSentToast && (
        <div className="p-3.5 rounded-2xl bg-emerald-500 text-white font-bold text-[13px] flex items-center gap-2 shadow-lg animate-in slide-in-from-top duration-200">
          <span className="material-symbols-outlined text-[20px]">campaign</span>
          <span>¡Notificación masiva enviada exitosamente a todos los usuarios de AlDía!</span>
        </div>
      )}

      {/* Action Header */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-3 md:items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0037b0] flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">notifications_active</span>
          </div>
          <div>
            <h3 className="font-headline-sm text-[16px] font-bold text-slate-900">
              Sistema de Recordatorios y Alertas
            </h3>
            <p className="text-[12px] text-slate-500">
              Automatiza cronogramas de vencimiento y envía avisos preventivos a los clientes.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsBroadcastOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-label-md text-[13px] font-bold shadow-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">campaign</span>
            <span>Enviar Difusión</span>
          </button>

          <button
            onClick={() => setIsAddRuleOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-[#0037b0] hover:bg-[#002f99] active:scale-95 text-white font-label-md text-[13px] font-bold shadow-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">add_alarm</span>
            <span>Nueva Plantilla</span>
          </button>
        </div>
      </div>

      {/* Rules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rules.map((rule) => (
          <div
            key={rule.id}
            className={`bg-white p-5 rounded-2xl border transition-all ${
              rule.isActive ? 'border-slate-200 shadow-xs' : 'border-slate-200 opacity-60 bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-full bg-blue-50 text-[#0037b0] font-bold text-[11px]">
                {rule.timing}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                  {rule.channel}
                </span>
                <span
                  className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    rule.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {rule.isActive ? 'Activo' : 'Pausado'}
                </span>
              </div>
            </div>

            <h4 className="font-bold text-slate-900 text-[15px] mb-1.5">{rule.name}</h4>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-[12px] text-slate-700 font-mono mb-3 leading-relaxed">
              "{rule.messageTemplate}"
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px]">send</span>
                Disparado {rule.triggerCount.toLocaleString()} veces
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleRule(rule)}
                  className={`px-3 py-1 rounded-lg text-[11px] font-bold border transition-colors cursor-pointer ${
                    rule.isActive
                      ? 'border-slate-200 text-slate-700 hover:bg-slate-100'
                      : 'border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                  }`}
                >
                  {rule.isActive ? 'Pausar' : 'Activar'}
                </button>

                <button
                  onClick={() => onDeleteRule(rule.id)}
                  title="Eliminar regla"
                  className="p-1 rounded-lg text-slate-400 hover:text-rose-600 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[17px]">delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Broadcast Modal */}
      {isBroadcastOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-500 text-[24px]">campaign</span>
                <h3 className="font-headline-sm text-[18px] font-bold text-slate-900">
                  Difusión Masiva de Notificación
                </h3>
              </div>
              <button
                onClick={() => setIsBroadcastOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <p className="text-[13px] text-slate-600 mt-2">
              Este mensaje llegará de inmediato a la bandeja de notificaciones de todos los usuarios de la plataforma.
            </p>

            <form onSubmit={handleSendBroadcast} className="flex flex-col gap-3.5 pt-4">
              <div>
                <label className="text-[12px] font-bold text-slate-700 block mb-1">Título del Mensaje *</label>
                <input
                  type="text"
                  required
                  placeholder="ej. Aviso importante sobre reprogramaciones de fin de mes"
                  value={broadcastTitle}
                  onChange={(e) => setBroadcastTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-[13px] outline-none focus:border-[#0037b0]"
                />
              </div>

              <div>
                <label className="text-[12px] font-bold text-slate-700 block mb-1">Tipo de Notificación</label>
                <select
                  value={broadcastType}
                  onChange={(e) => setBroadcastType(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-[13px] outline-none bg-white focus:border-[#0037b0]"
                >
                  <option value="info">Informativa (Azul)</option>
                  <option value="warning">Alerta / Advertencia (Ámbar)</option>
                  <option value="success">Novedad / Éxito (Verde)</option>
                  <option value="alert">Urgente (Rojo)</option>
                </select>
              </div>

              <div>
                <label className="text-[12px] font-bold text-slate-700 block mb-1">Detalle del Mensaje *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Escribe el cuerpo del comunicado para los usuarios..."
                  value={broadcastDesc}
                  onChange={(e) => setBroadcastDesc(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-[13px] outline-none focus:border-[#0037b0]"
                ></textarea>
              </div>

              <div className="flex gap-2.5 pt-3">
                <button
                  type="button"
                  onClick={() => setIsBroadcastOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-[13px] hover:bg-slate-50 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-[13px] shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[18px]">send</span>
                  <span>Transmitir a Todos</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Rule Modal */}
      {isAddRuleOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-headline-sm text-[18px] font-bold text-slate-900">
                Nueva Plantilla de Recordatorio
              </h3>
              <button
                onClick={() => setIsAddRuleOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateRule} className="flex flex-col gap-3.5 pt-4">
              <div>
                <label className="text-[12px] font-bold text-slate-700 block mb-1">Nombre de la Plantilla *</label>
                <input
                  type="text"
                  required
                  placeholder="ej. Aviso día previo a fin de mes"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-[13px] outline-none focus:border-[#0037b0]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[12px] font-bold text-slate-700 block mb-1">Momento de Envío</label>
                  <select
                    value={timing}
                    onChange={(e) => setTiming(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-[13px] outline-none bg-white focus:border-[#0037b0]"
                  >
                    <option value="7 días antes">7 días antes</option>
                    <option value="3 días antes">3 días antes</option>
                    <option value="1 día antes">1 día antes</option>
                    <option value="Día del vencimiento">Día del vencimiento</option>
                    <option value="Post-vencimiento (Mora)">Post-vencimiento (Mora)</option>
                  </select>
                </div>
                <div>
                  <label className="text-[12px] font-bold text-slate-700 block mb-1">Canal de Envío</label>
                  <select
                    value={channel}
                    onChange={(e) => setChannel(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-[13px] outline-none bg-white focus:border-[#0037b0]"
                  >
                    <option value="Push In-App">Push In-App</option>
                    <option value="WhatsApp / SMS">WhatsApp / SMS</option>
                    <option value="Correo Electrónico">Correo Electrónico</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[12px] font-bold text-slate-700 block mb-1">
                  Plantilla del Mensaje (usa {'{nombre}'}, {'{entidad}'}, {'{monto}'}, {'{fecha}'}) *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="ej. Hola {nombre}, te recordamos que tu cuota de {entidad} por S/ {monto} vence el {fecha}."
                  value={template}
                  onChange={(e) => setTemplate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-[13px] font-mono outline-none focus:border-[#0037b0]"
                ></textarea>
              </div>

              <div className="flex gap-2.5 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddRuleOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-[13px] hover:bg-slate-50 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#0037b0] text-white font-bold text-[13px] hover:bg-[#002f99] shadow-xs cursor-pointer"
                >
                  Guardar Plantilla
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
