import { TabType } from './types';
import { useRoute } from './router';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { Footer } from './components/Footer';

// Screens
import { DashboardScreen } from './components/screens/DashboardScreen';
import { AprendeFinanzasScreen } from './components/screens/AprendeFinanzasScreen';
import { OrientacionScreen } from './components/screens/OrientacionScreen';
import { CategoriasCrediticiasScreen } from './components/screens/CategoriasCrediticiasScreen';
import { MarketScreen } from './components/screens/MarketScreen';
import { PlayScreen } from './components/screens/PlayScreen';
import { VideosScreen } from './components/screens/VideosScreen';

export default function App() {
  const { currentTab, navigate, aprendeSubTab } = useRoute();

  const handleNavigate = (tab: TabType) => {
    navigate(tab);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0B3B60] flex flex-col font-sans antialiased selection:bg-[#00A3E0]/20 selection:text-[#0B3B60]">
      {/* 1. Barra de Navegación Horizontal Superior (Sticky Navigation - Estilo Bancario Moderno) */}
      <Header currentTab={currentTab} onNavigate={handleNavigate} />

      {/* 2. Contenido Principal */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-20 md:pb-14">
        {currentTab === 'inicio' && <DashboardScreen onNavigate={handleNavigate} />}
        {currentTab === 'videos' && <VideosScreen onNavigate={handleNavigate} />}
        {currentTab === 'orientacion' && <VideosScreen onNavigate={handleNavigate} />}
        {currentTab === 'market' && <MarketScreen onNavigate={handleNavigate} />}
        {currentTab === 'play' && <PlayScreen onNavigate={handleNavigate} />}
        {currentTab === 'categorias_crediticias' && <CategoriasCrediticiasScreen />}
        {currentTab.startsWith('aprende_') && (
          <AprendeFinanzasScreen
            initialTab={aprendeSubTab}
            onTabChange={(sub) => handleNavigate(`aprende_${sub}` as TabType)}
          />
        )}
      </main>

      {/* 3. Pie de Página */}
      <Footer onNavigate={handleNavigate} />

      {/* 4. Barra Inferior Móvil para Acceso Táctil Cómodo */}
      <BottomNav currentTab={currentTab} onNavigate={handleNavigate} />
    </div>
  );
}
