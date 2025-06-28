
import './item-details.scss';
import '../inventory/inventory.scss';
import { WeaponStadistics } from '../weapon-stadistics/WeaponStadistics';
export const ItemDetails = ({ itemDetails, callbackEquipItem, callbackDiscardItem }) => {

    const handleEquipItem = () => {
        callbackEquipItem(itemDetails.index);
    }

    const handleDiscardItem = () => {
        callbackDiscardItem(itemDetails.index);
    }

    return (
        <div className="item-details__container">
            <div className="item-details__image-container">
                <img src={`./img/resident-evil/items/${itemDetails.item.name}.webp`} />
            </div>
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
                itemDetails.item.type == 'weapon' && !itemDetails.item.weapon.notEquipable &&
                <>
                    <WeaponStadistics weapon={itemDetails.item.weapon} />
                    <button className="item-details__button item-details__button--ok" onClick={handleEquipItem}>Equipar</button>
                </>
            }
            <button className="item-details__button item-details__button--danger" onClick={handleDiscardItem}>Descartar</button>
        </div >
    )
}
