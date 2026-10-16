import {
  SituationItem,
  VideoItem,
  FinancialTerm,
  MythTruthItem,
  PracticalCase,
  FAQItem,
  OfficialSourceItem,
  RightTopic,
  AdvisoryResult,
  SituationId,
} from '../types';

export const APP_NAME = 'AL DÍA';
export const APP_SUBTITLE = 'Asesoramiento en Cobranzas';
export const APP_PROPOSAL = 'Orientación sencilla para tus créditos, pagos y cobranzas.';
export const APP_HERO_QUESTION = '¿Qué necesitas resolver hoy?';
export const APP_HERO_SUBTITLE = 'Encuentra una orientación sencilla sobre créditos, pagos y cobranzas.';
export const APP_LOGO_URL = '/logo-aldia.svg';

export const DISCLAIMER_NOTE =
  'AL DÍA es una plataforma de orientación y educación financiera. No es una entidad bancaria, no otorga créditos, no realiza cobranzas, no negocia deudas y no reemplaza la evaluación formal de una entidad regulada o asesor profesional.';

export const PRIVACY_NOTICE = {
  title: 'Protege tus datos personales y bancarios',
  desc: 'AL DÍA nunca te solicitará DNI, números de tarjeta, claves secretas, contraseñas ni datos bancarios confidenciales. La orientación es totalmente informativa.',
};

// 7 Situaciones Principales
export const SITUATIONS_DATA: SituationItem[] = [
  {
    id: 'no-puedo-pagar',
    title: 'No puedo pagar mi cuota',
    homeTitle: 'No puedo pagar',
    homeButtonText: 'Ver orientación',
    shortDesc: 'Orientación para afrontar dificultades para cumplir un pago.',
    subtitle: 'Si tienes dificultades para pagar, conoce las alternativas formales antes del vencimiento.',
    icon: 'account_balance_wallet',
    tagColor: '#D64545',
    meaning:
      'Una dificultad para cumplir con una cuota indica que tus ingresos actuales no cubren la obligación en la fecha pactada. Las entidades financieras cuentan con canales para evaluar tu caso antes de que caigas en morosidad.',
    whatCanYouDo: [
      'Revisar las fechas límites exactas en tu estado de cuenta o aplicación oficial.',
      'Calcular qué monto real puedes destinar al pago sin desatender tus necesidades básicas.',
      'Comunicarte con la entidad financiera antes del vencimiento para solicitar opciones formales (reprogramación, refinanciamiento o prórroga).',
      'Solicitar que te expliquen por escrito o en simulador el nuevo cronograma y la tasa de interés aplicable.',
    ],
    whatToAvoid: [
      'Ignorar la situación o no responder a la entidad financiera.',
      'Asumir deudas informales ("gota a gota" o prestamistas no regulados) para pagar la cuota.',
      'Aceptar refinanciamientos automáticos sin revisar el nuevo costo total (TCEA).',
      'Compartir información bancaria o claves con desconocidos que ofrezcan "soluciones mágicas".',
    ],
    practicalAdvice:
      'Comunícate con la entidad antes del vencimiento. Mientras antes plantees tu situación, más alternativas formales tendrás disponibles.',
    officialSource: {
      name: 'Superintendencia de Banca, Seguros y AFP (SBS)',
      description: 'Regulación sobre reprogramaciones y derechos del usuario crediticio.',
      url: 'https://www.sbs.gob.pe',
    },
  },
  {
    id: 'me-atrase',
    title: 'Me atrasé en un pago',
    homeTitle: 'Me atrasé en un pago',
    homeButtonText: 'Ver orientación',
    shortDesc: 'Conoce qué puedes hacer ante un atraso.',
    subtitle: 'Un atraso genera intereses moratorios y afecta tu reporte crediticio. Actuar a tiempo previene mayores costos.',
    icon: 'calendar_month',
    tagColor: '#D99A24',
    meaning:
      'Un atraso significa que el pago no se realizó dentro de la fecha establecida. Las consecuencias dependen de las condiciones del crédito y de los días transcurridos.',
    whatCanYouDo: [
      'Revisar las condiciones de tu crédito y cronograma original.',
      'Identificar qué monto está pendiente y cuántos días de atraso tienes.',
      'Comunicarte con la entidad financiera correspondiente a través de canales oficiales.',
      'Evaluar una alternativa de pago según tu capacidad económica real.',
      'Comprobar posteriormente en tu Reporte SBS que el crédito figure actualizado una vez regularizado.',
    ],
    whatToAvoid: [
      'Ignorar la situación dejando que pasen semanas o meses acumulando mora.',
      'Asumir nuevos créditos sin evaluar tu capacidad de pago.',
      'Compartir información bancaria o contraseñas con personas no verificadas.',
      'Pagar a cuentas bancarias personales de supuestos gestores o tramitadores.',
    ],
    practicalAdvice:
      'Infórmate primero y toma decisiones de acuerdo con tu capacidad de pago.',
    officialSource: {
      name: 'Superintendencia de Banca, Seguros y AFP (SBS)',
      description: 'Información sobre Central de Riesgos y cálculo de intereses moratorios.',
      url: 'https://www.sbs.gob.pe',
    },
  },
  {
    id: 'me-estan-cobrando',
    title: 'Me están cobrando',
    homeTitle: 'Me están cobrando',
    homeButtonText: 'Ver orientación',
    shortDesc: 'Conoce información y derechos relacionados con la cobranza.',
    subtitle: 'La cobranza debe respetar tus derechos, tu privacidad y los horarios establecidos por ley.',
    icon: 'phone_in_talk',
    tagColor: '#0F3B82',
    meaning:
      'La gestión de cobranza es el proceso que realizan las entidades o empresas autorizadas para requerir el pago de una obligación vencida. Este proceso está estrictamente regulado por normas que protegen tu dignidad y privacidad.',
    whatCanYouDo: [
      'Identificar con precisión quién realiza la cobranza: nombre del gestor, empresa de cobranza y entidad acreedora.',
      'Solicitar el desglose exacto de la deuda: saldo a capital, intereses compensatorios, moratorios y comisiones.',
      'Verificar los horarios permitidos por ley: lunes a viernes de 7:00 a.m. a 8:00 p.m. y sábados de 8:00 a.m. a 2:00 p.m. (domingos y feriados prohibido).',
      'Realizar cualquier pago exclusivamente a través de los canales y cuentas oficiales de la entidad titular.',
      'Presentar un reclamo en el Libro de Reclamaciones o acudir a INDECOPI si detectas métodos abusivos.',
    ],
    whatToAvoid: [
      'Realizar transferencias a cuentas bancarias personales de supuestos gestores de cobranza.',
      'Permitir métodos intimidatorios, agresiones o contacto con terceros ajenos a la deuda (jefes, vecinos o compañeros de trabajo).',
      'Firmar compromisos de pago en blanco o documentos sin conservar copia sellada.',
    ],
    practicalAdvice:
      'Exige siempre información detallada por escrito y canaliza tus pagos únicamente en las cuentas oficiales de la entidad acreedora.',
    officialSource: {
      name: 'INDECOPI - Protección al Consumidor',
      description: 'Normativa sobre métodos comerciales y de cobranza prohibidos (Código de Protección y Defensa del Consumidor).',
      url: 'https://www.gob.pe/indecopi',
    },
  },
  {
    id: 'no-entiendo-credito',
    title: 'No entiendo mi crédito',
    homeTitle: 'No entiendo mi crédito',
    homeButtonText: 'Ver orientación',
    shortDesc: 'Aprende sobre cuotas, intereses, tasas y otros conceptos.',
    subtitle: 'Conoce de manera sencilla los términos financieros más comunes al solicitar o pagar un préstamo.',
    icon: 'description',
    tagColor: '#00B49F',
    meaning:
      'Un crédito es un contrato financiero que incluye varios conceptos además del dinero prestado: tasa de interés, comisiones, seguros, cronograma y penalidades por mora.',
    whatCanYouDo: [
      'Solicitar y revisar tu Hoja Resumen y Contrato de crédito antes y después del desembolso.',
      'Revisar la TCEA (Tasa de Costo Efectivo Anual), que resume todos los intereses, seguros y comisiones del crédito.',
      'Diferenciar entre amortización a capital (lo que reduce tu deuda) e interés (el costo del dinero prestado).',
      'Pedir a la entidad una simulación detallada de pagos con distintas opciones de plazo.',
    ],
    whatToAvoid: [
      'Firmar contratos o pagarés sin solicitar y leer previamente la Hoja Resumen.',
      'Guiarte únicamente por el valor de la cuota mensual sin calcular el costo total final.',
      'Pagar únicamente el monto mínimo en tarjetas de crédito de manera continua.',
    ],
    practicalAdvice:
      'Compara siempre la TCEA entre entidades financieras; es el indicador real del costo de un crédito.',
    officialSource: {
      name: 'Superintendencia de Banca, Seguros y AFP (SBS)',
      description: 'Guía de Educación Financiera sobre tipos de crédito y Hoja Resumen.',
      url: 'https://www.sbs.gob.pe',
    },
  },
  {
    id: 'quiero-pagar-antes',
    title: 'Quiero pagar antes',
    homeTitle: 'Quiero pagar antes',
    homeButtonText: 'Ver orientación',
    shortDesc: 'Conoce información sobre pagos anticipados.',
    subtitle: 'Tienes derecho a amortizar tu deuda antes del plazo pactado sin pagar comisiones ni penalidades.',
    icon: 'check_circle',
    tagColor: '#2563EB',
    meaning:
      'Los usuarios del sistema financiero tienen el derecho irrenunciable a realizar pagos anticipados en cualquier momento, reduciendo intereses futuros, comisiones y gastos asociados.',
    whatCanYouDo: [
      'Decidir entre "Pago Anticipado" (reduce capital adeudado e intereses futuros) o "Adelanto de Cuotas" (cubre cuotas futuras correlativas según cronograma).',
      'Si eliges Pago Anticipado, indicar si deseas reducir el plazo (terminar antes) o reducir el valor de la cuota mensual.',
      'Solicitar inmediatamente a la entidad tu nuevo cronograma de pagos actualizado sin costo alguno.',
    ],
    whatToAvoid: [
      'Abonar un monto extraordinario sin especificar expresamente en ventanilla o app que es "Pago Anticipado a Capital".',
      'Aceptar cobros por penalidad de prepago (la normativa SBS prohíbe cobrar comisiones por pago anticipado).',
    ],
    practicalAdvice:
      'Especifica siempre al cajero o en la app que tu abono es "Pago Anticipado a Capital" para que se descuenten los intereses futuros.',
    officialSource: {
      name: 'Superintendencia de Banca, Seguros y AFP (SBS)',
      description: 'Reglamento de Gestión de Conducta de Mercado sobre pagos anticipados.',
      url: 'https://www.sbs.gob.pe',
    },
  },
  {
    id: 'cuidar-historial',
    title: 'Quiero cuidar mi historial',
    homeTitle: 'Quiero cuidar mi historial',
    homeButtonText: 'Ver orientación',
    shortDesc: 'Aprende por qué tu comportamiento de pago es importante.',
    subtitle: 'Tu comportamiento de pago influye en las condiciones y tasas que recibirás al solicitar nuevos créditos.',
    icon: 'shield',
    tagColor: '#00B49F',
    meaning:
      'El historial crediticio refleja tu comportamiento y puntualidad en el cumplimiento de créditos y servicios. Las entidades lo consultan en la Central de Riesgos de la SBS para evaluar futuras solicitudes.',
    whatCanYouDo: [
      'Pagar tus obligaciones dentro de las fechas límites establecidas.',
      'Consultar gratuitamente tu Reporte de Deudas SBS periódicamente para verificar que tus datos estén al día.',
      'Solicitar tu Constancia de No Adeudo una vez que liquides por completo cualquier crédito.',
      'Mantener un porcentaje de uso prudente en tus líneas de crédito (idealmente no superar el 50% de la línea disponible).',
    ],
    whatToAvoid: [
      'Creer en supuestos tramitadores o anuncios en redes que prometen "borrar deudas" o "limpiar historial" por dinero (es un fraude).',
      'Servir de garante o aval a terceras personas sin tener certeza de su solvencia.',
      'Dejar cuentas bancarias con comisiones pendientes que puedan generar morosidad no advertida.',
    ],
    practicalAdvice:
      'La única forma legítima de mantener o recuperar un buen historial crediticio es regularizar tus pagos pendientes y mantener puntualidad sostenida.',
    officialSource: {
      name: 'Central de Riesgos SBS',
      description: 'Consulta oficial y gratuita de tu reporte de deudas en la SBS.',
      url: 'https://www.sbs.gob.pe',
    },
  },
  {
    id: 'varias-obligaciones',
    title: 'Tengo varias obligaciones',
    homeTitle: 'Tengo varias obligaciones',
    homeButtonText: 'Ver orientación',
    shortDesc: 'Conoce recomendaciones para evitar el sobreendeudamiento.',
    subtitle: 'Administrar múltiples compromisos financieros requiere orden, priorización y una evaluación de capacidad de pago.',
    icon: 'layers',
    tagColor: '#6366F1',
    meaning:
      'Tener múltiples créditos, cuotas o tarjetas al mismo tiempo puede comprometer un porcentaje excesivo de tus ingresos mensuales, generando riesgo de sobreendeudamiento.',
    whatCanYouDo: [
      'Elaborar una lista ordenada con todas tus deudas: entidad, saldo pendiente, cuota mensual, fecha de vencimiento y tasa (TCEA).',
      'Evaluar una consolidación o compra de deuda en una sola entidad que ofrezca menor TCEA y una cuota unificada accesible.',
      'Priorizar el pago de las deudas con mayor tasa de interés o las más próximas a vencer.',
      'Elaborar un presupuesto mensual estricto recortando gastos no esenciales.',
    ],
    whatToAvoid: [
      'Adquirir un nuevo crédito de consumo para pagar las cuotas de créditos anteriores sin un plan formal de consolidación.',
      'Comprometer más del 30% a 40% de tus ingresos netos en el pago acumulado de cuotas.',
      'Seguir usando tarjetas de crédito mientras buscas amortizar tus obligaciones.',
    ],
    practicalAdvice:
      'Haz un balance de todas tus cuotas mensuales. Si el total supera el 40% de tus ingresos, acércate a una entidad para evaluar una compra de deuda consolidada.',
    officialSource: {
      name: 'Superintendencia de Banca, Seguros y AFP (SBS)',
      description: 'Guía sobre prevención del sobreendeudamiento y consolidación de créditos.',
      url: 'https://www.sbs.gob.pe',
    },
  },
];

// 8 Videos Reales de la SBS y Educación Financiera organizados por temas
export const VIDEOS_DATA: VideoItem[] = [
  {
    id: 'video-1',
    titulo: 'Cumple tus metas: Infórmate, compara y decide',
    categoria: 'Créditos y tasas de interés',
    duracion: '2:15 min',
    fuente: 'Superintendencia de Banca, Seguros y AFP (SBS)',
    url: 'https://www.youtube.com/watch?v=3hgH7E51IFw',
    isFeatured: true,
    descripcion: 'Aprende a comparar alternativas de crédito antes de contratar una obligación financiera evaluando la TCEA.',
    keyTakeaways: [
      'Comparar la TCEA entre tres entidades distintas.',
      'Solicitar y leer la Hoja Resumen antes de firmar.',
      'Evaluar si el plazo no multiplica excesivamente los intereses totales.',
    ],
  },
  {
    id: 'video-2',
    titulo: 'Usa tu tarjeta de crédito adecuadamente',
    categoria: 'Créditos y tasas de interés',
    duracion: '2:40 min',
    fuente: 'Superintendencia de Banca, Seguros y AFP (SBS)',
    url: 'https://www.youtube.com/watch?v=4U75eIlS_4I',
    isFeatured: true,
    descripcion: 'Recomendaciones clave para entender fechas de corte, pago del mes y evitar la trampa del pago mínimo.',
    keyTakeaways: [
      'Diferenciar fecha de corte y fecha límite de pago.',
      'Evitar pagar solo el mínimo para no perpetuar la deuda.',
      'Aprovechar hasta 50 días de financiamiento pagando el total del mes.',
    ],
  },
  {
    id: 'video-3',
    titulo: 'Historial crediticio y Central de Riesgos SBS',
    categoria: 'Historial crediticio',
    duracion: '2:20 min',
    fuente: 'Superintendencia de Banca, Seguros y AFP (SBS)',
    url: 'https://www.youtube.com/watch?v=wWKkxtuvDcQ',
    isFeatured: true,
    descripcion: 'Cómo funciona la Central de Riesgos de la SBS y cómo se clasifica tu comportamiento de pago del 0 al 4.',
    keyTakeaways: [
      'Todos los que tienen un crédito formal figuran en la SBS.',
      'La categoría 0 (Normal) abre puertas a mejores condiciones y tasas.',
      'Un atraso de más de 8 días cambia tu calificación a CPP.',
    ],
  },
  {
    id: 'video-4',
    titulo: '¿Se pueden borrar las deudas de mi historial crediticio?',
    categoria: 'Historial crediticio',
    duracion: '3:10 min',
    fuente: 'Superintendencia de Banca, Seguros y AFP (SBS)',
    url: 'https://www.youtube.com/watch?v=DOBcO9zvypo',
    isFeatured: false,
    descripcion: 'Conoce los mitos sobre la supuesta limpieza de historial y los plazos reales de actualización según ley.',
    keyTakeaways: [
      'Nadie puede borrar deudas ni alterar la SBS por dinero.',
      'La única vía legítima es regularizar la obligación pendiente.',
      'Exige tu Constancia de No Adeudo gratuita tras liquidar la deuda.',
    ],
  },
  {
    id: 'video-5',
    titulo: 'Comisiones prohibidas en el sistema financiero',
    categoria: 'Derechos del usuario',
    duracion: '2:30 min',
    fuente: 'Superintendencia de Banca, Seguros y AFP (SBS)',
    url: 'https://www.youtube.com/watch?v=joimdne9A_E',
    isFeatured: false,
    descripcion: 'Conoce los cobros y comisiones que las entidades financieras NO pueden aplicarte por normativa de la SBS.',
    keyTakeaways: [
      'Prohibido cobrar comisiones sin servicio efectivo prestado.',
      'Prohibido cobrar penalidades por pago anticipado a capital.',
      'Prohibido cobrar por recepción de pagos en ventanilla.',
    ],
  },
  {
    id: 'video-6',
    titulo: 'Presupuesto familiar paso a paso',
    categoria: 'Educación financiera',
    duracion: '3:45 min',
    fuente: 'Superintendencia de Banca, Seguros y AFP (SBS)',
    url: 'https://www.youtube.com/watch?v=DyaJTqrM_78',
    isFeatured: true,
    descripcion: 'Guía práctica para armar tu presupuesto mensual, identificar gastos hormiga y fijar metas de ahorro.',
    keyTakeaways: [
      'Identificar ingresos netos fijos y variables.',
      'Separar necesidades básicas de gastos prescindibles.',
      'Asignar una partida obligatoria para imprevistos.',
    ],
  },
  {
    id: 'video-7',
    titulo: 'Atención de reclamos y Libro de Reclamaciones',
    categoria: 'Reclamos y consultas',
    duracion: '3:15 min',
    fuente: 'Superintendencia de Banca, Seguros y AFP (SBS)',
    url: 'https://www.youtube.com/watch?v=lMCwP1C-n6s',
    isFeatured: false,
    descripcion: 'Procedimiento formal para presentar un reclamo ante entidades financieras y plazos legales de respuesta.',
    keyTakeaways: [
      'Plazo legal máximo de respuesta: 15 días hábiles.',
      'Exigir siempre tu código o copia de la hoja de reclamación.',
      'Canales de apelación ante INDECOPI y la SBS.',
    ],
  },
  {
    id: 'video-8',
    titulo: 'Prevención de fraudes financieros y phishing',
    categoria: 'Prevención del fraude financiero',
    duracion: '2:50 min',
    fuente: 'Superintendencia de Banca, Seguros y AFP (SBS)',
    url: 'https://youtu.be/baUXtx9ozyc',
    isFeatured: false,
    descripcion: 'Medidas de seguridad para proteger tus claves secretas, tokens digitales y evitar estafas telefónicas.',
    keyTakeaways: [
      'Nunca compartir claves de 4 o 6 dígitos por teléfono o SMS.',
      'Los bancos nunca piden códigos token para anular compras.',
      'Verificar siempre la URL oficial antes de ingresar credenciales.',
    ],
  },
];

// Diccionario Financiero: Palabras indispensables
export const FINANCIAL_TERMS: FinancialTerm[] = [
  {
    id: 'credito',
    term: 'Crédito',
    definition:
      'Operación financiera en la que una entidad autorizada entrega una suma de dinero o financiamiento con el compromiso de que sea devuelto en cuotas acordadas más intereses.',
    example: 'Un préstamo personal de S/ 4,000 para equipamiento de trabajo o una tarjeta de crédito.',
    importance: 'Permite financiar proyectos o emergencias, pero compromete ingresos futuros.',
    source: 'SBS - Glosario de Términos Financieros',
  },
  {
    id: 'tasa-interes',
    term: 'Tasa de interés',
    definition:
      'Porcentaje que representa el costo que cobra la entidad financiera por prestarte el dinero durante un periodo de tiempo determinado (habitualmente expresado en TEA anual).',
    example: 'Si un crédito tiene una TEA del 18%, ese porcentaje se aplica sobre el saldo deudor del capital prestado.',
    importance: 'Determina qué tan caro o económico resulta el préstamo a lo largo del tiempo.',
    source: 'Superintendencia de Banca, Seguros y AFP (SBS)',
  },
  {
    id: 'cuota',
    term: 'Cuota',
    definition:
      'Monto periódico (habitualmente mensual) que el deudor se compromete a pagar a la entidad. Está compuesta por amortización del capital, intereses compensatorios y seguros obligatorios.',
    example: 'En una cuota mensual de S/ 380: S/ 250 van a capital, S/ 115 a intereses y S/ 15 al seguro de desgravamen.',
    importance: 'Debe encajar holgadamente en tu presupuesto mensual sin superar tu capacidad de pago.',
    source: 'SBS - Reglamento de Gestión de Conducta de Mercado',
  },
  {
    id: 'capital',
    term: 'Capital',
    definition:
      'El monto exacto de dinero que la entidad financiera te prestó originalmente, excluyendo intereses futuros, comisiones o seguros.',
    example: 'Si te prestaron S/ 5,000 y has devuelto S/ 2,000 de capital, tu saldo insoluto de capital es de S/ 3,000.',
    importance: 'Los intereses de cada mes se calculan únicamente sobre el saldo de capital pendiente.',
    source: 'SBS - Definiciones Operativas de Crédito',
  },
  {
    id: 'interes-moratorio',
    term: 'Interés moratorio',
    definition:
      'Recargo adicional que la entidad financiera aplica únicamente cuando una cuota no es pagada en la fecha pactada en el cronograma. Se aplica por cada día de atraso.',
    example: 'Si tu cuota venció el día 10 y pagas el 20, te cobrarán intereses moratorios calculados sobre los 10 días de demora.',
    importance: 'Eleva el costo de la obligación e incrementa la deuda mientras más tiempo transcurra.',
    source: 'Código Civil del Perú y normativa SBS',
  },
  {
    id: 'plazo',
    term: 'Plazo',
    definition:
      'El periodo de tiempo acordado entre el cliente y la entidad financiera para devolver la totalidad del préstamo (por ejemplo 12, 24 o 36 meses).',
    example: 'Elegir un plazo de 36 meses reduce la cuota mensual, pero eleva los intereses totales frente a un plazo de 18 meses.',
    importance: 'A mayor plazo, mayor es el número de veces que se liquidan intereses y seguros sobre el saldo.',
    source: 'SBS - Guía para la Contratación de Créditos',
  },
  {
    id: 'garantia',
    term: 'Garantía',
    definition:
      'Bien mueble, inmueble o aval personal que el deudor entrega o compromete para respaldar el cumplimiento del pago del crédito ante la entidad.',
    example: 'En un crédito hipotecario, la vivienda adquirida queda hipotecada como garantía del crédito.',
    importance: 'Permite acceder a montos más elevados o tasas menores, pero compromete el bien en caso de incumplimiento.',
    source: 'Ley N° 26702 - Ley General del Sistema Financiero',
  },
  {
    id: 'historial-crediticio',
    term: 'Historial crediticio',
    definition:
      'Registro oficial y confidencial que recopila el comportamiento de pago de una persona en todos los créditos y servicios contratados en el sistema formal.',
    example: 'Haber pagado puntualmente todas tus cuotas en los últimos dos años otorga un récord crediticio favorable.',
    importance: 'Es evaluado por todas las entidades antes de aprobarte un crédito, alquiler o incremento de línea.',
    source: 'Central de Riesgos SBS',
  },
  {
    id: 'central-de-riesgos',
    term: 'Central de Riesgos',
    definition:
      'Base de datos administrada por la SBS donde todas las empresas del sistema financiero reportan mensualmente el estado de los créditos de sus clientes.',
    example: 'La SBS actualiza el último día hábil de cada mes la información de deudas de bancos, cajas y financieras.',
    importance: 'Permite al ciudadano consultar su estado de deudas de forma gratuita y oficial con su DNI.',
    source: 'Superintendencia de Banca, Seguros y AFP (SBS)',
  },
  {
    id: 'reprogramacion',
    term: 'Reprogramación',
    definition:
      'Modificación de las condiciones originales del crédito (habitualmente ampliando el plazo o reduciendo la cuota) acordada antes de que el cliente caiga en morosidad grave.',
    example: 'Si tus ingresos bajan, solicitas reprogramar tu préstamo de 12 a 24 meses para que la cuota baje a una cifra alcanzable.',
    importance: 'Permite mantener la calificación crediticia Normal sin caer en categoría de morosidad.',
    source: 'SBS - Circular de Reprogramaciones Crediticias',
  },
  {
    id: 'refinanciacion',
    term: 'Refinanciación',
    definition:
      'Operación mediante la cual se reestructura una deuda que ya presenta atrasos importantes o deterioro en la capacidad de pago del deudor, consolidando saldos e intereses.',
    example: 'Firmar un nuevo contrato para pagar una deuda con 60 días de atraso en un plazo más amplio y con nuevo cronograma.',
    importance: 'Detiene las acciones de cobranza judicial, aunque reporta una categoría especial en la Central de Riesgos.',
    source: 'Resolución SBS N° 11356-2008',
  },
  {
    id: 'sobreendeudamiento',
    term: 'Sobreendeudamiento',
    definition:
      'Situación financiera crítica en la cual el total acumulado de las cuotas mensuales de deudas supera la capacidad real de pago del deudor.',
    example: 'Percibir S/ 2,200 netos al mes pero tener que pagar S/ 1,800 sumando cuotas de préstamos y tarjetas.',
    importance: 'Genera insolvencia y obliga a reestructurar o consolidar deudas con urgencia.',
    source: 'SBS - Circular de Riesgo de Sobreendeudamiento',
  },
  {
    id: 'capacidad-de-pago',
    term: 'Capacidad de pago',
    definition:
      'Monto máximo mensual que una persona puede destinar al pago de deudas después de haber cubierto todos sus gastos básicos indispensables.',
    example: 'Si ganas S/ 2,500 y tus gastos esenciales (alquiler, comida, servicios, salud) son S/ 1,700, tu capacidad máxima es S/ 800.',
    importance: 'Es el límite prudente que jamás debe sobrepasarse al solicitar un nuevo financiamiento.',
    source: 'Educación Financiera AlDía',
  },
  {
    id: 'calificacion-crediticia',
    term: 'Calificación crediticia',
    definition:
      'Categoría de riesgo asignada por la SBS a cada deudor (del 0 al 4: Normal, CPP, Deficiente, Dudoso, Pérdida) en función del cumplimiento y días de atraso.',
    example: 'Estar calificado en categoría "0 - Normal" significa que pagas tus cuotas puntualmente o con menos de 8 días de demora.',
    importance: 'Condiciona el acceso a créditos futuros y las tasas de interés que te aplicarán las entidades.',
    source: 'SBS - Reglamento de Clasificación del Deudor',
  },
  {
    id: 'tcea',
    term: 'TCEA (Tasa de Costo Efectivo Anual)',
    definition:
      'Indicador integral que resume el costo total anual de un crédito: reúne la tasa compensatoria (TEA), comisiones operativas y seguros obligatorios.',
    example: 'Si un crédito tiene TEA de 22% pero TCEA de 34%, el 34% es el porcentaje real que pagarás sumando todos los cargos.',
    importance: 'Es la única tasa válida para comparar cuál crédito es verdaderamente más económico.',
    source: 'Ley N° 29571 - Código de Protección al Consumidor',
  },
];

// Mitos y Verdades Interactivos
export const MYTHS_AND_TRUTHS: MythTruthItem[] = [
  {
    id: 'mito-1',
    myth: 'Pagar puntualmente una cuota me exonera de todos los intereses pactados en el cronograma.',
    truth: 'Pagar puntualmente solo te exonera de los intereses moratorios, no de los intereses compensatorios.',
    explanation:
      'Los intereses compensatorios son el costo regular pactado por usar el dinero prestado mes a mes. Al pagar puntualmente evitas recargos por mora y mantienes tu récord intacto, pero la cuota normal incluye la porción de interés correspondiente al periodo.',
    example: 'En una cuota de S/ 400, pagar a tiempo evita los S/ 30 de interés moratorio, pero S/ 90 siguen siendo intereses compensatorios del crédito.',
    source: 'Código Civil y normativa SBS',
    topic: 'Pagar puntualmente',
  },
  {
    id: 'mito-2',
    myth: 'La entidad que ofrece la TEA más baja siempre tiene el crédito más barato.',
    truth: 'La TEA no incluye seguros ni comisiones; la única tasa que define el costo total es la TCEA.',
    explanation:
      'Una entidad puede ofrecer una TEA atractiva del 15%, pero al sumar seguros de desgravamen elevados y comisiones administrativas, su TCEA puede llegar al 32%, resultando más cara que otra con TEA del 18% y seguros económicos.',
    example: 'Compara siempre la TCEA en la Hoja Resumen oficial antes de tomar una decisión de financiamiento.',
    source: 'Ley N° 29571 (Código del Consumidor)',
    topic: 'Tasas de interés',
  },
  {
    id: 'mito-3',
    myth: 'Existen tramitadores o empresas que pueden "borrar deudas" o limpiar mi historial crediticio por dinero.',
    truth: 'Nadie puede borrar deudas ni alterar la Central de Riesgos de la SBS a cambio de dinero.',
    explanation:
      'Cualquier anuncio en redes que ofrezca "limpiar tu reporte SBS" o "borrarte de Infocorp" por un pago es una estafa. La Central de Riesgos es una base de datos pública y la única vía legal de regularizar tu récord es pagar la deuda y solicitar tu Constancia de No Adeudo.',
    example: 'Desconfía de mensajes que te pidan depósitos a cuentas personales prometiendo cambiar tu calificación crediticia.',
    source: 'Superintendencia de Banca, Seguros y AFP (SBS)',
    topic: 'Historial crediticio',
  },
  {
    id: 'mito-4',
    myth: 'Si quiero cancelar o amortizar mi crédito antes del plazo pactado, el banco puede cobrarme una penalidad.',
    truth: 'Por ley, el pago anticipado es un derecho irrenunciable y libre de cualquier penalidad o comisión.',
    explanation:
      'La Ley de Protección al Consumidor en el Perú y las resoluciones de la SBS establecen que todo usuario puede realizar pagos anticipados totales o parciales sin ningún recargo, deduciendo los intereses futuros proporcionales.',
    example: 'Si tienes un dinero extra y amortizas S/ 2,000 a capital, el banco debe reducir tus intereses futuros y entregarte un cronograma nuevo gratis.',
    source: 'Ley N° 29571, Art. 85 y SBS',
    topic: 'Cancelación de créditos',
  },
  {
    id: 'mito-5',
    myth: 'Presentar un reclamo formal en el Libro de Reclamaciones me perjudicará o manchará mi relación con el banco.',
    truth: 'Reclamar es un derecho garantizado por ley y las entidades tienen prohibido tomar represalias.',
    explanation:
      'El Libro de Reclamaciones es una herramienta obligatoria supervisada por INDECOPI y la SBS. Las entidades tienen un plazo legal máximo de 15 días hábiles para dar respuesta fundamentada. No afecta en absoluto tu calificación crediticia.',
    example: 'Si te cobraron una comisión indebida, asentar tu reclamo formalmente es el conducto legal para exigir la devolución del cobro.',
    source: 'INDECOPI - Sistema de Reclamaciones',
    topic: 'Reclamos financieros',
  },
  {
    id: 'mito-6',
    myth: 'Pagar únicamente el monto mínimo de mi tarjeta de crédito cada mes me ayuda a salir de deudas.',
    truth: 'El pago mínimo solo cubre intereses, comisiones y una fracción ínfima del capital, multiplicando la deuda.',
    explanation:
      'Pagar solo el mínimo prolonga la deuda durante años e incrementa drásticamente los intereses totales pagados. La recomendación es pagar siempre el "Pago del Mes" (total facturado) o un monto sustancialmente superior al mínimo.',
    example: 'En una deuda de tarjeta de S/ 3,000, pagar solo el mínimo puede demorar más de 7 años en liquidarse pagando más del doble en intereses.',
    source: 'SBS - Portal de Educación Financiera',
    topic: 'Uso responsable de tarjetas',
  },
];

// Casos Prácticos Cotidianos Reales (5 Casos Específicos Requeridos)
export const PRACTICAL_CASES: PracticalCase[] = [
  {
    id: 'caso-1',
    character: 'Carlos',
    title: 'Comparar dos préstamos con diferentes tasas (TCEA vs TEA)',
    situation:
      'Carlos necesita solicitar un préstamo personal de S/ 5,000 a 18 meses. El Banco A le ofrece una TEA de 18% con una cuota mensual de S/ 355. La Caja B le ofrece una TEA de 22% pero con una cuota mensual de S/ 340 debido a menores seguros y comisiones.',
    question: '¿Qué dato fundamental debe comparar Carlos antes de decidir cuál crédito es más conveniente?',
    options: [
      {
        id: 'opt-1a',
        text: 'Elegir el Banco A inmediatamente porque su TEA (18%) es cuatro puntos porcentuales menor que la de la Caja B.',
        isRecommended: false,
        feedback:
          'Error común: la TEA solo mide los intereses del dinero. Si el seguro de desgravamen o las comisiones son altas, el costo total puede ser mayor.',
      },
      {
        id: 'opt-1b',
        text: 'Solicitar la Hoja Resumen oficial de ambas entidades y comparar la TCEA (Tasa de Costo Efectivo Anual) que incluye todos los cobros.',
        isRecommended: true,
        feedback:
          '¡Correcto! La TCEA es el único indicador homologado que suma intereses, seguros y comisiones. La opción con menor TCEA es la que le ahorrará dinero real.',
      },
      {
        id: 'opt-1c',
        text: 'Fijarse únicamente en el color de la publicidad y aceptar el desembolso que se apruebe más rápido.',
        isRecommended: false,
        feedback:
          'Inadecuado: la rapidez en el desembolso no compensa pagar cientos de soles extra en intereses a lo largo de 18 meses.',
      },
    ],
    educationalTakeaway:
      'Compara siempre la TCEA antes de firmar cualquier crédito. Una TEA baja puede verse encarecida por seguros y comisiones adicionales.',
  },
  {
    id: 'caso-2',
    character: 'Elena',
    title: 'Cliente descubre un cobro que no reconoce en su estado de cuenta',
    situation:
      'Elena revisa su estado de cuenta mensual y encuentra un cargo recurrente de S/ 45 denominado "Membresía Premium Asistencia" que ella asegura nunca haber contratado ni firmado.',
    question: '¿Cuál es la acción correcta que debe realizar Elena?',
    options: [
      {
        id: 'opt-2a',
        text: 'Dejar de pagar la totalidad de su cuota mensual en señal de protesta hasta que el banco elimine el cobro.',
        isRecommended: false,
        feedback:
          'No lo hagas: dejar de pagar la cuota completa generará intereses moratorios diarios y un reporte negativo en la Central de Riesgos de la SBS.',
      },
      {
        id: 'opt-2b',
        text: 'Comunicarse de inmediato con el banco, registrar un reclamo formal en el Libro de Reclamaciones solicitando la póliza o audio de contratación, y exigir la anulación y extorno del cobro.',
        isRecommended: true,
        feedback:
          '¡Excelente decisión! La entidad tiene la carga de la prueba para demostrar que Elena aceptó el servicio expresamente. Si no existe consentimiento firmado o grabado, deben extornar el dinero en un plazo máximo de 15 días hábiles.',
      },
      {
        id: 'opt-2c',
        text: 'Aceptar el cargo y resignarse porque los contratos bancarios suelen incluir servicios obligatorios automáticos.',
        isRecommended: false,
        feedback:
          'Falso: por normativa de la SBS, ningún seguro o asistencia accesoria puede ser condicionado o cargado sin el consentimiento previo, expreso e informado del usuario.',
      },
    ],
    educationalTakeaway:
      'Revisa tu estado de cuenta cada mes. Ante un cobro no reconocido, reclama formalmente exigiendo el sustento de contratación y el extorno correspondiente.',
  },
  {
    id: 'caso-3',
    character: 'Miguel',
    title: 'Llamada sospechosa solicitando claves y tokens bancarios',
    situation:
      'Miguel recibe una llamada de una persona que se identifica como funcionario de seguridad de su banco. Le alerta que "se ha detectado una compra no autorizada de S/ 1,800 en una tienda online" y le pide que le dicte el código de 6 dígitos que le acaba de llegar por mensaje de texto para "anular la compra de inmediato".',
    question: '¿Qué debe hacer Miguel frente a esta situación?',
    options: [
      {
        id: 'opt-3a',
        text: 'Dictar rápidamente el código de 6 dígitos para que el operador pueda cancelar la supuesta compra fraudulenta.',
        isRecommended: false,
        feedback:
          '¡Peligro crítico de fraude! El código que llegó a su teléfono no era para anular nada: era el token dinámico de autorización para transferir su dinero o validar un crédito.',
      },
      {
        id: 'opt-3b',
        text: 'Cortar la llamada de inmediato, no compartir ningún código ni clave, y comunicarse él mismo con los canales oficiales de su banco para verificar sus movimientos.',
        isRecommended: true,
        feedback:
          '¡Correcto! Los bancos NUNCA solicitan claves secretas, contraseñas ni códigos de verificación SMS o token por teléfono. Cortar y llamar a los números oficiales del reverso de la tarjeta previene el robo de fondos.',
      },
      {
        id: 'opt-3c',
        text: 'Darle una clave falsa al operador para comprobar si es una estafa o una llamada real.',
        isRecommended: false,
        feedback:
          'No interactúes con estafadores. Cortar la comunicación y bloquear el número es la medida más segura y efectiva.',
      },
    ],
    educationalTakeaway:
      'Tus claves y tokens son 100% personales e intransferibles. Ninguna entidad legítima te llamará para pedirte códigos para cancelar compras.',
  },
  {
    id: 'caso-4',
    character: 'Rosa',
    title: 'Consumidor no comprende una comisión o membresía en su tarjeta',
    situation:
      'Rosa recibe su estado de cuenta con un cobro de S/ 180 por "Comisión de Membresía Anual". Ella utiliza su tarjeta regularmente pero no sabía que se cobraba ese cargo ni cómo evitarlo.',
    question: '¿Qué derecho tiene Rosa respecto a las comisiones de su tarjeta de crédito?',
    options: [
      {
        id: 'opt-4a',
        text: 'Saber que la SBS obliga a todos los bancos a ofrecer al menos una tarjeta de crédito sin comisión de membresía, y consultar si cumple las condiciones de consumo para la exoneración de su tarjeta actual.',
        isRecommended: true,
        feedback:
          '¡Correcto! Por ley, todas las entidades emisoras deben contar con una tarjeta libre de membresía. Asimismo, para las demás tarjetas, las entidades fijan condiciones transparentes de consumo mensual mínimo para exonerar la comisión.',
      },
      {
        id: 'opt-4b',
        text: 'Asumir que todas las tarjetas de crédito del Perú cobran membresía obligatoria sin excepción ni forma de evitarlo.',
        isRecommended: false,
        feedback:
          'Falso: la regulación de la SBS garantiza la existencia de tarjetas sin membresía en todas las entidades del sistema financiero.',
      },
      {
        id: 'opt-4c',
        text: 'Cancelar la tarjeta sin pagar el saldo de los consumos del mes para que el banco no cobre la comisión.',
        isRecommended: false,
        feedback:
          'Inadecuado: los consumos regulares siguen siendo una obligación exigible. Para cancelar una tarjeta debes liquidar tus consumos previos y solicitar la constancia de cancelación.',
      },
    ],
    educationalTakeaway:
      'Consulta las condiciones de exoneración de membresía de tu tarjeta o solicita la tarjeta básica sin membresía garantizada por normativa de la SBS.',
  },
  {
    id: 'caso-5',
    character: 'Javier',
    title: 'Cliente desea presentar un reclamo formal ante una entidad financiera',
    situation:
      'Javier presentó un reclamo verbal en ventanilla hace 25 días por un cobro duplicado y el asesor le dijo "que espere tranquilo que ya saldrá". Al no tener respuesta ni código de seguimiento, Javier desea formalizar su reclamo ante las instancias correspondientes.',
    question: '¿Cuál es la ruta formal recomendada para que el reclamo de Javier sea atendido según ley?',
    options: [
      {
        id: 'opt-5a',
        text: 'Registrar su reclamo por escrito en el Libro de Reclamaciones (físico o virtual) de la entidad exigiendo su copia con número de registro, y si no responden en 15 días hábiles, elevar el caso a Reclama Virtual de INDECOPI o la SBS.',
        isRecommended: true,
        feedback:
          '¡Excelente procedimiento! El reclamo formal activa el plazo de ley de 15 días hábiles. Con el número de reclamo, si la entidad incumple el plazo o la respuesta es desfavorable sin sustento, Javier puede acudir a INDECOPI o a la SBS.',
      },
      {
        id: 'opt-5b',
        text: 'Publicar mensajes de molestia en redes sociales sin asentar ningún reclamo formal ante la entidad.',
        isRecommended: false,
        feedback:
          'Inadecuado: las publicaciones en redes no generan obligación legal de respuesta ni plazos obligatorios de resolución.',
      },
      {
        id: 'opt-5c',
        text: 'Contratar un abogado particular para iniciar un juicio civil por el monto duplicado antes de usar el Libro de Reclamaciones.',
        isRecommended: false,
        feedback:
          'Innecesario y costoso: los canales del Libro de Reclamaciones, INDECOPI y la SBS son gratuitos, rápidos y vinculantes para el consumidor financiero.',
      },
    ],
    educationalTakeaway:
      'Usa siempre el Libro de Reclamaciones y guarda tu código de registro. La ley te ampara con un plazo de 15 días hábiles y acceso a INDECOPI y SBS.',
  },
];

// Preguntas Frecuentes Desplegables
export const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    question: '¿Qué pasa si me atraso en un pago?',
    answer:
      'Al atrasarte en el pago de una cuota, la entidad financiera aplicará intereses moratorios por cada día de retraso según lo pactado en tu contrato. Asimismo, a partir de los primeros días de retraso, la entidad reportará la morosidad a la Central de Riesgos de la SBS, lo cual deteriora tu calificación crediticia. Lo recomendable es comunicarte cuanto antes con la entidad para regularizar o solicitar una alternativa formal.',
    category: 'Pagos y Atrasos',
  },
  {
    id: 'faq-2',
    question: '¿Qué es la mora y cómo se calcula?',
    answer:
      'La mora o interés moratorio es la sanción económica aplicable por el retraso en el pago de una obligación. Se calcula aplicando la tasa de interés moratorio pactada sobre el saldo de la cuota vencida por el número exacto de días transcurridos desde el vencimiento hasta el día de la cancelación efectiva.',
    category: 'Conceptos Financieros',
  },
  {
    id: 'faq-3',
    question: '¿Qué es la TCEA y por qué es tan importante?',
    answer:
      'La TCEA (Tasa de Costo Efectivo Anual) representa el costo total integral que pagarás por un crédito en un año. Incluye la tasa de interés compensatoria (TEA), comisiones operativas y gastos asociados (como el seguro de desgravamen). Es el indicador principal para comparar créditos entre diferentes entidades: a menor TCEA, más barato es el crédito.',
    category: 'Conceptos Financieros',
  },
  {
    id: 'faq-4',
    question: '¿Qué es el historial crediticio y quién lo administra?',
    answer:
      'El historial crediticio es el registro de todas tus deudas, créditos y comportamiento de pago en el sistema financiero. La Superintendencia de Banca, Seguros y AFP (SBS) administra la Central de Riesgos oficial del Perú, donde todas las entidades supervisadas reportan mensualmente la calificación de sus clientes (Normal, CPP, Deficiente, Dudoso, Pérdida).',
    category: 'Historial',
  },
  {
    id: 'faq-5',
    question: '¿Qué es el sobreendeudamiento y cómo puedo evitarlo?',
    answer:
      'El sobreendeudamiento ocurre cuando el total de tus cuotas mensuales supera tu capacidad real de pago, absorbiendo un porcentaje crítico de tus ingresos (generalmente más del 30%-40%). Puedes evitarlo elaborando un presupuesto mensual, evitando usar tarjetas de crédito para gastos corrientes y no adquiriendo nuevos préstamos sin antes terminar de amortizar los existentes.',
    category: 'Finanzas Personales',
  },
  {
    id: 'faq-6',
    question: '¿Qué debo revisar antes de aceptar un crédito?',
    answer:
      'Antes de firmar cualquier contrato de crédito, debes exigir y revisar la Hoja Resumen y el cronograma preliminar. Verifica: 1) La TCEA, 2) El valor exacto de la cuota mensual, 3) El plazo total, 4) Las comisiones y seguros obligatorios, 5) La penalidad por mora y 6) Que el monto de la cuota encaje cómodamente en tu presupuesto sin sobrepasar tu capacidad de pago.',
    category: 'Créditos',
  },
  {
    id: 'faq-7',
    question: '¿Puedo realizar pagos anticipados sin penalidad?',
    answer:
      'Sí. Por ley y normativa de la SBS, todo usuario del sistema financiero tiene el derecho irrenunciable a realizar pagos anticipados en cualquier momento sin pagar penalidades ni comisiones. Al hacerlo, puedes solicitar: 1) Reducción del plazo (terminar antes de pagar) o 2) Reducción del monto de las cuotas restantes.',
    category: 'Derechos',
  },
  {
    id: 'faq-8',
    question: '¿Qué puedo hacer si no puedo pagar mi crédito?',
    answer:
      'Lo primero es no ignorar la deuda. Acércate o comunícate formalmente con la entidad financiera antes del vencimiento. Explica tu situación económica actual y solicita formalmente opciones como: reprogramación de la deuda (ampliar el plazo para reducir la cuota), periodo de gracia temporal o consolidación de pasivos.',
    category: 'Pagos y Atrasos',
  },
  {
    id: 'faq-9',
    question: '¿Qué derechos tengo frente a una empresa o gestor de cobranza?',
    answer:
      'Tienes derecho a un trato digno, veraz y respetuoso. Está prohibido por ley que las empresas de cobranza: te llamen los domingos, feriados o fuera de horas hábiles (7:00 a.m. a 8:00 p.m. de lunes a viernes y 8:00 a.m. a 2:00 p.m. sábados); envíen comunicaciones a terceros (jefes, familiares, vecinos); utilicen carteles o avisos que expongan tu deuda ante el público; o te exijan pagos a cuentas personales.',
    category: 'Derechos',
  },
  {
    id: 'faq-10',
    question: '¿Dónde puedo obtener información oficial y presentar reclamos?',
    answer:
      'Puedes recurrir a los canales de atención de: 1) La Superintendencia de Banca, Seguros y AFP (SBS - www.sbs.gob.pe) para temas normativos, consultas de Central de Riesgos y supervisión financiera; y 2) INDECOPI (www.gob.pe/indecopi) para denunciar métodos de cobranza abusivos, vulneración de derechos del consumidor financiero o falta de atención en el Libro de Reclamaciones.',
    category: 'Fuentes Oficiales',
  },
];

// Fuentes Oficiales del Sistema Financiero
export const OFFICIAL_SOURCES_DATA: OfficialSourceItem[] = [
  {
    id: 'sbs',
    name: 'SBS',
    fullName: 'Superintendencia de Banca, Seguros y AFP',
    description:
      'Organismo constitucional autónomo encargado de la regulación y supervisión de los sistemas financiero, de seguros, privado de pensiones y prevención del lavado de activos.',
    url: 'https://www.sbs.gob.pe',
    services: [
      'Reporte de Deudas SBS gratuito',
      'Portal de Educación Financiera',
      'Registro de entidades financieras autorizadas',
      'Normativa sobre derechos del usuario y pagos anticipados',
    ],
  },
  {
    id: 'indecopi',
    name: 'INDECOPI',
    fullName: 'Instituto Nacional de Defensa de la Competencia y de la Protección de la Propiedad Intelectual',
    description:
      'Autoridad nacional de protección del consumidor encargada de vigilar el cumplimiento de las normas de transparencia y sancionar métodos comerciales o de cobranza abusivos.',
    url: 'https://www.gob.pe/indecopi',
    services: [
      'Reclama Virtual para controversias financieras',
      'Fiscalización del Libro de Reclamaciones',
      'Sanción a prácticas de cobranza intimidatorias o ilegales',
      'Guías del Consumidor Financiero',
    ],
  },
  {
    id: 'bcrp',
    name: 'BCRP',
    fullName: 'Banco Central de Reserva del Perú',
    description:
      'Organismo constitucional autónomo cuya finalidad es preservar la estabilidad monetaria, regular la moneda y el crédito en el sistema financiero y fijar topes a tasas de interés.',
    url: 'https://www.bcrp.gob.pe',
    services: [
      'Información estadística sobre tasas de interés del mercado',
      'Informes sobre estabilidad financiera y política monetaria',
      'Publicación de tasas de interés máximas permitidas por ley',
      'Glosario financiero y cursos educativos',
    ],
  },
];

// 6 Apartados Estructurados de Derechos del Usuario
export const RIGHTS_TOPICS: RightTopic[] = [
  {
    id: 'derecho-informacion-transparente',
    title: 'Información transparente sobre productos financieros',
    icon: 'description',
    summary:
      'Tienes derecho a recibir información clara, veraz y oportuna antes, durante y después de contratar cualquier producto o crédito.',
    points: [
      'Entrega obligatoria de la Hoja Resumen y cronograma detallado previo a la firma del contrato.',
      'Redacción clara en español simple, sin cláusulas abusivas ni letra chica ilegible.',
      'Envío mensual gratuito del estado de cuenta por medios electrónicos o físicos pactados.',
      'Notificación obligatoria con 45 días de anticipación de cualquier cambio en tasas, comisiones o tarifas.',
    ],
    officialSourceText: 'SBS - Reglamento de Gestión de Conducta de Mercado (Resolución SBS N° 3274-2017)',
    officialSourceUrl: 'https://www.sbs.gob.pe',
  },
  {
    id: 'derecho-tasas-comisiones',
    title: 'Tasas, comisiones y condiciones',
    icon: 'payments',
    summary:
      'Las entidades financieras solo pueden cobrar comisiones que correspondan a servicios reales y demostrables efectivamente prestados al usuario.',
    points: [
      'Prohibición expresa de comisiones no sustentadas en servicios efectivos o prestados en beneficio propio de la entidad.',
      'Derecho irrenunciable al pago anticipado total o parcial a capital sin comisiones ni penalidades.',
      'Tope a las tasas de interés compensatorias y moratorias fijado por el Banco Central de Reserva del Perú (BCRP).',
      'Obligación de ofrecer al menos una tarjeta de crédito sin comisión de membresía anual.',
    ],
    officialSourceText: 'Ley N° 31143 (Ley que protege de la usura) y normativa SBS',
    officialSourceUrl: 'https://www.bcrp.gob.pe',
  },
  {
    id: 'derecho-consultas-reclamos',
    title: 'Atención de consultas y reclamos',
    icon: 'rate_review',
    summary:
      'Derecho a canales formales de atención ágil y a una respuesta fundamentada ante cualquier disconformidad con un producto financiero.',
    points: [
      'Acceso irrestricto y gratuito al Libro de Reclamaciones físico y virtual en agencias y canales digitales.',
      'Plazo legal máximo improrrogable de 15 días hábiles para recibir respuesta escrita o digital.',
      'Entrega obligatoria del código único de seguimiento de tu reclamo al momento de presentarlo.',
      'Derecho a elevar el reclamo ante Reclama Virtual de INDECOPI o al Departamento de Servicios al Ciudadano de la SBS.',
    ],
    officialSourceText: 'INDECOPI - Código de Protección y Defensa del Consumidor (Ley N° 29571)',
    officialSourceUrl: 'https://www.gob.pe/indecopi',
  },
  {
    id: 'derecho-proteccion-datos',
    title: 'Protección de datos personales',
    icon: 'shield_person',
    summary:
      'Tu información financiera, crediticia y de contacto está protegida por la ley y no puede ser comercializada ni vulnerada.',
    points: [
      'Tus datos bancarios solo pueden ser tratados para las finalidades explícitamente autorizadas por ti.',
      'Derecho a revocar tu consentimiento para llamadas comerciales y promociones en cualquier momento (Gracias... no insista de INDECOPI).',
      'Prohibición de compartir tu información con empresas terceras sin autorización previa y escrita.',
      'Derecho ARCO: Acceso, Rectificación, Cancelación y Oposición de tus datos en bancos y centrales de riesgo.',
    ],
    officialSourceText: 'Ley N° 29733 - Ley de Protección de Datos Personales del Perú',
    officialSourceUrl: 'https://www.gob.pe/minjus',
  },
  {
    id: 'derecho-prevencion-fraudes',
    title: 'Prevención de fraudes y seguridad financiera',
    icon: 'lock',
    summary:
      'Las entidades bancarias deben garantizar estándares de seguridad biométrica, tokenización y monitoreo de transacciones sospechosas.',
    points: [
      'Las entidades son responsables de implementar sistemas de autenticación reforzada para operaciones no presenciales.',
      'Derecho a reportar y bloquear de inmediato tarjetas o canales digitales las 24 horas del día sin cobro alguno.',
      'Procedimiento de investigación obligatorio ante consumos u operaciones no reconocidas.',
      'Prohibición estricta de que el banco te solicite claves secretas o códigos token por vía telefónica o correo.',
    ],
    officialSourceText: 'SBS - Circular de Gestión de Seguridad de la Información y Ciberseguridad',
    officialSourceUrl: 'https://www.sbs.gob.pe',
  },
  {
    id: 'derecho-canales-oficiales',
    title: 'Canales oficiales de orientación y supervisión',
    icon: 'support_agent',
    summary:
      'Acceso a organismos estatales públicos y gratuitos para orientación, denuncia y fiscalización de entidades financieras en el Perú.',
    points: [
      'Superintendencia de Banca, Seguros y AFP (SBS): Línea gratuita nacional 0-800-10840 y portal sbs.gob.pe.',
      'INDECOPI - Protección al Consumidor: Teléfono 01 224-7777 (Lima) y 0-800-4-4040 (Regiones) y reclamos.gob.pe.',
      'Reporte de Deudas SBS gratuito para consulta de calificación en la Central de Riesgos con DNI.',
      'Defensoría del Cliente Financiero (DCF) como instancia alternativa gratuita de solución de controversias.',
    ],
    officialSourceText: 'Portal del Estado Peruano - Servicios al Ciudadano',
    officialSourceUrl: 'https://www.gob.pe',
  },
];

// Orientación Personalizada Asesorada estructurada
export const ADVISORY_RESPONSES: Record<string, AdvisoryResult> = {
  'no-puedo-pagar': {
    title: 'Orientación para afrontar dificultades en el pago de una cuota',
    whatItMeans:
      'Indica una falta de liquidez temporal frente a la fecha de vencimiento pactada. Actuar antes del vencimiento es crucial para evitar mora y daño crediticio.',
    whatToCheck: [
      'Fecha límite exacta de vencimiento en tu estado de cuenta.',
      'Monto indispensable de tus gastos de subsistencia vs. saldo disponible.',
      'Condiciones de prórroga o reprogramación que contempla tu entidad en su tarifario.',
    ],
    whatToDo: [
      'Acércate o llama a los canales oficiales de la entidad antes de la fecha de vencimiento.',
      'Solicita formalmente una reprogramación de cuotas para extender el plazo y pagar una cuota mensual menor.',
      'Pide que te entreguen una simulación del nuevo cronograma antes de aceptar el acuerdo.',
    ],
    whatToAvoid: [
      'No dejes pasar la fecha sin avisar al banco.',
      'No recurras a prestamistas informales o aplicativos no autorizados.',
      'No entregues dinero a terceros no acreditados.',
    ],
    advice:
      'Las entidades financieras prefieren reprogramar una deuda a tiempo antes de que caiga en pérdida. Sé transparente sobre tus ingresos reales.',
    officialSource: {
      name: 'Superintendencia de Banca, Seguros y AFP (SBS)',
      url: 'https://www.sbs.gob.pe',
    },
  },
  'me-atrase': {
    title: 'Orientación ante un pago atrasado',
    whatItMeans:
      'La cuota venció y se están generando intereses moratorios diarios. La calificación en la Central de Riesgos se actualiza mensualmente con los días de atraso.',
    whatToCheck: [
      'Días exactos transcurridos desde la fecha de corte o vencimiento.',
      'Importe total actualizado de la deuda con intereses compensatorios y moratorios sumados.',
      'Reporte actual en la Central de Riesgos de la SBS.',
    ],
    whatToDo: [
      'Solicita en ventanilla o banca por internet el monto exacto para liquidar o poner al día la cuota.',
      'Si el atraso es prolongado, consulta por un convenio de regularización o refinanciamiento.',
      'Paga únicamente en los canales bancarios oficiales de la entidad titular.',
    ],
    whatToAvoid: [
      'No pagues a números de teléfono personales ni billeteras digitales particulares de gestores.',
      'No creas en personas que ofrecen "borrarte del sistema" a cambio de dinero.',
    ],
    advice:
      'Prioriza ponerte al día en la cuota más antigua para frenar el cómputo de días de mora reportados a la SBS.',
    officialSource: {
      name: 'Superintendencia de Banca, Seguros y AFP (SBS)',
      url: 'https://www.sbs.gob.pe',
    },
  },
  'me-estan-cobrando': {
    title: 'Orientación y derechos frente a una cobranza',
    whatItMeans:
      'La entidad o una agencia externa está gestionando la recuperación de una obligación. Este proceso tiene límites legales estrictos regulados por INDECOPI.',
    whatToCheck: [
      'Identidad completa del gestor, empresa de cobranza y entidad financiera acreedora.',
      'Desglose detallado por escrito de capital adeudado, intereses y comisiones.',
      'Cumplimiento de los horarios legales permitidos (lunes a viernes de 7am a 8pm, sábados 8am a 2pm).',
    ],
    whatToDo: [
      'Escucha con serenidad y solicita que te envíen la propuesta de pago por escrito o correo oficial.',
      'Realiza los abonos exclusivamente a la cuenta recaudadora oficial de la entidad acreedora.',
      'Si sufres acoso, amenazas o llamadas a familiares/jefes, presenta tu reclamo ante INDECOPI.',
    ],
    whatToAvoid: [
      'Nunca transfieras a cuentas personales ni aceptes recibos informales.',
      'No firmes documentos en blanco ni compromisos sin copia sellada.',
    ],
    advice:
      'Tienes derecho a una cobranza respetuosa. Conserva registros de mensajes o llamadas si consideras que se están vulnerando tus derechos.',
    officialSource: {
      name: 'INDECOPI - Protección al Consumidor',
      url: 'https://www.gob.pe/indecopi',
    },
  },
  'no-entiendo-credito': {
    title: 'Orientación para comprender tu crédito y costos financieros',
    whatItMeans:
      'Un crédito incluye múltiples componentes financieros que determinan cuánto pagarás en total a lo largo del tiempo.',
    whatToCheck: [
      'La TCEA (Tasa de Costo Efectivo Anual) en tu Hoja Resumen.',
      'El desglose de cada cuota: amortización a capital, intereses y seguro de desgravamen.',
      'El cronograma de pagos completo.',
    ],
    whatToDo: [
      'Compara la TCEA entre varias entidades antes de solicitar un crédito.',
      'Revisa tu estado de cuenta mensual para constatar que los cargos corresponden a lo contratado.',
      'Consulta en la plataforma de atención al usuario de la entidad cualquier cobro no reconocido.',
    ],
    whatToAvoid: [
      'No te fijes únicamente en el monto de la cuota mensual.',
      'No pagues solo el pago mínimo de tu tarjeta de crédito de manera continua.',
    ],
    advice:
      'La TCEA es el indicador más transparente para conocer el costo real de un crédito. Siempre compárala antes de decidir.',
    officialSource: {
      name: 'Superintendencia de Banca, Seguros y AFP (SBS)',
      url: 'https://www.sbs.gob.pe',
    },
  },
  'quiero-pagar-antes': {
    title: 'Orientación sobre pagos anticipados y prepagos',
    whatItMeans:
      'El pago anticipado es un derecho legal que te permite liquidar o amortizar deuda reduciendo intereses y comisiones futuras.',
    whatToCheck: [
      'Diferencia entre "Pago Anticipado" (amortiza capital e intereses futuros) y "Adelanto de Cuotas" (cubre cuotas futuras correlativas).',
      'Tu saldo de capital adeudado actual.',
    ],
    whatToDo: [
      'Indica explícitamente en ventanilla o en la app que tu pago es "Pago Anticipado a Capital".',
      'Elige si deseas reducir el plazo (terminar antes) o reducir el valor de las cuotas restantes.',
      'Exige tu nuevo cronograma de pagos actualizado sin costo alguno.',
    ],
    whatToAvoid: [
      'No aceptes cobros por comisiones o penalidades de prepago (están prohibidas por la SBS).',
    ],
    advice:
      'Si tienes un ingreso extraordinario (gratificación, utilidades o ahorros), aplicarlo a pago anticipado de capital te ahorrará intereses significativos.',
    officialSource: {
      name: 'Superintendencia de Banca, Seguros y AFP (SBS)',
      url: 'https://www.sbs.gob.pe',
    },
  },
  'cuidar-historial': {
    title: 'Orientación para cuidar y mejorar tu historial crediticio',
    whatItMeans:
      'Tu reporte en la Central de Riesgos refleja tu comportamiento de pago y abre o cierra oportunidades de crédito formal.',
    whatToCheck: [
      'Tu Reporte de Deudas SBS gratuito en línea.',
      'Fechas de vencimiento de todas tus obligaciones.',
      'Calificación en el sistema (Normal, CPP, Deficiente, Dudoso, Pérdida).',
    ],
    whatToDo: [
      'Paga puntualmente antes o en la fecha de vencimiento.',
      'Solicita tu Constancia de No Adeudo al terminar de pagar un crédito.',
      'Revisa periódicamente tu reporte SBS para verificar que tus datos estén actualizados.',
    ],
    whatToAvoid: [
      'No confíes en personas o anuncios que aseguren "limpiar tu historial" por dinero (es una estafa).',
      'No sirvas de garante o aval si no tienes certeza de pago del titular.',
    ],
    advice:
      'La única forma real de tener un historial excelente es mantener la puntualidad mes a mes en tus pagos.',
    officialSource: {
      name: 'Central de Riesgos SBS',
      url: 'https://www.sbs.gob.pe',
    },
  },
  'varias-obligaciones': {
    title: 'Orientación para ordenar múltiples obligaciones y prevenir sobreendeudamiento',
    whatItMeans:
      'Tener deudas simultáneas puede comprometer tus ingresos si la suma de cuotas supera tu capacidad de pago.',
    whatToCheck: [
      'Lista total de deudas con entidad, saldo, cuota y TCEA.',
      'Porcentaje total de tus ingresos mensuales que se destinan al pago de deudas.',
    ],
    whatToDo: [
      'Evalúa una consolidación o compra de deuda en una sola entidad con menor TCEA.',
      'Prioriza el pago de las deudas con mayor tasa de interés.',
      'Arma un presupuesto estricto recortando gastos no esenciales.',
    ],
    whatToAvoid: [
      'No saques nuevos créditos para pagar cuotas anteriores sin un plan de consolidación formal.',
      'No comprometas más del 40% de tus ingresos en deudas.',
    ],
    advice:
      'Una consolidación de deudas unifica tus cuotas en un solo pago mensual, generalmente con menor tasa y mayor orden.',
    officialSource: {
      name: 'Superintendencia de Banca, Seguros y AFP (SBS)',
      url: 'https://www.sbs.gob.pe',
    },
  },
  otro: {
    title: 'Orientación general sobre créditos, pagos y derechos financieros',
    whatItMeans:
      'Para cualquier consulta o duda sobre el sistema financiero, existen canales oficiales y normas de protección al usuario.',
    whatToCheck: [
      'Contratos, hojas resumen y estados de cuenta vinculados a tu consulta.',
      'Entidad involucrada y si se encuentra debidamente supervisada por la SBS.',
    ],
    whatToDo: [
      'Comunícate primero con la plataforma de atención al usuario de la entidad financiera.',
      'Si requieres orientación sobre normativa o Central de Riesgos, consulta en la SBS (www.sbs.gob.pe).',
      'Si tienes una controversia o reclamo por falta de respuesta, acude a INDECOPI (www.gob.pe/indecopi).',
    ],
    whatToAvoid: [
      'Nunca compartas contraseñas, claves token ni números completos de tarjetas con terceros.',
    ],
    advice:
      'La información y la educación financiera son tu mejor herramienta para tomar decisiones seguras.',
    officialSource: {
      name: 'SBS e INDECOPI',
      url: 'https://www.sbs.gob.pe',
    },
  },
};
