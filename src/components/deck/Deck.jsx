import React, { useEffect, useState } from 'react';
import './deck.scss';

export const Deck = ({ cards = [], callbackButtonFunction, backImgPath, classes, infinite = true, showNextButton = true, buttonText = "Siguiente" }) => {

    const [lstRemainingCards, setLstRemainingCards] = useState(cards);
    const [currentCard, setCurrentCard] = useState();
    const [revealed, setRevealed] = useState(false);

    const onButtonClick = () => {
        if (callbackButtonFunction) {
            callbackButtonFunction();
        } else {
            handleSelectNext();
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
            setLstRemainingCards([...remainingCards]);
            setCurrentCard(card);
            setRevealed(true);
        }, 500);
    }

    useEffect(() => {
        setTimeout(() => {
            handleSelectNext();
        }, [600])
    }, [])

    return (
        <div className="deck deck__container"  >
            <div className={`deck__card ${revealed ? '' : 'deck__card--flip'}`} >
                <div className={`deck__card-inside deck__card--revealed deck__card--back ${classes?.cardClassBack}`} style={{ backgroundImage: `url('${backImgPath}')` }} alt="card" />
                <div className={`deck__card-inside deck__card--revealed ${classes?.cardClassMargin}`}>
                    <div className={`deck__card-inside-content ${classes?.cardClassInside}`}>
                        {
                            currentCard &&
                            <>
                                <div className={`${classes?.cardClassTitle}`}>
                                    {currentCard.title}
                                </div>
                                <div className={`${classes?.cardClassDesc}`}>
                                    {currentCard.desc}
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
            {
                showNextButton &&
                <button className={`deck__button ${classes?.button}`} onClick={() => onButtonClick()}>{buttonText}</button>
            }
        </div>
    )
}
