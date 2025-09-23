import { Deck } from '../../components/deck/Deck';
import { lstYoNuncaNunca } from '../../../data/yo-nunca-nunca';
import './yo-nunca-nunca.scss';

export const YoNuncaNuncaPage = () => {

  const lstCards = lstYoNuncaNunca.map(item => {
    return {
      title: 'YO NUNCA NUNCA',
      desc: item
    }
  })

  return (
    <div className="yo-nunca-nunca">
      <Deck
        cards={lstCards}
        backImgPath={`./img/yo-nunca-nunca/back.png`}
        styles={{
          frontBorder: '20px solid #135ecfff',
          titleColor: '#f54f49ff',
          buttonBackground: '#127c8eff'
        }}
      />
    </div>
  )
}
