import React, { useState } from 'react';
import { SECURITY_GAME_QUESTIONS, SecurityGameQuestion } from '../../data/securityData';

export const SecurityGame: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);

  const currentQuestion: SecurityGameQuestion = SECURITY_GAME_QUESTIONS[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOptionIndex(idx);
    setIsAnswered(true);

    if (currentQuestion.options[idx].isSafe) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < SECURITY_GAME_QUESTIONS.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOptionIndex(null);
      setIsAnswered(false);
    } else {
      setGameFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOptionIndex(null);
    setIsAnswered(false);
    setScore(0);
    setGameFinished(false);
  };

  return (
    <div id="juego-seguridad" className="w-full bg-gradient-to-br from-[#0B3B60] via-[#092C48] to-[#061D30] rounded-3xl p-6 sm:p-9 text-white shadow-xl relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#00A3E0]/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

      {/* Header Info */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10 text-left">
        <div className="flex flex-col gap-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11.5px] font-bold text-sky-200 w-fit">
            <span className="material-symbols-outlined text-[16px] text-[#00A3E0]">sports_esports</span>
            <span>Actividad Interactiva AL DÍA</span>
          </div>
          <h2 className="text-[22px] sm:text-[28px] font-extrabold tracking-tight font-heading text-white">
            ¿Es una Estafa o una Operación Segura?
          </h2>
          <p className="text-[13.5px] text-slate-300 font-sans max-w-2xl">
            Ponte a prueba con 5 situaciones reales habituales en el Perú y entrena tu instinto para proteger tus cuentas bancarias y ahorros.
          </p>
        </div>

        {/* Live Score Tracker */}
        <div className="flex sm:flex-col items-center sm:items-end justify-between gap-1 shrink-0 bg-white/5 sm:bg-transparent p-3 sm:p-0 rounded-2xl border sm:border-0 border-white/10">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Aciertos Seguros
          </span>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-emerald-400">shield</span>
            <span className="text-[24px] font-black text-white font-heading">
              {score} / {SECURITY_GAME_QUESTIONS.length}
            </span>
          </div>
        </div>
      </div>

      {/* Main Game Area */}
      {!gameFinished ? (
        <div className="relative z-10 pt-6 flex flex-col gap-6 text-left">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between text-[12px] font-bold text-sky-200">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#00A3E0]" />
              <span>Situación {currentIndex + 1} de {SECURITY_GAME_QUESTIONS.length}</span>
              <span className="text-white/40">·</span>
              <span className="text-slate-300 font-medium">{currentQuestion.category}</span>
            </span>
            <span className="text-slate-400 font-normal">
              Progreso: {Math.round(((currentIndex + 1) / SECURITY_GAME_QUESTIONS.length) * 100)}%
            </span>
          </div>

          <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#00A3E0] to-emerald-400 h-1.5 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / SECURITY_GAME_QUESTIONS.length) * 100}%` }}
            />
          </div>

          {/* Scenario Box */}
          <div className="bg-white/95 rounded-2xl p-5 sm:p-6 text-slate-800 shadow-md flex flex-col gap-2.5 border border-white/20">
            <div className="flex items-center gap-2 text-[#0B3B60] font-bold text-[13px] font-heading">
              <span className="material-symbols-outlined text-[20px] text-[#00A3E0]">crisis_alert</span>
              <span>Caso en el Perú</span>
            </div>
            <h3 className="text-[17px] sm:text-[19px] font-extrabold text-[#0B3B60] font-heading leading-snug">
              {currentQuestion.situation}
            </h3>
            <p className="text-[14px] text-slate-700 leading-relaxed font-sans">
              {currentQuestion.detail}
            </p>
          </div>

          {/* Options List */}
          <div className="flex flex-col gap-3">
            <span className="text-[13px] font-bold text-slate-200">
              ¿Cuál es la decisión correcta y más segura?
            </span>
            <div className="grid grid-cols-1 gap-3">
              {currentQuestion.options.map((option, optIdx) => {
                const isSelected = selectedOptionIndex === optIdx;
                let btnStyle = 'bg-white/10 hover:bg-white/15 border-white/15 text-white';

                if (isAnswered) {
                  if (option.isSafe) {
                    btnStyle = 'bg-emerald-600/90 border-emerald-400 text-white font-bold ring-2 ring-emerald-400/50';
                  } else if (isSelected && !option.isSafe) {
                    btnStyle = 'bg-rose-600/90 border-rose-400 text-white font-bold ring-2 ring-rose-400/50';
                  } else {
                    btnStyle = 'bg-white/5 border-white/10 text-slate-400 opacity-60';
                  }
                }

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    disabled={isAnswered}
                    className={`p-4 sm:p-5 rounded-2xl border text-left transition-all duration-200 flex items-start gap-3.5 cursor-pointer disabled:cursor-default ${btnStyle}`}
                  >
                    <span
                      className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-[13px] shrink-0 mt-0.5 ${
                        isAnswered && option.isSafe
                          ? 'bg-white text-emerald-700'
                          : isAnswered && isSelected && !option.isSafe
                          ? 'bg-white text-rose-700'
                          : 'bg-white/15 text-white'
                      }`}
                    >
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span className="text-[13.5px] sm:text-[14px] leading-relaxed">
                      {option.text}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback Explanation (shown after selection) */}
          {isAnswered && selectedOptionIndex !== null && (
            <div className="fade-in bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                {currentQuestion.options[selectedOptionIndex].isSafe ? (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[13px] border border-emerald-400/30">
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                    <span>¡Respuesta Correcta y Segura!</span>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 font-bold text-[13px] border border-rose-400/30">
                    <span className="material-symbols-outlined text-[18px]">warning</span>
                    <span>¡Cuidado! Esta opción es peligrosa</span>
                  </div>
                )}
              </div>

              <p className="text-[13.5px] text-slate-100 leading-relaxed">
                {currentQuestion.options[selectedOptionIndex].explanation}
              </p>

              <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <a
                  href={currentQuestion.officialLearnUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[12px] font-semibold text-sky-300 hover:text-white flex items-center gap-1"
                >
                  <span>Profundizar en la fuente: {currentQuestion.officialLearnName}</span>
                  <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                </a>

                <button
                  onClick={handleNext}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#00A3E0] hover:bg-[#008ec4] text-white font-heading font-bold text-[13.5px] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <span>
                    {currentIndex + 1 < SECURITY_GAME_QUESTIONS.length ? 'Siguiente caso' : 'Ver resultado final'}
                  </span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Game Completion Screen */
        <div className="relative z-10 pt-6 flex flex-col items-center text-center gap-6 fade-in max-w-xl mx-auto">
          <div className="w-20 h-20 rounded-3xl bg-white/10 border border-white/20 flex items-center justify-center text-emerald-400 shadow-xl">
            <span className="material-symbols-outlined text-[44px]">
              {score >= 4 ? 'verified_user' : 'shield'}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-[12px] font-bold uppercase tracking-widest text-sky-300">
              Evaluación Completada
            </span>
            <h3 className="text-[26px] sm:text-[30px] font-extrabold text-white font-heading">
              Tu Puntaje: {score} de {SECURITY_GAME_QUESTIONS.length}
            </h3>
            <p className="text-[14px] sm:text-[15px] text-slate-200 leading-relaxed">
              {score === 5
                ? '¡Excelente nivel de alerta! Tienes los conocimientos clave para identificar préstamos fraudulentos, phishing, pirámides y accesos no autorizados en el Perú.'
                : score >= 3
                ? '¡Buen resultado! Reconoces la mayoría de los riesgos comunes, pero recuerda repasar los protocolos de códigos SMS y nunca compartir tus accesos con extraños.'
                : 'Es fundamental reforzar la prevención: recuerda que ningún banco formal te pedirá códigos ni transferencias anticipadas. Revisa las guías de esta sección para proteger tu dinero.'}
            </p>
          </div>

          {/* Action buttons & Official links */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center">
            <button
              onClick={handleRestart}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-[#0B3B60] font-heading font-bold text-[13.5px] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <span className="material-symbols-outlined text-[18px]">replay</span>
              <span>Volver a jugar</span>
            </button>

            <a
              href="https://www.sbs.gob.pe/usuarios/aprende-con-la-sbs/fraudes-digitales-y-telefonicos"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-heading font-semibold text-[13.5px] transition-all flex items-center justify-center gap-2"
            >
              <span>Ver guía oficial SBS</span>
              <span className="material-symbols-outlined text-[16px]">open_in_new</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
