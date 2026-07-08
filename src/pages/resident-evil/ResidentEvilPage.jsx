import { useState } from 'react';
import { BulletCounter } from './components/bullet-counter/BulletCounter';
import { Inventory } from './components/inventory/Inventory';
import { LifeScreen } from './components/life-screen/LifeScreen';
import { useResidentEvilGame } from './hooks/useResidentEvilGame';
import { Modal } from 'antd';
import { ReSettings } from './components/re-settings/ReSettings';
import { ResidentRooms } from './components/resident-rooms/ResidentRooms';
import SettingsIcon from '@mui/icons-material/Settings';
import './resident-evil.scss';
import { useResidentAudio } from './hooks/useResidentAudio';
export const ResidentEvilPage = () => {

    const {
        gameState,
        setGameValue,
        currentLifeLabel,
        addItemToInventory,
        recoverHealth,
        setGameStateAndSave,
        addBulletsByGunpowder
    } = useResidentEvilGame();

    const [editMode, setEditMode] = useState(false);
    const [openSettingsModal, setOpenSettingsModal] = useState(false);
    const [showWhiteScreen, setShowWhiteScreen] = useState(false);
    const [showRedScreen, setShowRedScreen] = useState(false);
    const { playJillDamage } = useResidentAudio();

    const handleSaveAndCloseSettingsModal = (gameState) => {
        setGameStateAndSave(gameState);
        setOpenSettingsModal(false);
        setShowWhiteScreen(true);

        setTimeout(() => {
            setShowWhiteScreen(false);
        }, 1_000);
    }

    const handleSetLife = (isDamage) => {
        if (gameState.life > 0 && isDamage) {
            playJillDamage();
            setGameValue('life', gameState.life - 1);
            setShowRedScreen(true);
            setTimeout(() => {
                setShowRedScreen(false);
            }, 600);
        } else if (gameState.life < 4 && !isDamage) {
            setGameValue('life', gameState.life + 1);
        }
    }

    return (
        <div className="resident-evil__container">
            {
                showWhiteScreen &&
                <div className="resident-evil__white-screen" />
            }
            {
                showRedScreen &&
                <div className="resident-evil__red-screen" />
            }
            <Modal
                open={openSettingsModal}
                footer={null}
                onCancel={() => setOpenSettingsModal(false)}
                className="inventory__modal"
                centered={true}
                destroyOnClose={true}
            >
                <ReSettings callbackSetDifficulty={handleSaveAndCloseSettingsModal} />
            </Modal>

            <div className="resident-evil__guns-container">
                <div className="resident-evil__life-points-labels-container">
                    <div className="resident-evil__life-points-container">
                        <div >
                            <SettingsIcon onClick={() => setOpenSettingsModal(true)} />
                        </div>
                        <div className="resident-evil__player-status-label-container" onClick={() => setEditMode(!editMode)}>
                            Condición
                        </div>
                        <div className="resident-evil__life-points-controls-container">
                            <button onClick={() => handleSetLife(true)}>-</button>
                            <div className="resident-evil__life-points-screen">
                                <div className={`resident-evil__life-status resident-evil__life-status--${currentLifeLabel}`}>
                                    {currentLifeLabel}
                                </div>
                            </div>
                            <button onClick={() => handleSetLife(false)} disabled={!editMode}>+</button>
                        </div>
                    </div>
                </div>

                <LifeScreen lifePoints={gameState.life} />

                <Inventory
                    gameState={gameState}
                    setGameValue={setGameValue}
                    selectedItemIndex={gameState.selectedItemIndex}
                    items={[...gameState.items]}
                    callbackSetGameValue={setGameValue}
                    callbackAddItemToInventory={addItemToInventory}
                    callbackUseHealthItem={recoverHealth}
                    callbackAddBulletsByGunpowder={addBulletsByGunpowder}
                />

                <div className="resident-evil__bullets-container">

                    <BulletCounter
                        name="pistola"
                        type="gunBullets"
                        bullets={gameState.gunBullets}
                        setBullets={setGameValue}
                        editMode={editMode}
                    />

                    <BulletCounter
                        name="escopeta"
                        type="shotgunBullets"
                        bullets={gameState.shotgunBullets}
                        setBullets={setGameValue}
                        editMode={editMode}
                    />

                    <BulletCounter
                        name="ametralladora"
                        type="machinegunBullets"
                        bullets={gameState.machinegunBullets}
                        setBullets={setGameValue}
                        defaultAddingValues={5}
                        editMode={editMode}
                    />

                    <BulletCounter
                        name="francotirador"
                        type="sniperBullets"
                        bullets={gameState.sniperBullets}
                        setBullets={setGameValue}
                        defaultAddingValues={1}
                        editMode={editMode}
                    />
                </div>

                {
                    gameState.isHost &&
                    <ResidentRooms gameState={gameState} setGameValue={setGameValue} />
                }

            </div>
        </div>
    )
}
