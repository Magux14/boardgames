import { BulletCounter } from './components/bullet-counter/BulletCounter';
import { Inventory } from './components/inventory/Inventory';
import { LifeScreen } from './components/life-screen/LifeScreen';
import { useResidentEvilGame } from './hooks/useResidentEvilGame';
import './resident-evil.scss';

export const ResidentEvilPage = () => {

    const {
        gameState,
        setGameValue,
        currentLifeLabel,
        addItemToInventory
    } = useResidentEvilGame();

    return (
        <div className="resident-evil__container">
            <div className="resident-evil__guns-container">
                <div className="resident-evil__life-points-labels-container">
                    <div className="resident-evil__life-points-container">
                        <div>
                            Condición
                        </div>
                        <div className="resident-evil__life-points-controls-container">
                            <button onTouchStart={(() => gameState.life > 0 ? setGameValue('life', gameState.life - 1) : null)}>-</button>
                            <div className="resident-evil__life-points-screen">
                                <div className={`resident-evil__life-status resident-evil__life-status--${currentLifeLabel}`}>
                                    {currentLifeLabel}
                                </div>
                            </div>
                            <button onTouchStart={(() => gameState.life < 3 ? setGameValue('life', gameState.life + 1) : null)}>+</button>
                        </div>
                    </div>
                </div>

                <LifeScreen lifePoints={gameState.life} />

                <Inventory
                    selectedItemIndex={gameState.selectedItemIndex}
                    items={gameState.items}
                    callbackSetGameValue={setGameValue}
                    callbackAddItemToInventory={addItemToInventory}
                />

                <BulletCounter name="pistola" type="gunBullets" bullets={gameState.gunBullets} setBullets={setGameValue} />
                <BulletCounter name="escopeta" type="shotgunBullets" bullets={gameState.shotgunBullets} setBullets={setGameValue} />
                <BulletCounter name="ametralladora" type="machinegunBullets" bullets={gameState.machinegunBullets} setBullets={setGameValue} defaultAddingValues={5} />
            </div>
        </div>
    )
}
