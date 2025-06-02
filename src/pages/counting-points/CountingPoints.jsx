import { useEffect, useState } from 'react';
import { useSaveState } from '../../hooks/useSaveState';
import './counting-points.scss';

const defaultLstPlayers = [
    {
        name: 'P1',
        lstScore: [''],
        total: 0
    },
    {
        name: 'P2',
        lstScore: [''],
        total: 0
    },
    {
        name: 'P3',
        lstScore: [''],
        total: 0
    },
    {
        name: 'P4',
        lstScore: [''],
        total: 0
    },
    {
        name: 'P5',
        lstScore: [''],
        total: 0
    },
    {
        name: 'P6',
        lstScore: [''],
        total: 0
    }
]
export const CountingPoints = () => {

    const defaultLstPlayersCopy = () => defaultLstPlayers.map(player => ({
        name: player.name,
        lstScore: [...player.lstScore],
        total: player.total
    }))

    const [lstPlayers, setLstPlayers] = useState(defaultLstPlayersCopy());
    const { saveState, getLoadState } = useSaveState('counting-state');

    const updateName = (index, name) => {
        lstPlayers[index].name = name;
        setLstPlayers([...lstPlayers]);
        saveState([...lstPlayers]);
    }

    const updateScore = (index, indexScore, value) => {
        lstPlayers[index].lstScore[indexScore] = value;
        if (lstPlayers[index].lstScore[indexScore + 1] == null) {
            lstPlayers[index].lstScore[indexScore + 1] = '';
        }
        setLstPlayers([...lstPlayers]);
        saveState([...lstPlayers]);
    }

    const getTotalByPlayer = (index) => {
        const initialValue = 0;
        return lstPlayers[index].lstScore.reduce(
            (accumulator, currentValue) => accumulator + (!isNaN(currentValue) ? Number(currentValue) : 0),
            initialValue,
        );
    }

    const resetValues = () => {
        setLstPlayers(defaultLstPlayersCopy());
    }

    useEffect(() => {
        const loadState = getLoadState();
        if (loadState) {
            setLstPlayers(loadState);
        }
    }, [])

    return (
        <div className="counting-points counting-points__container">
            <div className="counting-points counting-points__list-container">
                {
                    lstPlayers.map((player, index) =>
                        <div key={`player-${index}`} className="counting-points__column">
                            <div className="counting-points__name-container">
                                <input type="text" value={player.name} onChange={(event) => updateName(index, event.target.value)} />
                            </div>
                            {
                                player.lstScore.map((score, indexPlayerScore) =>
                                    <div key={`${player.name}-score-${indexPlayerScore}`}>
                                        <input type="number" value={score} onChange={(event) => updateScore(index, indexPlayerScore, event.target.value)} />
                                    </div>
                                )
                            }

                            <div key={`${player.name}-final-score`} className="counting-points__final-score">
                                {getTotalByPlayer(index)}
                            </div>
                        </div>
                    )
                }
            </div>

            <div className="counting-points__button-container">
                <button onClick={resetValues}>Resetear valores</button>
            </div>
        </div>
    )
}
