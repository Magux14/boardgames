import React, { useEffect, useState } from 'react';
import { lstCowMindQuestions } from '../../../data/mente-vacuna';
import { Header } from '../../components/header/Header';
import { useSaveState } from '../../hooks/useSaveState';
import SettingsIcon from '@mui/icons-material/Settings';
import './cow-mind.scss';
import ConfirmationModal from '../../components/confirmation-modal/ConfirmationModal';

const defaultState = {
    lstDynamicQuestions: [...lstCowMindQuestions],
    currentQuestions: {
        a: '',
        b: ''
    }
}

export const CowMind = () => {

    const [gameState, setGameState] = useState(defaultState);
    const [accessEnabled, setAccessEnabled] = useState(true);
    const [password, setPassword] = useState('');
    const [newQuestionbuttonIsDisabled, setNewQuestionbuttonIsDisabled] = useState(false);
    const { saveState, getLoadState, deleteState } = useSaveState('cow-mind-state');
    const [showResetModal, setShowResetModal] = useState(false);

    const getRandomQuestion = () => {

        if (gameState.lstDynamicQuestions.length < 2) {
            gameState.lstDynamicQuestions = [...lstCowMindQuestions];
        }

        const lstTempQuestions = [...gameState.lstDynamicQuestions];
        const questionA = lstTempQuestions.splice(Math.floor(Math.random() * lstTempQuestions.length), 1)[0];
        const questionB = lstTempQuestions.splice(Math.floor(Math.random() * lstTempQuestions.length), 1)[0];

        const newState = {
            lstDynamicQuestions: [...lstTempQuestions],
            currentQuestions: {
                a: questionA,
                b: questionB
            }
        }
        setGameState(newState);
        saveState(newState);
    }

    const handlePasswordInput = (text) => {
        setPassword(text);
    }

    const handleResetGame = () => {
        deleteState();
        setGameState({ ...defaultState });
        setShowResetModal(false);
    }

    useEffect(() => {
        const savedState = getLoadState();
        if (savedState) {
            setGameState(savedState);
        }
    }, [])

    useEffect(() => {
        setNewQuestionbuttonIsDisabled(true);
        setTimeout(() => {
            setNewQuestionbuttonIsDisabled(false);
        }, 5_000)
    }, [gameState.currentQuestions]);

    useEffect(() => {
        if (password == 'pinguino') {
            setAccessEnabled(true);
        }
    }, [password])

    return (
        <>
            <Header />
            <div className="cow-mind__container">
                {
                    !accessEnabled &&
                    <div className="cow-mind__access-to-questions-container">
                        <label>¿Contraseña?</label>
                        <input type="text" onChange={(ev) => handlePasswordInput(ev.target.value)}></input>
                    </div>

                }
                <div className="cow-mind__remaining-cards">Cartas restantes: {gameState.lstDynamicQuestions.length / 2}</div>
                < div className="cow-mind__question-container">
                    <div className="cow-mind__question-text cow-mind__question-text--a">{gameState.currentQuestions.a}</div>
                    <div className="cow-mind__question-text cow-mind__question-text--b">{gameState.currentQuestions.b}</div>
                </ div>

                <div className="cow-mind__generate-button-container">
                    <button onClick={(() => getRandomQuestion())} disabled={newQuestionbuttonIsDisabled}>Nuevas preguntas</button>
                </div>

                <ConfirmationModal showAlert={showResetModal} description={'¿Desea resetar el juego?'} acceptCallback={handleResetGame} closeCallback={() => setShowResetModal(false)} />
                <div className="cow-mind__refresh">
                    <SettingsIcon onClick={() => setShowResetModal(true)} />
                </div>
            </div>
        </>
    )
}
