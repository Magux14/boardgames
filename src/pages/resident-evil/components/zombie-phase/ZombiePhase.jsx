
import './zombie-phase.scss';
import { lstResidentZombiesSpaws } from '../../../../../data/resident-evil-data';
export const ZombiePhase = () => {

    const getRandomSpan = () => {
        const randomIndex = Math.floor(Math.random() * lstResidentZombiesSpaws.length);
        return lstResidentZombiesSpaws[randomIndex];
    }

    const getRandomNumer = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const zombie = getRandomSpan();
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
                x {getRandomNumer(zombie.min, zombie.max)}
            </div>
            {
                nemesisAppear &&
                <div className="zombie-phase__span-count-container">
                    Activación Némesis
                </div>
            }
        </div>
    )
}
