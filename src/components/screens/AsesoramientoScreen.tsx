import React, { useState, useRef } from 'react';
import { ADVISORY_TOPICS } from '../../data/initialData';
import { AdvisoryTopic } from '../../types';

interface AsesoramientoScreenProps {
  onOpenAdvisorChat: (initialMsg?: string) => void;
}

export const AsesoramientoScreen: React.FC<AsesoramientoScreenProps> = ({ onOpenAdvisorChat }) => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>('atraso');
  const [feedbackGiven, setFeedbackGiven] = useState<'yes' | 'no' | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const adviceCardRef = useRef<HTMLDivElement>(null);
  const topicsSectionRef = useRef<HTMLDivElement>(null);

  const currentTopic: AdvisoryTopic =
    ADVISORY_TOPICS.find((t) => t.id === selectedTopicId) || ADVISORY_TOPICS[0];

  const handleSelectTopic = (id: string) => {
    setSelectedTopicId(id);
    setTimeout(() => {
      adviceCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 50);
  };

  const handleNextTopic = () => {
    const currentIndex = ADVISORY_TOPICS.findIndex((t) => t.id === selectedTopicId);
    const nextIndex = (currentIndex + 1) % ADVISORY_TOPICS.length;
    setSelectedTopicId(ADVISORY_TOPICS[nextIndex].id);
    setTimeout(() => {
      adviceCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 50);
  };

  const handleFeedback = (type: 'yes' | 'no') => {
    setFeedbackGiven(type);
    triggerToast('¡Gracias por tus comentarios! Nos ayuda a mejorar las respuestas.');
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3500);
  };

  return (
    <div className="flex flex-col w-full px-4 py-3 gap-3.5 max-w-md mx-auto pb-24 relative">
      {/* Friendly Warm Guidance Header Card */}
      <section className="w-full bg-white rounded-2xl p-4 shadow-xs border border-[#eaedff] relative overflow-hidden">
        <div className="flex items-start gap-3.5">
          <div className="w-12 h-12 rounded-full bg-[#dce1ff] flex items-center justify-center flex-shrink-0 text-[#0037b0]">
            <span className="material-symbols-outlined text-[26px]">support_agent</span>
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#e2e7ff] w-max mb-1">
              <span className="w-2 h-2 rounded-full bg-[#0037b0] animate-pulse"></span>
              <span className="font-label-sm text-[11px] font-semibold text-[#0037b0]">
                Acompañamiento sin costo
              </span>
            </div>
            <h1 className="font-headline-md text-[20px] font-bold text-[#131b2e] tracking-tight">
              ¿Necesitas orientación?
            </h1>
            <p className="font-body-md text-[13px] text-[#434655] mt-1 leading-relaxed">
              Elige tu situación actual y recibe una explicación sencilla sobre las alternativas que
              tienes. Sin juicios ni términos complejos.
            </p>
          </div>
        </div>
        <div className="mt-3 pt-2.5 border-t border-[#f2f3ff] flex items-center gap-1.5 text-[#0037b0]">
          <span className="material-symbols-outlined text-[17px]">verified_user</span>
          <span className="font-label-sm text-[11px] text-[#434655]">
            Tus consultas son privadas y confidenciales
          </span>
        </div>
      </section>

      {/* Situation Selection List */}
      <section ref={topicsSectionRef} className="flex flex-col gap-2 w-full">
        <div className="flex items-center justify-between px-1">
          <span className="font-label-md text-[12px] text-[#434655] uppercase tracking-wider font-bold">
            Temas frecuentes
          </span>
          <span className="font-label-sm text-[12px] text-[#0051d5] font-semibold">
            {ADVISORY_TOPICS.length} guías disponibles
          </span>
        </div>

        {ADVISORY_TOPICS.map((topic) => {
          const isActive = topic.id === selectedTopicId;
          const getIconColor = () => {
            if (topic.id === 'atraso') return 'bg-[#ffdad6] text-[#ba1a1a]';
            if (topic.id === 'imposibilidad') return 'bg-[#dae2fd] text-[#0037b0]';
            if (topic.id === 'negociar') return 'bg-[#dbe1ff] text-[#0051d5]';
            if (topic.id === 'consecuencias') return 'bg-[#e2e7ff] text-[#00496b]';
            return 'bg-[#c9e6ff] text-[#00628d]';
          };

          return (
            <button
              key={topic.id}
              onClick={() => handleSelectTopic(topic.id)}
              type="button"
              className={`w-full text-left bg-white hover:bg-[#f2f3ff] active:bg-[#eaedff] p-3.5 rounded-2xl shadow-xs border transition-all flex items-center justify-between gap-2.5 cursor-pointer group ${
                isActive ? 'border-[#1d4ed8] ring-1 ring-[#1d4ed8]/20' : 'border-[#eaedff]'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${getIconColor()}`}
                >
                  <span className="material-symbols-outlined text-[22px]">{topic.icon}</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-headline-sm text-[15px] font-semibold text-[#131b2e] group-hover:text-[#0037b0] transition-colors truncate">
                      {topic.title}
                    </span>
                    {isActive && (
                      <span className="px-2 py-0.5 rounded-full bg-[#dce1ff] text-[#001551] font-label-sm text-[10px] font-bold">
                        Viendo
                      </span>
                    )}
                  </div>
                  <p className="font-body-sm text-[12px] text-[#434655] truncate mt-0.5">
                    {topic.subtitle}
                  </p>
                </div>
              </div>
              <span
                className={`material-symbols-outlined text-[18px] group-hover:translate-x-0.5 transition-transform flex-shrink-0 ${
                  isActive ? 'text-[#0037b0]' : 'text-[#747686]'
                }`}
              >
                arrow_forward_ios
              </span>
            </button>
          );
        })}
      </section>

      {/* Interactive Explanation Card */}
      <section
        ref={adviceCardRef}
        className="w-full bg-white rounded-2xl shadow-sm border border-[#eaedff] p-4 flex flex-col gap-2.5 transition-all duration-300"
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-full bg-[#dbe1ff] flex items-center justify-center text-[#0037b0] flex-shrink-0">
              <span className="material-symbols-outlined text-[18px]">lightbulb</span>
            </div>
            <span className="font-label-md text-[12px] font-bold text-[#0051d5] tracking-wide uppercase">
              Respuesta guiada
            </span>
          </div>
          <button
            type="button"
            onClick={handleNextTopic}
            className="text-[#434655] hover:text-[#131b2e] font-label-sm text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
          >
            <span>Cambiar tema</span>
            <span className="material-symbols-outlined text-[16px]">swap_vert</span>
          </button>
        </div>

        {/* Dynamic Title */}
        <h2 className="font-headline-sm text-[17px] font-bold text-[#131b2e] mt-1 leading-snug">
          {currentTopic.fullTitle}
        </h2>

        {/* Visual Empathy Pill */}
        <div className="w-full bg-[#f2f3ff] rounded-xl p-3 flex items-center gap-2.5 border border-[#eaedff]">
          <span className="material-symbols-outlined text-[#0037b0] text-[20px] flex-shrink-0">
            sentiment_satisfied
          </span>
          <p className="font-body-sm text-[12px] text-[#434655] leading-relaxed">
            {currentTopic.empathy}
          </p>
        </div>

        {/* Structured Bullet Points */}
        <div className="flex flex-col gap-2 mt-1">
          {currentTopic.points.map((point, index) => (
            <div
              key={index}
              className="p-3 bg-[#faf8ff] rounded-xl border border-[#eaedff] flex items-start gap-3 shadow-2xs"
            >
              <div className="w-6 h-6 rounded-full bg-[#1d4ed8] text-white flex items-center justify-center font-label-sm text-[11px] font-bold flex-shrink-0 mt-0.5">
                {index + 1}
              </div>
              <div className="flex flex-col min-w-0">
                <strong className="font-label-lg text-[14px] font-bold text-[#131b2e]">
                  {point.title}
                </strong>
                <span className="font-body-sm text-[12px] text-[#434655] mt-0.5 leading-normal">
                  {point.desc}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col gap-2 mt-2 pt-2 border-t border-[#f2f3ff]">
          <button
            onClick={() => onOpenAdvisorChat(`Consulta sobre: ${currentTopic.title}`)}
            type="button"
            className="w-full bg-[#0037b0] text-white font-label-lg text-[14px] font-semibold py-3 rounded-xl shadow-xs hover:bg-[#002f99] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">chat</span>
            <span>Hablar con un asesor en línea</span>
          </button>

          <button
            onClick={handleNextTopic}
            type="button"
            className="w-full bg-[#e2e7ff] text-[#0037b0] font-label-md text-[13px] font-semibold py-2.5 rounded-xl hover:bg-[#dae2fd] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">quiz</span>
            <span>Explorar otra situación</span>
          </button>
        </div>
      </section>

      {/* Interactive Feedback Banner */}
      <section className="w-full bg-[#f2f3ff] rounded-2xl p-4 flex items-center justify-between gap-3 border border-[#eaedff]">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-full bg-[#dae2fd] flex items-center justify-center text-[#0037b0] flex-shrink-0">
            <span className="material-symbols-outlined text-[20px]">thumb_up</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-label-md text-[13px] font-semibold text-[#131b2e]">
              ¿Te resultó útil esta información?
            </span>
            <span className="font-body-sm text-[11px] text-[#434655]">
              Ayúdanos a simplificar más respuestas.
            </span>
          </div>
        </div>

        {feedbackGiven ? (
          <div className="flex items-center gap-1.5 px-3 py-1 bg-[#dae2fd] rounded-full text-[#0037b0] font-label-sm text-[11px] font-semibold">
            <span className="material-symbols-outlined text-[15px]">check_circle</span>
            <span>¡Gracias!</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <button
              onClick={() => handleFeedback('yes')}
              aria-label="Sí me ayudó"
              type="button"
              className="w-9 h-9 rounded-full bg-white hover:bg-[#0037b0] hover:text-white flex items-center justify-center text-[#131b2e] transition-colors shadow-2xs border border-[#eaedff] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[17px]">thumb_up</span>
            </button>
            <button
              onClick={() => handleFeedback('no')}
              aria-label="No me ayudó"
              type="button"
              className="w-9 h-9 rounded-full bg-white hover:bg-[#eaedff] flex items-center justify-center text-[#434655] transition-colors shadow-2xs border border-[#eaedff] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[17px]">thumb_down</span>
            </button>
          </div>
        )}
      </section>

      {/* Floating Toast Notification */}
      {showToast && (
        <div className="fixed bottom-20 left-4 right-4 z-50 max-w-sm mx-auto bg-[#283044] text-white px-4 py-3 rounded-xl shadow-xl flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="material-symbols-outlined text-[#b7c4ff] text-[20px]">forum</span>
            <span className="font-body-sm text-[12px]">{toastMessage}</span>
          </div>
          <button
            aria-label="Cerrar aviso"
            onClick={() => setShowToast(false)}
            className="text-[#cad3ff] hover:text-white p-1"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}
    </div>
  );
};
