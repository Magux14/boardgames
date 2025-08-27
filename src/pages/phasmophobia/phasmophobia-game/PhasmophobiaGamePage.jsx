
import { useEffect, useState } from 'react'
import { usePhasmophobiaGame } from '../hooks/usePhasmophobiaGame'
import ConfirmationModal from '../../../components/confirmation-modal/ConfirmationModal';
import { phasmophobiaEquipment } from '../../../../data/phasmophobia-data';
import { Header } from '../../../components/header/Header';
import { PGTestVideo } from './components/pg-test-video/PGTestVideo';
import { PGConfig } from './components/pg-config/PGConfig';
import { PGTarot } from './components/pg-tarot/PgTarot';
import './phasmophobia-game-page.scss';

export const PhasmophobiaGamePage = () => {

    const {
        getCurrentGhost,
        prepareGame,
        setConfig,
        setGhostStacks,
        setRandomLimitEnergyValue,
        config,
        damagedEquipment,
        defaultConfig,
        gameDate,
        ghostStacks,
        phasmoGhostNum,
        setTarotCards,
        lstTarotCards,
        resetGame
    } = usePhasmophobiaGame();

    const [showGhost, setShowGhost] = useState(false)
    const [showAlertFinishGame, setShowAlertFinishGame] = useState(false)
    const [currentTest, setCurrentTest] = useState(null)
    const [testResult, setTestResult] = useState(null)
    const [showGhostImage, setShowGhostImage] = useState(false);
    const [showVideoTest, setShowVideoTest] = useState(false);
    const [showCartasTarot, setShowCartasTarot] = useState(false);
    const [showResetGameModal, setShowResetGameModal] = useState(false);

    const loadHuntingMusic = (ghostNumber) => {
        if (ghostNumber == 3 || ghostNumber == 6) {
            return 'female';
        } else {
            return 'male';
        }
    }
    const [phasmoGhostMusic] = useState(loadHuntingMusic(phasmoGhostNum));


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
            equipmentIsDamaged = damagedEquipment.property == currentTest.property;
            if (equipmentIsDamaged && Math.random() >= 0.333) {
                positive = !positive;
            }
        }

        setTestResult({ result: positive, equipmentIsDamaged });
    }

    const addGhostStacks = (numberOfStacks = 1) => {
        if (ghostStacks.current + numberOfStacks >= ghostStacks.limit) {
            setRandomLimitEnergyValue();
            setShowGhostImage(true);
        } else {
            setGhostStacks(numberOfStacks);
        }
    }

    const handleSaveTarotCardsState = (cards) => {
        setTarotCards(cards);
    }

    const handleAskToResetGame = () => {
        setShowResetGameModal(true);
    }

    const handleResetGame = () => {
        setShowResetGameModal(false);
        setShowGhost(false);
        resetGame();
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


    return (
        <>
            <Header />
            <span style={{ visibility: showCartasTarot ? 'visible' : 'hidden' }}>
                <PGTarot
                    callbackClose={() => setShowCartasTarot(false)}
                    callbackAddGhostStacks={addGhostStacks}
                    lstTarotCards={lstTarotCards}
                    callbackSaveState={handleSaveTarotCardsState}
                />
            </span>

            <div className="phasmophobia-game phasmophobia-game__container">
                {
                    !config &&
                    <PGConfig callbackSetConfig={setConfig} defaultConfig={defaultConfig} />
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
                        <ConfirmationModal
                            description="¿Deseas empezar una nueva partida?"
                            acceptCallback={handleResetGame}
                            closeCallback={() => setShowResetGameModal(false)}
                            showAlert={showResetGameModal}
                        >
                        </ConfirmationModal>

                        {
                            gameDate &&
                            <span style={{ right: 0 }} onClick={handleAskToResetGame}>
                                {gameDate.toLocaleString()}
                            </span>
                        }

                        <div className="phasmophobia-game__top-controls-container">

                            <div className="phasmophobia-game__sanity-container">
                                <div className="phasmophobia-game__sanity-title">
                                    Energía Maldita
                                    {/* <div>Testing: Limit: {ghostStacks.limit} | Current: {ghostStacks.current}</div> */}
                                </div>
                                <img src="./img/phasmophobia/fire.gif" className="phasmophobia-game__fire-sanity" alt="fire" width={20} style={{ zoom: ghostStacks.current + 1 }} />
                                <button className="phasmo-button" onClick={() => addGhostStacks()}>+ 1 stack</button>
                            </div>

                            <div className="phasmophobia-game__make-test-container">
                                <div className="phasmophobia-game__preview-test-container">
                                    <div className="phasmophobia-game__preview-test-name">
                                        {currentTest ? currentTest.name : 'Seleccione dispositivo'}
                                    </div>
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
                        </div>


                        <br />

                        <div className="tests-dice-container">
                            <div className="phasmophobia-game__equipment-buttons-container">
                                <label className="test-title">Pruebas</label>
                                <div className="phasmophobia-game__equipment-button-container">
                                    {
                                        phasmophobiaEquipment.map((equipment) =>
                                            <img key={equipment.name} src={`./img/phasmophobia/equipment/${equipment.property}.png`} className={`phasmophobia-game__equipment-button ${equipment.name == currentTest?.name ? 'phasmophobia-game__equipment-button--selected' : ''}`} onClick={() => handleTestSelect(equipment)} alt={`${equipment.name}`} />
                                        )
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="phasmophobia-game__extra-buttons-container">
                            <button onClick={(() => setShowCartasTarot(true))}> Cartas Tarot</button>
                        </div>

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

                        <div className="phasmophobia-game__extra-buttons-container">
                            <button onClick={setRandomLimitEnergyValue}>Resetar Energía Maldita</button>
                        </div>
                    </>
                }
            </div>
        </>
    )
}
