import { lstUnaminoCards } from "../../../data/unanimo";
import { Deck } from "../../components/deck/Deck";
import { Header } from "../../components/header/Header";
import './unanimo.scss';

export const Unanimo = () => {

      const lstCards = lstUnaminoCards.map(item => {
        return {
          title: '',
          desc: item
        }
      })

  return (
     <>
          <Header />
          <div className="unanimo">
            <Deck
              cards={lstCards}
              backImgPath={`./img/unánimo/back.webp`}
              classes={
                {
                  cardClassMargin: "unanimo__card-content",
                  cardClassInside: "unanimo__card-inside",
                  cardClassTitle: "unanimo__card-title",
                  cardClassDesc: "unanimo__card-desc",
                  cardClassBack: "unanimo__card--back",
                  button: "unanimo__button"
                }
              }
            />
          </div>
        </>
  )
}
