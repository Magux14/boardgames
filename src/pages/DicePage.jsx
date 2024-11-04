import React from 'react'
import { Header } from './../components/header/Header'
import { Dice } from '../components/dice/Dice'
import { DiceCharacter } from '../components/dice/DiceCharacter'
import './DicePage.css'

export const DicePage = () => {
    return (
        <>
            <Header />
            <div id="dices-container">
                <Dice diceName="D6" initialDiceNumbers={{ min: 1, max: 6 }} />
                <Dice diceName="D12" initialDiceNumbers={{ min: 2, max: 12 }} />
                <Dice diceName="D20" initialDiceNumbers={{ min: 1, max: 20 }} />
                <Dice diceName="D100" initialDiceNumbers={{ min: 1, max: 100 }} />
                <DiceCharacter diceName="ABC" />
            </div>
        </>
    )
}
