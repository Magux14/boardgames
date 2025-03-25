import React, { useState } from 'react';
import './deck.scss';

export const Deck = ({ cards = [], backImgPath, classes, type = "onlyContent", infinite = true }) => {

    const [lstRemainingCards, setLstRemainingCards] = useState(cards);
    const [currentCard, setCurrentCard] = useState();
    const [revealed, setRevealed] = useState(false);

    const parseOnlyContentCard = (text) => {
        return {
            title: '',
            desc: text
        }
    }

    const handleSelectNext = () => {
        let remainingCards = [...lstRemainingCards];
        if (infinite && remainingCards.length <= 0) {
            setLstRemainingCards([...cards]);
            remainingCards = [...cards];
        }
        setRevealed(false);
        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * remainingCards.length);
            let card = remainingCards.splice(randomIndex, 1)[0];
            if (type == 'onlyContent') {
                card = parseOnlyContentCard(card);
            }
            setLstRemainingCards([...remainingCards]);
            setCurrentCard(card);
            setRevealed(true);
        }, 600);
    }

    return (
        <div className="deck deck__container"  >
            <div className={`deck__card ${revealed ? '' : 'deck__card--flip'}`} >
                <img className="deck__card-inside deck__card--revealed deck__card--back" src={backImgPath} alt="card" />
                <div className={`deck__card-inside deck__card--revealed ${classes?.cardClassMargin}`}>
                    <div className={classes?.cardClassInside}>
                        {
                            currentCard &&
                            <>
                                {currentCard.desc}
                            </>
                        }
                    </div>
                </div>
            </div>
            <button className={`deck__button ${classes?.button}`} onClick={() => handleSelectNext()}>Siguiente</button>
        </div>
    )
}
