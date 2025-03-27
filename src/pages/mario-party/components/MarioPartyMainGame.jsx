import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import './mario-party-main-game.scss';

const daysLeftTuSwitchTime = 2;

export const MarioPartyMainGame = () => {
    const [searchParams] = useSearchParams();
    const [turnsLeft, setTurnsLeft] = useState(searchParams.get('t') || 10);
    const [day, setDay] = useState({
        isDay: true,
        daysLeft: daysLeftTuSwitchTime
    });

    const handleNextTurn = () => {
        setTurnsLeft((prev) => prev - 1);
        if (day.daysLeft > 1) {
            setDay({
                ...day,
                daysLeft: --day.daysLeft
            });
        } else {
            setDay({
                isDay: !day.isDay,
                daysLeft: daysLeftTuSwitchTime
            });
        }
    }

    useEffect(() => {

        if (turnsLeft <= 0) {
            console.log('se terminó el juego');
        }

    }, [turnsLeft]);

    return (
        <div className={`mario-party-main-game__container ${day.isDay ? 'mario-party-main-game__container--day' : 'mario-party-main-game__container--night'}`}>
            <div className="mario-party-main-game__day-status-container">
                {
                    day.isDay ?
                        [1, 2].map((_, index) =>
                            <WbSunnyIcon
                                key={index}
                                className={`mario-party-main-game__day-status mario-party-main-game__day-status-sun ${index >= day.daysLeft ? 'mario-party-main-game__day-status--inactive' : ''}`}
                            />
                        )
                        :
                        [1, 2].map((_, index) =>
                            <BedtimeIcon
                                key={index}
                                className={`mario-party-main-game__day-status mario-party-main-game__day-status-moon ${index >= day.daysLeft ? 'mario-party-main-game__day-status--inactive' : ''}`}
                            />
                        )
                }
            </div>
            <div className="mario-party-main-game__turns-left">
                {
                    turnsLeft > 1
                        ?
                        <span>
                            ¡Faltan {turnsLeft} rondas!
                        </span>
                        :
                        <span>
                            ¡Último turno!
                        </span>
                }
            </div>
            <button className="mario-party-main-game__button" onClick={(() => handleNextTurn())}>¡Mini Juegos!</button>
        </div>
    )

}
