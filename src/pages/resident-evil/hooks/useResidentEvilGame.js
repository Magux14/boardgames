import React, { useEffect, useState } from 'react'
import { useSaveState } from '../../../hooks/useSaveState';
import { lstResidentItems } from '../../../../data/resident-evil-data';

const defaultGameState = {
    life: 3,
    gunBullets: 7,
    shotgunBullets: 0,
    machinegunBullets: 0,
    items: lstResidentItems.filter(item => item.name == 'cuchillo'),
    selectedItemIndex: 0
}

export const useResidentEvilGame = () => {

    const [gameState, setGameState] = useState(JSON.parse(JSON.stringify(defaultGameState)));
    const { saveState, getLoadState } = useSaveState('resident-evil');

    const setGameValue = (type, value) => {
        if (type == 'gunBullets') {
            gameState.gunBullets = value;
        } else if (type == 'shotgunBullets') {
            gameState.shotgunBullets = value;
        } else if (type == 'machinegunBullets') {
            gameState.machinegunBullets = value;
        } else if (type == 'life') {
            gameState.life = value;
        } else if (type == 'selectedItemIndex') {
            gameState.selectedItemIndex = value;
        } else if (type == 'discardItemIndex') {
            gameState.selectedItemIndex = -1;
            gameState.items.splice(value, 1);
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

    const addItemToInventory = (item) => {
        gameState.items.push(item);
        setGameState({ ...gameState });
        saveState(gameState);
    }

    useEffect(() => {
        const lastSaveState = getLoadState();
        if (lastSaveState) {
            // setGameState(lastSaveState);
        }
    }, []);

    return {
        gameState,
        setGameValue,
        currentLifeLabel: getCurrentLifeLabel(gameState.life),
        addItemToInventory
    }

}
