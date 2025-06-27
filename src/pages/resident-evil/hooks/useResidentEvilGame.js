import React, { useEffect, useState } from 'react'
import { useSaveState } from '../../../hooks/useSaveState';

const defaultGameState = {
    life: 3,
    gunBullets: 7,
    shotgunBullets: 0,
    machinegunBullets: 0,
}

export const useResidentEvilGame = () => {


    const [gameState, setGameState] = useState(JSON.parse(JSON.stringify(defaultGameState)));
    const { saveState, getLoadState } = useSaveState('resident-evil');

    const setGameValue = (type, value) => {
        if (type == 'gun') {
            gameState.gunBullets = value;
        } else if (type == 'shotgun') {
            gameState.shotgunBullets = value;
        } else if (type == 'machinegun') {
            gameState.machinegunBullets = value;
        } else if (type == 'life') {
            gameState.life = value;
        }

        setGameState({ ...gameState });
        saveState(gameState);
    }

    const getCurrentLifeLabel = (lifePoints) => {
        if (lifePoints >= 3) {
            return 'bien';
        } else if (lifePoints == 2) {
            return 'cuidado';
        } else if (lifePoints == 1) {
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

    return {
        gameState,
        setGameValue,
        currentLifeLabel: getCurrentLifeLabel(gameState.life)
    }

}
