import { lstUnaminoCards } from "../../../data/unanimo";
import { Deck } from "../../components/deck/Deck";

export const Unanimo = () => {

  const lstCards = lstUnaminoCards.map(item => {
    return {
      title: '',
      desc: item
    }
  })

  return (
    <div className="unanimo">
      <Deck
        cards={lstCards}
        backImgPath={`./img/unánimo/back.webp`}
        styles={{
          frontBorder: '20px solid #388CEB',
        }}
      />
    </div>
  )
}
