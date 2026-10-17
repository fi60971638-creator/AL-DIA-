import { useState, useEffect, useCallback } from 'react';
import { TabType, AprendeSubTab } from './types';

export const VALID_TABS: TabType[] = [
  'inicio',
  'videos',
  'orientacion',
  'market',
  'play',
  'aprende_articulos',
  'aprende_diccionario',
  'aprende_derechos',
  'categorias_crediticias',
];

const LEGACY_TAB_MAP: Record<string, TabType> = {
  deudas: 'videos',
  objetivos: 'videos',
  salud: 'videos',
  perfil: 'videos',
  calendario: 'inicio',
  pagos: 'inicio',
  presupuesto: 'aprende_articulos',
  aprende: 'aprende_articulos',
  aprende_videos: 'videos',
  videos_sbs: 'videos',
  aprende_mitos: 'aprende_articulos',
  aprende_casos: 'aprende_articulos',
  recursos: 'market',
  juegos: 'play',
  trivia: 'play',
  orientacion: 'videos',
};

function parseHash(hash: string): TabType {
  const clean = hash.replace(/^#\/?/, '').trim();
  if (VALID_TABS.includes(clean as TabType)) {
    return clean as TabType;
  }
  if (clean in LEGACY_TAB_MAP) {
    return LEGACY_TAB_MAP[clean];
  }
  return 'inicio';
}

export function useRoute() {
  const [currentTab, setCurrentTab] = useState<TabType>(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      return parseHash(window.location.hash);
    }
    return 'inicio';
  });

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentTab(parseHash(window.location.hash));
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = useCallback((tab: TabType) => {
    setCurrentTab(tab);
    if (typeof window !== 'undefined') {
      window.location.hash = tab;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  // Compute educational subtab when in an 'aprende_*' route
  const aprendeSubTab: AprendeSubTab = currentTab.startsWith('aprende_')
    ? (currentTab.replace('aprende_', '') as AprendeSubTab)
    : 'articulos';

  return { currentTab, navigate, aprendeSubTab };
}
