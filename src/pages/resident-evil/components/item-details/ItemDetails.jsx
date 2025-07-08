
import './item-details.scss';
import '../inventory/inventory.scss';
import { WeaponStadistics } from '../weapon-stadistics/WeaponStadistics';
import { useEffect, useState } from 'react';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import ConfirmationModal from '../../../../components/confirmation-modal/ConfirmationModal';
import { useResidentAudio } from '../../hooks/useResidentAudio';

export const ItemDetails = ({
    itemDetails,
    callbackEquipItem,
    callbackDiscardItem,
    callbackClose,
    callbackUseHealthItem,
    callbackSetItemToCombine,
    equipedItem,
    callbackGainBulletsByGunPowder
}) => {

    const [showConfirmDiscardModal, setShowConfirmDicardModal] = useState(false);
    const [showBulletsGunPowderModal, setShowBulletsGunPowderModal] = useState(false);
    const [openOneUseQuestionModal, setOpenOneUseQuestionModal] = useState(false);

    const { playOpenInventory, playCloseInventory } = useResidentAudio();

    const handleEquipItem = () => {
        callbackEquipItem(itemDetails.index);
        playOpenInventory();
    }

    const handleDiscardItem = () => {
        callbackDiscardItem(itemDetails.index);
        playCloseInventory();
    }

    const handleUseHealthItem = (pointsToRecover) => {
        callbackDiscardItem(itemDetails.index);
        callbackUseHealthItem(pointsToRecover);
        playOpenInventory();
    }

    const handleKeepItem = () => {
        callbackClose();
        playCloseInventory();
    }

    const handleUseAndDiscard = () => {
        callbackDiscardItem(itemDetails.index);
        playOpenInventory();
    }

    useEffect(() => {
        if (itemDetails.item.instaDiscard) {
            callbackDiscardItem(itemDetails.index, false);
            playOpenInventory();
        }
    }, []);

    return (
        <div className="item-details__container">

            <ConfirmationModal
                showAlert={openOneUseQuestionModal}
                description="¿Deseas utilizar este objeto? Después de usarse se descartará"
                acceptCallback={handleUseAndDiscard}
                closeCallback={() => setOpenOneUseQuestionModal(false)}
            ></ConfirmationModal>

            <ConfirmationModal
                showAlert={showConfirmDiscardModal}
                description="¿En verdad deseas descartar este objeto?"
                acceptCallback={handleDiscardItem}
                closeCallback={() => setShowConfirmDicardModal(false)}
            ></ConfirmationModal>

            <ConfirmationModal
                showAlert={showBulletsGunPowderModal}
                description="¿Estás junto a una máquina de balas para poder crear las balas?"
                acceptCallback={() => {
                    callbackGainBulletsByGunPowder(itemDetails.index, itemDetails.item.bulletsCreation);
                    playOpenInventory();
                }}
                closeCallback={() => setShowBulletsGunPowderModal(false)}
            ></ConfirmationModal>

            <div className="item-details__image-container">
                {
                    itemDetails.item.type == 'activation'
                        ?
                        <img src={`./img/resident-evil/zombies/${itemDetails.item.name}.webp`} />
                        :
                        <img src={`./img/resident-evil/items/${itemDetails.item.name}.webp`} />
                }
            </div>
            <div className="item-details__name-description-container">

                <div className="item-details__name-container">
                    {
                        itemDetails.item.type == 'activation' &&
                        <span>Activación&nbsp;</span>
                    }
                    <span>
                        {
                            itemDetails.item.name
                        }
                    </span>
                </div>
                {
                    itemDetails.item.desc != null &&
                    <div className="item-details__description-container">
                        {itemDetails.item.desc}
                    </div>
                }
                {
                    itemDetails.item.type == 'bullets' && itemDetails.item.bulletsAdded &&
                    <div className="item-details__description-container">
                        Balas encontradas: {itemDetails.item.bulletsAdded}
                    </div>
                }
            </div >

            <div className="item-details__buttons-container">
                {
                    !itemDetails.item.instaDiscard &&
                    itemDetails.item.type == 'weapon' &&
                    <>
                        {
                            equipedItem?.weapon &&
                            <>
                                <div className="item-details__weapon-stadistics-container">
                                    <img src={`./img/resident-evil/items/${equipedItem.name}.webp`} />
                                    <div className="item-details__weapon-equiped">
                                        EQUIPADO
                                    </div>
                                    <WeaponStadistics previousWeapon={itemDetails.item.weapon} weapon={equipedItem.weapon} />
                                </div>
                                <div className="item-details__swap-icon-container">
                                    <SwapVertIcon />
                                </div>
                            </>
                        }
                        <div className="item-details__weapon-stadistics-container">
                            {
                                equipedItem?.weapon &&
                                <img src={`./img/resident-evil/items/${itemDetails.item.name}.webp`} />
                            }
                            <WeaponStadistics previousWeapon={equipedItem?.weapon} weapon={itemDetails.item.weapon} />
                        </div>
                        {
                            !itemDetails.item.weapon.notEquipable &&
                            <button className="item-details__button item-details__button--ok" onClick={handleEquipItem}>Equipar</button>
                        }
                    </>
                }
                {
                    !itemDetails.item.instaDiscard &&
                    itemDetails.justAdded &&
                    <button className="item-details__button item-details__button--ok" onClick={() => handleKeepItem()}>Guardar</button>
                }
                {
                    itemDetails.item.type == 'bulletsCreation' && itemDetails.item.bulletsCreation.amount > 0 &&
                    <>
                        <button className="item-details__button item-details__button--ok" onClick={() => setShowBulletsGunPowderModal(true)}>Usar</button>
                    </>
                }
                {
                    itemDetails.item.instantUse &&
                    <>
                        <button className="item-details__button item-details__button--ok" onClick={() => setOpenOneUseQuestionModal(true)}>Usar</button>
                    </>
                }
                {
                    itemDetails.item.type == 'health' && itemDetails.item.recover > 0 &&
                    <>
                        <button className="item-details__button item-details__button--ok" onClick={() => handleUseHealthItem(itemDetails.item.recover)}>Usar</button>
                    </>
                }
                {
                    !itemDetails.item.instaDiscard &&
                    <button className="item-details__button item-details__button--danger" onClick={() => setShowConfirmDicardModal(true)}>Descartar</button>
                }
                {
                    itemDetails.item.lstToCombineItems?.length &&
                    <>
                        <button className="item-details__button item-details__button--combine" onClick={() => callbackSetItemToCombine(itemDetails.index, itemDetails.item)}>Combinar</button>
                    </>
                }
                {
                    itemDetails.item.instaDiscard &&
                    <>
                        <button className="item-details__button item-details__button--ok" onClick={() => handleKeepItem()}>Entiendo</button>
                    </>
                }
            </div>


        </div >
    )
}
