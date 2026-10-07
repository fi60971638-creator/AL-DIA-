import React, { useState } from 'react';
import { ADVISORY_RESPONSES, PRIVACY_NOTICE } from '../../data/initialData';
import { AdvisoryResult } from '../../types';

export const AsesoramientoScreen: React.FC = () => {
  const [selectedSituationKey, setSelectedSituationKey] = useState<string>('');
  const [userQuery, setUserQuery] = useState<string>('');
  const [result, setResult] = useState<AdvisoryResult | null>(null);
  const [errorNotice, setErrorNotice] = useState<string>('');

  const situationsList = [
    { key: 'no-puedo-pagar', label: 'No puedo pagar' },
    { key: 'me-atrase', label: 'Me atrasé en un pago' },
    { key: 'me-estan-cobrando', label: 'Me están cobrando' },
    { key: 'no-entiendo-credito', label: 'No entiendo mi crédito' },
    { key: 'quiero-pagar-antes', label: 'Quiero pagar antes' },
    { key: 'cuidar-historial', label: 'Quiero cuidar mi historial' },
    { key: 'varias-obligaciones', label: 'Tengo varias obligaciones' },
    { key: 'otro', label: 'Otro caso o consulta' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSituationKey) {
      setErrorNotice('Por favor selecciona una situación para mostrarte la orientación adecuada.');
      return;
    }
    setErrorNotice('');
    const advisoryData =
      ADVISORY_RESPONSES[selectedSituationKey] || ADVISORY_RESPONSES['otro'];
    setResult(advisoryData);

    // Scroll smoothly to the result card
    setTimeout(() => {
      const el = document.getElementById('resultado-orientacion');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleReset = () => {
    setSelectedSituationKey('');
    setResult(null);
    setUserQuery('');
    setErrorNotice('');
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <span className="text-[16px]">👤</span>
          <span className="text-[12px] font-bold uppercase tracking-wider text-[#149B8A] bg-emerald-50 px-2 py-0.5 rounded">
            Orientación Estructurada
          </span>
        </div>
        <h1 className="text-[24px] sm:text-[28px] font-bold text-[#0F3D56] tracking-tight">
          Orientación personalizada
        </h1>
        <p className="text-[14px] text-[#6B7280]">
          Cuéntanos qué situación tienes para mostrarte recomendaciones estructuradas y pasos a seguir.
        </p>
      </div>

      {/* Privacy Guarantee Banner */}
      <div className="p-4 rounded-xl bg-[#F7F8FA] border border-[#E5E7EB] flex items-start gap-3 text-[12px] text-[#25313C]">
        <span className="material-symbols-outlined text-[20px] text-[#149B8A] shrink-0 mt-0.5">
          lock
        </span>
        <div className="flex flex-col gap-0.5">
          <span className="font-bold text-[#0F3D56]">{PRIVACY_NOTICE.title}</span>
          <p className="text-[#6B7280]">{PRIVACY_NOTICE.desc}</p>
        </div>
      </div>

      {/* Form Container */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-7 shadow-xs flex flex-col gap-5">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Situation Selection */}
          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-bold text-[#0F3D56]">
              1. Selecciona tu situación:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {situationsList.map((item) => {
                const isChecked = selectedSituationKey === item.key;
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => {
                      setSelectedSituationKey(item.key);
                      setErrorNotice('');
                    }}
                    className={`p-3 rounded-xl border text-left text-[13px] font-medium transition-all cursor-pointer flex items-center justify-between ${
                      isChecked
                        ? 'bg-[#0F3D56] text-white border-[#0F3D56] shadow-2xs font-semibold'
                        : 'bg-[#F7F8FA] text-[#25313C] border-[#E5E7EB] hover:bg-white hover:border-[#0F3D56]/40'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="material-symbols-outlined text-[18px]">
                      {isChecked ? 'radio_button_checked' : 'radio_button_unchecked'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Query Text Area */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[14px] font-bold text-[#0F3D56]">
              2. Describe tu consulta o duda (Opcional):
            </label>
            <p className="text-[12px] text-[#6B7280]">
              Escribe brevemente tu pregunta de forma general. No ingreses datos personales ni números bancarios.
            </p>
            <textarea
              rows={3}
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              placeholder="Escribe tu consulta aquí..."
              className="w-full p-3.5 rounded-xl border border-[#E5E7EB] bg-[#F7F8FA] focus:bg-white text-[13px] text-[#25313C] focus:outline-none focus:border-[#0F3D56]"
            />
          </div>

          {/* Error notice if submitted blank */}
          {errorNotice && (
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-[13px] flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">info</span>
              <span>{errorNotice}</span>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#0F3D56] hover:bg-[#0c2f42] text-white font-semibold text-[14px] transition-all shadow-xs cursor-pointer active:scale-[0.99] flex items-center justify-center gap-2"
            >
              <span>Acceder a la orientación</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>

            {result && (
              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white border border-[#E5E7EB] hover:bg-[#F7F8FA] text-[#6B7280] text-[13px] font-medium transition-colors cursor-pointer"
              >
                Limpiar campos
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Structured Result Display */}
      {result && (
        <div
          id="resultado-orientacion"
          className="bg-white border-2 border-[#149B8A]/40 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col gap-6 scroll-mt-20 animate-fadeIn"
        >
          {/* Result Header */}
          <div className="flex flex-col gap-1 pb-4 border-b border-[#E5E7EB]">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#149B8A] bg-emerald-50 px-2 py-0.5 rounded self-start">
              Recomendación Educativa
            </span>
            <h2 className="text-[20px] sm:text-[22px] font-bold text-[#0F3D56] mt-1">
              {result.title}
            </h2>
          </div>

          {/* Meaning / Context */}
          <div className="flex flex-col gap-1.5">
            <span className="font-bold text-[13px] uppercase text-[#6B7280]">
              ¿Qué debes comprender de esta situación?
            </span>
            <p className="text-[14px] text-[#25313C] leading-relaxed bg-[#F7F8FA] p-4 rounded-xl border border-[#E5E7EB]">
              {result.whatItMeans}
            </p>
          </div>

          {/* What to Check */}
          <div className="flex flex-col gap-2">
            <span className="font-bold text-[14px] text-[#0F3D56] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-[#0F3D56]">
                find_in_page
              </span>
              <span>1. ¿Qué deberías revisar primero?</span>
            </span>
            <div className="grid grid-cols-1 gap-2">
              {result.whatToCheck.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-lg bg-white border border-[#E5E7EB] text-[13px] text-[#25313C]"
                >
                  <span className="material-symbols-outlined text-[16px] text-[#0F3D56] mt-0.5">
                    arrow_right
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* What to Do */}
          <div className="flex flex-col gap-2">
            <span className="font-bold text-[14px] text-[#0F3D56] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-[#149B8A]">
                check_circle
              </span>
              <span>2. ¿Qué pasos puedes dar?</span>
            </span>
            <div className="grid grid-cols-1 gap-2">
              {result.whatToDo.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-lg bg-emerald-50/40 border border-emerald-100 text-[13px] text-[#25313C]"
                >
                  <span className="material-symbols-outlined text-[16px] text-[#149B8A] mt-0.5">
                    check
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* What to Avoid */}
          <div className="flex flex-col gap-2">
            <span className="font-bold text-[14px] text-[#0F3D56] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-[#D64545]">
                cancel
              </span>
              <span>3. ¿Qué deberías evitar?</span>
            </span>
            <div className="grid grid-cols-1 gap-2">
              {result.whatToAvoid.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-lg bg-red-50/40 border border-red-100 text-[13px] text-[#25313C]"
                >
                  <span className="material-symbols-outlined text-[16px] text-[#D64545] mt-0.5">
                    close
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Practical Advice */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
            <span className="material-symbols-outlined text-[20px] text-[#D99A24] shrink-0 mt-0.5">
              lightbulb
            </span>
            <div className="flex flex-col gap-0.5 text-[13px]">
              <span className="font-bold text-[#92400e] uppercase text-[11px]">
                Consejo práctico
              </span>
              <p className="text-[#25313C] leading-relaxed">{result.advice}</p>
            </div>
          </div>

          {/* Official Footnote & Legal Disclaimer */}
          <div className="pt-3 border-t border-[#E5E7EB] flex flex-col gap-2 text-[12px] text-[#6B7280]">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="font-medium text-[#0F3D56]">
                Fuente oficial recomendada: {result.officialSource.name}
              </span>
              <a
                href={result.officialSource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#0F3D56] hover:text-[#149B8A] inline-flex items-center gap-1"
              >
                <span>Ir al sitio oficial</span>
                <span className="material-symbols-outlined text-[13px]">open_in_new</span>
              </a>
            </div>

            <p className="italic bg-[#F7F8FA] p-3 rounded-lg border border-[#E5E7EB] leading-relaxed">
              * Nota: Esta orientación es general y educativa. No reemplaza la evaluación formal de una entidad financiera ni la asesoría legal o profesional individual.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
