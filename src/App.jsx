import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { GameListPage } from './pages/GameList/GameListPage'
import { DicePage } from './pages/Dice/DicePage'
import { PhasmophobiaGamePage } from './pages/PhasmophobiaGame/PhasmophobiaGamePage'
import { PhasmophobiaFilterPage } from './pages/PhasmophobiaFilter/PhasmophobiaFilterPage'


export const App = () => {

    return (
        <BrowserRouter basename={import.meta.env.VITE_PUBLIC_URL}>
            <Routes>
                <Route path="/" element={<GameListPage />} />
                <Route path="/dice" element={<DicePage />} />
                <Route path="/phasmophobia-filter" element={<PhasmophobiaFilterPage />} />
                <Route path="/phasmophobia-game" element={<PhasmophobiaGamePage />} />
            </Routes>
        </BrowserRouter>
    )
}
