import { useEffect, useState } from 'react';
import { phasmophobiaTarotCards } from '../../../../../../data/phasmophobia-data';
import './pg-tarot.scss';

export const PGTarot = ({ callbackClose, callbackAddGhostStacks, lstTarotCards = [], callbackSaveState }) => {

    const [lstCards, setLstCards] = useState(lstTarotCards);
    const [currentCard, setCurrentCard] = useState();

    const fillCards = () => {
        if (lstTarotCards.length) {
            setLstCards([...lstTarotCards]);
            return;
        }
        const total = phasmophobiaTarotCards.reduce((acc, card) => acc + card.probability, 0);
        let lstSelectedCards = [];


        for (let i = 0; i < 10; i++) {
            const random = Math.random() * total;
            let acc = 0;
            for (const card of phasmophobiaTarotCards) {
                acc += card.probability;
                if (random < acc) {
                    lstSelectedCards.push(card);
                    break;
                }
            }
        }

        lstSelectedCards = lstSelectedCards.map((item, index) => {
            return {
                ...item,
                id: (index + 1),
                revealed: false,
            }
        });
        setLstCards([...lstSelectedCards]);
    }

    const handleCardSelected = async (card) => {
        const index = lstCards.findIndex(item => item.id == card.id);
        if (index == -1) {
            return;
        }

        if (!card.revealed) {
            if (card.name == 'El Diablo') {
                setTimeout(() => {
                    callbackAddGhostStacks(2);
                }, 1_500);
            }
        }

        lstCards[index].revealed = true;
        setLstCards([...lstCards]);
        setCurrentCard({ ...card, revealed: true });
        callbackSaveState(lstCards);

        const indexCardToDiscard = lstCards.findIndex(item => item.revealed == true);
        if (indexCardToDiscard == 1) {
            return;
        }
    }

    useEffect(() => {
        fillCards();
    }, [lstTarotCards]);

    return (
        <div className="pg-tarot pg-tarot__layout">
            <div className="pg-tarot__scroll">
                <div className="pg-tarot__cards-container">
                    {
                        lstCards.map(((item, index) =>
                            <div key={`card-${item.id}`} className={`pg-tarot__card-container ${item.dissapearing ? 'pg-tarot__card--dissapearing' : ''}`} onClick={() => handleCardSelected(item)}>
                                <div className={`pg-tarot__card ${item.revealed ? 'pg-tarot__card--flip' : ''}`}>
                                    <img className="pg-tarot__card-inside pg-tarot__card--revealed pg-tarot__card--back" src={`./img/phasmophobia/tarot/${item.img}`} alt="tarot card" />
                                    <img className="pg-tarot__card-inside pg-tarot__card--revealed" src={`./img/phasmophobia/tarot/reverso.webp`} alt="tarot card" />
                                </div>
                            </div>
                        ))
                    }
                </div>
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
                <div className="pg-tarot__button-container">
                    <button onClick={callbackClose}>Cerrar</button>
                </div>

            </div>
        </div>
    )
}
