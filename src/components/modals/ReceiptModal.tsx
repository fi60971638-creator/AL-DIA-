import React from 'react';
import { QuotaItem } from '../../types';
import { APP_LOGO_URL } from '../../data/initialData';

interface ReceiptModalProps {
  quota: QuotaItem;
  onClose: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({ quota, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm p-5 shadow-2xl border border-[#eaedff] animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-[#eaedff]">
          <div className="flex items-center gap-2">
            <img src={APP_LOGO_URL} alt="Logo" className="w-6 h-6 object-contain" />
            <h3 className="font-headline-sm text-[16px] font-bold text-[#131b2e]">
              Constancia de Pago
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#747686] hover:text-[#131b2e] p-1 rounded-full cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="py-4 flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-[#dcfce7] text-[#15803d] flex items-center justify-center mb-2">
            <span
              className="material-symbols-outlined text-[28px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              check_circle
            </span>
          </div>
          <span className="font-label-md text-[13px] text-[#15803d] font-bold uppercase tracking-wider">
            Pago Procesado Con Éxito
          </span>
          <span className="font-amount-card text-[26px] font-extrabold text-[#131b2e] mt-1">
            S/ {quota.amount.toFixed(2)}
          </span>

          <div className="w-full bg-[#faf8ff] rounded-xl p-3.5 my-3 border border-[#eaedff] text-[12px] flex flex-col gap-2">
            <div className="flex justify-between">
              <span className="text-[#434655]">Operación N°:</span>
              <span className="font-mono font-bold text-[#0037b0]">
                {quota.operationNumber || '849204'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#434655]">Entidad:</span>
              <span className="font-semibold text-[#131b2e]">{quota.entity}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#434655]">Concepto:</span>
              <span className="text-[#131b2e]">{quota.quotaNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#434655]">Fecha de abono:</span>
              <span className="text-[#131b2e]">{quota.dueDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#434655]">Canal:</span>
              <span className="text-[#131b2e]">Cobranza Fácil Directo (Enlace Seguro)</span>
            </div>
          </div>

          <div className="w-full flex items-center justify-center gap-1 text-[11px] text-[#747686] mb-3">
            <span className="material-symbols-outlined text-[15px] text-[#15803d]">verified</span>
            <span>Documento con validez de amortización bancaria</span>
          </div>

          <div className="w-full flex gap-2">
            <button
              type="button"
              onClick={() => {
                alert('Descarga de constancia en PDF simulada con éxito.');
              }}
              className="flex-1 py-2.5 rounded-xl bg-[#0037b0] text-white text-[13px] font-semibold hover:bg-[#002f99] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[17px]">download</span>
              <span>Descargar PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-[#eaedff] text-[#434655] text-[13px] font-semibold hover:bg-[#e2e7ff] transition-all cursor-pointer"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
