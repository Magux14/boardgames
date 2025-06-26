import { useEffect, useState } from 'react';
import { BulletCounter } from './components/bullet-counter/BulletCounter';
import { useSaveState } from '../../hooks/useSaveState';
import './resident-evil.scss';
import { LifeScreen } from './components/life-screen/LifeScreen';

const defaultGameState = {
    life: 3,
    gunBullets: 7,
    shotgunBullets: 0,
    machinegunBullets: 0,
}

export const ResidentEvilPage = () => {

    const [gameState, setGameState] = useState(JSON.parse(JSON.stringify(defaultGameState)));
    const { saveState, getLoadState } = useSaveState('resident-evil');

    const setGunBullets = (value) => {
        gameState.gunBullets = value;
        setGameState({ ...gameState });
        saveState(gameState);
    }

    const setShotgunBullets = (value) => {
        gameState.shotgunBullets = value;
        setGameState({ ...gameState });
        saveState(gameState);
    }


    const setMachinegunBullets = (value) => {
        gameState.machinegunBullets = value;
        setGameState({ ...gameState });
        saveState(gameState);
    }

    const setLifePoints = (value) => {
        gameState.life = value;
        setGameState({ ...gameState });
        saveState(gameState);
    }

    const getCurrentLifeLabel = (lifePoints) => {
        if (gameState.life >= 3) {
            return 'bien';
        } else if (gameState.life == 2) {
            return 'cuidado';
        } else if (gameState.life == 1) {
            return 'peligro';
        } else {
            return 'muerto'
        }
    }



    useEffect(() => {
        const lastSaveState = getLoadState();
        if (lastSaveState) {
            setGameState(lastSaveState);
        }
    }, []);

    const currenLifeLabel = getCurrentLifeLabel(gameState.life);

    return (
        <div className="resident-evil__container">
            <div className="resident-evil__guns-container">
                <div className="resident-evil__life-points-labels-container">
                    <div className="resident-evil__life-points-container">
                        <div>
                            Condición
                        </div>
                        <div className="resident-evil__life-points-controls-container">
                            <button onTouchStart={(() => gameState.life > 0 ? setLifePoints(gameState.life - 1) : null)}>-</button>
                            <div className="resident-evil__life-points-screen">
                                <div className={`resident-evil__life-status resident-evil__life-status--${currenLifeLabel}`}>
                                    {currenLifeLabel}
                                </div>
                            </div>
                            <button onTouchStart={(() => gameState.life < 3 ? setLifePoints(gameState.life + 1) : null)}>+</button>
                        </div>
                    </div>
                </div>

                <LifeScreen lifePoints={gameState.life} />

                <BulletCounter name="pistola" bullets={gameState.gunBullets} setBullets={setGunBullets} />
                <BulletCounter name="escopeta" bullets={gameState.shotgunBullets} setBullets={setShotgunBullets} />
                <BulletCounter name="ametralladora" bullets={gameState.machinegunBullets} setBullets={setMachinegunBullets} defaultAddingValues={5} />
            </div>
        </div>
    )
}
