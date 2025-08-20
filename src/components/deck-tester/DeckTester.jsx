import { useEffect, useState } from 'react';
import JSZip from 'jszip';
import { v4 as uuidv4 } from 'uuid';
import './deck-tester.scss';

const defaultGameState = {
    lstOriginalList: [],
    lstDeckCards: [],
    lstHandCards: [],
    lstDiscardedCards: [],
    currentCard: null
}

export const DeckTester = () => {
    const [gameState, setGameState] = useState(defaultGameState);
    const { lstDeckCards, lstHandCards, lstDiscardedCards, currentCard, lstOriginalList } = { ...gameState };

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const zip = await JSZip.loadAsync(file);
        const loadedImages = [];

        for (const [filename, fileData] of Object.entries(zip.files)) {
            if (!fileData.dir && /\.(png|jpg|jpeg|gif|webp)$/i.test(filename)) {
                const content = await fileData.async('blob');
                const url = URL.createObjectURL(content);
                const id = uuidv4();
                loadedImages.push({ id, filename, url });
            }
        }

        const suffleList = shuffleArray(loadedImages);
        setGameState({
            ...gameState,
            lstOriginalList: [...suffleList],
            lstDeckCards: [...suffleList]
        });
    };

    const shuffleArray = (array) => {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    const getCards = (cardsNum) => {
        let remainingCards = lstDeckCards;
        if (remainingCards.length <= 0) {
            remainingCards = [...lstOriginalList];
            setGameState({
                ...gameState,
                lstDeckCards: remainingCards
            });
        }

        const lstNewCards = [];
        for (let i = 0; i < cardsNum; i++) {
            const randomIndex = Math.floor(Math.random() * remainingCards.length);
            const card = remainingCards.splice(randomIndex, 1)[0];
            lstNewCards.push(card);
        }

        setGameState({
            ...gameState,
            lstDeckCards: lstDeckCards,
            lstHandCards: lstHandCards.concat(lstNewCards)
        })
    }

    const handleSetCurrentCard = (img) => {
        setGameState({
            ...gameState,
            currentCard: img
        });
    }

    const handleDiscardCard = (id) => {
        const index = lstHandCards.findIndex(item => item.id == id);
        if (index != -1) {
            const card = lstHandCards.splice(index, 1)[0];
            setGameState({
                ...gameState,
                currentCard: lstHandCards[0],
                lstHandCards: lstHandCards,
                lstDiscardedCards: lstDiscardedCards.concat([card])
            })
        }
    }

    useEffect(() => {
        console.log('lstDeck: ', lstDeckCards)
        console.log('lstHand: ', lstHandCards)

    }, [gameState])

    return (
        <div className="deck-tester__container">
            {
                currentCard &&
                <div className="deck-tester__current-card-container">
                    <img src={currentCard.url} alt={currentCard.filename} />
                    <div className="deck-tester__current-card-button-container">
                        <button className="deck-tester__discard-button" onClick={() => handleDiscardCard(currentCard.id)}>Discard</button>
                    </div>
                </div>
            }

            <div className="deck-tester__hand-container">
                {lstHandCards.map((img) => (
                    <img
                        key={img.filename}
                        src={img.url}
                        alt={img.filename}
                        className={`${img.id == currentCard?.id ? 'deck-tester__selected-card-on-hand' : ''}`}
                        onClick={() => handleSetCurrentCard(img)} />
                ))}
            </div>

            <div className="deck-tester__decks-container">
                {
                    lstDiscardedCards.length > 0 &&
                    <img
                        src={lstDiscardedCards[lstDiscardedCards.length - 1].url}
                        alt={'discardPile-card'} />
                }

                {
                    lstDeckCards.length > 0 &&
                    <img
                        src={'./img/deck-tester/back.jpg'}
                        alt={'back-card'}
                        onClick={() => getCards(1)} />
                }

            </div>


            <input
                type="file"
                accept=".zip"
                onChange={handleFileUpload}
                className="mb-4"
            />
        </div>
    );
}
