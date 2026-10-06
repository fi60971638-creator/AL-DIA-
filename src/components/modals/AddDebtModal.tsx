import React, { useState } from 'react';
import { DebtItem } from '../../types';

interface AddDebtModalProps {
  onClose: () => void;
  onAddDebt: (debt: Omit<DebtItem, 'id'>) => void;
}

export const AddDebtModal: React.FC<AddDebtModalProps> = ({ onClose, onAddDebt }) => {
  const [entity, setEntity] = useState('');
  const [type, setType] = useState<DebtItem['type']>('Crédito personal');
  const [initialAmount, setInitialAmount] = useState<number | ''>('');
  const [balance, setBalance] = useState<number | ''>('');
  const [monthlyQuota, setMonthlyQuota] = useState<number | ''>('');
  const [dueDateDay, setDueDateDay] = useState<number>(10);
  const [frequency, setFrequency] = useState<'Mensual' | 'Quincenal'>('Mensual');
  const [reminderDays, setReminderDays] = useState<number[]>([3, 1]);
  const [errorMsg, setErrorMsg] = useState('');

  const handleToggleReminder = (days: number) => {
    if (reminderDays.includes(days)) {
      setReminderDays(reminderDays.filter((d) => d !== days));
    } else {
      setReminderDays([...reminderDays, days]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!entity.trim()) {
      setErrorMsg('Por favor ingresa el nombre de la entidad.');
      return;
    }

    const finalBalance = typeof balance === 'number' && balance > 0 ? balance : typeof initialAmount === 'number' ? initialAmount : 0;
    const finalInitial = typeof initialAmount === 'number' && initialAmount > 0 ? initialAmount : finalBalance;
    const finalQuota = typeof monthlyQuota === 'number' && monthlyQuota > 0 ? monthlyQuota : Math.round(finalBalance / 6) || 100;

    if (finalBalance <= 0) {
      setErrorMsg('Por favor ingresa un saldo pendiente válido.');
      return;
    }

    const dueDateStr = `${dueDateDay} de octubre`;

    onAddDebt({
      entity: entity.trim(),
      entityType: entity.toLowerCase().includes('caja') ? 'Caja' : entity.toLowerCase().includes('tarjeta') || entity.toLowerCase().includes('ripley') || entity.toLowerCase().includes('saga') ? 'Comercio' : 'Banco',
      type,
      initialAmount: finalInitial,
      paidAmount: Math.max(0, finalInitial - finalBalance),
      balance: finalBalance,
      monthlyQuota: finalQuota,
      dueDate: dueDateStr,
      dueDateDay,
      pendingQuotas: Math.ceil(finalBalance / (finalQuota || 1)),
      totalQuotas: Math.ceil(finalInitial / (finalQuota || 1)) || 12,
      status: 'proximo',
      statusLabel: 'Próximo a vencer',
      iconName: type === 'Tarjeta de crédito' ? 'credit_card' : 'account_balance',
      notes: `Frecuencia: ${frequency}. Recordatorios: ${reminderDays.join(', ')} días antes.`,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-[#FFFFFF] rounded-xl w-full max-w-md p-6 border border-[#E5E7EB] shadow-lg flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
          <h2 className="text-[18px] font-bold text-[#0F3D56]">
            Agregar deuda
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#6B7280] hover:text-[#25313C] hover:bg-[#F7F8FA] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-[#D64545] text-[13px] font-medium">
            {errorMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          <div>
            <label className="text-[13px] font-medium text-[#25313C] block mb-1">
              Nombre de la entidad
            </label>
            <input
              type="text"
              required
              placeholder="ej. BCP, BBVA, Saga Falabella, Caja Arequipa"
              value={entity}
              onChange={(e) => setEntity(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-[#E5E7EB] text-[14px] text-[#25313C] outline-none focus:border-[#0F3D56]"
            />
          </div>

          <div>
            <label className="text-[13px] font-medium text-[#25313C] block mb-1">
              Tipo de deuda
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as any)}
              className="w-full px-3 py-2 rounded-lg border border-[#E5E7EB] text-[14px] text-[#25313C] bg-white outline-none focus:border-[#0F3D56] cursor-pointer"
            >
              <option value="Crédito personal">Crédito personal</option>
              <option value="Tarjeta de crédito">Tarjeta de crédito</option>
              <option value="Crédito para negocio">Crédito para negocio</option>
              <option value="Crédito vehicular">Crédito vehicular</option>
              <option value="Crédito hipotecario">Crédito hipotecario</option>
              <option value="Otro">Otro compromiso</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[13px] font-medium text-[#25313C] block mb-1">
                Monto total (S/)
              </label>
              <input
                type="number"
                min="1"
                placeholder="1,500.00"
                value={initialAmount}
                onChange={(e) => {
                  const val = e.target.value === '' ? '' : Number(e.target.value);
                  setInitialAmount(val);
                  if (balance === '') setBalance(val);
                }}
                className="w-full px-3 py-2 rounded-lg border border-[#E5E7EB] text-[14px] text-[#25313C] outline-none focus:border-[#0F3D56]"
              />
            </div>

            <div>
              <label className="text-[13px] font-medium text-[#25313C] block mb-1">
                Saldo pendiente (S/)
              </label>
              <input
                type="number"
                min="1"
                required
                placeholder="1,200.00"
                value={balance}
                onChange={(e) => setBalance(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg border border-[#E5E7EB] text-[14px] text-[#25313C] outline-none focus:border-[#0F3D56]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[13px] font-medium text-[#25313C] block mb-1">
                Monto de cuota (S/)
              </label>
              <input
                type="number"
                min="1"
                placeholder="200.00"
                value={monthlyQuota}
                onChange={(e) => setMonthlyQuota(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg border border-[#E5E7EB] text-[14px] text-[#25313C] outline-none focus:border-[#0F3D56]"
              />
            </div>

            <div>
              <label className="text-[13px] font-medium text-[#25313C] block mb-1">
                Día de vencimiento
              </label>
              <input
                type="number"
                min="1"
                max="31"
                value={dueDateDay}
                onChange={(e) => setDueDateDay(Number(e.target.value) || 10)}
                className="w-full px-3 py-2 rounded-lg border border-[#E5E7EB] text-[14px] text-[#25313C] outline-none focus:border-[#0F3D56]"
              />
            </div>
          </div>

          <div>
            <label className="text-[13px] font-medium text-[#25313C] block mb-1">
              Frecuencia de pago
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setFrequency('Mensual')}
                className={`flex-1 py-1.5 rounded-lg text-[13px] font-medium border cursor-pointer ${
                  frequency === 'Mensual'
                    ? 'bg-[#0F3D56] text-white border-[#0F3D56]'
                    : 'bg-[#FFFFFF] text-[#25313C] border-[#E5E7EB]'
                }`}
              >
                Mensual
              </button>
              <button
                type="button"
                onClick={() => setFrequency('Quincenal')}
                className={`flex-1 py-1.5 rounded-lg text-[13px] font-medium border cursor-pointer ${
                  frequency === 'Quincenal'
                    ? 'bg-[#0F3D56] text-white border-[#0F3D56]'
                    : 'bg-[#FFFFFF] text-[#25313C] border-[#E5E7EB]'
                }`}
              >
                Quincenal
              </button>
            </div>
          </div>

          <div>
            <label className="text-[13px] font-medium text-[#25313C] block mb-1.5">
              Recordarme antes del vencimiento:
            </label>
            <div className="flex gap-2">
              {[1, 3, 7].map((days) => {
                const isSelected = reminderDays.includes(days);
                return (
                  <button
                    key={days}
                    type="button"
                    onClick={() => handleToggleReminder(days)}
                    className={`flex-1 py-1.5 rounded-lg text-[12px] font-medium border transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-50 text-[#149B8A] border-[#149B8A] font-semibold'
                        : 'bg-[#FFFFFF] text-[#6B7280] border-[#E5E7EB]'
                    }`}
                  >
                    {days} {days === 1 ? 'día' : 'días'}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-3 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-lg bg-[#FFFFFF] border border-[#E5E7EB] hover:bg-[#F7F8FA] text-[#25313C] text-[14px] font-medium transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-lg bg-[#0F3D56] hover:bg-[#0c2f42] text-white text-[14px] font-medium transition-colors cursor-pointer"
            >
              Guardar deuda
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
