
import { lstResidentZombies, lstZombiesSpawnPerRoom } from '../../../../../data/resident-evil-data';
import { useEffect, useState } from 'react';
import WarningIcon from '@mui/icons-material/Warning';
import './zombie-phase.scss';

export const ZombiePhase = ({ gameState }) => {

    const [zombiePhase, setZombiePhase] = useState();

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

    const setZombieData = (typeOfDanger = 1) => {
        const total = 100;
        const random = Math.random() * total;
        const zombiesSpanByDanger = lstZombiesSpawnPerRoom.find(item => item.danger == typeOfDanger);
        const lstProbabilityByDanger = zombiesSpanByDanger.lstProbability;
        let acc = 0;
        let selectedItem;
        for (const item of lstProbabilityByDanger) {
            acc += item.probabilityToAppear;
            if (random < acc) {
                selectedItem = item;
                break;
            }
        }

        const lstZombies = [];
        const numOfZombies = selectedItem.numOfZombies;
        for (let i = 0; i < numOfZombies; i++) {
            lstZombies.push(getRandomItem());
        }

        const nemesisAppear = gameState.nemesisIsActive ? Math.random() < 0.25 : false;
        setZombiePhase({
            lstZombies,
            nemesisAppear,
            key: (zombiePhase?.key || 0) + 1
        });

    }

    useEffect(() => {
    }, [])

    return (
        <div className="zombie-phase__container">
            {
                zombiePhase &&
                <div key={`zombie-phase-${zombiePhase.key}`} className="zombie-phase__zombies-container">
                    {
                        zombiePhase.lstZombies.map((zombieItem, index) =>
                            <div key={`zombie-item-${index}`} className="zombie-phase__zombie-container">
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
                        )
                    }
                    {
                        !zombiePhase.lstZombies.length &&
                        <div className="zombie-phase__zombie-container">
                            <img src={`./img/resident-evil/zombies/clear.webp`} />
                            <div className="zombie-phase__name-container">
                                Despejado
                            </div>
                        </div>
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
                    {/* <div className="zombie-phase__refresh-container">
                        <CachedIcon onClick={setValues} />
                    </div> */}
                </div>
            }

            <div className="zombie-phase__buttons-container">
                <button className="zombie-phase__button" onClick={() => setZombieData(1)}>
                    <img src={`./img/resident-evil/rooms/danger-1.webp`} />
                </button>
                <button className="zombie-phase__button" onClick={() => setZombieData(2)}>
                    <img src={`./img/resident-evil/rooms/danger-2.webp`} />
                </button>
                <button className="zombie-phase__button" onClick={() => setZombieData(3)}>
                    <img src={`./img/resident-evil/rooms/danger-3.webp`} />
                </button>
                <button className="zombie-phase__button" onClick={() => setZombieData(0)}>
                    <img src={`./img/resident-evil/rooms/danger-0.webp`} />
                </button>
            </div>

        </div>
    )
}
