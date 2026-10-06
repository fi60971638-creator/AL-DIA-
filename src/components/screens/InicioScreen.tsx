import React from 'react';
import { TabType, DebtItem, QuotaItem, UserProfile } from '../../types';
import { APP_NAME, APP_SLOGAN } from '../../data/initialData';

interface InicioScreenProps {
  user: UserProfile;
  debts: DebtItem[];
  quotas: QuotaItem[];
  onNavigate: (tab: TabType) => void;
  onPayQuota: (quota: QuotaItem) => void;
  onViewDebtDetail: (debt: DebtItem) => void;
  onOpenAddDebt: () => void;
  onOpenAdmin?: () => void;
}

export const InicioScreen: React.FC<InicioScreenProps> = ({
  user,
  debts,
  quotas,
  onNavigate,
  onPayQuota,
  onViewDebtDetail,
  onOpenAddDebt,
}) => {
  const totalBalance = debts.reduce((sum, d) => sum + d.balance, 0);
  const activeDebtsCount = debts.filter((d) => d.balance > 0).length;

  // Identify overdue quota or earliest upcoming quota
  const overdueQuota = quotas.find((q) => q.status === 'overdue');
  const pendingQuotas = quotas.filter((q) => q.status === 'pending');
  const nextQuota = overdueQuota || pendingQuotas[0] || quotas[0];

  // Matched debt for next quota
  const nextDebt = nextQuota
    ? debts.find((d) => d.id === nextQuota.debtId || d.entity === nextQuota.entity) || debts[0]
    : debts[0];

  const isOverdue = nextQuota?.status === 'overdue' || nextDebt?.status === 'atrasado';

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto px-4 sm:px-6 py-5 gap-6 pb-24 md:pb-12">
      {/* 1. Header Minimalista */}
      <div className="flex flex-col gap-1">
        <h1 className="text-[26px] sm:text-[28px] font-bold text-[#0F3D56] tracking-tight">
          {APP_NAME}
        </h1>
        <p className="text-[14px] text-[#6B7280]">
          {APP_SLOGAN}
        </p>
      </div>

      {/* 2. Total Pendiente (El dato visual más importante) */}
      <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl p-5 sm:p-6 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-[13px] font-medium text-[#6B7280]">
            Total pendiente
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-[26px] sm:text-[30px] font-bold text-[#25313C] tracking-tight">
              S/ {totalBalance.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
          <span className="text-[13px] text-[#6B7280]">
            {activeDebtsCount === 1 ? '1 deuda activa' : `${activeDebtsCount} deudas activas`}
          </span>
        </div>

        <div>
          <button
            type="button"
            onClick={onOpenAddDebt}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#0F3D56] hover:bg-[#0c2f42] active:scale-[0.99] text-white text-[14px] font-medium transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>Agregar deuda</span>
          </button>
        </div>
      </div>

      {/* 3. Próximo Pago / Pago Vencido */}
      {nextDebt && nextQuota ? (
        <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl p-5 sm:p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span
              className={`text-[13px] font-semibold ${
                isOverdue ? 'text-[#D64545]' : 'text-[#6B7280]'
              }`}
            >
              {isOverdue ? 'Pago vencido' : 'Próximo pago'}
            </span>

            <span
              className={`text-[12px] font-medium px-2 py-0.5 rounded ${
                isOverdue
                  ? 'bg-rose-50 text-[#D64545]'
                  : nextDebt.status === 'proximo'
                  ? 'bg-amber-50 text-[#D99A24]'
                  : 'bg-emerald-50 text-[#149B8A]'
              }`}
            >
              {isOverdue
                ? 'Vencido'
                : nextDebt.status === 'proximo'
                ? 'Próximo a vencer'
                : 'Al día'}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <h3 className="text-[18px] font-bold text-[#25313C]">
              {nextDebt.entity}
            </h3>
            <div className="flex items-center gap-2 text-[14px] text-[#25313C]">
              <span>Cuota:</span>
              <span className="font-semibold">
                S/ {nextQuota.amount.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[13px] text-[#6B7280]">
              <span>Vence:</span>
              <span>{nextQuota.dueDate || nextDebt.dueDate}</span>
              {nextQuota.daysRemaining !== undefined && !isOverdue && (
                <span>• Faltan {nextQuota.daysRemaining} días</span>
              )}
              {isOverdue && nextQuota.daysLate && (
                <span className="text-[#D64545] font-medium">• Venció hace {nextQuota.daysLate} días</span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            {isOverdue ? (
              <button
                type="button"
                onClick={() => onPayQuota(nextQuota)}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-[#149B8A] hover:bg-[#107d6f] text-white text-[14px] font-medium transition-colors cursor-pointer"
              >
                <span>Registrar pago</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onViewDebtDetail(nextDebt)}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-[#FFFFFF] border border-[#E5E7EB] hover:bg-[#F7F8FA] text-[#25313C] text-[14px] font-medium transition-colors cursor-pointer"
              >
                <span>Ver detalle</span>
              </button>
            )}

            {!isOverdue && (
              <button
                type="button"
                onClick={() => onPayQuota(nextQuota)}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-[#149B8A] hover:bg-[#107d6f] text-white text-[14px] font-medium transition-colors cursor-pointer"
              >
                <span>Registrar pago</span>
              </button>
            )}
          </div>
        </div>
      ) : null}

      {/* 4. Lista Limpia "Mis deudas" */}
      <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl p-5 sm:p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#E5E7EB]">
          <h2 className="text-[16px] font-bold text-[#0F3D56]">
            Mis deudas
          </h2>
          <button
            type="button"
            onClick={() => onNavigate('mis-deudas')}
            className="text-[13px] text-[#149B8A] hover:underline font-medium cursor-pointer"
          >
            Ver todas
          </button>
        </div>

        {debts.length === 0 ? (
          <div className="py-6 text-center text-[#6B7280] text-[14px] flex flex-col items-center gap-2">
            <span>No tienes deudas registradas en este momento.</span>
            <button
              onClick={onOpenAddDebt}
              className="text-[#149B8A] font-semibold text-[13px] hover:underline"
            >
              + Agregar tu primera deuda
            </button>
          </div>
        ) : (
          <div className="divide-y divide-[#E5E7EB]">
            {debts.map((debt) => (
              <div
                key={debt.id}
                onClick={() => onViewDebtDetail(debt)}
                className="py-3 flex items-center justify-between hover:bg-[#F7F8FA] px-2 rounded-lg transition-colors cursor-pointer"
              >
                <div className="flex flex-col min-w-0">
                  <span className="text-[14px] font-medium text-[#25313C] truncate">
                    {debt.entity}
                  </span>
                  <span className="text-[12px] text-[#6B7280]">
                    {debt.type}
                  </span>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <span className="text-[14px] font-bold text-[#25313C] block">
                      S/ {debt.balance.toLocaleString('es-PE', { minimumFractionDigits: 0 })}
                    </span>
                    <span
                      className={`text-[11px] font-medium block ${
                        debt.status === 'atrasado'
                          ? 'text-[#D64545]'
                          : debt.status === 'proximo'
                          ? 'text-[#D99A24]'
                          : 'text-[#149B8A]'
                      }`}
                    >
                      {debt.statusLabel || (debt.status === 'al_dia' ? 'Al día' : debt.status === 'proximo' ? 'Próximo' : 'Atrasado')}
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-[18px] text-[#6B7280]">
                    chevron_right
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
