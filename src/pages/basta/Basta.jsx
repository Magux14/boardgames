import { Deck } from '../../components/deck/Deck';
import { lstBastaQuestions } from '../../../data/basta';
import { useRef, useState } from 'react';
import { Timer } from '../../components/timer/Timer';
import './basta.scss';

export const Basta = () => {

  const lstCharacters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'K', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V'];
  const getRandomCharacter = () => lstCharacters[Math.floor(Math.random() * lstCharacters.length)];
  const timerRef = useRef();
  const [gameState, setGameState] = useState({
    lstActiveCharacters: [getRandomCharacter(), getRandomCharacter(), getRandomCharacter(), getRandomCharacter()]
  });

  const handlePressButton = (index) => {
    let newCharacter = getRandomCharacter();
    if (newCharacter == gameState.lstActiveCharacters[index]) {
      newCharacter = getRandomCharacter();
    }
    gameState.lstActiveCharacters[index] = newCharacter;
    timerRef.current.handleClick()
    setGameState({ ...gameState });
  }

  const lstCards = lstBastaQuestions.map(item => {
    return {
      title: '',
      desc: item
    }
  })

  return (
    <div className="basta">
      <Deck
        cards={lstCards}
        backImgPath={`./img/basta/back.png`}
        styles={{
          frontBorder: '20px solid #ca0000ff',
          backBorder: '20px solid #ca0000ff',
          frontBackground: 'linear-gradient(180deg,rgba(237, 221, 83, 1) 0%, rgba(255, 250, 173, 1) 100%)',
          titleColor: '#f54f49ff',
          buttonBackground: '#e59501ff'
        }}
      />

      <div className="basta__game-container">
        <Timer defaultTime={10} timerRef={timerRef} />
        {
          gameState.lstActiveCharacters.map((character, index) =>
            <button key={index} className="basta__character-to-select" onTouchStart={() => handlePressButton(index)}>
              {character}
            </button>
          )
        }
      </div>
    </div>
  )
}
