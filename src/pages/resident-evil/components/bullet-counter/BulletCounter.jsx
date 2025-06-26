import React, { useState } from 'react';
import './bullet-counter.scss';

export const BulletCounter = ({ name, bullets, callbackSaveState }) => {

    const [counter, setCounter] = useState(bullets);
    return (
        <div className="bullet-counter__container">
            <div className="bullet-counter__gun-name">
                {name}
            </div>
            <div className="bullet-counter__controls">
                <button onClick={(() => counter > 0 ? setCounter(counter - 1) : null)}>-</button>
                <div className="bullet-counter__image-container">
                    <img src={`./img/resident-evil/balas-${name}.png`} />
                    <div className="bullet-counter__counter-value">{counter}</div>
                </div>
                <button onClick={(() => counter < 99 ? setCounter(counter + 1) : null)}>+</button>
            </div>
        </div>
    )
}
