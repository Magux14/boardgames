import React, { useEffect, useState } from 'react'
import { useSaveState } from '../../../../hooks/useSaveState';
import { BlockbusterTimer } from '../../../../components/blockbuster-timer/BlockbusterTimer';
import SettingsIcon from '@mui/icons-material/Settings';
import SyncIcon from '@mui/icons-material/Sync';
import { Slider } from 'antd';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import './tabu-game.scss';
import ConfirmationModal from '../../../../components/confirmation-modal/ConfirmationModal';

const defaultTabuGameState = {
    lstCharacters: [
        {
            name: 'Coraje el perro cobarde',
            checked: false
        },
        {
            name: 'El chavo',
            checked: false
        },
        {
            name: 'matilda',
            checked: false
        },
    ],
    currentName: 'matilda'
}

const defaultBarValue = 10;
export const TabuGame = () => {

    const { saveState, getLoadState, deleteState } = useSaveState('tabu-state');
    const [barValue, setBarValue] = useState(defaultBarValue);
    const [gameState, setGameState] = useState(defaultTabuGameState);
    const [showResetListModal, setShowResetListModal] = useState(false);

    const nextCharacter = () => {
        console.log('nextCharacter');
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
        }
    }

    useEffect(() => {
        deleteState();
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
            <div className="tabu-game__character-container">
                <p>
                    {gameState.currentName}
                </p>
            </div>
            <br />
            <BlockbusterTimer defaultTime={60} typeOfTimer='pause' />
            <br />
            <br />
            <br />
            <div className="tabu-game__slider-container">
                <Slider defaultValue={20} onChange={handleBar} onChangeComplete={handleOnCompleteBar} value={barValue} tooltip={false} />
            </div>
            <div className="tabu-game__slider-description">
                <p>¡Desliza para otro personaje!</p>
                <ArrowRightAltIcon />
            </div>
            <div className="tabu-game__bottom-container">
                <SettingsIcon />
                <SyncIcon />
            </div>
        </div>
    )
}
