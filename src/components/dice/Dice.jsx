import React, { useEffect, useState } from 'react'
import './Dice.css'

export const Dice = ({ initialDiceNumbers, diceName }) => {

    const [diceNumbers, setDiceNumbers] = useState(initialDiceNumbers || {
        min: 1,
        max: 6
    });
    const [dice, setDice] = useState({ count: 0 });
    const [isAnimating, setIsAnimating] = useState(false);
    const getRandomNum = () => {
        const min = Math.ceil(diceNumbers.min);
        const max = Math.floor(diceNumbers.max);
        setDice({ count: Math.floor(Math.random() * (max - min + 1) + min) });
    }

    useEffect(() => {
        setIsAnimating(true);
        setTimeout(() => {
            setIsAnimating(false);
        }, 100);
    }, [dice]);

    useEffect(() => {
        setDiceNumbers(initialDiceNumbers);
    }, [initialDiceNumbers])

    return (
        <div className='dice-container'>
            <label>{diceName}</label>
            <button className={`dice ${isAnimating ? 'animate' : ''}`} onClick={() => getRandomNum()}>
                <label className={`${isAnimating ? 'dice-value' : ''}`}>
                    {dice.count}
                </label>
            </button>
        </div>
    )
}
