import React, { useState } from 'react';

interface CreditCategory {
  id: string;
  name: string;
  riskLevel: 'Bajo' | 'Potencial' | 'Considerable' | 'Alto' | 'Muy alto';
  shortDesc: string;
  colorScheme: {
    bgLight: string;
    border: string;
    badgeBg: string;
    badgeText: string;
    accent: string;
    barColor: string;
  };
  details: {
    diasAtrasoComercial: string;
    diasAtrasoConsumo: string;
    impactoHistorial: string;
    recomendacion: string;
  };
}

const CREDIT_CATEGORIES: CreditCategory[] = [
  {
    id: 'normal',
    name: 'NORMAL',
    riskLevel: 'Bajo',
    shortDesc: 'Cumple normalmente con sus obligaciones de pago.',
    colorScheme: {
      bgLight: 'bg-emerald-50/70',
      border: 'border-emerald-200',
      badgeBg: 'bg-emerald-100',
      badgeText: 'text-emerald-800',
      accent: 'text-emerald-700',
      barColor: 'bg-emerald-500',
    },
    details: {
      diasAtrasoComercial: 'Al día o hasta 8 días de retraso.',
      diasAtrasoConsumo: 'Al día o pagos puntuales según cronograma pactado.',
      impactoHistorial: 'Excelente récord crediticio. Acceso preferencial a tasas competitivas y financiamiento bancario.',
      recomendacion: 'Mantén la puntualidad en tus fechas de pago para conservar tu historial 100% normal en la SBS.',
    },
  },
  {
    id: 'cpp',
    name: 'CPP',
    riskLevel: 'Potencial',
    shortDesc: 'Presenta señales iniciales de posibles dificultades de pago.',
    colorScheme: {
      bgLight: 'bg-amber-50/70',
      border: 'border-amber-200',
      badgeBg: 'bg-amber-100',
      badgeText: 'text-amber-800',
      accent: 'text-amber-700',
      barColor: 'bg-amber-500',
    },
    details: {
      diasAtrasoComercial: 'Atrasos de 9 a 30 días en el sistema financiero.',
      diasAtrasoConsumo: 'Atrasos leves entre 9 y 30 días calendario.',
      impactoHistorial: 'Alerta temprana para entidades financieras. Podrían restringirse líneas de crédito adicionales o aumentos de línea.',
      recomendacion: 'Revisa tu presupuesto de inmediato y prioriza regularizar la cuota pendiente antes de cumplir 30 días.',
    },
  },
  {
    id: 'deficiente',
    name: 'DEFICIENTE',
    riskLevel: 'Considerable',
    shortDesc: 'Evidencia dificultades importantes para cumplir sus obligaciones.',
    colorScheme: {
      bgLight: 'bg-orange-50/70',
      border: 'border-orange-200',
      badgeBg: 'bg-orange-100',
      badgeText: 'text-orange-800',
      accent: 'text-orange-700',
      barColor: 'bg-orange-500',
    },
    details: {
      diasAtrasoComercial: 'Atrasos de 31 a 60 días calendario.',
      diasAtrasoConsumo: 'Atrasos importantes entre 31 y 60 días.',
      impactoHistorial: 'Afectación notoria en centrales de riesgo. Inicio de gestiones de cobranza extrajudicial más insistentes.',
      recomendacion: 'Comunícate con la entidad para evaluar reprogramaciones o consolidaciones antes de que la deuda pase a instancias mayores.',
    },
  },
  {
    id: 'dudoso',
    name: 'DUDOSO',
    riskLevel: 'Alto',
    shortDesc: 'Presenta un riesgo elevado de incumplimiento.',
    colorScheme: {
      bgLight: 'bg-rose-50/70',
      border: 'border-rose-200',
      badgeBg: 'bg-rose-100',
      badgeText: 'text-rose-800',
      accent: 'text-rose-700',
      barColor: 'bg-rose-500',
    },
    details: {
      diasAtrasoComercial: 'Atrasos de 61 a 120 días calendario.',
      diasAtrasoConsumo: 'Atrasos graves entre 61 y 120 días.',
      impactoHistorial: 'Pérdida casi total de acceso a nuevos créditos en el sistema financiero formal. Cobranzas pre-judiciales activas.',
      recomendacion: 'Conoce tus derechos como usuario financiero frente a cobros indebidos y solicita formalmente una propuesta de refinanciamiento sostenible.',
    },
  },
  {
    id: 'perdida',
    name: 'PÉRDIDA',
    riskLevel: 'Muy alto',
    shortDesc: 'Corresponde a una situación de incumplimiento prolongado.',
    colorScheme: {
      bgLight: 'bg-red-950/10',
      border: 'border-red-300',
      badgeBg: 'bg-red-900/15',
      badgeText: 'text-red-900',
      accent: 'text-red-800',
      barColor: 'bg-red-700',
    },
    details: {
      diasAtrasoComercial: 'Atrasos mayores a 120 días calendario.',
      diasAtrasoConsumo: 'Atrasos que superan los 120 días o deuda castigada.',
      impactoHistorial: 'Calificación máxima negativa. La deuda puede ser transferida a agencias de cobranza o iniciar procesos de cobranza judicial.',
      recomendacion: 'No caigas en pánico ni aceptes intimidaciones. Infórmate sobre acuerdos de pago con descuento y tus derechos constitucionales de protección.',
    },
  },
];

export const CategoriasCrediticiasScreen: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleRow = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto pb-12 animate-in fade-in duration-300">
      {/* 1. Encabezado principal */}
      <div className="flex flex-col gap-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[12px] font-bold border border-emerald-200 w-fit">
          <span className="material-symbols-outlined text-[16px] text-emerald-600">verified</span>
          <span>Normativa SBS · Clasificación de Deudores</span>
        </div>

        <h1 className="text-[26px] sm:text-[34px] font-black text-[#0F172A] tracking-tight leading-tight">
          Conoce las categorías de riesgo crediticio
        </h1>

        <p className="text-[14.5px] sm:text-[16px] text-slate-600 max-w-3xl leading-relaxed">
          Aprende qué significan las categorías utilizadas para clasificar el riesgo crediticio en el sistema financiero peruano.
        </p>
      </div>

      {/* 2. Barra Visual de Progresión de las 5 Categorías */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-[12.5px] font-extrabold uppercase tracking-wider text-slate-400">
            Escala Progresiva de Riesgo SBS
          </span>
          <span className="text-[11.5px] font-bold text-slate-500">
            De Menor a Mayor Riesgo
          </span>
        </div>

        {/* Barra con gradiente por tramos */}
        <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
          {CREDIT_CATEGORIES.map((cat, index) => {
            const isSelected = expandedId === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => toggleRow(cat.id)}
                className={`flex flex-col items-center gap-1.5 p-2 sm:p-2.5 rounded-2xl transition-all cursor-pointer text-center group ${
                  isSelected
                    ? `${cat.colorScheme.bgLight} ${cat.colorScheme.border} border-2 shadow-xs scale-[1.02]`
                    : 'bg-slate-50 hover:bg-slate-100/80 border border-slate-200/60'
                }`}
                title={`Haz clic para ver detalles de ${cat.name}`}
              >
                {/* Indicador de barra */}
                <div
                  className={`w-full h-2.5 sm:h-3 rounded-full ${cat.colorScheme.barColor} transition-transform group-hover:scale-y-110`}
                />
                <span className="text-[11px] sm:text-[13px] font-black text-slate-800 tracking-tight block">
                  {cat.name}
                </span>
                <span
                  className={`text-[9.5px] sm:text-[11px] font-bold px-1.5 py-0.2 rounded-md ${cat.colorScheme.badgeBg} ${cat.colorScheme.badgeText}`}
                >
                  {cat.riskLevel}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Cuadro Comparativo Interactivo */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden">
        {/* Tabla para pantallas medianas y grandes */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/90 border-b border-slate-200 text-[12px] font-black uppercase tracking-wider text-slate-500">
                <th className="py-4 px-6 w-36">Categoría</th>
                <th className="py-4 px-6 w-40">Nivel de riesgo</th>
                <th className="py-4 px-6">Descripción</th>
                <th className="py-4 px-6 text-right w-36">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[13.5px]">
              {CREDIT_CATEGORIES.map((category) => {
                const isExpanded = expandedId === category.id;
                return (
                  <React.Fragment key={category.id}>
                    <tr
                      onClick={() => toggleRow(category.id)}
                      className={`transition-colors cursor-pointer group ${
                        isExpanded
                          ? `${category.colorScheme.bgLight}`
                          : 'hover:bg-slate-50/80'
                      }`}
                    >
                      {/* Categoría */}
                      <td className="py-4 px-6 font-black text-slate-900 tracking-tight">
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`w-3 h-3 rounded-full ${category.colorScheme.barColor}`}
                          />
                          <span className="text-[14.5px]">{category.name}</span>
                        </div>
                      </td>

                      {/* Nivel de riesgo con color progresivo */}
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11.5px] font-black border ${category.colorScheme.badgeBg} ${category.colorScheme.badgeText} ${category.colorScheme.border}`}
                        >
                          <span>{category.riskLevel}</span>
                        </span>
                      </td>

                      {/* Descripción */}
                      <td className="py-4 px-6 text-slate-600 font-medium leading-snug">
                        {category.shortDesc}
                      </td>

                      {/* Botón Ver Detalle */}
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleRow(category.id);
                          }}
                          className={`px-3.5 py-1.5 rounded-xl text-[12px] font-bold border transition-all inline-flex items-center gap-1 cursor-pointer ${
                            isExpanded
                              ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                              : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                          }`}
                        >
                          <span>{isExpanded ? 'Ocultar' : 'Ver detalle'}</span>
                          <span
                            className={`material-symbols-outlined text-[16px] transition-transform ${
                              isExpanded ? 'rotate-180' : ''
                            }`}
                          >
                            expand_more
                          </span>
                        </button>
                      </td>
                    </tr>

                    {/* Fila desplegable con información complementaria */}
                    {isExpanded && (
                      <tr className={`${category.colorScheme.bgLight} border-b border-slate-200/60`}>
                        <td colSpan={4} className="p-6">
                          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
                            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                              <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-[20px] text-[#0F3B82]">
                                  info
                                </span>
                                <h3 className="text-[15px] font-black text-slate-900">
                                  Detalle y criterios de clasificación: {category.name}
                                </h3>
                              </div>
                              <span
                                className={`text-[11px] font-black px-2.5 py-0.5 rounded-full ${category.colorScheme.badgeBg} ${category.colorScheme.badgeText}`}
                              >
                                Riesgo {category.riskLevel}
                              </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[12.5px]">
                              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
                                <span className="text-[10.5px] uppercase font-bold text-slate-400 block mb-1">
                                  Tiempo de atraso referencial (SBS)
                                </span>
                                <p className="font-semibold text-slate-800 leading-snug">
                                  {category.details.diasAtrasoComercial}
                                </p>
                              </div>

                              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
                                <span className="text-[10.5px] uppercase font-bold text-slate-400 block mb-1">
                                  Impacto en el sistema financiero
                                </span>
                                <p className="font-semibold text-slate-800 leading-snug">
                                  {category.details.impactoHistorial}
                                </p>
                              </div>
                            </div>

                            <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-200/70 text-[12.5px] text-blue-950 flex items-start gap-2.5">
                              <span className="material-symbols-outlined text-[18px] text-[#0F3B82] shrink-0 mt-0.5">
                                lightbulb
                              </span>
                              <div>
                                <span className="font-bold block text-[#0F3B82]">
                                  Orientación AlDía:
                                </span>
                                <p className="text-slate-700 mt-0.5 leading-snug font-medium">
                                  {category.details.recomendacion}
                                </p>
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

        {/* Vista tipo tarjetas para móviles */}
        <div className="sm:hidden flex flex-col divide-y divide-slate-100">
          {CREDIT_CATEGORIES.map((category) => {
            const isExpanded = expandedId === category.id;
            return (
              <div
                key={category.id}
                className={`p-4 transition-colors ${
                  isExpanded ? category.colorScheme.bgLight : 'bg-white'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-3 h-3 rounded-full ${category.colorScheme.barColor}`}
                    />
                    <h3 className="text-[16px] font-black text-slate-900 tracking-tight">
                      {category.name}
                    </h3>
                  </div>
                  <span
                    className={`inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-black border ${category.colorScheme.badgeBg} ${category.colorScheme.badgeText} ${category.colorScheme.border}`}
                  >
                    {category.riskLevel}
                  </span>
                </div>

                <p className="text-[13px] text-slate-600 font-medium mb-3 leading-snug">
                  {category.shortDesc}
                </p>

                <button
                  onClick={() => toggleRow(category.id)}
                  className={`w-full py-2 rounded-xl text-[12px] font-bold border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    isExpanded
                      ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  <span>{isExpanded ? 'Ocultar detalle' : 'Ver detalle'}</span>
                  <span
                    className={`material-symbols-outlined text-[16px] transition-transform ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  >
                    expand_more
                  </span>
                </button>

                {/* Detalle en móvil */}
                {isExpanded && (
                  <div className="mt-3 p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col gap-3 text-[12px] animate-in fade-in duration-200">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                        Tiempo de atraso referencial
                      </span>
                      <p className="font-semibold text-slate-800 leading-snug">
                        {category.details.diasAtrasoComercial}
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                        Impacto en el historial
                      </span>
                      <p className="font-semibold text-slate-800 leading-snug">
                        {category.details.impactoHistorial}
                      </p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-200/70 text-slate-800">
                      <span className="font-bold text-[#0F3B82] block text-[11px]">
                        Orientación AlDía:
                      </span>
                      <p className="mt-0.5 leading-snug">
                        {category.details.recomendacion}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Sección Informativa Inferior: ¿Cómo puedo conocer mi clasificación crediticia? */}
      <div className="bg-gradient-to-br from-white via-slate-50/50 to-blue-50/30 rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs flex flex-col gap-5">
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#0F3B82] text-white flex items-center justify-center shrink-0 shadow-xs">
            <span className="material-symbols-outlined text-[24px]">account_balance</span>
          </div>
          <div>
            <h2 className="text-[18px] sm:text-[20px] font-black text-[#0F172A] tracking-tight">
              ¿Cómo puedo conocer mi clasificación crediticia?
            </h2>
            <p className="text-[12.5px] sm:text-[13.5px] text-slate-500 font-medium mt-0.5">
              Consulta oficial de deudas y reporte de riesgo financiero.
            </p>
          </div>
        </div>

        <p className="text-[13.5px] sm:text-[14.5px] text-slate-700 leading-relaxed font-medium">
          Cada persona puede consultar su información directamente mediante el reporte oficial de deudas que emite la{' '}
          <strong className="text-[#0F3B82]">Superintendencia de Banca, Seguros y AFP (SBS)</strong> de forma 100% gratuita con su DNI.
        </p>

        {/* Botón funcional hacia la SBS */}
        <div className="pt-1">
          <a
            href="https://www.sbs.gob.pe/usuarios/nuestros-servicios/reporte-de-deudas"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#00D2A8] hover:bg-[#00BF98] active:scale-[0.98] text-[#08152B] font-black text-[13.5px] sm:text-[14px] shadow-lg shadow-teal-950/15 transition-all duration-200 cursor-pointer"
          >
            <span>Consultar reporte oficial SBS</span>
            <span className="material-symbols-outlined text-[18px]">open_in_new</span>
          </a>
        </div>

        {/* Nota aclaratoria obligatoria */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-[12px] text-slate-500 leading-relaxed flex items-start gap-2.5">
          <span className="material-symbols-outlined text-[18px] text-slate-400 shrink-0 mt-0.5">
            shield
          </span>
          <p>
            <strong>Nota importante:</strong> Esta información es educativa. AlDía no consulta ni determina automáticamente tu clasificación crediticia real. Los criterios de clasificación varían según el tipo de crédito y la normativa aplicable.
          </p>
        </div>
      </div>
    </div>
  );
};
