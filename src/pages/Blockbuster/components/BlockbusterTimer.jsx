import React, { useEffect, useRef, useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import '../blockbuster-page.scss';

export const BlockbusterTimer = ({ defaultTime, children, callbackClose }) => {
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

    const closeFaceToFace = () => {
        if (intervalRef) {
            clearInterval(intervalRef.current);
        }
        callbackClose();
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
        <div className="blockbuster-page__modal-container">
            <CancelIcon className="blockbuster-page__close-button" onClick={closeFaceToFace} />
            <div className={`blockbuster-page__face-to-face-question`}>
                {children}
            </div>
            <div className={`blockbuster-page__timer ${!timer ? 'blockbuster-page__timer--time-over' : ''}`}>
                {timer ? timer : 'x__x'}
            </div>
            <button className="blockbuster-page__button blockbuster-page__button-reset-timer" onClick={restartTimer}>
                ¡Tu Turno!
            </button>
        </div>
    )
}
