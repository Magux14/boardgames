import React, { useEffect, useRef, useState } from 'react';
import { BlockbusterTimer } from '../blockbuster-timer/BlockbusterTimer';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import CloseIcon from '@mui/icons-material/Close';
import { ModalConfirm } from '../../../../components/modal-confirm/ModalConfirm';
import './blockbuster-guess-movies.scss';
import '../../blockbuster-page.scss';

export const BlockbusterGuessMovies = ({ lstMovies = [], timeToGuessMovies, callbackClose }) => {

    const [isWinnerTeam, setIsWinnerTeam] = useState(true);
    const [movies, setMovies] = useState(lstMovies.filter(item => item.selected == isWinnerTeam));
    const [revealMovies, setRevealMovies] = useState(true);
    const [showExitModal, setShowExitModal] = useState(false);
    const timeoutRef = useRef(null);

    const handleRevealMovies = () => {

        if (revealMovies) {
            setRevealMovies(false);
            cancelTimeout();
            return;
        }

        setRevealMovies(true);
        timeoutRef.current = setTimeout(() => {
            setRevealMovies(false);
        }, 2_000);
    }

    const cancelTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    useEffect(() => {
        setMovies(lstMovies.filter(item => item.selected == isWinnerTeam));
    }, [isWinnerTeam])

    return (
        <>
            <div className="blockbuster-page__close-container">
                <ModalConfirm open={showExitModal} text={'¿Deseas terminar esta ronda?'} callbackConfirm={callbackClose} callbackClose={() => setShowExitModal(false)} />
                <CloseIcon onClick={() => setShowExitModal(true)} />
            </div>
            <div className="blockbuster-guess-movies">
                <div className="blockbuster-guess-movies__guess-container">
                    <div className={`blockbuster-guess-movies__current-team-container ${isWinnerTeam ? 'blockbuster-guess-movies__current-team-container--winner' : 'blockbuster-guess-movies__current-team-container--loser'}`}>
                        {`Equipo ${isWinnerTeam ? 'GANADOR' : 'PERDEDOR'} del cara a cara`}
                    </div>
                    <button className="blockbuster-guess-movies__guess-button">
                        <div className="blockbuster-guess-movies__guess-relative-container">
                            {
                                revealMovies &&
                                <div className="blockbuster-guess-movies__revealed-list" onClick={handleRevealMovies}>
                                    <ul>
                                        {
                                            movies.map((movie) =>
                                                <li key={movie.name}>
                                                    {movie.name}
                                                </li>
                                            )
                                        }
                                    </ul>
                                </div>
                            }
                            {
                                !revealMovies &&
                                <div className="blockbuster-guess-movies__unrevealed-list" onClick={handleRevealMovies}>
                                    <span>Presiona para ver</span>
                                    <span>
                                        <RemoveRedEyeIcon />
                                    </span>
                                </div>
                            }
                        </div>
                    </button>
                </div>

                <BlockbusterTimer defaultTime={timeToGuessMovies} />

                <div className="blockbuster-guess-movies__instructions-container">
                    {/* Tu equipo debe adivinar cada una de las siguientes películas, pero solo puedes elegir una forma de adivinar por cada una:
                <br /><br />
                1. Contar de que trata la película (no puedes utilizar palabras que vengan en el título).
                <br />
                2. Mímica
                <br />
                3. Decir solamente UNA palabra.
                <br /><br /><br /> */}
                    {
                        <button className={`blockbuster-guess-movies__button blockbuster-guess-movies__button--continue ${isWinnerTeam ? 'blockbuster-guess-movies__button--winner' : 'blockbuster-guess-movies__button--loser'}`} onClick={() => setIsWinnerTeam(prev => !prev)}>
                            <span>Cambiar a equipo {isWinnerTeam ? 'PERDEDOR' : 'GANADOR'} <PublishedWithChangesIcon /></span>
                        </button>
                    }
                </div>
            </div>
        </>
    )
}
