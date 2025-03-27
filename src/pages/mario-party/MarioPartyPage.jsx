import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Header } from '../../components/header/Header';
import { MarioPartyMainGame } from './components/MarioPartyMainGame';
import './mario-party.scss';

export const MarioPartyPage = () => {



    return (
        <>
            <Header />
            <div className="mario-party mario-party__container">
                <MarioPartyMainGame />

            </div>
        </>
    )
}
