import { useState } from 'react';
import './tabu-new-characters.scss';
export const TabuNewCharacters = ({ gameState, setGameState, callbackClose }) => {

    const [lstForm, setLstForm] = useState(['', '', '', '']);

    const handleInput = (index, value) => {
        lstForm[index] = value;
        setLstForm([...lstForm]);
        console.log(lstForm)
    }

    const handleFinish = () => {

        const lstValid = lstForm.filter(item => item);
        const lstMapped = lstValid.map(item => ({
            name: item,
            checked: false
        }))
        setGameState({
            ...gameState,
            lstCharacters: [...gameState.lstCharacters, ...lstMapped]
        });
        callbackClose();
    }

    const formIsValid = () => {
        return (!lstForm[0] || !lstForm[1] || !lstForm[2]);
    }

    return (
        <div className="tabu-new-characters tabu-new-characters__container">
            <div className="tabu-new-characters__item">
                Ingresa al menos a 3 personajes
            </div>
            <div className="tabu-new-characters__item tabu-new-characters__inputs-container">
                {
                    lstForm.map((input, index) =>
                        <div key={`input-${index}`} className="tabu-new-characters__input-container">
                            <label>Personaje {index + 1}</label>
                            <input type="text" onChange={($ev) => handleInput(index, $ev.target.value)} />
                        </div>
                    )
                }
            </div>
            <div className="tabu-new-characters__item">
                <button onClick={handleFinish} disabled={formIsValid()}>Finalizar</button>
            </div>
        </div>
    )
}
