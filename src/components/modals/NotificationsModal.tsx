import React from 'react';
import { NotificationItem } from '../../types';

interface NotificationsModalProps {
  notifications: NotificationItem[];
  onClose: () => void;
  onMarkAllAsRead: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  notifications,
  onClose,
  onMarkAllAsRead,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm p-5 shadow-2xl border border-[#eaedff] animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-[#eaedff]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#0037b0]">notifications</span>
            <h3 className="font-headline-sm text-[16px] font-bold text-[#131b2e]">
              Avisos y Notificaciones
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#747686] hover:text-[#131b2e] p-1 rounded-full cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="py-3 flex flex-col gap-2.5 max-h-80 overflow-y-auto">
          {notifications.map((n) => {
            const getIcon = () => {
              if (n.type === 'alert') return 'warning';
              if (n.type === 'success') return 'check_circle';
              return 'info';
            };
            const getIconClass = () => {
              if (n.type === 'alert') return 'text-[#ba1a1a] bg-[#ffdad6]';
              if (n.type === 'success') return 'text-[#15803d] bg-[#dcfce7]';
              return 'text-[#0037b0] bg-[#e2e7ff]';
            };

            return (
              <div
                key={n.id}
                className={`p-3 rounded-xl border flex items-start gap-3 transition-colors ${
                  !n.read ? 'bg-[#f2f3ff] border-[#b7c4ff]' : 'bg-white border-[#eaedff]'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${getIconClass()}`}
                >
                  <span className="material-symbols-outlined text-[18px]">{getIcon()}</span>
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-label-md text-[13px] font-bold text-[#131b2e] truncate">
                      {n.title}
                    </span>
                    <span className="text-[10px] text-[#747686]">{n.time}</span>
                  </div>
                  <p className="font-body-sm text-[12px] text-[#434655] mt-0.5 leading-snug">
                    {n.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-2 flex flex-col gap-2 border-t border-[#eaedff]">
          <button
            type="button"
            onClick={onMarkAllAsRead}
            className="w-full py-2 rounded-xl bg-[#e2e7ff] text-[#0037b0] font-label-sm text-[12px] font-semibold hover:bg-[#dce1ff] transition-colors cursor-pointer"
          >
            Marcar todas como leídas
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full py-1.5 text-[#747686] text-[12px]"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
