import React, { useEffect, useRef, useState } from 'react';
import './blockbuster-timer.scss';

export const BlockbusterTimer = ({ defaultTime }) => {
    const [timer, setTimer] = useState();
    const [forceTimerUpdate, setForceTimerUpdate] = useState();
    const intervalRef = useRef(null);

    const restartTimer = () => {
        if (intervalRef) {
            clearInterval(intervalRef.current);
        }
        setTimer(defaultTime);
        setForceTimerUpdate(prev => !prev);
    }

    useEffect(() => {
        if (timer > 0) {
            intervalRef.current = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1_000);
        }
        return () => clearInterval(intervalRef.current);
    }, [timer, forceTimerUpdate]);

    return (
        <div className="blockbuster-timer blockbuster-timer__timer-container">
            <button className={`blockbuster-timer__button-reset-timer`} onClick={restartTimer}>
                {
                    (timer == null || timer <= 0) &&
                    <span className={`blockbuster-timer__button-reset-timer--font-smaller`}>
                        {
                            timer == null ? '!TURNO!' : '¡TIEMPO!'
                        }
                    </span>
                }
                {
                    timer > 0 &&
                    <span>
                        {timer}
                    </span>
                }
            </button>
        </div>
    )
}
