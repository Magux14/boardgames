
import './item-details.scss';
import '../inventory/inventory.scss';
import { WeaponStadistics } from '../weapon-stadistics/WeaponStadistics';
import { useEffect } from 'react';
export const ItemDetails = ({
    itemDetails,
    callbackEquipItem,
    callbackDiscardItem,
    callbackClose,
    callbackUseHealthItem
}) => {

    const handleEquipItem = () => {
        callbackEquipItem(itemDetails.index);
    }

    const handleDiscardItem = () => {
        callbackDiscardItem(itemDetails.index);
    }

    const handleUseHealthItem = (pointsToRecover) => {
        callbackDiscardItem(itemDetails.index);
        callbackUseHealthItem(pointsToRecover);
    }

    useEffect(() => {
        if (itemDetails.item.instaDiscard) {
            callbackDiscardItem(itemDetails.index, false);
        }
    }, []);

    return (
        <div className="item-details__container">
            <div className="item-details__image-container">
                <img src={`./img/resident-evil/items/${itemDetails.item.name}.webp`} />
            </div>
            <div className="item-details__name-description-container">

                <div className="item-details__name-container">
                    {
                        itemDetails.item.name
                    }
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
                    itemDetails.item.type == 'health' && itemDetails.item.recover > 0 &&
                    <>
                        <button className="item-details__button item-details__button--ok" onClick={() => handleUseHealthItem(itemDetails.item.recover)}>Usar</button>
                    </>
                }
                {
                    !itemDetails.item.instaDiscard &&
                    <>
                        {
                            itemDetails.item.type == 'weapon' &&
                            <>
                                <WeaponStadistics weapon={itemDetails.item.weapon} />
                                {
                                    !itemDetails.item.weapon.notEquipable &&
                                    <button className="item-details__button item-details__button--ok" onClick={handleEquipItem}>Equipar</button>
                                }
                            </>
                        }
                        {
                            itemDetails.justAdded &&
                            <button className="item-details__button item-details__button--ok" onClick={() => callbackClose()}>Guardar</button>
                        }
                        <button className="item-details__button item-details__button--danger" onClick={handleDiscardItem}>Descartar</button>
                    </>
                }
                {
                    itemDetails.item.instaDiscard &&
                    <>
                        <button className="item-details__button item-details__button--ok" onClick={() => callbackClose()}>Entiendo</button>
                    </>
                }
            </div>


        </div >
    )
}
