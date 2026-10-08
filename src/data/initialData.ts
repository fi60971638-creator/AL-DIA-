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

// 8 Videos Reales de la SBS
export const VIDEOS_DATA: VideoItem[] = [
  {
    id: 'video-1',
    titulo: 'Cumple tus metas. Infórmate, compara y decide',
    categoria: 'Créditos',
    duracion: '2:15 min',
    fuente: 'SBS',
    url: 'https://www.youtube.com/watch?v=3hgH7E51IFw',
    isFeatured: false,
    descripcion: 'Aprende a comparar alternativas de crédito antes de contratar una obligación financiera.',
  },
  {
    id: 'video-2',
    titulo: 'Usa tu tarjeta de crédito adecuadamente',
    categoria: 'Créditos',
    duracion: '2:40 min',
    fuente: 'SBS',
    url: 'https://www.youtube.com/watch?v=4U75eIlS_4I',
    isFeatured: true,
    descripcion: 'Recomendaciones clave para entender fechas de corte, pago mínimo y evitar sobreendeudarte.',
  },
  {
    id: 'video-3',
    titulo: 'Historial crediticio y Central de Riesgos',
    categoria: 'Historial',
    duracion: '2:20 min',
    fuente: 'SBS',
    url: 'https://www.youtube.com/watch?v=wWKkxtuvDcQ',
    isFeatured: true,
    descripcion: 'Cómo funciona la Central de Riesgos de la SBS y cómo se clasifica tu comportamiento de pago.',
  },
  {
    id: 'video-4',
    titulo: '¿Se pueden borrar las deudas de mi historial crediticio?',
    categoria: 'Historial',
    duracion: '3:10 min',
    fuente: 'SBS',
    url: 'https://www.youtube.com/watch?v=DOBcO9zvypo',
    isFeatured: false,
    descripcion: 'Conoce los mitos sobre la "limpieza de historial" y los plazos reales de actualización según ley.',
  },
  {
    id: 'video-5',
    titulo: 'Consejos sobre créditos',
    categoria: 'Créditos',
    duracion: '2:05 min',
    fuente: 'SBS',
    url: 'https://www.youtube.com/watch?v=lMCwP1C-n6s',
    isFeatured: true,
    descripcion: 'Recomendaciones esenciales antes de solicitar préstamos personales y créditos de consumo.',
  },
  {
    id: 'video-6',
    titulo: 'Comisiones prohibidas en el sistema financiero',
    categoria: 'Derechos',
    duracion: '2:30 min',
    fuente: 'SBS',
    url: 'https://www.youtube.com/watch?v=joimdne9A_E',
    isFeatured: false,
    descripcion: 'Conoce los cobros y comisiones que las entidades financieras NO pueden aplicarte por ley.',
  },
  {
    id: 'video-7',
    titulo: '¿Cómo usar adecuadamente una tarjeta de crédito?',
    categoria: 'Pagos',
    duracion: '3:05 min',
    fuente: 'SBS',
    url: 'https://youtu.be/baUXtx9ozyc',
    isFeatured: false,
    descripcion: 'Diferencia entre compras al contado (directas) y compras en cuotas para optimizar tus finanzas.',
  },
  {
    id: 'video-8',
    titulo: 'Presupuesto familiar paso a paso',
    categoria: 'Finanzas personales',
    duracion: '3:45 min',
    fuente: 'SBS',
    url: 'https://www.youtube.com/watch?v=DyaJTqrM_78',
    isFeatured: false,
    descripcion: 'Guía práctica para armar tu presupuesto mensual, identificar gastos hormiga y fijar metas de ahorro.',
  },
];

// Diccionario Financiero: Palabras que debes conocer
export const FINANCIAL_TERMS: FinancialTerm[] = [
  {
    id: 'tcea',
    term: 'TCEA (Tasa de Costo Efectivo Anual)',
    definition:
      'Es la tasa que resume el costo total anual de un crédito, incluyendo la tasa de interés compensatoria (TEA), comisiones y gastos (como el seguro de desgravamen).',
    example:
      'Si un banco te ofrece una TEA del 20% pero la TCEA es del 32%, el 32% es el costo real que pagarás al año sumando todos los cargos.',
    importance:
      'Es el indicador fundamental para comparar qué crédito es más barato entre distintas entidades financieras.',
  },
  {
    id: 'mora',
    term: 'MORA / Interés Moratorio',
    definition:
      'Es el recargo adicional que aplica la entidad financiera cuando una cuota no es pagada en la fecha de vencimiento acordada en el cronograma.',
    example:
      'Si tu cuota venció el día 5 y pagas el día 15, la entidad te cobrará intereses moratorios por los 10 días de atraso.',
    importance:
      'Los recargos por mora incrementan el valor de la deuda y generan un reporte negativo en la Central de Riesgos.',
  },
  {
    id: 'interes',
    term: 'INTERÉS COMPENSATORIO',
    definition:
      'Es el precio o contraprestación que cobra la entidad financiera por prestarte dinero durante un periodo determinado.',
    example:
      'Si solicitas un préstamo de S/ 1,000 a 12 meses, la suma de los intereses compensatorios representa la ganancia de la entidad por prestarte ese dinero.',
    importance:
      'Determina la proporción de tu cuota que se destina al costo del servicio antes de amortizar el saldo del capital prestado.',
  },
  {
    id: 'cuota',
    term: 'CUOTA',
    definition:
      'Es el monto periódico (generalmente mensual) que te comprometes a pagar a la entidad financiera. Se compone de amortización de capital, interés y seguros asociados.',
    example:
      'En una cuota de S/ 350, por ejemplo, S/ 220 pueden ser amortización a capital, S/ 110 de intereses y S/ 20 de seguro de desgravamen.',
    importance:
      'Debes verificar que el valor de la cuota mensual encaje cómodamente en tu presupuesto mensual sin superar tu capacidad de pago.',
  },
  {
    id: 'credito',
    term: 'CRÉDITO',
    definition:
      'Operación financiera en la que una entidad pone a disposición del cliente una cantidad de dinero con el compromiso de que sea devuelto en un plazo determinado con intereses y cargos.',
    example:
      'Un préstamo personal, una tarjeta de crédito, un crédito vehicular o un préstamo hipotecario.',
    importance:
      'Es una herramienta para cumplir metas o afrontar inversiones, pero debe asumirse con responsabilidad para evitar sobreendeudamiento.',
  },
  {
    id: 'historial',
    term: 'HISTORIAL CREDITICIO',
    definition:
      'Registro oficial que refleja el comportamiento de una persona respecto al cumplimiento puntual o atrasado de sus créditos y servicios.',
    example:
      'En la SBS, una persona puntual tiene calificación "Normal" (0). Con atrasos pasa a "Problemas Potenciales" (1), "Deficiente" (2), "Dudoso" (3) o "Pérdida" (4).',
    importance:
      'Un buen historial te abre las puertas a mejores tasas de interés, mayores montos y acceso formal a créditos y alquileres.',
  },
  {
    id: 'capacidad',
    term: 'CAPACIDAD DE PAGO',
    definition:
      'Es la cantidad máxima de dinero que una persona puede destinar al pago mensual de deudas después de cubrir todos sus gastos básicos indispensables (alimentación, vivienda, servicios, salud, educación).',
    example:
      'Si tus ingresos son S/ 2,000 y tus gastos básicos indispensables son S/ 1,400, tu capacidad máxima de pago para cuotas es de S/ 600.',
    importance:
      'Conocer tu capacidad de pago real previene que asumas cuotas que luego no puedas cubrir cuando surja un imprevisto.',
  },
  {
    id: 'sobreendeudamiento',
    term: 'SOBREENDEUDAMIENTO',
    definition:
      'Situación financiera crítica en la que el total acumulado de las cuotas de pago supera la capacidad económica mensual del deudor, impidiendo cumplir las obligaciones.',
    example:
      'Una persona que percibe S/ 2,500 pero tiene cuotas de tarjetas y préstamos que suman S/ 2,000 al mes, dejándole solo S/ 500 para vivir.',
    importance:
      'El sobreendeudamiento genera estrés financiero, morosidad y deterioro del historial. Requiere reordenar obligaciones o consolidar deudas a tiempo.',
  },
];

// Mitos y Verdades
export const MYTHS_AND_TRUTHS: MythTruthItem[] = [
  {
    id: 'mito-1',
    myth: 'Si no puedo pagar, es mejor ignorar la deuda y no contestar llamadas.',
    truth: 'Ignorar una obligación no soluciona la situación y empeora los costos.',
    explanation:
      'El atraso continuará generando intereses moratorios y comisiones, y deteriorará tu calificación crediticia en la Central de Riesgos de la SBS. Es recomendable informarse y comunicarse formalmente con la entidad para buscar una reprogramación.',
  },
  {
    id: 'mito-2',
    myth: 'Todo método de cobranza está permitido porque existe una deuda vencida.',
    truth: 'Existen reglas, límites legales y horarios estrictos para las cobranzas.',
    explanation:
      'La ley prohíbe comunicarse con terceros ajenos a la deuda (jefes, vecinos o compañeros), amenazar con medidas no amparadas legalmente o realizar llamadas fuera de los horarios permitidos (lunes a viernes de 7:00 a.m. a 8:00 p.m. y sábados de 8:00 a.m. a 2:00 p.m.).',
  },
  {
    id: 'mito-3',
    myth: 'Solo debo fijarme en el valor de la cuota mensual para saber si un crédito me conviene.',
    truth: 'Es indispensable conocer el costo total real a través de la TCEA.',
    explanation:
      'Una cuota aparentemente baja pero extendida a muchos años puede hacer que termines pagando dos o tres veces el monto prestado debido a los intereses y seguros acumulados.',
  },
  {
    id: 'mito-4',
    myth: 'Existen empresas que pueden "borrar mis deudas" del sistema financiero por dinero.',
    truth: 'Nadie puede borrar deudas ni alterar la Central de Riesgos de la SBS a cambio de dinero.',
    explanation:
      'Cualquier persona o empresa que ofrezca "limpiar tu historial crediticio" está cometiendo una estafa. La única forma legítima de actualizar tu historial es pagar o regularizar la obligación pendiente con la entidad financiera.',
  },
  {
    id: 'mito-5',
    myth: 'Pagar el monto mínimo de mi tarjeta de crédito me ayuda a salir de la deuda.',
    truth: 'El pago mínimo solo cubre intereses, comisiones y una fracción mínima del capital.',
    explanation:
      'Pagar solo el mínimo prolonga la deuda durante años e incrementa sustancialmente el total pagado en intereses. Se recomienda pagar siempre el "Monto Total del Mes" o una cantidad significativamente mayor al mínimo.',
  },
  {
    id: 'mito-6',
    myth: 'Si realizo un abono anticipado, el banco puede cobrarme una penalidad por prepago.',
    truth: 'Por ley, el pago anticipado es un derecho libre de comisiones y penalidades.',
    explanation:
      'La normativa de la SBS establece que los clientes tienen derecho a prepagar sus créditos en cualquier momento sin penalidad alguna, pudiendo elegir entre reducir el plazo o reducir la cuota mensual.',
  },
];

// Casos Prácticos Interactivos: ¿Qué harías tú?
export const PRACTICAL_CASES: PracticalCase[] = [
  {
    id: 'caso-1',
    character: 'María',
    title: 'María tiene una cuota próxima a vencer y no cuenta con todo el dinero.',
    situation:
      'A María le faltan 5 días para que venza su cuota de S/ 400 en una caja municipal. Debido a un gasto de salud imprevisto, solo dispone de S/ 150 y no podrá juntar el total en la fecha pactada.',
    question: '¿Qué debería hacer María?',
    options: [
      {
        id: 'opt-1a',
        text: 'Esperar a que venza la fecha y no contestar las llamadas hasta que consiga todo el dinero dentro de un mes.',
        isRecommended: false,
        feedback:
          'No es recomendable. Dejar vencer la cuota sin aviso acumulará intereses moratorios diarios y afectará su calificación crediticia en la Central de Riesgos.',
      },
      {
        id: 'opt-1b',
        text: 'Comunicarse con la entidad antes del vencimiento, explicar su situación temporal y solicitar alternativas como prórroga o reprogramación.',
        isRecommended: true,
        feedback:
          '¡Correcto! Comunicarse antes del vencimiento permite a la entidad evaluar alternativas formales antes de que caiga en morosidad, manteniendo un trato formal y preservando su historial.',
      },
      {
        id: 'opt-1c',
        text: 'Pedir un préstamo informal inmediato a personas desconocidas en la calle para pagar la cuota hoy mismo.',
        isRecommended: false,
        feedback:
          'Muy peligroso. Los préstamos informales tienen tasas abusivas y métodos de cobro extorsivos, generando un sobreendeudamiento mucho más grave.',
      },
    ],
    educationalTakeaway:
      'Ante una dificultad temporal, la anticipación es clave: acudir a la entidad financiera antes del vencimiento abre posibilidades de refinanciamiento formal.',
  },
  {
    id: 'caso-2',
    character: 'Carlos',
    title: 'Carlos recibe llamadas relacionadas con una deuda vencida.',
    situation:
      'Carlos tiene una cuota atrasada hace 25 días. Recibe llamadas constantes a las 11:00 p.m. y el gestor de cobranza le dice que llamará a sus familiares y a su centro laboral si no deposita hoy a una cuenta Yape personal.',
    question: '¿Qué debería conocer Carlos antes de tomar una decisión?',
    options: [
      {
        id: 'opt-2a',
        text: 'Depositar inmediatamente al número personal del gestor para que no llamen a su trabajo.',
        isRecommended: false,
        feedback:
          'Nunca realices pagos a cuentas o billeteras personales de gestores. Ese abono no amortiza tu crédito y es una modalidad de estafa habitual.',
      },
      {
        id: 'opt-2b',
        text: 'Conocer que la ley prohíbe llamadas de cobranza nocturnas, contacto con terceros no obligados y pagos fuera de canales bancarios oficiales.',
        isRecommended: true,
        feedback:
          '¡Correcto! Carlos debe exigir el desglose formal de su deuda, pagar únicamente en las cuentas recaudadoras oficiales del banco y reportar los métodos prohibidos ante INDECOPI.',
      },
      {
        id: 'opt-2c',
        text: 'Apagar su teléfono y cambiar de número para evitar cualquier contacto para siempre.',
        isRecommended: false,
        feedback:
          'Aunque los métodos del gestor sean indebidos, la deuda real con el banco continúa vigente. Lo adecuado es canalizar la regularización directamente con la entidad oficial.',
      },
    ],
    educationalTakeaway:
      'Tienes derecho a una cobranza digna y legal. Todos los pagos deben realizarse exclusivamente en los canales oficiales de la entidad titular.',
  },
  {
    id: 'caso-3',
    character: 'Pedro',
    title: 'Pedro quiere solicitar otro crédito pero ya tiene varias obligaciones activas.',
    situation:
      'Pedro percibe S/ 2,400 al mes. Actualmente paga S/ 950 entre una tarjeta de crédito y un préstamo de consumo. Le ofrecieron un nuevo préstamo en efectivo de S/ 5,000 con cuota mensual de S/ 380.',
    question: '¿Qué debería evaluar Pedro primero?',
    options: [
      {
        id: 'opt-3a',
        text: 'Calcular su capacidad de pago total: sus deudas ya representan casi el 40% de su sueldo y asumir otra cuota lo pondría en riesgo de sobreendeudamiento.',
        isRecommended: true,
        feedback:
          '¡Correcto! Pedro debe evaluar que sumar otra cuota elevaría su carga a S/ 1,330 mensuales (más del 55% de sus ingresos), dejándolo sin margen ante cualquier imprevisto.',
      },
      {
        id: 'opt-3b',
        text: 'Aceptar el dinero de inmediato ya que el banco ya se lo aprobó automáticamente en su app.',
        isRecommended: false,
        feedback:
          'Que un crédito esté preaprobado no significa que sea conveniente para tu presupuesto personal. Es tu responsabilidad evaluar tu capacidad de pago.',
      },
      {
        id: 'opt-3c',
        text: 'Aceptar el crédito y usar el dinero para pagar las cuotas mínimas de sus otras tarjetas durante los próximos meses.',
        isRecommended: false,
        feedback:
          'Usar un crédito de consumo para pagar cuotas de otros créditos sin una consolidación formal genera una bola de nieve de intereses multiplicados.',
      },
    ],
    educationalTakeaway:
      'No comprometas más del 30% al 40% de tus ingresos en deudas. Si tienes varias obligaciones, prioriza consolidarlas a menor tasa en vez de sumar más cuotas.',
  },
  {
    id: 'caso-4',
    character: 'Lucía',
    title: 'Lucía no entiende por qué terminará pagando mucho más dinero del que recibió.',
    situation:
      'Lucía solicitó un préstamo de S/ 3,000 a 24 meses. Al revisar la suma total de sus 24 cuotas, calcula que devolverá S/ 4,680. Ella pensaba que solo pagaría un interés pequeño del 10%.',
    question: '¿Qué debería revisar Lucía para comprender el costo total?',
    options: [
      {
        id: 'opt-4a',
        text: 'Revisar la Hoja Resumen y la TCEA, donde se desglosan la tasa de interés compensatoria anual, el plazo, comisiones y el seguro de desgravamen.',
        isRecommended: true,
        feedback:
          '¡Correcto! La TCEA y la Hoja Resumen muestran todos los costos sumados a lo largo de los 24 meses. A mayor plazo, mayor es la acumulación de intereses totales.',
      },
      {
        id: 'opt-4b',
        text: 'Asumir que el banco cometió un error y dejar de pagar las cuotas pactadas sin consultar.',
        isRecommended: false,
        feedback:
          'El cálculo de cuotas responde al contrato firmado y a la tasa pactada. Dejar de pagar generará morosidad y afectará su historial crediticio.',
      },
      {
        id: 'opt-4c',
        text: 'Fijarse únicamente en la tasa nominal que vio en la publicidad sin leer el contrato.',
        isRecommended: false,
        feedback:
          'La publicidad suele mostrar tasas referenciales (TEA) sin comisiones ni seguros. La tasa real que determina lo que pagarás es la TCEA.',
      },
    ],
    educationalTakeaway:
      'Antes de firmar un crédito, solicita y revisa siempre la Hoja Resumen y el cronograma. Compara la TCEA entre entidades para elegir la más económica.',
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

// Temas de la sección Mis Derechos
export const RIGHTS_TOPICS: RightTopic[] = [
  {
    id: 'derecho-informacion',
    title: 'Derecho a la información clara y veraz sobre tu crédito',
    icon: 'info',
    summary:
      'Las entidades financieras tienen la obligación legal de brindarte información detallada, comprensible y transparente antes de que firmes cualquier contrato.',
    points: [
      'Recibir la Hoja Resumen y el cronograma de pagos detallado con la TCEA antes del desembolso.',
      'Conocer con exactitud qué comisiones, gastos y seguros te serán cobrados y por qué concepto.',
      'Recibir mensualmente tu estado de cuenta con los abonos, saldos y desglose de cuotas.',
      'Ser informado con al menos 45 días de anticipación de cualquier modificación unilateral de condiciones o comisiones.',
    ],
    officialSourceText: 'SBS - Reglamento de Gestión de Conducta de Mercado',
    officialSourceUrl: 'https://www.sbs.gob.pe',
  },
  {
    id: 'derecho-pago-anticipado',
    title: 'Derecho irrenunciable al pago anticipado sin penalidades',
    icon: 'savings',
    summary:
      'Puedes liquidar o amortizar tu deuda antes del plazo pactado sin que la entidad te cobre comisiones, penalidades ni recargos adicionales.',
    points: [
      'Realizar pagos anticipados a capital en cualquier momento del crédito.',
      'Elegir libremente si deseas reducir el número de cuotas (plazo) o el monto de la cuota mensual.',
      'Exigir que se descuenten los intereses compensatorios, comisiones y seguros de los periodos futuros.',
      'Recibir un nuevo cronograma de pagos actualizado de manera inmediata y sin costo.',
    ],
    officialSourceText: 'SBS - Ley Complementaria de Protección al Consumidor en Servicios Financieros',
    officialSourceUrl: 'https://www.sbs.gob.pe',
  },
  {
    id: 'derecho-cobranza-digna',
    title: 'Derecho a una cobranza digna y límites legales',
    icon: 'gavel',
    summary:
      'La gestión de cobranza no puede vulnerar tu dignidad, privacidad ni tranquilidad familiar o laboral.',
    points: [
      'Horarios permitidos: Lunes a viernes de 7:00 a.m. a 8:00 p.m. y sábados de 8:00 a.m. a 2:00 p.m. Prohibido domingos y feriados.',
      'Prohibido llamar a tus empleadores, familiares, vecinos o terceras personas ajenas a la deuda.',
      'Prohibido utilizar carteles, avisos públicos o vestimentas que expongan tu condición de deudor.',
      'Prohibido amenazar con medidas no autorizadas o exigir transferencias a cuentas personales de gestores.',
    ],
    officialSourceText: 'INDECOPI - Código de Protección y Defensa del Consumidor (Ley N° 29571)',
    officialSourceUrl: 'https://www.gob.pe/indecopi',
  },
  {
    id: 'derecho-reclamo',
    title: 'Derecho al reclamo formal y Libro de Reclamaciones',
    icon: 'rate_review',
    summary:
      'Si tienes una disconformidad con un cobro, un trato indebido o un error en tu cuenta, tienes derecho a una respuesta formal y motivada.',
    points: [
      'Acceso irrestricto al Libro de Reclamaciones físico o virtual en todas las agencias y canales digitales.',
      'Plazo legal máximo de 15 días hábiles para recibir una respuesta formal y fundamentada por parte de la entidad.',
      'Derecho a acudir en segunda instancia a la plataforma Reclama Virtual de INDECOPI o al Departamento de Servicios al Ciudadano de la SBS.',
    ],
    officialSourceText: 'INDECOPI - Sistema de Reclamaciones y Protección al Consumidor',
    officialSourceUrl: 'https://www.gob.pe/indecopi',
  },
  {
    id: 'derecho-contrato-constancia',
    title: 'Derecho a copia de contratos y Constancia de No Adeudo',
    icon: 'verified',
    summary:
      'Tienes derecho a conservar respaldo documental de todos los acuerdos y a acreditar la cancelación total de tus obligaciones.',
    points: [
      'Recibir una copia física o digital idéntica de tu contrato, pagaré y hoja resumen debidamente suscrita.',
      'Solicitar tu Constancia de No Adeudo de manera gratuita una vez cancelada la totalidad de la deuda.',
      'Exigir que la entidad actualice su reporte mensual a la Central de Riesgos SBS reflejando la cancelación de la obligación.',
    ],
    officialSourceText: 'SBS - Circular de Atención al Usuario Financiero',
    officialSourceUrl: 'https://www.sbs.gob.pe',
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
