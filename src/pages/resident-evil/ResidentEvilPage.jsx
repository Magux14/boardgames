import { BulletCounter } from './components/bullet-counter/BulletCounter';
import './resident-evil.scss';
export const ResidentEvilPage = () => {
    return (
        <div className="resident-evil__container">
            <div className="resident-evil__guns-container">
                <BulletCounter name="pistola" bullets={0} />
                <BulletCounter name="escopeta" bullets={0} />
                <BulletCounter name="ametralladora" bullets={0} />
            </div>
        </div>
    )
}
