import React, { useState } from 'react';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import './blockbuster-select-movies.scss';
import { BlockbusterTimer } from './BlockbusterTimer';
import { useLongPress } from '../../../hooks/useLongPress';

export const BlockbusterSelectMovies = ({ lstMovies = [] }) => {

    const [movies, setMovies] = useState(lstMovies.map(name => ({
        name,
        selected: false
    })));
    const [showMoviesTimer, setShowMoviesTimer] = useState(false);
    const [showMoviesList, setShowMoviesList] = useState(false);
    const longPressEvents = useLongPress(
        () => setShowMoviesList(true),
        () => setShowMoviesList(false),
        500
    );

    const validateMoviesSelected = () => {
        return movies.filter(item => item.selected).length >= 3;
    }

    const handleSelected = (index) => {
        if (!movies[index].selected) {
            if (validateMoviesSelected()) {
                return;
            }
        }
        movies[index].selected = !movies[index].selected;
        setMovies([...movies]);
    }

    const MapSelectedMovies = () => {
        return <div>
            <div className="blockbuster-select-movies__desc-container">
                Tu equipo debe adivinar cada una se las siguientes películas, pero solo puedes elegir una forma de adivinar por cada una:
                <br />
                1. contar de que trata la película (no puedes utilizar palabras que vengan en el título).
                <br />
                2. Mímica
                <br />
                3. Decir solamente UNA palabra.
            </div>
            <div className="blockbuster-select-movies__guess-container">

                {
                    showMoviesList &&
                    movies.filter(item => item.selected).map((movie) =>
                        <div key={movie.name}>
                            {movie.name}
                        </div>
                    )
                }
                {
                    !showMoviesList &&
                    <button {...longPressEvents}>
                        Manten presionado para ver la lista de películas!
                    </button>
                }
            </div>
        </div>
    }

    return (
        <>
            {
                showMoviesTimer &&
                <BlockbusterTimer defaultTime={60} callbackClose={() => setShowMoviesTimer(false)} >
                    {MapSelectedMovies()}
                </BlockbusterTimer>
            }
            {
                !showMoviesTimer &&
                <div className="blockbuster-select-movies blockbuster-page__modal-container">
                    <div className="blockbuster-select-movies__desc-container">
                        Selecciona 3 películas, tu equipo tratará de adivinarlas, las que no selecciones las deberá adivinar el equipo contrario.
                    </div>
                    <div className="blockbuster-select-movies__container">
                        {
                            movies.map((movie, index) =>
                                <button key={movie.name}
                                    className={`blockbuster-select-movies__button ${movie.selected ? 'blockbuster-select-movies__button--selected' : ''}`}
                                    onClick={() => handleSelected(index)}
                                >
                                    <span>{movie.name}</span>
                                </button>
                            )
                        }
                    </div>

                    {
                        validateMoviesSelected() &&
                        <div className="blockbuster-select-movies__container">
                            <button className={`blockbuster-select-movies__button blockbuster-select-movies__button--continue`} onClick={() => setShowMoviesTimer(true)}>
                                <span>Continuar</span> <ArrowRightIcon />
                            </button>
                        </div>
                    }
                </div>
            }
        </>
    )
}
