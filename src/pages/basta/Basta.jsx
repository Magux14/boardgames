import { Header } from '../../components/header/Header';
import { Deck } from '../../components/deck/Deck';
import { lstBastaQuestions } from '../../../data/basta';
import './basta.scss';

export const Basta = () => {

  const lstCards = lstBastaQuestions.map(item => {
    return {
      title: '',
      desc: item
    }
  })

  return (
    <>
      <Header />
      <div className="basta">
        <Deck
          cards={lstCards}
          backImgPath={`./img/basta/back.png`}
          classes={
            {
              cardClassMargin: "basta__card-content",
              cardClassInside: "basta__card-inside",
              cardClassTitle: "basta__card-title",
              cardClassDesc: "basta__card-desc",
              cardClassBack: "basta__card--back",
              button: "basta__button"
            }
          }
        />
      </div>
    </>
  )
}
