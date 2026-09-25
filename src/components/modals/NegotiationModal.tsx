import React, { useState } from 'react';
import { QuotaItem } from '../../types';

interface NegotiationModalProps {
  quota: QuotaItem;
  onClose: () => void;
  onOpenAdvisorChat: (initialMsg: string) => void;
}

export const NegotiationModal: React.FC<NegotiationModalProps> = ({
  quota,
  onClose,
  onOpenAdvisorChat,
}) => {
  const [months, setMonths] = useState<number>(6);
  const [discountPercent, setDiscountPercent] = useState<number>(50);
  const [agreed, setAgreed] = useState(false);

  // Original debt calculation
  const totalAmount = quota.amount * 4; // Simulated remaining balance
  const estimatedNewQuota = Math.round((totalAmount * (1 - discountPercent * 0.003)) / months);

  const handleApply = () => {
    setAgreed(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm p-5 shadow-2xl border border-[#eaedff] animate-in fade-in zoom-in duration-200">
        {!agreed ? (
          <>
            <div className="flex items-center justify-between pb-3 border-b border-[#eaedff]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#fef3c7] text-[#b45309] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">handshake</span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-[16px] font-bold text-[#131b2e]">
                    Simulador de Negociación
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

            <div className="py-3 flex flex-col gap-3">
              <div className="bg-[#f2f3ff] rounded-xl p-3 border border-[#eaedff]">
                <span className="text-[11px] text-[#747686] block">Cuota original en mora:</span>
                <div className="flex items-baseline justify-between mt-0.5">
                  <span className="text-[20px] font-bold text-[#ba1a1a]">S/ {quota.amount}</span>
                  <span className="text-[11px] text-[#434655]">
                    {quota.daysLate ? `${quota.daysLate} días de atraso` : 'Por vencer'}
                  </span>
                </div>
              </div>

              {/* Discount slider */}
              <div>
                <div className="flex justify-between text-[12px] mb-1">
                  <span className="text-[#434655]">Condonación de intereses moratorios:</span>
                  <span className="font-bold text-[#0037b0]">{discountPercent}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="10"
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(Number(e.target.value))}
                  className="w-full accent-[#0037b0] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#747686]">
                  <span>0%</span>
                  <span>50% (Recomendado)</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Term slider */}
              <div>
                <div className="flex justify-between text-[12px] mb-1">
                  <span className="text-[#434655]">Plazo de reprogramación:</span>
                  <span className="font-bold text-[#0037b0]">{months} meses</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="24"
                  step="3"
                  value={months}
                  onChange={(e) => setMonths(Number(e.target.value))}
                  className="w-full accent-[#0037b0] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#747686]">
                  <span>3m</span>
                  <span>6m</span>
                  <span>12m</span>
                  <span>24m</span>
                </div>
              </div>

              {/* Computed New Quota */}
              <div className="bg-[#dcfce7]/60 rounded-xl p-3 border border-[#dcfce7] flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-[#15803d] font-medium block">
                    Nueva cuota estimada:
                  </span>
                  <span className="text-[20px] font-extrabold text-[#15803d]">
                    S/ {estimatedNewQuota} <span className="text-[12px] font-normal">/ mes</span>
                  </span>
                </div>
                <span className="material-symbols-outlined text-[#16a34a] text-[24px]">
                  trending_down
                </span>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                type="button"
                onClick={handleApply}
                className="w-full py-2.5 rounded-xl bg-[#0037b0] text-white font-label-md text-[13px] font-semibold hover:bg-[#002f99] active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span className="material-symbols-outlined text-[18px]">send</span>
                <span>Generar propuesta formal</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenAdvisorChat(
                    `Quiero negociar con ${quota.entity} una reprogramación a ${months} meses y descuento de mora del ${discountPercent}%`
                  );
                }}
                className="w-full py-2 rounded-xl bg-[#e2e7ff] text-[#0037b0] font-label-sm text-[12px] font-semibold cursor-pointer"
              >
                Revisar con un asesor legal
              </button>
            </div>
          </>
        ) : (
          /* Agreement generated screen */
          <div className="py-3 flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full bg-[#dcfce7] text-[#15803d] flex items-center justify-center mb-2.5">
              <span className="material-symbols-outlined text-[32px]">task_alt</span>
            </div>
            <h3 className="font-headline-sm text-[17px] font-bold text-[#131b2e]">
              Propuesta de Reprogramación Lista
            </h3>
            <p className="font-body-sm text-[12px] text-[#434655] mt-1">
              Hemos preparado una carta formal con la propuesta para {quota.entity}:
            </p>

            <div className="w-full bg-[#f2f3ff] rounded-xl p-3 my-3 text-left text-[12px] border border-[#eaedff]">
              <p className="text-[#131b2e] font-semibold mb-1">Resumen del acuerdo solicitado:</p>
              <ul className="list-disc pl-4 text-[#434655] space-y-1">
                <li>Descuento del {discountPercent}% en moras y cargos.</li>
                <li>Plazo extendido a {months} cuotas mensuales de aprox S/ {estimatedNewQuota}.</li>
                <li>Solicitud de congelamiento temporal de reportes a Infocorp / SBS.</li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenAdvisorChat(
                  `Tengo lista la propuesta para ${quota.entity} con cuota de S/ ${estimatedNewQuota}. ¿Cómo la presento?`
                );
              }}
              className="w-full py-2.5 rounded-xl bg-[#0037b0] text-white font-label-md text-[13px] font-semibold hover:bg-[#002f99] transition-all cursor-pointer mb-2"
            >
              Contactar asesor para enviar
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full py-1.5 text-[#747686] text-[12px]"
            >
              Cerrar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
