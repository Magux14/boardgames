import { lstResidentItems } from '../../../../../data/resident-evil-data';
import '../inventory/inventory.scss';
import './inventory-selection.scss';

export const InventorySelection = ({ callbackAddItemToInventory }) => {

    const handleAddItemToInventory = (item) => {
        callbackAddItemToInventory(item, false);
    }

    const lstItems = JSON.parse(JSON.stringify(lstResidentItems.filter(item => item.type != 'activation' && item.type != 'bullets')));

    return (
        <div className="inventory-selection__container">
            <div className="inventory__items-container">
                {
                    lstItems.map((item, index) =>
                        <div key={`${item.name}-${index}`} className="inventory__item" onClick={() => handleAddItemToInventory(item)}>
                            <img src={`./img/resident-evil/items/${item.name}.webp`} />
                        </div>
                    )
                }
            </div>
        </div>
    )
}
