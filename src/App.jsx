import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Spin } from 'antd';

const GameListPage = lazy(() => import('./pages/game-list/GameListPage').then(m => ({ default: m.GameListPage })));
const DicePage = lazy(() => import('./pages/dice/DicePage').then(m => ({ default: m.DicePage })));
const PhasmophobiaGamePage = lazy(() => import('./pages/phasmophobia/phasmophobia-game/PhasmophobiaGamePage').then(m => ({ default: m.PhasmophobiaGamePage })));
const PhasmophobiaFilterPage = lazy(() => import('./pages/phasmophobia/phasmophobia-filter/PhasmophobiaFilterPage').then(m => ({ default: m.PhasmophobiaFilterPage })));
const KnowledgeRace = lazy(() => import('./pages/knowledge-race/KnowledgeRace').then(m => ({ default: m.KnowledgeRace })));
const CowMind = lazy(() => import('./pages/cow-mind/CowMind').then(m => ({ default: m.CowMind })));
const BlockbusterPage = lazy(() => import('./pages/blockbuster/BlockBusterPage').then(m => ({ default: m.BlockbusterPage })));
const NoMamesPage = lazy(() => import('./pages/no-mames/NoMamesPage').then(m => ({ default: m.NoMamesPage })));
const YoNuncaNuncaPage = lazy(() => import('./pages/yo-nunca-nunca/YoNuncaNunca').then(m => ({ default: m.YoNuncaNuncaPage })));
const MarioPartyPage = lazy(() => import('./pages/mario-party/MarioPartyPage').then(m => ({ default: m.MarioPartyPage })));
const TabuGame = lazy(() => import('./pages/tabu/components/tabu-game/TabuGame').then(m => ({ default: m.TabuGame })));
const CountingPoints = lazy(() => import('./pages/counting-points/CountingPoints').then(m => ({ default: m.CountingPoints })));
const ResidentEvilPage = lazy(() => import('./pages/resident-evil/ResidentEvilPage').then(m => ({ default: m.ResidentEvilPage })));
const TimerPage = lazy(() => import('./pages/timer-page/TimerPage').then(m => ({ default: m.TimerPage })));
const Basta = lazy(() => import('./pages/basta/basta').then(m => ({ default: m.Basta })));
const DeckTester = lazy(() => import('./components/deck-tester/DeckTester').then(m => ({ default: m.DeckTester })));
const Unanimo = lazy(() => import('./pages/unanimo/Unanimo').then(m => ({ default: m.Unanimo })));
const IceBreaker = lazy(() => import('./pages/ice-breaker/IceBreaker').then(m => ({ default: m.IceBreaker })));
const CodigoSecretoPage = lazy(() => import('./pages/codigo-secreto/CodigoSecretoPage').then(m => ({ default: m.CodigoSecretoPage })));

const PageLoader = () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
    </div>
)

export const App = () => {

    return (
        <BrowserRouter basename={import.meta.env.VITE_PUBLIC_URL}>
            <Suspense fallback={<PageLoader />}>
                <Routes>
                    <Route path="/" element={<GameListPage />} />
                    <Route path="/basta" element={<Basta />} />
                    <Route path="/blockbuster" element={<BlockbusterPage />} />
                    <Route path="/codigo-secreto" element={<CodigoSecretoPage />} />
                    <Route path="/counting" element={<CountingPoints />} />
                    <Route path="/cow-mind" element={<CowMind />} />
                    <Route path="/deck-tester" element={<DeckTester />} />
                    <Route path="/dice" element={<DicePage />} />
                    <Route path="/knowledge-race" element={<KnowledgeRace />} />
                    <Route path="/mario-party" element={<MarioPartyPage />} />
                    <Route path="/no-mames" element={<NoMamesPage />} />
                    <Route path="/phasmophobia-filter" element={<PhasmophobiaFilterPage />} />
                    <Route path="/phasmophobia-game" element={<PhasmophobiaGamePage />} />
                    <Route path="/resident-evil" element={<ResidentEvilPage />} />
                    <Route path="/unanimo" element={<Unanimo />} />
                    <Route path="/tabu" element={<TabuGame />} />
                    <Route path="/timer" element={<TimerPage />} />
                    <Route path="/yo-nunca-nunca" element={<YoNuncaNuncaPage />} />
                    <Route path="/ice-breaker" element={<IceBreaker />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}
