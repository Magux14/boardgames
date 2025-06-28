
import { useState } from 'react';
import { Modal } from 'antd';
import { InventorySelection } from '../inventory-selection/InventorySelection';
import { lstResidentItems } from '../../../../../data/resident-evil-data';
import './search-item-question.scss';

export const SearchItemQuestion = ({ callbackAddItemToInventory, userItems }) => {

    const [openInventorySelection, setOpenInventorySelection] = useState(false);

    const handleAddItemToInventory = (item, openConfirmationModal) => {
        callbackAddItemToInventory(item, openConfirmationModal);
        setOpenInventorySelection(false);
    }

    const handleAddRandomItemToIventory = (type) => {
        let lsItemsTobeGetted = []
        if (type == 'weapon') {
            lsItemsTobeGetted = lstResidentItems.filter(item => item.type == 'weapon');
        } else if (type == 'item') {
            lsItemsTobeGetted = lstResidentItems.filter(item => item.type != 'weapon');
        }

        const getRandomItem = () => {
            const total = lsItemsTobeGetted.reduce((acc, item) => acc + item.probabilityToSpawn, 0);
            console.log('total', total);
            let selectedItem;
            const random = Math.random() * total;
            let acc = 0;
            for (const item of lsItemsTobeGetted) {
                acc += item.probabilityToSpawn;
                if (random < acc) {
                    selectedItem = item;
                    break;
                }
            }
            return selectedItem;
        }

        // const results = {};
        // for (let i = 0; i < 1000; i++) {
        //     const selected = getRandomItem();
        //     results[selected.name] = (results[selected.name] || 0) + 1;
        // }
        // console.log(results);

        let selectedItem = getRandomItem();
        if (userItems.find(item => item.name == selectedItem.name) != null) {
            selectedItem = getRandomItem();
        }

        if (selectedItem == null) {
            if (type == 'weapon') {
                selectedItem = lstResidentItems.find(item => item.name == 'pistola g19');
            } else {
                selectedItem = lstResidentItems.find(item => item.name == 'pólvora a');
            }
        }

        handleAddItemToInventory(selectedItem);
    }

    return (
        <div className="search-item-question__container">
            <div className="search-item-question__title-container">
                ¿Dónde estás buscando?
            </div>
            <div className="search-item-question__option-container">
                <button onClick={() => handleAddRandomItemToIventory('item')}>En una habitación</button>
            </div>
            <div className="search-item-question__option-container">
                <button onClick={() => handleAddRandomItemToIventory('weapon')}>En una caja de armas</button>
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
