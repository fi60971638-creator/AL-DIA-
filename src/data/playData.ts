export interface TriviaQuestion {
  id: string;
  question: string;
  category: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation: string;
  source: string;
}

export interface MythItem {
  id: string;
  statement: string;
  isTrue: boolean;
  explanation: string;
  legalBasis: string;
}

export interface CaseStep {
  id: string;
  stageTitle: string;
  scenario: string;
  options: {
    id: string;
    text: string;
    isOptimal: boolean;
    feedback: string;
    points: number;
  }[];
}

export const TRIVIA_QUESTIONS: TriviaQuestion[] = [
  {
    id: 't-1',
    category: 'Tasas y Costos',
    question: 'Si vas a comparar dos ofertas de préstamo en entidades financieras del Perú, ¿cuál es la tasa que debes exigir para saber el costo real total?',
    options: [
      { id: 'a', text: 'La Tasa de Interés Nominal (TIN)', isCorrect: false },
      { id: 'b', text: 'La Tasa Efectiva Anual (TEA)', isCorrect: false },
      { id: 'c', text: 'La Tasa de Costo Efectivo Anual (TCEA)', isCorrect: true },
      { id: 'd', text: 'La tasa mensual que te diga el promotor', isCorrect: false },
    ],
    explanation: '¡Exacto! La TCEA incluye la tasa compensatoria, el seguro de desgravamen y todas las comisiones o gastos autorizados. Es la única tasa legal que refleja el costo total anual.',
    source: 'Superintendencia de Banca, Seguros y AFP (SBS)',
  },
  {
    id: 't-2',
    category: 'Derechos del Consumidor',
    question: 'Si cuentas con un dinero extra y deseas abonar a tu deuda bancaria antes de tiempo (pago anticipado a capital), ¿qué establece la ley peruana?',
    options: [
      { id: 'a', text: 'El banco puede cobrarte una penalidad del 5% por pagar antes', isCorrect: false },
      { id: 'b', text: 'Tienes derecho a amortizar a capital sin comisiones ni penalidades', isCorrect: true },
      { id: 'c', text: 'Solo puedes pagar antes si el banco lo autoriza previamente por escrito', isCorrect: false },
      { id: 'd', text: 'El pago anticipado está prohibido en créditos de consumo', isCorrect: false },
    ],
    explanation: '¡Correcto! La Ley 31143 y el Código del Consumidor garantizan tu derecho irrenunciable a efectuar pagos anticipados o adelantos de cuotas sin comisiones ni recargos.',
    source: 'Ley N° 31143 y Código de Protección y Defensa del Consumidor',
  },
  {
    id: 't-3',
    category: 'Reclamos y Plazos',
    question: 'Cuando presentas un reclamo formal en el Libro de Reclamaciones de una entidad financiera, ¿cuál es el plazo legal máximo para que te respondan?',
    options: [
      { id: 'a', text: '60 días calendario', isCorrect: false },
      { id: 'b', text: '30 días hábiles', isCorrect: false },
      { id: 'c', text: '15 días hábiles improrrogables', isCorrect: true },
      { id: 'd', text: 'Las entidades no tienen plazo obligatorio', isCorrect: false },
    ],
    explanation: '¡Así es! De acuerdo con el Decreto Supremo 101-2022-PCM y la normativa SBS, el plazo legal máximo para responderte es de 15 días hábiles.',
    source: 'INDECOPI y SBS (Reglamento del Libro de Reclamaciones)',
  },
  {
    id: 't-4',
    category: 'Cobranzas y Horarios',
    question: 'Según las normas de protección al consumidor de INDECOPI, ¿en qué días y horarios están PROHIBIDAS las llamadas de cobranza?',
    options: [
      { id: 'a', text: 'De lunes a viernes de 9 a.m. a 6 p.m.', isCorrect: false },
      { id: 'b', text: 'Domingos, feriados y antes de las 7:00 a.m. o después de las 8:00 p.m.', isCorrect: true },
      { id: 'c', text: 'Solo durante las noches de fin de año', isCorrect: false },
      { id: 'd', text: 'Las agencias pueden llamar a cualquier hora que deseen', isCorrect: false },
    ],
    explanation: '¡Muy bien! INDECOPI sanciona severamente la cobranza los domingos, feriados, antes de las 7:00 a.m. y después de las 8:00 p.m., así como llamar a vecinos o compañeros de trabajo.',
    source: 'Código de Protección y Defensa del Consumidor (Ley 29571)',
  },
  {
    id: 't-5',
    category: 'Historial Crediticio',
    question: '¿Qué sucede si te atrasas entre 9 y 30 días en el pago de tu cuota según la Central de Riesgos de la SBS?',
    options: [
      { id: 'a', text: 'Pierdes automáticamente tu casa o tus pertenencias', isCorrect: false },
      { id: 'b', text: 'Pasa a categoría CPP (Con Problemas Potenciales) como alerta temprana', isCorrect: true },
      { id: 'c', text: 'Entras inmediatamente a una lista de orden de captura policial', isCorrect: false },
      { id: 'd', text: 'La SBS borra todos tus créditos anteriores', isCorrect: false },
    ],
    explanation: '¡Excelente! Los atrasos de 9 a 30 días corresponden a la categoría CPP. Es una señal de alerta para el sistema pero aún permite regularizar antes de pasar a Deficiente.',
    source: 'Resolución SBS N° 11356-2008 (Reglamento de Evaluación y Clasificación del Deudor)',
  },
];

export const MYTHS_LIST: MythItem[] = [
  {
    id: 'm-1',
    statement: '¿Existe prisión por deudas de tarjetas de crédito o préstamos personales en el Perú?',
    isTrue: false,
    explanation: 'FALSO. El artículo 2 inciso 24 literal c de la Constitución Política del Perú prohíbe taxativamente la prisión por deudas. La única excepción constitucional es por omisión a la asistencia familiar de alimentos.',
    legalBasis: 'Constitución Política del Perú, Art. 2, inc. 24, lit. c.',
  },
  {
    id: 'm-2',
    statement: '¿Una agencia de cobranza o banco puede ingresar a tu vivienda y embargarte cosas sin una orden de un juez?',
    isTrue: false,
    explanation: 'FALSO. Nadie puede embargar bienes sin un proceso judicial formal y una resolución expresa emitida por un Juez de la República. Las cartas o avisos que dicen "Orden de embargo inminente" sin número de juzgado son métodos intimidatorios sancionados por INDECOPI.',
    legalBasis: 'Código Procesal Civil del Perú y Código del Consumidor.',
  },
  {
    id: 'm-3',
    statement: '¿La TCEA (Tasa de Costo Efectivo Anual) incluye el seguro de desgravamen y todas las comisiones?',
    isTrue: true,
    explanation: 'VERDADERO. A diferencia de la TEA que solo mide el interés compensatorio, la TCEA reúne todos los cargos obligatorios vinculados al crédito. Siempre debes comparar la TCEA.',
    legalBasis: 'Resolución SBS N° 3274-2017.',
  },
  {
    id: 'm-4',
    statement: '¿Estar reportado en una central de riesgos (SBS o Infocorp) significa que estás en un juicio penal?',
    isTrue: false,
    explanation: 'FALSO. Las centrales de riesgo son bases de datos estadísticas e informativas sobre el comportamiento de pago de personas y empresas. No constituyen un juicio ni un antecedente penal ni policial.',
    legalBasis: 'Ley N° 27489 (Ley que regula las Centrales Privadas de Información de Riesgos).',
  },
  {
    id: 'm-5',
    statement: '¿Tienes derecho legal a solicitar una reprogramación a tu entidad financiera antes de que venza tu cuota?',
    isTrue: true,
    explanation: 'VERDADERO. La SBS obliga a las empresas del sistema financiero a mantener canales para evaluar solicitudes de reprogramación de clientes que afrontan dificultades temporales de pago.',
    legalBasis: 'Oficio Múltiple SBS N° 10842-2020 y normativa de conducta de mercado.',
  },
  {
    id: 'm-6',
    statement: '¿Los gestores de cobranza tienen derecho legal a llamar a tus vecinos, familiares o jefes de trabajo para exigirles tu deuda?',
    isTrue: false,
    explanation: 'FALSO. El Código de Protección al Consumidor prohíbe comunicar la deuda a personas ajenas a la obligación que no figuren como avales o fiadores en el contrato.',
    legalBasis: 'Ley 29571, Art. 61 y 62 (Métodos de cobranza prohibidos).',
  },
];

export const BUDGET_CHALLENGE = {
  monthlyIncome: 2500,
  targetNeeds: 1250, // 50%
  targetWants: 750, // 30%
  targetSavings: 500, // 20%
  expenseCategories: [
    { id: 'alquiler', name: 'Alquiler y vivienda', group: 'needs', defaultValue: 600, icon: 'home' },
    { id: 'mercado', name: 'Comida y mercado', group: 'needs', defaultValue: 450, icon: 'shopping_basket' },
    { id: 'servicios', name: 'Luz, agua, gas e internet', group: 'needs', defaultValue: 200, icon: 'flash_on' },
    { id: 'salidas', name: 'Salidas y gustos', group: 'wants', defaultValue: 400, icon: 'restaurant' },
    { id: 'streaming', name: 'Suscripciones y ropa nueva', group: 'wants', defaultValue: 350, icon: 'movie' },
    { id: 'emergencias', name: 'Fondo de emergencia', group: 'savings', defaultValue: 300, icon: 'savings' },
    { id: 'ahorro_deuda', name: 'Amortización a capital', group: 'savings', defaultValue: 200, icon: 'trending_down' },
  ],
};

export const CASE_CHALLENGE_STEPS: CaseStep[] = [
  {
    id: 'step-1',
    stageTitle: 'Paso 1: Dificultad inicial',
    scenario: 'Tienes una cuota de S/ 450 que vence en 5 días hábiles, pero un gasto médico familiar imprevisto de S/ 300 te deja solo con S/ 150 disponibles para el crédito.',
    options: [
      {
        id: 'opt-1a',
        text: 'Ignorar las notificaciones del banco y esperar a que pase el mes para ver si te sobra plata.',
        isOptimal: false,
        feedback: 'Riesgo alto: Dejar pasar el vencimiento genera intereses moratorios, afecta tu calificación SBS y reduce tus opciones de refinanciamiento.',
        points: 0,
      },
      {
        id: 'opt-1b',
        text: 'Pedirle dinero prestado a un prestamista callejero ("gota a gota") que promete prestarte al instante.',
        isOptimal: false,
        feedback: 'Peligro extremo: Los prestamistas informales cobran tasas usurarias de hasta 1,000% y usan extorsión y amenazas. Nunca recurras al gota a gota.',
        points: 0,
      },
      {
        id: 'opt-1c',
        text: 'Contactar de inmediato a la entidad financiera antes del vencimiento para solicitar una alternativa formal de reprogramación.',
        isOptimal: true,
        feedback: '¡Excelente decisión! Comunicarte antes del vencimiento demuestra buena fe y permite al banco ajustar el plazo o darte una prórroga formal sin manchar tu historial.',
        points: 50,
      },
    ],
  },
  {
    id: 'step-2',
    stageTitle: 'Paso 2: Evaluación con el banco',
    scenario: 'El banco recibe tu solicitud de reprogramación y te pide sustentar la contingencia temporal y presentar una propuesta de pago mensual factible.',
    options: [
      {
        id: 'opt-2a',
        text: 'Aceptar a ciegas cualquier ampliación a 5 años sin mirar la TCEA ni el cronograma final.',
        isOptimal: false,
        feedback: 'Ojo con el costo: Siempre debes solicitar la Hoja Resumen y verificar cuánto terminarás pagando en intereses totales antes de firmar.',
        points: 15,
      },
      {
        id: 'opt-2b',
        text: 'Presentar una propuesta realista de cuota que sí puedas cumplir y exigir el nuevo cronograma con la TCEA detallada.',
        isOptimal: true,
        feedback: '¡Perfecto! Un acuerdo formal sostenible debe adecuarse a tu capacidad de pago real, con fecha clara y tasa dentro del marco legal de la SBS.',
        points: 50,
      },
    ],
  },
];

export interface OnlineGamePlatform {
  id: string;
  name: string;
  categoryTag: string;
  url: string;
  description: string;
  image: string;
  highlights: string[];
  badgeColor: string;
}

export const ONLINE_GAMES_PLATFORMS: OnlineGamePlatform[] = [
  {
    id: 'poki',
    name: 'Poki',
    categoryTag: 'Juegos web instantáneos',
    url: 'https://poki.com/es',
    description: 'Plataforma internacional de juegos en línea sin descargas ni instalaciones. Ofrece miles de juegos casuales, acertijos, destreza y rompecabezas optimizados para computadoras y celulares.',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=700&q=80',
    highlights: ['Sin descargas', 'Compatible con celular y PC', 'Catálogo familiar'],
    badgeColor: 'bg-sky-50 text-[#007EAF] border-sky-200',
  },
  {
    id: 'crazygames',
    name: 'CrazyGames',
    categoryTag: 'Juegos de navegador HTML5',
    url: 'https://www.crazygames.com/es',
    description: 'Catálogo de juegos de acción, estrategia, lógica y multijugador ligero en HTML5 que se ejecutan directamente en cualquier navegador moderno con controles fluidos.',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=700&q=80',
    highlights: ['Juegos de lógica y habilidad', 'Rendimiento rápido', 'Variedad de géneros'],
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
  },
  {
    id: 'itch-io',
    name: 'itch.io HTML5',
    categoryTag: 'Comunidad de creadores indie',
    url: 'https://itch.io/games/html5',
    description: 'Comunidad global de desarrolladores independientes donde podrás explorar proyectos creativos, narrativos y experimentales jugables en el navegador con tecnologías web modernas.',
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=700&q=80',
    highlights: ['Juegos independientes', 'Experiencias creativas', 'Proyectos innovadores'],
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
];
