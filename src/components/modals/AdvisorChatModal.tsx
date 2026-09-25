import React, { useState, useEffect, useRef } from 'react';
import { ADVISOR_PHOTO_URL } from '../../data/initialData';

interface Message {
  id: string;
  sender: 'advisor' | 'user';
  text: string;
  time: string;
}

interface AdvisorChatModalProps {
  initialContext?: string;
  onClose: () => void;
}

export const AdvisorChatModal: React.FC<AdvisorChatModalProps> = ({
  initialContext,
  onClose,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-initial',
      sender: 'advisor',
      text: '¡Hola! Soy Diana, tu orientadora en AlDía. Estoy aquí para ayudarte a entender tus deudas, organizar tus opciones de pago y responder tus preguntas sin estrés ni juicios. ¿En qué puedo orientarte hoy?',
      time: 'Ahora',
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const processedContextRef = useRef<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const generateMsgId = (prefix: 'u' | 'a') => {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  };

  const respondToUser = (query: string) => {
    setIsTyping(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      let reply =
        'Entiendo perfectamente tu consulta. Recuerda que en AlDía creemos que siempre hay alternativas viables para regularizar tus deudas: desde reprogramaciones y gracia hasta convenios de amortización. ¿Te gustaría ver un paso a paso para tu caso?';
      const lower = query.toLowerCase();

      if (lower.includes('vencid') || lower.includes('atras') || lower.includes('mora')) {
        reply =
          'Si tienes cuotas atrasadas, lo primero es no tener miedo: en Perú no hay cárcel por deudas civiles. El paso más efectivo es contactar a tu banco o caja antes de que la deuda pase a cobranza externa y solicitar una reprogramación o condonación de moras.';
      } else if (lower.includes('sbs') || lower.includes('reporte') || lower.includes('infocorp') || lower.includes('calificaci')) {
        reply =
          'El Reporte de Deudas SBS es 100% gratuito y lo puedes consultar en su portal oficial con tu DNI. Las calificaciones van desde Normal (0), CPP (1), Deficiente (2), Dudoso (3) hasta Pérdida (4). Al regularizarte, tu historial se actualizará en los siguientes cierres mensuales.';
      } else if (lower.includes('tea') || lower.includes('tcea') || lower.includes('interes') || lower.includes('tasa')) {
        reply =
          '¡Excelente pregunta! La TEA es solo el interés nominal, pero la TCEA (Tasa de Costo Efectivo Anual) incluye comisiones y seguro de desgravamen. Siempre compara la TCEA para saber el costo real de cualquier crédito.';
      } else if (lower.includes('minimo') || lower.includes('tarjeta')) {
        reply =
          'Cuidado con pagar solo el monto mínimo de la tarjeta: casi todo se va en intereses y comisiones, y puedes tardar años en pagar. Siempre procura pagar el "Pago del Mes" o al menos el doble del mínimo.';
      } else if (lower.includes('cuota') || lower.includes('nueva') || lower.includes('simula')) {
        reply =
          'Antes de tomar una nueva cuota, revisa en nuestra sección de Capacidad de Pago que tus cuotas totales no superen el 30% - 35% de tus ingresos netos mensuales para mantener un margen seguro.';
      } else if (lower.includes('llamadas') || lower.includes('trabajo') || lower.includes('acos') || lower.includes('familia')) {
        reply =
          'Por ley de la SBS e INDECOPI, las empresas de cobranza NO pueden llamar fuera del horario de 8:00 am a 8:00 pm, no pueden amenazar ni contactar a tus compañeros de trabajo o familiares no garantes.';
      } else if (lower.includes('reprogramar') || lower.includes('plazo') || lower.includes('carta')) {
        reply =
          'Para reprogramar, te recomiendo presentar una propuesta de cuota alcanzable basada en tu presupuesto. En la pestaña de Educación de AlDía tenemos una plantilla lista para copiar y enviar a tu entidad.';
      }

      setMessages((prev) => [
        ...prev,
        {
          id: generateMsgId('a'),
          sender: 'advisor',
          text: reply,
          time: 'Ahora',
        },
      ]);
      setIsTyping(false);
    }, 1000);
  };

  useEffect(() => {
    if (initialContext && processedContextRef.current !== initialContext) {
      processedContextRef.current = initialContext;
      const userMsg: Message = {
        id: generateMsgId('u'),
        sender: 'user',
        text: initialContext,
        time: 'Ahora',
      };
      setMessages((prev) => {
        if (prev.some((m) => m.sender === 'user' && m.text === initialContext)) {
          return prev;
        }
        return [...prev, userMsg];
      });
      respondToUser(initialContext);
    }
  }, [initialContext]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages, isTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userText = inputVal.trim();
    const userMsg: Message = {
      id: generateMsgId('u'),
      sender: 'user',
      text: userText,
      time: 'Ahora',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    respondToUser(userText);
  };

  const quickQuestions = [
    '¿Qué hago si no puedo pagar este mes?',
    '¿Cómo consulto gratis mi Reporte SBS?',
    '¿Qué diferencia hay entre TEA y TCEA?',
    '¿Cómo solicitar una reprogramación?',
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl w-full max-w-md h-[85vh] max-h-[640px] shadow-2xl border border-[#eaedff] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0037b0] to-[#002884] text-white p-4 flex items-center justify-between flex-shrink-0 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={ADVISOR_PHOTO_URL}
                alt="Diana Asesora AlDía"
                className="w-10 h-10 rounded-full object-cover border-2 border-white/50"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full"></span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline-sm text-[15px] font-bold leading-tight">
                Diana • Orientadora AlDía
              </span>
              <span className="text-[11px] text-blue-200 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                En línea para responder tus dudas
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Disclaimer Bar */}
        <div className="bg-blue-50/90 px-3 py-1.5 text-[10px] text-[#0037b0] border-b border-blue-100 flex items-center justify-center gap-1">
          <span className="material-symbols-outlined text-[14px]">info</span>
          <span>Orientación confidencial y gratuita. No constituye intermediación bancaria.</span>
        </div>

        {/* Message history */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-[#faf8ff]">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col max-w-[85%] ${
                m.sender === 'user' ? 'self-end items-end' : 'self-start items-start'
              }`}
            >
              <div
                className={`p-3.5 rounded-2xl text-[13px] leading-relaxed shadow-2xs ${
                  m.sender === 'user'
                    ? 'bg-[#0037b0] text-white rounded-tr-xs'
                    : 'bg-white text-[#131b2e] border border-[#eaedff] rounded-tl-xs'
                }`}
              >
                {m.text}
              </div>
              <span className="text-[10px] text-[#747686] px-1 mt-0.5">{m.time}</span>
            </div>
          ))}

          {isTyping && (
            <div className="self-start flex items-center gap-1.5 bg-white p-3 rounded-2xl border border-[#eaedff] text-[#747686] text-[12px] shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#0037b0] animate-bounce"></span>
              <span className="w-2 h-2 rounded-full bg-[#0037b0] animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-2 h-2 rounded-full bg-[#0037b0] animate-bounce [animation-delay:0.4s]"></span>
              <span className="text-[11px] ml-1">Diana está escribiendo...</span>
            </div>
          )}
        </div>

        {/* Quick Question Chips */}
        <div className="p-2 bg-white border-t border-[#eaedff] flex gap-1.5 overflow-x-auto no-scrollbar">
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                const userMsg: Message = {
                  id: generateMsgId('u'),
                  sender: 'user',
                  text: q,
                  time: 'Ahora',
                };
                setMessages((prev) => [...prev, userMsg]);
                respondToUser(q);
              }}
              className="px-3 py-1.5 rounded-full bg-[#f2f5ff] hover:bg-[#eaedff] text-[#0037b0] text-[11px] font-semibold whitespace-nowrap border border-[#eaedff] transition-colors cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input form */}
        <form
          onSubmit={handleSend}
          className="p-3 bg-white border-t border-[#eaedff] flex items-center gap-2 flex-shrink-0"
        >
          <input
            type="text"
            placeholder="Escribe tu duda sobre deudas o pagos..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-2xl border border-[#c4c5d7] text-[13px] text-[#131b2e] focus:border-[#0037b0] outline-none"
          />
          <button
            type="submit"
            disabled={!inputVal.trim()}
            className="w-10 h-10 rounded-2xl bg-[#0037b0] text-white flex items-center justify-center hover:bg-[#002f99] active:scale-95 disabled:opacity-40 transition-all cursor-pointer shadow-xs"
          >
            <span className="material-symbols-outlined text-[20px]">send</span>
          </button>
        </form>
      </div>
    </div>
  );
};
