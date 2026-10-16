import { EducationalArticle } from '../types';

export const EDUCATIONAL_ARTICLES: EducationalArticle[] = [
  {
    id: 'art-creditos-1',
    category: 'Créditos y préstamos',
    title: 'Cómo comparar créditos y elegir la opción más conveniente',
    shortDesc: 'Aprende a analizar cronogramas, plazos y el costo real antes de solicitar un préstamo en Perú.',
    readTime: '5 min de lectura',
    badgeColor: 'bg-blue-900/60 text-blue-200 border border-blue-700/50',
    summary: 'Antes de firmar un contrato crediticio es indispensable comparar la TCEA entre tres entidades distintas y evaluar el plazo total de amortización.',
    keyTakeaway: 'Nunca compares ofertas financieras solo por la cuota mensual. Exige la Hoja Resumen oficial con la TCEA.',
    source: 'Superintendencia de Banca, Seguros y AFP (SBS) - Portal del Usuario',
    sections: [
      {
        title: 'Los tres factores clave al comparar un préstamo',
        paragraphs: [
          'En el sistema financiero peruano, dos préstamos por el mismo monto (por ejemplo S/ 5,000 a 24 meses) pueden tener un costo total radicalmente distinto dependiendo de la entidad.',
          'El primer factor es la Tasa de Costo Efectivo Anual (TCEA), que reúne la tasa compensatoria, el seguro de desgravamen y las comisiones administrativas autorizadas.',
          'El segundo factor es el tipo de cronograma: cuotas fijas o variables, y la periodicidad del pago de intereses.',
        ],
        tips: [
          'Compara siempre al menos una entidad bancaria, una caja municipal y una cooperativa regulada por la SBS.',
          'Verifica si el seguro de desgravamen te permite presentar una póliza endosada propia para reducir la cuota mensual.',
        ],
      },
      {
        title: 'Ejemplo cotidiano de comparación',
        paragraphs: [
          'Si la entidad "A" ofrece una cuota de S/ 280 pero con 36 meses de plazo (TCEA 45%), pagarás en total S/ 10,080. Si la entidad "B" ofrece una cuota de S/ 360 a 18 meses (TCEA 22%), pagarás S/ 6,480. La opción "B" te ahorra S/ 3,600 en intereses totales.',
        ],
      },
    ],
  },
  {
    id: 'art-presupuesto-1',
    category: 'Organización del presupuesto',
    title: 'Cómo estructurar un presupuesto mensual realista (Método 50/30/20)',
    shortDesc: 'Divide tus ingresos netos entre necesidades, metas y bienestar sin caer en restricciones imposibles.',
    readTime: '4 min de lectura',
    badgeColor: 'bg-emerald-900/60 text-emerald-200 border border-emerald-700/50',
    summary: 'Un presupuesto exitoso no busca eliminar todos tus gustos, sino garantizar que los compromisos básicos y el ahorro ocurran primero.',
    keyTakeaway: 'Destina el 50% de tus ingresos a necesidades básicas, el 30% a estilo de vida y el 20% al ahorro y amortización anticipada.',
    source: 'SBS - Guía de Finanzas Personales y Presupuesto Familiar',
    sections: [
      {
        title: 'La regla 50/30/20 explicada paso a paso',
        paragraphs: [
          '50% Necesidades esenciales: Vivienda, alimentación del hogar, transporte indispensable, servicios básicos (agua, luz, internet) y salud.',
          '30% Deseos y estilo de vida: Salidas de fin de semana, streaming, actividades recreativas y compras personales no urgentes.',
          '20% Futuro y tranquilidad: Construcción de fondo de emergencia, ahorro voluntario o prepago de deudas con mayor costo financiero.',
        ],
        tips: [
          'Calcula tus ingresos con montos netos (lo que realmente ingresa a tu cuenta bancaria tras descuentos de ley).',
          'Si tus necesidades superan el 50%, recorta temporalmente del porcentaje de deseos hasta equilibrar tus finanzas.',
        ],
      },
      {
        title: 'Recomendación práctica para evitar desbordes',
        paragraphs: [
          'Revisa tu presupuesto al inicio de cada mes y anota cada domingo los gastos reales de la semana. Este hábito de 10 minutos evita sorpresas a fin de mes.',
        ],
      },
    ],
  },
  {
    id: 'art-intereses-1',
    category: 'Intereses y comisiones',
    title: 'TEA vs. TCEA: La regla de oro para no pagar comisiones ocultas',
    shortDesc: 'Comprende la diferencia entre la tasa pactada y el costo total real que pagas cada mes.',
    readTime: '4 min de lectura',
    badgeColor: 'bg-purple-900/60 text-purple-200 border border-purple-700/50',
    summary: 'La TEA refleja únicamente el costo del dinero prestado. La TCEA suma la TEA más seguros, comisiones y gastos operativos autorizados.',
    keyTakeaway: 'Exige siempre que te muestren la TCEA antes de firmar cualquier pagaré o aceptar desembolsos.',
    source: 'Ley N° 29571 - Código de Protección y Defensa del Consumidor',
    sections: [
      {
        title: '¿Por qué la TEA suele parecer atractiva pero engañosa?',
        paragraphs: [
          'Una entidad financiera puede promocionar en grandes anuncios: "¡Préstamo al 14% de interés!". Esa cifra es la TEA (Tasa Efectiva Anual).',
          'Sin embargo, al incorporar el seguro de desgravamen mensual (que suele rondar entre 0.10% y 0.35% del saldo), más comisiones de evaluación o envío físico de estados de cuenta, la TCEA real puede superar el 28% o 35%.',
        ],
        tips: [
          'Por disposición de la SBS, toda publicidad de créditos en Perú debe exhibir obligatoriamente la TCEA de forma clara y visible.',
          'Solicita recibir tu estado de cuenta por correo electrónico para exonerarte de comisiones por envío físico.',
        ],
      },
      {
        title: 'Interés moratorio y su cálculo',
        paragraphs: [
          'El interés moratorio solo puede aplicarse a partir del día siguiente al vencimiento y se calcula sobre el capital de la cuota vencida, nunca sobre el saldo total del crédito ni sobre intereses no vencidos.',
        ],
      },
    ],
  },
  {
    id: 'art-pagos-1',
    category: 'Pagos responsables',
    title: 'Estrategias de pago: Método Avalancha vs. Bola de Nieve',
    shortDesc: 'Dos fórmulas comprobadas para liquidar múltiples obligaciones sin dispersar tus recursos.',
    readTime: '5 min de lectura',
    badgeColor: 'bg-teal-900/60 text-teal-200 border border-teal-700/50',
    summary: 'Ambas metodologías exigen pagar el monto mínimo a todas las deudas, pero concentran el dinero extra en una sola para cancelarla más rápido.',
    keyTakeaway: 'Elige la Avalancha si deseas ahorrar la mayor cantidad de dinero en intereses; elige Bola de Nieve si buscas motivación rápida.',
    source: 'Educación Financiera AlDía',
    sections: [
      {
        title: 'Método Avalancha (Matemáticamente el más eficiente)',
        paragraphs: [
          'Ordena todas tus deudas de mayor a menor tasa de interés (TCEA). Paga las cuotas mínimas obligatorias en todas, y todo el monto extra disponible abónalo a la deuda de tasa más alta (habitualmente tarjetas de crédito).',
          'Al liquidar esa deuda, todo el flujo de dinero que usabas en ella se transfiere íntegramente a la siguiente con mayor tasa.',
        ],
      },
      {
        title: 'Método Bola de Nieve (Emocionalmente más estimulante)',
        paragraphs: [
          'Ordena tus deudas del menor saldo total al mayor saldo total, sin importar la tasa. Liquida con rapidez la deuda más pequeña.',
          'La satisfacción de eliminar un acreedor de tu lista genera un impulso psicológico inmediato para continuar con las demás.',
        ],
        tips: [
          'Nunca dejes de pagar la cuota mínima de ninguna deuda: hacerlo generará intereses moratorios y reporte negativo en la SBS.',
        ],
      },
    ],
  },
  {
    id: 'art-historial-1',
    category: 'Historial crediticio',
    title: 'Las 5 categorías de la SBS y cómo impactan tu reporte de deudas',
    shortDesc: 'Aprende cómo evalúan los bancos tu nivel de riesgo y qué significa tener calificación Normal, CPP o Deficiente.',
    readTime: '5 min de lectura',
    badgeColor: 'bg-amber-900/60 text-amber-200 border border-amber-700/50',
    summary: 'La Central de Riesgos de la SBS registra mensualmente a todos los deudores del sistema financiero formal, clasificándolos del 0 al 4 según su puntualidad.',
    keyTakeaway: 'Estar en la Central de Riesgos no es negativo; tener calificación 100% Normal es la mejor carta de presentación financiera.',
    source: 'SBS - Resolución SBS N° 11356-2008 (Reglamento de Clasificación del Deudor)',
    sections: [
      {
        title: 'Cómo se asignan las calificaciones en créditos de consumo',
        paragraphs: [
          'Categoría 0 (Normal): Pagos al día o hasta 8 días de retraso calendario.',
          'Categoría 1 (CPP - Con Problemas Potenciales): Atrasos de 9 a 30 días.',
          'Categoría 2 (Deficiente): Atrasos de 31 a 60 días.',
          'Categoría 3 (Dudoso): Atrasos de 61 a 120 días.',
          'Categoría 4 (Pérdida): Atrasos de más de 120 días calendario.',
        ],
        tips: [
          'Puedes consultar tu Reporte de Deudas SBS gratis desde el portal oficial con tu DNI y clave digital.',
          'Si cancelas una deuda que estuvo atrasada, exige tu Constancia de No Adeudo gratuita a la entidad para respaldar tu trámite.',
        ],
      },
    ],
  },
  {
    id: 'art-sobreendeudamiento-1',
    category: 'Prevención del sobreendeudamiento',
    title: 'Cómo calcular tu capacidad máxima de endeudamiento (Regla del 35%)',
    shortDesc: 'Evita comprometer más de la tercera parte de tus ingresos netos en cuotas mensuales.',
    readTime: '4 min de lectura',
    badgeColor: 'bg-rose-900/60 text-rose-200 border border-rose-700/50',
    summary: 'El sobreendeudamiento ocurre cuando la suma de todas las cuotas mensuales supera el 30% a 40% del ingreso familiar disponible.',
    keyTakeaway: 'Calcula tu ratio de endeudamiento sumando todas tus cuotas mensuales y dividiéndolas entre tu ingreso neto mensual.',
    source: 'SBS - Circular de Gestión del Riesgo de Sobreendeudamiento Minorista',
    sections: [
      {
        title: 'Fórmula sencilla para medir tu salud crediticia',
        paragraphs: [
          'Suma la cuota mensual de tu tarjeta, préstamo personal, compras a plazos y crédito vehicular.',
          'Divide ese total entre tus ingresos netos mensuales y multiplica por 100.',
          'Menos del 30%: Zona verde. Endeudamiento saludable y holgado.',
          'Entre 31% y 40%: Zona preventiva. Debes frenar nuevos créditos y priorizar amortizaciones.',
          'Más del 40%: Zona de alto riesgo de sobreendeudamiento ante cualquier baja de ingresos o gasto inesperado.',
        ],
        tips: [
          'Si te encuentras en zona de riesgo, evalúa consolidar deudas en una sola entidad a menor tasa de interés (TCEA).',
          'Suspende el uso de tarjetas de crédito mientras mantengas créditos paralelos en amortización.',
        ],
      },
    ],
  },
  {
    id: 'art-derechos-1',
    category: 'Derechos del consumidor financiero',
    title: 'Derecho al pago anticipado sin penalidades (Ley N° 29571)',
    shortDesc: 'Conoce la normativa que te permite amortizar o cancelar tu deuda en cualquier momento sin recargos.',
    readTime: '4 min de lectura',
    badgeColor: 'bg-cyan-900/60 text-cyan-200 border border-cyan-700/50',
    summary: 'Por mandato de la Ley de Protección al Consumidor en el Perú, todo usuario tiene derecho irrenunciable al pago anticipado total o parcial sin multas ni cobros adicionales.',
    keyTakeaway: 'Tienes la facultad de elegir libremente si tu abono reduce el monto de la cuota mensual o el plazo total del crédito.',
    source: 'Ley N° 29571 (Art. 85) y SBS Resolución N° 3274-2017',
    sections: [
      {
        title: '¿Cómo funciona el pago anticipado a capital?',
        paragraphs: [
          'Al realizar un pago anticipado, el dinero amortiza directamente el saldo del capital adeudado, lo que genera una reducción inmediata y proporcional de los intereses futuros, comisiones y seguros.',
          'La entidad financiera está obligada a preguntarte expresamente qué modalidad prefieres: 1) Reducir el número de cuotas (plazo menor) o 2) Reducir el valor de cada cuota mensual conservando el plazo pactado.',
        ],
        tips: [
          'Reducir el plazo genera un mayor ahorro en intereses totales que reducir la cuota mensual.',
          'El banco debe entregarte un nuevo cronograma de pagos actualizado de manera gratuita e inmediata.',
          'Si un banco intenta cobrarte comisión por prepago, puedes denunciar el hecho ante INDECOPI o la SBS.',
        ],
      },
    ],
  },
];
