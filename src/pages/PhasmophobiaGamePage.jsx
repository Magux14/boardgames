
import React, { useEffect, useState } from 'react'
import { usePhasmophobiaGame } from '../hooks/usePhasmophobiaGame'
import { Dice } from '../components/dice/Dice';
import './PhasmophobiaGamePage.css'
import ConfirmationModal from '../components/confirmation-modal/ConfirmationModal';
import { phasmophobiaEquipmentName } from '../../data/phasmophobia-data';

export const PhasmophobiaGamePage = () => {

    const [playersNum, setPlayersNum] = useState({ min: 1, max: 2 });
    const { prepareGame, getCurrentGhost } = usePhasmophobiaGame();
    const [showGhost, setShowGhost] = useState(false)
    const [showAlertFinishGame, setShowAlertFinishGame] = useState(false)
    const [currentTest, setCurrentTest] = useState(null)
    const [testResult, setTestResult] = useState(null)

    useEffect(() => {
        prepareGame();
    }, [])

    const handleSetPlayersNum = (playersNum) => {
        if (isNaN(playersNum)) {
            return;
        }
        setPlayersNum({ min: 1, max: Number(playersNum) });
    }

    const finishGame = () => {
        setShowAlertFinishGame(false);
        setShowGhost(true);
    }

    const handleTestSelect = (equipment) => {
        setTestResult(null);
        setCurrentTest(equipment)
    }

    const handleTestResult = () => {
        const ghost = getCurrentGhost();
        let positive = false;

        console.log(ghost[currentTest.property]);
        console.log(currentTest.property);
        if (ghost[currentTest.property] == true) {
            positive = true;
        }

        setTestResult({ result: positive });
    }

    return (
        <div id="phasmophobia-game-container">
            <div className="title">Phasmophobia</div>

            {/* <div id="form-container">
                <label>Players: </label>
                <input type="number" value={playersNum.max} onChange={(ev) => handleSetPlayersNum(ev.target.value)}></input>
            </div> */}

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

            <div id="test-buttons-container">
                {
                    phasmophobiaEquipmentName.map((equipment) =>
                        <div key={equipment.name}>
                            <button className={`phasmo-button ${equipment.name == currentTest?.name ? 'selected-button' : ''}`} onClick={() => handleTestSelect(equipment)}>{equipment.name}</button>
                        </div>
                    )
                }
            </div>

            <br />
            <div className="current-test">
                Prueba:
                <br />
                <label>
                    {currentTest ? currentTest.name : '???'}
                </label>
                <button className="phasmo-button" onClick={() => handleTestResult()} disabled={currentTest ? false : true}>Probar</button>
                <br />
                <label>Resultado:</label>
                {testResult != null ?
                    (
                        testResult.result == true ?
                            <label className="positive ghost-title">Positivo</label>
                            : <label className="negative ghost-title">Negativo</label>
                    ) : <label className="ghost-title">???</label>
                }
            </div>

            <br />
            <br />

            <Dice diceName="D6" initialDiceNumbers={{ min: 1, max: 6 }} />

            <br />
            <br />
            <br />
            <br />


        </div>
    )
}
