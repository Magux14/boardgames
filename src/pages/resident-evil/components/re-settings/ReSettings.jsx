import { useState } from 'react';
import { lstResidentItems } from '../../../../../data/resident-evil-data';
import ConfirmationModal from '../../../../components/confirmation-modal/ConfirmationModal';
import './re-settings.scss';

export const ReSettings = ({ callbackSetDifficulty }) => {

    const lstDifficulties = [
        {
            name: 'fácil',
            desc: 'Para los que solo quieren pasarla bien sin preocuparse de nada',
            weapons: ['rifle de asalto', 'merc handgun', 'cuchillo', 'spray médico'],
            gunBullets: 30,
            shotgunBullets: 10,
            machinegunBullets: 100,
        },
        {
            name: 'normal',
            desc: 'Juego estandar para gente que quiere disfrutar del juego sin complicaciones',
            weapons: ['pistola g19', 'cuchillo', 'hierba verde'],
            gunBullets: 20,
            shotgunBullets: 5,
            machinegunBullets: 40,
        },
        {
            name: 'difícil',
            desc: 'Para aquellos a los que les gustan los retos',
            weapons: ['cuchillo'],
            gunBullets: 8,
            shotgunBullets: 4,
            machinegunBullets: 30,
        }
    ]

    const [selectedDifficulty, setSelectedDifficulty] = useState(null);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

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
            life: 3,
            gunBullets: difficulty.gunBullets,
            shotgunBullets: difficulty.shotgunBullets,
            machinegunBullets: difficulty.machinegunBullets,
            items: difficulty.weapons.map(name => getItemByName(name)),
            selectedItemIndex: 0
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
            <div className="re-settings__buttons-container">
                {
                    lstDifficulties.map(difficulty =>
                        <button key={`difficulty-${difficulty.name}`} className="re-settings__button" onClick={() => handleOpenConfirmationModal(difficulty)}>{difficulty.name}</button>
                    )
                }
            </div>

        </div>
    )
}
