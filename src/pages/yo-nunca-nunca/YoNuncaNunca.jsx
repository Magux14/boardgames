import { Header } from '../../components/header/Header';
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
    <>
      <Header />
      <div className="yo-nunca-nunca">
        <Deck
          cards={lstCards}
          backImgPath={`./img/yo-nunca-nunca/back.png`}
          classes={
            {
              cardClassMargin: "yo-nunca-nunca__card-content",
              cardClassInside: "yo-nunca-nunca__card-inside",
              cardClassTitle: "yo-nunca-nunca__card-title",
              cardClassDesc: "yo-nunca-nunca__card-desc",
              cardClassBack: "yo-nunca-nunca__card--back",
              button: "yo-nunca-nunca__button"
            }
          }
        />
      </div>
    </>
  )
}
