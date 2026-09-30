import React, { useState } from 'react';
import { AdminRecommendationRule } from '../../types';

interface AdminRecommendationsTabProps {
  recommendations: AdminRecommendationRule[];
  onAddRecommendation: (rec: Omit<AdminRecommendationRule, 'id' | 'appliedCount'>) => void;
  onUpdateRecommendation: (rec: AdminRecommendationRule) => void;
  onDeleteRecommendation: (recId: string) => void;
}

export const AdminRecommendationsTab: React.FC<AdminRecommendationsTabProps> = ({
  recommendations,
  onAddRecommendation,
  onUpdateRecommendation,
  onDeleteRecommendation,
}) => {
  const [strategyFilter, setStrategyFilter] = useState<string>('Todos');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [strategyType, setStrategyType] = useState<AdminRecommendationRule['strategyType']>('Bola de Nieve');
  const [description, setDescription] = useState('');
  const [targetCondition, setTargetCondition] = useState('');
  const [impactLevel, setImpactLevel] = useState<AdminRecommendationRule['impactLevel']>('Alto');
  const [isActive, setIsActive] = useState(true);

  const filteredRecs = recommendations.filter((r) => {
    return strategyFilter === 'Todos' || r.strategyType === strategyFilter;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    onAddRecommendation({
      title: title.trim(),
      strategyType,
      description: description.trim(),
      targetCondition: targetCondition.trim() || 'General para todos los usuarios',
      impactLevel,
      isActive,
    });

    setTitle('');
    setDescription('');
    setTargetCondition('');
    setIsAddModalOpen(false);
  };

  const handleToggleActive = (rec: AdminRecommendationRule) => {
    onUpdateRecommendation({
      ...rec,
      isActive: !rec.isActive,
    });
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Header Controls */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-3 md:items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">smart_toy</span>
          </div>
          <div>
            <h3 className="font-headline-sm text-[16px] font-bold text-slate-900">
              Reglas de Asesoría y Bot IA
            </h3>
            <p className="text-[12px] text-slate-500">
              Configura las pautas financieras recomendadas por el Bot IA a los usuarios.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={strategyFilter}
            onChange={(e) => setStrategyFilter(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-slate-200 text-[13px] font-medium text-slate-700 bg-white focus:border-[#0037b0] outline-none cursor-pointer"
          >
            <option value="Todos">Todas las estrategias</option>
            <option value="Bola de Nieve">Bola de Nieve</option>
            <option value="Avalancha">Avalancha</option>
            <option value="Reprogramación">Reprogramación</option>
            <option value="Consolidación">Consolidación</option>
            <option value="Ahorro de Emergencia">Ahorro de Emergencia</option>
          </select>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-[#0037b0] hover:bg-[#002f99] active:scale-95 text-white font-label-md text-[13px] font-bold shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-all shrink-0"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>Nueva Regla</span>
          </button>
        </div>
      </div>

      {/* AI Bot Strategy Highlights Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-950 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[28px] text-blue-300">psychology</span>
          </div>
          <div>
            <h4 className="font-bold text-[15px]">Motor Inteligente de Recomendaciones</h4>
            <p className="text-[12px] text-blue-200">
              El Bot IA de Asesoramiento analiza los saldos, cuotas e ingresos para ofrecer la mejor alternativa.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-center">
          <div>
            <span className="text-[18px] font-black text-amber-300">2,060+</span>
            <span className="text-[10px] text-blue-200 block uppercase">Consejos activados</span>
          </div>
          <div className="w-px h-8 bg-white/20"></div>
          <div>
            <span className="text-[18px] font-black text-emerald-300">94.2%</span>
            <span className="text-[10px] text-blue-200 block uppercase">Satisfacción usuario</span>
          </div>
        </div>
      </div>

      {/* Recommendations Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredRecs.map((rec) => (
          <div
            key={rec.id}
            className={`bg-white p-5 rounded-2xl border transition-all ${
              rec.isActive ? 'border-slate-200 shadow-xs' : 'border-slate-200 opacity-60 bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 font-bold text-[11px]">
                {rec.strategyType}
              </span>
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                    rec.impactLevel === 'Alto'
                      ? 'bg-rose-100 text-rose-800'
                      : rec.impactLevel === 'Medio'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  Impacto {rec.impactLevel}
                </span>
                <span
                  className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    rec.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {rec.isActive ? 'Activo' : 'Pausado'}
                </span>
              </div>
            </div>

            <h4 className="font-bold text-slate-900 text-[15px] mb-1">{rec.title}</h4>
            <p className="text-[13px] text-slate-600 leading-relaxed mb-3">{rec.description}</p>

            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-[11px] text-slate-600 mb-3">
              <span className="font-bold text-slate-800">Condición de activación: </span>
              {rec.targetCondition}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px] text-[#0037b0]">tips_and_updates</span>
                Aplicado {rec.appliedCount} veces
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleActive(rec)}
                  className={`px-3 py-1 rounded-lg text-[11px] font-bold border transition-colors cursor-pointer ${
                    rec.isActive
                      ? 'border-slate-200 text-slate-700 hover:bg-slate-100'
                      : 'border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                  }`}
                >
                  {rec.isActive ? 'Pausar regla' : 'Activar regla'}
                </button>

                <button
                  onClick={() => onDeleteRecommendation(rec.id)}
                  title="Eliminar regla"
                  className="p-1 rounded-lg text-slate-400 hover:text-rose-600 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[17px]">delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-headline-sm text-[18px] font-bold text-slate-900">
                Nueva Regla de Recomendación
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="flex flex-col gap-3.5 pt-4">
              <div>
                <label className="text-[12px] font-bold text-slate-700 block mb-1">Título de la Recomendación *</label>
                <input
                  type="text"
                  required
                  placeholder="ej. Recomendar amortización extraordinaria"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-[13px] outline-none focus:border-[#0037b0]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[12px] font-bold text-slate-700 block mb-1">Tipo de Estrategia</label>
                  <select
                    value={strategyType}
                    onChange={(e) => setStrategyType(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-[13px] outline-none bg-white focus:border-[#0037b0]"
                  >
                    <option value="Bola de Nieve">Bola de Nieve</option>
                    <option value="Avalancha">Avalancha</option>
                    <option value="Reprogramación">Reprogramación</option>
                    <option value="Consolidación">Consolidación</option>
                    <option value="Ahorro de Emergencia">Ahorro de Emergencia</option>
                  </select>
                </div>
                <div>
                  <label className="text-[12px] font-bold text-slate-700 block mb-1">Nivel de Impacto</label>
                  <select
                    value={impactLevel}
                    onChange={(e) => setImpactLevel(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-[13px] outline-none bg-white focus:border-[#0037b0]"
                  >
                    <option value="Alto">Alto</option>
                    <option value="Medio">Medio</option>
                    <option value="Informativo">Informativo</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[12px] font-bold text-slate-700 block mb-1">Descripción / Sugerencia *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Texto que verá o explicará el Bot IA al usuario..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-[13px] outline-none focus:border-[#0037b0]"
                ></textarea>
              </div>

              <div>
                <label className="text-[12px] font-bold text-slate-700 block mb-1">Condición de Disparo</label>
                <input
                  type="text"
                  placeholder="ej. Usuarios con 2 deudas morosas o TEA > 40%"
                  value={targetCondition}
                  onChange={(e) => setTargetCondition(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-[13px] outline-none focus:border-[#0037b0]"
                />
              </div>

              <div className="flex gap-2.5 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-[13px] hover:bg-slate-50 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#0037b0] text-white font-bold text-[13px] hover:bg-[#002f99] shadow-xs cursor-pointer"
                >
                  Guardar Regla
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
