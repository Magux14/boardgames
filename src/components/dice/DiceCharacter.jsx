import React, { useEffect, useState } from 'react'
import './Dice.css'

export const DiceCharacter = ({ diceName }) => {

    const [character, setCharacter] = useState('A');
    const [isAnimating, setIsAnimating] = useState(false);

    const getRandomCharacter = () => {
        const letras = 'abcdefghijklmnñopqrstuvwxyz';
        const index = Math.floor(Math.random() * letras.length);
        setCharacter(letras[index].toUpperCase());
    }

    useEffect(() => {
        setIsAnimating(true);
        setTimeout(() => {
            setIsAnimating(false);
        }, 200);
    }, [character]);

    return (
        <div className='dice-container'>
            <label>{diceName}</label>
            <div className={`dice ${isAnimating ? 'animate' : ''}`} onClick={() => getRandomCharacter()}>
                {character}
            </div>
        </div>
    )
}
