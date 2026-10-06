import React, { useState } from 'react';
import { DebtItem } from '../../types';

interface DebtDetailModalProps {
  debt: DebtItem;
  onClose: () => void;
  onRegisterPayment: (debt: DebtItem) => void;
  onEditDebt: (debt: DebtItem) => void;
  onDeleteDebt: (debtId: string) => void;
  onOpenAdvisory?: (query: string) => void;
}

export const DebtDetailModal: React.FC<DebtDetailModalProps> = ({
  debt,
  onClose,
  onRegisterPayment,
  onEditDebt,
  onDeleteDebt,
}) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const isOverdue = debt.status === 'atrasado';
  const isUpcoming = debt.status === 'proximo';

  const handleDelete = () => {
    onDeleteDebt(debt.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#FFFFFF] rounded-xl w-full max-w-md p-6 border border-[#E5E7EB] shadow-lg my-auto flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-[#E5E7EB]">
          <div className="flex flex-col">
            <h2 className="text-[20px] font-bold text-[#0F3D56]">
              {debt.entity}
            </h2>
            <span className="text-[13px] text-[#6B7280]">
              {debt.type}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#6B7280] hover:text-[#25313C] hover:bg-[#F7F8FA] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Status Tag */}
        <div className="flex items-center justify-between">
          <span className="text-[13px] text-[#6B7280]">Estado actual:</span>
          <span
            className={`text-[12px] font-medium px-2.5 py-0.5 rounded ${
              isOverdue
                ? 'bg-rose-50 text-[#D64545]'
                : isUpcoming
                ? 'bg-amber-50 text-[#D99A24]'
                : 'bg-emerald-50 text-[#149B8A]'
            }`}
          >
            {isOverdue
              ? 'Vencido'
              : isUpcoming
              ? 'Próximo a vencer'
              : 'Al día'}
          </span>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-3 p-4 rounded-lg bg-[#F7F8FA] border border-[#E5E7EB]">
          <div>
            <span className="text-[12px] text-[#6B7280] block">Saldo pendiente</span>
            <span className="text-[20px] font-bold text-[#25313C]">
              S/ {debt.balance.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
            </span>
          </div>

          <div>
            <span className="text-[12px] text-[#6B7280] block">Cuota mensual</span>
            <span className="text-[18px] font-semibold text-[#25313C]">
              S/ {debt.monthlyQuota.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
            </span>
          </div>

          <div>
            <span className="text-[12px] text-[#6B7280] block">Próximo vencimiento</span>
            <span className="text-[13px] font-medium text-[#25313C]">
              {debt.dueDate}
            </span>
          </div>

          <div>
            <span className="text-[12px] text-[#6B7280] block">Cuotas pendientes</span>
            <span className="text-[13px] font-medium text-[#25313C]">
              {debt.pendingQuotas || 0} de {debt.totalQuotas || 12}
            </span>
          </div>
        </div>

        {/* Payment History Simple List */}
        <div className="flex flex-col gap-2">
          <h4 className="text-[14px] font-bold text-[#0F3D56]">
            Historial de pagos
          </h4>
          <div className="border border-[#E5E7EB] rounded-lg divide-y divide-[#E5E7EB] text-[13px]">
            <div className="p-2.5 flex items-center justify-between">
              <div>
                <span className="font-medium text-[#25313C] block">Abono de cuota</span>
                <span className="text-[11px] text-[#6B7280]">10/09/2026 • Transferencia</span>
              </div>
              <span className="font-semibold text-[#2563EB]">
                - S/ {debt.monthlyQuota.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
              </span>
            </div>

            {debt.paidAmount > debt.monthlyQuota && (
              <div className="p-2.5 flex items-center justify-between">
                <div>
                  <span className="font-medium text-[#25313C] block">Abono previo</span>
                  <span className="text-[11px] text-[#6B7280]">10/08/2026 • Débito</span>
                </div>
                <span className="font-semibold text-[#2563EB]">
                  - S/ {debt.monthlyQuota.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Delete Confirmation Box */}
        {showConfirmDelete ? (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg flex flex-col gap-2">
            <span className="text-[13px] font-medium text-[#D64545]">
              ¿Estás seguro de eliminar esta deuda de AlDía?
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowConfirmDelete(false)}
                className="flex-1 py-1.5 rounded-lg border border-[#E5E7EB] bg-white text-[13px] font-medium text-[#25313C]"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="flex-1 py-1.5 rounded-lg bg-[#D64545] text-white text-[13px] font-medium"
              >
                Sí, eliminar
              </button>
            </div>
          </div>
        ) : null}

        {/* Action Buttons: Registrar Pago (Primary in #149B8A) + Editar + Eliminar */}
        {!showConfirmDelete && (
          <div className="flex flex-col gap-2 pt-1 border-t border-[#E5E7EB]">
            <button
              type="button"
              onClick={() => {
                onClose();
                onRegisterPayment(debt);
              }}
              className="w-full py-2.5 rounded-lg bg-[#149B8A] hover:bg-[#107d6f] text-white text-[14px] font-semibold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
              <span>Registrar pago</span>
            </button>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onEditDebt(debt);
                }}
                className="flex-1 py-2 rounded-lg bg-[#FFFFFF] border border-[#E5E7EB] hover:bg-[#F7F8FA] text-[#25313C] text-[13px] font-medium transition-colors cursor-pointer"
              >
                Editar
              </button>

              <button
                type="button"
                onClick={() => setShowConfirmDelete(true)}
                className="py-2 px-3 rounded-lg border border-[#E5E7EB] hover:bg-rose-50 text-[#6B7280] hover:text-[#D64545] text-[13px] font-medium transition-colors cursor-pointer"
              >
                Eliminar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
