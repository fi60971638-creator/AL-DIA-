import React from 'react';
import { useFinance } from '../../context/FinanceContext';

export const DebtDetailModal: React.FC = () => {
  const {
    selectedDebtForDetail,
    closeDebtDetailModal,
    openRegisterPaymentModal,
    payments,
    deleteDebt,
  } = useFinance();

  if (!selectedDebtForDetail) return null;

  const debt = selectedDebtForDetail;
  const debtPayments = payments.filter((p) => p.debtId === debt.id);

  const handlePay = () => {
    const id = debt.id;
    closeDebtDetailModal();
    openRegisterPaymentModal(id);
  };

  const handleDelete = () => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar "${debt.name}"?`)) {
      deleteDebt(debt.id);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-blue-50 text-[#0F3B82] border border-blue-100 flex items-center justify-center">
              <span className="material-symbols-outlined text-[26px]">
                {debt.type === 'tarjeta_credito' ? 'credit_card' : 'account_balance'}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-[18px] font-bold text-slate-900 tracking-tight">
                  {debt.name}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700">
                  {debt.institution}
                </span>
              </div>
              <p className="text-[12px] text-slate-500">
                Detalle y desglose de tu obligación crediticia
              </p>
            </div>
          </div>
          <button
            onClick={closeDebtDetailModal}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex flex-col gap-5">
          {/* Main Stat Card */}
          <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-5 border border-slate-200 flex flex-col gap-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Saldo pendiente
                </span>
                <span className="text-[22px] font-extrabold text-[#0F3B82] mt-0.5 block">
                  S/ {debt.currentBalance.toLocaleString('es-PE')}
                </span>
                <span className="text-[11px] text-slate-500">
                  Inicial: S/ {debt.initialAmount.toLocaleString('es-PE')}
                </span>
              </div>

              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Cuota mensual
                </span>
                <span className="text-[22px] font-extrabold text-slate-900 mt-0.5 block">
                  S/ {debt.monthlyPayment.toLocaleString('es-PE')}
                </span>
                <span className="text-[11px] text-slate-500">
                  Vence: {debt.dueDateFormatted}
                </span>
              </div>

              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Tasa (TCEA)
                </span>
                <span className="text-[22px] font-extrabold text-emerald-600 mt-0.5 block">
                  {debt.interestRate}%
                </span>
                <span className="text-[11px] text-slate-500">
                  {debt.interestRate > 30 ? 'Costo alto' : 'Costo moderado'}
                </span>
              </div>
            </div>

            {/* Progress bar */}
            <div>
              <div className="flex items-center justify-between text-[12px] mb-1.5 font-medium">
                <span className="text-slate-600">Progreso pagado</span>
                <span className="text-emerald-700 font-bold">{debt.paidPercentage}%</span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-[#00B49F] rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, Math.max(0, debt.paidPercentage))}%` }}
                />
              </div>
            </div>
          </div>

          {/* Strategy Tip Box */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
            <span className="material-symbols-outlined text-[22px] text-amber-600 shrink-0 mt-0.5">
              lightbulb
            </span>
            <div className="text-[12.5px] text-amber-900 leading-snug">
              <strong className="font-semibold block mb-0.5">Estrategia para esta deuda:</strong>
              {debt.interestRate >= 35 ? (
                <span>
                  Al tener una tasa del {debt.interestRate}%, esta deuda genera un interés acelerado. Si puedes abonar un extra de S/ 200 este mes a capital, reducirás drásticamente el costo final.
                </span>
              ) : (
                <span>
                  Mantén la puntualidad en tu cuota mensual de S/ {debt.monthlyPayment.toLocaleString('es-PE')} para proteger tu historial crediticio con calificación Normal ante la SBS.
                </span>
              )}
            </div>
          </div>

          {/* Payment History for this debt */}
          <div>
            <h4 className="text-[14px] font-bold text-slate-900 mb-2 flex items-center justify-between">
              <span>Historial de pagos registrados</span>
              <span className="text-[12px] font-normal text-slate-500">
                {debtPayments.length} registro(s)
              </span>
            </h4>

            {debtPayments.length === 0 ? (
              <p className="text-[13px] text-slate-500 bg-slate-50 p-4 rounded-xl text-center border border-slate-100">
                Aún no has registrado pagos para esta deuda. Haz clic en "Pagar cuota" para comenzar.
              </p>
            ) : (
              <div className="flex flex-col gap-2">
                {debtPayments.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-[13px]"
                  >
                    <div>
                      <span className="font-semibold text-slate-900 block">
                        S/ {p.amount.toLocaleString('es-PE')}
                      </span>
                      <span className="text-[11.5px] text-slate-500">
                        {p.date} · {p.paymentMethod}
                      </span>
                    </div>
                    {p.note && (
                      <span className="text-[11px] text-slate-600 italic max-w-[150px] truncate">
                        "{p.note}"
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              onClick={closeDebtDetailModal}
              className="px-4 py-2.5 rounded-xl text-[14px] font-medium text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cerrar
            </button>
            <button
              onClick={handlePay}
              className="px-5 py-2.5 rounded-xl text-[14px] font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer active:scale-[0.99]"
            >
              <span className="material-symbols-outlined text-[18px]">payments</span>
              <span>Registrar pago</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
