import React, { useState } from 'react';
import { TabType } from '../../types';
import {
  TRIVIA_QUESTIONS,
  MYTHS_LIST,
  BUDGET_CHALLENGE,
  CASE_CHALLENGE_STEPS,
  ONLINE_GAMES_PLATFORMS,
} from '../../data/playData';

interface PlayScreenProps {
  onNavigate: (tab: TabType) => void;
}

type GameMode = 'trivia' | 'mitos' | 'presupuesto' | 'caso' | 'juegos_online';

export const PlayScreen: React.FC<PlayScreenProps> = ({ onNavigate }) => {
  const [activeGame, setActiveGame] = useState<GameMode>('trivia');

  // 1. Trivia State
  const [currentTriviaIndex, setCurrentTriviaIndex] = useState(0);
  const [selectedTriviaOption, setSelectedTriviaOption] = useState<string | null>(null);
  const [triviaScore, setTriviaScore] = useState(0);
  const [triviaFinished, setTriviaFinished] = useState(false);

  // 2. Mitos State
  const [currentMythIndex, setCurrentMythIndex] = useState(0);
  const [mythAnswered, setMythAnswered] = useState<boolean | null>(null);
  const [mythScore, setMythScore] = useState(0);
  const [mythFinished, setMythFinished] = useState(false);

  // 3. Presupuesto 50/30/20 State
  const [budgetValues, setBudgetValues] = useState<{ needs: number; wants: number; savings: number }>({
    needs: 1300,
    wants: 850,
    savings: 350,
  });
  const [budgetEvaluated, setBudgetEvaluated] = useState(false);

  // 4. Caso Cuota Atrasada State
  const [caseStepIndex, setCaseStepIndex] = useState(0);
  const [selectedCaseOption, setSelectedCaseOption] = useState<string | null>(null);
  const [caseScore, setCaseScore] = useState(0);
  const [caseFinished, setCaseFinished] = useState(false);

  // Total points accumulated in the session
  const totalPlayPoints = triviaScore + mythScore + (budgetEvaluated ? 100 : 0) + caseScore;

  // Trivia Handlers
  const handleSelectTrivia = (optionId: string, isCorrect: boolean) => {
    if (selectedTriviaOption !== null) return;
    setSelectedTriviaOption(optionId);
    if (isCorrect) {
      setTriviaScore((prev) => prev + 100);
    }
  };

  const handleNextTrivia = () => {
    if (currentTriviaIndex + 1 < TRIVIA_QUESTIONS.length) {
      setCurrentTriviaIndex((prev) => prev + 1);
      setSelectedTriviaOption(null);
    } else {
      setTriviaFinished(true);
    }
  };

  const resetTrivia = () => {
    setCurrentTriviaIndex(0);
    setSelectedTriviaOption(null);
    setTriviaScore(0);
    setTriviaFinished(false);
  };

  // Mitos Handlers
  const handleMythChoice = (choice: boolean) => {
    if (mythAnswered !== null) return;
    const currentMyth = MYTHS_LIST[currentMythIndex];
    const isCorrect = choice === currentMyth.isTrue;
    setMythAnswered(choice);
    if (isCorrect) {
      setMythScore((prev) => prev + 100);
    }
  };

  const handleNextMyth = () => {
    if (currentMythIndex + 1 < MYTHS_LIST.length) {
      setCurrentMythIndex((prev) => prev + 1);
      setMythAnswered(null);
    } else {
      setMythFinished(true);
    }
  };

  const resetMyths = () => {
    setCurrentMythIndex(0);
    setMythAnswered(null);
    setMythScore(0);
    setMythFinished(false);
  };

  // Presupuesto Handlers
  const handleBudgetChange = (field: 'needs' | 'wants' | 'savings', delta: number) => {
    setBudgetValues((prev) => {
      const nextVal = Math.max(0, prev[field] + delta);
      return { ...prev, [field]: nextVal };
    });
    setBudgetEvaluated(false);
  };

  const totalAssignedBudget = budgetValues.needs + budgetValues.wants + budgetValues.savings;
  const isBudgetWithinIncome = totalAssignedBudget === BUDGET_CHALLENGE.monthlyIncome;
  const isNeedsGood = budgetValues.needs <= BUDGET_CHALLENGE.targetNeeds;
  const isWantsGood = budgetValues.wants <= BUDGET_CHALLENGE.targetWants;
  const isSavingsGood = budgetValues.savings >= BUDGET_CHALLENGE.targetSavings;
  const isBudgetBalanced = isBudgetWithinIncome && isNeedsGood && isWantsGood && isSavingsGood;

  // Caso Handlers
  const handleSelectCaseOption = (optId: string, points: number) => {
    if (selectedCaseOption !== null) return;
    setSelectedCaseOption(optId);
    setCaseScore((prev) => prev + points);
  };

  const handleNextCase = () => {
    if (caseStepIndex + 1 < CASE_CHALLENGE_STEPS.length) {
      setCaseStepIndex((prev) => prev + 1);
      setSelectedCaseOption(null);
    } else {
      setCaseFinished(true);
    }
  };

  const resetCase = () => {
    setCaseStepIndex(0);
    setSelectedCaseOption(null);
    setCaseScore(0);
    setCaseFinished(false);
  };

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto pb-14 fade-in">
      {/* ============================================================== */}
      {/* 1. HEADER DE AL DÍA PLAY                                        */}
      {/* ============================================================== */}
      <div className="bg-white rounded-3xl p-6 sm:p-9 border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex flex-col gap-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-[#EA580C] text-[12px] font-bold border border-orange-200 w-fit">
            <span className="material-symbols-outlined text-[16px]">sports_esports</span>
            <span>Aprende Jugando · AL DÍA Play</span>
          </div>

          <h1 className="text-[28px] sm:text-[34px] font-heading font-extrabold text-[#0B3B60] tracking-tight leading-tight">
            AL DÍA Play
          </h1>

          <p className="text-[14px] sm:text-[15.5px] text-slate-600 font-sans leading-relaxed">
            Pon a prueba tu criterio y aprende sobre el sistema financiero con mini-juegos ágiles: responde la trivia, desenmascara mitos legales, equilibra un presupuesto familiar y supera un caso de cuota atrasada.
          </p>

          <div className="flex items-center gap-2 pt-1 text-[12px] font-medium text-slate-500">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-[#0B3B60] border border-sky-200 font-bold">
              <span className="material-symbols-outlined text-[16px] text-[#00A3E0]">military_tech</span>
              Puntos acumulados: <span className="text-[#007EAF] font-black">{totalPlayPoints} pts</span>
            </span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">100% Pedagógico · Sin registro bancario</span>
          </div>
        </div>

        {/* Insignia visual estilo juego */}
        <div className="hidden md:flex flex-col items-center justify-center p-5 rounded-3xl bg-gradient-to-br from-[#0B3B60] to-[#082E4D] text-white text-center w-52 shrink-0 shadow-md border border-[#00A3E0]/30">
          <span className="material-symbols-outlined text-[38px] text-[#00A3E0] mb-1">
            casino
          </span>
          <span className="text-[14px] font-heading font-extrabold tracking-tight">
            Desafíos & Entretenimiento
          </span>
          <span className="text-[11px] text-sky-200 mt-0.5">
            5 Modos Disponibles
          </span>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. SELECTOR DE MODOS DE JUEGO (5 OPCIONES)                     */}
      {/* ============================================================== */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {[
          { id: 'trivia', label: '1. Trivia Financiera', icon: 'quiz', desc: 'Opción múltiple' },
          { id: 'mitos', label: '2. Mitos: ¿V o F?', icon: 'fact_check', desc: 'Verdadero o Falso' },
          { id: 'presupuesto', label: '3. Reto 50/30/20', icon: 'savings', desc: 'Presupuesto' },
          { id: 'caso', label: '4. Caso en Vivo', icon: 'explore', desc: 'Cuota atrasada' },
          { id: 'juegos_online', label: '5. Juegos en línea', icon: 'sports_esports', desc: 'Poki, CrazyGames, itch' },
        ].map((mode) => {
          const isActive = activeGame === mode.id;
          return (
            <button
              key={mode.id}
              onClick={() => setActiveGame(mode.id as GameMode)}
              className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between gap-2 ${
                isActive
                  ? 'bg-[#0B3B60] text-white border-[#0B3B60] shadow-md -translate-y-0.5'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200/90'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className="material-symbols-outlined text-[24px]"
                  style={{ color: isActive ? '#00A3E0' : '#007EAF' }}
                >
                  {mode.icon}
                </span>
                {isActive && (
                  <span className="w-2 h-2 rounded-full bg-[#00A3E0]" />
                )}
              </div>
              <div>
                <span className="text-[13px] sm:text-[13.5px] font-heading font-bold block leading-snug">
                  {mode.label}
                </span>
                <span
                  className={`text-[10.5px] sm:text-[11px] block mt-0.5 ${
                    isActive ? 'text-sky-200' : 'text-slate-400'
                  }`}
                >
                  {mode.desc}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* ============================================================== */}
      {/* 3. CONTENIDO DEL JUEGO SELECCIONADO                            */}
      {/* ============================================================== */}

      {/* JUEGO 1: TRIVIA DE OPCIÓN MÚLTIPLE */}
      {activeGame === 'trivia' && (
        <div className="bg-white rounded-3xl p-6 sm:p-9 border border-slate-200/90 shadow-xs flex flex-col gap-6 fade-in">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#007EAF]">
                Pregunta {currentTriviaIndex + 1} de {TRIVIA_QUESTIONS.length}
              </span>
              <h2 className="text-[18px] sm:text-[20px] font-heading font-bold text-[#0B3B60]">
                {TRIVIA_QUESTIONS[currentTriviaIndex].category}
              </h2>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-[#0B3B60] border border-sky-200 text-[12px] font-bold">
              <span>Puntaje:</span>
              <span className="text-[#007EAF] font-black">{triviaScore} pts</span>
            </div>
          </div>

          {!triviaFinished ? (
            <div className="flex flex-col gap-6">
              {/* Enunciado */}
              <p className="text-[16px] sm:text-[18px] font-heading font-semibold text-slate-800 leading-snug">
                {TRIVIA_QUESTIONS[currentTriviaIndex].question}
              </p>

              {/* Opciones */}
              <div className="flex flex-col gap-3">
                {TRIVIA_QUESTIONS[currentTriviaIndex].options.map((opt) => {
                  const isSelected = selectedTriviaOption === opt.id;
                  const showResult = selectedTriviaOption !== null;

                  let btnStyle = 'bg-slate-50/80 hover:bg-slate-100 border-slate-200 text-slate-700';
                  if (showResult) {
                    if (opt.isCorrect) {
                      btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold';
                    } else if (isSelected && !opt.isCorrect) {
                      btnStyle = 'bg-rose-50 border-rose-400 text-rose-950';
                    }
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectTrivia(opt.id, opt.isCorrect)}
                      disabled={showResult}
                      className={`p-4 rounded-2xl border text-left text-[14px] font-sans transition-all flex items-start gap-3 cursor-pointer ${btnStyle}`}
                    >
                      <span className="w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[12px] font-bold shrink-0 mt-0.5">
                        {opt.id.toUpperCase()}
                      </span>
                      <span className="leading-snug">{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explicación didáctica tras responder */}
              {selectedTriviaOption !== null && (
                <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 text-slate-800 text-[13px] leading-relaxed flex flex-col gap-1.5 fade-in">
                  <span className="font-bold text-[#0B3B60] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[17px] text-[#00A3E0]">lightbulb</span>
                    <span>Explicación didáctica:</span>
                  </span>
                  <p>{TRIVIA_QUESTIONS[currentTriviaIndex].explanation}</p>
                  <span className="text-[11px] text-slate-500 mt-1">
                    Fuente oficial: {TRIVIA_QUESTIONS[currentTriviaIndex].source}
                  </span>
                </div>
              )}

              {/* Botón Siguiente */}
              {selectedTriviaOption !== null && (
                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleNextTrivia}
                    className="px-6 py-3 rounded-xl bg-[#0B3B60] hover:bg-[#082E4D] text-white font-heading font-semibold text-[14px] transition-all flex items-center gap-2 cursor-pointer shadow-xs"
                  >
                    <span>
                      {currentTriviaIndex + 1 < TRIVIA_QUESTIONS.length
                        ? 'Siguiente pregunta'
                        : 'Ver resultados finales'}
                    </span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Resultados de Trivia */
            <div className="flex flex-col items-center justify-center text-center p-6 gap-4 fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-[36px]">emoji_events</span>
              </div>
              <h3 className="text-[22px] font-heading font-extrabold text-[#0B3B60]">
                ¡Completaste la Trivia Financiera!
              </h3>
              <p className="text-[15px] text-slate-600 max-w-md">
                Obtuviste <strong className="text-[#0B3B60]">{triviaScore} puntos</strong> de un total de {TRIVIA_QUESTIONS.length * 100} posibles.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={resetTrivia}
                  className="px-6 py-3 rounded-xl bg-[#0B3B60] hover:bg-[#082E4D] text-white font-heading font-semibold text-[13.5px] cursor-pointer shadow-xs"
                >
                  Volver a jugar
                </button>
                <button
                  onClick={() => setActiveGame('mitos')}
                  className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0B3B60] font-heading font-semibold text-[13.5px] cursor-pointer"
                >
                  Probar Mitos (V o F)
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* JUEGO 2: VERDADERO O FALSO: MITOS FINANCIEROS */}
      {activeGame === 'mitos' && (
        <div className="bg-white rounded-3xl p-6 sm:p-9 border border-slate-200/90 shadow-xs flex flex-col gap-6 fade-in">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#007EAF]">
                Mito {currentMythIndex + 1} de {MYTHS_LIST.length}
              </span>
              <h2 className="text-[18px] sm:text-[20px] font-heading font-bold text-[#0B3B60]">
                ¿Verdad o Mito Legal?
              </h2>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-[#0B3B60] border border-sky-200 text-[12px] font-bold">
              <span>Puntaje:</span>
              <span className="text-[#007EAF] font-black">{mythScore} pts</span>
            </div>
          </div>

          {!mythFinished ? (
            <div className="flex flex-col gap-6">
              {/* Tarjeta con afirmación grande */}
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 text-center flex flex-col items-center justify-center gap-3">
                <span className="material-symbols-outlined text-[36px] text-[#007EAF]">
                  help_outline
                </span>
                <p className="text-[18px] sm:text-[21px] font-heading font-bold text-slate-800 leading-snug max-w-xl">
                  “{MYTHS_LIST[currentMythIndex].statement}”
                </p>
                <span className="text-[12px] text-slate-400">
                  ¿Esto es verdadero o falso según la ley peruana?
                </span>
              </div>

              {/* Botones de respuesta */}
              {mythAnswered === null && (
                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto w-full">
                  <button
                    onClick={() => handleMythChoice(true)}
                    className="p-4 rounded-2xl bg-emerald-50 hover:bg-emerald-100/80 border-2 border-emerald-300 text-emerald-800 font-heading font-bold text-[16px] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-95"
                  >
                    <span className="material-symbols-outlined text-[22px]">check_circle</span>
                    <span>Verdadero</span>
                  </button>

                  <button
                    onClick={() => handleMythChoice(false)}
                    className="p-4 rounded-2xl bg-rose-50 hover:bg-rose-100/80 border-2 border-rose-300 text-rose-800 font-heading font-bold text-[16px] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-95"
                  >
                    <span className="material-symbols-outlined text-[22px]">cancel</span>
                    <span>Falso</span>
                  </button>
                </div>
              )}

              {/* Feedback del Mito */}
              {mythAnswered !== null && (
                <div
                  className={`p-5 rounded-2xl border text-[13.5px] leading-relaxed flex flex-col gap-2 fade-in ${
                    mythAnswered === MYTHS_LIST[currentMythIndex].isTrue
                      ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                      : 'bg-rose-50/80 border-rose-300 text-rose-950'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-[15px]">
                    <span className="material-symbols-outlined text-[20px]">
                      {mythAnswered === MYTHS_LIST[currentMythIndex].isTrue
                        ? 'verified'
                        : 'error_outline'}
                    </span>
                    <span>
                      {mythAnswered === MYTHS_LIST[currentMythIndex].isTrue
                        ? '¡Acertaste! Excelente conocimiento legal.'
                        : '¡Ojo con este dato! No te dejes engañar.'}
                    </span>
                  </div>
                  <p>{MYTHS_LIST[currentMythIndex].explanation}</p>
                  <span className="text-[11.5px] font-bold mt-1 text-slate-600">
                    Base legal: {MYTHS_LIST[currentMythIndex].legalBasis}
                  </span>
                </div>
              )}

              {/* Botón Siguiente Mito */}
              {mythAnswered !== null && (
                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleNextMyth}
                    className="px-6 py-3 rounded-xl bg-[#0B3B60] hover:bg-[#082E4D] text-white font-heading font-semibold text-[14px] transition-all flex items-center gap-2 cursor-pointer shadow-xs"
                  >
                    <span>
                      {currentMythIndex + 1 < MYTHS_LIST.length
                        ? 'Siguiente afirmación'
                        : 'Ver resultados finales'}
                    </span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Resultados de Mitos */
            <div className="flex flex-col items-center justify-center text-center p-6 gap-4 fade-in">
              <div className="w-16 h-16 rounded-full bg-sky-100 text-[#007EAF] flex items-center justify-center">
                <span className="material-symbols-outlined text-[36px]">verified</span>
              </div>
              <h3 className="text-[22px] font-heading font-extrabold text-[#0B3B60]">
                ¡Completaste el Desafío de Mitos!
              </h3>
              <p className="text-[15px] text-slate-600 max-w-md">
                Puntaje obtenido: <strong className="text-[#0B3B60]">{mythScore} puntos</strong> de {MYTHS_LIST.length * 100} posibles.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={resetMyths}
                  className="px-6 py-3 rounded-xl bg-[#0B3B60] hover:bg-[#082E4D] text-white font-heading font-semibold text-[13.5px] cursor-pointer shadow-xs"
                >
                  Volver a jugar
                </button>
                <button
                  onClick={() => setActiveGame('presupuesto')}
                  className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0B3B60] font-heading font-semibold text-[13.5px] cursor-pointer"
                >
                  Probar Reto 50/30/20
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* JUEGO 3: RETO DEL PRESUPUESTO 50/30/20 */}
      {activeGame === 'presupuesto' && (
        <div className="bg-white rounded-3xl p-6 sm:p-9 border border-slate-200/90 shadow-xs flex flex-col gap-6 fade-in">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#007EAF]">
                Simulador Dinámico de Presupuesto
              </span>
              <h2 className="text-[18px] sm:text-[20px] font-heading font-bold text-[#0B3B60]">
                Equilibra un Ingreso Mensual de S/ {BUDGET_CHALLENGE.monthlyIncome.toLocaleString()}
              </h2>
            </div>
            <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
              Regla Financiera 50 / 30 / 20
            </span>
          </div>

          <p className="text-[13.5px] text-slate-600 leading-relaxed">
            Ajusta los montos de cada bloque para cumplir la meta saludable: máximo 50% en Necesidades Básicas (S/ 1,250), máximo 30% en Deseos (S/ 750) y al menos 20% en Ahorro y Respaldo (S/ 500).
          </p>

          {/* Tres Bloques de Ajuste */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Bloque Necesidades */}
            <div className="p-5 rounded-2xl bg-sky-50/70 border border-sky-200 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-heading font-bold text-[#0B3B60]">
                  1. Necesidades (50%)
                </span>
                <span className="text-[11px] font-semibold text-slate-500">Máx S/ 1,250</span>
              </div>
              <div className="text-[24px] font-heading font-black text-[#0B3B60]">
                S/ {budgetValues.needs}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleBudgetChange('needs', -50)}
                  className="flex-1 py-1.5 rounded-lg bg-white border border-slate-200 font-bold hover:bg-slate-50 cursor-pointer text-[14px]"
                >
                  - S/ 50
                </button>
                <button
                  onClick={() => handleBudgetChange('needs', 50)}
                  className="flex-1 py-1.5 rounded-lg bg-white border border-slate-200 font-bold hover:bg-slate-50 cursor-pointer text-[14px]"
                >
                  + S/ 50
                </button>
              </div>
              <span className="text-[11px] text-slate-500">Alquiler, comida, luz, agua y transporte.</span>
            </div>

            {/* Bloque Deseos */}
            <div className="p-5 rounded-2xl bg-purple-50/70 border border-purple-200 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-heading font-bold text-purple-900">
                  2. Deseos (30%)
                </span>
                <span className="text-[11px] font-semibold text-slate-500">Máx S/ 750</span>
              </div>
              <div className="text-[24px] font-heading font-black text-purple-950">
                S/ {budgetValues.wants}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleBudgetChange('wants', -50)}
                  className="flex-1 py-1.5 rounded-lg bg-white border border-slate-200 font-bold hover:bg-slate-50 cursor-pointer text-[14px]"
                >
                  - S/ 50
                </button>
                <button
                  onClick={() => handleBudgetChange('wants', 50)}
                  className="flex-1 py-1.5 rounded-lg bg-white border border-slate-200 font-bold hover:bg-slate-50 cursor-pointer text-[14px]"
                >
                  + S/ 50
                </button>
              </div>
              <span className="text-[11px] text-slate-500">Salidas, ropa no urgente y gustos.</span>
            </div>

            {/* Bloque Ahorro */}
            <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-heading font-bold text-emerald-900">
                  3. Ahorro (20%)
                </span>
                <span className="text-[11px] font-semibold text-slate-500">Mín S/ 500</span>
              </div>
              <div className="text-[24px] font-heading font-black text-emerald-950">
                S/ {budgetValues.savings}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleBudgetChange('savings', -50)}
                  className="flex-1 py-1.5 rounded-lg bg-white border border-slate-200 font-bold hover:bg-slate-50 cursor-pointer text-[14px]"
                >
                  - S/ 50
                </button>
                <button
                  onClick={() => handleBudgetChange('savings', 50)}
                  className="flex-1 py-1.5 rounded-lg bg-white border border-slate-200 font-bold hover:bg-slate-50 cursor-pointer text-[14px]"
                >
                  + S/ 50
                </button>
              </div>
              <span className="text-[11px] text-slate-500">Fondo de emergencia o amortizar cuota.</span>
            </div>
          </div>

          {/* Barra de balance total */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <span className="text-[12px] font-bold text-slate-500 block">Total distribuido:</span>
              <span className="text-[18px] font-heading font-extrabold text-[#0B3B60]">
                S/ {totalAssignedBudget.toLocaleString()} / S/ {BUDGET_CHALLENGE.monthlyIncome.toLocaleString()}
              </span>
            </div>

            <button
              onClick={() => setBudgetEvaluated(true)}
              className="px-6 py-2.5 rounded-xl bg-[#0B3B60] hover:bg-[#082E4D] text-white font-heading font-semibold text-[13px] cursor-pointer shadow-xs"
            >
              Evaluar mi presupuesto
            </button>
          </div>

          {/* Feedback de Evaluación */}
          {budgetEvaluated && (
            <div
              className={`p-5 rounded-2xl border text-[13.5px] leading-relaxed flex items-start gap-3 fade-in ${
                isBudgetBalanced
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-amber-50 border-amber-300 text-amber-950'
              }`}
            >
              <span className="material-symbols-outlined text-[24px] shrink-0 mt-0.5">
                {isBudgetBalanced ? 'verified' : 'warning'}
              </span>
              <div>
                <strong className="block text-[15px] font-bold mb-1">
                  {isBudgetBalanced
                    ? '¡Presupuesto Perfecto! Ganaste 100 puntos.'
                    : 'Aún no está equilibrado según la regla 50/30/20:'}
                </strong>
                {isBudgetBalanced ? (
                  <p>
                    Cumples exactamente con destinar máximo 50% a necesidades, controlar los gustos al 30% y asegurar al menos 20% para tu fondo de imprevistos. Esta es la clave para evitar atrasos.
                  </p>
                ) : (
                  <ul className="list-disc pl-4 space-y-1">
                    {!isBudgetWithinIncome && (
                      <li>
                        El total debe sumar exactamente S/ 2,500 (ahora suma S/ {totalAssignedBudget}).
                      </li>
                    )}
                    {!isNeedsGood && (
                      <li>Tus necesidades (S/ {budgetValues.needs}) superan el tope del 50% (S/ 1,250).</li>
                    )}
                    {!isWantsGood && (
                      <li>Tus gastos en gustos (S/ {budgetValues.wants}) superan el 30% (S/ 750).</li>
                    )}
                    {!isSavingsGood && (
                      <li>Tu ahorro (S/ {budgetValues.savings}) es menor al 20% mínimo (S/ 500).</li>
                    )}
                  </ul>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* JUEGO 4: SIMULADOR DE CASO: CUOTA ATRASADA */}
      {activeGame === 'caso' && (
        <div className="bg-white rounded-3xl p-6 sm:p-9 border border-slate-200/90 shadow-xs flex flex-col gap-6 fade-in">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#007EAF]">
                Simulador de Decisiones Reales
              </span>
              <h2 className="text-[18px] sm:text-[20px] font-heading font-bold text-[#0B3B60]">
                {CASE_CHALLENGE_STEPS[caseStepIndex].stageTitle}
              </h2>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-[#0B3B60] border border-sky-200 text-[12px] font-bold">
              <span>Puntos de caso:</span>
              <span className="text-[#007EAF] font-black">{caseScore} pts</span>
            </div>
          </div>

          {!caseFinished ? (
            <div className="flex flex-col gap-6">
              {/* Escenario */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-[14.5px] leading-relaxed">
                {CASE_CHALLENGE_STEPS[caseStepIndex].scenario}
              </div>

              {/* Opciones de Decisión */}
              <div className="flex flex-col gap-3">
                <span className="text-[13px] font-bold text-[#0B3B60]">
                  ¿Qué decisión tomas como consumidor responsable?
                </span>
                {CASE_CHALLENGE_STEPS[caseStepIndex].options.map((opt) => {
                  const isSelected = selectedCaseOption === opt.id;
                  const showResult = selectedCaseOption !== null;

                  let style = 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200';
                  if (showResult) {
                    if (opt.isOptimal) {
                      style = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold';
                    } else if (isSelected && !opt.isOptimal) {
                      style = 'bg-rose-50 border-rose-300 text-rose-950';
                    }
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectCaseOption(opt.id, opt.points)}
                      disabled={showResult}
                      className={`p-4 rounded-2xl border text-left text-[13.5px] transition-all flex items-start gap-3 cursor-pointer ${style}`}
                    >
                      <span className="material-symbols-outlined text-[20px] shrink-0 mt-0.5 text-slate-400">
                        {showResult && opt.isOptimal ? 'check_circle' : 'touch_app'}
                      </span>
                      <span className="leading-snug">{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* Feedback de la opción seleccionada */}
              {selectedCaseOption !== null && (
                <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 text-[13px] leading-relaxed flex flex-col gap-1 fade-in">
                  <span className="font-bold text-[#0B3B60] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[17px] text-[#00A3E0]">school</span>
                    <span>Análisis pedagógico AL DÍA:</span>
                  </span>
                  <p>
                    {
                      CASE_CHALLENGE_STEPS[caseStepIndex].options.find(
                        (o) => o.id === selectedCaseOption
                      )?.feedback
                    }
                  </p>
                </div>
              )}

              {/* Botón Siguiente Paso */}
              {selectedCaseOption !== null && (
                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleNextCase}
                    className="px-6 py-3 rounded-xl bg-[#0B3B60] hover:bg-[#082E4D] text-white font-heading font-semibold text-[14px] transition-all flex items-center gap-2 cursor-pointer shadow-xs"
                  >
                    <span>
                      {caseStepIndex + 1 < CASE_CHALLENGE_STEPS.length
                        ? 'Siguiente paso'
                        : 'Ver resolución final'}
                    </span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Resolución Final del Caso */
            <div className="flex flex-col items-center justify-center text-center p-6 gap-4 fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-[36px]">psychology</span>
              </div>
              <h3 className="text-[22px] font-heading font-extrabold text-[#0B3B60]">
                ¡Completaste el Simulador de Cuota Atrasada!
              </h3>
              <p className="text-[14.5px] text-slate-600 max-w-lg leading-relaxed">
                Has aprendido la importancia de la comunicación anticipada con la entidad financiera, evitar endeudamientos informales y exigir siempre cronogramas formales con la TCEA.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={resetCase}
                  className="px-6 py-3 rounded-xl bg-[#0B3B60] hover:bg-[#082E4D] text-white font-heading font-semibold text-[13.5px] cursor-pointer shadow-xs"
                >
                  Volver a simular
                </button>
                <button
                  onClick={() => onNavigate('videos')}
                  className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0B3B60] font-heading font-semibold text-[13.5px] cursor-pointer"
                >
                  Ver Videos Explicativos
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* JUEGO 5: JUEGOS EN LÍNEA (PLATAFORMAS WEB EXTERNAS)             */}
      {/* ============================================================== */}
      {activeGame === 'juegos_online' && (
        <div className="flex flex-col gap-6 fade-in">
          {/* Encabezado descriptivo y aviso legal transparente */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col gap-4 text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-[#007EAF] text-[11.5px] font-bold border border-sky-200 mb-1.5">
                  <span className="material-symbols-outlined text-[15px]">sports_esports</span>
                  <span>Entretenimiento Web en Navegador</span>
                </div>
                <h2 className="text-[22px] sm:text-[26px] font-heading font-extrabold text-[#0B3B60] tracking-tight">
                  Juegos en línea
                </h2>
                <p className="text-[13.5px] sm:text-[14.5px] text-slate-600 font-sans mt-0.5 max-w-2xl">
                  Accede a plataformas reconocidas de videojuegos web casuales, lógicos y comunitarios. Cada juego se ejecuta directamente en tu navegador sin requerir descargas.
                </p>
              </div>

              <div className="self-start sm:self-center px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-700 text-[12px] font-medium flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>3 Plataformas oficiales</span>
              </div>
            </div>

            {/* Aviso transparente sobre plataformas externas */}
            <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-200/80 text-[12.5px] text-[#0B3B60] flex items-start gap-3 leading-relaxed">
              <span className="material-symbols-outlined text-[20px] text-[#00A3E0] shrink-0 mt-0.5">
                info
              </span>
              <div>
                <strong className="block font-heading font-bold text-[#0B3B60] mb-0.5">
                  Aviso sobre plataformas y enlaces externos:
                </strong>
                <span>
                  Los botones <strong>«Jugar ahora»</strong> abrirán los sitios oficiales de <strong>Poki</strong>, <strong>CrazyGames</strong> e <strong>itch.io</strong> en una nueva pestaña del navegador. Estos juegos no están alojados dentro de los servidores de AL DÍA. Cada plataforma posee sus propios términos de servicio, políticas de privacidad, anuncios publicitarios y filtros de contenido. Te sugerimos revisar las condiciones de uso y acompañar a menores de edad durante su navegación.
                </span>
              </div>
            </div>
          </div>

          {/* Grid con las 3 Tarjetas Oficiales */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ONLINE_GAMES_PLATFORMS.map((game) => (
              <div
                key={game.id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-[#00A3E0] transition-all duration-300 overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Imagen de la plataforma */}
                  <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-100">
                    <img
                      src={game.image}
                      alt={`Plataforma de juegos ${game.name}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <span
                      className={`absolute top-3.5 left-3.5 px-3 py-1 rounded-full text-[11px] font-bold border backdrop-blur-md shadow-xs ${game.badgeColor}`}
                    >
                      {game.categoryTag}
                    </span>
                    <span className="absolute bottom-3 left-3 text-white text-[11px] font-medium flex items-center gap-1 drop-shadow-xs">
                      <span className="material-symbols-outlined text-[14px] text-[#00A3E0]">
                        language
                      </span>
                      <span>Sitio oficial externo</span>
                    </span>
                  </div>

                  {/* Información textual */}
                  <div className="p-5 sm:p-6 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-[20px] font-heading font-bold text-[#0B3B60] group-hover:text-[#007EAF] transition-colors">
                        {game.name}
                      </h3>
                      <span className="material-symbols-outlined text-slate-400 group-hover:text-[#00A3E0] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[20px]">
                        open_in_new
                      </span>
                    </div>

                    <p className="text-[13px] text-slate-600 font-sans leading-relaxed">
                      {game.description}
                    </p>

                    {/* Tags destacados */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {game.highlights.map((h, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-600 text-[11px] font-medium"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Botón Jugar ahora */}
                <div className="p-5 sm:p-6 pt-0">
                  <a
                    href={game.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-[#0B3B60] hover:bg-[#082E4D] active:scale-[0.98] text-white font-heading font-semibold text-[13.5px] transition-all flex items-center justify-center gap-2 shadow-xs group-hover:shadow-md cursor-pointer"
                    title={`Abrir ${game.name} en una nueva pestaña (${game.url})`}
                  >
                    <span className="material-symbols-outlined text-[18px] text-[#00A3E0]">
                      play_circle
                    </span>
                    <span>Jugar ahora</span>
                    <span className="material-symbols-outlined text-[15px] opacity-70">
                      open_in_new
                    </span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Información complementaria de seguridad */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 text-slate-500 text-[12px] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-slate-400">
                verified_user
              </span>
              <span>Todos los enlaces conducen a las URL oficiales y seguras HTTPS de cada plataforma.</span>
            </div>
            <button
              onClick={() => setActiveGame('trivia')}
              className="text-[#007EAF] hover:text-[#0B3B60] font-heading font-semibold text-[12.5px] cursor-pointer inline-flex items-center gap-1 shrink-0"
            >
              <span>Volver a la Trivia Financiera</span>
              <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
            </button>
          </div>
        </div>
      )}

      {/* Banner al reto ¿Es una estafa? */}
      <div className="bg-gradient-to-r from-sky-50 via-blue-50 to-sky-50 rounded-3xl p-5 sm:p-6 border border-sky-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#0B3B60] text-white flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[24px] text-[#00A3E0]">crisis_alert</span>
          </div>
          <div>
            <h4 className="text-[15px] font-heading font-bold text-[#0B3B60]">
              Nuevo Reto: ¿Es una Estafa o una Operación Segura?
            </h4>
            <p className="text-[12.5px] text-slate-600 font-sans">
              Evalúa 5 casos cotidianos de préstamos fraudulentos, phishing y llamadas falsas en el Centro de Seguridad.
            </p>
          </div>
        </div>
        <button
          onClick={() => onNavigate('seguridad')}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#0B3B60] hover:bg-[#082E4D] text-white font-heading font-semibold text-[13px] flex items-center justify-center gap-2 cursor-pointer shadow-xs shrink-0"
        >
          <span>Ir al Centro de Seguridad</span>
          <span className="material-symbols-outlined text-[16px] text-[#00A3E0]">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};
