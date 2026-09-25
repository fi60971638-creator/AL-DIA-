import React, { useState } from 'react';
import { DebtItem } from '../../types';

interface MisDeudasScreenProps {
  debts: DebtItem[];
  onOpenAddDebt: () => void;
  onSelectDebt: (debt: DebtItem) => void;
  onEditDebt: (debt: DebtItem) => void;
  onDeleteDebt: (debtId: string) => void;
  onOpenAdvisorChat: (initialMsg?: string) => void;
}

export const MisDeudasScreen: React.FC<MisDeudasScreenProps> = ({
  debts,
  onOpenAddDebt,
  onSelectDebt,
  onEditDebt,
  onDeleteDebt,
  onOpenAdvisorChat,
}) => {
  const [filter, setFilter] = useState<'all' | 'al_dia' | 'proximo' | 'atrasado'>('all');
  const [debtToDelete, setDebtToDelete] = useState<DebtItem | null>(null);

  const totalBalance = debts.reduce((sum, d) => sum + d.balance, 0);
  const totalMonthlyQuota = debts.reduce((sum, d) => sum + d.monthlyQuota, 0);

  const filteredDebts = debts.filter((d) => {
    if (filter === 'all') return true;
    return d.status === filter;
  });

  return (
    <div className="flex flex-col w-full px-4 py-3 gap-4 max-w-lg mx-auto pb-28">
      {/* Header with Total Pendiente */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-headline-lg text-[24px] font-bold text-[#131b2e] tracking-tight">
              Mis Deudas
            </h1>
            <p className="font-body-sm text-[12px] text-[#434655]">
              Control y detalle de todas tus obligaciones financieras
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenAddDebt}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-[#0037b0] text-white font-label-md text-[13px] font-bold hover:bg-[#002f99] active:scale-95 transition-all shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            <span>+ Registrar deuda</span>
          </button>
        </div>

        {/* Total Pendiente Summary Card */}
        <div className="rounded-3xl bg-gradient-to-br from-[#0037b0] to-[#002884] text-white p-5 shadow-md flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[12px] text-blue-200 uppercase font-bold tracking-wider">
              Total pendiente global
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-[18px] font-bold text-blue-200">S/</span>
              <span className="text-[32px] font-black tracking-tight leading-none">
                {totalBalance.toLocaleString()}
              </span>
            </div>
            <span className="text-[11px] text-white/80 mt-1">
              {debts.length} obligaciones registradas
            </span>
          </div>

          <div className="bg-white/15 p-3 rounded-2xl backdrop-blur-xs text-right border border-white/20">
            <span className="text-[11px] text-blue-100 block">Cuota mensual total</span>
            <span className="text-[18px] font-bold text-white">
              S/ {totalMonthlyQuota.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        <button
          onClick={() => setFilter('all')}
          className={`px-3.5 py-1.5 rounded-full text-[12px] font-bold transition-all cursor-pointer ${
            filter === 'all'
              ? 'bg-[#131b2e] text-white shadow-xs'
              : 'bg-white text-[#434655] border border-[#eaedff] hover:bg-[#faf8ff]'
          }`}
        >
          Todas ({debts.length})
        </button>

        <button
          onClick={() => setFilter('al_dia')}
          className={`px-3 py-1.5 rounded-full text-[12px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
            filter === 'al_dia'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          Al día ({debts.filter((d) => d.status === 'al_dia').length})
        </button>

        <button
          onClick={() => setFilter('proximo')}
          className={`px-3 py-1.5 rounded-full text-[12px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
            filter === 'proximo'
              ? 'bg-amber-500 text-white shadow-xs'
              : 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-amber-500"></span>
          Próximo ({debts.filter((d) => d.status === 'proximo').length})
        </button>

        <button
          onClick={() => setFilter('atrasado')}
          className={`px-3 py-1.5 rounded-full text-[12px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
            filter === 'atrasado'
              ? 'bg-rose-600 text-white shadow-xs'
              : 'bg-rose-50 text-rose-800 border border-rose-200 hover:bg-rose-100'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-rose-500"></span>
          Atrasado ({debts.filter((d) => d.status === 'atrasado').length})
        </button>
      </div>

      {/* Lista de Tarjetas de Deudas */}
      <div className="flex flex-col gap-3">
        {filteredDebts.length === 0 ? (
          <div className="p-8 rounded-3xl bg-white border border-[#eaedff] text-center flex flex-col items-center gap-3">
            <span className="material-symbols-outlined text-[48px] text-[#747686]">inbox</span>
            <p className="font-label-md text-[14px] font-semibold text-[#131b2e]">
              No hay deudas en esta categoría
            </p>
            <button
              onClick={onOpenAddDebt}
              className="text-[13px] font-bold text-[#0037b0] hover:underline cursor-pointer"
            >
              + Registrar una nueva deuda
            </button>
          </div>
        ) : (
          filteredDebts.map((debt) => {
            const initial = debt.initialAmount || debt.balance;
            const paid = debt.paidAmount || 0;
            const progress = initial > 0 ? Math.min(100, Math.round((paid / initial) * 100)) : 0;

            return (
              <div
                key={debt.id}
                className="rounded-3xl bg-white p-4 sm:p-5 border border-[#eaedff] shadow-xs hover:border-[#0037b0]/30 transition-all flex flex-col gap-3.5"
              >
                {/* Top Row: Entidad + Tipo + Status Badge */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-[#0037b0]/10 text-[#0037b0] flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-[24px]">
                        {debt.iconName || 'account_balance'}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#0037b0] block">
                        {debt.entityType}
                      </span>
                      <h3 className="font-headline-sm text-[16px] font-bold text-[#131b2e] leading-tight">
                        {debt.entity}
                      </h3>
                      <span className="text-[12px] text-[#747686]">{debt.type}</span>
                    </div>
                  </div>

                  {/* Estado Badge */}
                  <div>
                    {debt.status === 'al_dia' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        🟢 Al día
                      </span>
                    )}
                    {debt.status === 'proximo' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-[11px] font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                        🟡 Próximo
                      </span>
                    )}
                    {debt.status === 'atrasado' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-50 text-rose-800 border border-rose-200 text-[11px] font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                        🔴 Atrasado
                      </span>
                    )}
                  </div>
                </div>

                {/* Key Metrics: Saldo, Cuota, Vencimiento */}
                <div className="grid grid-cols-3 gap-2 bg-[#faf8ff] p-3 rounded-2xl border border-[#eaedff]">
                  <div>
                    <span className="text-[10px] text-[#747686] block">Saldo pendiente</span>
                    <span className="font-headline-sm text-[14px] font-extrabold text-[#0037b0]">
                      S/ {debt.balance.toLocaleString()}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-[#747686] block">Cuota mensual</span>
                    <span className="font-headline-sm text-[14px] font-bold text-[#131b2e]">
                      S/ {debt.monthlyQuota.toLocaleString()}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-[#747686] block">Vencimiento</span>
                    <span className="font-headline-sm text-[12px] font-bold text-[#131b2e] truncate block">
                      {debt.dueDate}
                    </span>
                  </div>
                </div>

                {/* Barra de progreso de pago */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between text-[11px] text-[#747686]">
                    <span>Progreso: {progress}% cancelado</span>
                    <span>Cuotas: {debt.pendingQuotas || 0} pend.</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#eaedff] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#0037b0] transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-1 border-t border-[#eaedff] gap-2">
                  <button
                    type="button"
                    onClick={() => onSelectDebt(debt)}
                    className="flex-1 py-2 px-3 rounded-xl bg-[#0037b0] text-white text-[12px] font-bold hover:bg-[#002f99] active:scale-95 transition-all text-center flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">visibility</span>
                    <span>Ver detalle</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onEditDebt(debt)}
                    title="Editar datos de deuda"
                    className="p-2 rounded-xl bg-white border border-[#eaedff] text-[#434655] hover:text-[#0037b0] transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">edit</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDebtToDelete(debt)}
                    title="Eliminar registro"
                    className="p-2 rounded-xl bg-white border border-[#eaedff] text-[#747686] hover:text-rose-600 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {debtToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-[28px]">delete_forever</span>
            </div>
            <div className="text-center">
              <h3 className="font-headline-sm text-[18px] font-bold text-[#131b2e]">
                ¿Eliminar este registro?
              </h3>
              <p className="text-[13px] text-[#434655] mt-1">
                Se eliminará el seguimiento de <strong>{debtToDelete.entity}</strong> ({debtToDelete.type}).
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDebtToDelete(null)}
                className="py-2.5 px-4 rounded-xl border border-[#eaedff] text-[#434655] font-semibold text-[13px] hover:bg-[#faf8ff] cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  onDeleteDebt(debtToDelete.id);
                  setDebtToDelete(null);
                }}
                className="py-2.5 px-4 rounded-xl bg-rose-600 text-white font-bold text-[13px] hover:bg-rose-700 shadow-sm cursor-pointer"
              >
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
