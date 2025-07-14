import React, { useState } from 'react'
import { Timer } from '../../components/timer/Timer'
import { Header } from '../../components/header/Header';
import './timer-page.scss';

export const TimerPage = () => {

    const [remainingTime, setRemaningTime] = useState(60);
    const [key, setKey] = useState(0);

    const handleSetNewTime = (value) => {
        setKey(prev => prev + 1);
        setRemaningTime(value);
    }

    return (
        <>
            <Header />

            <div className="timer-page timer-page__container">
                <Timer key={`timer-key-${key}`} typeOfTimer='pause' newInjectedTime={remainingTime} />

                <div className="timer-page__buttons-container">
                    <button onClick={() => handleSetNewTime(10)}>10 seg</button>
                    <button onClick={() => handleSetNewTime(20)}>20 seg</button>
                    <button onClick={() => handleSetNewTime(30)}>30 seg</button>
                    <button onClick={() => handleSetNewTime(60)}>1 min</button>
                    <button onClick={() => handleSetNewTime(120)}>2 min</button>
                    <button onClick={() => handleSetNewTime(300)}>5 min</button>
                </div>
            </div>

        </>
    )
}
