
import './zombie-phase.scss';
import { lstResidentZombies } from '../../../../../data/resident-evil-data';
export const ZombiePhase = () => {

    const getRandomNumber = (min, max) => {
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

    const zombie = getRandomItem();
    const results = {};
    for (let i = 0; i < 1000; i++) {
        const selected = getRandomItem();
        results[selected.name] = (results[selected.name] || 0) + 1;
    }

    console.log(results);
    const fastFoward = Math.random() < 0.20;
    const nemesisAppear = Math.random() < 0.25;

    return (
        <div className="zombie-phase__container">
            <div className="zombie-phase__image-container">
                <img src={`./img/resident-evil/zombies/${zombie.name}.webp`} />
            </div>
            {
                nemesisAppear &&
                <div className="zombie-phase__image-container">
                    <img src={`./img/resident-evil/zombies/némesis.webp`} />
                </div>

            }
            <div className="zombie-phase__name-container">
                {zombie.name}
            </div>
            <div className="zombie-phase__span-count-container">
                x {getRandomNumber(zombie.min, zombie.max)}
            </div>

            {
                fastFoward &&
                <div className="zombie-phase__fast-foward-container">
                    + Movimiento impetuoso
                </div>
            }
            {
                nemesisAppear &&
                <div className="zombie-phase__nemesis-container">
                    + Activación Némesis
                </div>
            }
        </div>
    )
}
