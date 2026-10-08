import React, { useState } from 'react';
import { FINANCIAL_TERMS, MYTHS_AND_TRUTHS } from '../../data/initialData';

type SubSection =
  | 'conoce-credito'
  | 'antes-aceptar'
  | 'historial'
  | 'sobreendeudamiento'
  | 'diccionario'
  | 'mitos';

export const AprendeScreen: React.FC = () => {
  const [activeSubSection, setActiveSubSection] = useState<SubSection>('conoce-credito');
  const [searchTerm, setSearchTerm] = useState('');

  const subSections: { id: SubSection; label: string; icon: string }[] = [
    { id: 'conoce-credito', label: 'Conoce tu crédito', icon: 'school' },
    { id: 'antes-aceptar', label: 'Antes de aceptar', icon: 'fact_check' },
    { id: 'historial', label: 'Historial crediticio', icon: 'shield' },
    { id: 'sobreendeudamiento', label: 'Sobreendeudamiento', icon: 'warning' },
    { id: 'diccionario', label: 'Diccionario financiero', icon: 'menu_book' },
    { id: 'mitos', label: 'Mitos y verdades', icon: 'search_insights' },
  ];

  const filteredTerms = FINANCIAL_TERMS.filter(
    (t) =>
      t.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <span className="text-[16px]">📚</span>
          <span className="text-[12px] font-bold uppercase tracking-wider text-[#00B49F] bg-emerald-50 px-2 py-0.5 rounded">
            Educación Financiera
          </span>
        </div>
        <h1 className="text-[24px] sm:text-[28px] font-bold text-[#0F3B82] tracking-tight">
          Aprende sobre créditos y finanzas
        </h1>
        <p className="text-[14px] text-[#5E6E82]">
          Conceptos clave, recomendaciones prácticas y herramientas para tomar mejores decisiones financieras.
        </p>
      </div>

      {/* Subsection Selector Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {subSections.map((item) => {
          const isActive = activeSubSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveSubSection(item.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-[13px] font-semibold transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-[#0F3B82] text-white shadow-2xs'
                  : 'bg-white text-[#1A2B42] hover:text-[#0F3B82] hover:bg-[#F0F4F9] border border-[#E2E8F0]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">
                {item.icon}
              </span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. Subsección: Conoce tu crédito */}
      {activeSubSection === 'conoce-credito' && (
        <div className="flex flex-col gap-5">
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-7 shadow-xs flex flex-col gap-4">
            <h2 className="text-[20px] font-bold text-[#0F3B82]">
              ¿Qué compone un crédito financiero?
            </h2>
            <p className="text-[14px] text-[#5E6E82] leading-relaxed">
              Un crédito no es solamente el dinero que recibes, sino un conjunto de condiciones contractuales que determinan cuánto pagarás mes a mes y al final del plazo.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="p-4 rounded-xl bg-[#F0F4F9] border border-[#E2E8F0] flex flex-col gap-1.5">
                <span className="font-bold text-[14px] text-[#0F3B82]">1. Capital prestado</span>
                <p className="text-[12px] text-[#5E6E82] leading-relaxed">
                  Es el monto inicial que la entidad desembolsa a tu favor. Con cada cuota pagas una parte de este capital (amortización).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#F0F4F9] border border-[#E2E8F0] flex flex-col gap-1.5">
                <span className="font-bold text-[14px] text-[#0F3B82]">2. Tasa de interés (TEA)</span>
                <p className="text-[12px] text-[#5E6E82] leading-relaxed">
                  La Tasa Efectiva Anual es el porcentaje que cobra el banco por prestarte el dinero a lo largo de un año.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#F0F4F9] border border-[#E2E8F0] flex flex-col gap-1.5">
                <span className="font-bold text-[14px] text-[#0F3B82]">3. TCEA (Costo total real)</span>
                <p className="text-[12px] text-[#5E6E82] leading-relaxed">
                  Incluye la TEA + comisiones operativas + seguros obligatorios (desgravamen). Es la tasa real con la que debes comparar.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#F0F4F9] border border-[#E2E8F0] flex flex-col gap-1.5">
                <span className="font-bold text-[14px] text-[#0F3B82]">4. Cuota mensual</span>
                <p className="text-[12px] text-[#5E6E82] leading-relaxed">
                  Monto que pagarás periódicamente. Suma: amortización a capital + interés del mes + seguro de desgravamen.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#F0F4F9] border border-[#E2E8F0] flex flex-col gap-1.5">
                <span className="font-bold text-[14px] text-[#0F3B82]">5. Plazo y cronograma</span>
                <p className="text-[12px] text-[#5E6E82] leading-relaxed">
                  Número de meses pactados para cancelar la totalidad. A mayor plazo, las cuotas son menores pero los intereses totales aumentan.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#F0F4F9] border border-[#E2E8F0] flex flex-col gap-1.5">
                <span className="font-bold text-[14px] text-[#0F3B82]">6. Hoja Resumen y Contrato</span>
                <p className="text-[12px] text-[#5E6E82] leading-relaxed">
                  Documento oficial que resume todas las tasas, comisiones y condiciones antes de que firmes el contrato.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Subsección: Antes de aceptar un crédito */}
      {activeSubSection === 'antes-aceptar' && (
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-7 shadow-xs flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <h2 className="text-[20px] font-bold text-[#0F3B82]">
              Lista de verificación antes de firmar un crédito
            </h2>
            <p className="text-[13px] text-[#5E6E82]">
              Revisa minuciosamente estos 7 puntos clave antes de adquirir un compromiso crediticio:
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {[
              {
                title: 'Revisar la TCEA en lugar de la TEA',
                desc: 'No te fijes solo en la tasa de interés base; la TCEA te muestra el porcentaje real sumando seguros y cargos.',
              },
              {
                title: 'Verificar el valor exacto de la cuota mensual',
                desc: 'Comprueba que el monto de la cuota no exceda el 30% de tus ingresos netos mensuales disponibles.',
              },
              {
                title: 'Revisar el plazo total de pago',
                desc: 'Elige el plazo más corto que puedas pagar cómodamente para reducir los intereses totales acumulados.',
              },
              {
                title: 'Revisar comisiones y gastos adicionales',
                desc: 'Verifica qué comisiones periódicas aplican (ej. membresías, envíos de estado de cuenta físicos).',
              },
              {
                title: 'Revisar el seguro de desgravamen',
                desc: 'Conoce el costo del seguro y la cobertura que otorga en caso de fallecimiento o invalidez.',
              },
              {
                title: 'Leer detalladamente la Hoja Resumen',
                desc: 'Exige la Hoja Resumen antes de firmar y solicita que aclaren cualquier concepto que no entiendas.',
              },
              {
                title: 'Evaluar tu capacidad de pago real',
                desc: 'Pregúntate si podrás seguir pagando la cuota puntualmente si surge un gasto imprevisto de salud o familiar.',
              },
            ].map((check, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3.5 p-4 rounded-xl bg-[#F0F4F9] border border-[#E2E8F0]"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-50 text-[#00B49F] font-bold text-[12px] flex items-center justify-center shrink-0 mt-0.5">
                  ✓
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-[14px] text-[#0F3B82]">{check.title}</span>
                  <p className="text-[12px] text-[#5E6E82] mt-0.5">{check.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Subsección: Historial Crediticio */}
      {activeSubSection === 'historial' && (
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-7 shadow-xs flex flex-col gap-5">
          <div>
            <h2 className="text-[20px] font-bold text-[#0F3B82]">
              Historial Crediticio y Central de Riesgos
            </h2>
            <p className="text-[13px] text-[#5E6E82] mt-1">
              Todo lo que necesitas saber sobre cómo se mide y califica tu comportamiento financiero.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div className="p-4.5 rounded-xl bg-[#F0F4F9] border border-[#E2E8F0] flex flex-col gap-2">
              <span className="font-bold text-[14px] text-[#0F3B82]">¿Qué es?</span>
              <p className="text-[12px] text-[#5E6E82] leading-relaxed">
                Es la recopilación oficial de todos los créditos, tarjetas y servicios financieros que mantienes en el sistema financiero peruano.
              </p>
            </div>

            <div className="p-4.5 rounded-xl bg-[#F0F4F9] border border-[#E2E8F0] flex flex-col gap-2">
              <span className="font-bold text-[14px] text-[#0F3B82]">¿Por qué es importante?</span>
              <p className="text-[12px] text-[#5E6E82] leading-relaxed">
                Tener una calificación Normal (0) te otorga acceso a menores tasas de interés, mayores líneas y agilidad crediticia.
              </p>
            </div>

            <div className="p-4.5 rounded-xl bg-[#F0F4F9] border border-[#E2E8F0] flex flex-col gap-2">
              <span className="font-bold text-[14px] text-[#0F3B82]">¿Cómo se clasifica?</span>
              <p className="text-[12px] text-[#5E6E82] leading-relaxed">
                0: Normal (al día) · 1: CPP (hasta 30 días atraso) · 2: Deficiente · 3: Dudoso · 4: Pérdida (más de 120 días).
              </p>
            </div>
          </div>

          <div className="p-4.5 rounded-xl bg-blue-50/60 border border-blue-100 flex items-start gap-3">
            <span className="material-symbols-outlined text-[20px] text-[#0F3B82] shrink-0 mt-0.5">
              verified
            </span>
            <div className="flex flex-col gap-1 text-[13px]">
              <span className="font-bold text-[#0F3B82]">Consulta gratuita oficial:</span>
              <p className="text-[#1A2B42]">
                Puedes consultar tu Reporte de Deudas SBS de manera gratuita e ilimitada a través del portal oficial de la Superintendencia (www.sbs.gob.pe).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 4. Subsección: Sobreendeudamiento */}
      {activeSubSection === 'sobreendeudamiento' && (
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-7 shadow-xs flex flex-col gap-5">
          <div>
            <h2 className="text-[20px] font-bold text-[#0F3B82]">
              ¿Qué es el sobreendeudamiento?
            </h2>
            <p className="text-[14px] text-[#1A2B42] leading-relaxed bg-[#F0F4F9] p-4 rounded-xl border border-[#E2E8F0] mt-2">
              “Es una situación en la que las obligaciones financieras superan la capacidad de pago real de una persona, impidiendo cubrir las cuotas mensuales sin desatender gastos básicos indispensables.”
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-[15px] font-bold text-[#0F3B82]">
              Recomendaciones para prevenir el sobreendeudamiento:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-white border border-[#E2E8F0] flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[18px] text-[#00B49F] mt-0.5">check</span>
                <p className="text-[12px] text-[#1A2B42]">
                  <strong>Regla del 30%:</strong> Procura que la suma de todas tus cuotas mensuales no supere el 30% a 35% de tus ingresos netos.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-[#E2E8F0] flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[18px] text-[#00B49F] mt-0.5">check</span>
                <p className="text-[12px] text-[#1A2B42]">
                  <strong>Priorizar amortización:</strong> Paga primero las deudas que tengan la tasa de interés (TCEA) más alta.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-[#E2E8F0] flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[18px] text-[#00B49F] mt-0.5">check</span>
                <p className="text-[12px] text-[#1A2B42]">
                  <strong>Consolidación de deudas:</strong> Si tienes más de 3 créditos, evalúa una compra de deuda para unificar en una sola cuota mensual.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-[#E2E8F0] flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[18px] text-[#00B49F] mt-0.5">check</span>
                <p className="text-[12px] text-[#1A2B42]">
                  <strong>Fondo de emergencia:</strong> Ahorra paulatinamente al menos 1 a 3 meses de gastos fijos para no recurrir a créditos ante imprevistos.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. Subsección: Diccionario Financiero */}
      {activeSubSection === 'diccionario' && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-[20px] font-bold text-[#0F3B82]">
                📖 Palabras que debes conocer
              </h2>
              <p className="text-[13px] text-[#5E6E82]">
                Definición sencilla, ejemplo e importancia de los términos financieros más utilizados.
              </p>
            </div>

            <div className="relative w-full sm:w-64">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#5E6E82] text-[18px]">
                search
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar término..."
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white border border-[#E2E8F0] text-[13px] focus:outline-none focus:border-[#0F3B82]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3.5">
            {filteredTerms.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-2xs flex flex-col gap-3"
              >
                <div className="flex items-center justify-between gap-2 border-b border-[#F0F4F9] pb-2">
                  <span className="text-[15px] font-bold text-[#0F3B82]">
                    {item.term}
                  </span>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#0F3B82]/5 text-[#0F3B82]">
                    Glosario Oficial
                  </span>
                </div>

                <div className="flex flex-col gap-2 text-[13px]">
                  <div>
                    <span className="font-bold text-[#1A2B42] block text-[12px] uppercase text-[#5E6E82]">
                      Definición sencilla:
                    </span>
                    <p className="text-[#1A2B42] leading-relaxed mt-0.5">{item.definition}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-[#F0F4F9] border border-[#E2E8F0]">
                    <span className="font-bold text-[#0F3B82] block text-[11px] uppercase">
                      Ejemplo práctico:
                    </span>
                    <p className="text-[#5E6E82] text-[12px] leading-relaxed mt-0.5">{item.example}</p>
                  </div>

                  <div>
                    <span className="font-bold text-[#00B49F] block text-[11px] uppercase">
                      ¿Por qué es importante?
                    </span>
                    <p className="text-[#1A2B42] text-[12px] leading-relaxed mt-0.5">{item.importance}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. Subsección: Mitos y Verdades */}
      {activeSubSection === 'mitos' && (
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-[20px] font-bold text-[#0F3B82]">
              🔎 Mitos y verdades sobre créditos y cobranzas
            </h2>
            <p className="text-[13px] text-[#5E6E82]">
              Aclaramos las dudas y creencias erróneas más frecuentes en el sistema financiero.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3.5">
            {MYTHS_AND_TRUTHS.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-2xs flex flex-col gap-3"
              >
                {/* Mito */}
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-red-50/50 border border-red-100">
                  <span className="material-symbols-outlined text-[20px] text-[#D64545] shrink-0 mt-0.5">
                    cancel
                  </span>
                  <div>
                    <span className="text-[11px] font-bold uppercase text-[#D64545] block">
                      MITO COMÚN
                    </span>
                    <p className="text-[13px] font-semibold text-[#1A2B42] mt-0.5">
                      "{item.myth}"
                    </p>
                  </div>
                </div>

                {/* Verdad */}
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-100">
                  <span className="material-symbols-outlined text-[20px] text-[#00B49F] shrink-0 mt-0.5">
                    check_circle
                  </span>
                  <div>
                    <span className="text-[11px] font-bold uppercase text-[#00B49F] block">
                      LA REALIDAD SEGÚN NORMA
                    </span>
                    <p className="text-[13px] font-semibold text-[#0F3B82] mt-0.5">
                      {item.truth}
                    </p>
                  </div>
                </div>

                {/* Explicación */}
                <div className="text-[12px] text-[#5E6E82] leading-relaxed pl-1">
                  <strong>Explicación:</strong> {item.explanation}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
