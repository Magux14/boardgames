import React, { useState } from 'react';
import { BlockbusterTimer } from './components/blockbuster-timer/BlockbusterTimer';
import { blockbusterMovies, blockbusterThings } from '../../../data/blockbuster';
import { BlockbusterSelectMovies } from './components/blockbuster-select-movies/BlockbusterSelectMovies';
import { BlockbusterGuessMovies } from './components/blockbuster-guess-movies/BlockbusterGuessMovies';
import { Modal } from 'antd';
import { Header } from '../../components/header/Header'
import './blockbuster-page.scss';

const defaultShowModals = {
    faceToFace: false,
    selectMovies: false,
    guessMovies: false
}

export const BlockbusterPage = () => {

    const [lstBlockbusterThings, setLstBlockbusterThings] = useState([...blockbusterThings]);
    const [lstBlockbusterMovies, setLstBlockbusterMovies] = useState([...blockbusterMovies]);
    const [showModal, setShowModal] = useState(defaultShowModals);
    const [randomMovies, setRandomMovies] = useState([]);
    const [randomThing, setRandomThing] = useState();
    const [selectedMovies, setSelectedMovies] = useState([]);

    const handleShowFaceToFace = () => {
        setRandomThing(getFaceToFaceThing());
        setShowModal({
            ...defaultShowModals,
            faceToFace: true
        });
    }

    const handleShowMovies = () => {
        const randomMovies = getMoviesList(6);
        setRandomMovies(randomMovies);
        setShowModal({
            ...defaultShowModals,
            selectMovies: true
        });
    }

    const getFaceToFaceThing = () => {
        let remainingThings = lstBlockbusterThings;
        if (remainingThings.length == 0) {
            remainingThings = [...blockbusterThings];
            setLstBlockbusterThings([...remainingThings]);
        }

        const randomIndex = Math.floor(Math.random() * remainingThings.length);
        return remainingThings.splice(randomIndex, 1)[0];
    }

    const getMoviesList = (numberOfMovies) => {
        const lstMovies = [];
        let remainingMovies = lstBlockbusterMovies;
        if (remainingMovies.length < 6) {
            remainingMovies = [...blockbusterMovies];
            setLstBlockbusterMovies(remainingMovies);
        }

        for (let i = 0; i < numberOfMovies; i++) {
            const randomIndex = Math.floor(Math.random() * remainingMovies.length);
            const movie = remainingMovies.splice(randomIndex, 1)[0];
            lstMovies.push(movie);
        }
        return lstMovies;
    }

    const handleGetSelectedMovies = (lstMovies) => {
        setSelectedMovies(lstMovies);
        setShowModal({
            ...defaultShowModals,
            guessMovies: true
        });
    }

    console.log('lstBlockbusterThings', lstBlockbusterThings, randomThing)

    return (
        <>
            <Header />
            <div className="blockbuster-page">
                {
                    showModal.faceToFace &&
                    <Modal
                        open={showModal.faceToFace}
                        width={'100vw'}
                        height={'100vh'}
                        className="blockbuster-page__modal-yellow-background"
                        footer={null}
                        onCancel={() => setShowModal({
                            ...defaultShowModals,
                            faceToFace: false
                        })}
                        maskClosable={false}
                    >
                        <div className="blockbuster-page__face-to-face-question-container">
                            <div className="blockbuster-page__face-to-face-question">
                                <span>{`Películas donde hay "${randomThing}"...`}</span>
                            </div>
                            <BlockbusterTimer defaultTime={15} />
                        </div>
                    </Modal>
                }
                {
                    showModal.selectMovies &&
                    <Modal
                        open={showModal.selectMovies}
                        width={'100vw'}
                        height={'100vh'}
                        className="blockbuster-page__modal-yellow-background"
                        footer={null}
                        onCancel={() => setShowModal({
                            ...defaultShowModals,
                            selectMovies: false
                        })}
                        maskClosable={false}
                    >
                        <BlockbusterSelectMovies
                            lstMovies={randomMovies}
                            callbackSetSelectedMovies={handleGetSelectedMovies}
                        />
                    </Modal>
                }
                {
                    showModal.guessMovies &&
                    <Modal
                        open={showModal.guessMovies}
                        width={'100vw'}
                        height={'100vh'}
                        centered={true}
                        className="blockbuster-page__modal-yellow-background"
                        footer={null}
                        onCancel={() => setShowModal({
                            ...defaultShowModals,
                            guessMovies: false
                        })}
                        maskClosable={false}
                    >
                        <BlockbusterGuessMovies lstMovies={selectedMovies} />
                    </Modal>
                }
                <div className="blockbuster-page__logo-container">
                    <img src="./img/blockbuster/logo.png" />
                </div>

                <div className="blockbuster-page__content-container">
                    <button className="blockbuster-page__button" onClick={handleShowFaceToFace}>Cara a Cara</button>
                    <button className="blockbuster-page__button" onClick={handleShowMovies}>Adivina la película</button>
                </div>
            </div>
        </>
    )
}
