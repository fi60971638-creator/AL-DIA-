import React, { useState } from 'react';
import { SBS_CATEGORIES, FINANCIAL_CONCEPTS, ADVISORY_TOPICS } from '../../data/initialData';

interface EducacionSBSScreenProps {
  onOpenAdvisorChat: (initialQuery?: string) => void;
  initialTopicId?: string;
}

export const EducacionSBSScreen: React.FC<EducacionSBSScreenProps> = ({
  onOpenAdvisorChat,
  initialTopicId,
}) => {
  const [activeTab, setActiveTab] = useState<'sbs' | 'conceptos' | 'derechos' | 'guias'>(
    initialTopicId ? 'guias' : 'sbs'
  );
  const [selectedTopicId, setSelectedTopicId] = useState<string>(initialTopicId || 'atrasado');
  const [copiedTemplate, setCopiedTemplate] = useState<boolean>(false);

  // Communication template generator
  const [entityNameInput, setEntityNameInput] = useState('Banco Principal');
  const [proposedAmountInput, setProposedAmountInput] = useState('180');

  const letterTemplate = `Estimados señores de ${entityNameInput},

Por medio de la presente, me dirijo a ustedes para manifestar mi entera disposición y voluntad de honrar mis obligaciones crediticias. Debido a una variación temporal en mi flujo de ingresos, solicito formalmente la evaluación de una REPROGRAMACIÓN DE PLAZO o adecuación de cuota a un monto estimado de S/ ${proposedAmountInput} mensuales, que se ajusta a mi capacidad real de pago actual.

Agradezco de antemano su orientación y los canales formales para formalizar este acuerdo y mantener un récord crediticio saludable ante la SBS.

Atentamente,
Titular del crédito`;

  const handleCopyTemplate = () => {
    navigator.clipboard.writeText(letterTemplate);
    setCopiedTemplate(true);
    setTimeout(() => setCopiedTemplate(false), 2500);
  };

  const selectedTopic = ADVISORY_TOPICS.find((t) => t.id === selectedTopicId) || ADVISORY_TOPICS[0];

  return (
    <div className="flex flex-col w-full px-4 py-3 gap-5 max-w-lg mx-auto pb-28">
      {/* Header */}
      <div>
        <h1 className="font-headline-lg text-[24px] font-bold text-[#131b2e] tracking-tight">
          Educación & Reporte SBS
        </h1>
        <p className="font-body-sm text-[12px] text-[#434655]">
          Aprende a proteger tu historial y conoce tus derechos financieros
        </p>
      </div>

      {/* Navigation tabs */}
      <div className="flex bg-[#eaedff] p-1 rounded-2xl gap-1 overflow-x-auto no-scrollbar">
        <button
          type="button"
          onClick={() => setActiveTab('sbs')}
          className={`flex-1 min-w-[85px] py-2 text-[11px] font-bold rounded-xl transition-all cursor-pointer ${
            activeTab === 'sbs'
              ? 'bg-white text-[#0037b0] shadow-xs'
              : 'text-[#434655] hover:text-[#131b2e]'
          }`}
        >
          🏛️ SBS
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('conceptos')}
          className={`flex-1 min-w-[85px] py-2 text-[11px] font-bold rounded-xl transition-all cursor-pointer ${
            activeTab === 'conceptos'
              ? 'bg-white text-[#0037b0] shadow-xs'
              : 'text-[#434655] hover:text-[#131b2e]'
          }`}
        >
          💡 Conceptos
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('derechos')}
          className={`flex-1 min-w-[85px] py-2 text-[11px] font-bold rounded-xl transition-all cursor-pointer ${
            activeTab === 'derechos'
              ? 'bg-white text-[#0037b0] shadow-xs'
              : 'text-[#434655] hover:text-[#131b2e]'
          }`}
        >
          ⚖️ Derechos
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('guias')}
          className={`flex-1 min-w-[85px] py-2 text-[11px] font-bold rounded-xl transition-all cursor-pointer ${
            activeTab === 'guias'
              ? 'bg-white text-[#0037b0] shadow-xs'
              : 'text-[#434655] hover:text-[#131b2e]'
          }`}
        >
          📋 Guías
        </button>
      </div>

      {/* TAB 1: REPORTE DE DEUDAS SBS */}
      {activeTab === 'sbs' && (
        <div className="flex flex-col gap-4 animate-in fade-in duration-200">
          {/* Banner SBS Oficial */}
          <div className="rounded-3xl bg-gradient-to-br from-[#0037b0] to-[#002275] text-white p-5 shadow-md flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[26px] text-blue-200">verified_user</span>
              <h2 className="font-headline-sm text-[18px] font-bold">
                Conoce tu Reporte de Deudas SBS
              </h2>
            </div>

            <p className="text-[13px] text-white/90 leading-relaxed">
              El <strong>Reporte de Deudas SBS</strong> es el registro oficial que consolida la información de todos los créditos y préstamos que mantienes en el sistema financiero formal peruano.
            </p>

            {/* Aviso requerido en el brief */}
            <div className="p-3 rounded-2xl bg-white/15 backdrop-blur-xs border border-white/20 text-[12px] text-blue-50 leading-relaxed">
              <p>
                <strong>Importante:</strong> AlDía no reemplaza el Reporte de Deudas SBS ni modifica la información registrada por las entidades financieras.
              </p>
            </div>

            <a
              href="https://servicios.sbs.gob.pe/ReporteDeudas"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 w-full py-2.5 rounded-xl bg-white text-[#0037b0] text-[13px] font-bold hover:bg-blue-50 active:scale-95 transition-all text-center flex items-center justify-center gap-1.5 shadow-sm"
            >
              <span>Consultar información oficial</span>
              <span className="material-symbols-outlined text-[16px]">open_in_new</span>
            </a>
          </div>

          {/* Calificaciones Oficiales SBS */}
          <div className="flex flex-col gap-2.5">
            <h3 className="font-headline-sm text-[16px] font-bold text-[#131b2e]">
              Categorías de Clasificación SBS
            </h3>
            <div className="flex flex-col gap-2">
              {SBS_CATEGORIES.map((cat, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white border border-[#eaedff] shadow-xs flex flex-col gap-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-label-md text-[14px] font-bold text-[#131b2e]">
                      {cat.level}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        cat.badge === 'Excelente'
                          ? 'bg-emerald-100 text-emerald-800'
                          : cat.badge === 'Precaución'
                          ? 'bg-amber-100 text-amber-800'
                          : cat.badge === 'Alerta'
                          ? 'bg-orange-100 text-orange-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {cat.badge}
                    </span>
                  </div>

                  <span className="text-[11px] font-semibold text-[#0037b0]">
                    {cat.days}
                  </span>

                  <p className="text-[12px] text-[#434655] leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CONCEPTOS CLAVE */}
      {activeTab === 'conceptos' && (
        <div className="flex flex-col gap-3 animate-in fade-in duration-200">
          <h2 className="font-headline-sm text-[16px] font-bold text-[#131b2e]">
            Conceptos Financieros Explicados de Forma Sencilla
          </h2>

          <div className="flex flex-col gap-2.5">
            {FINANCIAL_CONCEPTS.map((concept) => (
              <div
                key={concept.id}
                className="p-4 rounded-2xl bg-white border border-[#eaedff] shadow-xs flex flex-col gap-2"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0037b0] flex items-center justify-center font-bold">
                    <span className="material-symbols-outlined text-[18px]">{concept.icon || 'help_outline'}</span>
                  </div>
                  <h3 className="font-headline-sm text-[14px] font-bold text-[#131b2e]">
                    {concept.term}
                  </h3>
                </div>

                <p className="text-[12px] text-[#434655] leading-relaxed">
                  {concept.simpleMeaning}
                </p>

                {concept.detail && (
                  <div className="p-2.5 rounded-xl bg-[#faf8ff] border border-[#eaedff] text-[11px] text-[#0037b0] leading-normal">
                    💡 <strong>Detalle:</strong> {concept.detail}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: DERECHOS DEL USUARIO */}
      {activeTab === 'derechos' && (
        <div className="flex flex-col gap-3 animate-in fade-in duration-200">
          <div className="rounded-3xl bg-gradient-to-br from-indigo-900 to-[#0037b0] text-white p-5 shadow-md flex flex-col gap-2">
            <span className="text-[11px] uppercase font-bold text-blue-200 tracking-wider">
              Protección al consumidor
            </span>
            <h2 className="font-headline-lg text-[18px] font-bold">
              Conoce tus Derechos Financieros
            </h2>
            <p className="text-[12px] text-white/90 leading-relaxed">
              La normativa peruana (SBS e Indecopi) garantiza derechos esenciales para los usuarios de créditos.
            </p>
          </div>

          <div className="flex flex-col gap-2.5">
            <div className="p-4 rounded-2xl bg-white border border-[#eaedff] shadow-xs flex flex-col gap-1.5">
              <h3 className="font-headline-sm text-[14px] font-bold text-[#131b2e]">
                1. Información Clara y Previa
              </h3>
              <p className="text-[12px] text-[#434655] leading-relaxed">
                Derecho a conocer la Tasa de Costo Efectivo Anual (TCEA), comisiones y costo total antes de firmar cualquier contrato.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#eaedff] shadow-xs flex flex-col gap-1.5">
              <h3 className="font-headline-sm text-[14px] font-bold text-[#131b2e]">
                2. Pagos Anticipados sin Penalidades
              </h3>
              <p className="text-[12px] text-[#434655] leading-relaxed">
                Tienes derecho a realizar amortizaciones a capital o liquidar tu deuda en cualquier momento sin cobros indebidos.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#eaedff] shadow-xs flex flex-col gap-1.5">
              <h3 className="font-headline-sm text-[14px] font-bold text-[#131b2e]">
                3. Canales Oficiales y Trato Digno
              </h3>
              <p className="text-[12px] text-[#434655] leading-relaxed">
                Las cobranzas no deben usar métodos intimidatorios ni llamar fuera de los horarios permitidos por ley.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#eaedff] shadow-xs flex flex-col gap-1.5">
              <h3 className="font-headline-sm text-[14px] font-bold text-[#131b2e]">
                4. Presentar Reclamos
              </h3>
              <p className="text-[12px] text-[#434655] leading-relaxed">
                Toda entidad supervisada debe tener Libro de Reclamaciones y responder en los plazos normados por la SBS.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: GUÍAS DE ACCIÓN & GENERADOR DE CARTAS */}
      {activeTab === 'guias' && (
        <div className="flex flex-col gap-4 animate-in fade-in duration-200">
          <h2 className="font-headline-sm text-[16px] font-bold text-[#131b2e]">
            Guías de Orientación
          </h2>

          {/* Selector de Casos */}
          <div className="flex flex-col gap-2">
            {ADVISORY_TOPICS.map((topic) => (
              <button
                key={topic.id}
                type="button"
                onClick={() => setSelectedTopicId(topic.id)}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                  selectedTopicId === topic.id
                    ? 'bg-blue-50/70 border-[#0037b0] shadow-xs'
                    : 'bg-white border-[#eaedff] hover:bg-[#faf8ff]'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="material-symbols-outlined text-[20px] text-[#0037b0]">
                    {topic.icon}
                  </span>
                  <div className="min-w-0">
                    <span className="font-label-md text-[13px] font-bold text-[#131b2e] block truncate">
                      {topic.title}
                    </span>
                    <span className="text-[11px] text-[#747686] truncate block">
                      {topic.subtitle}
                    </span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[18px] text-[#747686]">
                  chevron_right
                </span>
              </button>
            ))}
          </div>

          {/* Detalle de la guía seleccionada */}
          {selectedTopic && (
            <div className="rounded-3xl bg-white p-5 border border-[#eaedff] shadow-xs flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[22px] text-[#0037b0]">
                  {selectedTopic.icon}
                </span>
                <h3 className="font-headline-sm text-[15px] font-bold text-[#131b2e]">
                  {selectedTopic.fullTitle || selectedTopic.title}
                </h3>
              </div>

              <div className="p-3 rounded-2xl bg-blue-50/50 border border-blue-100 text-[12px] text-[#0037b0] font-medium leading-relaxed">
                💡 {selectedTopic.empathy}
              </div>

              <div className="flex flex-col gap-2 pt-1">
                {selectedTopic.points?.map((pt, pIdx) => (
                  <div key={pIdx} className="p-3 rounded-xl bg-[#faf8ff] border border-[#eaedff]">
                    <h4 className="font-bold text-[12px] text-[#131b2e]">{pt.title}</h4>
                    <p className="text-[11px] text-[#434655] mt-0.5">{pt.desc}</p>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => onOpenAdvisorChat(`Tengo una consulta sobre: ${selectedTopic.title}`)}
                className="w-full py-2.5 px-4 rounded-xl bg-[#0037b0] text-white text-[12px] font-bold hover:bg-[#002f99] active:scale-95 transition-all text-center cursor-pointer mt-1"
              >
                Consultar al Asesor AlDía sobre este tema
              </button>
            </div>
          )}

          {/* Generador de Carta Formal de Reprogramación */}
          <div className="rounded-3xl bg-white p-5 border border-[#eaedff] shadow-xs flex flex-col gap-3 mt-2">
            <h3 className="font-headline-sm text-[16px] font-bold text-[#131b2e]">
              Generador de Carta de Reprogramación
            </h3>
            <p className="text-[12px] text-[#434655] leading-relaxed">
              Personaliza y copia este modelo formal para presentar tu solicitud ante el banco o caja:
            </p>

            <div className="flex flex-col gap-2">
              <div>
                <label className="text-[11px] font-semibold text-[#434655] block mb-1">
                  Nombre de la entidad:
                </label>
                <input
                  type="text"
                  value={entityNameInput}
                  onChange={(e) => setEntityNameInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#eaedff] text-[13px] text-[#131b2e] focus:border-[#0037b0] outline-none"
                  placeholder="Ej. Banco de Crédito BCP"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-[#434655] block mb-1">
                  Cuota mensual propuesta (S/):
                </label>
                <input
                  type="text"
                  value={proposedAmountInput}
                  onChange={(e) => setProposedAmountInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#eaedff] text-[13px] text-[#131b2e] focus:border-[#0037b0] outline-none"
                  placeholder="Ej. 180"
                />
              </div>
            </div>

            {/* Carta Preview Box */}
            <div className="relative">
              <textarea
                readOnly
                rows={6}
                value={letterTemplate}
                className="w-full p-3 rounded-2xl bg-[#faf8ff] border border-[#eaedff] text-[11px] text-[#131b2e] font-mono leading-relaxed resize-none focus:outline-none"
              />
            </div>

            <button
              type="button"
              onClick={handleCopyTemplate}
              className="w-full py-2.5 rounded-xl bg-emerald-600 text-white font-label-md text-[12px] font-bold hover:bg-emerald-700 active:scale-95 transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">
                {copiedTemplate ? 'done' : 'content_copy'}
              </span>
              <span>{copiedTemplate ? '¡Texto copiado al portapapeles!' : 'Copiar modelo de carta'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
