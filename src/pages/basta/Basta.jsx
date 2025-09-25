import { Deck } from '../../components/deck/Deck';
import { lstBastaQuestions } from '../../../data/basta';
import { useRef, useState } from 'react';
import { Timer } from '../../components/timer/Timer';
import './basta.scss';

export const Basta = () => {

  const lstCharacters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'U', 'V'];
  const getRandomCharacter = () => lstCharacters[Math.floor(Math.random() * lstCharacters.length)];
  const timerRef = useRef();

  const resetButtons = () => {
    return [
      {
        id: 1,
        used: false,
        character: getRandomCharacter()
      },
      {
        id: 2,
        used: false,
        character: getRandomCharacter()
      },
      {
        id: 3,
        used: false,
        character: getRandomCharacter()
      },
      {
        id: 4,
        used: false,
        character: getRandomCharacter()
      }
    ]
  }

  const [gameState, setGameState] = useState({
    lstActiveCharacters: resetButtons()
  });

  const handlePressButton = (index) => {
    if (gameState.lstActiveCharacters[index].used) {
      return;
    }

    if (gameState.lstActiveCharacters.filter(item => !item.used).length > 1) {
      gameState.lstActiveCharacters[index].used = true;
    } else {
      gameState.lstActiveCharacters = resetButtons();
    }
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
        backImgPath={`./img/basta/back.webp`}
        styles={{
          frontBorder: '20px solid white',
          backBorder: '20px solid white',
          frontBackground: 'linear-gradient(45deg,rgba(145, 18, 18, 1) 0%, rgba(167, 24, 24, 1) 100%)',
          titleColor: '#f54f49ff',
          contentColor: 'white',
          buttonBackground: '#e59501ff'
        }}
      />

      <div className="basta__game-container">
        <Timer defaultTime={10} timerRef={timerRef} />
        {
          gameState.lstActiveCharacters.map((item, index) =>
            <button
              key={`tile-${item.id}`}
              className={`basta__character-to-select ${gameState.lstActiveCharacters[index].used ? 'basta__character-to-select--used' : ''}`}
              onTouchStart={() => handlePressButton(index)}
              disabled={gameState.lstActiveCharacters[index].used}
            >
              {item.character}
            </button>
          )
        }
      </div>
    </div>
  )
}
