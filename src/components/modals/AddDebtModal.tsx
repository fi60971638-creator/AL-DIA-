import React, { useState } from 'react';
import { DebtItem } from '../../types';

interface AddDebtModalProps {
  onClose: () => void;
  onAddDebt: (debt: Omit<DebtItem, 'id'>) => void;
}

export const AddDebtModal: React.FC<AddDebtModalProps> = ({ onClose, onAddDebt }) => {
  const [entityName, setEntityName] = useState('');
  const [entityType, setEntityType] = useState<DebtItem['entityType']>('Banco');
  const [type, setType] = useState<DebtItem['type']>('Crédito personal');
  const [initialAmount, setInitialAmount] = useState('');
  const [balance, setBalance] = useState('');
  const [monthlyQuota, setMonthlyQuota] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [pendingQuotas, setPendingQuotas] = useState('');
  const [totalQuotas, setTotalQuotas] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [status, setStatus] = useState<DebtItem['status']>('al_dia');
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Auto icon selection based on type
  const getIcon = (debtType: string) => {
    switch (debtType) {
      case 'Tarjeta de crédito':
        return 'credit_card';
      case 'Crédito vehicular':
        return 'directions_car';
      case 'Crédito hipotecario':
        return 'home';
      case 'Crédito para negocio':
        return 'storefront';
      case 'Crédito personal':
        return 'account_balance_wallet';
      default:
        return 'receipt_long';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const balanceNum = parseFloat(balance) || 0;
    const initialNum = parseFloat(initialAmount) || balanceNum;
    const quotaNum = parseFloat(monthlyQuota) || (pendingQuotas ? Math.round(balanceNum / Number(pendingQuotas)) : Math.round(balanceNum / 6));
    const pendingQNum = parseInt(pendingQuotas) || 6;
    const totalQNum = parseInt(totalQuotas) || Math.max(pendingQNum, 12);
    const paidNum = Math.max(0, initialNum - balanceNum);
    const rateNum = interestRate ? parseFloat(interestRate) : undefined;

    const entityDisplayName = entityName.trim() || `${entityType} ${type}`;

    // Extract day number for calendar if available
    const dayMatch = dueDate.match(/\d+/);
    const dueDateDay = dayMatch ? Math.min(31, Math.max(1, parseInt(dayMatch[0]))) : 15;

    let statusLabel = 'Al día';
    if (status === 'proximo') statusLabel = 'Próximo a vencer';
    if (status === 'atrasado') statusLabel = 'Atrasado';

    setShowSuccessToast(true);

    setTimeout(() => {
      onAddDebt({
        entity: entityDisplayName,
        entityType,
        type,
        initialAmount: initialNum,
        paidAmount: paidNum,
        balance: balanceNum,
        monthlyQuota: quotaNum,
        dueDate: dueDate.trim() || `${dueDateDay} de cada mes`,
        dueDateDay,
        pendingQuotas: pendingQNum,
        totalQuotas: totalQNum,
        interestRate: rateNum,
        status,
        statusLabel,
        iconName: getIcon(type),
        notes: `Registrado en AlDía. ${entityType} - ${type}.`,
      });
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-lg p-5 sm:p-6 shadow-2xl border border-[#eaedff] my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-[#eaedff]">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#0037b0]/10 text-[#0037b0] flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-[22px]">post_add</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-[18px] font-bold text-[#131b2e] leading-tight">
                Registrar deuda
              </h3>
              <p className="font-body-sm text-[12px] text-[#434655]">
                AlDía te ayuda a tener todas tus cuentas claras
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#747686] hover:text-[#131b2e] hover:bg-[#eaedff]/60 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Success Banner */}
        {showSuccessToast && (
          <div className="mt-3 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-2 animate-bounce">
            <span className="material-symbols-outlined text-emerald-600">check_circle</span>
            <span className="font-label-md text-[13px] font-bold">
              Deuda registrada correctamente.
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="py-3 flex flex-col gap-3.5 max-h-[75vh] overflow-y-auto pr-1">
          {/* Tipo de deuda */}
          <div>
            <label className="font-label-sm text-[12px] font-semibold text-[#131b2e] block mb-1">
              Tipo de deuda: <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
              {[
                'Crédito personal',
                'Tarjeta de crédito',
                'Crédito vehicular',
                'Crédito hipotecario',
                'Crédito para negocio',
                'Otro',
              ].map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => setType(opt as DebtItem['type'])}
                  className={`py-2 px-2.5 rounded-xl text-[12px] font-medium transition-all text-center border ${
                    type === opt
                      ? 'bg-[#0037b0] text-white border-[#0037b0] shadow-xs'
                      : 'bg-[#faf8ff] text-[#434655] border-[#eaedff] hover:border-[#c4c5d7]'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Entidad Tipo y Nombre */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-label-sm text-[12px] font-semibold text-[#131b2e] block mb-1">
                Tipo de entidad: <span className="text-red-500">*</span>
              </label>
              <select
                value={entityType}
                onChange={(e) => setEntityType(e.target.value as DebtItem['entityType'])}
                className="w-full px-3 py-2.5 rounded-xl border border-[#c4c5d7] text-[13px] text-[#131b2e] focus:border-[#0037b0] focus:ring-1 focus:ring-[#0037b0] outline-none bg-white font-medium"
              >
                <option value="Banco">Banco</option>
                <option value="Caja">Caja Municipal/Rural</option>
                <option value="Financiera">Financiera</option>
                <option value="Cooperativa">Cooperativa</option>
                <option value="Comercio">Comercio / Tienda</option>
                <option value="Otra">Otra institución</option>
              </select>
            </div>

            <div>
              <label className="font-label-sm text-[12px] font-semibold text-[#131b2e] block mb-1">
                Nombre de la entidad: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Ej: BCP, BBVA, Caja Arequipa, Ripley..."
                value={entityName}
                onChange={(e) => setEntityName(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-[#c4c5d7] text-[13px] text-[#131b2e] focus:border-[#0037b0] focus:ring-1 focus:ring-[#0037b0] outline-none font-medium"
              />
            </div>
          </div>

          {/* Montos: Monto Original y Saldo Pendiente */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-label-sm text-[12px] font-semibold text-[#131b2e] block mb-1">
                Monto original total (S/):
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-[#747686] text-[13px] font-bold">S/</span>
                <input
                  type="number"
                  min="0"
                  step="10"
                  placeholder="3500"
                  value={initialAmount}
                  onChange={(e) => setInitialAmount(e.target.value)}
                  className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-[#c4c5d7] text-[13px] text-[#131b2e] focus:border-[#0037b0] focus:ring-1 focus:ring-[#0037b0] outline-none font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="font-label-sm text-[12px] font-semibold text-[#131b2e] block mb-1">
                Saldo pendiente actual (S/): <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-[#0037b0] text-[13px] font-bold">S/</span>
                <input
                  type="number"
                  required
                  min="1"
                  step="1"
                  placeholder="1400"
                  value={balance}
                  onChange={(e) => setBalance(e.target.value)}
                  className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-[#0037b0] bg-blue-50/30 text-[14px] text-[#131b2e] focus:ring-1 focus:ring-[#0037b0] outline-none font-bold"
                />
              </div>
            </div>
          </div>

          {/* Cuota Mensual y Fecha de Vencimiento */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-label-sm text-[12px] font-semibold text-[#131b2e] block mb-1">
                Cuota mensual (S/): <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-[#747686] text-[13px] font-bold">S/</span>
                <input
                  type="number"
                  required
                  min="1"
                  step="1"
                  placeholder="350"
                  value={monthlyQuota}
                  onChange={(e) => setMonthlyQuota(e.target.value)}
                  className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-[#c4c5d7] text-[13px] text-[#131b2e] focus:border-[#0037b0] focus:ring-1 focus:ring-[#0037b0] outline-none font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="font-label-sm text-[12px] font-semibold text-[#131b2e] block mb-1">
                Fecha de vencimiento: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Ej: 30 de septiembre, día 15"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-[#c4c5d7] text-[13px] text-[#131b2e] focus:border-[#0037b0] focus:ring-1 focus:ring-[#0037b0] outline-none font-medium"
              />
            </div>
          </div>

          {/* Cuotas Pendientes, Totales y Tasa de Interés */}
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="font-label-sm text-[11px] font-semibold text-[#434655] block mb-1">
                Cuotas pend.:
              </label>
              <input
                type="number"
                min="1"
                placeholder="4"
                value={pendingQuotas}
                onChange={(e) => setPendingQuotas(e.target.value)}
                className="w-full px-2.5 py-2 rounded-xl border border-[#c4c5d7] text-[13px] text-[#131b2e] focus:border-[#0037b0] outline-none text-center font-medium"
              />
            </div>

            <div>
              <label className="font-label-sm text-[11px] font-semibold text-[#434655] block mb-1">
                Cuotas tot.:
              </label>
              <input
                type="number"
                min="1"
                placeholder="10"
                value={totalQuotas}
                onChange={(e) => setTotalQuotas(e.target.value)}
                className="w-full px-2.5 py-2 rounded-xl border border-[#c4c5d7] text-[13px] text-[#131b2e] focus:border-[#0037b0] outline-none text-center font-medium"
              />
            </div>

            <div>
              <label className="font-label-sm text-[11px] font-semibold text-[#434655] block mb-1">
                Tasa TEA (%):
              </label>
              <input
                type="number"
                step="0.1"
                placeholder="24.5%"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="w-full px-2.5 py-2 rounded-xl border border-[#c4c5d7] text-[13px] text-[#131b2e] focus:border-[#0037b0] outline-none text-center font-medium"
              />
            </div>
          </div>

          {/* Estado de la deuda */}
          <div>
            <label className="font-label-sm text-[12px] font-semibold text-[#131b2e] block mb-1">
              Estado actual:
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setStatus('al_dia')}
                className={`py-2 px-2 rounded-xl text-[12px] font-semibold flex items-center justify-center gap-1.5 border transition-all ${
                  status === 'al_dia'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                    : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                Al día
              </button>

              <button
                type="button"
                onClick={() => setStatus('proximo')}
                className={`py-2 px-2 rounded-xl text-[12px] font-semibold flex items-center justify-center gap-1.5 border transition-all ${
                  status === 'proximo'
                    ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                    : 'bg-amber-50 text-amber-800 border-amber-200'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                Próximo
              </button>

              <button
                type="button"
                onClick={() => setStatus('atrasado')}
                className={`py-2 px-2 rounded-xl text-[12px] font-semibold flex items-center justify-center gap-1.5 border transition-all ${
                  status === 'atrasado'
                    ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                    : 'bg-rose-50 text-rose-800 border-rose-200'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                Atrasado
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-3 flex flex-col gap-2">
            <button
              type="submit"
              disabled={showSuccessToast}
              className="w-full py-3 rounded-2xl bg-[#0037b0] text-white font-label-lg text-[14px] font-bold hover:bg-[#002f99] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer disabled:opacity-75"
            >
              <span className="material-symbols-outlined text-[20px]">check_circle</span>
              <span>Guardar deuda</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2 rounded-xl text-[#747686] hover:text-[#131b2e] font-label-md text-[13px] cursor-pointer"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
