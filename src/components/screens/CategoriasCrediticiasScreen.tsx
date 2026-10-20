import React, { useState } from 'react';

type CreditType = 'consumo' | 'hipotecario';
type CategoryFilter = 'todas' | 'normal' | 'cpp' | 'deficiente' | 'dudoso' | 'perdida';

interface CategoryRowData {
  id: 'normal' | 'cpp' | 'deficiente' | 'dudoso' | 'perdida';
  name: string;
  code: string;
  badgeColor: string;
  dotColor: string;
  iconName: string;
  textColor: string;
  diasAtraso: {
    consumo: string;
    hipotecario: string;
  };
  queSignifica: string;
  comoActuar: string;
  details: {
    descripcion: string;
    ejemploCotidiano: string;
    consecuencias: string;
    quePuedoHacer: string[];
    consejoAlDia: string;
  };
}

const CATEGORIAS_SBS_DATA: CategoryRowData[] = [
  {
    id: 'normal',
    name: 'Normal',
    code: '0',
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-300',
    dotColor: 'bg-emerald-500',
    iconName: 'check_circle',
    textColor: 'text-emerald-700',
    diasAtraso: {
      consumo: 'Hasta 8 días calendario',
      hipotecario: 'Hasta 30 días calendario',
    },
    queSignifica: 'Cumple puntualmente con sus pagos o presenta atrasos mínimos dentro del margen de tolerancia.',
    comoActuar: 'Mantén la puntualidad en tus fechas de pago y programa recordatorios o débitos automáticos.',
    details: {
      descripcion:
        'Es la categoría de menor riesgo y la máxima calificación crediticia en el sistema financiero peruano. Refleja que el deudor cancela sus cuotas a tiempo o registra pequeños atrasos dentro del plazo de tolerancia regulado por la SBS.',
      ejemploCotidiano:
        'Mariana tiene una tarjeta y un crédito personal con vencimiento el día 20; cancela la cuota total puntual el día 20 o a más tardar el 22 tras cobrar su quincena.',
      consecuencias:
        'Historial 100% positivo en la Central de Riesgos SBS. Acceso preferencial a préstamos, aumentos de línea de crédito y las tasas de costo efectivo anual (TCEA) más bajas del mercado.',
      quePuedoHacer: [
        'Activa débitos automáticos en tu cuenta sueldo o de ahorros para no olvidar ninguna fecha.',
        'Sincroniza tus fechas de pago para que caigan 2 o 3 días después de tus fechas seguras de ingreso.',
        'Revisa mensualmente tu estado de cuenta para verificar que todas tus cuotas figuren al día.',
      ],
      consejoAlDia:
        'Mantener tu calificación en Normal te permite negociar mejores tasas y condiciones con cualquier banco o caja del Perú.',
    },
  },
  {
    id: 'cpp',
    name: 'Problemas Potenciales (CPP)',
    code: '1',
    badgeColor: 'bg-amber-50 text-amber-900 border-amber-300',
    dotColor: 'bg-amber-500',
    iconName: 'warning',
    textColor: 'text-amber-800',
    diasAtraso: {
      consumo: 'De 9 a 30 días calendario',
      hipotecario: 'De 31 a 60 días calendario',
    },
    queSignifica: 'Presenta retrasos iniciales reiterados que podrían dificultar pagos futuros si no se corrigen.',
    comoActuar: 'Revisa tu presupuesto de inmediato, recorta gastos no esenciales y regulariza la cuota pendiente.',
    details: {
      descripcion:
        'Con Problemas Potenciales (CPP) es una señal de advertencia temprana. La persona muestra dificultades leves para cumplir sus compromisos dentro de las fechas pactadas, aunque todavía cuenta con capacidad de recuperación.',
      ejemploCotidiano:
        'Carlos tuvo un gasto médico imprevisto y su cuota mensual de S/ 420 venció hace 16 días. Aún no la ha pagado, pero planea cancelarla con su gratificación o siguiente pago quincenal.',
      consecuencias:
        'Alerta preventiva en el sistema financiero. Las entidades pueden pausar incrementos automáticos de línea de crédito y revisar con mayor detalle nuevas solicitudes.',
      quePuedoHacer: [
        'Prioriza el pago de la cuota vencida antes de realizar cualquier compra prescindible del mes.',
        'Comunícate con tu entidad para verificar si puedes realizar un abono parcial que reduzca los intereses moratorios.',
        'Evita endeudarte con nuevos créditos o tarjetas para pagar la cuota atrasada.',
      ],
      consejoAlDia:
        'La categoría CPP se subsana con rapidez: al regularizar tus pagos atrasados y mantenerte al día, tu récord en la SBS volverá a reflejar calificación Normal.',
    },
  },
  {
    id: 'deficiente',
    name: 'Deficiente',
    code: '2',
    badgeColor: 'bg-orange-50 text-orange-900 border-orange-300',
    dotColor: 'bg-orange-500',
    iconName: 'priority_high',
    textColor: 'text-orange-800',
    diasAtraso: {
      consumo: 'De 31 a 60 días calendario',
      hipotecario: 'De 61 a 120 días calendario',
    },
    queSignifica: 'Atraso considerable; la capacidad de pago actual es insuficiente para cumplir el cronograma inicial.',
    comoActuar: 'Comunícate formalmente con la entidad para acordar una reprogramación de plazo antes de que pase a rangos críticos.',
    details: {
      descripcion:
        'Indica un incumplimiento notorio que supera el mes de atraso en créditos de consumo o dos meses en préstamos para vivienda. Las entidades financieras están obligadas por ley a constituir provisiones contables por mayor riesgo.',
      ejemploCotidiano:
        'Patricia tiene un negocio y sus ventas cayeron; adeuda dos cuotas continuas (48 días de retraso) de su crédito personal y recibe recordatorios continuos de cobranza.',
      consecuencias:
        'Afectación notoria en la Central de Riesgos SBS. Bloqueo preventivo de tarjetas de crédito y traspaso de la cuenta a gestión de cobranza prejudicial activa.',
      quePuedoHacer: [
        'Acércate a la agencia o comunícate con el área de soluciones de pago para solicitar una reprogramación.',
        'Pide una ampliación razonable del plazo del crédito para que la nueva cuota mensual sea menor y pagable.',
        'Exige la simulación formal del nuevo cronograma por escrito antes de firmar cualquier convenio.',
      ],
      consejoAlDia:
        'Mostrar iniciativa antes de los 60 días demuestra voluntad de pago y facilita acceder a reprogramaciones sin penalidades judiciales.',
    },
  },
  {
    id: 'dudoso',
    name: 'Dudoso',
    code: '3',
    badgeColor: 'bg-rose-50 text-rose-900 border-rose-300',
    dotColor: 'bg-rose-500',
    iconName: 'dangerous',
    textColor: 'text-rose-700',
    diasAtraso: {
      consumo: 'De 61 a 120 días calendario',
      hipotecario: 'De 121 a 365 días calendario',
    },
    queSignifica: 'Riesgo sumamente elevado; la recuperación de la deuda es altamente improbable bajo las condiciones actuales.',
    comoActuar: 'Asesórate sobre tus derechos frente a cobranzas y negocia un refinanciamiento integral o convenio viable.',
    details: {
      descripcion:
        'La entidad financiera considera improbable recuperar la totalidad del crédito bajo las condiciones contractuales pactadas. Los flujos de ingresos o garantías del titular no alcanzan para amortizar la deuda acumulada.',
      ejemploCotidiano:
        'Jorge lleva casi tres meses sin empleo y acumula 85 días de retraso en un préstamo de consumo de S/ 6,000; su caso ha sido transferido a un gestor externo de cobranza.',
      consecuencias:
        'Cierre de acceso al crédito formal en el sistema bancario. Preaviso de acciones legales y reporte con calificación crítica en todas las centrales de riesgo públicas y privadas.',
      quePuedoHacer: [
        'Conoce tus derechos: la ley prohíbe que las agencias de cobranza amenacen, llamen fuera de horario o contacten a terceros.',
        'Plantea un plan de refinanciamiento con cuotas escalonadas ajustadas a tus ingresos reales demostrables.',
        'Nunca aceptes préstamos informales tipo "gota a gota" para intentar cubrir una deuda bancaria.',
      ],
      consejoAlDia:
        'Incluso en categoría Dudoso, tienes derecho a ser tratado con respeto y dignidad. Todo acuerdo debe ser documentado formalmente.',
    },
  },
  {
    id: 'perdida',
    name: 'Pérdida',
    code: '4',
    badgeColor: 'bg-red-100/90 text-red-950 border-red-400',
    dotColor: 'bg-red-800',
    iconName: 'block',
    textColor: 'text-red-900',
    diasAtraso: {
      consumo: 'Más de 120 días calendario',
      hipotecario: 'Más de 365 días calendario',
    },
    queSignifica: 'Incumplimiento prolongado o deuda castigada; la entidad provisiona el 100% de la obligación.',
    comoActuar: 'Evalúa alternativas de cancelación total con condonación de intereses y exige tu Constancia de No Adeudo.',
    details: {
      descripcion:
        'Es la calificación más severa según la normativa de la SBS. Corresponde a deudas con atrasos superiores a 4 meses en consumo o más de 1 año en hipotecas. Contablemente se considera irrecuperable, aunque la obligación legal subsiste.',
      ejemploCotidiano:
        'Rosa mantiene una deuda con más de 150 días de retraso; el banco ha provisionado el 100% del saldo y gestiona la recuperación a través de cobranza legal.',
      consecuencias:
        'Inhabilitación en el sistema crediticio supervisado. Posible inicio de demandas judiciales de pago o medidas cautelares conforme al contrato suscrito.',
      quePuedoHacer: [
        'Solicita a la entidad financiera una campaña de amortización con condonación de intereses moratorios y gastos de cobranza.',
        'Al cancelar la totalidad acordada, exige de forma obligatoria y gratuita tu Constancia de No Adeudo oficial.',
        'Verifica que transcurridos los plazos de ley, la entidad reporte la deuda como cancelada ante la SBS.',
      ],
      consejoAlDia:
        'Una deuda en categoría Pérdida no se borra automáticamente con tramitadores. La única vía legal y efectiva es negociar una salida factible y conservar tu constancia de pago.',
    },
  },
];

export const CategoriasCrediticiasScreen: React.FC = () => {
  const [selectedCreditType, setSelectedCreditType] = useState<CreditType>('consumo');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('todas');
  const [expandedRowId, setExpandedRowId] = useState<string | null>('normal');

  const toggleRow = (id: string) => {
    setExpandedRowId((prev) => (prev === id ? null : id));
  };

  const filteredCategories = CATEGORIAS_SBS_DATA.filter((cat) => {
    if (categoryFilter === 'todas') return true;
    return cat.id === categoryFilter;
  });

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto pb-14 fade-in">
      {/* ============================================================== */}
      {/* 1. ENCABEZADO PRINCIPAL DE LA SECCIÓN                          */}
      {/* ============================================================== */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col gap-3 text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-[#0B3B60] text-[12px] font-bold border border-sky-200 w-fit">
          <span className="material-symbols-outlined text-[16px] text-[#00A3E0]">account_balance</span>
          <span>Central de Riesgos SBS · Escala Oficial de Clasificación</span>
        </div>

        <h1 className="text-[26px] sm:text-[32px] font-extrabold text-[#0B3B60] tracking-tight leading-snug font-heading">
          Categorías de riesgo crediticio según la SBS
        </h1>

        <p className="text-[14px] sm:text-[15.5px] text-slate-600 max-w-3xl leading-relaxed font-sans">
          Conoce qué significa cada categoría, cuántos días de atraso contempla y qué puedes hacer para cuidar tu historial crediticio.
        </p>
      </div>

      {/* ============================================================== */}
      {/* 2. SELECTORES Y FILTROS INTERACTIVOS                           */}
      {/* ============================================================== */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs flex flex-col gap-5 text-left">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          {/* Selector de Tipo de Crédito */}
          <div className="flex flex-col gap-2">
            <span className="text-[11.5px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#00A3E0]">tune</span>
              <span>1. Selecciona el tipo de crédito:</span>
            </span>

            <div className="inline-flex items-center p-1.5 rounded-2xl bg-slate-100/80 border border-slate-200/90 w-fit">
              <button
                type="button"
                onClick={() => setSelectedCreditType('consumo')}
                className={`px-4 py-2.5 rounded-xl text-[13px] font-heading font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  selectedCreditType === 'consumo'
                    ? 'bg-[#0B3B60] text-white shadow-xs'
                    : 'text-slate-600 hover:text-[#0B3B60] hover:bg-white/60'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {selectedCreditType === 'consumo' ? 'check_circle' : 'credit_card'}
                </span>
                <span>Crédito de consumo</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedCreditType('hipotecario')}
                className={`px-4 py-2.5 rounded-xl text-[13px] font-heading font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  selectedCreditType === 'hipotecario'
                    ? 'bg-[#0B3B60] text-white shadow-xs'
                    : 'text-slate-600 hover:text-[#0B3B60] hover:bg-white/60'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {selectedCreditType === 'hipotecario' ? 'check_circle' : 'real_estate_agent'}
                </span>
                <span>Crédito hipotecario para vivienda</span>
              </button>
            </div>
          </div>

          {/* Indicador de regla SBS activa */}
          <div className="p-3 rounded-2xl bg-sky-50 border border-sky-100 text-[12px] text-[#0B3B60] flex items-center gap-2.5 max-w-md">
            <span className="material-symbols-outlined text-[20px] text-[#00A3E0] shrink-0">
              info
            </span>
            <span className="leading-snug">
              Mostrando rangos oficiales para <strong>{selectedCreditType === 'consumo' ? 'Créditos de Consumo' : 'Créditos Hipotecarios para Vivienda'}</strong> según la Resolución SBS N° 11356-2008.
            </span>
          </div>
        </div>

        {/* Filtro: Mostrar categoría */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-slate-400">filter_list</span>
            <span className="text-[12.5px] font-bold text-slate-700">Mostrar categoría:</span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {(
              [
                { id: 'todas', label: 'Todas' },
                { id: 'normal', label: 'Normal' },
                { id: 'cpp', label: 'CPP' },
                { id: 'deficiente', label: 'Deficiente' },
                { id: 'dudoso', label: 'Dudoso' },
                { id: 'perdida', label: 'Pérdida' },
              ] as const
            ).map((filterOption) => (
              <button
                key={filterOption.id}
                onClick={() => setCategoryFilter(filterOption.id)}
                className={`px-3 py-1.5 rounded-xl text-[12px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                  categoryFilter === filterOption.id
                    ? 'bg-[#0B3B60] text-white shadow-xs'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                {filterOption.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 3. CUADRO COMPARATIVO INTERACTIVO DE 6 COLUMNAS                */}
      {/* ============================================================== */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden text-left">
        {/* Aviso de deslizamiento para móviles */}
        <div className="sm:hidden px-4 py-2 bg-sky-50/70 border-b border-sky-100 flex items-center justify-between text-[11px] text-[#007EAF] font-bold">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">swipe</span>
            <span>Desplaza horizontalmente para ver todas las columnas</span>
          </span>
          <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[760px]">
            {/* Encabezado azul institucional con texto blanco */}
            <thead>
              <tr className="bg-[#0B3B60] text-white text-[12.5px] font-heading font-extrabold uppercase tracking-wider">
                <th className="py-4 px-5 w-48">Categoría SBS</th>
                <th className="py-4 px-4 text-center w-20">Código</th>
                <th className="py-4 px-5 w-44">Días de atraso</th>
                <th className="py-4 px-5">¿Qué significa?</th>
                <th className="py-4 px-5">¿Cómo actuar?</th>
                <th className="py-4 px-4 text-center w-28">Detalles</th>
              </tr>
            </thead>

            {/* Filas alternadas en blanco y azul muy claro */}
            <tbody className="divide-y divide-slate-100 text-[13px] font-sans">
              {filteredCategories.map((cat, index) => {
                const isExpanded = expandedRowId === cat.id;
                const isEven = index % 2 === 1;

                return (
                  <React.Fragment key={cat.id}>
                    {/* Fila Principal */}
                    <tr
                      onClick={() => toggleRow(cat.id)}
                      className={`transition-all duration-150 cursor-pointer group ${
                        isExpanded
                          ? 'bg-sky-50/90 border-l-4 border-l-[#00A3E0]'
                          : isEven
                          ? 'bg-[#F6F9FD] hover:bg-sky-50/50'
                          : 'bg-white hover:bg-sky-50/50'
                      }`}
                    >
                      {/* 1. Categoría SBS con icono y color distintivo */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`material-symbols-outlined text-[20px] shrink-0 ${cat.textColor}`}
                          >
                            {cat.iconName}
                          </span>
                          <div>
                            <span className="font-heading font-bold text-[14px] text-[#0B3B60] block leading-tight">
                              {cat.name}
                            </span>
                            <span
                              className={`inline-block mt-0.5 px-2 py-0.2 rounded-full text-[10px] font-extrabold border ${cat.badgeColor}`}
                            >
                              Nivel {cat.id.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* 2. Código */}
                      <td className="py-4 px-4 text-center">
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-100 text-[#0B3B60] font-black text-[13px] border border-slate-200">
                          {cat.code}
                        </span>
                      </td>

                      {/* 3. Días de atraso (actualizado dinámicamente) */}
                      <td className="py-4 px-5 font-bold text-[#0B3B60]">
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[16px] text-[#00A3E0]">
                            schedule
                          </span>
                          <span>
                            {selectedCreditType === 'consumo'
                              ? cat.diasAtraso.consumo
                              : cat.diasAtraso.hipotecario}
                          </span>
                        </div>
                      </td>

                      {/* 4. ¿Qué significa? (máximo dos líneas) */}
                      <td className="py-4 px-5 text-slate-700 leading-snug line-clamp-2 max-w-xs">
                        {cat.queSignifica}
                      </td>

                      {/* 5. ¿Cómo actuar? */}
                      <td className="py-4 px-5 text-slate-700 leading-snug max-w-xs">
                        <div className="flex items-start gap-1.5">
                          <span className="material-symbols-outlined text-[16px] text-emerald-600 shrink-0 mt-0.5">
                            check
                          </span>
                          <span className="text-[12.5px]">{cat.comoActuar}</span>
                        </div>
                      </td>

                      {/* 6. Detalles: Botón funcional Ver más / Ver menos */}
                      <td className="py-4 px-4 text-center">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleRow(cat.id);
                          }}
                          className={`px-3 py-1.5 rounded-xl text-[12px] font-heading font-bold border transition-all inline-flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap ${
                            isExpanded
                              ? 'bg-[#0B3B60] text-white border-[#0B3B60] shadow-xs'
                              : 'bg-white hover:bg-slate-100 text-[#0B3B60] border-slate-200'
                          }`}
                        >
                          <span>{isExpanded ? 'Ver menos' : 'Ver más'}</span>
                          <span
                            className={`material-symbols-outlined text-[16px] transition-transform duration-200 ${
                              isExpanded ? 'rotate-180 text-[#00A3E0]' : 'text-slate-400'
                            }`}
                          >
                            expand_more
                          </span>
                        </button>
                      </td>
                    </tr>

                    {/* Panel Desplegable debajo de la misma fila */}
                    {isExpanded && (
                      <tr className="bg-sky-50/60 border-b border-slate-200/90 fade-in">
                        <td colSpan={6} className="p-4 sm:p-6">
                          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-sky-200 shadow-sm flex flex-col gap-5 text-left">
                            {/* Cabecera del panel expandido */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                              <div className="flex items-center gap-2.5">
                                <span className={`material-symbols-outlined text-[24px] ${cat.textColor}`}>
                                  {cat.iconName}
                                </span>
                                <div>
                                  <h3 className="text-[16px] font-extrabold text-[#0B3B60] font-heading">
                                    Detalle Completo: Categoría {cat.name} (Código {cat.code})
                                  </h3>
                                  <span className="text-[11.5px] text-slate-500 font-sans">
                                    Evaluación oficial según la Superintendencia de Banca, Seguros y AFP (SBS)
                                  </span>
                                </div>
                              </div>

                              <span
                                className={`px-3 py-1 rounded-full text-[11px] font-extrabold border self-start sm:self-auto ${cat.badgeColor}`}
                              >
                                {selectedCreditType === 'consumo' ? 'Crédito de Consumo: ' : 'Crédito Hipotecario: '}
                                {selectedCreditType === 'consumo'
                                  ? cat.diasAtraso.consumo
                                  : cat.diasAtraso.hipotecario}
                              </span>
                            </div>

                            {/* 1. Descripción & 2. Ejemplo Cotidiano */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[13px]">
                              {/* Descripción */}
                              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col gap-1.5">
                                <span className="text-[11px] font-bold uppercase tracking-wider text-[#007EAF] flex items-center gap-1">
                                  <span className="material-symbols-outlined text-[15px]">description</span>
                                  <span>Descripción de la categoría</span>
                                </span>
                                <p className="text-slate-700 leading-relaxed font-sans">
                                  {cat.details.descripcion}
                                </p>
                              </div>

                              {/* Ejemplo Cotidiano Peruano */}
                              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 flex flex-col gap-1.5">
                                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1">
                                  <span className="material-symbols-outlined text-[15px] text-amber-600">person_pin_circle</span>
                                  <span>Ejemplo cotidiano en el Perú</span>
                                </span>
                                <p className="text-amber-950/90 leading-relaxed font-sans">
                                  {cat.details.ejemploCotidiano}
                                </p>
                              </div>
                            </div>

                            {/* 3. Consecuencias y 4. ¿Qué puedo hacer? */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[13px]">
                              {/* ¿Qué consecuencias puede tener? */}
                              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col gap-2">
                                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1">
                                  <span className="material-symbols-outlined text-[15px] text-[#00A3E0]">history_edu</span>
                                  <span>¿Qué consecuencias puede tener?</span>
                                </span>
                                <p className="text-slate-700 leading-relaxed font-sans">
                                  {cat.details.consecuencias}
                                </p>
                              </div>

                              {/* ¿Qué puedo hacer? (3 recomendaciones) */}
                              <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 flex flex-col gap-2">
                                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1">
                                  <span className="material-symbols-outlined text-[15px] text-emerald-600">checklist</span>
                                  <span>¿Qué puedo hacer? (3 pasos prácticos)</span>
                                </span>
                                <div className="flex flex-col gap-1.5">
                                  {cat.details.quePuedoHacer.map((paso, idx) => (
                                    <div key={idx} className="flex items-start gap-2 text-[12.5px] text-emerald-950">
                                      <span className="w-4 h-4 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                                        {idx + 1}
                                      </span>
                                      <span className="leading-snug">{paso}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* 5. Consejo AL DÍA */}
                            <div className="p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-sky-50 via-blue-50 to-sky-50 border border-sky-200 text-[#0B3B60] flex items-start gap-3">
                              <span className="material-symbols-outlined text-[22px] text-[#00A3E0] shrink-0 mt-0.5">
                                lightbulb
                              </span>
                              <div className="text-[13px] leading-relaxed font-sans">
                                <strong className="font-heading font-bold text-[#0B3B60] mr-1">
                                  Consejo AL DÍA:
                                </strong>
                                {cat.details.consejoAlDia}
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 4. FRANJA VISUAL: CONSEJOS PARA CUIDAR TU HISTORIAL            */}
      {/* ============================================================== */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col gap-6 text-left">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11.5px] font-bold border border-emerald-200 mb-1.5">
            <span className="material-symbols-outlined text-[15px] text-emerald-600">verified_user</span>
            <span>Prevención y Hábitos Financieros</span>
          </div>
          <h2 className="text-[20px] sm:text-[24px] font-extrabold text-[#0B3B60] tracking-tight font-heading">
            Consejos para cuidar tu historial crediticio
          </h2>
          <p className="text-[13.5px] text-slate-500 font-sans mt-0.5">
            Tres acciones cotidianas y fundamentales para proteger tu calificación en la Central de Riesgos de la SBS
          </p>
        </div>

        {/* 3 Consejos Breves */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Consejo 1 */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#0B3B60] text-white flex items-center justify-center font-bold text-[15px] font-heading shadow-xs">
              1
            </div>
            <h3 className="text-[15px] font-bold text-[#0B3B60] font-heading leading-snug">
              Organiza las fechas de vencimiento de tus cuotas
            </h3>
            <p className="text-[12.5px] text-slate-600 font-sans leading-relaxed">
              Solicita a tu entidad sincronizar tu fecha de corte para que venza dos o tres días después de recibir tus ingresos seguros.
            </p>
          </div>

          {/* Consejo 2 */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#0B3B60] text-white flex items-center justify-center font-bold text-[15px] font-heading shadow-xs">
              2
            </div>
            <h3 className="text-[15px] font-bold text-[#0B3B60] font-heading leading-snug">
              Si tienes dificultades para pagar, contacta a tu entidad financiera
            </h3>
            <p className="text-[12.5px] text-slate-600 font-sans leading-relaxed">
              No esperes a cumplir 30 días de atraso. Acercarte proactivamente te abre opciones formales de reprogramación o traslado de cuota.
            </p>
          </div>

          {/* Consejo 3 */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#0B3B60] text-white flex items-center justify-center font-bold text-[15px] font-heading shadow-xs">
              3
            </div>
            <h3 className="text-[15px] font-bold text-[#0B3B60] font-heading leading-snug">
              Revisa periódicamente tu reporte de deudas
            </h3>
            <p className="text-[12.5px] text-slate-600 font-sans leading-relaxed">
              Verifica cada 3 o 6 meses que tus pagos figuren correctamente registrados y que no existan créditos no autorizados a tu nombre.
            </p>
          </div>
        </div>

        {/* Botón azul oficial hacia la SBS */}
        <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-slate-100">
          <div className="text-[12.5px] text-slate-600 leading-snug">
            Puedes consultar tu historial oficial gratis en línea ingresando con tu DNI al portal institucional de la SBS.
          </div>

          <a
            href="https://www.sbs.gob.pe/usuarios/nuestros-servicios/reporte-de-deudas"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-xl bg-[#0B3B60] hover:bg-[#082E4D] active:scale-95 text-white font-heading font-bold text-[13.5px] transition-all flex items-center gap-2 shadow-xs shrink-0 cursor-pointer"
          >
            <span>Consultar reporte de deudas SBS</span>
            <span className="material-symbols-outlined text-[17px] text-[#00A3E0]">open_in_new</span>
          </a>
        </div>

        {/* Nota aclaratoria legal SBS */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-[11.5px] text-slate-600 leading-relaxed flex items-start gap-2.5">
          <span className="material-symbols-outlined text-[18px] text-slate-400 shrink-0 mt-0.5">
            info
          </span>
          <p>
            <strong className="text-[#0B3B60]">Aclaración importante:</strong> Los días de atraso señalados en este cuadro son una referencia informativa según el Reglamento para la Evaluación y Clasificación del Deudor (Resolución SBS N° 11356-2008 y modificatorias). La clasificación oficial de cada cliente depende de las reglas aplicables al tipo de crédito contratado, su comportamiento crediticio consolidado en todo el sistema financiero y los demás criterios objetivos y subjetivos establecidos por la SBS.
          </p>
        </div>
      </section>
    </div>
  );
};
