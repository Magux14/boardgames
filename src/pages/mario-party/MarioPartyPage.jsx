import React, { useState, useEffect } from 'react';
import { Header } from '../../components/header/Header';
import { MarioPartyGameList } from './components/game-list/MarioPartyGameList';
import { lstMarioPartyGames } from '../../../data/mario-party';
import { Modal } from 'antd';
import { useSearchParams } from 'react-router-dom';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import './mario-party.scss';

const daysLeftToSwitchTime = 2;
const dayMusic = "./img/mario-party/background-theme-day.ogg";
const nightMusic = "./img/mario-party/background-theme-night.ogg";
const bellSound = "./img/mario-party/bell.ogg";

export const MarioPartyPage = () => {

    const [showGameList, setShowGameList] = useState(false);
    const [lstGames, setLstGames] = useState([...lstMarioPartyGames]);
    const [searchParams] = useSearchParams();
    const [gameState, setGameState] = useState({
        turnsLeft: searchParams.get('t') || 10,
        isDay: true,
        daysLeft: daysLeftToSwitchTime
    });

    const handleNextTurn = () => {
        const remaingTurns = gameState.turnsLeft - 1;
        if (gameState.daysLeft > 1) {
            setGameState({
                ...gameState,
                daysLeft: --gameState.daysLeft,
                turnsLeft: remaingTurns
            });
        } else {
            setGameState({
                isDay: !gameState.isDay,
                daysLeft: daysLeftToSwitchTime,
                turnsLeft: remaingTurns
            });
        }
        setShowGameList(false);
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

    useEffect(() => {
        if (gameState.turnsLeft <= 0) {
            console.log('se terminó el juego');
        }

        if (gameState.daysLeft == daysLeftToSwitchTime) {
            if (gameState.isDay) {
                playMusic('background-audio', dayMusic);
            } else {
                playMusic('background-audio', nightMusic);
            }
        }
        playMusic('action-sound', bellSound);

    }, [gameState]);

    useEffect(() => {
        document.getElementById('background-audio').volume = 0.4;
        setTimeout(() => {
            playMusic('background-audio', dayMusic);
        }, [2_000]);
    }, [])

    return (
        <>
            <audio id="background-audio" loop={true} >
                <source type="audio/ogg" />
            </audio>
            <audio id="action-sound">
                <source src={bellSound} type="audio/ogg" />
            </audio>
            <Header />
            {
                showGameList &&
                <Modal
                    open={showGameList}
                    width={'100vw'}
                    height={'100vh'}
                    centered={true}
                    footer={null}
                    onCancel={() => setShowGameList(false)}
                    maskClosable={false}
                >
                    <MarioPartyGameList
                        lstGames={lstGames}
                        callbackUpdateGameList={setLstGames}
                        callbackHandleNextTurn={handleNextTurn}
                        callbackSound={playMusic}
                    />
                </Modal>
            }
            <div className={`mario-party__container ${gameState.isDay ? 'mario-party__container--day' : 'mario-party__container--night'}`}>
                <div className="mario-party__day-status-container">
                    {
                        gameState.isDay ?
                            [1, 2].map((_, index) =>
                                <WbSunnyIcon
                                    key={index}
                                    className={`mario-party__day-status mario-party__day-status-sun ${index >= gameState.daysLeft ? 'mario-party__day-status--inactive' : ''}`}
                                />
                            )
                            :
                            [1, 2].map((_, index) =>
                                <BedtimeIcon
                                    key={index}
                                    className={`mario-party__day-status mario-party__day-status-moon ${index >= gameState.daysLeft ? 'mario-party__day-status--inactive' : ''}`}
                                />
                            )
                    }
                </div>
                <div className="mario-party__turns-left">
                    {
                        gameState.turnsLeft > 1 &&
                        <span>
                            Faltan {gameState.turnsLeft} rondas!
                        </span>
                    }
                    {
                        gameState.turnsLeft == 1 &&
                        <span>
                            ¡Último turno!
                        </span>
                    }
                    {
                        gameState.turnsLeft < 1 &&
                        <span>
                            ¡Se acabó!
                        </span>
                    }
                </div>
                <button className="mario-party__button" onClick={(() => setShowGameList(true))}>Mini-Juego</button>
            </div>
        </>
    )
}
