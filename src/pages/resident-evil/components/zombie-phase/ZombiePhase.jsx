
import './zombie-phase.scss';
import { lstResidentZombies } from '../../../../../data/resident-evil-data';
import CachedIcon from '@mui/icons-material/Cached';
import { useEffect, useState } from 'react';

export const ZombiePhase = ({ playersNum }) => {

    const [zombiePhase, setZombiePhase] = useState();

    const getRandomNumber = (min, max) => {
        if(playersNum > 3){
            playersNum = 3;
        }
        max = max + playersNum - 1;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const getRandomItem = () => {
        const total = lstResidentZombies.reduce((acc, item) => acc + item.probabilityToAppear, 0);
        let selectedItem;
        const random = Math.random() * total;
        let acc = 0;
        for (const item of lstResidentZombies) {
            acc += item.probabilityToAppear;
            if (random < acc) {
                selectedItem = item;
                break;
            }
        }
        return selectedItem;
    }

    const setValues = () => {
        const zombie = getRandomItem();

        // const results = {};
        // for (let i = 0; i < 1000; i++) {
        //     const selected = getRandomItem();
        //     results[selected.name] = (results[selected.name] || 0) + 1;
        // }

        const fastFoward = Math.random() < 0.20;
        const nemesisAppear = Math.random() < 0.333;

        setZombiePhase({
            zombie,
            fastFoward,
            nemesisAppear,
            key: (zombiePhase?.key || 0) + 1
        });
    }

    useEffect(() => {
        setValues();
    }, [])

    if (!zombiePhase) {
        return <div className="zombie-phase__container"></div>
    }

    return (
        <div key={zombiePhase.key} className="zombie-phase__container">
            <div className="zombie-phase__image-container">
                <img src={`./img/resident-evil/zombies/${zombiePhase.zombie.name}.webp`} />
                {
                    zombiePhase.nemesisAppear &&
                    <img src={`./img/resident-evil/zombies/némesis.webp`} />
                }
                <div className="zombie-phase__refresh-container">
                    <CachedIcon onClick={setValues} />
                </div>
            </div>

            <div className="zombie-phase__name-container">
                {zombiePhase.zombie.name}
            </div>
            <div className="zombie-phase__span-count-container">
                x {getRandomNumber(zombiePhase.zombie.min, zombiePhase.zombie.max)}
            </div>

            {
                zombiePhase.fastFoward &&
                <div className="zombie-phase__fast-foward-container">
                    + Movimiento impetuoso
                </div>
            }
            {
                zombiePhase.nemesisAppear &&
                <div className="zombie-phase__nemesis-container">
                    + Activación Némesis
                </div>
            }
        </div>
    )
}
