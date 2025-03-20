import React, { useState } from 'react';
import { BlockbusterTimer } from '../blockbuster-timer/BlockbusterTimer';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import './blockbuster-guess-movies.scss';

export const BlockbusterGuessMovies = ({ lstMovies = [] }) => {

    const [movies, setMovies] = useState(lstMovies.filter(item => item.selected));

    const handleContinueWithTeamBQuestions = () => {
        setMovies(lstMovies.filter(item => !item.selected));
    }

    return (
        <div className="blockbuster-guess-movies">
            <div className="blockbuster-guess-movies__guess-container">
                <button className="blockbuster-guess-movies__guess-button">
                    <div className="blockbuster-guess-movies__guess-relative-container">
                        <div className="blockbuster-guess-movies__revealed-list" >
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
                        <div className="blockbuster-guess-movies__unrevealed-list">
                            <span>Manten presionado</span>
                            <span>
                                <RemoveRedEyeIcon />
                            </span>
                        </div>
                    </div>
                </button>
            </div>

            <BlockbusterTimer defaultTime={60} />

            <div className="blockbuster-guess-movies__instructions-container">
                Tu equipo debe adivinar cada una de las siguientes películas, pero solo puedes elegir una forma de adivinar por cada una:
                <br /><br />
                1. Contar de que trata la película (no puedes utilizar palabras que vengan en el título).
                <br />
                2. Mímica
                <br />
                3. Decir solamente UNA palabra.
                <br /><br /><br />

                {
                    movies.findIndex(item => item.selected) != -1 &&
                    <button className={`blockbuster-guess-movies__button blockbuster-guess-movies__button--continue`} onClick={handleContinueWithTeamBQuestions}>
                        <span>Continuar</span>
                    </button>
                }
            </div>
        </div>
    )
}
