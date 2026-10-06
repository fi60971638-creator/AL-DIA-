import React, { useState } from 'react';
import { QuotaItem } from '../../types';

interface PaymentModalProps {
  quota: QuotaItem;
  onClose: () => void;
  onPaymentSuccess: (quotaId: string, operationNumber: string) => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  quota,
  onClose,
  onPaymentSuccess,
}) => {
  const [amount, setAmount] = useState<number>(quota.amount || 200);
  const [date, setDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [method, setMethod] = useState<'Transferencia' | 'Yape / Plin' | 'Débito automático' | 'Efectivo'>('Transferencia');
  const [operationNumber, setOperationNumber] = useState<string>('OP-' + Math.floor(100000 + Math.random() * 900000));
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    onPaymentSuccess(quota.id, operationNumber);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-[#FFFFFF] rounded-xl w-full max-w-md p-6 border border-[#E5E7EB] shadow-lg flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
          <h2 className="text-[18px] font-bold text-[#0F3D56]">
            Registrar pago
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#6B7280] hover:text-[#25313C] hover:bg-[#F7F8FA] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {isSuccess ? (
          <div className="py-6 text-center flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-[#149B8A] flex items-center justify-center">
              <span className="material-symbols-outlined text-[28px]">check_circle</span>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-[17px] font-bold text-[#25313C]">
                Pago registrado correctamente
              </h3>
              <p className="text-[13px] text-[#6B7280]">
                {quota.entity} • S/ {amount.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
              </p>
              <span className="text-[12px] text-[#6B7280] font-mono mt-1">
                Comprobante: {operationNumber}
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="mt-3 w-full py-2.5 rounded-lg bg-[#0F3D56] text-white text-[14px] font-medium transition-colors cursor-pointer"
            >
              Listo
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
            {/* Info Box */}
            <div className="bg-[#F7F8FA] p-3 rounded-lg border border-[#E5E7EB] flex items-center justify-between text-[13px]">
              <div>
                <span className="text-[#6B7280] block text-[11px]">Deuda</span>
                <span className="font-bold text-[#25313C]">{quota.entity}</span>
              </div>
              <div className="text-right">
                <span className="text-[#6B7280] block text-[11px]">Cuota sugerida</span>
                <span className="font-bold text-[#0F3D56]">
                  S/ {quota.amount.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            <div>
              <label className="text-[13px] font-medium text-[#25313C] block mb-1">
                Monto pagado (S/)
              </label>
              <input
                type="number"
                step="0.01"
                min="1"
                required
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 rounded-lg border border-[#E5E7EB] text-[15px] font-bold text-[#25313C] outline-none focus:border-[#0F3D56]"
              />
            </div>

            <div>
              <label className="text-[13px] font-medium text-[#25313C] block mb-1">
                Fecha de pago
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#E5E7EB] text-[14px] text-[#25313C] outline-none focus:border-[#0F3D56]"
              />
            </div>

            <div>
              <label className="text-[13px] font-medium text-[#25313C] block mb-1">
                Método de pago
              </label>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value as any)}
                className="w-full px-3 py-2 rounded-lg border border-[#E5E7EB] text-[14px] text-[#25313C] bg-white outline-none focus:border-[#0F3D56] cursor-pointer"
              >
                <option value="Transferencia">Transferencia bancaria</option>
                <option value="Yape / Plin">Yape / Plin</option>
                <option value="Débito automático">Débito automático</option>
                <option value="Efectivo">Pago en agente / ventanilla</option>
              </select>
            </div>

            <div>
              <label className="text-[13px] font-medium text-[#25313C] block mb-1">
                N° de Operación (Opcional)
              </label>
              <input
                type="text"
                placeholder="ej. OP-123456"
                value={operationNumber}
                onChange={(e) => setOperationNumber(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#E5E7EB] text-[13px] font-mono text-[#25313C] outline-none focus:border-[#0F3D56]"
              />
            </div>

            <div className="pt-2 flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 rounded-lg bg-[#FFFFFF] border border-[#E5E7EB] hover:bg-[#F7F8FA] text-[#25313C] text-[14px] font-medium transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-lg bg-[#149B8A] hover:bg-[#107d6f] text-white text-[14px] font-semibold transition-colors cursor-pointer"
              >
                Registrar pago
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
