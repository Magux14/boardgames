import { lstIceBreakerCards } from '../../../data/ice-breaker-cards'
import { Deck } from '../../components/deck/Deck'
import './ice-breaker.scss';

export const IceBreaker = () => {

      const lstCards = lstIceBreakerCards.map(item => {
        return {
          desc: item,
        }
      })
      
    return (
        <div className="ice-breaker__container">
            <Deck
                cards={lstCards}
        backImgPath={`./img/ice-breaker/back.png`}
                styles={{
                    frontBorder: '20px solid #7a246fff',
                    frontColor: 'blue',
                    buttonBackground: '#8e122dff',
                    backBackground: '#8e122dff'
                }} />
        </div>
    )
}
