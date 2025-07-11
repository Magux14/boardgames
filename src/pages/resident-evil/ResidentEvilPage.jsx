import { useState } from 'react';
import { BulletCounter } from './components/bullet-counter/BulletCounter';
import { Inventory } from './components/inventory/Inventory';
import { LifeScreen } from './components/life-screen/LifeScreen';
import { useResidentEvilGame } from './hooks/useResidentEvilGame';
import SettingsIcon from '@mui/icons-material/Settings';
import { Modal } from 'antd';
import { ReSettings } from './components/re-settings/ReSettings';
import './resident-evil.scss';

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

    const handleSaveAndCloseSettingsModal = (gameState) => {
        setGameStateAndSave(gameState);
        setOpenSettingsModal(false);
    }

    return (
        <div className="resident-evil__container">

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
                            <button onClick={(() => gameState.life > 0 ? setGameValue('life', gameState.life - 1) : null)}>-</button>
                            <div className="resident-evil__life-points-screen">
                                <div className={`resident-evil__life-status resident-evil__life-status--${currentLifeLabel}`}>
                                    {currentLifeLabel}
                                </div>
                            </div>
                            <button onClick={(() => gameState.life < 4 ? setGameValue('life', gameState.life + 1) : null)} disabled={!editMode}>+</button>
                        </div>
                    </div>
                </div>

                <LifeScreen lifePoints={gameState.life} />

                <Inventory
                    gameState={gameState}
                    selectedItemIndex={gameState.selectedItemIndex}
                    items={[...gameState.items]}
                    callbackSetGameValue={setGameValue}
                    callbackAddItemToInventory={addItemToInventory}
                    callbackUseHealthItem={recoverHealth}
                    callbackAddBulletsByGunpowder={addBulletsByGunpowder}
                />

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
        </div>
    )
}
