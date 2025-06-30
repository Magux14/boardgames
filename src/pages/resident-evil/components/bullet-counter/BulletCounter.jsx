import './bullet-counter.scss';

export const BulletCounter = ({ name, type, bullets, setBullets, defaultAddingValues = 1, editMode }) => {

    const cssBulletsValueClass = () => {
        if (bullets > 5) {
            return '';
        }
        let cssClass = 'bullet-counter__counter-value--';
        if (bullets <= 5 && bullets > 0) {
            cssClass += 'almost-empty';
        } else {
            cssClass += 'empty';
        }

        return cssClass;
    }

    return (
        <div className="bullet-counter__container">
            <div className="bullet-counter__gun-name">
                {name}
            </div>
            <div className="bullet-counter__controls">
                <button onClick={(() => bullets > 0 ? setBullets(type, bullets - defaultAddingValues) : null)}>-</button>
                <div className="bullet-counter__image-container">
                    <img src={`./img/resident-evil/balas-${name}.png`} />
                    <div className={`bullet-counter__counter-value ${cssBulletsValueClass()}`}>{bullets}</div>
                </div>
                <button onClick={(() => bullets < 200 ? setBullets(type, bullets + defaultAddingValues) : null)} disabled={!editMode}>+</button>
            </div>
        </div>
    )
}
