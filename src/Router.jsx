import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { GameListPage } from './pages/GameListPage'
import { DicePage } from './pages/DicePage'


export const RouterManagement = () => {

    const prod = true;
    return (
        <div id="main-container">
            <BrowserRouter basename={prod ? 'boardgames' : ''}>
                <Routes>
                    <Route path="/" element={<GameListPage />} />
                    <Route path="/dice" element={<DicePage />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}
