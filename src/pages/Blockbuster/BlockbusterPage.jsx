import React, { useState } from 'react';
import './blockbuster-page.scss';
import { BlockbusterTimer } from './components/BlockbusterTimer';

export const BlockbusterPage = () => {

    const [showFaceToFace, setShowFaceToFace] = useState(true);

    const handleShowFaceToFace = () => {
        setShowFaceToFace(true);
    }

    return (
        <div className="blockbuster-page">
            {
                showFaceToFace &&
                <BlockbusterTimer callbackClose={() => setShowFaceToFace(false)} />
            }
            <div className="blockbuster-page__logo-container">
                <img src="./img/blockbuster/logo.png" />
            </div>

            <div className="blockbuster-page__content-container">
                <button className="blockbuster-page__button" onClick={handleShowFaceToFace}>Cara a Cara</button>
                <button className="blockbuster-page__button">Adivina la película</button>
            </div>
        </div>
    )
}
