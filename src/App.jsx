import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { GameListPage } from './pages/GameListPage'
import { DicePage } from './pages/DicePage'
import { PhasmophobiaFilterPage } from './pages/PhasmophobiaFilterPage'
import { PhasmophobiaGamePage } from './pages/PhasmophobiaGamePage'


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
