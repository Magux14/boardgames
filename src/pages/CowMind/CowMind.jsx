import React, { useEffect, useState } from 'react';
import { lstCowMindQuestions } from '../../../data/mente-vacuna';
import './CowMind.scss';
import { Header } from '../../components/header/Header';

export const CowMind = () => {

    const [lstDynamicQuestions, setLstDynamicQuestions] = useState(lstCowMindQuestions)
    const [currentQuestions, setCurrentQuestions] = useState({});
    const [accessEnabled, setAccessEnabled] = useState(true);
    const [password, setPassword] = useState('');
    const [newQuestionbuttonIsDisabled, setNewQuestionbuttonIsDisabled] = useState(false);

    const getRandomQuestion = () => {
        const lstTempQuestions = [...lstDynamicQuestions];
        const questionA = lstTempQuestions.splice(Math.floor(Math.random() * lstTempQuestions.length), 1)[0];
        const questionB = lstTempQuestions.splice(Math.floor(Math.random() * lstTempQuestions.length), 1)[0];
        setCurrentQuestions({
            a: questionA,
            b: questionB
        });
        setLstDynamicQuestions([...lstTempQuestions]);
    }

    const handlePasswordInput = (text) => {
        setPassword(text);
    }

    useEffect(() => {
        getRandomQuestion();
    }, [])

    useEffect(() => {
        setNewQuestionbuttonIsDisabled(true);
        setTimeout(() => {
            setNewQuestionbuttonIsDisabled(false);
        }, 5_000)
    }, [currentQuestions]);

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
                {currentQuestions && accessEnabled &&
                    <>
                        <div className="cow-mind__remaining-cards">Cartas restantes: {lstDynamicQuestions.length / 2}</div>
                        < div className="cow-mind__question-container">
                            <div className="cow-mind__question-text cow-mind__question-text--a">{currentQuestions.a}</div>
                            <div className="cow-mind__question-text cow-mind__question-text--b">{currentQuestions.b}</div>
                        </ div>

                        <div className="cow-mind__generate-button-container">
                            <button onClick={(() => getRandomQuestion())} disabled={newQuestionbuttonIsDisabled}>Nuevas preguntas</button>
                        </div>
                    </>
                }
            </div>
        </>
    )
}
