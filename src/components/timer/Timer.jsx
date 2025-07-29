import { useEffect, useRef, useState } from 'react';
import CachedIcon from '@mui/icons-material/Cached';
import './timer.scss';

export const Timer = ({ defaultTime, typeOfTimer = 'restart', newInjectedTime, showResetButton }) => {
    const [timer, setTimer] = useState();
    const [timerIsTicking, setTimerIsTicking] = useState(false);
    const [isTouchingButton, setIsTouchingButton] = useState(false);
    const [forceTimerUpdate, setForceTimerUpdate] = useState();
    const intervalRef = useRef(null);
    const isMobile = window.innerWidth < 768;

    if (newInjectedTime) {
        defaultTime = newInjectedTime;
    }

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

    const pauseTimer = (forcePause = false) => {
        if (timerIsTicking || forcePause) { // pausa
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

    useEffect(() => {
        if (newInjectedTime) {
            handleClick();
        }
    }, [newInjectedTime])

    return (
        <div className="timer timer__timer-container">
            <audio id="action-sound">
                <source type="audio/mp3" />
            </audio>
            <button
                className={`timer__button-reset-timer ${typeOfTimer == 'restart' ? 'timer__button-reset-timer--battle' : ''} ${!timerIsTicking ? 'timer__button-reset-timer--stopped' : ''} ${(isTouchingButton && isMobile) ? 'timer__on-touch-start-button' : ''}`}
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
                    <span className={`timer__button-reset-timer--font-smaller`}>
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
            {
                showResetButton &&
                <CachedIcon className="timer__restart-timer-icon" onClick={() => {
                    restartTimer();
                    playMusic('action-sound', './music/blockbuster/button-click.mp3');
                    pauseTimer(true);
                }} />
            }
        </div>
    )
}
