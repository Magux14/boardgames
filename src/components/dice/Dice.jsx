import React, { useEffect, useState } from 'react'
import './Dice.css'

export const Dice = ({ initialDiceNumbers, diceName }) => {

    const [diceNumbers] = useState(initialDiceNumbers || {
        min: 1,
        max: 6
    });
    const [num, setNum] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const getRandomNum = () => {
        const min = Math.ceil(diceNumbers.min);
        const max = Math.floor(diceNumbers.max);
        setNum(Math.floor(Math.random() * (max - min + 1) + min));
    }

    useEffect(() => {
        setIsAnimating(true);
        setTimeout(() => {
            setIsAnimating(false);
        }, 200);
    }, [num]);

    return (
        <div className='dice-container'>
            <label>{diceName}</label>
            <button className={`dice ${isAnimating ? 'animate' : ''}`} onClick={() => getRandomNum()}>
                {num}
            </button>
        </div>
    )
}
