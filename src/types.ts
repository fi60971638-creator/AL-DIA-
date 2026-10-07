export type TabType =
  | 'inicio'
  | 'situaciones'
  | 'videos'
  | 'aprende'
  | 'casos'
  | 'preguntas'
  | 'asesoramiento'
  | 'derechos'
  | 'fuentes';

export type SituationId =
  | 'no-puedo-pagar'
  | 'me-atrase'
  | 'me-estan-cobrando'
  | 'no-entiendo-credito'
  | 'quiero-pagar-antes'
  | 'cuidar-historial'
  | 'varias-obligaciones';

export interface StepItem {
  number: number;
  title: string;
  description: string;
}

export interface SituationItem {
  id: SituationId;
  title: string;
  homeTitle: string;
  homeButtonText: string;
  shortDesc: string;
  subtitle: string;
  icon: string;
  tagColor: string;
  meaning: string;
  whatCanYouDo: string[];
  whatToAvoid: string[];
  practicalAdvice: string;
  officialSource: {
    name: string;
    description: string;
    url: string;
  };
}

export interface VideoItem {
  id: string;
  titulo: string;
  categoria: 'Créditos' | 'Pagos' | 'Cobranzas' | 'Historial' | 'Derechos' | 'Finanzas personales';
  duracion: string;
  fuente: string;
  url: string;
  isFeatured?: boolean;
  descripcion?: string;
}

export interface FinancialTerm {
  id: string;
  term: string;
  definition: string;
  example: string;
  importance: string;
}

export interface MythTruthItem {
  id: string;
  myth: string;
  truth: string;
  explanation: string;
}

export interface PracticalCaseOption {
  id: string;
  text: string;
  isRecommended: boolean;
  feedback: string;
}

export interface PracticalCase {
  id: string;
  character: string;
  title: string;
  situation: string;
  question: string;
  options: PracticalCaseOption[];
  educationalTakeaway: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface OfficialSourceItem {
  id: string;
  name: string;
  fullName: string;
  description: string;
  url: string;
  services: string[];
}

export interface AdvisoryResult {
  title: string;
  whatItMeans: string;
  whatToCheck: string[];
  whatToDo: string[];
  whatToAvoid: string[];
  advice: string;
  officialSource: {
    name: string;
    url: string;
  };
}

export interface RightTopic {
  id: string;
  title: string;
  icon: string;
  summary: string;
  points: string[];
  officialSourceText: string;
  officialSourceUrl: string;
}
