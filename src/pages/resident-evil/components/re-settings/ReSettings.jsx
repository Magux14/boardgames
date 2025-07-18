import { useState } from 'react';
import { lstResidentItems } from '../../../../../data/resident-evil-data';
import ConfirmationModal from '../../../../components/confirmation-modal/ConfirmationModal';
import './re-settings.scss';
import { ResidentRules } from '../resident-rules/ResidentRules';

export const ReSettings = ({ callbackSetDifficulty }) => {

    const lstDifficulties = [
        {
            name: 'fácil',
            desc: 'Para los que solo quieren pasarla bien sin preocuparse de nada',
            weapons: ['rifle de asalto', 'escopeta', 'tubo', 'spray médico'],
            gunBullets: 16,
            shotgunBullets: 20,
            machinegunBullets: 100,
            sniperBullets: 10
        },
        {
            name: 'normal',
            desc: 'Juego estandar para gente que quiere disfrutar del juego sin complicaciones',
            weapons: ['pistola g19', 'cuchillo', 'hierba verde'],
            gunBullets: 16,
            shotgunBullets: 4,
            machinegunBullets: 20,
            sniperBullets: 5
        },
        {
            name: 'difícil',
            desc: 'Para aquellos a los que les gustan los retos',
            weapons: ['pistola g19'],
            gunBullets: 10,
            shotgunBullets: 2,
            machinegunBullets: 10,
            sniperBullets: 2
        },
        {
            name: 'legendario',
            desc: 'Para aquellos que están acostumbrados al sufrimiento y quieren un desafío extremo',
            weapons: ['cuchillo'],
            gunBullets: 8,
            shotgunBullets: 2,
            machinegunBullets: 5,
            sniperBullets: 1
        }
    ]

    const [selectedDifficulty, setSelectedDifficulty] = useState(null);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [playersNum, setPlayersNum] = useState(2);
    const [isHost, setIsHost] = useState(false);
    const [nemesisIsActive, setNemesisIsActive] = useState(false);

    const handleOpenConfirmationModal = (difficulty) => {
        setShowConfirmationModal(true);
        setSelectedDifficulty(difficulty);
    }

    const handleSelectDifficulty = (difficulty) => {
        setShowConfirmationModal(false);
        const getItemByName = (name) => {
            return lstResidentItems.find(item => item.name == name);
        }
        const gameState = {
            life: 4,
            gunBullets: difficulty.gunBullets,
            shotgunBullets: difficulty.shotgunBullets,
            machinegunBullets: difficulty.machinegunBullets,
            sniperBullets: difficulty.sniperBullets,
            items: difficulty.weapons.map(name => getItemByName(name)),
            selectedItemIndex: 0,
            playersNum: isNaN(playersNum) ? 2 : Number(playersNum),
            difficulty: difficulty.name,
            isHost,
            lstRoomsWithItems: [],
            nemesisIsActive
        }
        callbackSetDifficulty(gameState);
    }

    return (
        <div className="re-settings__container">

            {
                selectedDifficulty &&
                <ConfirmationModal
                    showAlert={showConfirmationModal}
                    acceptCallback={() => handleSelectDifficulty(selectedDifficulty)}
                    closeCallback={() => setShowConfirmationModal(false)}
                    description={`¿Estás seguro que quieres jugar en dificultad ${selectedDifficulty.name}? Si estás jugando una partida se perderán tus objetos`}
                />
            }

            <div className="re-settings__titles-container">
                <div className="re-settings__title">
                    Nuevo Juego
                </div>
                <div className="re-settings__subtitle">
                    Selecciona la dificultad
                </div>
            </div>

            <div className="re-settings__fields-container">
                <div className="re-settings__field-container">
                    <div className="re-settings__players-label" >Número de jugadores:</div>
                    <input type="number" className="re-settings__players-input" value={playersNum} onChange={($ev) => setPlayersNum($ev.target.value)}></input>
                </div>
                <div className="re-settings__field-container">
                    <div className="re-settings__players-label" >Soy el Host de la partida</div>
                    <input type="checkbox" className="re-settings__players-input" checked={isHost} onChange={($ev) => setIsHost($ev.target.checked)}></input>
                </div>
                <div className="re-settings__field-container">
                    <div className="re-settings__players-label" >Activar a Némesis</div>
                    <input type="checkbox" className="re-settings__players-input" checked={nemesisIsActive} onChange={($ev) => setNemesisIsActive($ev.target.checked)}></input>
                </div>
            </div>
            <div className="re-settings__buttons-container">
                {
                    lstDifficulties.map(difficulty =>
                        <button key={`difficulty-${difficulty.name}`} className="re-settings__button" onClick={() => handleOpenConfirmationModal(difficulty)}>{difficulty.name}</button>
                    )
                }
            </div>

            <ResidentRules />

        </div>
    )
}
