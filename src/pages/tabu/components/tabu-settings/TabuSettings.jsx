import React, { useState } from 'react';
import { TabuNewCharacters } from '../tabu-new-characters/TabuNewCharacters';
import { Modal } from 'antd';
import './tabu-settings.scss';
import ConfirmationModal from '../../../../components/confirmation-modal/ConfirmationModal';
import SyncIcon from '@mui/icons-material/Sync';

export const TabuSettings = ({ gameState, setGameState, deleteState }) => {

    const [showAddPage, setShowAddPage] = useState(false);
    const [showResetGame, setShowResetGame] = useState(false);

    const handleOpenAddCharacters = () => {
        setShowAddPage(true);
    }

    const handleResetGame = () => {
        deleteState();
        setGameState(defaultTabuGameState);
        setShowResetGame(false);
    }

    return (
        <div className="tabu-settings tabu-settings__container">
            <div className="tabu-settings__item">
                Total de personajes: {gameState.lstCharacters.length}
            </div>
            <div className="tabu-settings__item">
                Adivinados: {gameState.lstCharacters.filter(item => item.checked).length}
            </div>
            <div className="tabu-settings__item">
                Restantes: {gameState.lstCharacters.filter(item => !item.checked).length}
            </div>
            <div className="tabu-settings__item">
                <button onClick={handleOpenAddCharacters}>Agregar Personajes</button>
            </div>
            <div className="tabu-settings__item">
                <button>Ver lista actual</button>
            </div>

            <div>
                <ConfirmationModal showAlert={showResetGame} description={'¿Deseas resetear el juego? todos los personajes se perderán'} acceptCallback={handleResetGame} closeCallback={(() => setShowResetGame(false))} />
                <SyncIcon onClick={() => setShowResetGame(true)} />
            </div>

            {
                showAddPage &&
                <Modal open={showAddPage} footer={null} centered={true} onCancel={() => setShowAddPage(false)} >
                    <TabuNewCharacters gameState={gameState} setGameState={setGameState} callbackClose={() => setShowAddPage(false)} />
                </Modal>
            }

        </div>
    )
}
