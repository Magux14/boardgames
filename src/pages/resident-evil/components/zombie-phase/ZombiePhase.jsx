
import { lstResidentZombies } from '../../../../../data/resident-evil-data';
import CachedIcon from '@mui/icons-material/Cached';
import { useEffect, useState } from 'react';
import WarningIcon from '@mui/icons-material/Warning';
import './zombie-phase.scss';

export const ZombiePhase = ({ playersNum }) => {

    const [zombiePhase, setZombiePhase] = useState();

    const getRandomNumber = (min, max) => {
        if (playersNum > 2) {
            playersNum = 2;
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
        return {
            zombie: selectedItem,
            fastFoward: Math.random() < 0.20
        };
    }

    const setValues = () => {
        const lstZombies = [];
        const numOfZombies = getRandomNumber(1, playersNum);
        for (let i = 0; i < numOfZombies; i++) {
            lstZombies.push(getRandomItem());
        }

        // const results = {};
        // for (let i = 0; i < 1000; i++) {
        //     const selected = getRandomItem();
        //     results[selected.name] = (results[selected.name] || 0) + 1;
        // }

        const nemesisAppear = Math.random() < 0.333;
        setZombiePhase({
            lstZombies,
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
            <div key={zombiePhase.key} className="zombie-phase__zombies-container">
                {
                    zombiePhase.lstZombies.map(zombieItem =>
                        <>
                            <div className="zombie-phase__zombie-container">
                                <img src={`./img/resident-evil/zombies/${zombieItem.zombie.name}.webp`} />
                                <div className="zombie-phase__name-container">
                                    {zombieItem.zombie.name}
                                </div>
                                {
                                    zombieItem.fastFoward &&
                                    <div className="zombie-phase__activation-container">
                                        <WarningIcon />
                                    </div>
                                }

                            </div>

                            {/* <div className="zombie-phase__span-count-container">
                            x {getRandomNumber(zombiePhase.zombie.min, zombiePhase.zombie.max)}
                        </div> */}
                        </>
                    )
                }
                {
                    zombiePhase.nemesisAppear &&
                    <div className="zombie-phase__zombie-container">
                        <img src={`./img/resident-evil/zombies/némesis.webp`} />
                        <div className="zombie-phase__name-container">
                            Némesis
                        </div>
                        <div className="zombie-phase__activation-container">
                            <WarningIcon />
                        </div>
                    </div>
                }
            </div>

            <div className="zombie-phase__refresh-container">
                <CachedIcon onClick={setValues} />
            </div>
        </div>
    )
}
