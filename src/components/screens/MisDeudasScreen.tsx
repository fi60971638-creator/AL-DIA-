import React from 'react';
import { DebtItem } from '../../types';

interface MisDeudasScreenProps {
  debts: DebtItem[];
  onOpenAddDebt: () => void;
  onSelectDebt: (debt: DebtItem) => void;
  onEditDebt: (debt: DebtItem) => void;
  onDeleteDebt: (debtId: string) => void;
  onOpenAdvisorChat?: (initialMsg?: string) => void;
  onLoadDemoData?: () => void;
  onClearAllDebts?: () => void;
}

export const MisDeudasScreen: React.FC<MisDeudasScreenProps> = ({
  debts,
  onOpenAddDebt,
  onSelectDebt,
  onLoadDemoData,
  onClearAllDebts,
}) => {
  const totalBalance = debts.reduce((sum, d) => sum + d.balance, 0);

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto px-4 sm:px-6 py-5 gap-6 pb-24 md:pb-12">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[24px] sm:text-[26px] font-bold text-[#0F3D56] tracking-tight">
            Mis deudas
          </h1>
          <p className="text-[13px] text-[#6B7280]">
            Total pendiente: S/ {totalBalance.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenAddDebt}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#0F3D56] hover:bg-[#0c2f42] text-white text-[14px] font-medium transition-colors cursor-pointer shrink-0"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          <span>Agregar deuda</span>
        </button>
      </div>

      {/* Clean List of Debts */}
      {debts.length === 0 ? (
        <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl p-8 text-center flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#F7F8FA] border border-[#E5E7EB] flex items-center justify-center text-[#6B7280]">
            <span className="material-symbols-outlined text-[24px]">account_balance_wallet</span>
          </div>
          <div className="flex flex-col gap-1 max-w-xs">
            <h3 className="text-[16px] font-bold text-[#25313C]">
              No tienes deudas registradas
            </h3>
            <p className="text-[13px] text-[#6B7280]">
              Empieza registrando tu primera deuda o carga datos de ejemplo para probar.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 w-full max-w-xs">
            <button
              type="button"
              onClick={onOpenAddDebt}
              className="flex-1 py-2 px-4 rounded-lg bg-[#0F3D56] text-white text-[14px] font-medium transition-colors cursor-pointer"
            >
              + Agregar deuda
            </button>
            {onLoadDemoData && (
              <button
                type="button"
                onClick={onLoadDemoData}
                className="flex-1 py-2 px-4 rounded-lg bg-[#FFFFFF] border border-[#E5E7EB] text-[#25313C] text-[13px] hover:bg-[#F7F8FA] transition-colors cursor-pointer"
              >
                Cargar ejemplo
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {debts.map((debt) => {
            const isOverdue = debt.status === 'atrasado';
            const isUpcoming = debt.status === 'proximo';

            return (
              <div
                key={debt.id}
                className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl p-5 flex flex-col gap-4"
              >
                {/* Header: Entity & Type */}
                <div className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <h3 className="text-[17px] font-bold text-[#25313C]">
                      {debt.entity}
                    </h3>
                    <span className="text-[13px] text-[#6B7280]">
                      {debt.type}
                    </span>
                  </div>

                  {/* Status Indicator */}
                  <span
                    className={`text-[12px] font-medium px-2 py-0.5 rounded ${
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

                {/* Amounts & Due Date */}
                <div className="grid grid-cols-2 gap-3 py-2 border-y border-[#E5E7EB] text-[13px]">
                  <div>
                    <span className="text-[#6B7280] block text-[12px]">Saldo pendiente</span>
                    <span className="text-[18px] font-bold text-[#25313C]">
                      S/ {debt.balance.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#6B7280] block text-[12px]">Próxima cuota</span>
                    <span className="text-[15px] font-semibold text-[#25313C]">
                      S/ {debt.monthlyQuota.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
                    </span>
                    <span className="text-[12px] text-[#6B7280] block">
                      {debt.dueDate}
                    </span>
                  </div>
                </div>

                {/* Single Primary Action */}
                <div>
                  <button
                    type="button"
                    onClick={() => onSelectDebt(debt)}
                    className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 rounded-lg bg-[#FFFFFF] border border-[#E5E7EB] hover:bg-[#F7F8FA] text-[#0F3D56] text-[14px] font-semibold transition-colors cursor-pointer"
                  >
                    Ver detalle
                  </button>
                </div>
              </div>
            );
          })}

          {onClearAllDebts && (
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={onClearAllDebts}
                className="text-[12px] text-[#6B7280] hover:text-[#D64545] underline cursor-pointer"
              >
                Limpiar todas las deudas (Empezar de cero)
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
