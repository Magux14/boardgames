import React, { useEffect, useState } from 'react';
import { lstMarioPartyGames } from '../../../../../data/mario-party';
import './mario-party-game-list.scss';
import { Deck } from '../../../../components/deck/Deck';
const flipCardSound = "./img/mario-party/flip-card.ogg";

export const MarioPartyGameList = ({ lstGames, callbackUpdateGameList, callbackHandleNextTurn, callbackSound }) => {

    const [currentGame, setCurrentGame] = useState(null);

    const getGame = () => {
        let remainingGames = lstGames;
        if (remainingGames.length <= 0) {
            remainingGames = [...lstMarioPartyGames];
        }

        const randomIndex = Math.floor(Math.random() * remainingGames.length);
        const game = remainingGames.splice(randomIndex, 1)[0];
        callbackUpdateGameList(remainingGames);
        setCurrentGame(game);
    }

    useEffect(() => {
        getGame();
        setTimeout(() => {
            callbackSound('action-sound', flipCardSound);
        }, 1_200);
    }, []);

    return (
        <div className="mario-party-game-list mario-party-game-list__container">
            {
                currentGame &&
                <Deck
                    cards={[currentGame]}
                    backImgPath={'./img/mario-party/back-card.png'}
                    classes={
                        {
                            cardClassMargin: "mario-party-game-list__card-content",
                            cardClassInside: "mario-party-game-list__card-inside",
                            cardClassTitle: "mario-party-game-list__card-title",
                            cardClassDesc: "mario-party-game-list__card-desc",
                            button: "mario-party-game-list__button"
                        }
                    }
                    infinite={true}
                    callbackButtonFunction={callbackHandleNextTurn}
                    buttonText={'Siguiente ronda'}
                />
            }

        </div>
    )
}
