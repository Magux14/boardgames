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

    const lstBlockbusterThings = [...blockbusterThings];
    const lstBlockbusterMovies = [...blockbusterMovies];
    const [showModal, setShowModal] = useState(defaultShowModals);
    const [selectedMovies, setSelectedMovies] = useState([]);

    const handleShowFaceToFace = () => {
        setShowModal({
            ...defaultShowModals,
            faceToFace: true
        });
    }

    const handleShowMovies = () => {
        setShowModal({
            ...defaultShowModals,
            selectMovies: true
        });
    }

    const GetFaceToFaceContent = () => {
        const randomIndex = Math.floor(Math.random() * lstBlockbusterThings.length);
        const thing = lstBlockbusterThings.splice(randomIndex, 1);
        return <span>{`Películas donde hay "${thing}"...`}</span>;
    }

    const getMoviesList = (numberOfMovies) => {
        const lstMovies = [];
        for (let i = 0; i < numberOfMovies; i++) {
            const randomIndex = Math.floor(Math.random() * lstBlockbusterMovies.length);
            const movie = lstBlockbusterMovies.splice(randomIndex, 1);
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
                                {GetFaceToFaceContent()}
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
                            lstMovies={getMoviesList(6)}
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
