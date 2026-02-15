import { useEffect, useState } from 'react';
import './codigo-secreto-page.scss';
import { useArray } from '../../hooks/useArray';
import { lstCodigoSecretoWords } from '../../../data/codigo-secreto-data';

export const CodigoSecretoPage = () => {

    const gameStateKey = 'codigo-secreto-grid';
    const defaultGrid = [
        ['0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0'],
    ]
    const [gameState, setGameState] = useState({
        lstWords: [],
        grid: [...defaultGrid]
    });
    const { shuffle } = useArray();

    const buildGame = (isDuo = true) => {
        const max = 5;
        const tempGrid = [...defaultGrid];
        let lstTypesLeft = [];
        if (isDuo) {
            lstTypesLeft = ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'd', 'd', 'd'];
        } else {
            lstTypesLeft = ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'd'];
        }

        while (lstTypesLeft.length) {
            const randRow = Math.floor(Math.random() * max);
            const randCol = Math.floor(Math.random() * max);
            if (tempGrid[randRow][randCol] == '0') {
                const [value] = lstTypesLeft.splice(0, 1);
                tempGrid[randRow][randCol] = value;
            }
        }

        const newGameState = {
            ...gameState,
            lstWords: shuffle(lstCodigoSecretoWords),
            grid: tempGrid
        };
        setGameState(newGameState)
        localStorage.setItem(gameStateKey, JSON.stringify(newGameState));
    }

    const getLastGrid = () => {
        const state = JSON.parse(localStorage.getItem(gameStateKey));
        if (state) {
            setGameState({ ...state });
        } else {
            buildGame();
        }
    }

    useEffect(() => {
        getLastGrid();
    }, []);

    return (
        <div className="codigo-secreto-page__container">
            <div className="codigo-secreto-page__grid-container">
                {
                    gameState.grid.map((row, index) => <div key={`col-${index}`} className="codigo-secreto-page__grid-row">
                        {
                            row.map((cell, cellIndex) =>
                                <div key={`cell-${cellIndex}`} className={`codigo-secreto-page__grid-cell codigo-secreto-page__grid-cell--${cell}`}>
                                </div>
                            )
                        }
                    </div>
                    )}
            </div>
            <div className="codigo-secreto-page__buttons-container">
                <button onClick={() => buildGame(true)}>
                    Duo Grid
                </button>
                <button onClick={() => buildGame(false)}>
                    Team Grid
                </button>
            </div>
            {
                gameState.lstWords.map(item => <div key={`word-${item}`} className="codigo-secreto-page__word-container">
                    {item}
                </div>
                )
            }


        </div>
    )
}
