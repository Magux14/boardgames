
import React, { useEffect, useState } from 'react'
import { usePhasmophobiaGame } from '../../hooks/usePhasmophobiaGame'
import { Dice } from '../../components/dice/Dice';
import './PhasmophobiaGamePage.css'
import ConfirmationModal from '../../components/confirmation-modal/ConfirmationModal';
import { phasmophobiaEquipment } from '../../../data/phasmophobia-data';
import { Header } from '../../components/header/Header';

const minBadEnergyValue = 4;
const maxBadEnergyValue = 12;

export const PhasmophobiaGamePage = () => {

    const [playersNum, setPlayersNum] = useState({ min: 1, max: 2 });
    const { prepareGame, getCurrentGhost, getDamagedEquipment } = usePhasmophobiaGame();
    const [showGhost, setShowGhost] = useState(false)
    const [showAlertFinishGame, setShowAlertFinishGame] = useState(false)
    const [currentTest, setCurrentTest] = useState(null)
    const [testResult, setTestResult] = useState(null)
    const [ghostStacks, setGhostStacks] = useState({ current: 0, limit: 0 });
    const [showGhostImage, setShowGhostImage] = useState(false);

    useEffect(() => {
        prepareGame();
    }, [])

    const setLimitEnergyValue = () => {
        setGhostStacks({
            current: 0,
            limit: (Math.floor(Math.random() * (maxBadEnergyValue - minBadEnergyValue + 1)) + minBadEnergyValue)
        });
    }

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

        if (ghost[currentTest.property] == true) {
            positive = true;
        }

        const equipmentIsDamaged = getDamagedEquipment().property == currentTest.property;
        if (equipmentIsDamaged && Math.random() >= 0.5) {
            positive = !positive;
        }

        setTestResult({ result: positive, equipmentIsDamaged });
    }

    const addGhostStacks = () => {
        if (ghostStacks.current + 1 == ghostStacks.limit) {
            setLimitEnergyValue();
            setShowGhostImage(true);
        } else {
            setGhostStacks(previous => {
                return {
                    current: previous.current + 1,
                    limit: previous.limit
                }
            });
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setShowGhostImage(false);
        }, 7_000)
    }, [showGhostImage])

    useEffect(() => {
        setLimitEnergyValue();
    }, []);

    return (
        <>
            <Header />
            <div id="phasmophobia-game-container">
                {
                    showGhostImage &&
                    <>
                        <audio src="./music/phasmophobia-ghost-hunting.mp3" autoPlay loop></audio>
                        <img className="all-screen-ghost" src={`./img/phasmophobia/ghost1.png`} alt="ghost1" />
                    </>
                }
                <div id="title-and-ghost-container">
                    <div className="title">Phasmophobia</div>
                    <div>
                        <div className="ghost-title">Fantasma:</div>
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
                    </div>
                </div>

                <div id="cordura-container">
                    <label className="cordura-title">Energía Maldita</label>
                    <div className='controllers'>
                        <label></label>
                        <label className="cordura-amount">{ghostStacks.current}</label>
                        <button onClick={() => addGhostStacks()}>+</button>
                    </div>
                </div>


                <div className="current-test">
                    <div className="preview-test-container">
                        <label>
                            Prueba:
                        </label>
                        <br />
                        <label className="result">
                            {currentTest ? currentTest.name : '???'}
                        </label>
                    </div>
                    <div className="result-test-container">

                        <button className="phasmo-button" onClick={() => handleTestResult()} disabled={currentTest ? false : true}>Probar</button>
                        <br />
                        {testResult != null ?
                            (
                                testResult.result == true ?
                                    <label className={`result ${testResult.equipmentIsDamaged ? 'fake' : 'positive'}`}>Positivo</label>
                                    : <label className={`result ${testResult.equipmentIsDamaged ? 'fake' : 'negative'}`}>Negativo</label>
                            ) : <label className="result">???</label>
                        }
                    </div>
                </div>

                <br />

                <div className="tests-dice-container">
                    <div>
                        <label className="test-title">Pruebas</label>
                        <div id="test-buttons-container">
                            {
                                phasmophobiaEquipment.map((equipment) =>
                                    <div key={equipment.name}>
                                        <button className={`phasmo-button ${equipment.name == currentTest?.name ? 'selected-button' : ''}`} onClick={() => handleTestSelect(equipment)}><label>{equipment.name}</label></button>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>

                <br />
                <Dice diceName="D6" initialDiceNumbers={{ min: 1, max: 6 }} />
                <br />
                <br />
                <br />


            </div>
        </>
    )
}
