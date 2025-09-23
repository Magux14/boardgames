import React from 'react';
import { Header } from '../../components/header/Header';
import { Deck } from '../../components/deck/Deck';
import { lstNoMamesCards } from '../../../data/no-mames';
import './no-mames.scss';

export const NoMamesPage = () => {
  const lstCards = lstNoMamesCards.map(item => {
    return {
      title: '',
      desc: item
    }
  })

  return (
    <div className="no-mames">
      <Deck
        cards={lstCards}
        backImgPath={`./img/no-mames/back.png`}
        styles={{
          frontBorder: '20px solid #F5D749',
          buttonBackground: '#127c8eff'
        }}
      />
    </div>
  )
}
