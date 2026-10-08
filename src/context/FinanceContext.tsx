import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Debt,
  Payment,
  FinancialGoal,
  BudgetItem,
  FinancialHealthScore,
  AlertNotification,
  UserProfile,
  TabType,
} from '../types';
import {
  INITIAL_USER,
  INITIAL_DEBTS,
  INITIAL_PAYMENTS,
  INITIAL_GOALS,
  INITIAL_BUDGET_ITEMS,
  INITIAL_HEALTH_SCORE,
  INITIAL_ALERTS,
} from '../data/financeData';

interface ToastState {
  show: boolean;
  title: string;
  message: string;
  type?: 'success' | 'info' | 'warning';
}

interface FinanceContextType {
  user: UserProfile;
  debts: Debt[];
  payments: Payment[];
  goals: FinancialGoal[];
  budgetItems: BudgetItem[];
  healthScore: FinancialHealthScore;
  alerts: AlertNotification[];
  toast: ToastState;
  showToast: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
  hideToast: () => void;
  // Computed values
  totalDebt: number;
  totalInitialDebt: number;
  totalPaidDebt: number;
  debtProgressPercentage: number;
  monthlyPaidAmount: number;
  nextPayment: {
    debtId: string;
    debtName: string;
    institution: string;
    amount: number;
    dueDateFormatted: string;
    daysLeft: number;
  };
  // Modals & UI States
  isRegisterPaymentOpen: boolean;
  preselectedDebtIdForPayment?: string;
  openRegisterPaymentModal: (debtId?: string) => void;
  closeRegisterPaymentModal: () => void;

  isAddDebtOpen: boolean;
  openAddDebtModal: () => void;
  closeAddDebtModal: () => void;

  isAddGoalOpen: boolean;
  openAddGoalModal: () => void;
  closeAddGoalModal: () => void;

  isOnboardingOpen: boolean;
  openOnboardingModal: () => void;
  closeOnboardingModal: () => void;

  selectedDebtForDetail: Debt | null;
  openDebtDetailModal: (debt: Debt) => void;
  closeDebtDetailModal: () => void;

  // Actions
  registerPayment: (paymentData: {
    debtId: string;
    amount: number;
    date: string;
    paymentMethod: Payment['paymentMethod'];
    note?: string;
  }) => void;
  addDebt: (debtData: Omit<Debt, 'id' | 'paidPercentage' | 'daysLeft'>) => void;
  updateDebt: (id: string, updates: Partial<Debt>) => void;
  deleteDebt: (id: string) => void;
  addGoal: (goalData: Omit<FinancialGoal, 'id' | 'percentage'>) => void;
  updateGoalAmount: (id: string, newAmount: number) => void;
  addBudgetItem: (item: Omit<BudgetItem, 'id'>) => void;
  updateUserBudget: (income: number, expenses: number) => void;
  markAlertRead: (id: string) => void;
  dismissAlert: (id: string) => void;
  updateUser: (updates: Partial<UserProfile>) => void;
  resetToDemoData: () => void;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

const LOCAL_STORAGE_KEYS = {
  USER: 'aldia_user_v2',
  DEBTS: 'aldia_debts_v2',
  PAYMENTS: 'aldia_payments_v2',
  GOALS: 'aldia_goals_v2',
  BUDGET: 'aldia_budget_v2',
  ALERTS: 'aldia_alerts_v2',
};

export const FinanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Initial State from localStorage or Defaults
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEYS.USER);
      return stored ? JSON.parse(stored) : INITIAL_USER;
    } catch {
      return INITIAL_USER;
    }
  });

  const [debts, setDebts] = useState<Debt[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEYS.DEBTS);
      return stored ? JSON.parse(stored) : INITIAL_DEBTS;
    } catch {
      return INITIAL_DEBTS;
    }
  });

  const [payments, setPayments] = useState<Payment[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEYS.PAYMENTS);
      return stored ? JSON.parse(stored) : INITIAL_PAYMENTS;
    } catch {
      return INITIAL_PAYMENTS;
    }
  });

  const [goals, setGoals] = useState<FinancialGoal[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEYS.GOALS);
      return stored ? JSON.parse(stored) : INITIAL_GOALS;
    } catch {
      return INITIAL_GOALS;
    }
  });

  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEYS.BUDGET);
      return stored ? JSON.parse(stored) : INITIAL_BUDGET_ITEMS;
    } catch {
      return INITIAL_BUDGET_ITEMS;
    }
  });

  const [alerts, setAlerts] = useState<AlertNotification[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEYS.ALERTS);
      return stored ? JSON.parse(stored) : INITIAL_ALERTS;
    } catch {
      return INITIAL_ALERTS;
    }
  });

  // Modal states
  const [isRegisterPaymentOpen, setIsRegisterPaymentOpen] = useState(false);
  const [preselectedDebtIdForPayment, setPreselectedDebtIdForPayment] = useState<string | undefined>(undefined);
  const [isAddDebtOpen, setIsAddDebtOpen] = useState(false);
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [selectedDebtForDetail, setSelectedDebtForDetail] = useState<Debt | null>(null);

  // Toast state
  const [toast, setToast] = useState<ToastState>({
    show: false,
    title: '',
    message: '',
    type: 'success',
  });

  const showToast = (title: string, message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    setToast({ show: true, title, message, type });
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, show: false }));
  };

  // Synchronize to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.USER, JSON.stringify(user));
    } catch {
      // ignore storage errors
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.DEBTS, JSON.stringify(debts));
    } catch {
      // ignore
    }
  }, [debts]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.PAYMENTS, JSON.stringify(payments));
    } catch {
      // ignore
    }
  }, [payments]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.GOALS, JSON.stringify(goals));
    } catch {
      // ignore
    }
  }, [goals]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.BUDGET, JSON.stringify(budgetItems));
    } catch {
      // ignore
    }
  }, [budgetItems]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.ALERTS, JSON.stringify(alerts));
    } catch {
      // ignore
    }
  }, [alerts]);

  // Toast auto-hide
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        hideToast();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  // Computed metrics
  const totalDebt = debts.reduce((sum, d) => sum + d.currentBalance, 0);
  const totalInitialDebt = debts.reduce((sum, d) => sum + d.initialAmount, 0);
  const totalPaidDebt = Math.max(0, totalInitialDebt - totalDebt);
  const debtProgressPercentage =
    totalInitialDebt > 0 ? Number(((totalPaidDebt / totalInitialDebt) * 100).toFixed(1)) : 0;

  // Monthly paid amount (sum of monthly payments from current debts or 2,350 benchmark)
  const monthlyPaidAmount = debts.reduce((sum, d) => sum + d.monthlyPayment, 0);

  // Next payment: find debt with fewest daysLeft
  const upcomingDebts = [...debts].sort((a, b) => a.daysLeft - b.daysLeft);
  const nextDebt = upcomingDebts[0] || {
    id: 'debt-1',
    name: 'Tarjeta de crédito',
    institution: 'BCP',
    monthlyPayment: 650,
    dueDateFormatted: '12 Oct',
    daysLeft: 5,
  };

  const nextPayment = {
    debtId: nextDebt.id,
    debtName: nextDebt.name,
    institution: nextDebt.institution,
    amount: nextDebt.monthlyPayment,
    dueDateFormatted: nextDebt.dueDateFormatted,
    daysLeft: nextDebt.daysLeft,
  };

  // Dynamic health score calculation
  const debtToIncomeRatio = user.monthlyIncome > 0 ? (totalDebt / (user.monthlyIncome * 12)) : 0.4;
  let dynamicHealthScore = 78;
  if (debtToIncomeRatio < 0.25) dynamicHealthScore = 88;
  else if (debtToIncomeRatio < 0.4) dynamicHealthScore = 78;
  else if (debtToIncomeRatio < 0.6) dynamicHealthScore = 64;
  else dynamicHealthScore = 52;

  const healthScore: FinancialHealthScore = {
    ...INITIAL_HEALTH_SCORE,
    totalScore: dynamicHealthScore,
  };

  // Actions
  const openRegisterPaymentModal = (debtId?: string) => {
    setPreselectedDebtIdForPayment(debtId);
    setIsRegisterPaymentOpen(true);
  };

  const closeRegisterPaymentModal = () => {
    setIsRegisterPaymentOpen(false);
    setPreselectedDebtIdForPayment(undefined);
  };

  const openAddDebtModal = () => setIsAddDebtOpen(true);
  const closeAddDebtModal = () => setIsAddDebtOpen(false);

  const openAddGoalModal = () => setIsAddGoalOpen(true);
  const closeAddGoalModal = () => setIsAddGoalOpen(false);

  const openOnboardingModal = () => setIsOnboardingOpen(true);
  const closeOnboardingModal = () => setIsOnboardingOpen(false);

  const openDebtDetailModal = (debt: Debt) => setSelectedDebtForDetail(debt);
  const closeDebtDetailModal = () => setSelectedDebtForDetail(null);

  const registerPayment = (paymentData: {
    debtId: string;
    amount: number;
    date: string;
    paymentMethod: Payment['paymentMethod'];
    note?: string;
  }) => {
    const targetDebt = debts.find((d) => d.id === paymentData.debtId);
    if (!targetDebt) return;

    const newBalance = Math.max(0, targetDebt.currentBalance - paymentData.amount);
    const newPaidPct =
      targetDebt.initialAmount > 0
        ? Number((((targetDebt.initialAmount - newBalance) / targetDebt.initialAmount) * 100).toFixed(1))
        : 100;

    // Update debt
    setDebts((prev) =>
      prev.map((d) => {
        if (d.id === paymentData.debtId) {
          return {
            ...d,
            currentBalance: newBalance,
            paidPercentage: newPaidPct,
            status: newBalance === 0 ? 'pagado' : d.status,
          };
        }
        return d;
      })
    );

    // Add new payment entry
    const newPayment: Payment = {
      id: `pay-${Date.now()}`,
      debtId: targetDebt.id,
      debtName: targetDebt.name,
      institution: targetDebt.institution,
      amount: paymentData.amount,
      date: paymentData.date,
      paymentMethod: paymentData.paymentMethod,
      note: paymentData.note,
      createdAt: new Date().toISOString(),
    };
    setPayments((prev) => [newPayment, ...prev]);

    // Update corresponding goal if exists
    if (targetDebt.type === 'tarjeta_credito') {
      setGoals((prev) =>
        prev.map((g) => {
          if (g.category === 'salir_deudas') {
            const updatedCurrent = g.currentAmount + paymentData.amount;
            return {
              ...g,
              currentAmount: updatedCurrent,
              percentage: Number(((updatedCurrent / g.targetAmount) * 100).toFixed(1)),
            };
          }
          return g;
        })
      );
    }

    // Add an alert
    const newAlert: AlertNotification = {
      id: `alt-${Date.now()}`,
      type: 'progreso',
      title: '¡Pago registrado exitosamente!',
      message: `Abonaste S/ ${paymentData.amount.toLocaleString('es-PE')} a ${targetDebt.name} (${targetDebt.institution}). Tu saldo bajó a S/ ${newBalance.toLocaleString('es-PE')}.`,
      timeAgo: 'Justo ahora',
      isRead: false,
      targetTab: 'deudas',
    };
    setAlerts((prev) => [newAlert, ...prev]);

    // Show the requested exact toast confirmation
    showToast(
      '¡Pago registrado! 🎉',
      'Tu progreso financiero se actualizó correctamente.',
      'success'
    );

    closeRegisterPaymentModal();
  };

  const addDebt = (debtData: Omit<Debt, 'id' | 'paidPercentage' | 'daysLeft'>) => {
    const paidPct =
      debtData.initialAmount > 0
        ? Number((((debtData.initialAmount - debtData.currentBalance) / debtData.initialAmount) * 100).toFixed(1))
        : 0;

    const newDebt: Debt = {
      ...debtData,
      id: `debt-${Date.now()}`,
      paidPercentage: paidPct,
      daysLeft: Math.max(1, debtData.dueDay - new Date().getDate()),
    };

    setDebts((prev) => [...prev, newDebt]);
    showToast('¡Deuda agregada!', `Se agregó ${newDebt.name} a tu plan de pagos.`, 'success');
    closeAddDebtModal();
  };

  const updateDebt = (id: string, updates: Partial<Debt>) => {
    setDebts((prev) =>
      prev.map((d) => (d.id === id ? { ...d, ...updates } : d))
    );
    showToast('Deuda actualizada', 'Los cambios han sido guardados.', 'info');
  };

  const deleteDebt = (id: string) => {
    const debtToDelete = debts.find((d) => d.id === id);
    setDebts((prev) => prev.filter((d) => d.id !== id));
    showToast('Deuda eliminada', `Se eliminó ${debtToDelete?.name || ''} del listado.`, 'info');
    if (selectedDebtForDetail?.id === id) {
      closeDebtDetailModal();
    }
  };

  const addGoal = (goalData: Omit<FinancialGoal, 'id' | 'percentage'>) => {
    const pct =
      goalData.targetAmount > 0
        ? Number(((goalData.currentAmount / goalData.targetAmount) * 100).toFixed(1))
        : 0;

    const newGoal: FinancialGoal = {
      ...goalData,
      id: `goal-${Date.now()}`,
      percentage: pct,
    };

    setGoals((prev) => [...prev, newGoal]);
    showToast('¡Objetivo creado!', `Tu meta "${newGoal.title}" está en marcha.`, 'success');
    closeAddGoalModal();
  };

  const updateGoalAmount = (id: string, newAmount: number) => {
    setGoals((prev) =>
      prev.map((g) => {
        if (g.id === id) {
          const pct = Number(((newAmount / g.targetAmount) * 100).toFixed(1));
          return { ...g, currentAmount: newAmount, percentage: pct };
        }
        return g;
      })
    );
    showToast('Objetivo actualizado', 'Se registró el avance a tu meta.', 'success');
  };

  const addBudgetItem = (item: Omit<BudgetItem, 'id'>) => {
    const newItem: BudgetItem = {
      ...item,
      id: `b-${Date.now()}`,
    };
    setBudgetItems((prev) => [...prev, newItem]);
    showToast('Presupuesto actualizado', `Se agregó la categoría ${item.category}.`, 'info');
  };

  const updateUserBudget = (income: number, expenses: number) => {
    setUser((prev) => ({
      ...prev,
      monthlyIncome: income,
      monthlyExpenses: expenses,
    }));
    showToast('Presupuesto guardado', 'Se actualizaron tus ingresos y gastos base.', 'success');
  };

  const markAlertRead = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isRead: true } : a))
    );
  };

  const dismissAlert = (id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  const updateUser = (updates: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updates }));
    showToast('Perfil actualizado', 'Tus datos se guardaron correctamente.', 'info');
  };

  const resetToDemoData = () => {
    setUser(INITIAL_USER);
    setDebts(INITIAL_DEBTS);
    setPayments(INITIAL_PAYMENTS);
    setGoals(INITIAL_GOALS);
    setBudgetItems(INITIAL_BUDGET_ITEMS);
    setAlerts(INITIAL_ALERTS);

    localStorage.removeItem(LOCAL_STORAGE_KEYS.USER);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.DEBTS);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.PAYMENTS);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.GOALS);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.BUDGET);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.ALERTS);

    showToast('Datos demo restablecidos', 'Se restablecieron los datos iniciales de Carlos.', 'info');
  };

  return (
    <FinanceContext.Provider
      value={{
        user,
        debts,
        payments,
        goals,
        budgetItems,
        healthScore,
        alerts,
        toast,
        showToast,
        hideToast,
        totalDebt,
        totalInitialDebt,
        totalPaidDebt,
        debtProgressPercentage,
        monthlyPaidAmount,
        nextPayment,
        isRegisterPaymentOpen,
        preselectedDebtIdForPayment,
        openRegisterPaymentModal,
        closeRegisterPaymentModal,
        isAddDebtOpen,
        openAddDebtModal,
        closeAddDebtModal,
        isAddGoalOpen,
        openAddGoalModal,
        closeAddGoalModal,
        isOnboardingOpen,
        openOnboardingModal,
        closeOnboardingModal,
        selectedDebtForDetail,
        openDebtDetailModal,
        closeDebtDetailModal,
        registerPayment,
        addDebt,
        updateDebt,
        deleteDebt,
        addGoal,
        updateGoalAmount,
        addBudgetItem,
        updateUserBudget,
        markAlertRead,
        dismissAlert,
        updateUser,
        resetToDemoData,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
};
