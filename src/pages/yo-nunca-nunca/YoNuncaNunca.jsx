import React from 'react';
import { Header } from '../../components/header/Header';
import { Deck } from '../../components/deck/Deck';
import { lstYoNuncaNunca } from '../../../data/yo-nunca-nunca';
import './yo-nunca-nunca.scss';

export const YoNuncaNuncaPage = () => {

  return (
    <>
      <Header />
      <div className="yo-nunca-nunca">
        <Deck
          cards={lstYoNuncaNunca}
          backImgPath={`./img/yo-nunca-nunca/back.png`}
          classes={
            {
              cardClassMargin: "yo-nunca-nunca__card-content",
              cardClassInside: "yo-nunca-nunca__card-inside",
              button: "yo-nunca-nunca__button"
            }
          }
        />
      </div>
    </>
  )
}
