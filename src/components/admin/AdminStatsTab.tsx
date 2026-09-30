import React, { useState } from 'react';
import { AdminUserRecord } from '../../types';

interface AdminStatsTabProps {
  users: AdminUserRecord[];
}

export const AdminStatsTab: React.FC<AdminStatsTabProps> = ({ users }) => {
  const [timeRange, setTimeRange] = useState<'Este Mes' | 'Último Trimestre' | 'Año 2026'>('Este Mes');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Computed metrics
  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.status === 'Activo').length;
  const totalPortfolioBalance = users.reduce((acc, u) => acc + u.totalBalance, 0);
  const totalDebtsCount = users.reduce((acc, u) => acc + u.totalDebts, 0);
  const usersWithOverdue = users.filter((u) => u.delinquentCount > 0).length;
  const onTimePercentage = totalUsers > 0 ? Math.round(((totalUsers - usersWithOverdue) / totalUsers) * 100) : 100;

  const handleExportReport = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3500);
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Top Banner & Range Filter */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
        <div>
          <h3 className="font-headline-sm text-[16px] font-bold text-slate-900">
            Métricas Globales de la Plataforma AlDía
          </h3>
          <p className="text-[12px] text-slate-500">
            Monitoreo en tiempo real de usuarios, pagos cumplidos y cartera financiera.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
            {(['Este Mes', 'Último Trimestre', 'Año 2026'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1.5 rounded-lg text-[12px] font-bold transition-all cursor-pointer ${
                  timeRange === range
                    ? 'bg-white text-[#0037b0] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          <button
            onClick={handleExportReport}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 active:scale-95 text-white font-label-md text-[12px] font-bold shadow-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">file_download</span>
            <span>Exportar</span>
          </button>
        </div>
      </div>

      {downloadSuccess && (
        <div className="p-3.5 rounded-2xl bg-emerald-500 text-white font-bold text-[13px] flex items-center gap-2 shadow-lg animate-in slide-in-from-top duration-200">
          <span className="material-symbols-outlined text-[20px]">check_circle</span>
          <span>Reporte gerencial generado (AlDia_Reporte_Estadistico_{timeRange.replace(/\s+/g, '_')}.xlsx)</span>
        </div>
      )}

      {/* 4 Main KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Cartera Administrada
            </span>
            <span className="material-symbols-outlined text-[#0037b0] text-[20px]">account_balance</span>
          </div>
          <div className="mt-2">
            <span className="text-[12px] font-bold text-[#0037b0] mr-1">S/</span>
            <span className="text-[22px] font-black text-slate-900">
              {totalPortfolioBalance.toLocaleString()}
            </span>
          </div>
          <div className="mt-1 flex items-center text-[11px] text-emerald-600 font-bold">
            <span className="material-symbols-outlined text-[15px]">trending_up</span>
            <span>+14.8% vs mes previo</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Tasa Cumplimiento
            </span>
            <span className="material-symbols-outlined text-emerald-600 text-[20px]">verified</span>
          </div>
          <div className="mt-2">
            <span className="text-[22px] font-black text-emerald-700">{onTimePercentage}%</span>
          </div>
          <div className="mt-1 flex items-center text-[11px] text-emerald-600 font-bold">
            <span className="material-symbols-outlined text-[15px]">check</span>
            <span>{totalUsers - usersWithOverdue} de {totalUsers} al día</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Usuarios Activos
            </span>
            <span className="material-symbols-outlined text-purple-600 text-[20px]">group</span>
          </div>
          <div className="mt-2">
            <span className="text-[22px] font-black text-slate-900">{activeUsers}</span>
            <span className="text-[12px] text-slate-400 font-medium ml-1">/ {totalUsers} total</span>
          </div>
          <div className="mt-1 flex items-center text-[11px] text-blue-600 font-bold">
            <span className="material-symbols-outlined text-[15px]">person_add</span>
            <span>+28 nuevos esta semana</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Consultas Bot IA
            </span>
            <span className="material-symbols-outlined text-amber-600 text-[20px]">smart_toy</span>
          </div>
          <div className="mt-2">
            <span className="text-[22px] font-black text-slate-900">4,812</span>
          </div>
          <div className="mt-1 flex items-center text-[11px] text-emerald-600 font-bold">
            <span className="material-symbols-outlined text-[15px]">schedule</span>
            <span>100% 24/7 disponible</span>
          </div>
        </div>
      </div>

      {/* Visual Analytics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Entidades Financieras Más Frecuentes */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-slate-900 text-[14px] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#0037b0] text-[18px]">pie_chart</span>
              Distribución por Entidad Financiera
            </h4>
            <span className="text-[11px] text-slate-400">Perú</span>
          </div>

          <div className="flex flex-col gap-3">
            <div>
              <div className="flex justify-between text-[12px] font-bold mb-1">
                <span className="text-slate-700">BCP (Banco de Crédito del Perú)</span>
                <span className="text-slate-900">38% (S/ 18,500)</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-[#0037b0] h-full rounded-full" style={{ width: '38%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[12px] font-bold mb-1">
                <span className="text-slate-700">BBVA Perú</span>
                <span className="text-slate-900">24% (S/ 11,800)</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full rounded-full" style={{ width: '24%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[12px] font-bold mb-1">
                <span className="text-slate-700">Cajas Municipales (Arequipa / Cusco / Piura)</span>
                <span className="text-slate-900">20% (S/ 9,700)</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '20%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[12px] font-bold mb-1">
                <span className="text-slate-700">Tarjetas de Tiendas (Ripley / Falabella)</span>
                <span className="text-slate-900">18% (S/ 8,650)</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: '18%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Salud Crediticia de la Cartera */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-slate-900 text-[14px] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-emerald-600 text-[18px]">health_and_safety</span>
              Estado de Salud Crediticia SBS
            </h4>
            <span className="text-[11px] text-slate-400">Calificaciones</span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center my-auto">
            <div className="bg-emerald-50 p-3.5 rounded-xl border border-emerald-100">
              <span className="text-[20px] font-black text-emerald-700 block">76%</span>
              <span className="text-[11px] font-bold text-emerald-800">Normal (Al día)</span>
              <span className="text-[10px] text-emerald-600 block mt-0.5">0 días mora</span>
            </div>

            <div className="bg-amber-50 p-3.5 rounded-xl border border-amber-100">
              <span className="text-[20px] font-black text-amber-700 block">16%</span>
              <span className="text-[11px] font-bold text-amber-800">CPP (Con Problemas)</span>
              <span className="text-[10px] text-amber-600 block mt-0.5">1-30 días mora</span>
            </div>

            <div className="bg-rose-50 p-3.5 rounded-xl border border-rose-100">
              <span className="text-[20px] font-black text-rose-700 block">8%</span>
              <span className="text-[11px] font-bold text-rose-800">Deficiente / Pérdida</span>
              <span className="text-[10px] text-rose-600 block mt-0.5">&gt;30 días mora</span>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
            <span>AlDía ayuda a los usuarios CPP a volver a calificación Normal</span>
            <span className="font-bold text-[#0037b0]">SBS Normativa</span>
          </div>
        </div>
      </div>
    </div>
  );
};
