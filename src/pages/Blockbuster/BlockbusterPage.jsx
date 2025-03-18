import React, { useState } from 'react';
import { BlockbusterTimer } from './components/BlockbusterTimer';
import { blockbusterMovies, blockbusterThings } from '../../../data/blockbuster';
import './blockbuster-page.scss';
import { BlockbusterSelectMovies } from './components/BlockbusterSelectMovies';

export const BlockbusterPage = () => {

    const lstBlockbusterThings = [...blockbusterThings];
    const lstBlockbusterMovies = [...blockbusterMovies];
    const [showFaceToFace, setShowFaceToFace] = useState(false);
    const [showSelectMovies, setShowSelectMovies] = useState(false);

    const handleShowFaceToFace = () => {
        setShowFaceToFace(true);
    }

    const handleShowMovies = () => {
        setShowSelectMovies(true);
    }

    const GetFaceToFaceContent = () => {
        const randomIndex = Math.floor(Math.random() * lstBlockbusterThings.length);
        const thing = lstBlockbusterThings.splice(randomIndex, 1);
        return <span>{`Películas donde hay "${thing}"...`}</span>;
    }

    const getMoviesList = (numberOfMovies) => {
        const lstMovies = [];
        for (let i = 0; i < numberOfMovies; i++) {
            const randomIndex = Math.floor(Math.random() * lstBlockbusterMovies.length);
            const movie = lstBlockbusterMovies.splice(randomIndex, 1);
            lstMovies.push(movie);
        }
        return lstMovies;
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
                showSelectMovies &&
                <BlockbusterSelectMovies lstMovies={getMoviesList(6)} />
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
