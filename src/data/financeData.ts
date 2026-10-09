import {
  Debt,
  Payment,
  FinancialGoal,
  BudgetItem,
  FinancialHealthScore,
  AlertNotification,
  EducationalArticle,
  UserProfile,
} from '../types';

export const INITIAL_USER: UserProfile = {
  name: '',
  email: '',
  monthlyIncome: 5500,
  monthlyExpenses: 3150,
  primaryGoal: 'Salir de deudas',
  hasSeenOnboarding: true,
};

export const INITIAL_DEBTS: Debt[] = [
  {
    id: 'debt-1',
    name: 'Tarjeta de crédito',
    institution: 'BCP Visa Clásica',
    type: 'tarjeta_credito',
    initialAmount: 8400,
    currentBalance: 4850,
    monthlyPayment: 650,
    interestRate: 39.5,
    dueDateFormatted: '12 Oct',
    dueDay: 12,
    daysLeft: 5,
    paidPercentage: 42,
    status: 'proximo',
    notes: 'Priorizar por mayor tasa de interés (estrategia avalancha).',
    categoryIcon: 'credit_card',
  },
  {
    id: 'debt-2',
    name: 'Préstamo personal',
    institution: 'BBVA Efectivo',
    type: 'prestamo_personal',
    initialAmount: 14000,
    currentBalance: 11200,
    monthlyPayment: 1200,
    interestRate: 18.9,
    dueDateFormatted: '18 Oct',
    dueDay: 18,
    daysLeft: 11,
    paidPercentage: 20,
    status: 'se_acerca',
    notes: 'Cuota fija mensual debitada de cuenta sueldo.',
    categoryIcon: 'account_balance',
  },
  {
    id: 'debt-3',
    name: 'Crédito de compras',
    institution: 'CMR Falabella',
    type: 'tarjeta_credito',
    initialAmount: 2600,
    currentBalance: 2400,
    monthlyPayment: 500,
    interestRate: 44.0,
    dueDateFormatted: '25 Oct',
    dueDay: 25,
    daysLeft: 18,
    paidPercentage: 7.7,
    status: 'al_dia',
    notes: 'Compra de equipamiento en 6 cuotas.',
    categoryIcon: 'shopping_bag',
  },
];

export const INITIAL_PAYMENTS: Payment[] = [
  {
    id: 'pay-1',
    debtId: 'debt-1',
    debtName: 'Tarjeta de crédito',
    institution: 'BCP Visa Clásica',
    amount: 650,
    date: '2026-09-12',
    paymentMethod: 'App del banco',
    note: 'Pago puntual cuota Setiembre',
    createdAt: '2026-09-12T10:30:00Z',
  },
  {
    id: 'pay-2',
    debtId: 'debt-2',
    debtName: 'Préstamo personal',
    institution: 'BBVA Efectivo',
    amount: 1200,
    date: '2026-09-18',
    paymentMethod: 'Transferencia bancaria',
    note: 'Débito automático de sueldo',
    createdAt: '2026-09-18T14:15:00Z',
  },
  {
    id: 'pay-3',
    debtId: 'debt-3',
    debtName: 'Crédito de compras',
    institution: 'CMR Falabella',
    amount: 500,
    date: '2026-09-25',
    paymentMethod: 'Tarjeta de débito',
    note: 'Cuota #1 pagada por banca móvil',
    createdAt: '2026-09-25T09:00:00Z',
  },
];

export const INITIAL_GOALS: FinancialGoal[] = [
  {
    id: 'goal-1',
    title: 'Fondo de emergencia',
    category: 'emergencia',
    currentAmount: 2500,
    targetAmount: 5000,
    percentage: 50,
    deadline: 'Diciembre 2026',
    icon: 'shield_lock',
  },
  {
    id: 'goal-2',
    title: 'Liquidar Tarjeta de Crédito BCP',
    category: 'salir_deudas',
    currentAmount: 3550,
    targetAmount: 8400,
    percentage: 42.3,
    deadline: 'Abril 2027',
    icon: 'credit_card_off',
  },
  {
    id: 'goal-3',
    title: 'Ahorro para imprevistos médicos',
    category: 'ahorro',
    currentAmount: 1200,
    targetAmount: 3000,
    percentage: 40,
    deadline: 'Julio 2027',
    icon: 'health_and_safety',
  },
];

export const INITIAL_BUDGET_ITEMS: BudgetItem[] = [
  {
    id: 'b-1',
    category: 'Vivienda',
    budgetedAmount: 1200,
    spentAmount: 1200,
    color: '#0F3B82',
    icon: 'home',
  },
  {
    id: 'b-2',
    category: 'Alimentación',
    budgetedAmount: 800,
    spentAmount: 760,
    color: '#059669',
    icon: 'restaurant',
  },
  {
    id: 'b-3',
    category: 'Transporte',
    budgetedAmount: 350,
    spentAmount: 330,
    color: '#0284C7',
    icon: 'directions_bus',
  },
  {
    id: 'b-4',
    category: 'Deudas',
    budgetedAmount: 2350,
    spentAmount: 2350,
    color: '#D97706',
    icon: 'credit_card',
  },
  {
    id: 'b-5',
    category: 'Entretenimiento',
    budgetedAmount: 350,
    spentAmount: 270,
    color: '#7C3AED',
    icon: 'movie',
  },
  {
    id: 'b-6',
    category: 'Otros',
    budgetedAmount: 450,
    spentAmount: 390,
    color: '#64748B',
    icon: 'receipt_long',
  },
];

export const INITIAL_HEALTH_SCORE: FinancialHealthScore = {
  totalScore: 78,
  statusText: 'Vas por buen camino',
  breakdown: {
    nivelDeuda: {
      score: 72,
      label: 'Nivel de deuda',
      status: 'Bueno',
      detail: 'Tu deuda representa el 33% de tus ingresos anuales proyectados, en rango seguro.',
    },
    capacidadPago: {
      score: 82,
      label: 'Capacidad de pago',
      status: 'Excelente',
      detail: 'Cuentas con S/ 2,350 de margen disponible para cubrir tus cuotas mensuales sin apuros.',
    },
    ahorro: {
      score: 65,
      label: 'Fondo de ahorro',
      status: 'Atención',
      detail: 'Tu fondo de emergencia cubre 1.2 meses de gastos. Lo óptimo es alcanzar 3 meses.',
    },
    puntualidad: {
      score: 96,
      label: 'Puntualidad de pagos',
      status: 'Excelente',
      detail: 'Mantienes calificación 100% Normal en la central de riesgos de la SBS.',
    },
    presupuesto: {
      score: 75,
      label: 'Control de presupuesto',
      status: 'Bueno',
      detail: 'Tus gastos mensuales se mantienen alineados con un desvío menor al 5%.',
    },
  },
  recommendations: [
    {
      id: 'rec-1',
      priority: 'alta',
      title: 'Prioriza liquidar la Tarjeta de Crédito (39.5% TEA)',
      description: 'Es tu deuda más costosa. Cualquier pago adicional que hagas aquí te ahorrará el máximo de intereses.',
      actionLabel: 'Ver estrategia avalancha',
      actionTab: 'deudas',
    },
    {
      id: 'rec-2',
      priority: 'media',
      title: 'Acelera tu fondo de emergencia a S/ 5,000',
      description: 'Llegar a S/ 5,000 te dará 2 meses completos de tranquilidad ante emergencias o desempleo.',
      actionLabel: 'Ver objetivos',
      actionTab: 'objetivos',
    },
    {
      id: 'rec-3',
      priority: 'baja',
      title: 'Monitorea tu cuota próxima de S/ 1,200',
      description: 'Vence el 18 Oct. Asegúrate de apartar el saldo en tu cuenta principal con al menos 3 días de anticipación.',
      actionLabel: 'Programar pago',
      actionTab: 'pagos',
    },
  ],
};

export const INITIAL_ALERTS: AlertNotification[] = [
  {
    id: 'alt-1',
    type: 'proximo',
    title: '🔔 Pago próximo',
    message: 'Tu pago de S/ 650 (Tarjeta de crédito BCP) vence en 5 días (12 Oct).',
    timeAgo: 'Hace 2 horas',
    isRead: false,
    actionText: 'Ver pago',
    targetTab: 'pagos',
  },
  {
    id: 'alt-3',
    type: 'atencion',
    title: '⚠️ Recordatorio de cuota',
    message: 'Tu próxima cuota de S/ 1,200 (BBVA) está programada para este mes.',
    timeAgo: 'Hace 2 días',
    isRead: false,
    actionText: 'Ver detalles',
    targetTab: 'pagos',
  },
];

export const DEBT_REDUCTION_CHART_DATA = [
  { month: 'May', amount: 25000, label: 'S/ 25.0k' },
  { month: 'Jun', amount: 23800, label: 'S/ 23.8k' },
  { month: 'Jul', amount: 22400, label: 'S/ 22.4k' },
  { month: 'Ago', amount: 20950, label: 'S/ 20.9k' },
  { month: 'Set', amount: 20160, label: 'S/ 20.1k' },
  { month: 'Oct', amount: 18450, label: 'S/ 18.4k' },
];

export const EDUCATIONAL_ARTICLES: EducationalArticle[] = [
  {
    id: 'art-1',
    category: 'Deudas',
    title: '¿Qué deuda debería pagar primero?',
    shortDesc: 'Compara el método Bola de Nieve vs Avalancha y descubre cuál te ahorrará más dinero y estrés.',
    readTime: '4 min de lectura',
    badgeColor: 'bg-emerald-50 text-emerald-700',
    summary: 'La clave para liquidar deudas no es pagar el mínimo en todas, sino enfocar los esfuerzos extras en una a la vez.',
    keyTakeaway: 'Usa el método Avalancha para pagar menos intereses totales, o Bola de Nieve si necesitas victorias psicológicas rápidas.',
    sections: [
      {
        title: 'Los dos métodos más efectivos del mundo financiero',
        paragraphs: [
          'Cuando tienes varias deudas acumuladas, pagar solo el mínimo o dividir tu dinero a partes iguales alarga el tiempo de pago y multiplica los intereses.',
          'Existen dos estrategias comprobadas: el Método Avalancha y el Método Bola de Nieve. Ambos requieren pagar el mínimo obligatorio en todas tus obligaciones, pero concentrar cualquier monto adicional en una deuda específica.',
        ],
        tips: [
          'Método Avalancha: Ordena tus deudas de mayor a menor tasa de interés (TCEA). Paga con prioridad la de tasa más alta. Matemáticamente es el más barato.',
          'Método Bola de Nieve: Ordena tus deudas del menor saldo al mayor saldo. Liquida primero la más pequeña. Te da triunfos rápidos y motivación inmediata.',
        ],
      },
      {
        title: '¿Cuál es mejor para tu caso?',
        paragraphs: [
          'Si tu deuda más cara tiene una tasa superior al 35% (como las tarjetas de crédito), la Avalancha te ahorrará cientos o miles de soles.',
          'Si te sientes abrumado por tener muchas cuotas diferentes, la Bola de Nieve reduce la cantidad de acreedores rápidamente, aliviando tu carga mental.',
        ],
      },
    ],
  },
  {
    id: 'art-2',
    category: 'Tarjetas',
    title: '¿Cómo funciona realmente una tarjeta de crédito?',
    shortDesc: 'Fecha de corte, fecha de pago, pago mínimo y el secreto para nunca regalar dinero en intereses.',
    readTime: '5 min de lectura',
    badgeColor: 'bg-blue-50 text-blue-700',
    summary: 'La tarjeta de crédito no es dinero extra: es un método de pago con hasta 50 días de financiamiento gratuito si pagas el total del mes.',
    keyTakeaway: 'Paga siempre el "Pago del Mes" antes de tu fecha de vencimiento y nunca pagues solo el monto mínimo.',
    sections: [
      {
        title: 'Los dos momentos más importantes de tu tarjeta',
        paragraphs: [
          '1. Fecha de corte: El día que el banco cierra tu cuenta mensual y suma todo lo consumido en los 30 días previos.',
          '2. Fecha límite de pago: Generalmente entre 15 y 25 días después de la fecha de corte. Es tu plazo máximo para abonar sin penalidades.',
        ],
        tips: [
          'Si compras 1 o 2 días después de tu fecha de corte, ganas casi 50 días para pagar sin pagar un solo sol de interés.',
        ],
      },
      {
        title: 'La trampa mortal del pago mínimo',
        paragraphs: [
          'El pago mínimo solo cubre una pequeña parte del capital y destina la mayor parte a intereses, comisiones y seguros.',
          'Pagar el mínimo en una deuda de S/ 4,000 puede tardar más de 8 años en liquidarse y terminarás pagando hasta tres veces el monto original.',
        ],
      },
    ],
  },
  {
    id: 'art-3',
    category: 'Deudas',
    title: '¿Cómo salir de varias deudas de forma ordenada?',
    shortDesc: 'Guía paso a paso para personas con 2 o más obligaciones que buscan recuperar la tranquilidad.',
    readTime: '6 min de lectura',
    badgeColor: 'bg-amber-50 text-amber-700',
    summary: 'Un plan financiero realista te saca de las deudas sin necesidad de endeudarte más ni caer en pánico.',
    keyTakeaway: 'Detén el nuevo endeudamiento, haz un inventario exacto y negocia o consolida si la cuota total supera el 40% de tu sueldo.',
    sections: [
      {
        title: 'Paso 1: Alto total al nuevo crédito',
        paragraphs: [
          'No puedes salir de un pozo si sigues cavando. Guarda las tarjetas y no aceptes créditos de compras durante tu proceso de recuperación.',
        ],
      },
      {
        title: 'Paso 2: Haz tu radiografía de deudas',
        paragraphs: [
          'Anota en una lista: Nombre de la entidad, saldo total pendiente, cuota mensual y tasa de interés (TCEA).',
          'En AlDía ya tienes esta radiografía integrada para saber exactamente dónde estás parado.',
        ],
      },
      {
        title: 'Paso 3: Evalúa compra de deuda o consolidación',
        paragraphs: [
          'Si pagas 3 cuotas diferentes con tasas del 30% al 45%, consulta con otro banco si te compra toda la deuda a una tasa menor (ej. 15% - 20%). Unificarás todo en una sola cuota más baja.',
        ],
      },
    ],
  },
  {
    id: 'art-4',
    category: 'Presupuesto',
    title: '¿Cómo crear un presupuesto mensual que sí funcione?',
    shortDesc: 'Aplica la regla 50/30/20 y organiza tus ingresos sin privarte de todo lo que te gusta.',
    readTime: '4 min de lectura',
    badgeColor: 'bg-teal-50 text-teal-700',
    summary: 'Un presupuesto no es una camisa de fuerza, es un mapa que te dice a dónde quieres que vaya tu dinero en lugar de preguntarte a dónde se fue.',
    keyTakeaway: 'Divide tus ingresos netos en: 50% necesidades básicas, 30% estilo de vida / deseos, y 20% ahorro y pago acelerado de deudas.',
    sections: [
      {
        title: 'La regla 50 / 30 / 20 explicada',
        paragraphs: [
          '50% Necesidades: Alquiler o hipoteca, comida, servicios, transporte, salud y pagos mínimos de deudas.',
          '30% Deseos: Salidas, ropa no indispensable, streaming, pasatiempos.',
          '20% Futuro y Progreso: Fondo de emergencia, ahorro y abonos adicionales a capital de deudas.',
        ],
      },
    ],
  },
  {
    id: 'art-5',
    category: 'Intereses',
    title: '¿Qué es una tasa de interés? (TEA vs TCEA)',
    shortDesc: 'Aprende a identificar el verdadero costo de un crédito antes de firmar cualquier contrato.',
    readTime: '3 min de lectura',
    badgeColor: 'bg-purple-50 text-purple-700',
    summary: 'La TEA es solo el interés del dinero; la TCEA incluye seguros, portes y comisiones. Siempre compara la TCEA.',
    keyTakeaway: 'Exige siempre que te muestren la TCEA (Tasa de Costo Efectivo Anual). Es el único número que refleja el costo real.',
    sections: [
      {
        title: 'Por qué la publicidad suele ser engañosa',
        paragraphs: [
          'Un banco puede ofrecerte "¡Crédito con solo 12% de tasa!". Pero cuando sumas el seguro de desgravamen obligatorio y las comisiones, la TCEA real puede ser 28% o más.',
          'La Superintendencia de Banca y Seguros (SBS) obliga a todas las entidades del Perú a publicar la TCEA en su Hoja Resumen.',
        ],
      },
    ],
  },
  {
    id: 'art-6',
    category: 'Fondo de emergencia',
    title: 'El fondo de emergencia: tu escudo ante imprevistos',
    shortDesc: 'Por qué es el primer paso antes de invertir y cómo construirlo mes a mes.',
    readTime: '4 min de lectura',
    badgeColor: 'bg-emerald-50 text-emerald-700',
    summary: 'Sin fondo de emergencia, cualquier pinchazo de llanta o visita médica se convierte en una nueva deuda con tarjeta de crédito.',
    keyTakeaway: 'Comienza con una meta inicial de 1 mes de gastos fijos y avanza progresivamente hacia los 3 meses.',
    sections: [
      {
        title: 'Dónde guardar tu fondo de emergencia',
        paragraphs: [
          'Debe estar en una cuenta de ahorros de alto rendimiento (depósito a plazo flexible o cuenta digital regulada por la SBS) con disponibilidad inmediata, nunca en acciones ni fondos volátiles.',
        ],
      },
    ],
  },
  {
    id: 'art-7',
    category: 'Historial crediticio',
    title: 'Cómo mejorar tu calificación en la central de riesgos SBS',
    shortDesc: 'Entiende cómo te ven los bancos y los pasos para recuperar tu historial crediticio.',
    readTime: '5 min de lectura',
    badgeColor: 'bg-blue-50 text-blue-700',
    summary: 'Estar en la central de riesgos es normal (todos los que tienen créditos aparecen). Lo importante es tu categoría de clasificación.',
    keyTakeaway: 'Pagar con más de 8 días de retraso ya te cambia de categoría "Normal" a "Con Problemas Potenciales" (CPP).',
    sections: [
      {
        title: 'Las 5 categorías de la SBS',
        paragraphs: [
          '0 - Normal: Al día o hasta 8 días de retraso.',
          '1 - Con Problemas Potenciales (CPP): De 9 a 30 días de retraso.',
          '2 - Deficiente: De 31 a 60 días de atraso.',
          '3 - Dudoso: De 61 a 120 días de atraso.',
          '4 - Pérdida: Más de 120 días de atraso.',
        ],
      },
    ],
  },
  {
    id: 'art-8',
    category: 'Ahorro',
    title: 'Microahorro y automatización: el hábito que cambia vidas',
    shortDesc: 'Técnicas sencillas para separar dinero antes de gastar en lugar de ahorrar lo que sobra.',
    readTime: '3 min de lectura',
    badgeColor: 'bg-teal-50 text-teal-700',
    summary: 'Ahorrar no es lo que te queda a fin de mes. Ahorrar es pagarte a ti mismo primero el mismo día que cobras tu sueldo.',
    keyTakeaway: 'Programa una transferencia automática del 10% de tu sueldo el mismo día del depósito hacia una cuenta secundaria.',
    sections: [
      {
        title: 'El principio de "Págate a ti primero"',
        paragraphs: [
          'Si esperas al día 30 para ver cuánto sobró, la respuesta casi siempre será "nada". Al automatizar el ahorro el día 1, ajustas tu vida al restante naturalmente.',
        ],
      },
    ],
  },
];
