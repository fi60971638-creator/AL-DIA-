import React, { useState } from 'react';
import { DebtItem } from '../../types';

interface DebtDetailModalProps {
  debt: DebtItem;
  onClose: () => void;
  onRegisterPayment: (debt: DebtItem) => void;
  onEditDebt: (debt: DebtItem) => void;
  onDeleteDebt: (debtId: string) => void;
  onOpenAdvisory: (topicOrQuery: string) => void;
}

export const DebtDetailModal: React.FC<DebtDetailModalProps> = ({
  debt,
  onClose,
  onRegisterPayment,
  onEditDebt,
  onDeleteDebt,
  onOpenAdvisory,
}) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  // Calculate percentage paid
  const totalAmount = debt.initialAmount || debt.balance + (debt.paidAmount || 0);
  const paid = debt.paidAmount || (totalAmount - debt.balance > 0 ? totalAmount - debt.balance : 0);
  const percentPaid = totalAmount > 0 ? Math.min(100, Math.max(0, Math.round((paid / totalAmount) * 100))) : 0;

  const getStatusBadge = () => {
    switch (debt.status) {
      case 'al_dia':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-label-sm text-[12px] font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            🟢 Al día
          </span>
        );
      case 'proximo':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 font-label-sm text-[12px] font-bold">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            🟡 Próximo
          </span>
        );
      case 'atrasado':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 font-label-sm text-[12px] font-bold">
            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
            🔴 Atrasado
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-md p-5 sm:p-6 shadow-2xl border border-[#eaedff] my-auto animate-in fade-in zoom-in-95 duration-200 flex flex-col gap-4">
        {/* Top bar */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#0037b0]/10 text-[#0037b0] flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[26px]">{debt.iconName || 'account_balance'}</span>
            </div>
            <div>
              <span className="font-label-sm text-[11px] font-bold uppercase tracking-wider text-[#0037b0]">
                {debt.entityType || 'Entidad'}
              </span>
              <h3 className="font-headline-sm text-[19px] font-bold text-[#131b2e] leading-tight">
                {debt.entity}
              </h3>
              <p className="font-body-sm text-[12px] text-[#434655]">{debt.type}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#747686] hover:text-[#131b2e] hover:bg-[#eaedff]/60"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Status Badge */}
        <div className="flex items-center justify-between bg-[#faf8ff] p-3 rounded-2xl border border-[#eaedff]">
          <span className="font-label-sm text-[12px] font-semibold text-[#434655]">Estado de la obligación:</span>
          {getStatusBadge()}
        </div>

        {/* Progress Bar Section: Progreso de pago */}
        <div className="rounded-2xl bg-gradient-to-br from-[#f2f5ff] to-[#f8faff] p-4 border border-[#eaedff] flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-[13px] font-bold text-[#131b2e] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#0037b0] text-[18px]">timelapse</span>
              Progreso de pago
            </span>
            <span className="font-label-sm text-[13px] font-bold text-[#0037b0]">
              {percentPaid}% cancelado
            </span>
          </div>

          <div className="w-full h-3 rounded-full bg-white border border-[#eaedff] overflow-hidden p-0.5">
            <div
              className="h-full rounded-full bg-[#0037b0] transition-all duration-500"
              style={{ width: `${percentPaid}%` }}
            ></div>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-1 text-center">
            <div className="bg-white p-2 rounded-xl border border-[#eaedff]">
              <span className="font-body-sm text-[10px] text-[#747686] block">Monto inicial</span>
              <span className="font-label-md text-[12px] font-bold text-[#131b2e]">
                S/ {totalAmount.toLocaleString()}
              </span>
            </div>

            <div className="bg-emerald-50/70 p-2 rounded-xl border border-emerald-100">
              <span className="font-body-sm text-[10px] text-emerald-800 block">Monto pagado</span>
              <span className="font-label-md text-[12px] font-bold text-emerald-700">
                S/ {paid.toLocaleString()}
              </span>
            </div>

            <div className="bg-blue-50/70 p-2 rounded-xl border border-blue-100">
              <span className="font-body-sm text-[10px] text-[#0037b0] block">Monto pendiente</span>
              <span className="font-label-md text-[12px] font-bold text-[#0037b0]">
                S/ {debt.balance.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Main Details Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="p-3 rounded-2xl bg-white border border-[#eaedff]">
            <span className="font-body-sm text-[11px] text-[#747686] block">Cuota mensual</span>
            <span className="font-headline-sm text-[17px] font-extrabold text-[#131b2e]">
              S/ {debt.monthlyQuota.toLocaleString()}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-white border border-[#eaedff]">
            <span className="font-body-sm text-[11px] text-[#747686] block">Fecha de vencimiento</span>
            <span className="font-headline-sm text-[14px] font-bold text-[#131b2e] leading-snug">
              {debt.dueDate}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-white border border-[#eaedff]">
            <span className="font-body-sm text-[11px] text-[#747686] block">Cuotas pendientes</span>
            <span className="font-headline-sm text-[15px] font-bold text-[#131b2e]">
              {debt.pendingQuotas || '—'} de {debt.totalQuotas || '—'}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-white border border-[#eaedff]">
            <span className="font-body-sm text-[11px] text-[#747686] block">Tasa de interés TEA</span>
            <span className="font-headline-sm text-[15px] font-bold text-[#131b2e]">
              {debt.interestRate ? `${debt.interestRate}%` : 'No informada'}
            </span>
          </div>
        </div>

        {/* Delete confirmation dialog if active */}
        {showConfirmDelete ? (
          <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 flex flex-col gap-2.5 animate-in fade-in">
            <div className="flex items-center gap-2 text-red-800">
              <span className="material-symbols-outlined text-red-600">warning</span>
              <span className="font-label-md text-[13px] font-bold">
                ¿Seguro que deseas eliminar este registro?
              </span>
            </div>
            <p className="font-body-sm text-[12px] text-red-700">
              Esta acción retirará la deuda de <strong>{debt.entity}</strong> de tu balance y cronograma.
            </p>
            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  onDeleteDebt(debt.id);
                  onClose();
                }}
                className="flex-1 py-2 rounded-xl bg-red-600 text-white font-label-sm text-[12px] font-bold hover:bg-red-700 active:scale-95 transition-all"
              >
                Sí, eliminar
              </button>
              <button
                type="button"
                onClick={() => setShowConfirmDelete(false)}
                className="flex-1 py-2 rounded-xl bg-white text-[#434655] font-label-sm text-[12px] font-semibold border border-red-200"
              >
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          /* Action Buttons specified in brief: [Registrar pago], [Editar deuda], [Eliminar deuda], [Ver orientación] */
          <div className="flex flex-col gap-2 pt-1">
            <button
              type="button"
              onClick={() => {
                onRegisterPayment(debt);
                onClose();
              }}
              className="w-full py-3 rounded-2xl bg-[#0037b0] text-white font-label-lg text-[14px] font-bold hover:bg-[#002f99] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
              <span>Registrar pago</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  onEditDebt(debt);
                  onClose();
                }}
                className="py-2.5 rounded-xl bg-[#faf8ff] hover:bg-[#eaedff] text-[#131b2e] font-label-md text-[13px] font-semibold border border-[#eaedff] flex items-center justify-center gap-1.5 transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">edit</span>
                <span>Editar deuda</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onOpenAdvisory(`Consejos y orientación para gestionar mi deuda con ${debt.entity}`);
                  onClose();
                }}
                className="py-2.5 rounded-xl bg-blue-50/70 hover:bg-blue-100 text-[#0037b0] font-label-md text-[13px] font-bold border border-blue-200 flex items-center justify-center gap-1.5 transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">lightbulb</span>
                <span>Ver orientación</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => setShowConfirmDelete(true)}
              className="py-2 rounded-xl text-rose-600 hover:bg-rose-50 text-[12px] font-semibold flex items-center justify-center gap-1 transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">delete</span>
              <span>Eliminar deuda</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
