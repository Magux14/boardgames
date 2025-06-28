
import { useState } from 'react';
import { Modal } from 'antd';
import { InventorySelection } from '../inventory-selection/InventorySelection';
import './search-item-question.scss';

export const SearchItemQuestion = ({ callbackAddItemToInventory }) => {

    const [openInventorySelection, setOpenInventorySelection] = useState(false);

    const handleAddItemToInventory = (item) => {
        callbackAddItemToInventory(item);
        setOpenInventorySelection(false);
    }

    return (
        <div className="search-item-question__container">
            <div className="search-item-question__title-container">
                ¿Dónde estás buscando?
            </div>
            <div className="search-item-question__option-container">
                <button>En una habitación</button>
            </div>
            <div className="search-item-question__option-container">
                <button>En una caja de armas</button>
            </div>
            <div className="search-item-question__option-container">
                <button onClick={() => setOpenInventorySelection(true)}>Un compañero me está dando un objeto</button>
            </div>

            <Modal
                open={openInventorySelection}
                onCancel={() => setOpenInventorySelection(false)}
                footer={null}
                centered={true}
                className="inventory__modal"
            >
                <InventorySelection callbackAddItemToInventory={handleAddItemToInventory} />
            </Modal>
        </div>

    )
}
