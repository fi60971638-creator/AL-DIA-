import React, { useState } from 'react';
import { TabType } from '../../types';
import {
  SECURITY_TOPICS,
  SecurityTopic,
  OFFICIAL_HELP_CHANNELS,
  OfficialHelpChannel
} from '../../data/securityData';
import { SecurityTopicModal } from '../modals/SecurityTopicModal';
import { SecurityGame } from '../security/SecurityGame';
import coverImg from '../../assets/images/seguridad_financiera_peru_1792456729584.jpg';

interface CentroSeguridadScreenProps {
  onNavigate: (tab: TabType) => void;
}

export const CentroSeguridadScreen: React.FC<CentroSeguridadScreenProps> = ({ onNavigate }) => {
  const [selectedTopic, setSelectedTopic] = useState<SecurityTopic | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('TODOS');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    'TODOS',
    'Estafas y fraudes',
    'Protección de cuentas',
    'Seguridad en canales',
    'Canales y denuncias'
  ];

  const filteredTopics = SECURITY_TOPICS.filter((t) => {
    const matchCategory =
      selectedCategory === 'TODOS' || t.category.toLowerCase() === selectedCategory.toLowerCase();
    const q = searchTerm.toLowerCase().trim();
    const matchSearch =
      !q ||
      t.title.toLowerCase().includes(q) ||
      t.shortDesc.toLowerCase().includes(q) ||
      t.keyRule.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q);
    return matchCategory && matchSearch;
  });

  const scrollToSection = (elementId: string) => {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleQuickAccess = (type: 'estafas' | 'cuentas' | 'ayuda') => {
    if (type === 'estafas') {
      setSelectedCategory('Estafas y fraudes');
      scrollToSection('tarjetas-seguridad');
    } else if (type === 'cuentas') {
      setSelectedCategory('Protección de cuentas');
      scrollToSection('tarjetas-seguridad');
    } else if (type === 'ayuda') {
      scrollToSection('necesito-ayuda');
    }
  };

  return (
    <div className="flex flex-col gap-10 max-w-6xl mx-auto pb-14 fade-in">
      {/* Modal de Detalle Completo de Seguridad */}
      <SecurityTopicModal topic={selectedTopic} onClose={() => setSelectedTopic(null)} />

      {/* ============================================================== */}
      {/* 1. PORTADA DEL CENTRO DE SEGURIDAD                             */}
      {/* ============================================================== */}
      <section className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col md:flex-row text-left">
        {/* Imagen realista peruana */}
        <div className="w-full md:w-1/2 relative aspect-[16/10] md:aspect-auto overflow-hidden bg-slate-100 min-h-[260px] md:min-h-[360px]">
          <img
            src={coverImg}
            alt="Personas en el Perú utilizando teléfonos móviles con precaución y revisando seguridad financiera digital"
            className="w-full h-full object-cover"
            loading="eager"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
            <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#0B3B60]/90 backdrop-blur-md border border-white/20 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[15px] text-[#00A3E0]">verified_user</span>
              <span>Prevención y Alerta Digital · Perú</span>
            </span>
          </div>
        </div>

        {/* Textos y Accesos Rápidos */}
        <div className="w-full md:w-1/2 p-6 sm:p-9 flex flex-col justify-between gap-6">
          <div className="flex flex-col gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-[#0B3B60] text-[12px] font-bold border border-sky-200 w-fit">
              <span className="material-symbols-outlined text-[16px] text-[#00A3E0]">shield</span>
              <span>Centro de Seguridad Financiera</span>
            </div>

            <h1 className="text-[26px] sm:text-[32px] font-extrabold text-[#0B3B60] tracking-tight leading-snug font-heading">
              Protege tu dinero. Aprende a reconocer los riesgos.
            </h1>

            <p className="text-[14px] sm:text-[15px] text-slate-600 leading-relaxed font-sans">
              Identifica ofertas falsas, protege tus cuentas y conoce dónde pedir ayuda ante préstamos fraudulentos, suplantaciones y modalidades de engaño en el Perú.
            </p>
          </div>

          {/* Tres accesos rápidos */}
          <div className="flex flex-col gap-2.5">
            <span className="text-[11.5px] font-bold uppercase tracking-wider text-slate-400">
              Accesos inmediatos
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                onClick={() => handleQuickAccess('estafas')}
                className="p-3 rounded-2xl bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-[#00A3E0] text-left transition-all flex flex-col gap-1 cursor-pointer group shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <span className="material-symbols-outlined text-[20px] text-rose-600">
                    crisis_alert
                  </span>
                  <span className="material-symbols-outlined text-[15px] text-slate-400 group-hover:translate-x-0.5 group-hover:text-[#00A3E0] transition-transform">
                    arrow_forward
                  </span>
                </div>
                <span className="text-[12.5px] font-bold font-heading text-[#0B3B60] group-hover:text-[#007EAF] transition-colors">
                  Reconocer una estafa
                </span>
                <span className="text-[11px] text-slate-500 font-sans leading-tight">
                  Préstamos y enlaces falsos
                </span>
              </button>

              <button
                onClick={() => handleQuickAccess('cuentas')}
                className="p-3 rounded-2xl bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-[#00A3E0] text-left transition-all flex flex-col gap-1 cursor-pointer group shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <span className="material-symbols-outlined text-[20px] text-[#00A3E0]">
                    lock
                  </span>
                  <span className="material-symbols-outlined text-[15px] text-slate-400 group-hover:translate-x-0.5 group-hover:text-[#00A3E0] transition-transform">
                    arrow_forward
                  </span>
                </div>
                <span className="text-[12.5px] font-bold font-heading text-[#0B3B60] group-hover:text-[#007EAF] transition-colors">
                  Proteger mis cuentas
                </span>
                <span className="text-[11px] text-slate-500 font-sans leading-tight">
                  Claves, tokens y celular
                </span>
              </button>

              <button
                onClick={() => handleQuickAccess('ayuda')}
                className="p-3 rounded-2xl bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-[#00A3E0] text-left transition-all flex flex-col gap-1 cursor-pointer group shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <span className="material-symbols-outlined text-[20px] text-emerald-600">
                    support_agent
                  </span>
                  <span className="material-symbols-outlined text-[15px] text-slate-400 group-hover:translate-x-0.5 group-hover:text-[#00A3E0] transition-transform">
                    arrow_forward
                  </span>
                </div>
                <span className="text-[12.5px] font-bold font-heading text-[#0B3B60] group-hover:text-[#007EAF] transition-colors">
                  Necesito ayuda
                </span>
                <span className="text-[11px] text-slate-500 font-sans leading-tight">
                  SBS, Indecopi y PNP
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. TARJETAS EDUCATIVAS (10 TEMAS COMPLETOS)                    */}
      {/* ============================================================== */}
      <section id="tarjetas-seguridad" className="flex flex-col gap-6 text-left scroll-mt-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#0B3B60] text-[11.5px] font-bold border border-blue-200 mb-1.5">
              <span className="material-symbols-outlined text-[15px] text-[#00A3E0]">checklist</span>
              <span>10 Temas Fundamentales</span>
            </div>
            <h2 className="text-[22px] sm:text-[26px] font-extrabold text-[#0B3B60] tracking-tight font-heading">
              Guías Rápidas de Seguridad y Prevención
            </h2>
            <p className="text-[13.5px] text-slate-500 font-sans mt-0.5">
              Aprende a protegerte en cada situación con señales de alerta tempranas y protocolos verificados
            </p>
          </div>

          {/* Enlace directo al juego */}
          <button
            onClick={() => scrollToSection('juego-seguridad')}
            className="self-start sm:self-auto px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-[#0B3B60] border border-slate-200 hover:border-[#00A3E0] font-heading font-semibold text-[13px] transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer group"
          >
            <span className="material-symbols-outlined text-[16px] text-[#00A3E0]">sports_esports</span>
            <span>Jugar: ¿Es una estafa?</span>
          </button>
        </div>

        {/* Buscador y Categorías */}
        <div className="flex flex-col gap-3.5">
          <div className="relative w-full max-w-md">
            <span className="material-symbols-outlined absolute left-3.5 top-2.5 text-slate-400 text-[18px]">
              search
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar tema (préstamo, SMS, token, cajero, pirámide...)"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 placeholder-slate-400 text-[14px] focus:outline-none focus:border-[#00A3E0] shadow-2xs"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            )}
          </div>

          {/* Chips de Categorías */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-[12px] font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#0B3B60] text-white shadow-xs'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                {cat === 'TODOS' ? 'Todos los temas' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de 10 Tarjetas */}
        {filteredTopics.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 flex flex-col items-center justify-center gap-2">
            <span className="material-symbols-outlined text-[44px] text-slate-300">search_off</span>
            <h3 className="text-[16px] font-bold text-[#0B3B60]">
              No encontramos temas para "{searchTerm}"
            </h3>
            <p className="text-[13px] text-slate-500">
              Prueba buscando por clave, gota a gota, cajero o selecciona otra categoría.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('TODOS');
              }}
              className="mt-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0B3B60] text-[12.5px] font-bold cursor-pointer"
            >
              Ver todos los temas
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTopics.map((topic) => (
              <div
                key={topic.id}
                onClick={() => setSelectedTopic(topic)}
                className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs hover:shadow-lg hover:border-[#00A3E0] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between gap-5 text-left cursor-pointer group"
              >
                <div className="flex flex-col gap-3">
                  {/* Top Bar with Icon and Badge */}
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-sky-50 text-[#007EAF] border border-sky-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <span className="material-symbols-outlined text-[22px]">
                        {topic.icon}
                      </span>
                    </div>

                    <span className={`px-2.5 py-0.5 rounded-full text-[10.5px] font-bold border ${topic.badgeColor}`}>
                      {topic.badge}
                    </span>
                  </div>

                  {/* Title & Short Description */}
                  <h3 className="text-[16px] font-bold text-[#0B3B60] leading-snug font-heading group-hover:text-[#007EAF] transition-colors">
                    {topic.title}
                  </h3>

                  <p className="text-[12.5px] text-slate-600 line-clamp-3 leading-relaxed">
                    {topic.shortDesc}
                  </p>

                  {/* Regla de Oro Preview */}
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-150 text-[11.5px] text-slate-700 flex items-start gap-2">
                    <span className="material-symbols-outlined text-[15px] text-[#00A3E0] shrink-0 mt-0.5">
                      shield
                    </span>
                    <span className="leading-snug line-clamp-2">
                      <strong className="text-[#0B3B60]">Regla clave:</strong> {topic.keyRule}
                    </span>
                  </div>
                </div>

                {/* Footer with Button */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px] text-emerald-600">verified</span>
                    <span>aldia Seguro</span>
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedTopic(topic);
                    }}
                    className="inline-flex items-center gap-1 text-[13px] font-bold text-[#0B3B60] group-hover:text-[#007EAF] transition-colors cursor-pointer"
                  >
                    <span>Ver recomendaciones</span>
                    <span className="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">
                      arrow_forward
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ============================================================== */}
      {/* 3. JUEGO INTERACTIVO “¿ES UNA ESTAFA?”                         */}
      {/* ============================================================== */}
      <SecurityGame />

      {/* ============================================================== */}
      {/* 4. SECCIÓN “NECESITO AYUDA”                                    */}
      {/* ============================================================== */}
      <section id="necesito-ayuda" className="flex flex-col gap-6 text-left scroll-mt-20">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11.5px] font-bold border border-emerald-200 mb-1.5">
            <span className="material-symbols-outlined text-[15px] text-emerald-600">support_agent</span>
            <span>Orientación y Canales Oficiales en el Perú</span>
          </div>
          <h2 className="text-[22px] sm:text-[26px] font-extrabold text-[#0B3B60] tracking-tight font-heading">
            ¿Dónde Pedir Ayuda y Cómo Denunciar?
          </h2>
          <p className="text-[13.5px] text-slate-500 font-sans mt-0.5 max-w-3xl">
            Identifica el organismo competente del Estado peruano según tu situación y conoce qué pruebas conservar antes de presentar tu reclamo o denuncia.
          </p>
        </div>

        {/* 3 Tarjetas de Organismos Oficiales */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {OFFICIAL_HELP_CHANNELS.map((channel) => (
            <div
              key={channel.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between gap-5"
            >
              <div className="flex flex-col gap-3.5">
                {/* Header card */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-2xl bg-[#0B3B60] text-white flex items-center justify-center font-bold text-[14px] font-heading shadow-xs">
                      {channel.name.slice(0, 3)}
                    </div>
                    <div>
                      <h3 className="text-[17px] font-bold text-[#0B3B60] font-heading leading-tight">
                        {channel.name}
                      </h3>
                      <span className="text-[11px] font-medium text-slate-400 block leading-tight">
                        {channel.badge}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-[12.5px] text-slate-600 leading-relaxed font-sans">
                  {channel.description}
                </p>

                {/* Ámbito de Competencia */}
                <div className="p-3 rounded-2xl bg-sky-50/70 border border-sky-100 text-[12px] text-[#0B3B60] flex flex-col gap-1">
                  <strong className="font-heading font-bold text-[11px] uppercase tracking-wider text-[#007EAF]">
                    Competencia institucional:
                  </strong>
                  <p className="leading-relaxed font-sans text-slate-700">
                    {channel.scope}
                  </p>
                </div>

                {/* Cuándo acudir */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-[11.5px] font-bold text-[#0B3B60] uppercase tracking-wider">
                    ¿Cuándo acudir a esta entidad?
                  </span>
                  <div className="flex flex-col gap-1">
                    {channel.whenToContact.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-[12px] text-slate-600">
                        <span className="material-symbols-outlined text-[15px] text-[#00A3E0] shrink-0 mt-0.5">
                          check_circle
                        </span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pruebas a conservar */}
                <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex flex-col gap-1.5 text-left">
                  <div className="flex items-center gap-1.5 text-amber-900 font-bold text-[11.5px] font-heading">
                    <span className="material-symbols-outlined text-[16px] text-amber-600">folder_open</span>
                    <span>Pruebas clave que debes conservar:</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    {channel.evidenceToKeep.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-[11.5px] text-amber-950">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Canales directos */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Canales de atención directa
                  </span>
                  {channel.channels.map((ch, idx) => (
                    <div key={idx} className="text-[12px] text-slate-700 flex items-center justify-between py-0.5">
                      <span className="font-medium text-slate-500">{ch.type}:</span>
                      <strong className="text-[#0B3B60]">{ch.value}</strong>
                    </div>
                  ))}
                </div>
              </div>

              {/* Botón oficial */}
              <a
                href={channel.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-[#0B3B60] hover:bg-[#082E4D] text-white font-heading font-semibold text-[13px] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>{channel.buttonText}</span>
                <span className="material-symbols-outlined text-[16px] text-[#00A3E0]">open_in_new</span>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. PRIVACIDAD, SEGURIDAD Y ADVERTENCIA INSTITUCIONAL           */}
      {/* ============================================================== */}
      <section className="bg-gradient-to-r from-sky-50 via-blue-50 to-slate-50 rounded-3xl p-6 sm:p-7 border border-sky-200 text-left flex flex-col gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#0B3B60] text-white flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[20px] text-[#00A3E0]">security</span>
          </div>
          <div>
            <h4 className="text-[14px] sm:text-[15px] font-heading font-bold text-[#0B3B60]">
              Compromiso de Privacidad y Aviso Educativo AL DÍA
            </h4>
            <span className="text-[11px] text-slate-500 font-sans">
              Seguridad de la información y límites pedagógicos
            </span>
          </div>
        </div>

        <p className="text-[12.5px] sm:text-[13px] text-slate-700 leading-relaxed font-sans">
          <strong>AL DÍA es una plataforma estrictamente educativa y pedagógica.</strong> No es una entidad bancaria, financiera ni autoridad del Estado. No reemplaza la orientación legal de las autoridades ni de tu entidad financiera.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-[11.5px] text-slate-600">
          <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-start gap-2">
            <span className="material-symbols-outlined text-[16px] text-emerald-600 shrink-0 mt-0.5">check_circle</span>
            <span>No solicitamos contraseñas, tokens, PIN ni claves bancarias bajo ninguna circunstancia.</span>
          </div>

          <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-start gap-2">
            <span className="material-symbols-outlined text-[16px] text-emerald-600 shrink-0 mt-0.5">check_circle</span>
            <span>No permitimos ni requerimos subir documentos personales, estados de cuenta ni contratos confidenciales.</span>
          </div>

          <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-start gap-2">
            <span className="material-symbols-outlined text-[16px] text-emerald-600 shrink-0 mt-0.5">check_circle</span>
            <span>No intermediamos trámites ni presentamos denuncias penales o reclamos en nombre del usuario.</span>
          </div>
        </div>
      </section>
    </div>
  );
};
