import { useEffect, useState } from 'react'
import { phasmophobiaEquipment, phasmophobiaGhostList } from '../../../../data/phasmophobia-data';
import { useSaveState } from '../../../hooks/useSaveState';

const defaultConfig = {
    playersNum: 2,
    minBadEnergyValue: 2,
    maxBadEnergyValue: 5,
    equipmentIsDamaged: true
}

const defaultGameState = {
    ghostStacks: {
        current: 0,
        limit: 0
    },
    phasmoGhostNum: (Math.floor(Math.random() * (6)) + 1),
    config: null,
    currentGhost: null,
    damagedEquipment: false,
    gameDate: new Date(),
    lstTarotCards: []
}

export const usePhasmophobiaGame = () => {

    const [gameStateLoaded, setGameStateLoaded] = useState(false);
    const [gameState, setGameState] = useState(defaultGameState);
    const { saveState, getLoadState, deleteState } = useSaveState('phasmo-state');

    const prepareGame = () => {

        const loadState = getLoadState();
        if (loadState) {
            console.log('load state: ', loadState);
            setGameState(loadState);
        } else {
            console.log('new game');
            const getRandomDamagedEquipment = () => phasmophobiaEquipment[Math.floor(Math.random() * phasmophobiaEquipment.length)]
            const getRandomGhost = () => phasmophobiaGhostList[Math.floor(Math.random() * phasmophobiaGhostList.length)];

            setGameState({
                ...defaultGameState,
                currentGhost: getRandomGhost(),
                damagedEquipment: getRandomDamagedEquipment()
            });
        }
        setGameStateLoaded(true);

    }

    const getCurrentGhost = () => {
        return gameState.currentGhost ? gameState.currentGhost : { name: '???' };
    }

    const getNewGhostStacks = (config) => {
        return {
            current: 0,
            limit: (Math.floor(Math.random() * (config.maxBadEnergyValue - config.minBadEnergyValue + 1)) + config.minBadEnergyValue)
        }
    }

    const setRandomLimitEnergyValue = () => {
        setGameState({
            ...gameState,
            ghostStacks: getNewGhostStacks(gameState.config)
        })
    }

    const setConfig = (config) => {
        setGameState({
            ...gameState,
            config,
            ghostStacks: getNewGhostStacks(config)
        });
    }

    const setGhostStacks = (numberOfStacks) => {
        setGameState(previous => {
            return {
                ...previous,
                ghostStacks: {
                    current: previous.ghostStacks.current + numberOfStacks,
                    limit: previous.ghostStacks.limit
                }
            }
        });
    }

    const setTarotCards = (lstTarotCards) => {
        setGameState({
            ...gameState,
            lstTarotCards: lstTarotCards
        });
    }

    useEffect(() => {
        console.log('gameState changed: ', gameState);

        if (gameStateLoaded) {
            saveState(gameState);
        }
    }, [gameState])

    return {
        getCurrentGhost,
        damagedEquipment: gameState.damagedEquipment,
        prepareGame,
        setConfig,
        setGhostStacks,
        setRandomLimitEnergyValue,
        config: gameState.config,
        defaultConfig,
        gameDate: gameState.gameDate,
        ghostStacks: gameState.ghostStacks,
        phasmoGhostNum: gameState.phasmoGhostNum,
        lstTarotCards: gameState.lstTarotCards,
        setTarotCards
    }
}
