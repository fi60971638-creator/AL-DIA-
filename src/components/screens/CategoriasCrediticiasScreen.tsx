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
    shortDesc: 'Cumple normalmente con sus obligaciones de pago según lo pactado.',
    colorScheme: {
      bgLight: 'bg-emerald-50/70',
      border: 'border-emerald-200',
      badgeBg: 'bg-emerald-100',
      badgeText: 'text-emerald-800',
      barColor: 'bg-emerald-500',
    },
    details: {
      diasAtrasoComercial: 'Al día o hasta 8 días de retraso calendario.',
      diasAtrasoConsumo: 'Pagos puntuales en fecha o con atraso menor a 8 días.',
      impactoHistorial: 'Excelente récord crediticio. Acceso preferencial a préstamos y tasas de interés competitivas.',
      recomendacion: 'Mantén la puntualidad en tus fechas de pago para conservar tu historial 100% normal en la SBS.',
    },
  },
  {
    id: 'cpp',
    name: 'CPP',
    riskLevel: 'Potencial',
    shortDesc: 'Presenta señales iniciales de posibles dificultades de pago (Con Problemas Potenciales).',
    colorScheme: {
      bgLight: 'bg-amber-50/70',
      border: 'border-amber-200',
      badgeBg: 'bg-amber-100',
      badgeText: 'text-amber-800',
      barColor: 'bg-amber-500',
    },
    details: {
      diasAtrasoComercial: 'Atrasos de 9 a 30 días calendario en el sistema financiero.',
      diasAtrasoConsumo: 'Atrasos leves entre 9 y 30 días respecto al vencimiento pactado.',
      impactoHistorial: 'Alerta temprana para el sistema. Puede frenar incrementos de línea de crédito o nuevos préstamos.',
      recomendacion: 'Revisa tu presupuesto de inmediato y regulariza la cuota pendiente antes de cumplir los 30 días de atraso.',
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
      barColor: 'bg-orange-500',
    },
    details: {
      diasAtrasoComercial: 'Atrasos de 31 a 60 días calendario.',
      diasAtrasoConsumo: 'Atrasos notables entre 31 y 60 días en créditos revolventes o personales.',
      impactoHistorial: 'Afectación notoria en la Central de Riesgos SBS. Comienzan gestiones de cobranza extrajudicial activa.',
      recomendacion: 'Comunícate formalmente con la entidad para evaluar una reprogramación antes de que pase a rangos críticos.',
    },
  },
  {
    id: 'dudoso',
    name: 'DUDOSO',
    riskLevel: 'Alto',
    shortDesc: 'Presenta un riesgo sumamente elevado de incumplimiento de la deuda.',
    colorScheme: {
      bgLight: 'bg-rose-50/70',
      border: 'border-rose-200',
      badgeBg: 'bg-rose-100',
      badgeText: 'text-rose-800',
      barColor: 'bg-rose-500',
    },
    details: {
      diasAtrasoComercial: 'Atrasos de 61 a 120 días calendario.',
      diasAtrasoConsumo: 'Atrasos severos de 61 a 120 días continuos.',
      impactoHistorial: 'Restricción casi total de acceso al crédito formal. Inicio de acciones de recuperación pre-judicial.',
      recomendacion: 'Infórmate sobre tus derechos ante gestores de cobranza y solicita una propuesta formal de refinanciamiento factible.',
    },
  },
  {
    id: 'perdida',
    name: 'PÉRDIDA',
    riskLevel: 'Muy alto',
    shortDesc: 'Corresponde a una situación de incumplimiento prolongado o deuda castigada.',
    colorScheme: {
      bgLight: 'bg-red-50/70',
      border: 'border-red-200',
      badgeBg: 'bg-red-100',
      badgeText: 'text-red-900',
      barColor: 'bg-red-600',
    },
    details: {
      diasAtrasoComercial: 'Atrasos superiores a 120 días calendario.',
      diasAtrasoConsumo: 'Atrasos mayores a 120 días o deudas transferidas a cobranza judicial.',
      impactoHistorial: 'Calificación máxima negativa en la Central de Riesgos SBS. La entidad puede provisionar el 100% de la deuda.',
      recomendacion: 'Conserva la calma. Tienes derecho a un trato digno. Evalúa convenios de cancelación total con condonación de intereses.',
    },
  },
];

export const CategoriasCrediticiasScreen: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>('normal');

  const toggleRow = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto pb-14 fade-in">
      {/* 1. Encabezado principal */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col gap-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-[12px] font-bold border border-teal-200 w-fit">
          <span className="material-symbols-outlined text-[16px] text-teal-600">verified</span>
          <span>Normativa SBS · Clasificación de Deudores en el Perú</span>
        </div>

        <h1 className="text-[26px] sm:text-[32px] font-black text-[#0F172A] tracking-tight leading-tight">
          Conoce las categorías de riesgo crediticio
        </h1>

        <p className="text-[14.5px] sm:text-[15.5px] text-slate-600 max-w-3xl leading-relaxed">
          Aprende qué significan las 5 categorías oficiales utilizadas por la Superintendencia de Banca, Seguros y AFP (SBS) para clasificar el riesgo crediticio en el sistema financiero peruano.
        </p>
      </div>

      {/* 2. Barra Visual Progresiva de las 5 Categorías */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-extrabold uppercase tracking-wider text-slate-500">
            Escala Progresiva de Riesgo SBS
          </span>
          <span className="text-[11.5px] font-bold text-teal-700">
            De Menor a Mayor Riesgo →
          </span>
        </div>

        <div className="grid grid-cols-5 gap-1.5 sm:gap-2.5">
          {CREDIT_CATEGORIES.map((cat) => {
            const isSelected = expandedId === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => toggleRow(cat.id)}
                className={`flex flex-col items-center gap-1.5 p-2.5 sm:p-3 rounded-2xl transition-all cursor-pointer text-center group border ${
                  isSelected
                    ? `${cat.colorScheme.bgLight} ${cat.colorScheme.border} border-2 shadow-xs scale-[1.02]`
                    : 'bg-slate-50 hover:bg-slate-100/80 border-slate-200/60'
                }`}
                title={`Haz clic para ver detalles de ${cat.name}`}
              >
                <div
                  className={`w-full h-2.5 sm:h-3 rounded-full ${cat.colorScheme.barColor} transition-transform group-hover:scale-y-110`}
                />
                <span className="text-[11.5px] sm:text-[13px] font-black text-slate-800 tracking-tight block">
                  {cat.name}
                </span>
                <span
                  className={`text-[9.5px] sm:text-[11px] font-bold px-1.5 py-0.5 rounded-md ${cat.colorScheme.badgeBg} ${cat.colorScheme.badgeText}`}
                >
                  {cat.riskLevel}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Cuadro Comparativo Interactivo */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
        {/* Tabla para Desktop */}
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

                      {/* Nivel de riesgo */}
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11.5px] font-black border ${category.colorScheme.badgeBg} ${category.colorScheme.badgeText} ${category.colorScheme.border}`}
                        >
                          {category.riskLevel}
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
                              ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
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
                        <td colSpan={4} className="p-5 sm:p-6">
                          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col gap-4 fade-in">
                            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                              <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-[20px] text-teal-700">
                                  info
                                </span>
                                <h3 className="text-[15px] font-black text-slate-900">
                                  Criterios y normas SBS: Categoría {category.name}
                                </h3>
                              </div>
                              <span
                                className={`text-[11px] font-black px-2.5 py-0.5 rounded-full border ${category.colorScheme.badgeBg} ${category.colorScheme.badgeText} ${category.colorScheme.border}`}
                              >
                                Riesgo {category.riskLevel}
                              </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[12.5px]">
                              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                                <span className="text-[10.5px] uppercase font-bold text-slate-500 block mb-1">
                                  Días de atraso referenciales (SBS)
                                </span>
                                <p className="font-semibold text-slate-800 leading-snug">
                                  {category.details.diasAtrasoComercial}
                                </p>
                              </div>

                              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                                <span className="text-[10.5px] uppercase font-bold text-slate-500 block mb-1">
                                  Impacto en el historial financiero
                                </span>
                                <p className="font-semibold text-slate-800 leading-snug">
                                  {category.details.impactoHistorial}
                                </p>
                              </div>
                            </div>

                            <div className="p-3.5 rounded-xl bg-sky-50 border border-sky-200 text-[12.5px] flex items-start gap-2.5">
                              <span className="material-symbols-outlined text-[18px] text-[#007EAF] shrink-0 mt-0.5">
                                lightbulb
                              </span>
                              <div>
                                <span className="font-bold block text-[#0B3B60]">
                                  Orientación preventiva aldia:
                                </span>
                                <p className="text-[#0B3B60] mt-0.5 leading-snug font-medium">
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

        {/* Vista móvil en tarjetas */}
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
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
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
                  <div className="mt-3 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-3 text-[12px] fade-in">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                        Días de atraso referenciales
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

                    <div className="p-2.5 rounded-xl bg-sky-50 border border-sky-200 text-[#0B3B60]">
                      <span className="font-bold text-[#0B3B60] block text-[11px]">
                        Orientación aldia:
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

      {/* 4. Sección Informativa: Consulta de reporte oficial SBS */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col gap-5">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-sky-50 text-[#007EAF] flex items-center justify-center shrink-0 border border-sky-200">
            <span className="material-symbols-outlined text-[24px]">account_balance</span>
          </div>
          <div>
            <h2 className="text-[18px] sm:text-[20px] font-extrabold text-[#0B3B60] tracking-tight font-heading">
              ¿Cómo puedo conocer mi clasificación crediticia?
            </h2>
            <p className="text-[12.5px] sm:text-[13.5px] text-slate-500 font-medium mt-0.5">
              Consulta gratuita de deudas y reporte de riesgo financiero.
            </p>
          </div>
        </div>

        <p className="text-[13.5px] sm:text-[14.5px] text-slate-600 leading-relaxed font-normal">
          Cada ciudadano puede consultar su información crediticia oficial directamente mediante el reporte gratuito emitido por la{' '}
          <strong className="text-[#0B3B60]">Superintendencia de Banca, Seguros y AFP (SBS)</strong> ingresando a su portal con su DNI.
        </p>

        {/* Botón funcional hacia la SBS */}
        <div className="pt-1">
          <a
            href="https://www.sbs.gob.pe/usuarios/nuestros-servicios/reporte-de-deudas"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-[#0B3B60] hover:bg-[#082E4D] text-white font-bold text-[13.5px] sm:text-[14px] shadow-sm transition-all duration-200 cursor-pointer font-heading"
          >
            <span>Consultar reporte oficial SBS</span>
            <span className="material-symbols-outlined text-[18px]">open_in_new</span>
          </a>
        </div>

        {/* Nota aclaratoria obligatoria */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-[12px] text-slate-600 leading-relaxed flex items-start gap-2.5">
          <span className="material-symbols-outlined text-[18px] text-slate-400 shrink-0 mt-0.5">
            shield
          </span>
          <p>
            <strong className="text-[#0B3B60]">Aviso educativo:</strong> aldia brinda información pedagógica orientativa y no determina ni evalúa clasificaciones crediticias individuales. Las entidades financieras supervisadas son las únicas facultadas para emitir y reportar clasificaciones según la normativa SBS.
          </p>
        </div>
      </div>
    </div>
  );
};
