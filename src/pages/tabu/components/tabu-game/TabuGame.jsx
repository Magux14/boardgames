import { useEffect, useRef, useState } from 'react'
import { useSaveState } from '../../../../hooks/useSaveState';
import { Timer } from '../../../../components/timer/Timer';
import SettingsIcon from '@mui/icons-material/Settings';
import SyncIcon from '@mui/icons-material/Sync';
import { Modal, Slider } from 'antd';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import './tabu-game.scss';
import ConfirmationModal from '../../../../components/confirmation-modal/ConfirmationModal';
import { TabuSettings } from '../tabu-settings/TabuSettings';

const defaultTabuGameState = {
    lstCharacters: [

    ],
    currentName: ''
}

const defaultBarValue = 10;
export const TabuGame = () => {

    const { saveState, getLoadState, deleteState } = useSaveState('tabu-state');
    const [barValue, setBarValue] = useState(defaultBarValue);
    const [gameState, setGameState] = useState(defaultTabuGameState);
    const [showResetListModal, setShowResetListModal] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [showTimer, setShowTimer] = useState(true);
    const [revealCharacter, setRevealCharacter] = useState(false);
    const timeoutRef = useRef(null);

    const handleReveal = () => {
        if (revealCharacter) {
            setRevealCharacter(false);
            cancelTimeout();
            return;
        }

        setRevealCharacter(true);
        timeoutRef.current = setTimeout(() => {
            setRevealCharacter(false);
        }, 2_000);
    }

    const cancelTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    const nextCharacter = () => {
        const lstNews = gameState.lstCharacters.filter(item => !item.checked);
        if (!lstNews.length) {
            return listHasEnded();
        }

        const indexLstNews = [Math.floor(Math.random() * lstNews.length)];
        const characterName = lstNews[indexLstNews].name;
        const index = gameState.lstCharacters.findIndex(item => item.name == characterName);
        gameState.lstCharacters[index].checked = true;
        gameState.currentName = gameState.lstCharacters[index].name;
        setGameState({ ...gameState });
        saveState(gameState);
    }

    const listHasEnded = () => {
        setShowResetListModal(true);
    }

    const resetList = () => {
        gameState.lstCharacters.forEach(item => {
            item.checked = false;
        });
        gameState.currentName = '';
        setGameState({ ...gameState });
        saveState(gameState);
        setShowResetListModal(false);
    }

    const handleBar = (value) => {
        setBarValue(value);
    }

    const handleOnCompleteBar = (value) => {
        if (value > 95) {
            setBarValue(defaultBarValue);
            nextCharacter();
            if (!revealCharacter) {
                handleReveal();
            }
        }
    }

    const setGameStateWithPersistance = (gameState) => {
        setGameState({ ...gameState });
        saveState(gameState);
    }

    const handleResetTimer = () => {
        setShowTimer(false);
        setTimeout(() => {
            setShowTimer(true);
        }, []);
    }

    useEffect(() => {
        const savedState = getLoadState();
        if (savedState) {
            setGameState({ ...savedState });
        } else {
            nextCharacter();
        }
    }, []);

    return (
        <div className="tabu-game tabu-game__container">
            <ConfirmationModal showAlert={showResetListModal} description={'¡La lista se terminó! vamos a la siguiente fase...'} showCancel={false} acceptCallback={resetList} closeCallback={resetList} />
            <div className={`tabu-game__character-container`} onClick={handleReveal}>
                <p className={`${!revealCharacter ? 'tabu-game__opacity0' : ''}`}>
                    {gameState.currentName}
                </p>
            </div>
            <br />
            {
                showTimer &&
                <Timer defaultTime={60} typeOfTimer='pause' />
            }
            <br />
            <div className="tabu-game__slider-container">
                <Slider defaultValue={20} onChange={handleBar} onChangeComplete={handleOnCompleteBar} value={barValue} tooltip={false} />
            </div>
            <div className="tabu-game__slider-description">
                <p>¡Desliza para otro personaje!</p>
                <ArrowRightAltIcon />
            </div>
            <div className="tabu-game__bottom-container">
                <Modal open={showSettings} footer={null} centered={true} onCancel={() => setShowSettings(false)}>
                    <TabuSettings gameState={gameState} setGameState={setGameStateWithPersistance} deleteState={deleteState} />
                </Modal>
                <SettingsIcon onClick={() => setShowSettings(true)} />

                <SyncIcon onClick={handleResetTimer} />
            </div>
        </div>
    )
}
