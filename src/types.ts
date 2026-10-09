export type AprendeSubTab =
  | 'articulos'
  | 'videos'
  | 'diccionario'
  | 'mitos'
  | 'casos'
  | 'derechos';

export type TabType =
  | 'inicio'
  | 'deudas'
  | 'calendario'
  | 'orientacion'
  | 'aprende'
  | 'aprende_articulos'
  | 'aprende_videos'
  | 'aprende_diccionario'
  | 'aprende_mitos'
  | 'aprende_casos'
  | 'aprende_derechos'
  | 'categorias_crediticias'
  | 'pagos'
  | 'presupuesto'
  | 'objetivos'
  | 'salud'
  | 'perfil';

export type DebtType =
  | 'tarjeta_credito'
  | 'prestamo_personal'
  | 'credito_vehicular'
  | 'hipoteca'
  | 'credito_estudios'
  | 'otro';

export type DebtStatus = 'al_dia' | 'proximo' | 'se_acerca' | 'pagado' | 'atrasado';

export interface Debt {
  id: string;
  name: string;
  institution: string;
  type: DebtType;
  initialAmount: number;
  currentBalance: number;
  monthlyPayment: number;
  interestRate: number; // TEA o TCEA en %
  dueDateFormatted: string; // ej. '12 Oct'
  dueDay: number; // día del mes (ej. 12)
  daysLeft: number; // días faltantes para el próximo vencimiento
  paidPercentage: number;
  status: DebtStatus;
  notes?: string;
  categoryIcon?: string;
}

export interface Payment {
  id: string;
  debtId: string;
  debtName: string;
  institution: string;
  amount: number;
  date: string; // '2026-10-05'
  paymentMethod: 'Transferencia bancaria' | 'Tarjeta de débito' | 'App del banco' | 'Efectivo en ventanilla' | 'Otro';
  note?: string;
  createdAt: string;
}

export interface FinancialGoal {
  id: string;
  title: string;
  category: 'salir_deudas' | 'ahorro' | 'emergencia' | 'vivienda' | 'viaje' | 'mejorar_finanzas';
  currentAmount: number;
  targetAmount: number;
  percentage: number;
  deadline?: string;
  icon: string;
}

export interface BudgetItem {
  id: string;
  category: 'Vivienda' | 'Alimentación' | 'Transporte' | 'Deudas' | 'Entretenimiento' | 'Otros';
  budgetedAmount: number;
  spentAmount: number;
  color: string;
  icon: string;
}

export interface FinancialHealthScore {
  totalScore: number; // 0 a 100 (ej. 78)
  statusText: string; // 'Vas por buen camino'
  breakdown: {
    nivelDeuda: { score: number; label: string; status: 'Excelente' | 'Bueno' | 'Atención' | 'Crítico'; detail: string };
    capacidadPago: { score: number; label: string; status: 'Excelente' | 'Bueno' | 'Atención' | 'Crítico'; detail: string };
    ahorro: { score: number; label: string; status: 'Excelente' | 'Bueno' | 'Atención' | 'Crítico'; detail: string };
    puntualidad: { score: number; label: string; status: 'Excelente' | 'Bueno' | 'Atención' | 'Crítico'; detail: string };
    presupuesto: { score: number; label: string; status: 'Excelente' | 'Bueno' | 'Atención' | 'Crítico'; detail: string };
  };
  recommendations: {
    id: string;
    priority: 'alta' | 'media' | 'baja';
    title: string;
    description: string;
    actionLabel: string;
    actionTab: TabType;
  }[];
}

export interface AlertNotification {
  id: string;
  type: 'proximo' | 'progreso' | 'atencion' | 'info';
  title: string;
  message: string;
  timeAgo: string;
  isRead: boolean;
  actionText?: string;
  targetTab?: TabType;
}

export interface EducationalArticle {
  id: string;
  category: 'Deudas' | 'Ahorro' | 'Presupuesto' | 'Tarjetas' | 'Intereses' | 'Historial crediticio' | 'Fondo de emergencia' | 'Inversiones';
  title: string;
  shortDesc: string;
  readTime: string;
  badgeColor?: string;
  summary: string;
  keyTakeaway: string;
  sections: {
    title: string;
    paragraphs: string[];
    tips?: string[];
  }[];
}

export interface UserProfile {
  name: string;
  email: string;
  monthlyIncome: number;
  monthlyExpenses: number;
  primaryGoal: string;
  hasSeenOnboarding: boolean;
}

// Educational and Guidance legacy data types
export type SituationId =
  | 'no-puedo-pagar'
  | 'me-atrase'
  | 'me-estan-cobrando'
  | 'no-entiendo-credito'
  | 'quiero-pagar-antes'
  | 'cuidar-historial'
  | 'varias-obligaciones';

export interface SituationItem {
  id: SituationId;
  title: string;
  homeTitle: string;
  homeButtonText: string;
  shortDesc: string;
  subtitle: string;
  icon: string;
  tagColor: string;
  meaning: string;
  whatCanYouDo: string[];
  whatToAvoid: string[];
  practicalAdvice: string;
  officialSource: {
    name: string;
    description: string;
    url: string;
  };
}

export interface VideoItem {
  id: string;
  titulo: string;
  categoria: 'Créditos' | 'Pagos' | 'Cobranzas' | 'Historial' | 'Derechos' | 'Finanzas personales';
  duracion: string;
  fuente: string;
  url: string;
  isFeatured?: boolean;
  descripcion?: string;
}

export interface FinancialTerm {
  id: string;
  term: string;
  definition: string;
  example: string;
  importance: string;
}

export interface MythTruthItem {
  id: string;
  myth: string;
  truth: string;
  explanation: string;
}

export interface PracticalCaseOption {
  id: string;
  text: string;
  isRecommended: boolean;
  feedback: string;
}

export interface PracticalCase {
  id: string;
  character: string;
  title: string;
  situation: string;
  question: string;
  options: PracticalCaseOption[];
  educationalTakeaway: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface OfficialSourceItem {
  id: string;
  name: string;
  fullName: string;
  description: string;
  url: string;
  services: string[];
}

export interface AdvisoryResult {
  title: string;
  whatItMeans: string;
  whatToCheck: string[];
  whatToDo: string[];
  whatToAvoid: string[];
  advice: string;
  officialSource: {
    name: string;
    url: string;
  };
}

export interface RightTopic {
  id: string;
  title: string;
  icon: string;
  summary: string;
  points: string[];
  officialSourceText: string;
  officialSourceUrl: string;
}
