import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './mario-party-main-game.scss';

const daysLeftTuSwitchTime = 3;

export const MarioPartyMainGame = () => {
    const [searchParams] = useSearchParams();
    const [turnsLeft, setTurnsLeft] = useState(searchParams.get('t') || 10);
    const [day, setDay] = useState({
        isDay: true,
        daysLeft: daysLeftTuSwitchTime
    });

    const handleNextTurn = () => {
        setTurnsLeft(--turnsLeft);
        if (day.daysLeft == 1) {
            setDay({
                ...day,
                daysLeft: --daysLeft
            });
        } else {
            setDay({
                isDay: !day.isDay,
                daysLeft: daysLeftTuSwitchTime
            });
        }
    }

    useEffect(() => {

        if (turnsLeft < 0) {
            console.log('se terminó el juego');
        }

    }, [turnsLeft]);

    return (
        <div className="mario-party-main-game__container">
            <div className="mario-party-main-game__day-status">
            </div>
            <div className="mario-party-main-game__turns-left">
                {turnsLeft}
            </div>
            <button>¡Mini Juegos!</button>
        </div>
    )

}
