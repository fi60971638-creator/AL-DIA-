import React, { useState } from 'react';
import { useFinance } from '../../context/FinanceContext';

export const PerfilScreen: React.FC = () => {
  const {
    user,
    updateUser,
    resetToDemoData,
    openOnboardingModal,
    debts,
    totalDebt,
    payments,
    goals,
  } = useFinance();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [income, setIncome] = useState(user.monthlyIncome.toString());
  const [expenses, setExpenses] = useState(user.monthlyExpenses.toString());
  const [primaryGoal, setPrimaryGoal] = useState(user.primaryGoal);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      name: name.trim(),
      email: email.trim(),
      monthlyIncome: parseFloat(income) || 5500,
      monthlyExpenses: parseFloat(expenses) || 3150,
      primaryGoal,
    });
  };

  const handleDownloadReport = () => {
    const reportData = {
      usuario: user.name || 'Usuario',
      fechaReporte: new Date().toLocaleDateString('es-PE'),
      deudaTotal: totalDebt,
      deudas: debts.map((d) => ({
        nombre: d.name,
        entidad: d.institution,
        saldo: d.currentBalance,
        cuota: d.monthlyPayment,
        tcea: `${d.interestRate}%`,
        vencimiento: d.dueDateFormatted,
      })),
      pagosRegistrados: payments.length,
      objetivosActivos: goals.map((g) => ({
        meta: g.title,
        acumulado: g.currentAmount,
        objetivo: g.targetAmount,
        progreso: `${g.percentage}%`,
      })),
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = user.name?.trim()
      ? `reporte-financiero-aldia-${user.name.trim().toLowerCase()}.json`
      : 'reporte-financiero-aldia.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-[12px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
            Configuración Personal
          </span>
        </div>
        <h1 className="text-[26px] sm:text-[32px] font-extrabold text-[#0F172A] tracking-tight mt-1">
          Mi perfil financiero
        </h1>
        <p className="text-[14px] text-slate-500">
          Administra tus datos, objetivos y herramientas de demostración.
        </p>
      </div>

      {/* Profile Card Summary */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#0F3B82] to-emerald-600 text-white font-extrabold text-[24px] flex items-center justify-center shadow-sm">
            {user.name?.trim() ? (
              user.name.trim().charAt(0).toUpperCase()
            ) : (
              <span className="material-symbols-outlined text-[28px]">person</span>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-[20px] font-bold text-slate-900">
                {user.name?.trim() || 'Mi cuenta'}
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                Plan Personal AlDía
              </span>
            </div>
            <p className="text-[13px] text-slate-500 mt-0.5">
              {user.email ? `${user.email} · ` : ''}Objetivo: {user.primaryGoal}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <button
            onClick={openOnboardingModal}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[12.5px] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[17px]">restart_alt</span>
            <span>Repetir Onboarding</span>
          </button>

          <button
            onClick={handleDownloadReport}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[12.5px] transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <span className="material-symbols-outlined text-[17px]">download</span>
            <span>Descargar reporte</span>
          </button>
        </div>
      </div>

      {/* Edit Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs">
        <h3 className="text-[18px] font-extrabold text-slate-900 mb-4">
          Datos de usuario y capacidad financiera
        </h3>

        <form onSubmit={handleSave} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                Nombre de usuario
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-[14px] font-semibold focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                Correo electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-[14px] focus:outline-none focus:border-emerald-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                Ingresos netos mensuales (S/)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-slate-400 font-semibold text-[14px]">S/</span>
                <input
                  type="number"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-[14px] font-bold focus:outline-none focus:border-emerald-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                Gastos fijos base (S/)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-slate-400 font-semibold text-[14px]">S/</span>
                <input
                  type="number"
                  value={expenses}
                  onChange={(e) => setExpenses(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-[14px] font-bold focus:outline-none focus:border-emerald-600"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
              Objetivo principal
            </label>
            <select
              value={primaryGoal}
              onChange={(e) => setPrimaryGoal(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-[14px] focus:outline-none focus:border-emerald-600 bg-white"
            >
              <option value="Salir de deudas">Salir de deudas</option>
              <option value="Organizar mis pagos">Organizar mis pagos</option>
              <option value="Ahorrar">Ahorrar</option>
              <option value="Controlar mis gastos">Controlar mis gastos</option>
              <option value="Mejorar mis finanzas">Mejorar mis finanzas</option>
            </select>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#0F3B82] hover:bg-[#0A295C] text-white font-bold text-[13px] shadow-2xs transition-colors cursor-pointer"
            >
              Guardar perfil
            </button>
          </div>
        </form>
      </div>

      {/* Demo Data Management */}
      <div className="bg-slate-50 rounded-3xl p-6 sm:p-7 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-[16px] font-bold text-slate-900">
            Datos de demostración
          </h4>
          <p className="text-[13px] text-slate-500 mt-0.5 max-w-lg leading-relaxed">
            Si deseas reiniciar los valores predeterminados (S/ 18,450 en deudas, 78/100 de salud financiera), puedes restablecerlos en cualquier momento.
          </p>
        </div>

        <button
          onClick={() => {
            if (window.confirm('¿Deseas restablecer todos los datos al estado de demostración inicial?')) {
              resetToDemoData();
            }
          }}
          className="px-4 py-2.5 rounded-xl bg-white hover:bg-rose-50 text-rose-700 hover:text-rose-800 border border-slate-200 hover:border-rose-200 font-bold text-[12.5px] transition-colors shrink-0 cursor-pointer flex items-center gap-1.5"
        >
          <span className="material-symbols-outlined text-[17px]">history</span>
          <span>Restablecer datos demo</span>
        </button>
      </div>

      {/* Privacy Guarantee */}
      <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-[12.5px] text-emerald-950 flex items-center gap-3">
        <span className="material-symbols-outlined text-[20px] text-emerald-700 shrink-0">
          shield
        </span>
        <span>
          <strong>Privacidad garantizada:</strong> AlDía nunca solicita claves de cajero, tokens bancarios ni contraseñas secretas. Tus datos se procesan de forma privada y segura en tu navegador.
        </span>
      </div>
    </div>
  );
};
