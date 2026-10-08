import React, { useState, useEffect } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { Payment } from '../../types';

export const RegisterPaymentModal: React.FC = () => {
  const {
    debts,
    isRegisterPaymentOpen,
    closeRegisterPaymentModal,
    registerPayment,
    preselectedDebtIdForPayment,
  } = useFinance();

  const [selectedDebtId, setSelectedDebtId] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [date, setDate] = useState<string>(() => new Date().toISOString().split('T')[0]);
  const [paymentMethod, setPaymentMethod] = useState<Payment['paymentMethod']>('Transferencia bancaria');
  const [note, setNote] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (isRegisterPaymentOpen) {
      if (preselectedDebtIdForPayment) {
        setSelectedDebtId(preselectedDebtIdForPayment);
        const debt = debts.find((d) => d.id === preselectedDebtIdForPayment);
        if (debt) {
          setAmount(debt.monthlyPayment.toString());
        }
      } else if (debts.length > 0) {
        setSelectedDebtId(debts[0].id);
        setAmount(debts[0].monthlyPayment.toString());
      }
      setDate(new Date().toISOString().split('T')[0]);
      setNote('');
      setError('');
    }
  }, [isRegisterPaymentOpen, preselectedDebtIdForPayment, debts]);

  if (!isRegisterPaymentOpen) return null;

  const currentDebt = debts.find((d) => d.id === selectedDebtId);

  const handleDebtChange = (id: string) => {
    setSelectedDebtId(id);
    const debt = debts.find((d) => d.id === id);
    if (debt) {
      setAmount(debt.monthlyPayment.toString());
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (!selectedDebtId) {
      setError('Por favor selecciona la deuda que vas a amortizar.');
      return;
    }
    if (isNaN(numAmount) || numAmount <= 0) {
      setError('Ingresa un monto válido mayor a S/ 0.');
      return;
    }

    registerPayment({
      debtId: selectedDebtId,
      amount: numAmount,
      date,
      paymentMethod,
      note: note.trim() || undefined,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">payments</span>
            </div>
            <div>
              <h3 className="text-[18px] font-bold text-slate-900 tracking-tight">
                Registrar pago
              </h3>
              <p className="text-[12px] text-slate-500">
                Amortiza una cuota y actualiza tu progreso financiero.
              </p>
            </div>
          </div>
          <button
            onClick={closeRegisterPaymentModal}
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

          {/* Seleccionar deuda */}
          <div>
            <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
              Seleccionar deuda <span className="text-rose-500">*</span>
            </label>
            <select
              value={selectedDebtId}
              onChange={(e) => handleDebtChange(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-[14px] focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
            >
              {debts.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} — {d.institution} (Saldo: S/ {d.currentBalance.toLocaleString('es-PE')})
                </option>
              ))}
            </select>
            {currentDebt && (
              <div className="mt-1.5 flex items-center justify-between text-[11.5px] text-slate-500 px-1">
                <span>Cuota sugerida: S/ {currentDebt.monthlyPayment.toLocaleString('es-PE')}</span>
                <span>Vence: {currentDebt.dueDateFormatted}</span>
              </div>
            )}
          </div>

          {/* Monto */}
          <div>
            <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
              Monto a pagar (S/) <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-slate-400 font-semibold text-[14px]">
                S/
              </span>
              <input
                type="number"
                step="0.01"
                min="1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="650.00"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-[14px] font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
                required
              />
            </div>
            {currentDebt && (
              <div className="mt-1.5 flex gap-1.5">
                <button
                  type="button"
                  onClick={() => setAmount(currentDebt.monthlyPayment.toString())}
                  className="px-2.5 py-1 text-[11.5px] font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
                >
                  Cuota del mes (S/ {currentDebt.monthlyPayment})
                </button>
                <button
                  type="button"
                  onClick={() => setAmount(currentDebt.currentBalance.toString())}
                  className="px-2.5 py-1 text-[11.5px] font-medium bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg transition-colors"
                >
                  Saldo total (S/ {currentDebt.currentBalance})
                </button>
              </div>
            )}
          </div>

          {/* Fecha */}
          <div>
            <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
              Fecha de pago <span className="text-rose-500">*</span>
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-[14px] focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
              required
            />
          </div>

          {/* Método de pago */}
          <div>
            <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
              Método de pago
            </label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value as Payment['paymentMethod'])}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-[14px] focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
            >
              <option value="Transferencia bancaria">Transferencia bancaria</option>
              <option value="App del banco">App del banco / Banca móvil</option>
              <option value="Tarjeta de débito">Tarjeta de débito</option>
              <option value="Efectivo en ventanilla">Efectivo en ventanilla / Agente</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          {/* Nota opcional */}
          <div>
            <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
              Nota opcional
            </label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Ej. Cuota 5 de 12 pagada puntual"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-[14px] focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
            />
          </div>

          {/* Submit Actions */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3 mt-2">
            <button
              type="button"
              onClick={closeRegisterPaymentModal}
              className="px-4 py-2.5 rounded-xl text-[14px] font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-[14px] font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer active:scale-[0.99]"
            >
              <span className="material-symbols-outlined text-[18px]">check</span>
              <span>Registrar pago</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
