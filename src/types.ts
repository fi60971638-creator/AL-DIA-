export type TabType =
  | 'bienvenida'
  | 'registro'
  | 'inicio'
  | 'mis-deudas'
  | 'calendario'
  | 'capacidad'
  | 'educacion'
  | 'asesor';

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  isLoggedIn: boolean;
}

export interface DebtItem {
  id: string;
  entity: string;
  entityType: 'Banco' | 'Caja' | 'Financiera' | 'Cooperativa' | 'Comercio' | 'Otra';
  type:
    | 'Crédito personal'
    | 'Tarjeta de crédito'
    | 'Crédito vehicular'
    | 'Crédito hipotecario'
    | 'Crédito para negocio'
    | 'Otro';
  initialAmount: number;
  paidAmount: number;
  balance: number; // Saldo pendiente
  monthlyQuota: number; // Cuota mensual
  dueDate: string; // ej. "30 de septiembre" o "30/09/2026"
  dueDateDay: number; // día del mes para calendario
  pendingQuotas: number;
  totalQuotas: number;
  interestRate?: number; // TEA opcional %
  status: 'al_dia' | 'proximo' | 'atrasado';
  statusLabel: string;
  notes?: string;
  iconName: string;
}

export interface QuotaItem {
  id: string;
  debtId?: string;
  entity: string;
  debtType?: string;
  quotaNumber: string; // ej. "Cuota 03/12"
  amount: number;
  dueDate: string; // ej. "30/09/2026"
  dueDateDay: number; // 1-31
  month: string; // ej. "2026-09"
  status: 'paid' | 'pending' | 'overdue';
  statusLabel: string;
  operationNumber?: string;
  paidDate?: string;
  daysLate?: number;
  daysRemaining?: number;
  hasReminder?: boolean;
}

export interface AdvisoryPoint {
  title: string;
  desc: string;
}

export interface AdvisoryTopic {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  tagColor: string;
  fullTitle: string;
  empathy: string;
  points: AdvisoryPoint[];
}

export interface NotificationItem {
  id: string;
  title: string;
  desc: string;
  time: string;
  read: boolean;
  type: 'alert' | 'success' | 'info' | 'warning';
}

export interface BudgetData {
  salary: number;
  extraIncome: number;
  housing: number;
  food: number;
  transport: number;
  services: number;
  education: number;
  otherExpenses: number;
  simulatedQuota: number;
}

export interface ReminderConfig {
  days7: boolean;
  days3: boolean;
  days1: boolean;
  enabled: boolean;
}
