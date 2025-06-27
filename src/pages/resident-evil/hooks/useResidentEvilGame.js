import React, { useEffect, useState } from 'react'
import { useSaveState } from '../../../hooks/useSaveState';

const defaultGameState = {
    life: 3,
    gunBullets: 7,
    shotgunBullets: 0,
    machinegunBullets: 0,
    items: [
        {
            name: 'cuchillo',
            type: 'weapon',
            weapon: {
                minRange: 0,
                maxRange: 0,
                dices: 1,
                hit: 4,
                firePower: 1
            },
            quantitytoSpawn: 0
        },
        {
            name: 'hot dogger',
            type: 'weapon',
            weapon: {
                minRange: 0,
                maxRange: 0,
                dices: 2,
                hit: 3,
                firePower: 2
            },
            quantitytoSpawn: 1
        },
        {
            name: 'pistola g19',
            type: 'weapon',
            weapon: {
                minRange: 0,
                maxRange: 1,
                dices: 1,
                hit: 3,
                firePower: 1,
            },
            quantitytoSpawn: 1
        },
        {
            name: 'escopeta',
            type: 'weapon',
            weapon: {
                minRange: 0,
                maxRange: 1,
                dices: 2,
                hit: 3,
                firePower: 2
            },
            quantitytoSpawn: 1
        },
        {
            name: 'ametralladora',
            type: 'weapon',
            weapon: {
                minRange: 0,
                maxRange: 1,
                dices: 5,
                hit: 4,
                firePower: 1
            },
            quantitytoSpawn: 1
        },
    ]
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
            // setGameState(lastSaveState);
        }
    }, []);

    useEffect(() => {
        if (!gameState.selectedItemIndex) {
            gameState.selectedItemIndex = 0;
            setGameState({ ...gameState });
        }
    }, [gameState]);

    return {
        gameState,
        setGameValue,
        currentLifeLabel: getCurrentLifeLabel(gameState.life)
    }

}
