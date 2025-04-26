import React, { useEffect, useRef, useState } from 'react';
import './blockbuster-timer.scss';

export const BlockbusterTimer = ({ defaultTime, typeOfTimer = 'restart' }) => {
    const [timer, setTimer] = useState();
    const [timerIsTicking, setTimerIsTicking] = useState(false);
    const [isTouchingButton, setIsTouchingButton] = useState(false);
    const [forceTimerUpdate, setForceTimerUpdate] = useState();
    const intervalRef = useRef(null);
    const isMobile = window.innerWidth < 768;

    const restartTimer = () => {
        if (intervalRef) {
            clearInterval(intervalRef.current);
        }
        setTimer(defaultTime);
        setForceTimerUpdate(prev => !prev);
        setTimerIsTicking(true);
    }

    const playMusic = (htmlId, audio) => {
        const sound = document.getElementById(htmlId);
        if (sound) {
            sound.pause();
            sound.currentTime = 0;
            sound.src = audio;
            sound.play();
        }
    }

    const handleClick = () => {
        playMusic('action-sound', './music/blockbuster/button-click.mp3');
        if (typeOfTimer == 'restart') {
            restartTimer();
        } else {
            pauseTimer();
        }
    }

    const pauseTimer = () => {
        if (timerIsTicking) { // pausa
            setTimerIsTicking(false);
            if (intervalRef) {
                clearInterval(intervalRef.current);
            }
        } else { // play
            if (timer == null) {
                setTimer(defaultTime);
            }
            setTimerIsTicking(true);
        }
    }

    useEffect(() => {
        if (typeOfTimer != 'restart' && !timerIsTicking) {
            return;
        }

        if (timer > 0) {
            intervalRef.current = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1_000);
        }

        if (timer == 0) {
            playMusic('action-sound', './music/blockbuster/timer-end.mp3');
        }

        return () => clearInterval(intervalRef.current);
    }, [timer, forceTimerUpdate, timerIsTicking]);

    return (
        <div className="blockbuster-timer blockbuster-timer__timer-container">
            <audio id="action-sound">
                <source type="audio/mp3" />
            </audio>
            <button
                className={`blockbuster-timer__button-reset-timer ${!timerIsTicking ? 'blockbuster-timer__button-reset-timer--stopped' : ''} ${(isTouchingButton && isMobile) ? 'blockbuster-timer__on-touch-start-button' : ''}`}
                {
                ...isMobile
                    ? {
                        onTouchStart: () => {
                            handleClick();
                            setIsTouchingButton(true);
                        },
                        onTouchEnd: () => {
                            setIsTouchingButton(false);
                        }
                    }
                    : { onClick: handleClick }
                }
            >
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
