import React, { useState } from 'react';
import { BlockbusterTimer } from './components/BlockbusterTimer';
import { blockbusterMovies, blockbusterThings } from '../../../data/blockbuster';
import './blockbuster-page.scss';

export const BlockbusterPage = () => {

    const lstBlockbusterThings = [...blockbusterThings];
    const lstBlockbusterMovies = [...blockbusterMovies];
    const [showFaceToFace, setShowFaceToFace] = useState(false);
    const [showMovies, setShowMovies] = useState(true);

    const handleShowFaceToFace = () => {
        setShowFaceToFace(true);
    }

    const handleShowMovies = () => {
        setShowMovies(true);
    }

    const GetFaceToFaceContent = () => {
        const randomIndex = Math.floor(Math.random() * lstBlockbusterThings.length);
        const thing = lstBlockbusterThings.splice(randomIndex, 1);
        return <span>{`Películas donde hay "${thing}"...`}</span>;
    }

    const GetMoviesList = () => {
        const lstMovies = [];
        for (let i = 0; i < 3; i++) {
            const randomIndex = Math.floor(Math.random() * lstBlockbusterMovies.length);
            const movie = lstBlockbusterMovies.splice(randomIndex, 1);
            lstMovies.push(movie);
        }
        return <ul>
            {
                lstMovies.map((movie) =>
                    <li key={movie}>
                        {movie}
                    </li>
                )
            }
        </ul>
    }

    return (
        <div className="blockbuster-page">
            {
                showFaceToFace &&
                <BlockbusterTimer defaultTime={15} callbackClose={() => setShowFaceToFace(false)}>
                    {GetFaceToFaceContent()}
                </BlockbusterTimer>
            }
            {
                showMovies &&
                <BlockbusterTimer defaultTime={60} callbackClose={() => setShowMovies(false)} >
                    {GetMoviesList()}
                </BlockbusterTimer>
            }
            <div className="blockbuster-page__logo-container">
                <img src="./img/blockbuster/logo.png" />
            </div>

            <div className="blockbuster-page__content-container">
                <button className="blockbuster-page__button" onClick={handleShowFaceToFace}>Cara a Cara</button>
                <button className="blockbuster-page__button" onClick={handleShowMovies}>Adivina la película</button>
            </div>
        </div>
    )
}
