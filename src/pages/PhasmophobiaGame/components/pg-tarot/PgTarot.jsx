import React, { useEffect, useState } from 'react';
import './pg-tarot.scss';
import { phasmophobiaTarotCards } from '../../../../../data/phasmophobia-data';

export const PGTarot = ({ phasmophobiaEquipment, hasEvidence, callbackClose, equipmentIsDamaged }) => {

    const [lstCards, setLstCards] = useState([]);
    const [blockPicks, setBlockPicks] = useState(false);
    const [currentCard, setCurrentCard] = useState();

    const fillCards = () => {
        const total = phasmophobiaTarotCards.reduce((acc, card) => acc + card.probability, 0);
        let lstSelectedCards = [];

        for (let i = 0; i < 10; i++) {
            const random = Math.random() * total;
            let acc = 0;
            for (const card of phasmophobiaTarotCards) {
                acc += card.probability;
                if (random <= acc) {
                    lstSelectedCards.push(card);
                    break;
                }
            }
        }

        console.log('total: ', total);
        lstSelectedCards = lstSelectedCards.map((item, index) => {
            return {
                ...item,
                id: (index + 1),
                revealed: false,
            }
        });
        console.log('lstSelectedCards', lstSelectedCards);
        setLstCards([...lstSelectedCards]);
    }

    // const discardNextCard = (indexCardToDiscard) => {
    //     lstCards[indexCardToDiscard].dissapearing = true;
    //     setLstCards([...lstCards]);

    //     setTimeout(() => {
    //         lstCards.splice(indexCardToDiscard, 1);
    //         setLstCards([...lstCards]);
    //         if (blockPicks) {
    //             setBlockPicks(false);
    //         }
    //     }, [500]);
    // }

    const handleCardSelected = async (card) => {
        const index = lstCards.findIndex(item => item.id == card.id);
        if (index == -1) {
            return;
        }

        lstCards[index].revealed = true;
        setLstCards([...lstCards]);
        setCurrentCard({ ...card, revealed: true });

        const indexCardToDiscard = lstCards.findIndex(item => item.revealed == true);
        if (indexCardToDiscard == 1) {
            return;
        }
    }

    useEffect(() => {
        fillCards();
    }, []);

    return (
        <div className="pg-tarot pg-tarot__layout">
            <div key={currentCard?.id} className={`pg-tarot__current-text-container`}>
                <div className="pg-tarot__current-title-container">
                    {
                        currentCard &&
                        <span>{currentCard.name}</span>
                    }
                </div>
                <div className="pg-tarot__current-description-container">
                    {
                        currentCard
                            ?
                            <span>{currentCard.description}</span>
                            : <span>Selecciona una carta</span>
                    }

                </div>
            </div>
            <div className="pg-tarot__cards-container">
                {
                    lstCards.map(((item, index) =>
                        index < 8 &&
                        <div key={`card-${item.id}`} className={`pg-tarot__card-container ${item.dissapearing ? 'pg-tarot__card--dissapearing' : ''}`} onClick={() => handleCardSelected(item)}>
                            <div className={`pg-tarot__card ${item.revealed ? 'pg-tarot__card--flip' : ''}`}>
                                <img className="pg-tarot__card-inside pg-tarot__card--revealed pg-tarot__card--back" src={`./img/phasmophobia/tarot/${item.img}`} alt="tarot card" />
                                <img className="pg-tarot__card-inside pg-tarot__card--revealed" src={`./img/phasmophobia/tarot/reverso.webp`} alt="tarot card" />
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="pg-tarot__button-container">
                <button onClick={callbackClose}>Cerrar</button>
            </div>

        </div>
    )
}
