
import React, { useEffect, useState } from 'react'
import { usePhasmophobiaGame } from '../hooks/usePhasmophobiaGame'
import { Dice } from '../components/dice/Dice';
import './PhasmophobiaGamePage.css'
import ConfirmationModal from '../components/confirmation-modal/ConfirmationModal';

export const PhasmophobiaGamePage = () => {

    const [playersNum, setPlayersNum] = useState({ min: 1, max: 2 });
    const { prepareGame, getCurrentGhost } = usePhasmophobiaGame();
    const [showGhost, setShowGhost] = useState(false)
    const [showAlertFinishGame, setShowAlertFinishGame] = useState(false)

    useEffect(() => {
        prepareGame();
    }, [])

    const handleSetPlayersNum = (playersNum) => {
        console.log('playersNum', playersNum);
        if (isNaN(playersNum)) {
            return;
        }
        setPlayersNum({ min: 1, max: Number(playersNum) });
    }

    const finishGame = () => {
        setShowAlertFinishGame(false);
        setShowGhost(true);
    }

    return (
        <div id="phasmophobia-game-container">
            <div className="title">Phasmophobia</div>

            <div id="form-container">
                <label>Players: </label>
                <input type="number" value={playersNum.max} onChange={(ev) => handleSetPlayersNum(ev.target.value)}></input>
            </div>
            <br />

            <div>Fantasma:</div>
            {
                showGhost ?
                    <div className="ghost-title">{getCurrentGhost().name}</div>
                    : <ConfirmationModal
                        description="¿Deseas terminar el juego? el fantasma será revelado"
                        acceptCallback={finishGame}
                        closeCallback={() => setShowAlertFinishGame(false)}
                        showAlert={showAlertFinishGame}
                    >
                        <div className="ghost-title" onClick={() => setShowAlertFinishGame(true)}>???</div>
                    </ConfirmationModal>
            }

            <br />
            <br />
            <Dice diceName="Jugador" initialDiceNumbers={playersNum} />

        </div>
    )
}
