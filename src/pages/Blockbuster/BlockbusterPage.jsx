import React, { useEffect, useState } from 'react';
import { BlockbusterTimer } from '../../components/blockbuster-timer/BlockbusterTimer';
import { blockbusterMovies, blockbusterThings } from '../../../data/blockbuster';
import { BlockbusterSelectMovies } from './components/blockbuster-select-movies/BlockbusterSelectMovies';
import { BlockbusterGuessMovies } from './components/blockbuster-guess-movies/BlockbusterGuessMovies';
import { useSearchParams } from 'react-router-dom';
import { Modal } from 'antd';
import { Header } from '../../components/header/Header'
import './blockbuster-page.scss';
import CachedIcon from '@mui/icons-material/Cached';
import { useSaveState } from '../../hooks/useSaveState';
import { ModalConfirm } from '../../components/modal-confirm/ModalConfirm';

const defaultShowModals = {
    faceToFace: false,
    selectMovies: false,
    guessMovies: false,
    saveStateRefresh: false
}

export const BlockbusterPage = () => {

    const [gameStartedDate, setGameStartedDate] = useState(null);
    const [lstBlockbusterThings, setLstBlockbusterThings] = useState([...blockbusterThings]);
    const [lstBlockbusterMovies, setLstBlockbusterMovies] = useState([...blockbusterMovies]);
    const [lastStateWasLoaded, setLastStateWasLoaded] = useState(false);
    const [showModal, setShowModal] = useState(defaultShowModals);
    const [randomMovies, setRandomMovies] = useState([]);
    const [randomThing, setRandomThing] = useState();
    const [selectedMovies, setSelectedMovies] = useState([]);
    const [fontLoaded, setFontLoaded] = useState(false);
    const [searchParams] = useSearchParams();
    const timeToGuessMovies = searchParams.get('t') || 60;
    const { saveState, getLoadState, deleteState } = useSaveState('blockcbuster');

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
        const thing = remainingThings.splice(randomIndex, 1)[0];
        saveCurrentState();
        return thing;
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

        saveCurrentState();
        return lstMovies;
    }

    const handleGetSelectedMovies = (lstMovies) => {
        setSelectedMovies(lstMovies);
        setShowModal({
            ...defaultShowModals,
            guessMovies: true
        });
    }

    useEffect(() => {
        const font = new FontFace('blockbuster', 'url("https://magux14.github.io/boardgames/fonts/Blockletter.otf")');
        font.load().then(() => {
            setFontLoaded(true);
        }).catch((err) => {
            console.error("Error al cargar la fuente:", err);
        });
    }, []);

    const getFriendlyDate = () => {
        const date = new Date();
        return date.toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    }

    const saveCurrentState = () => {

        if (!lastStateWasLoaded) {
            return;
        }

        const state = {
            lstBlockbusterThings,
            lstBlockbusterMovies,
            gameStartedDate: gameStartedDate ?? getFriendlyDate()
        }
        saveState(state);
    }

    const loadLastState = () => {
        const obj = getLoadState();
        if (obj) {
            setLstBlockbusterThings(obj.lstBlockbusterThings);
            setLstBlockbusterMovies(obj.lstBlockbusterMovies);
            setGameStartedDate(obj.gameStartedDate);
        }
        setLastStateWasLoaded(true);
    }

    const handleSaveStateRefresh = () => {
        setShowModal({
            ...defaultShowModals,
            saveStateRefresh: true
        })
    }

    const handleResetGame = () => {
        deleteState();
        setShowModal({
            ...defaultShowModals,
            saveStateRefresh: false
        });
        setLstBlockbusterThings([...blockbusterThings]);
        setLstBlockbusterMovies([...blockbusterMovies]);
        setGameStartedDate(null);
    }

    useEffect(() => {
        loadLastState();
    }, [])

    return (
        <>
            <Header />
            {fontLoaded &&
                <div className="blockbuster-page">
                    {
                        showModal.faceToFace &&
                        <Modal
                            open={showModal.faceToFace}
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
                                    <span>Películas donde hay</span>
                                    <br />
                                    <span>{`"${randomThing}"...`}</span>
                                </div>
                                <BlockbusterTimer defaultTime={15} />
                            </div>
                        </Modal>
                    }
                    {
                        showModal.selectMovies &&
                        <Modal
                            open={showModal.selectMovies}
                            centered={true}
                            className="blockbuster-page__modal-yellow-background"
                            footer={null}
                            onCancel={() => setShowModal({
                                ...defaultShowModals,
                                selectMovies: false
                            })}
                            maskClosable={false}
                            closeIcon={false}
                        >
                            <BlockbusterSelectMovies
                                lstMovies={randomMovies}
                                callbackSetSelectedMovies={handleGetSelectedMovies}
                                callbackClose={() => setShowModal({
                                    ...defaultShowModals,
                                    selectMovies: false
                                })}
                            />
                        </Modal>
                    }
                    {
                        showModal.guessMovies &&
                        <Modal
                            open={showModal.guessMovies}
                            centered={true}
                            className="blockbuster-page__modal-yellow-background"
                            footer={null}
                            onCancel={() => setShowModal({
                                ...defaultShowModals,
                                guessMovies: false
                            })}
                            maskClosable={false}
                            closeIcon={false}
                        >
                            <BlockbusterGuessMovies lstMovies={selectedMovies} timeToGuessMovies={timeToGuessMovies} callbackClose={() => setShowModal({
                                ...defaultShowModals,
                                guessMovies: false
                            })} />
                        </Modal>
                    }
                    {
                        showModal.saveStateRefresh &&
                        <ModalConfirm open={showModal.saveStateRefresh} callbackConfirm={handleResetGame} text={'¿Deseas reiniciar el juego?'} callbackClose={() => setShowModal({
                            ...defaultShowModals,
                            saveStateRefresh: false
                        })} />
                    }
                    <div className="blockbuster-page__game-status-container">
                        <div>
                            {
                                gameStartedDate &&
                                <span>
                                    Partida: {gameStartedDate}
                                </span>
                            }
                        </div>
                        <CachedIcon className="blockbuster-page__save-icon" onClick={handleSaveStateRefresh} />
                    </div>
                    <div className="blockbuster-page__logo-container">
                        <img src="./img/blockbuster/logo.png" alt="blockbuster-logo"/>
                    </div>

                    <div className="blockbuster-page__content-container">
                        <button className="blockbuster-page__button" onClick={handleShowFaceToFace}>Cara a Cara</button>
                        <button className="blockbuster-page__button" onClick={handleShowMovies}>Adivina la película</button>
                    </div>
                </div>
            }
        </>
    )
}
