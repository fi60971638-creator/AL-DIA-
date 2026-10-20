export type AprendeSubTab =
  | 'articulos'
  | 'diccionario'
  | 'derechos';

export type TabType =
  | 'inicio'
  | 'videos'
  | 'orientacion'
  | 'seguridad'
  | 'market'
  | 'play'
  | 'aprende_articulos'
  | 'aprende_diccionario'
  | 'aprende_derechos'
  | 'categorias_crediticias';

export interface EducationalArticle {
  id: string;
  category:
    | 'Pagos y cuotas'
    | 'Créditos y préstamos'
    | 'Cobranzas responsables'
    | 'Historial crediticio'
    | 'Presupuesto familiar'
    | 'Finanzas para emprendedores'
    | 'Derechos del consumidor'
    | 'Pagos digitales y seguridad'
    | string;
  title: string;
  shortDesc: string;
  readTime: string;
  badgeColor?: string;
  summary: string;
  keyTakeaway: string;
  source?: string;
  imageSrc?: string;
  imageAlt?: string;
  situacionCotidiana?: string;
  explicacionSencilla?: string;
  pasosPracticos?: string[];
  ejemploSoles?: {
    titulo: string;
    detalle: string;
    calculo?: string;
  };
  consejoAlDia?: string;
  fuenteOficialUrl?: string;
  fuenteOficialNombre?: string;
  sections: {
    title: string;
    paragraphs: string[];
    tips?: string[];
  }[];
}

export type SituationId =
  | 'no-puedo-pagar'
  | 'me-atrase'
  | 'me-estan-cobrando'
  | 'no-entiendo-credito'
  | 'quiero-pagar-antes'
  | 'cuidar-historial'
  | 'varias-obligaciones';

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
  canal: string;
  categoria: string;
  categoriaFiltro:
    | 'sbs_oficiales'
    | 'creditos_historial'
    | 'pagos_cobranzas'
    | 'presupuesto_ahorro'
    | 'educacion_general';
  duracion: string;
  fuente: string;
  tipoFuente: 'Entidad Oficial' | 'Especialista / Canal Educativo';
  url: string;
  thumbnailUrl?: string;
  descripcion?: string;
  isFeatured?: boolean;
  keyTakeaways?: string[];
}

export interface FinancialTerm {
  id: string;
  term: string;
  definition: string;
  example: string;
  importance?: string;
  source?: string;
}

export interface MythTruthItem {
  id: string;
  myth: string;
  truth: string;
  explanation: string;
  example?: string;
  source?: string;
  topic?: string;
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
