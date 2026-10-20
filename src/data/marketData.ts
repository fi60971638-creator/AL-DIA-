export type MarketCategoryId =
  | 'todos'
  | 'cuadernos'
  | 'escritura'
  | 'archivadores'
  | 'organizacion'
  | 'papel'
  | 'accesorios';

export interface ProductItem {
  id: string;
  name: string;
  category: 'cuadernos' | 'escritura' | 'archivadores' | 'organizacion' | 'papel' | 'accesorios';
  categoryLabel: string;
  price: number;
  isReferentialPrice: boolean;
  stock?: number;
  shortDescription: string;
  image: string;
  unit: string;
  tag?: string;
  tagColor?: string;
}

export interface MarketCategoryDef {
  id: MarketCategoryId;
  label: string;
  icon: string;
  description: string;
}

export const PRODUCT_CATEGORIES: MarketCategoryDef[] = [
  {
    id: 'todos',
    label: 'Todos los productos',
    icon: 'storefront',
    description: 'Catálogo completo de útiles de oficina y escritorio',
  },
  {
    id: 'cuadernos',
    label: 'Cuadernos y libretas',
    icon: 'menu_book',
    description: 'Cuadernos universitarios, agendas, blocks y libretas',
  },
  {
    id: 'escritura',
    label: 'Lapiceros y escritura',
    icon: 'edit',
    description: 'Lapiceros, lápices, resaltadores, marcadores y correctores',
  },
  {
    id: 'archivadores',
    label: 'Folders y archivadores',
    icon: 'folder',
    description: 'Folders manila, plásticos, archivadores de palanca y micas',
  },
  {
    id: 'organizacion',
    label: 'Organización de oficina',
    icon: 'grid_view',
    description: 'Engrapadores, grapas, clips, tijeras, cintas y notas adhesivas',
  },
  {
    id: 'papel',
    label: 'Papel e impresión',
    icon: 'description',
    description: 'Papel bond A4, cartulinas, papel de colores y sobres',
  },
  {
    id: 'accesorios',
    label: 'Accesorios de escritorio',
    icon: 'desk',
    description: 'Portalapiceros, organizadores, calculadoras y dispensadores',
  },
];

export const INITIAL_PRODUCTS: ProductItem[] = [
  // ==========================================
  // 1. CUADERNOS Y LIBRETAS
  // ==========================================
  {
    id: 'prod-cuad-1',
    name: 'Cuaderno Universitario A4 Cuadriculado 100 Hojas',
    category: 'cuadernos',
    categoryLabel: 'Cuadernos y libretas',
    price: 6.5,
    isReferentialPrice: true,
    unit: 'Unidad',
    shortDescription: 'Cuaderno espiral con carátula plastificada gruesa, cuadrícula de 5mm y papel de 75g.',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    tag: 'Más pedido',
    tagColor: 'bg-sky-50 text-[#007EAF] border-sky-200',
  },
  {
    id: 'prod-cuad-2',
    name: 'Cuaderno Universitario A4 Rayado 100 Hojas',
    category: 'cuadernos',
    categoryLabel: 'Cuadernos y libretas',
    price: 6.5,
    isReferentialPrice: true,
    unit: 'Unidad',
    shortDescription: 'Hojas rayadas con margen rojo, espiral continuo de alambre recubierto y lomo resistente.',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=600&q=80',
    tag: 'Escritorio',
    tagColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  },
  {
    id: 'prod-cuad-3',
    name: 'Agenda Ejecutiva Diaria con Espiral Doble',
    category: 'cuadernos',
    categoryLabel: 'Cuadernos y libretas',
    price: 24.0,
    isReferentialPrice: true,
    unit: 'Unidad',
    shortDescription: 'Planificador diario con tapa dura texturizada, calendario anual y cinta elástica de cierre.',
    image: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&w=600&q=80',
    tag: 'Ejecutivo',
    tagColor: 'bg-indigo-50 text-indigo-800 border-indigo-200',
  },
  {
    id: 'prod-cuad-4',
    name: 'Block de Notas Cuadriculado A4 (80 hojas)',
    category: 'cuadernos',
    categoryLabel: 'Cuadernos y libretas',
    price: 4.8,
    isReferentialPrice: true,
    unit: 'Unidad',
    shortDescription: 'Block engomado superior para arranque fácil de notas de reuniones y cálculos rápidos.',
    image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'prod-cuad-5',
    name: 'Libreta de Bolsillo con Tapa Dura y Elástico',
    category: 'cuadernos',
    categoryLabel: 'Cuadernos y libretas',
    price: 12.5,
    isReferentialPrice: true,
    unit: 'Unidad',
    shortDescription: 'Formato compacto 9x14 cm, papel marfil de 80g, bolsillo interior de fuelle y marcador.',
    image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=600&q=80',
  },

  // ==========================================
  // 2. LAPICEROS Y ESCRITURA
  // ==========================================
  {
    id: 'prod-escr-1',
    name: 'Lapiceros de Tinta Seca (Set x 3: Azul, Negro, Rojo)',
    category: 'escritura',
    categoryLabel: 'Lapiceros y escritura',
    price: 4.5,
    isReferentialPrice: true,
    unit: 'Set x 3',
    shortDescription: 'Punta media de 1.0mm, cuerpo hexagonal transparente y tinta fluida de secado rápido.',
    image: 'https://images.unsplash.com/photo-1585336261026-62c76e27a694?auto=format&fit=crop&w=600&q=80',
    tag: 'Básico',
    tagColor: 'bg-blue-50 text-[#0B3B60] border-blue-200',
  },
  {
    id: 'prod-escr-2',
    name: 'Lapiceros de Tinta Gel Negra Trazo Fino 0.5mm (Pack x 2)',
    category: 'escritura',
    categoryLabel: 'Lapiceros y escritura',
    price: 6.0,
    isReferentialPrice: true,
    unit: 'Pack x 2',
    shortDescription: 'Escritura ultrasuave, grip antideslizante de goma y secado antimanchas.',
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'prod-escr-3',
    name: 'Lápices de Grafito 2B (Caja x 12 unidades)',
    category: 'escritura',
    categoryLabel: 'Lapiceros y escritura',
    price: 7.0,
    isReferentialPrice: true,
    unit: 'Caja x 12',
    shortDescription: 'Madera tratada para fácil afilado y mina resistente a roturas para dibujo y anotaciones.',
    image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'prod-escr-4',
    name: 'Resaltadores en Tonos Pastel (Set x 4 colores)',
    category: 'escritura',
    categoryLabel: 'Lapiceros y escritura',
    price: 11.5,
    isReferentialPrice: true,
    unit: 'Set x 4',
    shortDescription: 'Punta biselada para trazos de 2mm y 5mm en tonos menta, lila, amarillo suave y coral.',
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=600&q=80',
    tag: 'Popular',
    tagColor: 'bg-purple-50 text-purple-800 border-purple-200',
  },
  {
    id: 'prod-escr-5',
    name: 'Marcadores para Pizarra Blanca (Set x 4 Colores)',
    category: 'escritura',
    categoryLabel: 'Lapiceros y escritura',
    price: 9.5,
    isReferentialPrice: true,
    unit: 'Set x 4',
    shortDescription: 'Colores negro, azul, rojo y verde; bajo olor y borrado en seco sin dejar residuos.',
    image: 'https://images.unsplash.com/photo-1569683795645-b62e50fbf103?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'prod-escr-6',
    name: 'Borradores Blancos de Miga de Pan (Pack x 3)',
    category: 'escritura',
    categoryLabel: 'Lapiceros y escritura',
    price: 3.0,
    isReferentialPrice: true,
    unit: 'Pack x 3',
    shortDescription: 'Borradores no abrasivos libres de látex, no desgarran ni ensucian el papel bond.',
    image: 'https://images.unsplash.com/photo-1589384267710-7a170981ca78?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'prod-escr-7',
    name: 'Cinta Correctora en Seco Ergonómica 5mm x 8m',
    category: 'escritura',
    categoryLabel: 'Lapiceros y escritura',
    price: 4.8,
    isReferentialPrice: true,
    unit: 'Unidad',
    shortDescription: 'Corrección limpia e instantánea sobre la que se puede escribir de inmediato sin secado.',
    image: 'https://images.unsplash.com/photo-1580974852861-c381510bc98a?auto=format&fit=crop&w=600&q=80',
  },

  // ==========================================
  // 3. FOLDERS Y ARCHIVADORES
  // ==========================================
  {
    id: 'prod-arch-1',
    name: 'Folders Manila Tamaño A4 (Paquete x 25 unidades)',
    category: 'archivadores',
    categoryLabel: 'Folders y archivadores',
    price: 9.5,
    isReferentialPrice: true,
    unit: 'Paquete x 25',
    shortDescription: 'Cartulina manila gruesa de 180g con pestaña superior para rotulado de expedientes.',
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=600&q=80',
    tag: 'Mayorista',
    tagColor: 'bg-amber-50 text-amber-900 border-amber-200',
  },
  {
    id: 'prod-arch-2',
    name: 'Folders Plásticos con Fastener A4 (Pack x 5 colores surtidos)',
    category: 'archivadores',
    categoryLabel: 'Folders y archivadores',
    price: 8.5,
    isReferentialPrice: true,
    unit: 'Pack x 5',
    shortDescription: 'Polipropileno flexible impermeable con mecanismo fastener metálico de dos espigas.',
    image: 'https://images.unsplash.com/photo-1586769852044-692d6e3703f0?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'prod-arch-3',
    name: 'Archivador de Palanca Lomo Ancho A4 (Capacidad 500 hojas)',
    category: 'archivadores',
    categoryLabel: 'Folders y archivadores',
    price: 11.0,
    isReferentialPrice: true,
    unit: 'Unidad',
    shortDescription: 'Cartón prensado rígido forrado en polipropileno, mecanismo niquelado y cantoneras metálicas.',
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=600&q=80',
    tag: 'Resistente',
    tagColor: 'bg-slate-100 text-slate-800 border-slate-300',
  },
  {
    id: 'prod-arch-4',
    name: 'Micas Transparentes A4 Protectoras de Hojas (Paquete x 50)',
    category: 'archivadores',
    categoryLabel: 'Folders y archivadores',
    price: 10.5,
    isReferentialPrice: true,
    unit: 'Paquete x 50',
    shortDescription: 'Polipropileno cristal con borde reforzado multiperforado para pioners y archivadores.',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'prod-arch-5',
    name: 'Separadores de Cartulina A4 por Colores (Set x 10 divisiones)',
    category: 'archivadores',
    categoryLabel: 'Folders y archivadores',
    price: 4.5,
    isReferentialPrice: true,
    unit: 'Set x 10',
    shortDescription: 'Separadores multiperforados con pestañas impresas para clasificar archivos y carpetas.',
    image: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&w=600&q=80',
  },

  // ==========================================
  // 4. ORGANIZACIÓN DE OFICINA
  // ==========================================
  {
    id: 'prod-org-1',
    name: 'Engrapador Metálico de Escritorio Estándar (Capacidad 25 hojas)',
    category: 'organizacion',
    categoryLabel: 'Organización de oficina',
    price: 14.5,
    isReferentialPrice: true,
    unit: 'Unidad',
    shortDescription: 'Cuerpo metálico esmaltado resistente con base de goma antideslizante para grapas 24/6 y 26/6.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    tag: 'Esencial',
    tagColor: 'bg-sky-50 text-[#007EAF] border-sky-200',
  },
  {
    id: 'prod-org-2',
    name: 'Grapas Metálicas Estándar 26/6 (Caja x 5,000 unidades)',
    category: 'organizacion',
    categoryLabel: 'Organización de oficina',
    price: 4.0,
    isReferentialPrice: true,
    unit: 'Caja x 5,000',
    shortDescription: 'Alambre galvanizado de alta penetración con puntas afiladas para engrapado limpio.',
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'prod-org-3',
    name: 'Clips Metálicos Niquelados N° 3 (Caja x 100 unidades)',
    category: 'organizacion',
    categoryLabel: 'Organización de oficina',
    price: 2.8,
    isReferentialPrice: true,
    unit: 'Caja x 100',
    shortDescription: 'Acabado niquelado anticorrosivo de 33mm que sujeta papeles sin oxidar ni dañar hojas.',
    image: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'prod-org-4',
    name: 'Tijera de Oficina de Acero Inoxidable 8 Pulgadas',
    category: 'organizacion',
    categoryLabel: 'Organización de oficina',
    price: 6.5,
    isReferentialPrice: true,
    unit: 'Unidad',
    shortDescription: 'Hojas afiladas de acero inoxidable con mango ergonómico de agarre cómodo.',
    image: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'prod-org-5',
    name: 'Cinta Adhesiva Transparente de Escritorio (Pack x 2 rollos)',
    category: 'organizacion',
    categoryLabel: 'Organización de oficina',
    price: 3.5,
    isReferentialPrice: true,
    unit: 'Pack x 2',
    shortDescription: 'Cinta brillante de 18mm x 33m con adhesivo acrílico de alta adherencia y transparencia.',
    image: 'https://images.unsplash.com/photo-1589384267710-7a170981ca78?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'prod-org-6',
    name: 'Notas Adhesivas Amarillas 76x76mm (Pack x 4 blocks)',
    category: 'organizacion',
    categoryLabel: 'Organización de oficina',
    price: 8.0,
    isReferentialPrice: true,
    unit: 'Pack x 4',
    shortDescription: 'Total 400 hojas autoadhesivas reposicionables que no dejan residuos al despegar.',
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=600&q=80',
    tag: 'Oficina',
    tagColor: 'bg-amber-50 text-amber-800 border-amber-200',
  },
  {
    id: 'prod-org-7',
    name: 'Regla Metálica Graduada de 30 cm con Base Antideslizante',
    category: 'organizacion',
    categoryLabel: 'Organización de oficina',
    price: 4.5,
    isReferentialPrice: true,
    unit: 'Unidad',
    shortDescription: 'Graduación grabada en milímetros y pulgadas, acero flexible con respaldo antideslizante.',
    image: 'https://images.unsplash.com/photo-1584697964190-705b89366475?auto=format&fit=crop&w=600&q=80',
  },

  // ==========================================
  // 5. PAPEL E IMPRESIÓN
  // ==========================================
  {
    id: 'prod-pap-1',
    name: 'Resma de Papel Bond A4 75g (Paquete x 500 hojas)',
    category: 'papel',
    categoryLabel: 'Papel e impresión',
    price: 18.5,
    isReferentialPrice: true,
    unit: 'Resma x 500',
    shortDescription: 'Blancura 98%, gramaje de 75g de alta opacidad apto para impresoras láser, inyección y fotocopiadoras.',
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=600&q=80',
    tag: 'Mayor demanda',
    tagColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  },
  {
    id: 'prod-pap-2',
    name: 'Cartulinas Escolares y de Oficina Colores Surtidos (Pack x 10)',
    category: 'papel',
    categoryLabel: 'Papel e impresión',
    price: 6.0,
    isReferentialPrice: true,
    unit: 'Pack x 10',
    shortDescription: 'Cartulina gruesa de 180g en colores vivos para presentaciones, carátulas y señalética.',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'prod-pap-3',
    name: 'Papel Bond de Colores Pastel A4 (Paquete x 100 hojas)',
    category: 'papel',
    categoryLabel: 'Papel e impresión',
    price: 7.5,
    isReferentialPrice: true,
    unit: 'Pack x 100',
    shortDescription: 'Colores celestes, verdes, amarillos y rosados pastel para documentos clasificados y manuales.',
    image: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'prod-pap-4',
    name: 'Sobres Manila Tamaño A4 con Cierre Autoadhesivo (Paquete x 25)',
    category: 'papel',
    categoryLabel: 'Papel e impresión',
    price: 7.0,
    isReferentialPrice: true,
    unit: 'Pack x 25',
    shortDescription: 'Papel kraft manila de alta resistencia para envío de expedientes, contratos y reportes.',
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'prod-pap-5',
    name: 'Sobres Blancos para Correspondencia Carta (Caja x 50 unidades)',
    category: 'papel',
    categoryLabel: 'Papel e impresión',
    price: 6.5,
    isReferentialPrice: true,
    unit: 'Caja x 50',
    shortDescription: 'Sobres de correspondencia formal con tira engomada para envío seguro de recibos y cartas.',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=600&q=80',
  },

  // ==========================================
  // 6. ACCESORIOS DE ESCRITORIO
  // ==========================================
  {
    id: 'prod-acc-1',
    name: 'Portalapiceros Metálico de Malla Circular',
    category: 'accesorios',
    categoryLabel: 'Accesorios de escritorio',
    price: 5.5,
    isReferentialPrice: true,
    unit: 'Unidad',
    shortDescription: 'Malla de acero con recubrimiento epóxico negro y base acolchada para evitar arañazos.',
    image: 'https://images.unsplash.com/photo-1585336261026-62c76e27a694?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'prod-acc-2',
    name: 'Organizador de Escritorio Multifuncional con Compartimentos',
    category: 'accesorios',
    categoryLabel: 'Accesorios de escritorio',
    price: 18.0,
    isReferentialPrice: true,
    unit: 'Unidad',
    shortDescription: 'Estructura con cajón para clips, ranuras para notas adhesivas y soportes para bolígrafos.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    tag: 'Escritorio Top',
    tagColor: 'bg-sky-50 text-[#007EAF] border-sky-200',
  },
  {
    id: 'prod-acc-3',
    name: 'Calculadora Electrónica de Escritorio Solar y Batería (12 Dígitos)',
    category: 'accesorios',
    categoryLabel: 'Accesorios de escritorio',
    price: 22.0,
    isReferentialPrice: true,
    unit: 'Unidad',
    shortDescription: 'Pantalla LCD inclinada de alta visibilidad con teclas plásticas grandes y cálculo de impuestos.',
    image: 'https://images.unsplash.com/photo-1587145820266-a5951ee6f620?auto=format&fit=crop&w=600&q=80',
    tag: 'Finanzas',
    tagColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  },
  {
    id: 'prod-acc-4',
    name: 'Dispensador Pesado de Cinta Adhesiva de Escritorio',
    category: 'accesorios',
    categoryLabel: 'Accesorios de escritorio',
    price: 12.0,
    isReferentialPrice: true,
    unit: 'Unidad',
    shortDescription: 'Base contrapesada antideslizante con cuchilla dentada de acero inoxidable para corte con una mano.',
    image: 'https://images.unsplash.com/photo-1589384267710-7a170981ca78?auto=format&fit=crop&w=600&q=80',
  },
];
