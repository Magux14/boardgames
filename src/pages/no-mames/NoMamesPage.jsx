import React from 'react';
import './no-mames.scss';
import { Header } from '../../components/header/Header';
import { Deck } from '../../components/deck/Deck';
import { lstNoMamesCards } from '../../../data/no-mames';

export const NoMamesPage = () => {

  return (
    <>
    <Header/>
    <div className="no-mames">
      <Deck cards={lstNoMamesCards} backImgPath={`./img/no-mames/back.png`}/>
    </div>
    </>
  )
}
