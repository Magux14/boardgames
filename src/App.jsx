import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { GameListPage } from './pages/game-list/GameListPage';
import { DicePage } from './pages/dice/DicePage';
import { PhasmophobiaGamePage } from './pages/phasmophobia/phasmophobia-game/PhasmophobiaGamePage';
import { PhasmophobiaFilterPage } from './pages/phasmophobia/phasmophobia-filter/PhasmophobiaFilterPage';
import { KnowledgeRace } from './pages/knowledge-race/KnowledgeRace';
import { CowMind } from './pages/cow-mind/CowMind';
import { BlockbusterPage } from './pages/blockbuster/BlockBusterPage';
import { NoMamesPage } from './pages/no-mames/NoMamesPage';
import { YoNuncaNuncaPage } from './pages/yo-nunca-nunca/YoNuncaNunca';
import { MarioPartyPage } from './pages/mario-party/MarioPartyPage';
import { TabuGame } from './pages/tabu/components/tabu-game/TabuGame';
import { CountingPoints } from './pages/counting-points/CountingPoints';
import { ResidentEvilPage } from './pages/resident-evil/ResidentEvilPage';
import { TimerPage } from './pages/timer-page/TimerPage';
import { Basta } from './pages/basta/basta';
import { DeckTester } from './components/deck-tester/DeckTester';

export const App = () => {

    return (
        <BrowserRouter basename={import.meta.env.VITE_PUBLIC_URL}>
            <Routes>
                <Route path="/" element={<GameListPage />} />
                <Route path="/basta" element={<Basta />} />
                <Route path="/blockbuster" element={<BlockbusterPage />} />
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
                <Route path="/tabu" element={<TabuGame />} />
                <Route path="/timer" element={<TimerPage />} />
                <Route path="/yo-nunca-nunca" element={<YoNuncaNuncaPage />} />
            </Routes>
        </BrowserRouter>
    )
}
