import React, { useState } from 'react';
import { useFinance } from '../../context/FinanceContext';

export const OnboardingModal: React.FC = () => {
  const { isOnboardingOpen, closeOnboardingModal, user, updateUser, showToast } = useFinance();

  const [step, setStep] = useState(1);
  const [selectedGoal, setSelectedGoal] = useState(user.primaryGoal || 'Salir de deudas');
  const [approxDebt, setApproxDebt] = useState('18450');
  const [monthlyCapacity, setMonthlyCapacity] = useState('2350');
  const [userName, setUserName] = useState(user.name || '');

  if (!isOnboardingOpen) return null;

  const goalOptions = [
    { label: 'Salir de deudas', desc: 'Liquidar tarjetas y préstamos de forma ordenada', icon: 'credit_card_off' },
    { label: 'Organizar mis pagos', desc: 'Tener un calendario claro para nunca atrasarme', icon: 'calendar_month' },
    { label: 'Ahorrar', desc: 'Construir un fondo para metas personales', icon: 'savings' },
    { label: 'Controlar mis gastos', desc: 'Saber a dónde se va cada sol que gano', icon: 'pie_chart' },
    { label: 'Mejorar mis finanzas', desc: 'Subir mi puntuación y estabilidad crediticia', icon: 'trending_up' },
  ];

  const handleFinish = () => {
    updateUser({
      name: userName.trim(),
      primaryGoal: selectedGoal,
      hasSeenOnboarding: true,
    });
    closeOnboardingModal();
    showToast('¡Bienvenido a AlDía!', 'Tu plan financiero personalizado está configurado.', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Progress indicator */}
        <div className="px-6 pt-5 pb-2 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-bold text-[#0F3B82] uppercase tracking-wider">
              Paso {step} de 5
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  s === step
                    ? 'w-6 bg-emerald-600'
                    : s < step
                    ? 'w-3 bg-emerald-300'
                    : 'w-3 bg-slate-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 flex flex-col justify-between">
          {/* STEP 1 */}
          {step === 1 && (
            <div className="flex flex-col items-center text-center gap-5 my-auto">
              <div className="w-20 h-20 rounded-3xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shadow-xs">
                <span className="material-symbols-outlined text-[42px]">handshake</span>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-[26px] font-extrabold text-[#0F3B82] tracking-tight">
                  Bienvenido a AlDía
                </h2>
                <p className="text-[16px] text-slate-600 max-w-sm mx-auto leading-relaxed">
                  “Te ayudaremos a entender y organizar mejor tus finanzas.”
                </p>
                <p className="text-[13px] text-slate-500 max-w-xs mx-auto mt-1">
                  Entiende tus deudas. Organiza tus pagos. Avanza tranquilo.
                </p>
              </div>

              <div className="w-full max-w-xs text-left mt-2">
                <label className="block text-[12.5px] font-semibold text-slate-700 mb-1">
                  ¿Cómo te llamas?
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Tu nombre"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-[14px] font-semibold focus:outline-none focus:border-[#0F3B82]"
                />
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="flex flex-col gap-5">
              <div>
                <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider block">
                  Objetivo Principal
                </span>
                <h3 className="text-[22px] font-extrabold text-slate-900 tracking-tight mt-0.5">
                  ¿Cuál es tu principal objetivo?
                </h3>
                <p className="text-[13px] text-slate-500 mt-1">
                  Personalizaremos tus recomendaciones según lo que más necesitas hoy.
                </p>
              </div>

              <div className="flex flex-col gap-2.5">
                {goalOptions.map((opt) => {
                  const isSelected = selectedGoal === opt.label;
                  return (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => setSelectedGoal(opt.label)}
                      className={`p-3.5 rounded-2xl border text-left flex items-center gap-3.5 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-50/80 border-emerald-500 shadow-2xs'
                          : 'bg-white border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                          isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[20px]">{opt.icon}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[14px] font-bold text-slate-900 block">
                          {opt.label}
                        </span>
                        <span className="text-[12px] text-slate-500 block truncate">
                          {opt.desc}
                        </span>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          isSelected ? 'border-emerald-600 bg-emerald-600' : 'border-slate-300'
                        }`}
                      >
                        {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="flex flex-col gap-5">
              <div>
                <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider block">
                  Diagnóstico Financiero
                </span>
                <h3 className="text-[22px] font-extrabold text-slate-900 tracking-tight mt-0.5">
                  ¿Cuánto debes aproximadamente?
                </h3>
                <p className="text-[13px] text-slate-500 mt-1">
                  Suma aproximada de tarjetas de crédito, compras y préstamos personales.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <div className="relative">
                  <span className="absolute left-4 top-3 text-slate-400 font-bold text-[18px]">S/</span>
                  <input
                    type="number"
                    value={approxDebt}
                    onChange={(e) => setApproxDebt(e.target.value)}
                    placeholder="18450"
                    className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-slate-200 text-[20px] font-extrabold text-[#0F3B82] focus:outline-none focus:border-[#0F3B82]"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {['5000', '18450', '35000'].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setApproxDebt(preset)}
                      className={`py-2 px-3 rounded-xl text-[12.5px] font-semibold border transition-all ${
                        approxDebt === preset
                          ? 'bg-[#0F3B82] text-white border-[#0F3B82]'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      S/ {Number(preset).toLocaleString('es-PE')}
                    </button>
                  ))}
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-[12.5px] text-slate-600 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-slate-500">info</span>
                  <span>Podrás editar o detallar cada deuda en cualquier momento.</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div className="flex flex-col gap-5">
              <div>
                <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider block">
                  Capacidad de Pago
                </span>
                <h3 className="text-[22px] font-extrabold text-slate-900 tracking-tight mt-0.5">
                  ¿Cuánto puedes pagar al mes?
                </h3>
                <p className="text-[13px] text-slate-500 mt-1">
                  El monto mensual que puedes destinar a cuotas y amortización sin asfixiar tus gastos diarios.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <div className="relative">
                  <span className="absolute left-4 top-3 text-slate-400 font-bold text-[18px]">S/</span>
                  <input
                    type="number"
                    value={monthlyCapacity}
                    onChange={(e) => setMonthlyCapacity(e.target.value)}
                    placeholder="2350"
                    className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-slate-200 text-[20px] font-extrabold text-emerald-700 focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {['1200', '2350', '3500'].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setMonthlyCapacity(preset)}
                      className={`py-2 px-3 rounded-xl text-[12.5px] font-semibold border transition-all ${
                        monthlyCapacity === preset
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      S/ {Number(preset).toLocaleString('es-PE')} / mes
                    </button>
                  ))}
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-[12.5px] text-emerald-900 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-emerald-700">verified</span>
                  <span>Con S/ {Number(monthlyCapacity || 0).toLocaleString('es-PE')}/mes avanzarás a buen ritmo.</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5 */}
          {step === 5 && (
            <div className="flex flex-col gap-5 text-center my-auto">
              <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-[36px]">verified</span>
              </div>

              <div>
                <h3 className="text-[24px] font-extrabold text-[#0F3B82] tracking-tight">
                  Tu plan financiero está listo
                </h3>
                <p className="text-[14px] text-slate-600 mt-1">
                  Hemos preparado tu centro de control personalizado{userName.trim() ? ` para ${userName.trim()}` : ''}.
                </p>
              </div>

              {/* Summary Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left flex flex-col gap-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 text-[13px]">
                  <span className="text-slate-500">Objetivo:</span>
                  <span className="font-bold text-slate-900">{selectedGoal}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 text-[13px]">
                  <span className="text-slate-500">Deuda calculada:</span>
                  <span className="font-bold text-[#0F3B82]">S/ {Number(approxDebt || 0).toLocaleString('es-PE')}</span>
                </div>
                <div className="flex items-center justify-between text-[13px]">
                  <span className="text-slate-500">Capacidad mensual:</span>
                  <span className="font-bold text-emerald-700">S/ {Number(monthlyCapacity || 0).toLocaleString('es-PE')} / mes</span>
                </div>
              </div>

              <p className="text-[12.5px] text-slate-500 italic">
                “Entiende tus deudas. Organiza tus pagos. Avanza tranquilo.”
              </p>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-3 mt-6">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2.5 rounded-xl text-[14px] font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Atrás
              </button>
            ) : (
              <button
                type="button"
                onClick={closeOnboardingModal}
                className="px-4 py-2.5 rounded-xl text-[13px] font-medium text-slate-400 hover:text-slate-600 transition-colors"
              >
                Saltar
              </button>
            )}

            {step < 5 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="px-6 py-2.5 rounded-xl text-[14px] font-bold bg-[#0F3B82] hover:bg-[#0A295C] text-white shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer active:scale-[0.99]"
              >
                <span>Continuar</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinish}
                className="px-6 py-2.5 rounded-xl text-[14px] font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm hover:shadow transition-all flex items-center gap-2 cursor-pointer active:scale-[0.99]"
              >
                <span>Ir a mi panel</span>
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
