import { useEffect, useState } from 'react'
import { useSaveState } from '../../../hooks/useSaveState';

const defaultGameState = {
    life: 3,
    gunBullets: 8,
    shotgunBullets: 2,
    machinegunBullets: 10,
    items: [],
    selectedItemIndex: 0
}

export const useResidentEvilGame = () => {

    const [gameState, setGameState] = useState(JSON.parse(JSON.stringify(defaultGameState)));
    const { saveState, getLoadState } = useSaveState('resident-evil');

    const setGameStateAndSave = (gameState) => {
        const newGameState = { ...gameState };
        setGameState(newGameState);
        saveState(newGameState);
    }

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
            if (gameState.selectedItemIndex == value) {
                gameState.selectedItemIndex = -1;
            }
            gameState.items.splice(value, 1);
        }

        setGameStateAndSave(gameState);
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

    const addBulletsAsItem = (item, gameState) => {

        const getRandomNumer = (min, max) => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        item.bulletsAdded = getRandomNumer(item.bulletsConfig.minQuantity, item.bulletsConfig.maxQuantity);
        item.instaDiscard = true;
        const bulletType = item.bulletsConfig.type;
        if (bulletType == 'gun') {
            gameState.gunBullets += item.bulletsAdded;
        } else if (bulletType == 'shotgun') {
            gameState.shotgunBullets += item.bulletsAdded;
        } else if (bulletType == 'machinegun') {
            gameState.machinegunBullets += item.bulletsAdded;
        }

        gameState.items.push(item);
        return gameState;
    }

    const addItemToInventory = (item) => {
        item = JSON.parse(JSON.stringify(item));
        let newGameState = { ...gameState };
        if (item.type == 'bullets') {
            newGameState = addBulletsAsItem(item, newGameState);
        } else if (item.type == 'activation') {
            item.instaDiscard = true;
            newGameState.items.push(item);
        } else {
            newGameState.items.push(item);
        }

        setGameStateAndSave(newGameState);
    }

    const recoverHealth = (points) => {
        let newGameState = { ...gameState };
        if (newGameState.life + points > 3) {
            newGameState.life = 3
        } else {
            newGameState.life = newGameState.life + points;
        }
        setGameStateAndSave(newGameState);
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
        currentLifeLabel: getCurrentLifeLabel(gameState.life),
        addItemToInventory,
        recoverHealth,
        setGameStateAndSave
    }

}
