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
    </div>
  )
}
