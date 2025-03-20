import React, { useState } from 'react';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import './blockbuster-select-movies.scss';

export const BlockbusterSelectMovies = ({ lstMovies = [], callbackSetSelectedMovies }) => {

    const [movies, setMovies] = useState(lstMovies.map(name => ({
        name,
        selected: false
    })));

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

    const handleContinue = () => {
        callbackSetSelectedMovies(movies);
    }

    return (
        <div className="blockbuster-select-movies">

            <div className="blockbuster-select-movies__container">
                <div className="blockbuster-select-movies__desc-container">
                    Selecciona 3 películas, tu equipo tratará de adivinarlas, las que no selecciones las deberá adivinar el equipo contrario.
                </div>
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
                    <button className={`blockbuster-select-movies__button blockbuster-select-movies__button--continue`} onClick={handleContinue}>
                        <span>Continuar</span>
                    </button>
                </div>
            }
        </div>
    )
}
