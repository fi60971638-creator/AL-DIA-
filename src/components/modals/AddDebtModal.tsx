import React, { useState } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { DebtType, DebtStatus } from '../../types';

export const AddDebtModal: React.FC = () => {
  const { isAddDebtOpen, closeAddDebtModal, addDebt } = useFinance();

  const [name, setName] = useState('');
  const [institution, setInstitution] = useState('');
  const [type, setType] = useState<DebtType>('tarjeta_credito');
  const [currentBalance, setCurrentBalance] = useState('');
  const [initialAmount, setInitialAmount] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [dueDay, setDueDay] = useState('15');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  if (!isAddDebtOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const balanceNum = parseFloat(currentBalance);
    const initialNum = parseFloat(initialAmount) || balanceNum;
    const paymentNum = parseFloat(monthlyPayment);
    const rateNum = parseFloat(interestRate) || 0;
    const dayNum = parseInt(dueDay, 10) || 15;

    if (!name.trim() || !institution.trim()) {
      setError('Por favor indica el nombre de la deuda y la entidad financiera.');
      return;
    }
    if (isNaN(balanceNum) || balanceNum <= 0) {
      setError('Ingresa un saldo pendiente válido.');
      return;
    }
    if (isNaN(paymentNum) || paymentNum <= 0) {
      setError('Ingresa una cuota mensual estimada.');
      return;
    }

    const todayDay = new Date().getDate();
    let status: DebtStatus = 'al_dia';
    if (dayNum - todayDay <= 5 && dayNum - todayDay >= 0) {
      status = 'proximo';
    } else if (dayNum - todayDay <= 12 && dayNum - todayDay > 5) {
      status = 'se_acerca';
    }

    const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Dic'];
    const currentMonth = monthNames[new Date().getMonth()];

    addDebt({
      name: name.trim(),
      institution: institution.trim(),
      type,
      currentBalance: balanceNum,
      initialAmount: initialNum,
      monthlyPayment: paymentNum,
      interestRate: rateNum,
      dueDateFormatted: `${dayNum} ${currentMonth}`,
      dueDay: dayNum,
      status,
      notes: notes.trim() || undefined,
      categoryIcon: type === 'tarjeta_credito' ? 'credit_card' : type === 'prestamo_personal' ? 'account_balance' : 'receipt',
    });

    // Reset fields
    setName('');
    setInstitution('');
    setCurrentBalance('');
    setInitialAmount('');
    setMonthlyPayment('');
    setInterestRate('');
    setNotes('');
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#0F3B82] flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">add_circle</span>
            </div>
            <div>
              <h3 className="text-[18px] font-bold text-slate-900 tracking-tight">
                Agregar nueva deuda
              </h3>
              <p className="text-[12px] text-slate-500">
                Registra un crédito, tarjeta o préstamo para incluirlo en tu plan.
              </p>
            </div>
          </div>
          <button
            onClick={closeAddDebtModal}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex flex-col gap-4">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-[13px] flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">error</span>
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                Nombre de la deuda <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej. Tarjeta de crédito"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#0F3B82] transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                Institución financiera <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                placeholder="Ej. BCP, BBVA, Interbank"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#0F3B82] transition-all"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                Tipo de deuda
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as DebtType)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#0F3B82] transition-all"
              >
                <option value="tarjeta_credito">Tarjeta de crédito</option>
                <option value="prestamo_personal">Préstamo personal</option>
                <option value="credito_vehicular">Crédito vehicular</option>
                <option value="hipoteca">Crédito hipotecario</option>
                <option value="credito_estudios">Crédito educativo</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                Día de vencimiento (mes) <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                min="1"
                max="31"
                value={dueDay}
                onChange={(e) => setDueDay(e.target.value)}
                placeholder="15"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#0F3B82] transition-all"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                Saldo pendiente (S/) <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-slate-400 font-semibold text-[14px]">S/</span>
                <input
                  type="number"
                  step="0.01"
                  min="1"
                  value={currentBalance}
                  onChange={(e) => setCurrentBalance(e.target.value)}
                  placeholder="4850.00"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-[14px] font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#0F3B82] transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                Monto inicial / desembolsado (S/)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-slate-400 font-semibold text-[14px]">S/</span>
                <input
                  type="number"
                  step="0.01"
                  value={initialAmount}
                  onChange={(e) => setInitialAmount(e.target.value)}
                  placeholder="Opcional (ej. 8400.00)"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#0F3B82] transition-all"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                Cuota mensual estimada (S/) <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-slate-400 font-semibold text-[14px]">S/</span>
                <input
                  type="number"
                  step="0.01"
                  min="1"
                  value={monthlyPayment}
                  onChange={(e) => setMonthlyPayment(e.target.value)}
                  placeholder="650.00"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-[14px] font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#0F3B82] transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                Tasa de interés / TCEA (%)
              </label>
              <div className="relative">
                <span className="absolute right-3.5 top-2.5 text-slate-400 font-semibold text-[14px]">%</span>
                <input
                  type="number"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  placeholder="Ej. 39.5"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#0F3B82] transition-all"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
              Notas u observaciones
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ej. Compra en cuotas sin intereses, etc."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#0F3B82] transition-all"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3 mt-2">
            <button
              type="button"
              onClick={closeAddDebtModal}
              className="px-4 py-2.5 rounded-xl text-[14px] font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-[14px] font-bold bg-[#0F3B82] hover:bg-[#0A295C] text-white shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer active:scale-[0.99]"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              <span>Guardar deuda</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
