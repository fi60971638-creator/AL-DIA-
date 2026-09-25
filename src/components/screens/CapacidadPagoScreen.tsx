import React, { useState } from 'react';
import { BudgetData, DebtItem } from '../../types';

interface CapacidadPagoScreenProps {
  budget: BudgetData;
  debts: DebtItem[];
  onSaveBudget: (updated: BudgetData) => void;
  onOpenAdvisorChat: (initialQuery?: string) => void;
}

export const CapacidadPagoScreen: React.FC<CapacidadPagoScreenProps> = ({
  budget,
  debts,
  onSaveBudget,
  onOpenAdvisorChat,
}) => {
  // Form inputs
  const [salary, setSalary] = useState(budget.salary.toString());
  const [extraIncome, setExtraIncome] = useState(budget.extraIncome.toString());

  const [housing, setHousing] = useState(budget.housing.toString());
  const [food, setFood] = useState(budget.food.toString());
  const [transport, setTransport] = useState(budget.transport.toString());
  const [services, setServices] = useState(budget.services.toString());
  const [education, setEducation] = useState(budget.education.toString());
  const [otherExpenses, setOtherExpenses] = useState(budget.otherExpenses.toString());

  // Simulador cuota
  const [simulatedQuota, setSimulatedQuota] = useState(budget.simulatedQuota.toString());
  const [showSavedNotification, setShowSavedNotification] = useState(false);

  // Calculations
  const numSalary = parseFloat(salary) || 0;
  const numExtra = parseFloat(extraIncome) || 0;
  const totalIncome = numSalary + numExtra;

  const numHousing = parseFloat(housing) || 0;
  const numFood = parseFloat(food) || 0;
  const numTransport = parseFloat(transport) || 0;
  const numServices = parseFloat(services) || 0;
  const numEducation = parseFloat(education) || 0;
  const numOther = parseFloat(otherExpenses) || 0;
  const totalExpenses = numHousing + numFood + numTransport + numServices + numEducation + numOther;

  // Total cuotas from registered debts
  const totalDebtQuotas = debts.reduce((sum, d) => sum + d.monthlyQuota, 0);

  // Dinero disponible aproximado
  const availableMoney = totalIncome - totalExpenses - totalDebtQuotas;

  // Simulador
  const numSimQuota = parseFloat(simulatedQuota) || 0;
  const availableAfterSim = availableMoney - numSimQuota;

  const handleSave = () => {
    onSaveBudget({
      salary: numSalary,
      extraIncome: numExtra,
      housing: numHousing,
      food: numFood,
      transport: numTransport,
      services: numServices,
      education: numEducation,
      otherExpenses: numOther,
      simulatedQuota: numSimQuota,
    });
    setShowSavedNotification(true);
    setTimeout(() => setShowSavedNotification(false), 2500);
  };

  // Percentage shares for visual chart
  const income100 = totalIncome > 0 ? totalIncome : 1;
  const expensePct = Math.min(100, Math.round((totalExpenses / income100) * 100));
  const debtPct = Math.min(100, Math.round((totalDebtQuotas / income100) * 100));
  const availPct = Math.max(0, 100 - expensePct - debtPct);

  return (
    <div className="flex flex-col w-full px-4 py-3 gap-5 max-w-lg mx-auto pb-28">
      {/* Title */}
      <div>
        <h1 className="font-headline-lg text-[24px] font-bold text-[#131b2e] tracking-tight">
          Capacidad de Pago & Presupuesto
        </h1>
        <p className="font-body-sm text-[12px] text-[#434655]">
          Calcula tu dinero disponible y evalúa nuevas cuotas con responsabilidad
        </p>
      </div>

      {showSavedNotification && (
        <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-[12px] font-bold flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-emerald-600 text-[18px]">check_circle</span>
          <span>Presupuesto actualizado correctamente.</span>
        </div>
      )}

      {/* Main Result Card: Dinero disponible aproximado */}
      <div
        className={`rounded-3xl p-5 border text-white flex flex-col gap-3 shadow-md ${
          availableMoney > 300
            ? 'bg-gradient-to-br from-[#0037b0] to-[#002275] border-[#0037b0]'
            : availableMoney >= 0
            ? 'bg-gradient-to-br from-amber-600 to-amber-800 border-amber-500'
            : 'bg-gradient-to-br from-rose-700 to-rose-900 border-rose-600'
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-[12px] uppercase font-bold tracking-wider text-blue-200/90">
            Resultado del cálculo
          </span>
          <span className="material-symbols-outlined text-[24px] opacity-80">account_balance</span>
        </div>

        <div>
          <span className="text-[13px] text-white/80 block">Dinero disponible aproximado</span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-[20px] font-bold text-blue-200">S/</span>
            <span className="text-[36px] font-black tracking-tight leading-none">
              {availableMoney.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Breakdown bar */}
        <div className="flex flex-col gap-1 pt-1">
          <div className="w-full h-3 rounded-full bg-black/25 overflow-hidden flex">
            <div
              className="bg-amber-400 h-full transition-all"
              style={{ width: `${expensePct}%` }}
              title={`Gastos fijos: ${expensePct}%`}
            ></div>
            <div
              className="bg-rose-400 h-full transition-all"
              style={{ width: `${debtPct}%` }}
              title={`Cuotas de deudas: ${debtPct}%`}
            ></div>
            <div
              className="bg-emerald-400 h-full transition-all"
              style={{ width: `${availPct}%` }}
              title={`Dinero libre: ${availPct}%`}
            ></div>
          </div>

          <div className="flex justify-between text-[10px] text-white/80 pt-0.5">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-400 inline-block"></span>
              Gastos ({expensePct}%)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-rose-400 inline-block"></span>
              Deudas ({debtPct}%)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
              Libre ({availPct}%)
            </span>
          </div>
        </div>

        {/* Dynamic Advice requested in brief */}
        <div className="p-3 rounded-2xl bg-white/15 backdrop-blur-xs text-[12px] leading-relaxed border border-white/20 mt-1">
          {availableMoney <= 150 ? (
            <div className="flex items-start gap-2">
              <span className="material-symbols-outlined text-amber-300 text-[18px]">warning</span>
              <p className="text-amber-100 font-medium">
                “Revisa tu presupuesto antes de asumir nuevas obligaciones.”
              </p>
            </div>
          ) : (
            <div className="flex items-start gap-2">
              <span className="material-symbols-outlined text-emerald-300 text-[18px]">verified</span>
              <p className="text-emerald-100 font-medium">
                “Según la información registrada, tienes dinero disponible después de tus gastos y cuotas actuales. Mantén un fondo para imprevistos.”
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Explicación & Legal Disclaimer */}
      <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200/80 text-[11px] text-[#0037b0] leading-relaxed flex items-start gap-2">
        <span className="material-symbols-outlined text-[18px] text-[#0037b0] mt-0.5 flex-shrink-0">info</span>
        <p>
          <strong>Aviso importante:</strong> Este cálculo es orientativo y depende de la información registrada por el usuario. No representa una evaluación crediticia oficial.
        </p>
      </div>

      {/* 1. SECCIÓN INGRESOS */}
      <div className="rounded-3xl bg-white p-5 border border-[#eaedff] shadow-xs flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-[18px]">payments</span>
            </span>
            <h2 className="font-headline-sm text-[16px] font-bold text-[#131b2e]">
              1. Tus Ingresos Mensuales
            </h2>
          </div>
          <span className="font-label-md text-[14px] font-bold text-emerald-700">
            S/ {totalIncome.toLocaleString()}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div>
            <label className="text-[12px] font-semibold text-[#434655] block mb-1">
              Sueldo principal neto (S/):
            </label>
            <input
              type="number"
              min="0"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#c4c5d7] text-[13px] text-[#131b2e] focus:border-[#0037b0] outline-none font-bold"
            />
          </div>

          <div>
            <label className="text-[12px] font-semibold text-[#434655] block mb-1">
              Ingresos adicionales / extras (S/):
            </label>
            <input
              type="number"
              min="0"
              value={extraIncome}
              onChange={(e) => setExtraIncome(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#c4c5d7] text-[13px] text-[#131b2e] focus:border-[#0037b0] outline-none font-bold"
            />
          </div>
        </div>
      </div>

      {/* 2. SECCIÓN GASTOS BÁSICOS */}
      <div className="rounded-3xl bg-white p-5 border border-[#eaedff] shadow-xs flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
            </span>
            <h2 className="font-headline-sm text-[16px] font-bold text-[#131b2e]">
              2. Tus Gastos Básicos
            </h2>
          </div>
          <span className="font-label-md text-[14px] font-bold text-amber-700">
            S/ {totalExpenses.toLocaleString()}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-1">
          <div>
            <label className="text-[11px] font-semibold text-[#434655] block mb-1">
              Vivienda (alquiler/luz):
            </label>
            <input
              type="number"
              min="0"
              value={housing}
              onChange={(e) => setHousing(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#c4c5d7] text-[13px] text-[#131b2e] focus:border-[#0037b0] outline-none font-semibold"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-[#434655] block mb-1">
              Alimentación mensual:
            </label>
            <input
              type="number"
              min="0"
              value={food}
              onChange={(e) => setFood(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#c4c5d7] text-[13px] text-[#131b2e] focus:border-[#0037b0] outline-none font-semibold"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-[#434655] block mb-1">
              Transporte / Pasajes:
            </label>
            <input
              type="number"
              min="0"
              value={transport}
              onChange={(e) => setTransport(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#c4c5d7] text-[13px] text-[#131b2e] focus:border-[#0037b0] outline-none font-semibold"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-[#434655] block mb-1">
              Servicios (Agua, luz, cel):
            </label>
            <input
              type="number"
              min="0"
              value={services}
              onChange={(e) => setServices(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#c4c5d7] text-[13px] text-[#131b2e] focus:border-[#0037b0] outline-none font-semibold"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-[#434655] block mb-1">
              Educación / Estudios:
            </label>
            <input
              type="number"
              min="0"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#c4c5d7] text-[13px] text-[#131b2e] focus:border-[#0037b0] outline-none font-semibold"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-[#434655] block mb-1">
              Otros gastos / imprevistos:
            </label>
            <input
              type="number"
              min="0"
              value={otherExpenses}
              onChange={(e) => setOtherExpenses(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#c4c5d7] text-[13px] text-[#131b2e] focus:border-[#0037b0] outline-none font-semibold"
            />
          </div>
        </div>
      </div>

      {/* 3. SECCIÓN CUOTAS DE DEUDAS */}
      <div className="rounded-3xl bg-white p-5 border border-[#eaedff] shadow-xs flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-[18px]">credit_card</span>
            </span>
            <h2 className="font-headline-sm text-[16px] font-bold text-[#131b2e]">
              3. Cuotas de tus Deudas
            </h2>
          </div>
          <span className="font-label-md text-[14px] font-bold text-rose-700">
            S/ {totalDebtQuotas.toLocaleString()}
          </span>
        </div>

        <div className="flex flex-col gap-1.5 pt-1">
          {debts.map((d) => (
            <div
              key={d.id}
              className="p-2.5 rounded-xl bg-[#faf8ff] border border-[#eaedff] flex items-center justify-between text-[12px]"
            >
              <span className="font-medium text-[#131b2e]">
                {d.entity} ({d.type})
              </span>
              <span className="font-bold text-[#0037b0]">
                S/ {d.monthlyQuota.toLocaleString()} / mes
              </span>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="mt-2 w-full py-2.5 rounded-xl bg-[#0037b0] text-white font-label-md text-[13px] font-bold hover:bg-[#002f99] active:scale-95 transition-all shadow-xs cursor-pointer"
        >
          Guardar mi presupuesto
        </button>
      </div>

      {/* 11. SIMULADOR DE NUEVA CUOTA (Section 11 in brief) */}
      <div className="rounded-3xl bg-gradient-to-br from-indigo-50 via-white to-blue-50 p-5 border border-indigo-200 shadow-sm flex flex-col gap-3.5">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-2xl bg-[#0037b0] text-white flex items-center justify-center font-bold">
            <span className="material-symbols-outlined text-[20px]">sim_card_download</span>
          </div>
          <div>
            <h2 className="font-headline-sm text-[17px] font-bold text-[#131b2e]">
              Simulador de Nueva Cuota
            </h2>
            <p className="text-[11px] text-[#434655]">
              ¿Estás pensando en solicitar o asumir un nuevo compromiso?
            </p>
          </div>
        </div>

        <div>
          <label className="text-[12px] font-semibold text-[#131b2e] block mb-1">
            Nueva cuota mensual que pagarías (S/):
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-[#0037b0] font-bold text-[14px]">S/</span>
            <input
              type="number"
              min="0"
              step="10"
              placeholder="250"
              value={simulatedQuota}
              onChange={(e) => setSimulatedQuota(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#0037b0] bg-white text-[15px] font-bold text-[#131b2e] focus:ring-1 focus:ring-[#0037b0] outline-none"
            />
          </div>
        </div>

        {/* Comparativa: Disponible actual vs Disponible después */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <div className="p-3.5 rounded-2xl bg-white border border-[#eaedff] text-center shadow-xs">
            <span className="text-[11px] text-[#747686] block">Disponible actual</span>
            <span className="font-headline-sm text-[18px] font-extrabold text-[#0037b0] block mt-0.5">
              S/ {availableMoney.toLocaleString()}
            </span>
          </div>

          <div
            className={`p-3.5 rounded-2xl border text-center shadow-xs ${
              availableAfterSim >= 150
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-rose-50 border-rose-200 text-rose-900'
            }`}
          >
            <span className="text-[11px] font-semibold block">Disponible después</span>
            <span className="font-headline-sm text-[18px] font-extrabold block mt-0.5">
              S/ {availableAfterSim.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Required orientation text */}
        <div className="p-3 rounded-2xl bg-white border border-indigo-200 text-[12px] leading-relaxed text-[#131b2e]">
          <p className="font-medium text-[#0037b0] mb-1">
            “Revisa si esta nueva obligación sería sostenible considerando tus gastos y pagos actuales.”
          </p>
          <p className="text-[11px] text-[#747686]">
            Nota: AlDía no evalúa ni aprueba créditos bancarios. Este cálculo es únicamente para tu planeamiento personal.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            onOpenAdvisorChat(
              `Quiero saber si me conviene asumir una nueva cuota de S/ ${simulatedQuota} considerando mi dinero disponible.`
            )
          }
          className="w-full py-2.5 rounded-xl bg-indigo-600 text-white text-[12px] font-bold hover:bg-indigo-700 active:scale-95 transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">support_agent</span>
          <span>Consultar al Asesor AlDía sobre esta cuota</span>
        </button>
      </div>
    </div>
  );
};
