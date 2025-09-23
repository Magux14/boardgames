import { useEffect, useState } from 'react';
import './deck.scss';

export const Deck = ({
    cards = [],
    callbackButtonFunction,
    backImgPath,
    infinite = true,
    showNextButton = true,
    buttonText = "Siguiente",
    styles
}) => {

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
                <div
                    className={`deck__card-inside deck__card--revealed deck__card--back`}
                    style={{
                        backgroundImage: `url('${backImgPath}')`,
                        border: styles?.backBorder ?? ''
                    }}
                    alt="card"
                />
                <div
                    className={`deck__card-inside deck__card--revealed`}
                    style={{ border: styles?.frontBorder ?? '' }}
                >
                    <div
                        className={`deck__card-inside-content ${currentCard?.title ? 'deck__card-inside-content-title-and-content' : ''}`}
                        style={{
                            background: styles?.frontBackground ?? '',
                            backgroundImage: styles?.frontBackground ?? ''
                        }}
                    >
                        {
                            currentCard &&
                            <>
                                {
                                    currentCard.title &&
                                    <div
                                        className="deck__title"
                                        style={{
                                            color: styles?.titleColor ?? '',
                                        }}>
                                        {currentCard.title}
                                    </div>
                                }
                                {
                                    currentCard.desc &&
                                    <div
                                        className="deck__text-content"
                                        style={{
                                            color: styles?.contentColor ?? '',
                                        }}>
                                        {currentCard.desc}
                                    </div>
                                }

                            </>
                        }
                    </div>
                </div>
            </div>
            {
                showNextButton &&
                <button
                    className={`deck__button`}
                    style={{
                        background: styles?.buttonBackground ?? '',
                    }}
                    onClick={() => onButtonClick()}
                >{buttonText}</button>
            }
        </div>
    )
}
