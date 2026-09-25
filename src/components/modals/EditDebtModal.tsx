import React, { useState } from 'react';
import { DebtItem } from '../../types';

interface EditDebtModalProps {
  debt: DebtItem;
  onClose: () => void;
  onSaveDebt: (updatedDebt: DebtItem) => void;
}

export const EditDebtModal: React.FC<EditDebtModalProps> = ({ debt, onClose, onSaveDebt }) => {
  const [entity, setEntity] = useState(debt.entity);
  const [balance, setBalance] = useState(debt.balance.toString());
  const [monthlyQuota, setMonthlyQuota] = useState(debt.monthlyQuota.toString());
  const [dueDate, setDueDate] = useState(debt.dueDate);
  const [pendingQuotas, setPendingQuotas] = useState(debt.pendingQuotas?.toString() || '');
  const [status, setStatus] = useState<DebtItem['status']>(debt.status);
  const [notes, setNotes] = useState(debt.notes || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const balanceNum = parseFloat(balance) || debt.balance;
    const quotaNum = parseFloat(monthlyQuota) || debt.monthlyQuota;
    const pendingQNum = parseInt(pendingQuotas) || debt.pendingQuotas || 1;

    let statusLabel = 'Al día';
    if (status === 'proximo') statusLabel = 'Próximo a vencer';
    if (status === 'atrasado') statusLabel = 'Atrasado';

    const dayMatch = dueDate.match(/\d+/);
    const dueDateDay = dayMatch ? Math.min(31, Math.max(1, parseInt(dayMatch[0]))) : debt.dueDateDay || 15;

    onSaveDebt({
      ...debt,
      entity: entity.trim() || debt.entity,
      balance: balanceNum,
      monthlyQuota: quotaNum,
      dueDate: dueDate.trim() || debt.dueDate,
      dueDateDay,
      pendingQuotas: pendingQNum,
      status,
      statusLabel,
      notes,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-md p-5 sm:p-6 shadow-2xl border border-[#eaedff] my-auto animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-3.5 border-b border-[#eaedff]">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-[#0037b0]/10 text-[#0037b0] flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-[22px]">edit_note</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-[17px] font-bold text-[#131b2e] leading-tight">
                Editar deuda
              </h3>
              <p className="font-body-sm text-[12px] text-[#434655]">
                Actualiza los datos de tu compromiso
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#747686] hover:text-[#131b2e]"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="py-3 flex flex-col gap-3">
          <div>
            <label className="font-label-sm text-[12px] font-semibold text-[#131b2e] block mb-1">
              Nombre o Entidad:
            </label>
            <input
              type="text"
              required
              value={entity}
              onChange={(e) => setEntity(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-[#c4c5d7] text-[13px] text-[#131b2e] focus:border-[#0037b0] outline-none font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-label-sm text-[12px] font-semibold text-[#131b2e] block mb-1">
                Saldo pendiente (S/):
              </label>
              <input
                type="number"
                required
                min="0"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-[#c4c5d7] text-[13px] text-[#131b2e] focus:border-[#0037b0] outline-none font-bold"
              />
            </div>

            <div>
              <label className="font-label-sm text-[12px] font-semibold text-[#131b2e] block mb-1">
                Cuota mensual (S/):
              </label>
              <input
                type="number"
                required
                min="0"
                value={monthlyQuota}
                onChange={(e) => setMonthlyQuota(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-[#c4c5d7] text-[13px] text-[#131b2e] focus:border-[#0037b0] outline-none font-semibold"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-label-sm text-[12px] font-semibold text-[#131b2e] block mb-1">
                Fecha vencimiento:
              </label>
              <input
                type="text"
                required
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-[#c4c5d7] text-[13px] text-[#131b2e] focus:border-[#0037b0] outline-none"
              />
            </div>

            <div>
              <label className="font-label-sm text-[12px] font-semibold text-[#131b2e] block mb-1">
                Cuotas pendientes:
              </label>
              <input
                type="number"
                min="0"
                value={pendingQuotas}
                onChange={(e) => setPendingQuotas(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-[#c4c5d7] text-[13px] text-[#131b2e] focus:border-[#0037b0] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="font-label-sm text-[12px] font-semibold text-[#131b2e] block mb-1">
              Estado:
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setStatus('al_dia')}
                className={`py-2 px-2 rounded-xl text-[12px] font-semibold flex items-center justify-center gap-1 border transition-all ${
                  status === 'al_dia'
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                }`}
              >
                Al día
              </button>
              <button
                type="button"
                onClick={() => setStatus('proximo')}
                className={`py-2 px-2 rounded-xl text-[12px] font-semibold flex items-center justify-center gap-1 border transition-all ${
                  status === 'proximo'
                    ? 'bg-amber-500 text-white border-amber-500'
                    : 'bg-amber-50 text-amber-800 border-amber-200'
                }`}
              >
                Próximo
              </button>
              <button
                type="button"
                onClick={() => setStatus('atrasado')}
                className={`py-2 px-2 rounded-xl text-[12px] font-semibold flex items-center justify-center gap-1 border transition-all ${
                  status === 'atrasado'
                    ? 'bg-rose-600 text-white border-rose-600'
                    : 'bg-rose-50 text-rose-800 border-rose-200'
                }`}
              >
                Atrasado
              </button>
            </div>
          </div>

          <div>
            <label className="font-label-sm text-[12px] font-semibold text-[#131b2e] block mb-1">
              Notas adicionales:
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#c4c5d7] text-[13px] text-[#131b2e] focus:border-[#0037b0] outline-none"
              placeholder="Anotaciones de acuerdos, contacto con asesor, etc."
            />
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-[#0037b0] text-white font-label-lg text-[14px] font-bold hover:bg-[#002f99] active:scale-[0.98] transition-all shadow-xs"
            >
              Guardar cambios
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2 rounded-xl text-[#747686] hover:text-[#131b2e] font-label-md text-[13px]"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
