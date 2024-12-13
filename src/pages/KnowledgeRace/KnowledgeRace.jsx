import React, { useEffect, useState } from 'react';
import { knowledgeQuestions } from '../../../data/knowledge-questions';
import './KnowledgeRace.css';
import { Header } from '../../components/header/Header';

export const KnowledgeRace = () => {

    const lstPrefixOptions = ['a', 'b', 'c', 'd', 'e'];
    const [question, setQuestion] = useState(null);
    const [accessEnabled, setAccessEnabled] = useState(false);
    const [password, setPassword] = useState('');
    const [newQuestionbuttonIsDisabled, setNewQuestionbuttonIsDisabled] = useState(false);

    const getRandomQuestion = () => {
        let lstQuestions = [];
        knowledgeQuestions.forEach((type) => {
            type.subtypes.forEach((subtype) => {
                if (!subtype.disabled) {
                    lstQuestions = lstQuestions.concat(...subtype.questions);
                }
            });
        });

        const question = lstQuestions[Math.floor(Math.random() * lstQuestions.length)];
        question.answer = question.options[0];
        question.options = question.options.sort(() => Math.random() - .5);
        setQuestion(question);
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
    }, [question]);

    useEffect(() => {
        if (password == 'pinguino') {
            setAccessEnabled(true);
        }
    }, [password])

    return (
        <>
            <Header />
            {
                !accessEnabled &&
                <div className="access-to-questions-container">
                    <label>¿Contraseña?</label>
                    <input type="text" onChange={(ev) => handlePasswordInput(ev.target.value)}></input>
                </div>

            }
            {question && accessEnabled &&
                <>
                    < div className="question-container">
                        <label className="question-text">{question.question}</label>
                        <ul>
                            {
                                question.options.map((option, index) =>
                                    <div key={`option-${index + 1}`} className={`${option == question.answer ? 'correct-answer' : ''}`}>
                                        {lstPrefixOptions[index]}) {option}
                                    </div>
                                )
                            }
                        </ul>
                    </ div>

                    <div className="generate-button-container">
                        <button onClick={(() => getRandomQuestion())} disabled={newQuestionbuttonIsDisabled}>Nueva pregunta</button>
                    </div>
                </>
            }
        </>
    )
}
