import { useState } from 'react'
import { phasmophobiaEquipment, phasmophobiaGhostList } from '../../data/phasmophobia-data';
export const usePhasmophobiaGame = () => {

    const [currentGhost, setCurrentGhost] = useState(null);
    const [damagedEquipment, setDamagedEquipment] = useState(null);

    const prepareGame = () => {
        setRandomGhost();
        setDamagedEquipment(phasmophobiaEquipment[Math.floor(Math.random() * phasmophobiaEquipment.length)]);
    }

    const setRandomGhost = () => {
        const ghost = phasmophobiaGhostList[Math.floor(Math.random() * phasmophobiaGhostList.length)];
        setCurrentGhost(ghost)
    }

    const getCurrentGhost = () => {
        return currentGhost ? currentGhost : { name: '???' };
    }

    const getDamagedEquipment = () => {
        return damagedEquipment;
    }

    return {
        prepareGame,
        getDamagedEquipment,
        getCurrentGhost
    }
}
