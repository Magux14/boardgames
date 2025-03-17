import React, { useEffect, useRef, useState } from 'react';
import { blockbusterThings } from '../../../../data/blockbuster';
import CancelIcon from '@mui/icons-material/Cancel';
import '../blockbuster-page.scss';

const defaultTime = 15;
export const BlockbusterTimer = ({ callbackClose }) => {
    const lstBlockbusterThings = [...blockbusterThings];
    const [timer, setTimer] = useState();
    const [forceTimerUpdate, setForceTimerUpdate] = useState();
    const [faceTofaceQuestion, setFaceTofaceQuestion] = useState();
    const intervalRef = useRef(null);

    const restartTimer = () => {
        if (intervalRef) {
            clearInterval(intervalRef.current);
        }
        setTimer(defaultTime);
        setForceTimerUpdate(prev => !prev);
    }

    const getFaceToFaceQuestion = () => {
        const randomIndex = Math.floor(Math.random() * lstBlockbusterThings.length);
        const thing = lstBlockbusterThings.splice(randomIndex, 1);
        setFaceTofaceQuestion(thing);
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

    useEffect(() => {
        getFaceToFaceQuestion();
    }, []);

    return (
        <div className="blockbuster-page__face-to-face-container">
            <CancelIcon className="blockbuster-page__close-button" onClick={closeFaceToFace} />
            <div className={`blockbuster-page__face-to-face-question`}>
                Películas donde hay "{faceTofaceQuestion}"...
            </div>
            <div className={`blockbuster-page__timer ${timer == 0 ? 'blockbuster-page__timer--time-over' : ''}`}>
                {timer > 0 ? timer : 'x__x'}
            </div>
            <button className="blockbuster-page__button blockbuster-page__button-reset-timer" onClick={restartTimer}>
                ¡Tu Turno!
            </button>
        </div>
    )
}
