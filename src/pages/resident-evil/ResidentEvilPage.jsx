import { useEffect, useState } from 'react';
import { BulletCounter } from './components/bullet-counter/BulletCounter';
import { useSaveState } from '../../hooks/useSaveState';
import './resident-evil.scss';

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

    useEffect(() => {
        const lastSaveState = getLoadState();
        if (lastSaveState) {
            setGameState(lastSaveState);
        }
    }, []);

    return (
        <div className="resident-evil__container">
            <div className="resident-evil__guns-container">
                <div className="resident-evil__life-points-container">
                    <div className="resident-evil__life-status">

                    </div>
                </div>
                <BulletCounter name="pistola" bullets={gameState.gunBullets} setBullets={setGunBullets} />
                <BulletCounter name="escopeta" bullets={gameState.shotgunBullets} setBullets={setShotgunBullets} />
                <BulletCounter name="ametralladora" bullets={gameState.machinegunBullets} setBullets={setMachinegunBullets} />
            </div>
        </div>
    )
}
