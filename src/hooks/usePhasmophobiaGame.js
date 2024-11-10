import { useState } from 'react'
import { phasmophobiaGhostList } from '../../data/phasmophobia-data';
export const usePhasmophobiaGame = () => {

    const [currentGhost, setCurrentGhost] = useState(null)

    const prepareGame = () => {
        setRandomGhost();
    }

    const setRandomGhost = () => {
        const ghost = phasmophobiaGhostList[Math.floor(Math.random() * phasmophobiaGhostList.length)];
        setCurrentGhost(ghost)
    }

    const getCurrentGhost = () => {
        return currentGhost ? currentGhost : { name: '???' };
    }

    return {
        prepareGame,
        getCurrentGhost
    }
}
