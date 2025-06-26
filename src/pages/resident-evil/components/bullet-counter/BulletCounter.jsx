import React, { useState } from 'react';
import './bullet-counter.scss';

export const BulletCounter = ({ name, bullets, setBullets }) => {

    return (
        <div className="bullet-counter__container">
            <div className="bullet-counter__gun-name">
                {name}
            </div>
            <div className="bullet-counter__controls">
                <button onClick={(() => bullets > 0 ? setBullets(bullets - 1) : null)}>-</button>
                <div className="bullet-counter__image-container">
                    <img src={`./img/resident-evil/balas-${name}.png`} />
                    <div className="bullet-counter__counter-value">{bullets}</div>
                </div>
                <button onClick={(() => bullets < 99 ? setBullets(bullets + 1) : null)}>+</button>
            </div>
        </div>
    )
}
