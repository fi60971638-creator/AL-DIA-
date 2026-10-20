export interface SecurityTopic {
  id: string;
  title: string;
  category: 'Estafas y fraudes' | 'Protección de cuentas' | 'Canales y denuncias' | 'Seguridad en canales';
  icon: string;
  badge: string;
  badgeColor: string;
  shortDesc: string;
  keyRule: string;
  alertSignals: string[];
  stepByStep: string[];
  ejemploPeruano: {
    titulo: string;
    situacion: string;
    desenlaceSeguro: string;
  };
  consejoAlDia: string;
  fuenteOficialUrl: string;
  fuenteOficialNombre: string;
}

export interface SecurityGameQuestion {
  id: string;
  category: string;
  situation: string;
  detail: string;
  options: {
    text: string;
    isSafe: boolean;
    explanation: string;
  }[];
  officialLearnUrl: string;
  officialLearnName: string;
}

export interface OfficialHelpChannel {
  id: string;
  name: string;
  fullName: string;
  badge: string;
  scope: string;
  description: string;
  whenToContact: string[];
  evidenceToKeep: string[];
  channels: {
    type: string;
    value: string;
    note?: string;
  }[];
  officialUrl: string;
  buttonText: string;
}

export const SECURITY_TOPICS: SecurityTopic[] = [
  {
    id: 'prestamos-fraudulentos',
    title: 'Cómo reconocer préstamos fraudulentos',
    category: 'Estafas y fraudes',
    icon: 'gavel',
    badge: 'Alerta de Informalidad',
    badgeColor: 'bg-rose-50 text-rose-800 border-rose-200',
    shortDesc: 'Aprende a identificar falsas empresas que exigen pagos por adelantado o aplicaciones abusivas tipo «gota a gota».',
    keyRule: 'Ninguna entidad supervisada por la SBS te pedirá depositar dinero para desbloquear o desembolsar un préstamo.',
    alertSignals: [
      'Te piden pagar previamente por "gastos de seguro", "comisión notarial" o "activación de cuenta".',
      'Te ofrecen sumas altas de dinero en minutos, "sin mirar Infocorp" y sin pedir sustento de ingresos.',
      'Operan a través de aplicaciones de celular que te exigen acceso obligatorio a tu libreta de contactos, fotos y ubicación.',
      'No tienen oficina física comprobable, RUC activo ni registro ante la SBS.'
    ],
    stepByStep: [
      'Consulta en el Registro SBS de Casas de Préstamo o el catálogo de empresas supervisadas antes de contactar.',
      'Desconfía de anuncios patrocinados en redes sociales con logotipos mal impresos o nombres que imitan a bancos conocidos.',
      'Si una app te exige acceso a tus contactos para prestarte dinero, desinstálala inmediatamente: es el mecanismo de extorsión del gota a gota virtual.',
      'Nunca transfieras ningún monto anticipado bajo ninguna excusa: el préstamo legítimo descuenta sus costos del mismo desembolso si corresponde.'
    ],
    ejemploPeruano: {
      titulo: 'El anuncio en redes sociales de "Crédito Veloz Perú"',
      situacion: 'A Juan le ofrecen por Facebook S/ 8,000 en 20 minutos con una cuota mensual de S/ 250. Al escribir por WhatsApp, un supuesto asesor le dice que el crédito fue aprobado, pero debe depositar primero S/ 320 a una cuenta personal por "derecho de póliza y firma notarial".',
      desenlaceSeguro: 'Juan desconfía, no deposita nada y busca la empresa en la lista de supervisados de la SBS, donde constata que no existe. Evitó perder S/ 320 y bloqueó el número.'
    },
    consejoAlDia: 'Las cooperativas y empresas formales autorizadas por la SBS tienen canales presenciales y digitales auditados. La promesa de dinero fácil sin requisitos suele ser el gancho de una red de estafa.',
    fuenteOficialUrl: 'https://www.sbs.gob.pe/usuarios/aprende-con-la-sbs/modalidades-de-informalidad',
    fuenteOficialNombre: 'SBS - Modalidades de Informalidad Financiera'
  },
  {
    id: 'proteger-claves-codigos',
    title: 'Cómo proteger contraseñas, claves y códigos de verificación',
    category: 'Protección de cuentas',
    icon: 'lock',
    badge: 'Confidencialidad Total',
    badgeColor: 'bg-blue-50 text-[#0B3B60] border-blue-200',
    shortDesc: 'Por qué tu Token digital, clave de 6 dígitos y código SMS son tu firma legal y jamás debes compartirlos.',
    keyRule: 'Tu clave secreta y tu Token son intransferibles. Ningún trabajador de banco o entidad te los pedirá jamás.',
    alertSignals: [
      'Te llaman diciendo que "anularán un cobro indebido" y te piden dictar el código de 6 dígitos que te acaba de llegar.',
      'Páginas web que te piden ingresar dos veces seguidas la clave de internet o el token digital para "actualizar tu cuenta".',
      'Personas que te piden tomar foto de tu tarjeta donde se aprecie el código CVV de tres dígitos del reverso.',
      'Uso de contraseñas fáciles como tu fecha de nacimiento, DNI o series consecutivas (123456).'
    ],
    stepByStep: [
      'Entiende el rol del código: ese número de 6 dígitos por SMS no es para "bloquear", es la confirmación para autorizar una transferencia o compra.',
      'Corta de inmediato cualquier llamada donde te soliciten tu clave dinámica o token.',
      'Crea contraseñas robustas y distintas para tu correo personal y para tu banca por internet.',
      'Activa el ingreso con huella digital o reconocimiento facial en tu celular para no teclear tu clave en lugares públicos.'
    ],
    ejemploPeruano: {
      titulo: 'La supuesta llamada de anulación de compra en tienda por departamento',
      situacion: 'A Gladys la llaman un viernes a las 7 p.m. alertando de una supuesta compra de S/ 1,450 en una tienda. El operador finge urgencia y le dice: "Le envié un SMS con un código de cancelación, díctemelo rápido para frenar el débito".',
      desenlaceSeguro: 'Gladys recuerda que los códigos SMS son para autorizar, no para cancelar. Cuelga la llamada, revisa su aplicación bancaria oficial y constata que no había ningún cobro. Llamó al banco y confirmó el intento de fraude.'
    },
    consejoAlDia: 'Si dudas de una llamada de tu banco, cuelga y marca tú mismo el número que aparece al reverso de tu tarjeta plástica de débito o crédito.',
    fuenteOficialUrl: 'https://www.sbs.gob.pe/usuarios/aprende-con-la-sbs/fraudes-digitales-y-telefonicos',
    fuenteOficialNombre: 'SBS - Fraudes Digitales y Telefónicos'
  },
  {
    id: 'enlaces-sospechosos-mensajes-falsos',
    title: 'Cómo detectar enlaces sospechosos y mensajes falsos',
    category: 'Estafas y fraudes',
    icon: 'link_off',
    badge: 'Smishing y Phishing',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
    shortDesc: 'Aprende a reconocer mensajes de texto (SMS) y correos alarmistas que suplantan a entidades bancarias y del Estado.',
    keyRule: 'Los bancos peruanos no envían enlaces web (links) por SMS para solicitar claves o desbloquear productos.',
    alertSignals: [
      'Mensajes SMS que amenazan con: "Tu cuenta será suspendida en 2 horas, actualiza aquí: bit.ly/..."',
      'Falsos mensajes de entrega de bonos del Estado o devoluciones de Fonavi con links no oficiales (.xyz, .cc, .top).',
      'El remitente del SMS es un número celular convencional de 9 dígitos en lugar del código institucional corto del banco.',
      'Errores ortográficos o saludos genéricos como "Estimado cliente" sin tu nombre.'
    ],
    stepByStep: [
      'Nunca hagas clic en enlaces recibidos por SMS o mensajes directos de redes sociales.',
      'Examina la dirección web: los sitios seguros en el Perú terminan en dominios oficiales (.pe, .com.pe, .gob.pe).',
      'Si tienes una duda sobre tu cuenta, abre tu navegador e ingresa escribiendo tú mismo la dirección oficial de la entidad.',
      'Reenvía el SMS fraudulento a los canales de alerta de tu operador o bórralo de inmediato.'
    ],
    ejemploPeruano: {
      titulo: 'El falso SMS de desbloqueo de cuenta bancaria',
      situacion: 'Marcos recibe un mensaje: "ALERTA BANCO: Tu token fue inhabilitado. Evita multas ingresando a https://banco-seguro-tokenperu.com para reactivarlo". La página imitaba fielmente el diseño del banco.',
      desenlaceSeguro: 'Marcos no ingresa al enlace. Abre su aplicación bancaria instalada en su teléfono y verifica que su token opera con normalidad. Reporta el mensaje falso.'
    },
    consejoAlDia: 'Ninguna entidad pública del Estado (como el Banco de la Nación, Midis o Sunat) pide datos bancarios privados a través de enlaces de mensajería instantánea.',
    fuenteOficialUrl: 'https://www.sbs.gob.pe/usuarios/aprende-con-la-sbs/al-utilizar-la-banca-por-internet',
    fuenteOficialNombre: 'SBS - Seguridad en Banca por Internet'
  },
  {
    id: 'verificar-entidad-formal',
    title: 'Cómo verificar si una entidad financiera es formal',
    category: 'Canales y denuncias',
    icon: 'verified',
    badge: 'Supervisión SBS',
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    shortDesc: 'Comprueba el registro oficial ante la SBS de bancos, cajas municipales, financieras y cooperativas autorizadas.',
    keyRule: 'Solo las entidades autorizadas por la SBS pueden captar dinero del público y cuentan con respaldo legal.',
    alertSignals: [
      'Empresas que ofrecen rentabilidades fijas mensuales exageradas (15%, 20% o 30%) asegurando "cero riesgo".',
      'Financieras que no aparecen en el portal web de la SBS ni en el Registro Nacional de Cooperativas (COOPAC).',
      'Sociedades que dicen operar "bajo leyes internacionales" sin contar con sede constituida en el Perú.',
      'Organizaciones que te solicitan hacer depósitos a cuentas corrientes personales de sus gerentes o promotores.'
    ],
    stepByStep: [
      'Ingresa al módulo oficial de "Empresas Supervisadas" en el portal web de la SBS (sbs.gob.pe).',
      'Verifica si la entidad cuenta con cobertura del Fondo de Seguro de Depósitos (FSD), que protege tus ahorros hasta el monto máximo de cobertura vigente.',
      'Si se trata de una Cooperativa de Ahorro y Crédito, verifica que figure con inscripción vigente en la SBS.',
      'Si la empresa no aparece registrada, abstente de entregar tu dinero y comunícate con la línea gratuita de la SBS.'
    ],
    ejemploPeruano: {
      titulo: 'La cooperativa informal de ahorros en un mercado regional',
      situacion: 'En un mercado de Huancayo, promotores ofrecen a comerciantes abrir cuentas de ahorro con una tasa del 25% anual bajo el nombre de "Asociación Solidaria de Créditos".',
      desenlaceSeguro: 'Una comerciante consulta en el portal de la SBS y constata que la empresa no está inscrita ni supervisada para captar ahorros. Prefiere depositar su dinero en una Caja Municipal regulada con cobertura de seguro de depósito.'
    },
    consejoAlDia: 'Estar constituido en Registros Públicos (Sunarp) o tener RUC en Sunat no otorga autorización para captar dinero de los ciudadanos. La única entidad que autoriza captaciones financieras es la SBS.',
    fuenteOficialUrl: 'https://www.sbs.gob.pe/supervisados-y-registros/empresas-supervisadas',
    fuenteOficialNombre: 'SBS - Portal de Empresas Supervisadas'
  },
  {
    id: 'operaciones-no-reconocidas',
    title: 'Qué hacer ante operaciones que no reconoces',
    category: 'Protección de cuentas',
    icon: 'notification_important',
    badge: 'Respuesta Inmediata',
    badgeColor: 'bg-indigo-50 text-indigo-800 border-indigo-200',
    shortDesc: 'Protocolo de acción en los primeros minutos: apagado preventivo, bloqueo de tarjetas y formalización del reclamo.',
    keyRule: 'Actúa de inmediato: el bloqueo temprano delimita tu responsabilidad frente a compras o retiros no autorizados.',
    alertSignals: [
      'Notificación de consumo en moneda extranjera o compras en comercios que no has visitado.',
      'Retiros de efectivo en cajeros en horas de la madrugada mientras dormías.',
      'Mensaje de transferencia interbancaria exitosa que tú no ordenaste.',
      'Disminución del saldo disponible de tu cuenta sin explicación en tus movimientos.'
    ],
    stepByStep: [
      'Paso 1: Entra a tu app bancaria y activa la opción de "Apagado temporal de tarjeta" o bloqueo preventivo.',
      'Paso 2: Llama a la línea telefónica de emergencias y bloqueos de tu entidad financiera (disponible las 24 horas del día).',
      'Paso 3: Solicita el código de bloqueo y el nombre del asesor que te atendió; anótalos con fecha y hora exacta.',
      'Paso 4: Presenta formalmente el reclamo por "Operación no reconocida" a través del Libro de Reclamaciones y solicita tu número correlativo.'
    ],
    ejemploPeruano: {
      titulo: 'Consumo no reconocido en una plataforma digital extranjera',
      situacion: 'Carmen recibe una alerta a las 11 p.m. por un consumo de S/ 480 en un servicio de suscripciones web. Ella tiene su tarjeta de débito en su billetera.',
      desenlaceSeguro: 'Carmen ingresa a su app y apaga las compras por internet en su tarjeta. Llama a la banca telefónica, bloquea el plástico definitivamente y registra su reclamo formal. El banco le repone el importe tras la investigación.'
    },
    consejoAlDia: 'Configura en tu app bancaria los límites diarios máximos para compras por internet y transferencias. Si no vas a viajar ni comprar en línea, mantén apagadas esas funciones.',
    fuenteOficialUrl: 'https://www.gob.pe/institucion/indecopi/pages/532-presentar-reclamos-en-indecopi',
    fuenteOficialNombre: 'INDECOPI - Reclamos Financieros'
  },
  {
    id: 'celular-perdido-robado',
    title: 'Cómo proteger tu celular si lo pierdes o te lo roban',
    category: 'Seguridad en canales',
    icon: 'phone_locked',
    badge: 'Seguridad Móvil',
    badgeColor: 'bg-purple-50 text-purple-800 border-purple-200',
    shortDesc: 'Medidas urgentes para que los delincuentes no ingresen a tu billetera móvil (Yape, Plin) ni a tus cuentas bancarias.',
    keyRule: 'Bloquea primero tus entidades financieras y luego tu chip operador para evitar que reciban tus códigos de recuperación.',
    alertSignals: [
      'Robo o extravío de tu equipo móvil en la vía pública o transporte de pasajeros.',
      'Recepción de correos de inicio de sesión en dispositivos desconocidos.',
      'Intento de cambio de contraseña de tu correo electrónico personal o banca móvil.',
      'Desaparición súbita de señal en tu teléfono que podría indicar clonación de SIM (SIM swapping).'
    ],
    stepByStep: [
      '1. Bloqueo financiero prioritario: Comunícate con tus bancos o billeteras móviles para suspender de inmediato tus credenciales digitales.',
      '2. Bloqueo de línea y equipo: Llama a tu operador de telefonía (Claro, Movistar, Entel, Bitel) y solicita el bloqueo de la línea SIM y del IMEI del equipo.',
      '3. Cierre de sesiones remotas: Desde una computadora, ingresa a tu cuenta de Google o Apple y selecciona "Cerrar sesión en todos los dispositivos" y "Borrar datos del dispositivo".',
      '4. Medida preventiva permanente: Activa el código PIN de tu tarjeta SIM en los ajustes del celular para que el chip no funcione si lo insertan en otro equipo.'
    ],
    ejemploPeruano: {
      titulo: 'Sustracción del teléfono en el Metropolitano',
      situacion: 'A Roberto le hurtan el celular durante un viaje en hora punta. En el equipo tenía instaladas sus aplicaciones bancarias y su billetera digital.',
      desenlaceSeguro: 'Al llegar a su destino, Roberto pide prestado un teléfono y llama a la central de bloqueo de sus bancos antes de los 15 minutos. Gracias a que su chip tenía PIN configurado y sus cuentas fueron bloqueadas, los delincuentes no pudieron extraer ni un sol.'
    },
    consejoAlDia: 'Nunca anotes las claves de tus tarjetas en notas del celular ni en mensajes de WhatsApp guardados. Usa siempre autenticación en dos pasos en tu correo principal.',
    fuenteOficialUrl: 'https://www.sbs.gob.pe/usuarios/aprende-con-la-sbs/al-usar-aplicaciones-moviles',
    fuenteOficialNombre: 'SBS - Seguridad en Aplicaciones Móviles'
  },
  {
    id: 'fraudes-cajeros-automaticos',
    title: 'Cómo evitar fraudes en cajeros automáticos',
    category: 'Seguridad en canales',
    icon: 'atm',
    badge: 'Cajero Seguro',
    badgeColor: 'bg-cyan-50 text-cyan-800 border-cyan-200',
    shortDesc: 'Evita la clonación de bandas, dispositivos extraños (skimmers) y la conocida modalidad del «cambiaso».',
    keyRule: 'Cubre siempre el teclado al ingresar tu clave y jamás permitas que un tercero toque tu tarjeta física.',
    alertSignals: [
      'La ranura donde se inserta la tarjeta está suelta, tiene pegamento fresco o un borde sobresalido inusual.',
      'Una persona en la fila te distrae diciendo que "se te cayó dinero" mientras operas.',
      'Alguien se ofrece amablemente a "limpiar tu tarjeta" porque el cajero no la lee.',
      'El dispensador de billetes tiene una regleta metálica sobrepuesta que impide la salida del efectivo.'
    ],
    stepByStep: [
      'Inspecciona visualmente la ranura y el dispensador antes de introducir tu tarjeta.',
      'Tapa el teclado con tu otra mano o tu billetera mientras digitas tus 4 dígitos para bloquear microcámaras ocultas.',
      'Si el cajero retiene tu tarjeta, no te apartes del cajero; comunícate de inmediato con la central de emergencias del banco desde tu propio teléfono para anularla.',
      'Prefiere cajeros ubicados dentro de agencias bancarias iluminadas y con vigilancia, especialmente de noche.'
    ],
    ejemploPeruano: {
      titulo: 'El intento de "cambiaso" en un cajero de noche',
      situacion: 'Don Alberto intenta retirar efectivo de un cajero. Un joven detrás le dice: "Señor, ese teclado está fallando, páseme su plástico para pasarle una franela".',
      desenlaceSeguro: 'Don Alberto recuerda la regla de oro: nadie debe tocar su tarjeta. Cancela la operación en pantalla, guarda su plástico firmemente y se traslada a un cajero dentro de una agencia con vigilante.'
    },
    consejoAlDia: 'Firma el reverso de tu tarjeta o personalízala con un sticker distintivo; así notarás de inmediato si alguien intenta entregarte una tarjeta similar cambiada.',
    fuenteOficialUrl: 'https://www.sbs.gob.pe/usuarios/aprende-con-la-sbs/fraudes-digitales-y-telefonicos',
    fuenteOficialNombre: 'SBS - Fraudes y Cajeros Automáticos'
  },
  {
    id: 'inversiones-piramidales',
    title: 'Cómo reconocer falsas ofertas de inversión y esquemas piramidales',
    category: 'Estafas y fraudes',
    icon: 'trending_down',
    badge: 'Alerta Piramidal',
    badgeColor: 'bg-red-50 text-red-800 border-red-200',
    shortDesc: 'Identifica promesas de ganancias mágicas en criptomonedas, forex o membresías que exigen reclutar amigos.',
    keyRule: 'Si para ganar dinero necesitas principalmente reclutar o afiliar a otros, se trata de una pirámide ilegal.',
    alertSignals: [
      'Te garantizan rendimientos mensuales fijos irreales (ejemplo: duplicar tu dinero en 60 días sin riesgo).',
      'El foco principal de las charlas de inducción no es el producto, sino invitar a más personas para ganar bonos.',
      'Los organizadores se exhiben en eventos ostentosos con autos de lujo y discursos de "libertad financiera instantánea".',
      'La empresa figura en las advertencias periódicas de captación ilegal publicadas por la SBS.'
    ],
    stepByStep: [
      'Compara las tasas: en el mercado formal peruano regulado, las mejores tasas a plazo fijo oscilan entre 5% y 8% anual, no mensual.',
      'Revisa el listado de advertencias y esquemas de captación no autorizada de la SBS en su portal web.',
      'No invites a familiares ni amigos a plataformas de inversión no supervisadas: podrías perjudicarlos financieramente.',
      'Exige ver la autorización de la Superintendencia del Mercado de Valores (SMV) o de la SBS para gestionar fondos.'
    ],
    ejemploPeruano: {
      titulo: 'La "academia digital" de inversiones con membresía en dólares',
      situacion: 'A Luciana la invitan a una reunión en un hotel donde le aseguran que si aporta S/ 1,800 ganará S/ 600 mensuales en "trading algorítmico", siempre que afilie a tres personas de su círculo cercano.',
      desenlaceSeguro: 'Luciana busca el nombre de la academia en la web de la SBS y descubre una alerta oficial de advertencia al público por captación ilegal de fondos. Decide no ingresar ni exponer a sus conocidos.'
    },
    consejoAlDia: 'A mayor ganancia prometida, mayor es el riesgo o la probabilidad de estafa. Ningún negocio formal garantiza rentabilidades extraordinarias fijas.',
    fuenteOficialUrl: 'https://www.sbs.gob.pe/usuarios/aprende-con-la-sbs/modalidades-de-informalidad',
    fuenteOficialNombre: 'SBS - Advertencias de Informalidad'
  },
  {
    id: 'guardar-pruebas-estafa',
    title: 'Cómo guardar pruebas de una posible estafa',
    category: 'Canales y denuncias',
    icon: 'folder_zip',
    badge: 'Evidencia Legal',
    badgeColor: 'bg-slate-100 text-slate-800 border-slate-300',
    shortDesc: 'Cómo preservar capturas de pantalla, comprobantes bancarios, números y audios antes de que los delincuentes los borren.',
    keyRule: 'Guarda toda la información digital en su formato original antes de bloquear o denunciar al estafador.',
    alertSignals: [
      'El vendedor o prestamista empieza a borrar mensajes enviados en WhatsApp con la función "eliminar para todos".',
      'La página de Facebook o perfil de Instagram cambia de nombre o borra las publicaciones donde promocionaba la oferta.',
      'Se niegan a brindarte comprobante de pago con RUC o emiten recibos visiblemente adulterados.',
      'El número telefónico deja de responder repentinamente tras recibir la transferencia.'
    ],
    stepByStep: [
      'Captura de pantalla íntegra: Toma capturas donde se vea claramente el número de teléfono del contacto (no solo el nombre guardado), la fecha y la hora.',
      'Exporta el chat: En WhatsApp, usa la opción "Exportar chat sin archivos multimedia" y guárdala en tu correo electrónico.',
      'Descarga los vouchers: Descarga desde tu banca por internet el PDF oficial de la transferencia donde conste el Código de Operación Bancaria, cuenta destino y titular.',
      'No borres el historial: Mantén el registro de llamadas entrantes y salientes en tu celular como prueba complementaria.'
    ],
    ejemploPeruano: {
      titulo: 'Compra de mercadería textil en una página falsa de Gamarra',
      situacion: 'César compra un lote de polos por S/ 950 a través de una página que decía ser de Gamarra. Al transferir el adelanto, nota que el vendedor tarda en responder y borra mensajes.',
      desenlaceSeguro: 'César toma capturas de pantalla de cada conversación, descarga el comprobante bancario con el número de cuenta de ahorros del receptor y guarda el enlace exacto de la página. Con esa carpeta digital completa acude a formalizar su denuncia ante la PNP.'
    },
    consejoAlDia: 'Toda prueba digital (chats, vouchers, audios) debe entregarse a las autoridades sin editar ni recortar para que mantenga su valor probatorio.',
    fuenteOficialUrl: 'https://www.gob.pe/114031-delitos-informaticos',
    fuenteOficialNombre: 'Ministerio del Interior - Denuncia de Delitos Informáticos'
  },
  {
    id: 'canales-consultas-denuncias',
    title: 'Dónde presentar consultas, reclamos o denuncias en el Perú',
    category: 'Canales y denuncias',
    icon: 'balance',
    badge: 'Instituciones del Estado',
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    shortDesc: 'Diferencia claramente las funciones de la SBS, INDECOPI y la Policía Nacional para no perder tiempo en tu trámite.',
    keyRule: 'Los problemas de servicio bancario van primero a tu banco e Indecopi; los fraudes y extorsiones van a la Policía Nacional.',
    alertSignals: [
      'No saber a qué organismo recurrir tras haber sido víctima de un cargo no autorizado o un fraude.',
      'Confundir una mala atención comercial (Indecopi) con un delito penal informático consumado (PNP).',
      'Caer en ofertas de tramitadores que cobran por presentar reclamos gratuitos ante el Estado.',
      'Vencimiento de plazos por no registrar formalmente el reclamo con código correlativo.'
    ],
    stepByStep: [
      '1. Ante tu banco: Presenta tu reclamo en el Libro de Reclamaciones; la entidad tiene un plazo legal máximo para responderte formalmente.',
      '2. Ante INDECOPI: Si el banco no te responde o rechaza tu reclamo de forma injustificada, inicia un reclamo gratuito en "Reclama Virtual" de Indecopi.',
      '3. Ante la SBS: Acude a la SBS para consultar si una empresa está autorizada o denunciar informalidad financiera y captación no regulada.',
      '4. Ante la Policía Nacional (DIVINDAT): Si fuiste víctima de estafa, suplantación de identidad o extorsión, denuncia directamente en la División de Investigación de Delitos de Alta Tecnología o en la comisaría de tu distrito.'
    ],
    ejemploPeruano: {
      titulo: 'La ruta correcta ante dos problemas distintos',
      situacion: 'Mariela tuvo un cobro indebido de mantenimiento en su cuenta de ahorros que el banco no resolvió. Su vecino, en cambio, fue extorsionado por una app de préstamos que accedió a sus fotos.',
      desenlaceSeguro: 'Mariela acude a INDECOPI mediante su plataforma virtual para reclamar la devolución de la comisión. Su vecino acude de inmediato a la DIVINDAT de la Policía Nacional para formular su denuncia penal por extorsión digital.'
    },
    consejoAlDia: 'Todos los canales oficiales de orientación del Estado peruano (SBS e Indecopi) son 100% gratuitos y atienden a nivel nacional por teléfono y vía web.',
    fuenteOficialUrl: 'https://www.sbs.gob.pe/usuarios/nuestros-servicios/servicios-sbs/denuncias-y-reclamos',
    fuenteOficialNombre: 'SBS - Portal de Consultas, Denuncias y Reclamos'
  }
];

export const SECURITY_GAME_QUESTIONS: SecurityGameQuestion[] = [
  {
    id: 'caso-1-prestamo-adelanto',
    category: 'Préstamos fraudulentos',
    situation: 'Un anuncio en redes te promete S/ 10,000 al instante, pero te pide pagar antes una comisión',
    detail: 'Encuentras en Facebook un anuncio de "Préstamos al Instante Perú" que te ofrece S/ 10,000 sin aval y sin revisar Infocorp. Te contacta un supuesto asesor por WhatsApp y te dice: "Tu crédito está aprobado al 100%, solo debes transferir S/ 350 por gastos notariales y póliza para liberarte los S/ 10,000 en 10 minutos".',
    options: [
      {
        text: 'Transferir los S/ 350 porque es una cantidad pequeña comparada con los S/ 10,000 que vas a recibir.',
        isSafe: false,
        explanation: '¡Riesgo de estafa! Si transfieres el dinero, los falsos asesores te bloquearán o te pedirán más montos bajo otros conceptos inventados.'
      },
      {
        text: 'Pedir que te descuenten los S/ 350 del monto del préstamo cuando te lo depositen.',
        isSafe: false,
        explanation: 'Aunque suena lógico, los estafadores inventarán excusas legales para insistir en que el pago previo es obligatorio porque su objetivo real es solo quitarte los S/ 350.'
      },
      {
        text: 'Rechazar la oferta y no depositar nada: ninguna entidad supervisada por la SBS cobra dinero por adelantado para otorgar un crédito.',
        isSafe: true,
        explanation: '¡Decisión segura y correcta! En el sistema financiero formal peruano, las comisiones y gastos autorizados se descuentan del desembolso o se pagan en las cuotas; nunca te pedirán transferir dinero antes de recibir el préstamo.'
      }
    ],
    officialLearnUrl: 'https://www.sbs.gob.pe/usuarios/aprende-con-la-sbs/modalidades-de-informalidad',
    officialLearnName: 'SBS - Modalidades de Informalidad'
  },
  {
    id: 'caso-2-sms-bloqueo-cuenta',
    category: 'Mensajes falsos y enlaces sospechosos',
    situation: 'Un SMS alarmista te amenaza con bloquear tu cuenta bancaria si no entras a un enlace',
    detail: 'Recibes este mensaje de texto a tu celular: "BANCO ALERTA: Tu tarjeta de débito se bloqueará en 2 horas por motivos de seguridad. Evítalo ingresando inmediatamente a: https://banco-seguro-peru24.com/login".',
    options: [
      {
        text: 'Hacer clic de inmediato en el enlace para no quedarte sin dinero durante el fin de semana.',
        isSafe: false,
        explanation: '¡Peligro! Es un clásico ataque de smishing. La página es una copia idéntica que robará tu número de tarjeta y tu clave de internet apenas los escribas.'
      },
      {
        text: 'Ignorar y eliminar el mensaje. Si tienes dudas sobre tu tarjeta, abrir tu aplicación bancaria oficial o llamar al teléfono del reverso de tu tarjeta.',
        isSafe: true,
        explanation: '¡Excelente decisión! Los bancos formales en el Perú nunca envían enlaces web (links) en mensajes SMS para pedirte que ingreses contraseñas o reactives tarjetas.'
      },
      {
        text: 'Responder al SMS solicitando que te llamen para coordinar el desbloqueo.',
        isSafe: false,
        explanation: 'Responder a estos mensajes confirma a los delincuentes que tu número telefónico está activo y estás vulnerable, incrementando los intentos de estafa.'
      }
    ],
    officialLearnUrl: 'https://www.sbs.gob.pe/usuarios/aprende-con-la-sbs/al-utilizar-la-banca-por-internet',
    officialLearnName: 'SBS - Seguridad en Banca Digital'
  },
  {
    id: 'caso-3-llamada-codigo-verificacion',
    category: 'Llamadas fraudulentas y contraseñas',
    situation: 'Una llamada urgente de un supuesto analista del banco te solicita un código de verificación SMS',
    detail: 'Te llama una persona amable que dice ser analista del área de prevención de fraudes de tu banco. Te dice: "Señor(a), están intentando realizar una compra de S/ 1,800 con su tarjeta. Le acaba de llegar un código SMS de 6 dígitos; díctemelo de inmediato para anular la transacción".',
    options: [
      {
        text: 'Dictarle el código rápidamente porque te está ayudando a proteger tus ahorros.',
        isSafe: false,
        explanation: '¡Cuidado! El código de 6 dígitos que te llegó no es para anular, es la autorización final para que el delincuente concrete la compra o transferencia en ese preciso instante.'
      },
      {
        text: 'Colgar inmediatamente: ningún banco solicita claves secretas ni códigos de verificación por teléfono.',
        isSafe: true,
        explanation: '¡Respuesta impecable! Los códigos SMS, tokens y claves dinámicas son contraseñas secretas de uso exclusivo tuyo. Jamás debes dictárselos a nadie, ni siquiera si afirman ser del banco.'
      },
      {
        text: 'Pedirle su nombre completo y número de DNI para luego dictarle el código con más tranquilidad.',
        isSafe: false,
        explanation: 'Los delincuentes utilizan nombres falsos y datos ficticios con gran soltura. Ningún dato que te brinden justifica entregar tu código de confirmación.'
      }
    ],
    officialLearnUrl: 'https://www.sbs.gob.pe/usuarios/aprende-con-la-sbs/fraudes-digitales-y-telefonicos',
    officialLearnName: 'SBS - Fraudes Digitales y Telefónicos'
  },
  {
    id: 'caso-4-inversion-ganancias-piramidal',
    category: 'Esquemas piramidales',
    situation: 'Una oferta de inversión promete 40% mensual y te exige afiliar a tus conocidos',
    detail: 'Un amigo de tu barrio te invita a una "comunidad de emprendedores tecnológicos". Te asegura que si inviertes S/ 1,200 recibirás S/ 480 todos los meses garantizados sin riesgo, pero que para calificar al pago debes traer obligatoriamente a 2 socios nuevos que también inviertan.',
    options: [
      {
        text: 'Invertir de inmediato porque el retorno de 40% mensual te ayudará a pagar deudas rápidamente.',
        isSafe: false,
        explanation: '¡Grave riesgo! No existe ninguna inversión legal que garantice 40% mensual. Se trata de una estructura piramidal insostenible.'
      },
      {
        text: 'Rechazar la propuesta y no invitar a nadie: se trata de un esquema piramidal donde el dinero no se genera por inversión real, sino con el aporte de los nuevos reclutados.',
        isSafe: true,
        explanation: '¡Totalmente seguro! Los esquemas piramidales colapsan inevitablemente cuando dejan de ingresar nuevas personas, dejando a la inmensa mayoría de participantes sin sus ahorros.'
      },
      {
        text: 'Invertir solo los primeros meses para retirar tus S/ 1,200 y luego salirte antes de que termine.',
        isSafe: false,
        explanation: 'En las pirámides, las plataformas suelen bloquear los retiros o imponer trabas arbitrarias para que no puedas sacar tu dinero cuando lo desees.'
      }
    ],
    officialLearnUrl: 'https://www.sbs.gob.pe/usuarios/aprende-con-la-sbs/modalidades-de-informalidad',
    officialLearnName: 'SBS - Modalidades de Informalidad'
  },
  {
    id: 'caso-5-app-acceso-remoto',
    category: 'Aplicaciones móviles y acceso remoto',
    situation: 'Una persona te pide instalar una aplicación desconocida para "ayudarte con un trámite"',
    detail: 'Publicas en un grupo que tienes un problema para transferir dinero desde tu banca móvil. Una persona te escribe por privado diciendo ser de soporte técnico y te dice: "Descarga la app AnyDesk o QuickSupport desde la tienda para que yo pueda ver tu pantalla y resolver el error de tu app bancaria".',
    options: [
      {
        text: 'Instalar la aplicación para que el especialista solucione el problema técnico en segundos.',
        isSafe: false,
        explanation: '¡Alerta máxima! Al instalar esa aplicación, le das al atacante el control remoto total de tu celular: podrá ver lo que tecleas, leer tus códigos SMS y entrar a tus cuentas bancarias.'
      },
      {
        text: 'Instalar la app, pero tener la precaución de cerrar la sesión de tu banco antes de iniciarla.',
        isSafe: false,
        explanation: 'Incluso con la sesión cerrada, una app de control remoto permite al atacante abrir tus aplicaciones bancarias e iniciar sesiones aprovechando la pantalla compartida.'
      },
      {
        text: 'No instalar ninguna aplicación de control remoto y solicitar asistencia únicamente por los canales oficiales del banco.',
        isSafe: true,
        explanation: '¡Excelente decisión de seguridad! Las entidades financieras formales nunca solicitan a sus clientes instalar programas de acceso o control remoto en sus celulares personales.'
      }
    ],
    officialLearnUrl: 'https://www.sbs.gob.pe/usuarios/aprende-con-la-sbs/al-usar-aplicaciones-moviles',
    officialLearnName: 'SBS - Seguridad en Aplicaciones Móviles'
  }
];

export const OFFICIAL_HELP_CHANNELS: OfficialHelpChannel[] = [
  {
    id: 'sbs-ayuda',
    name: 'SBS',
    fullName: 'Superintendencia de Banca, Seguros y AFP',
    badge: 'Regulación Financiera',
    scope: 'Orientación financiera, verificación de entidades autorizadas y denuncias sobre informalidad o captación ilegal de dinero.',
    description: 'La SBS es el organismo constitucional autónomo que supervisa y regula a los bancos, cajas municipales, financieras, compañías de seguros y cooperativas en el Perú.',
    whenToContact: [
      'Quieres confirmar si una empresa o cooperativa está legalmente autorizada a captar dinero.',
      'Sospechas de un esquema piramidal o empresa informal de captación de ahorros.',
      'Necesitas orientación sobre el funcionamiento de productos bancarios y seguros.'
    ],
    evidenceToKeep: [
      'Nombres comerciales, razón social y número de RUC de la supuesta entidad.',
      'Enlaces web, capturas de páginas de redes sociales o folletos publicitarios.',
      'Cuentas bancarias a las que solicitaban realizar los depósitos.'
    ],
    channels: [
      { type: 'Teléfono Gratuito Nacional', value: '0-800-10840', note: 'Línea gratuita de atención al usuario' },
      { type: 'Portal de Denuncias', value: 'servicios.sbs.gob.pe/denuncias', note: 'Plataforma oficial digital' },
      { type: 'Mesa de Partes Virtual', value: 'sbs.gob.pe', note: 'Trámites oficiales en línea' }
    ],
    officialUrl: 'https://www.sbs.gob.pe/usuarios/nuestros-servicios/servicios-sbs/denuncias-y-reclamos',
    buttonText: 'Consultar en la SBS'
  },
  {
    id: 'indecopi-ayuda',
    name: 'INDECOPI',
    fullName: 'Instituto Nacional de Defensa de la Competencia y de la Protección de la Propiedad Intelectual',
    badge: 'Protección al Consumidor',
    scope: 'Reclamos de consumo y defensa de los derechos de los usuarios frente a entidades financieras y comerciales.',
    description: 'INDECOPI protege a los consumidores peruanos frente a cláusulas abusivas, comisiones no autorizadas y operaciones bancarias no reconocidas no atendidas.',
    whenToContact: [
      'Tu banco o caja no responde a tu reclamo en el plazo de ley o rechaza tu solicitud de forma injustificada.',
      'Te aplican comisiones, seguros o cobros que nunca contrataste.',
      'Eres víctima de métodos de cobranza abusivos, llamadas fuera de horario o amenazas.'
    ],
    evidenceToKeep: [
      'Hoja de reclamación o código correlativo de tu reclamo previo ante la entidad financiera.',
      'Estado de cuenta bancario con el cargo o débito cuestionado resaltado.',
      'Correos electrónicos, mensajes o cartas de respuesta emitidas por la entidad.'
    ],
    channels: [
      { type: 'Teléfono Lima', value: '(01) 224-7777', note: 'Atención a la ciudadanía en Lima' },
      { type: 'Línea Gratuita Regiones', value: '0-800-4-4040', note: 'Atención telefónica gratuita para todo el país' },
      { type: 'Reclama Virtual', value: 'enlinea.indecopi.gob.pe/reclamavirtual', note: 'Reclamos 100% digitales y gratuitos' }
    ],
    officialUrl: 'https://www.gob.pe/institucion/indecopi/pages/532-presentar-reclamos-en-indecopi',
    buttonText: 'Presentar reclamo en INDECOPI'
  },
  {
    id: 'pnp-divindat-ayuda',
    name: 'Policía Nacional del Perú',
    fullName: 'División de Investigación de Delitos de Alta Tecnología (DIVINDAT) - PNP / Mininter',
    badge: 'Denuncias Penales',
    scope: 'Investigación y persecución de delitos informáticos, fraudes cibernéticos, extorsión digital y suplantación de identidad.',
    description: 'La DIVINDAT es la unidad especializada de la Policía Nacional encargada de investigar estafas informáticas, clonación de tarjetas y extorsiones digitales.',
    whenToContact: [
      'Has sido víctima de fraude informático consumado (sustracción o transferencia no autorizada de tu dinero).',
      'Estás sufriendo extorsión o amenazas por parte de redes de préstamos ilegales tipo "gota a gota".',
      'Suplantaron tu identidad para tramitar créditos o comprar bienes a tu nombre.'
    ],
    evidenceToKeep: [
      'Capturas de pantalla completas con el número de teléfono, fecha y hora visible.',
      'Vouchers y constancias oficiales en PDF con el Código de Operación Bancaria.',
      'Audios, mensajes de texto y correos originales sin editar ni borrar.'
    ],
    channels: [
      { type: 'Central Única de Denuncias Mininter', value: 'Línea 1818', note: 'Atención gratuita y confidencial 24/7' },
      { type: 'DIVINDAT - Sede Central Lima', value: '(01) 431-8898', note: 'Av. España 323, Cercado de Lima' },
      { type: 'Comisarías PNP', value: 'En todo el territorio nacional', note: 'Recepción presencial obligatoria de denuncias' }
    ],
    officialUrl: 'https://www.gob.pe/114031-delitos-informaticos',
    buttonText: 'Información sobre denuncias PNP'
  }
];
