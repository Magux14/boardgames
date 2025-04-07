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
    <>
    <Header/>
    <div className="no-mames">
      <Deck
          cards={lstCards}
          backImgPath={`./img/no-mames/back.png`}
          classes={
            {
                cardClassMargin: "no-mames__card-content",
                cardClassInside: "no-mames__card-inside",
                cardClassTitle: "no-mames__card-title",
                cardClassDesc: "no-mames__card-desc",
                cardClassBack: "no-mames__card--back",
                button: "no-mames__button"
            }
          }
        />
    </div>
    </>
  )
}
