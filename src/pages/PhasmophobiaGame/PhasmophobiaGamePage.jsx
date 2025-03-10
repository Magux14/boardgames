
import React, { useEffect, useState } from 'react'
import { usePhasmophobiaGame } from '../../hooks/usePhasmophobiaGame'
import { Dice } from '../../components/dice/Dice';
import ConfirmationModal from '../../components/confirmation-modal/ConfirmationModal';
import { phasmophobiaEquipment } from '../../../data/phasmophobia-data';
import { Header } from '../../components/header/Header';
import { PGTestVideo } from './components/pg-test-video/PGTestVideo';
import { PGConfig } from './components/pg-config/PGConfig';
import './phasmophobia-game-page.scss';
import { PGTarot } from './components/pg-tarot/PgTarot';

export const PhasmophobiaGamePage = () => {

    const [config, setConfig] = useState();
    const { prepareGame, getCurrentGhost, getDamagedEquipment } = usePhasmophobiaGame();
    const [showGhost, setShowGhost] = useState(false)
    const [showAlertFinishGame, setShowAlertFinishGame] = useState(false)
    const [currentTest, setCurrentTest] = useState(null)
    const [testResult, setTestResult] = useState(null)
    const [ghostStacks, setGhostStacks] = useState({ current: 0, limit: 0 });
    const [showGhostImage, setShowGhostImage] = useState(false);
    const [phasmoGhostNum] = useState((Math.floor(Math.random() * (6)) + 1));
    const [showVideoTest, setShowVideoTest] = useState(false);
    const [showCartasTarot, setShowCartasTarot] = useState(false);

    const loadHuntingMusic = (ghostNumber) => {
        if (ghostNumber == 3 || ghostNumber == 6) {
            return 'female';
        } else {
            return 'male';
        }
    }

    const [phasmoGhostMusic] = useState(loadHuntingMusic(phasmoGhostNum));

    const setLimitEnergyValue = () => {
        setGhostStacks({
            current: 0,
            limit: (Math.floor(Math.random() * (config.maxBadEnergyValue - config.minBadEnergyValue + 1)) + config.minBadEnergyValue)
        });
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

        let equipmentIsDamaged = false;
        if (config.equipmentIsDamaged) {
            equipmentIsDamaged = getDamagedEquipment().property == currentTest.property;
            if (equipmentIsDamaged && Math.random() >= 0.333) {
                positive = !positive;
            }
        }

        setTestResult({ result: positive, equipmentIsDamaged });
    }

    const addGhostStacks = (numberOfStacks = 1) => {
        if (ghostStacks.current + numberOfStacks >= ghostStacks.limit) {
            setLimitEnergyValue();
            setShowGhostImage(true);
        } else {
            setGhostStacks(previous => {
                return {
                    current: previous.current + numberOfStacks,
                    limit: previous.limit
                }
            });
        }
    }

    useEffect(() => {
        if (showGhostImage) {
            setTimeout(() => {
                setShowGhostImage(false);
            }, 7_000)
        }
    }, [showGhostImage])

    useEffect(() => {
        prepareGame();
    }, []);

    useEffect(() => {
        if (!showVideoTest) {
            setShowVideoTest(true)
        }
    }, [testResult]);

    useEffect(() => {
        if (config) {
            setLimitEnergyValue();
        }
    }, [config])

    return (
        <>

            <Header />

            <span style={{ visibility: showCartasTarot ? 'visible' : 'hidden' }}>
                <PGTarot
                    callbackClose={() => setShowCartasTarot(false)}
                    callbackAddGhostStacks={addGhostStacks}
                />
            </span>

            <div className="phasmophobia-game phasmophobia-game__container">
                {
                    !config &&
                    <PGConfig callbackSetConfig={setConfig} />
                }
                {
                    config &&
                    <>
                        {
                            showGhostImage &&
                            <>
                                <audio src={`./music/phasmophobia-ghost-hunting-${phasmoGhostMusic}.mp3`} autoPlay loop></audio>
                                <img className="all-screen-ghost" src={`./img/phasmophobia/ghost-${phasmoGhostNum}.png`} alt="ghost1" />
                            </>
                        }
                        <div className="phasmophobia-game__sanity-container">
                            <label className="phasmophobia-game__sanity-title">
                                Energía Maldita
                                {/* <div>Testing: Limit: {ghostStacks.limit} | Current: {ghostStacks.current}</div> */}
                            </label>

                            <div className='phasmophobia-game__sanity-controllers'>
                                <div className="phasmophobia-game__fire-sanity-container">
                                    <img src="./img/phasmophobia/fire.gif" className="fire-sanity" alt="fire" width={20} style={{ zoom: ghostStacks.current + 1 }} />
                                </div>
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
                                {
                                    (currentTest && testResult && showVideoTest) &&
                                    <PGTestVideo
                                        phasmophobiaEquipment={currentTest.property}
                                        hasEvidence={testResult.result}
                                        callbackClose={() => setShowVideoTest(false)}
                                        equipmentIsDamaged={testResult.equipmentIsDamaged}
                                    />
                                }
                                <button className="phasmo-button" onClick={() => handleTestResult()} disabled={currentTest ? false : true}>Probar</button>
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
                        <br />
                        <div className="phasmophobia-game__cartas-tarot-button-container">
                            <button onClick={(() => setShowCartasTarot(true))}> Cartas Tarot</button>

                        </div>

                        <br />
                        <br />
                        <div className="phasmophobia-game__title-and-ghost-container">
                            <div>
                                <div className="phasmophobia-game__ghost-title">Fantasma:</div>
                                {
                                    showGhost ?
                                        <div className="phasmophobia-game__ghost-title-revealed">{getCurrentGhost().name}</div>
                                        : <ConfirmationModal
                                            description="¿Deseas terminar el juego? el fantasma será revelado"
                                            acceptCallback={finishGame}
                                            closeCallback={() => setShowAlertFinishGame(false)}
                                            showAlert={showAlertFinishGame}
                                        >
                                            <div className="phasmophobia-game__ghost-title-revealed" onClick={() => setShowAlertFinishGame(true)}>???</div>
                                        </ConfirmationModal>
                                }
                            </div>
                        </div>

                        <br />
                        <Dice diceName="D6" initialDiceNumbers={{ min: 1, max: 6 }} />
                        <br />
                        <br />
                        <br />
                    </>
                }
            </div>
        </>
    )
}
