import React, { useState } from 'react';
import './pg-players-num.scss';

export const PGPlayersNum = ({ callbackSetPlayersNum }) => {

    const [playersNum, setPlayersNum] = useState();

    const handlePlayersNumChange = (newValue) => {

        if (!newValue) {
            setPlayersNum(null);
            return;
        }

        if (isNaN(newValue) || newValue < 1 || newValue > 5) {
            return;
        }

        setPlayersNum(Number(newValue));
    }

    const handleContinue = () => {
        callbackSetPlayersNum(playersNum);
    }

    return (
        <div className="pg-players-num">
            <div>
                Ingrese cantidad de jugares
            </div>
            <div className="pg-players-num__input-container">
                <input type="number" value={playersNum} onChange={(ev) => handlePlayersNumChange(ev.target.value)} />
                <button onClick={handleContinue}>Continuar</button>
            </div>
        </div>
    )
}
