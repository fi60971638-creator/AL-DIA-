import { EducationalArticle } from '../types';

// Importación directa de imágenes realistas generadas para el contexto peruano
import imgPagosCuotas from '../assets/images/pagos_cuotas_peru_1792455816636.jpg';
import imgBodega from '../assets/images/bodega_finanzas_peru_1792455798273.jpg';
import imgPagosMoviles from '../assets/images/pagos_moviles_peru_1792455839813.jpg';
import imgAtrasoCuota from '../assets/images/atraso_cuota_peru_1792455853518.jpg';
import imgEvaluarPrestamo from '../assets/images/evaluar_prestamo_1792455866372.jpg';
import imgReporteSBS from '../assets/images/reporte_sbs_1792455878934.jpg';
import imgDerechosCobranza from '../assets/images/derechos_cobranza_1792455891223.jpg';
import imgPresupuestoHogar from '../assets/images/presupuesto_hogar_1792455904282.jpg';

export const EDUCATIONAL_ARTICLES: EducationalArticle[] = [
  {
    id: 'art-pagos-cuotas-1',
    category: 'Pagos y cuotas',
    title: 'Cómo organizar el pago de mis cuotas',
    shortDesc: 'Aprende a sincronizar tus fechas de pago con tus ingresos y elimina el riesgo de pagar moras innecesarias.',
    readTime: '4 min de lectura',
    badgeColor: 'bg-blue-50 text-[#0B3B60] border border-blue-200',
    summary: 'Alinear las fechas de vencimiento de tus créditos con los días en que realmente cobras tu sueldo o ingresos comerciales es la clave más efectiva para no retrasarte.',
    keyTakeaway: 'Puedes solicitar formalmente a tu entidad financiera el cambio de fecha de facturación para que coincida con tus días de mayor liquidez.',
    source: 'Superintendencia de Banca, Seguros y AFP (SBS) - Aprende sobre Créditos',
    imageSrc: imgPagosCuotas,
    imageAlt: 'Familia peruana en su hogar organizando calendario de pagos y recibos con tranquilidad',
    situacionCotidiana: 'Jorge y Carmen reciben sus ingresos quincenales, pero tienen 3 fechas de pago distintas en el mes que caen justo los días en que deben pagar el alquiler y los servicios, lo que les causa estrés y pequeños atrasos reiterados.',
    explicacionSencilla: 'Cuando las cuotas están dispersas a lo largo del mes, es fácil gastar el dinero sin darse cuenta. La solución técnica es consolidar las fechas de pago o fijarlas 2 a 3 días después de tu fecha de cobro segura.',
    pasosPracticos: [
      'Revisa tus contratos: identifica qué día del mes cobra tu empleador o ingresa tu mayor flujo de ventas.',
      'Comunícate con la entidad financiera (plataforma o banca digital) y solicita un cambio de fecha de pago o ciclo de facturación.',
      'Arma un calendario visual visible en tu hogar con las fechas límites y el monto exacto de cada cuota.',
      'Separa el dinero de las cuotas el mismo día que ingresa tu pago, antes de hacer compras o gastos prescindibles.'
    ],
    ejemploSoles: {
      titulo: 'Ahorro por evitar comisiones por mora',
      detalle: 'Atrasarse 5 días en 2 créditos de consumo genera cargos por intereses moratorios y comisiones de cobranza de entre S/ 45 y S/ 90 mensuales.',
      calculo: 'Sincronizar tus fechas te ahorra más de S/ 700 al año en cobros evitables.'
    },
    consejoAlDia: 'Las entidades financieras reguladas por la SBS tienen la obligación de permitirte elegir tu fecha de pago al contratar o solicitar su reprogramación de ciclo. ¡Hazlo con anticipación!',
    fuenteOficialUrl: 'https://www.sbs.gob.pe/usuarios/aprende-con-la-sbs/aprende-sobre-creditos',
    fuenteOficialNombre: 'SBS - Aprende sobre Créditos',
    sections: [
      {
        title: 'Por qué se desordenan los pagos',
        paragraphs: [
          'En el Perú, muchas familias adquieren créditos en momentos distintos: una tarjeta en enero, un préstamo personal en mayo y una compra de electrodoméstico a plazos en julio. Cada uno tiene un día de vencimiento diferente.',
          'Si no sincronizas estas fechas, estás expuesto a que un imprevisto deje tu cuenta sin saldo el día 10, cuando tu sueldo recién entra el día 15.'
        ],
        tips: [
          'La mayoría de bancos y cajas permiten cambiar la fecha de corte una vez cada 6 o 12 meses sin costo.',
          'Programa transferencias automáticas en tu app bancaria hacia una cuenta de ahorros secundaria destinada solo a cuotas.'
        ]
      }
    ]
  },
  {
    id: 'art-bodega-deudas-2',
    category: 'Finanzas para emprendedores',
    title: 'Tengo una bodega, ¿cómo organizo mis deudas?',
    shortDesc: 'Estrategias para comerciantes de barrio: separa el bolsillo del negocio del familiar y no descapitalices tu tienda.',
    readTime: '5 min de lectura',
    badgeColor: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
    summary: 'El principal riesgo financiero de una bodega o puesto de mercado es utilizar las ventas del día para compras del hogar, dejando sin pagar la cuota de mercadería.',
    keyTakeaway: 'Asignate un sueldo fijo como dueño del negocio y separa una cuota diaria fija en una caja separada para cubrir el préstamo mensual.',
    source: 'Superintendencia de Banca, Seguros y AFP (SBS) - Prevención del Sobreendeudamiento',
    imageSrc: imgBodega,
    imageAlt: 'Comerciante peruana en su bodega tradicional de abarrotes registrando cuentas en su cuaderno',
    situacionCotidiana: 'Doña Rosa atiende su bodega en Lima; cobra las compras del día y de esa misma caja saca para el almuerzo, la pensión escolar y los pagos a proveedores. Al llegar el fin de mes, le falta dinero para la cuota del préstamo comercial.',
    explicacionSencilla: 'El dinero que entra por ventas no es ganancia; la mayor parte es costo de reposición de mercadería y pago de capital. Si lo gastas en el hogar, te estás comiendo el capital de trabajo.',
    pasosPracticos: [
      'Lleva un cuaderno diario simple con tres columnas: Ingresos por ventas, Pagos a proveedores y Ganancia real estimada.',
      'Fíjate un sueldo semanal o mensual personal y respétalo sin sacar dinero extra de la caja registradora.',
      'Aplica la técnica de la alcancía diaria: si tu cuota mensual es de S/ 900 y abres 30 días, aparta religiosamente S/ 30 cada mañana antes de cualquier otro gasto.',
      'Controla estrictamente el fiado: pon un límite máximo y no fíes a clientes con deudas anteriores pendientes.'
    ],
    ejemploSoles: {
      titulo: 'Cálculo de cuota diaria para comerciantes',
      detalle: 'Préstamo para surtir mercadería con cuota mensual de S/ 1,200.',
      calculo: 'En lugar de sufrir reuniendo S/ 1,200 el día 30, apartar S/ 40 diarios de las ventas asegura el pago puntual sin descapitalizar los estantes.'
    },
    consejoAlDia: 'Nunca uses un préstamo de consumo personal caro para financiar mercadería de bodega. Busca siempre microcréditos comerciales con tasas preferenciales para capital de trabajo en Cajas Municipales o Cooperativas reguladas.',
    fuenteOficialUrl: 'https://www.sbs.gob.pe/usuarios/aprende-con-la-sbs/el-sobrendeudamiento',
    fuenteOficialNombre: 'SBS - Gestión del Sobreendeudamiento',
    sections: [
      {
        title: 'El error común: confundir flujo de caja con utilidad',
        paragraphs: [
          'Vender S/ 800 en un día festivo no significa haber ganado S/ 800. Si el margen de ganancia es del 18%, tu ganancia neta es de S/ 144, mientras que S/ 656 pertenecen a los distribuidores de abarrotes y bebidas.',
          'Cuidar tu historial crediticio como comerciante te permitirá acceder a créditos más grandes con tasas bajas para ampliar tu local o comprar mercadería al por mayor con descuento.'
        ]
      }
    ]
  },
  {
    id: 'art-yape-plin-3',
    category: 'Pagos digitales y seguridad',
    title: 'Yape, Plin y los pagos: ¿qué debo comprobar?',
    shortDesc: 'Recomendaciones prácticas para confirmar cobros y transferencias digitales sin caer en capturas falsas ni estafas.',
    readTime: '4 min de lectura',
    badgeColor: 'bg-purple-50 text-purple-800 border border-purple-200',
    summary: 'Las billeteras móviles facilitan el comercio, pero exigen una verificación estricta: nunca confíes únicamente en la captura que te muestra el comprador.',
    keyTakeaway: 'Valida siempre en tu propia aplicación bancaria o SMS oficial que el dinero figure acreditado en tus movimientos antes de entregar el producto o recibo.',
    source: 'INDECOPI - Guía de Seguridad y Protección al Consumidor en Medios Digitales',
    imageSrc: imgPagosMoviles,
    imageAlt: 'Joven peruana verificando en la pantalla de su celular la acreditación de una transferencia móvil en la calle',
    situacionCotidiana: 'Un cliente en apuro muestra rápidamente la pantalla de su teléfono con un comprobante que dice "Pago exitoso por S/ 65", agradece y se retira rápidamente. Minutos después, el comerciante revisa su app y descubre que el dinero nunca ingresó.',
    explicacionSencilla: 'Existen aplicaciones fraudulentas que imitan el diseño visual de comprobantes de pago. La única constancia legal y real es el registro en los movimientos de tu propia cuenta bancaria.',
    pasosPracticos: [
      'Espera 10 a 15 segundos y abre tu propia aplicación para verificar que la notificación de abono haya ingresado.',
      'Comprueba que el nombre del titular y el monto en soles coincidan con el valor acordado de la transacción.',
      'Al enviar dinero a terceros, verifica dos veces el número celular y el nombre que la aplicación muestra antes de confirmar.',
      'Nunca compartas tu clave secreta de 6 dígitos ni códigos de validación SMS con nadie, ni siquiera con supuestos agentes bancarios.'
    ],
    ejemploSoles: {
      titulo: 'Verificación en compras cotidianas',
      detalle: 'Venta de S/ 85 cobrada mediante código QR o número de celular.',
      calculo: 'Revisar la campana de notificaciones de tu app toma menos de 10 segundos y evita la pérdida del 100% del valor de tu producto.'
    },
    consejoAlDia: 'Si eres comerciante, activa las notificaciones sonoras o vincula una cuenta con alertas SMS automáticas para escuchar la confirmación del pago sin necesidad de pedir prestado el celular del cliente.',
    fuenteOficialUrl: 'https://www.gob.pe/indecopi',
    fuenteOficialNombre: 'INDECOPI - Protección al Consumidor',
    sections: [
      {
        title: 'Qué hacer ante un pago digital no reconocido o erróneo',
        paragraphs: [
          'Si envías dinero por error a un número equivocado, las billeteras digitales no pueden revertir la operación unilateralmente porque el dinero ingresó a la cuenta de otra persona. Debes contactar al receptor o iniciar el trámite formal de aclaración en tu entidad.',
          'Nunca hagas transferencias en redes Wi-Fi públicas de parques o centros comerciales; usa siempre tus datos móviles para proteger tus contraseñas.'
        ]
      }
    ]
  },
  {
    id: 'art-atraso-cuota-4',
    category: 'Cobranzas responsables',
    title: 'Me atrasé en una cuota, ¿qué hago ahora?',
    shortDesc: 'Guía paso a paso para afrontar un atraso: cómo actuar en los primeros 30 días y proteger tu tranquilidad.',
    readTime: '5 min de lectura',
    badgeColor: 'bg-amber-50 text-amber-800 border border-amber-200',
    summary: 'Un atraso de pocos días no te convierte en moroso permanente ni autoriza a la entidad a vulnerar tus derechos. La comunicación formal temprana es la clave.',
    keyTakeaway: 'No te escondas ni dejes pasar las semanas. Acércate a la entidad antes del día 30 para solicitar facilidades o reprogramación de la cuota vencida.',
    source: 'Superintendencia de Banca, Seguros y AFP (SBS) - El Historial Crediticio',
    imageSrc: imgAtrasoCuota,
    imageAlt: 'Trabajador peruano analizando con calma su cronograma de pagos bancario y libreta de notas',
    situacionCotidiana: 'Víctor tuvo un gasto médico imprevisto y pasaron 14 días desde el vencimiento de su cuota de S/ 420. Comienza a recibir llamadas del banco y siente temor de responder porque no tiene el dinero completo en ese momento.',
    explicacionSencilla: 'En los primeros 30 días, el crédito se encuentra en etapa preventiva. La entidad prefiere acordar un compromiso de pago antes de clasificar tu deuda con mayor riesgo en la SBS.',
    pasosPracticos: [
      'Revisa tu estado de cuenta actual y calcula cuánto puedes abonar de inmediato (aunque sea un pago parcial a capital).',
      'Contesta la llamada o acércate a la agencia bancaria de forma proactiva; explica tu situación con serenidad y solicita opciones.',
      'Pregunta por alternativas formales: prórroga de fecha, traslado de cuota al final del cronograma o refinanciamiento.',
      'Exige que todo acuerdo quede registrado por escrito o enviado a tu correo electrónico oficial antes de abonar.'
    ],
    ejemploSoles: {
      titulo: 'Cálculo real de interés moratorio',
      detalle: 'Cuota vencida de S/ 500 con 10 días de atraso en el sistema bancario.',
      calculo: 'El interés moratorio legal fijado por el BCRP se calcula solo sobre el capital vencido (unos céntimos por día). Las entidades no pueden inventar multas desproporcionadas.'
    },
    consejoAlDia: 'Nunca pidas un préstamo informal tipo "gota a gota" para pagar una cuota bancaria atrasada. Las deudas bancarias tienen protección legal, plazos de refinanciamiento y no ponen en riesgo tu integridad física.',
    fuenteOficialUrl: 'https://www.sbs.gob.pe/usuarios/aprende-con-la-sbs/el-historial-crediticio',
    fuenteOficialNombre: 'SBS - El Historial Crediticio',
    sections: [
      {
        title: 'Consecuencias reales de los días de mora',
        paragraphs: [
          'De 1 a 8 días de retraso: Tu crédito sigue clasificado como Normal (Categoría 0) en la Central de Riesgos de la SBS.',
          'De 9 a 30 días de retraso: Cambia a Con Problemas Potenciales (CPP). Si regularizas, tu reporte volverá a actualizarse favorablemente en los meses siguientes tras mantener tus pagos al día.'
        ]
      }
    ]
  },
  {
    id: 'art-evaluar-prestamo-5',
    category: 'Créditos y préstamos',
    title: 'Antes de aceptar un préstamo, revisa esto',
    shortDesc: 'Aprende a analizar la Hoja Resumen, comparar la TCEA real y evitar comprometerte con plazos eternos.',
    readTime: '5 min de lectura',
    badgeColor: 'bg-sky-50 text-sky-800 border border-sky-200',
    summary: 'Nunca tomes un crédito solo porque la cuota parece baja. La Tasa de Costo Efectivo Anual (TCEA) es la única cifra que revela el costo real total.',
    keyTakeaway: 'Calcula siempre el monto total final multiplicando el valor de la cuota por el número de meses antes de firmar cualquier pagaré.',
    source: 'Superintendencia de Banca, Seguros y AFP (SBS) - Aprende sobre Créditos',
    imageSrc: imgEvaluarPrestamo,
    imageAlt: 'Pareja peruana revisando con atención un contrato de préstamo y la hoja resumen de TCEA',
    situacionCotidiana: 'A Miguel le ofrecen un préstamo "preaprobado" de S/ 6,000 con una cuota de S/ 290 a 36 meses. Le parece accesible, pero no ha calculado cuánto terminará pagando al final del plazo.',
    explicacionSencilla: 'Multiplica: 36 meses × S/ 290 = S/ 10,440. Por un préstamo de S/ 6,000 terminará pagando S/ 4,440 en intereses, seguros y comisiones. Una cuota baja con plazo largo suele ser la opción más cara.',
    pasosPracticos: [
      'Exige la Hoja Resumen previa a la contratación: es tu derecho legal según la normativa de la SBS.',
      'Busca la TCEA (Tasa de Costo Efectivo Anual), no te dejes llevar solo por la TEA promocional publicitaria.',
      'Revisa el Seguro de Desgravamen: verifica cuánto te cobran mensualmente y si puedes presentar una póliza endosada propia.',
      'Pregunta si puedes realizar amortizaciones o pagos anticipados directos a capital sin ninguna penalidad.'
    ],
    ejemploSoles: {
      titulo: 'Comparación de dos opciones para S/ 5,000',
      detalle: 'Opción A (Banco X): 36 meses a S/ 250 (TCEA 42%) = Total S/ 9,000. Opción B (Caja Municipal): 18 meses a S/ 340 (TCEA 21%) = Total S/ 6,120.',
      calculo: 'La opción B te ahorra S/ 2,880 en intereses totales con un plazo más corto y saludable.'
    },
    consejoAlDia: 'Compara siempre al menos tres alternativas en el simulador oficial de la SBS antes de decidir: un banco, una caja municipal y una financiera.',
    fuenteOficialUrl: 'https://www.sbs.gob.pe/usuarios/aprende-con-la-sbs/aprende-sobre-creditos',
    fuenteOficialNombre: 'SBS - Comparador y Guía de Créditos',
    sections: [
      {
        title: 'Los componentes de la cuota mensual',
        paragraphs: [
          'Cada cuota mensual que pagas tiene tres partes: 1) Amortización del capital prestado, 2) Interés compensatorio del mes, y 3) Seguro de desgravamen y comisiones autorizadas.',
          'En las primeras cuotas de un crédito largo, la mayor parte de tu pago se va en intereses y amortizas muy poco capital. Por eso conviene elegir plazos más cortos siempre que tu presupuesto lo soporte.'
        ]
      }
    ]
  },
  {
    id: 'art-reporte-sbs-6',
    category: 'Historial crediticio',
    title: 'Cómo consultar mi Reporte de Deudas SBS',
    shortDesc: 'Guía paso a paso para acceder gratis a tu reporte oficial con DNI y conocer tu calificación crediticia.',
    readTime: '4 min de lectura',
    badgeColor: 'bg-indigo-50 text-indigo-800 border border-indigo-200',
    summary: 'La SBS ofrece un servicio digital gratuito para que cualquier ciudadano consulte sus deudas registradas en bancos, cajas y financieras con total transparencia.',
    keyTakeaway: 'El reporte de deudas de la SBS es 100% gratuito. No pagues a intermediarios ni tramitadores que prometan limpiarte el historial.',
    source: 'Superintendencia de Banca, Seguros y AFP (SBS) - Reporte de Deudas Oficial',
    imageSrc: imgReporteSBS,
    imageAlt: 'Ciudadano peruano verificando en su computadora su reporte de deudas oficial de la SBS con su DNI',
    situacionCotidiana: 'Rosa quiere solicitar un crédito para techar su segundo piso y necesita verificar si una tarjeta antigua que dejó de usar sigue figurando con alguna deuda o cobro pendiente.',
    explicacionSencilla: 'Todas las personas con un crédito o tarjeta formal en el Perú tienen un registro en la Central de Riesgos de la SBS. Estar en la SBS no es malo; tener calificación Normal demuestra que eres un pagador confiable.',
    pasosPracticos: [
      'Ingresa desde tu navegador a la página oficial de la SBS: servicios.sbs.gob.pe.',
      'Selecciona "Reporte de Deudas SBS" y crea tu cuenta ingresando tu DNI y datos de verificación personal.',
      'Descarga tu reporte oficial en formato PDF de manera gratuita e instantánea.',
      'Revisa las entidades registradas, el monto total adeudado y tu porcentaje de calificación en la escala del 0 al 4.'
    ],
    ejemploSoles: {
      titulo: 'Interpretación de la escala SBS',
      detalle: 'Escala oficial: Normal (0), Con Problemas Potenciales (1), Deficiente (2), Dudoso (3) y Pérdida (4).',
      calculo: 'Tener calificación 100% Normal (0) te permite negociar tasas de interés mucho más bajas en tus futuros créditos.'
    },
    consejoAlDia: 'Si cancelaste una deuda antigua que estuvo en mora, solicita a la entidad tu Constancia de No Adeudo gratuita y guárdala digitalizada como respaldo permanente.',
    fuenteOficialUrl: 'https://www.sbs.gob.pe/usuarios/nuestros-servicios/reporte-de-deudas',
    fuenteOficialNombre: 'SBS - Portal Oficial de Reporte de Deudas',
    sections: [
      {
        title: 'Mitos frecuentes sobre la Central de Riesgos',
        paragraphs: [
          'Mito: "Pagaré a un tramitador para que me borre de Infocorp o de la SBS". Realidad: Ninguna empresa privada ni persona puede alterar la base de datos de la SBS. La única forma legal es pagar la deuda y esperar los plazos de ley para la actualización.',
          'El reporte de la SBS se actualiza mensualmente con la información que las entidades reportan con un desfase natural de 30 a 45 días.'
        ]
      }
    ]
  },
  {
    id: 'art-cobranza-abusiva-7',
    category: 'Derechos del consumidor',
    title: 'Qué hacer ante una cobranza abusiva',
    shortDesc: 'Conoce los horarios legales, métodos prohibidos por ley y cómo denunciar ante INDECOPI sin temor.',
    readTime: '5 min de lectura',
    badgeColor: 'bg-rose-50 text-rose-800 border border-rose-200',
    summary: 'Cobrar una obligación legítima está permitido por ley; lo que está terminantemente prohibido es el acoso, la intimidación, las llamadas a deshoras y la afectación a terceros.',
    keyTakeaway: 'El Código del Consumidor (Ley N° 29571) sanciona a las empresas que cobran a familiares, empleadores o llaman fuera del horario autorizado.',
    source: 'INDECOPI - Código de Protección y Defensa del Consumidor (Ley N° 29571)',
    imageSrc: imgDerechosCobranza,
    imageAlt: 'Usuaria peruana informada con manual de derechos del consumidor frente a métodos de cobranza',
    situacionCotidiana: 'Patricia recibe llamadas de cobranza a las 10:30 de la noche, mensajes amenazantes de supuestos embargos policiales inmediatos y llamadas al teléfono de su centro de labores que ponen en riesgo su trabajo.',
    explicacionSencilla: 'La ley peruana establece límites muy claros para las empresas de cobranza. Cualquier conducta que vulnere tu dignidad personal o privacidad constituye una infracción denunciable.',
    pasosPracticos: [
      'Conoce los horarios legales autorizados: de lunes a viernes de 7:00 a.m. a 8:00 p.m., y sábados de 8:00 a.m. a 2:00 p.m. Prohibido domingos y feriados.',
      'Está prohibido llamar a tus familiares, vecinos o a tu centro de trabajo para divulgar que mantienes una deuda pendiente.',
      'Está prohibido enviar notificaciones que aparenten ser demandas judiciales falsas o pegar carteles en la fachada de tu vivienda.',
      'Guarda capturas de pantalla, audios y registros de llamadas, e ingresa tu reclamo gratuito en "Reclama Virtual" de INDECOPI.'
    ],
    ejemploSoles: {
      titulo: 'Cobros indebidos de gastos de cobranza',
      detalle: 'Entidades que aplican automáticamente "gastos de cobranza" de S/ 80 a S/ 200 sin demostrar gestiones reales de cobranza efectiva.',
      calculo: 'La normativa de la SBS prohíbe comisiones fijas automáticas por el simple hecho del atraso si no existió un servicio de cobranza efectivo sustentado.'
    },
    consejoAlDia: 'Mantén siempre la calma al atender una llamada de cobranza. Pide el nombre de la empresa gestora, el código de llamada y exige que se comuniquen únicamente dentro de los horarios que marca la ley peruana.',
    fuenteOficialUrl: 'https://www.gob.pe/indecopi',
    fuenteOficialNombre: 'INDECOPI - Reclama Virtual',
    sections: [
      {
        title: 'Canales formales para presentar tu reclamo',
        paragraphs: [
          'Paso 1: Presenta tu reclamo en el Libro de Reclamaciones de la entidad financiera o empresa de cobranza exigiendo el cese inmediato del hostigamiento.',
          'Paso 2: Si en 15 días hábiles no te responden o persisten los abusos, eleva tu denuncia ante el Servicio de Atención al Ciudadano de INDECOPI (teléfono 01 224-7777 en Lima o 0 800-4-4040 en regiones).'
        ]
      }
    ]
  },
  {
    id: 'art-presupuesto-hogar-8',
    category: 'Presupuesto familiar',
    title: 'Cuánto puedo pagar de cuota sin descuidar mi hogar',
    shortDesc: 'Aplica la regla del 30% al 35% de capacidad de endeudamiento para proteger la alimentación, salud y educación de tu familia.',
    readTime: '4 min de lectura',
    badgeColor: 'bg-teal-50 text-teal-800 border border-teal-200',
    summary: 'El sobreendeudamiento no surge de un día para otro; comienza cuando las cuotas mensuales devoran el dinero indispensable para el mercado, los servicios y la salud del hogar.',
    keyTakeaway: 'La suma de todas tus cuotas mensuales nunca debe superar el 30% a 35% de los ingresos netos reales del hogar.',
    source: 'Superintendencia de Banca, Seguros y AFP (SBS) - El Sobreendeudamiento',
    imageSrc: imgPresupuestoHogar,
    imageAlt: 'Madre e hija peruanas haciendo cuentas de su presupuesto familiar para compras del mercado y servicios',
    situacionCotidiana: 'Elena y su esposo tienen un ingreso familiar neto de S/ 2,800 al mes. Quieren comprar electrodomésticos a cuotas y evaluar un crédito para arreglar el techo, pero temen no llegar a fin de mes.',
    explicacionSencilla: 'Calcula tu capacidad máxima de endeudamiento: multiplica tus ingresos netos por 0.30. La cifra resultante es el límite total que pueden sumar todas tus deudas juntas.',
    pasosPracticos: [
      'Suma los ingresos netos reales (lo que efectivamente cobras tras descuentos de ley y aportes).',
      'Calcula el 30%: por ejemplo, si ganas S/ 2,800, el 30% es S/ 840 mensuales.',
      'Suma tus cuotas actuales: si ya pagas S/ 400 de una tarjeta, solo tienes un margen seguro de S/ 440 para una nueva obligación.',
      'Crea un fondo de reserva mensual de al menos S/ 100 para afrontar emergencias de salud o reparaciones sin recurrir a préstamos de emergencia.'
    ],
    ejemploSoles: {
      titulo: 'Cálculo de semáforo de endeudamiento familiar',
      detalle: 'Ingreso familiar neto: S/ 2,800 mensuales.',
      calculo: 'Zona Verde (hasta S/ 840): Finanzas saludables. Zona Preventiva (S/ 840 a S/ 1,120): Límite de precaución. Zona Roja (más de S/ 1,120): Alto riesgo de asfixia económica ante cualquier imprevisto.'
    },
    consejoAlDia: 'No aceptes líneas de crédito adicionales de tarjetas solo porque el banco te las incrementa automáticamente. Si no las necesitas, solicita por escrito en la banca móvil que mantengan tu línea en el monto que realmente puedes controlar.',
    fuenteOficialUrl: 'https://www.sbs.gob.pe/usuarios/aprende-con-la-sbs/el-sobrendeudamiento',
    fuenteOficialNombre: 'SBS - Guía contra el Sobreendeudamiento',
    sections: [
      {
        title: 'Qué rubros del hogar jamás deben sacrificarse por una cuota',
        paragraphs: [
          'La canasta básica de alimentos, los servicios de agua, luz, internet para los estudios y las medicinas esenciales nunca deben postergarse para pagar un crédito no prioritario.',
          'Si notas que tus cuotas están superando el 40% de tu sueldo, acércate de inmediato a la entidad para consolidar deudas en una sola cuota más holgada antes de caer en mora.'
        ]
      }
    ]
  }
];
