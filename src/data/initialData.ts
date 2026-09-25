import { DebtItem, QuotaItem, AdvisoryTopic, NotificationItem, BudgetData, ReminderConfig, UserProfile } from '../types';

export const APP_NAME = 'AlDía';
export const APP_SLOGAN = 'Entiende tus deudas. Organiza tus pagos. Avanza tranquilo.';

export const APP_LOGO_URL =
  'https://lh3.googleusercontent.com/aida/AEtjO1VH6JBh4DoiJT6QG365oqtBFHPtnOFhj3Tgnbqj1z7FPScMgLbKmLfqEavGh3Nv0WG5cTrR4VtFQ1f2yIbS7l2-50a3-WfihTvhLaT_ByIhkE_MP2lA5w73EPJvhylYeqg_URQuG_Jyw_UUcvtjoVzMn9yNw430CVczaorIZmnaVacJrHkV_vqhYKMG-SxD9DdtO-gKFCtVip8Hx-TW87sw01PhOtUDT7TwOJnDHUyy91m40Fh2W3Erijs1';

export const PIGGY_BANK_IMG_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBwmra63VSe-6ZrRops3QlO9eW_3GeNeQ_wzN8gHmn1DUPnKv9-ikOcLCJ4yxPALxpu_yWqKkl5KP34GXzBfA08eUqAx9f0-JUFKHFMwdoHsL3azjOxRHjEFcbjQIrPR0QSUJUJLdUWKpvthyjg526pH2CLx78FUJwfLI6QK6YxgEfjJrzRcBzztKjqUwXvd10u_dMcFbqYm0kZbsvUjVYTFq8nU9ZtY8DdHSzLNYQ-sxTuzCuurKmOeA';

export const ADVISOR_PHOTO_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDcqth5f6ymCZ0lFUPiYSajPMMjvQNfIn6PMbiIqsj1vpt09qyvCiporXbOYFiXpFKW62DQeGMmH9L-UyOStPwR4KEgL3RHMZ_IsHrw46Bf_Z-veuDT-O44D_fC4gWSYZ5nH4l5WAotPUp9dBoYCeo0rgD6wRwT-QYsQeq7UreCotv4GLjjOog4LNi99xaO3ZivLBgPSiD0A92wPDGcECs52DZ1I6IxYZicusEfC7tLTojdT1oM0uvlLw';

export const INITIAL_USER: UserProfile = {
  name: 'Carlos Mendoza',
  email: 'carlos.mendoza@correo.com',
  phone: '987 654 321',
  isLoggedIn: true,
};

export const INITIAL_DEBTS: DebtItem[] = [
  {
    id: 'debt-1',
    entity: 'Banco Principal',
    entityType: 'Banco',
    type: 'Crédito personal',
    initialAmount: 3500,
    paidAmount: 2100,
    balance: 1400,
    monthlyQuota: 350,
    dueDate: '30 de septiembre',
    dueDateDay: 30,
    pendingQuotas: 4,
    totalQuotas: 10,
    interestRate: 24.5,
    status: 'proximo',
    statusLabel: 'Próximo a vencer',
    iconName: 'account_balance',
    notes: 'Próximo vencimiento en 5 días. Mantener puntualidad para buena calificación.',
  },
  {
    id: 'debt-2',
    entity: 'Caja Arequipa',
    entityType: 'Caja',
    type: 'Crédito personal',
    initialAmount: 2400,
    paidAmount: 800,
    balance: 1600,
    monthlyQuota: 200,
    dueDate: '05 de octubre',
    dueDateDay: 5,
    pendingQuotas: 8,
    totalQuotas: 12,
    interestRate: 28.0,
    status: 'al_dia',
    statusLabel: 'Al día',
    iconName: 'savings',
    notes: 'Pagos al día sin moras.',
  },
  {
    id: 'debt-3',
    entity: 'Financiera Impulso',
    entityType: 'Financiera',
    type: 'Crédito para negocio',
    initialAmount: 3000,
    paidAmount: 2000,
    balance: 1000,
    monthlyQuota: 180,
    dueDate: '15 de octubre',
    dueDateDay: 15,
    pendingQuotas: 6,
    totalQuotas: 18,
    interestRate: 22.0,
    status: 'al_dia',
    statusLabel: 'Al día',
    iconName: 'storefront',
    notes: 'Crédito de capital de trabajo.',
  },
  {
    id: 'debt-4',
    entity: 'Tienda Ripley / Tarjeta',
    entityType: 'Comercio',
    type: 'Tarjeta de crédito',
    initialAmount: 1200,
    paidAmount: 350,
    balance: 850,
    monthlyQuota: 150,
    dueDate: '10 de septiembre',
    dueDateDay: 10,
    pendingQuotas: 6,
    totalQuotas: 8,
    interestRate: 59.9,
    status: 'atrasado',
    statusLabel: 'Atrasado',
    iconName: 'credit_card',
    notes: 'Cuota vencida hace unos días. Se recomienda contactar a la entidad o reprogramar.',
  },
];

export const INITIAL_QUOTAS: QuotaItem[] = [
  {
    id: 'quota-1',
    debtId: 'debt-1',
    entity: 'Banco Principal',
    debtType: 'Crédito personal',
    quotaNumber: 'Cuota 07/10',
    amount: 350,
    dueDate: '30/09/2026',
    dueDateDay: 30,
    month: '2026-09',
    status: 'pending',
    statusLabel: 'Próxima',
    daysRemaining: 5,
    hasReminder: true,
  },
  {
    id: 'quota-2',
    debtId: 'debt-4',
    entity: 'Tienda Ripley / Tarjeta',
    debtType: 'Tarjeta de crédito',
    quotaNumber: 'Cuota 03/08',
    amount: 150,
    dueDate: '10/09/2026',
    dueDateDay: 10,
    month: '2026-09',
    status: 'overdue',
    statusLabel: 'Atrasada',
    daysLate: 14,
    hasReminder: false,
  },
  {
    id: 'quota-3',
    debtId: 'debt-2',
    entity: 'Caja Arequipa',
    debtType: 'Crédito personal',
    quotaNumber: 'Cuota 04/12',
    amount: 200,
    dueDate: '05/09/2026',
    dueDateDay: 5,
    month: '2026-09',
    status: 'paid',
    statusLabel: 'Pagada',
    operationNumber: 'OP-782910',
    paidDate: '04/09/2026',
  },
  {
    id: 'quota-4',
    debtId: 'debt-3',
    entity: 'Financiera Impulso',
    debtType: 'Crédito para negocio',
    quotaNumber: 'Cuota 12/18',
    amount: 180,
    dueDate: '15/09/2026',
    dueDateDay: 15,
    month: '2026-09',
    status: 'paid',
    statusLabel: 'Pagada',
    operationNumber: 'OP-449120',
    paidDate: '15/09/2026',
  },
  {
    id: 'quota-5',
    debtId: 'debt-2',
    entity: 'Caja Arequipa',
    debtType: 'Crédito personal',
    quotaNumber: 'Cuota 05/12',
    amount: 200,
    dueDate: '05/10/2026',
    dueDateDay: 5,
    month: '2026-10',
    status: 'pending',
    statusLabel: 'Programada',
    daysRemaining: 11,
    hasReminder: false,
  },
];

export const INITIAL_BUDGET: BudgetData = {
  salary: 2800,
  extraIncome: 400,
  housing: 650,
  food: 550,
  transport: 180,
  services: 220,
  education: 150,
  otherExpenses: 150,
  simulatedQuota: 250,
};

export const INITIAL_REMINDERS: ReminderConfig = {
  days7: true,
  days3: true,
  days1: true,
  enabled: true,
};

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Próximo vencimiento Banco Principal',
    desc: 'Tu cuota de S/ 350 vence en 5 días (30 de septiembre).',
    time: 'Hace 2 horas',
    read: false,
    type: 'alert',
  },
  {
    id: 'notif-2',
    title: 'Alerta de cuota atrasada',
    desc: 'La cuota de Tienda Ripley de S/ 150 tiene 14 días de retraso. Revisa las opciones de regularización.',
    time: 'Ayer',
    read: false,
    type: 'warning',
  },
  {
    id: 'notif-3',
    title: 'Pago acreditado Caja Arequipa',
    desc: 'Se confirmó el abono de S/ 200 con N° Operación OP-782910.',
    time: '04/09/2026',
    read: true,
    type: 'success',
  },
  {
    id: 'notif-4',
    title: 'Guía disponible: Reporte SBS gratis',
    desc: 'Aprende a revisar tu historial crediticio oficial de la SBS sin costo con tu DNI.',
    time: '02/09/2026',
    read: true,
    type: 'info',
  },
];

export const SBS_CATEGORIES = [
  {
    level: 'Normal (0)',
    color: 'bg-emerald-500 text-white',
    border: 'border-emerald-200',
    bgLight: 'bg-emerald-50',
    badge: 'Excelente',
    days: '0 a 8 días de atraso',
    description: 'Pagas tus créditos puntualmente o con atraso menor a 8 días. Tienes acceso a las mejores tasas y aprobación de créditos.',
  },
  {
    level: 'Con Problemas Potenciales - CPP (1)',
    color: 'bg-amber-500 text-white',
    border: 'border-amber-200',
    bgLight: 'bg-amber-50',
    badge: 'Precaución',
    days: '9 a 30 días de atraso',
    description: 'Presentas atrasos periódicos pero aún tienes capacidad de pago. Es el momento clave para regularizarte antes de pasar a deficiente.',
  },
  {
    level: 'Deficiente (2)',
    color: 'bg-orange-500 text-white',
    border: 'border-orange-200',
    bgLight: 'bg-orange-50',
    badge: 'Alerta',
    days: '31 a 60 días de atraso',
    description: 'Muestra dificultades reiteradas para pagar. Las entidades bancarias limitarán nuevos créditos y solicitarán garantías.',
  },
  {
    level: 'Dudoso (3)',
    color: 'bg-rose-500 text-white',
    border: 'border-rose-200',
    bgLight: 'bg-rose-50',
    badge: 'Crítico',
    days: '61 a 120 días de atraso',
    description: 'La posibilidad de pago es muy baja. Las entidades inician procesos de cobranza prejudicial o extrajudicial intensiva.',
  },
  {
    level: 'Pérdida (4)',
    color: 'bg-red-800 text-white',
    border: 'border-red-200',
    bgLight: 'bg-red-50',
    badge: 'Mora Severa',
    days: 'Más de 120 días de atraso',
    description: 'La deuda se considera irrecuperable en condiciones normales. Puede negociarse con quitas o descuentos sustanciales de intereses.',
  },
];

export const FINANCIAL_CONCEPTS = [
  {
    id: 'tea-vs-tcea',
    term: 'TEA vs. TCEA',
    simpleMeaning: 'La TEA es solo el interés; la TCEA es lo que realmente pagarás al final incluyendo comisiones y seguros.',
    detail: 'TEA significa Tasa Efectiva Anual (el costo del dinero prestado). TCEA significa Tasa del Costo Efectivo Anual (incluye TEA + seguro de desgravamen + comisiones + portes). Al comparar préstamos, SIEMPRE compara la TCEA.',
    icon: 'percent',
    color: 'text-blue-600 bg-blue-50',
  },
  {
    id: 'pago-minimo',
    term: 'Pago Mínimo de Tarjeta',
    simpleMeaning: 'Es una trampa de tiempo: cubre casi puros intereses y gastos, amortizando muy poco capital.',
    detail: 'Al pagar solo el mínimo, tardarás años en liquidar una compra y pagarás hasta 3 o 4 veces el valor original. Procura siempre pagar el "Pago del Mes" o "Pago Total", o al menos el doble del mínimo.',
    icon: 'warning',
    color: 'text-amber-600 bg-amber-50',
  },
  {
    id: 'historial-sbs',
    term: 'Reporte de Deudas SBS',
    simpleMeaning: 'Es el registro oficial y gratuito del Estado peruano donde figuran todos tus créditos y tu comportamiento de pago.',
    detail: 'Todas las cajas, bancos y financieras supervisadas reportan mes a mes tu saldo y puntualidad a la SBS. Puedes consultar tu reporte oficial 100% gratis en el portal web de la SBS con tu DNI.',
    icon: 'verified_user',
    color: 'text-emerald-600 bg-emerald-50',
  },
  {
    id: 'reprogramacion',
    term: 'Reprogramación vs. Refinanciación',
    simpleMeaning: 'Reprogramar es pedir más plazo antes de caer en mora; refinanciar es cuando ya estás en mora y se pactan nuevas condiciones.',
    detail: 'La reprogramación no mancha gravemente tu historial si la pides con anticipación. La refinanciación cambia tu estatus en la SBS pero te permite reducir la cuota mensual a algo que sí puedas cumplir.',
    icon: 'sync_alt',
    color: 'text-indigo-600 bg-indigo-50',
  },
];

export const ADVISORY_TOPICS: AdvisoryTopic[] = [
  {
    id: 'atrasado',
    title: 'Estoy atrasado en un pago',
    subtitle: 'Qué hacer durante los primeros días de mora y cómo frenar recargos.',
    icon: 'warning_amber',
    tagColor: 'error',
    fullTitle: '💡 Plan de Acción: ¿Qué hacer si estás atrasado?',
    empathy: 'No te sientas culpable ni te paralices. Los retrasos suceden. Lo importante es actuar con estrategia y calma.',
    points: [
      {
        title: '1. No evites las llamadas, comunícate con iniciativa',
        desc: 'Contestar y manifestar tu voluntad de pago frena el envío de la cuenta a agencias externas de cobranza.',
      },
      {
        title: '2. Calcula cuánto puedes abonar hoy',
        desc: 'Aunque no tengas la cuota completa, pregunta si aceptan un abono parcial que congele los días de mora.',
      },
      {
        title: '3. Solicita condonación de penalidades',
        desc: 'Al ponerte al día o hacer un pago pronto, pide que te exoneren los gastos de cobranza e intereses moratorios.',
      },
      {
        title: '4. No saques un préstamo informal ("gota a gota")',
        desc: 'Nunca recurras a prestamistas informales o aplicativos dudosos para pagar un banco. El riesgo y el interés son peligrosos.',
      },
    ],
  },
  {
    id: 'no-puedo-pagar',
    title: 'No puedo pagar este mes',
    subtitle: 'Opciones formales: reprogramación, gracia y cartas de solicitud.',
    icon: 'savings',
    tagColor: 'primary',
    fullTitle: '💡 Plan de Contingencia: ¿Qué hacer si tus ingresos cayeron?',
    empathy: 'La falta de liquidez es temporal. El sistema financiero cuenta con mecanismos regulados para reprogramar cuotas.',
    points: [
      {
        title: 'Pide una Reprogramación de Plazo',
        desc: 'Solicita alargar el número de cuotas (por ejemplo, de 12 a 24 meses) para que tu cuota mensual baje a la mitad.',
      },
      {
        title: 'Solicita Periodo de Gracia',
        desc: 'Algunas entidades permiten postergar 1 o 2 cuotas al final del crédito si demuestras pérdida de empleo o salud.',
      },
      {
        title: 'Prioriza tus gastos básicos primero',
        desc: 'Alimentación, vivienda y salud de tu familia van primero. Luego organiza el saldo disponible para tus obligaciones.',
      },
    ],
  },
  {
    id: 'cuanto-debo',
    title: 'Quiero saber cuánto debo en total',
    subtitle: 'Cómo consolidar y listar todas tus deudas sin omitir intereses.',
    icon: 'receipt_long',
    tagColor: 'secondary',
    fullTitle: '💡 Diagnóstico Total: Mapeo de obligaciones',
    empathy: 'Tener la cifra exacta en la mano disipa el miedo y te da el control total de tu economía.',
    points: [
      {
        title: 'Diferencia el saldo capital de las cuotas',
        desc: 'El saldo capital es lo que realmente debes hoy si quisieras liquidar todo el crédito.',
      },
      {
        title: 'Revisa tu Reporte SBS Oficial',
        desc: 'Te mostrará si tienes deudas en entidades que habías olvidado o tarjetas que creías canceladas.',
      },
      {
        title: 'Suma tus cuotas fijas mensuales',
        desc: 'Esta cifra te indica cuánto flujo de dinero necesitas generar cada 30 días para estar AlDía.',
      },
    ],
  },
  {
    id: 'mejorando',
    title: '¿Cómo saber si estoy mejorando?',
    subtitle: 'Indicadores clave de salud financiera y recuperación.',
    icon: 'trending_up',
    tagColor: 'tertiary',
    fullTitle: '💡 Seguimiento de Progreso Financiero',
    empathy: 'Cada cuota pagada reduce tu saldo y fortalece tu tranquilidad a futuro.',
    points: [
      {
        title: 'Porcentaje de amortización creciente',
        desc: 'Ver cómo tu saldo total desciende mes a mes es la prueba tangible de que estás avanzando.',
      },
      {
        title: 'Racha de pagos puntuales',
        desc: 'Cumplir 3 o 6 meses seguidos sin atrasos limpia paulatinamente tu calificación crediticia en el sistema.',
      },
      {
        title: 'Recuperación de tu capacidad de ahorro',
        desc: 'A medida que liquidas deudas pequeñas, ese dinero pasa directamente a tu bolsillo y a tu fondo de emergencia.',
      },
    ],
  },
];

export const LEGAL_DISCLAIMER =
  'AlDía es una plataforma digital de educación, registro y orientación financiera personal. AlDía no es una entidad bancaria ni financiera, no otorga préstamos, no realiza cobro de deudas, no intermedia transacciones y no garantiza la aprobación de créditos ni acuerdos contractuales con entidades de crédito. La información y cálculos provistos son meramente orientativos para el usuario.';
