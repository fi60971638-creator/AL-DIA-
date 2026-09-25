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
  const [paymentMethod, setPaymentMethod] = useState<'yape' | 'plin' | 'transfer' | 'card'>('yape');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [operationCode, setOperationCode] = useState('');

  const handlePay = () => {
    setIsProcessing(true);
    const randomOp = Math.floor(100000 + Math.random() * 900000).toString();
    setOperationCode(randomOp);

    setTimeout(() => {
      setIsProcessing(false);
      setIsCompleted(true);
      onPaymentSuccess(quota.id, randomOp);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm p-5 shadow-2xl border border-[#eaedff] animate-in fade-in zoom-in duration-200">
        {!isCompleted ? (
          <>
            <div className="flex items-center justify-between pb-3 border-b border-[#eaedff]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#e2e7ff] text-[#0037b0] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">payments</span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-[16px] font-bold text-[#131b2e]">
                    Pagar cuota
                  </h3>
                  <span className="font-body-sm text-[11px] text-[#434655]">
                    {quota.entity} • {quota.quotaNumber}
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-[#747686] hover:text-[#131b2e] p-1 rounded-full cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="py-3">
              <div className="bg-[#f2f3ff] rounded-xl p-3.5 flex items-center justify-between border border-[#eaedff] mb-4">
                <span className="font-body-sm text-[12px] text-[#434655]">Total a abonar:</span>
                <span className="font-amount-card text-[24px] font-extrabold text-[#0037b0]">
                  S/ {quota.amount.toFixed(2)}
                </span>
              </div>

              <span className="font-label-sm text-[12px] font-semibold text-[#131b2e] block mb-2">
                Selecciona medio de pago:
              </span>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('yape')}
                  className={`p-2.5 rounded-xl border flex items-center gap-2 text-left transition-all cursor-pointer ${
                    paymentMethod === 'yape'
                      ? 'border-[#0037b0] bg-[#e2e7ff]/40 text-[#0037b0] font-semibold ring-1 ring-[#0037b0]'
                      : 'border-[#eaedff] bg-white text-[#434655]'
                  }`}
                >
                  <div className="w-6 h-6 rounded-full bg-[#742284] text-white flex items-center justify-center font-bold text-[10px]">
                    Y
                  </div>
                  <span className="text-[12px]">Yape</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('plin')}
                  className={`p-2.5 rounded-xl border flex items-center gap-2 text-left transition-all cursor-pointer ${
                    paymentMethod === 'plin'
                      ? 'border-[#0037b0] bg-[#e2e7ff]/40 text-[#0037b0] font-semibold ring-1 ring-[#0037b0]'
                      : 'border-[#eaedff] bg-white text-[#434655]'
                  }`}
                >
                  <div className="w-6 h-6 rounded-full bg-[#009ee3] text-white flex items-center justify-center font-bold text-[10px]">
                    P
                  </div>
                  <span className="text-[12px]">Plin</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('transfer')}
                  className={`p-2.5 rounded-xl border flex items-center gap-2 text-left transition-all cursor-pointer ${
                    paymentMethod === 'transfer'
                      ? 'border-[#0037b0] bg-[#e2e7ff]/40 text-[#0037b0] font-semibold ring-1 ring-[#0037b0]'
                      : 'border-[#eaedff] bg-white text-[#434655]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px] text-[#0037b0]">
                    account_balance
                  </span>
                  <span className="text-[12px]">Transferencia</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-2.5 rounded-xl border flex items-center gap-2 text-left transition-all cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'border-[#0037b0] bg-[#e2e7ff]/40 text-[#0037b0] font-semibold ring-1 ring-[#0037b0]'
                      : 'border-[#eaedff] bg-white text-[#434655]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px] text-[#0037b0]">
                    credit_card
                  </span>
                  <span className="text-[12px]">Tarjeta Débito</span>
                </button>
              </div>

              <div className="mt-3.5 p-2.5 bg-[#f8f9fa] rounded-xl text-[11px] text-[#434655] flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-[#15803d]">
                  lock
                </span>
                <span>Canal seguro cifrado con verificación inmediata.</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                type="button"
                disabled={isProcessing}
                onClick={handlePay}
                className="w-full py-3 rounded-xl bg-[#0037b0] text-white font-label-lg text-[14px] font-semibold hover:bg-[#002f99] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer disabled:opacity-75"
              >
                {isProcessing ? (
                  <>
                    <span className="material-symbols-outlined text-[18px] animate-spin">
                      progress_activity
                    </span>
                    <span>Procesando abono...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[18px]">check</span>
                    <span>Confirmar pago de S/ {quota.amount}</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full py-2 rounded-xl text-[#747686] hover:text-[#131b2e] font-label-sm text-[12px] cursor-pointer"
              >
                Cancelar
              </button>
            </div>
          </>
        ) : (
          /* Success Screen */
          <div className="py-4 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#dcfce7] text-[#15803d] flex items-center justify-center mb-3">
              <span
                className="material-symbols-outlined text-[36px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
            </div>
            <h3 className="font-headline-sm text-[18px] font-bold text-[#131b2e]">
              ¡Abono realizado con éxito!
            </h3>
            <p className="font-body-sm text-[12px] text-[#434655] mt-1 max-w-xs">
              Tu cuota ha sido registrada como pagada en el cronograma financiero.
            </p>

            <div className="w-full bg-[#f2f3ff] rounded-xl p-3 my-3 text-left text-[12px] border border-[#eaedff]">
              <div className="flex justify-between py-1 border-b border-[#eaedff]/60">
                <span className="text-[#434655]">Operación N°:</span>
                <span className="font-bold text-[#0037b0]">{operationCode}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#eaedff]/60">
                <span className="text-[#434655]">Entidad:</span>
                <span className="font-semibold text-[#131b2e]">{quota.entity}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#434655]">Monto abonado:</span>
                <span className="font-bold text-[#15803d]">S/ {quota.amount.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-[#0037b0] text-white font-label-md text-[13px] font-semibold hover:bg-[#002f99] transition-all cursor-pointer"
            >
              Aceptar y ver cronograma
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
