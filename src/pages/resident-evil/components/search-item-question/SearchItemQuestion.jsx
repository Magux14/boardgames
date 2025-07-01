
import { useState } from 'react';
import { Modal } from 'antd';
import { InventorySelection } from '../inventory-selection/InventorySelection';
import { lstResidentItems } from '../../../../../data/resident-evil-data';
import './search-item-question.scss';
import { ZombiePhase } from '../zombie-phase/ZombiePhase';

export const SearchItemQuestion = ({ callbackAddItemToInventory, userItems, inventoryFull, callbackClose }) => {

    const [openInventorySelection, setOpenInventorySelection] = useState(false);
    const [openZombiePhase, setOpenZombiePhase] = useState(false);

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
            const total = lsItemsTobeGetted.reduce((acc, item) => acc + item.probabilityToAppear, 0);
            // console.log('total', total);
            let selectedItem;
            const random = Math.random() * total;
            let acc = 0;
            for (const item of lsItemsTobeGetted) {
                acc += item.probabilityToAppear;
                if (random < acc) {
                    selectedItem = item;
                    break;
                }
            }
            return selectedItem;
        }

        // const results = {};
        // for (let i = 0; i < 100; i++) {
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

    const handleCloseZombiePhase = () => {
        setOpenZombiePhase(false)
        callbackClose();
    }

    return (
        <div className="search-item-question__container">
            <div className="search-item-question__title-container">
                ¿Dónde estás buscando?
            </div>
            {
                inventoryFull &&
                <div className="search-item-question__warning-message-container">
                    Inventario lleno, descarte algún objeto antes de buscar de nuevo
                </div>
            }
            <div className="search-item-question__option-container">
                <button
                    className="search-item-question__option-button search-item-question__option-button--ok"
                    onClick={() => handleAddRandomItemToIventory('item')}
                    disabled={inventoryFull}
                >
                    En una habitación
                </button>
            </div>
            <div className="search-item-question__option-container">
                <button
                    className="search-item-question__option-button search-item-question__option-button--warning"
                    onClick={() => handleAddRandomItemToIventory('weapon')}
                    disabled={inventoryFull}
                >
                    En una caja de armas
                </button>
            </div>
            <div className="search-item-question__option-container">
                <button
                    className="search-item-question__option-button search-item-question__option-button--friend"
                    onClick={() => setOpenInventorySelection(true)}
                    disabled={inventoryFull}
                >
                    Un compañero me está dando un objeto
                </button>
            </div>
            <div className="search-item-question__option-container">
                <button
                    className="search-item-question__option-button search-item-question__option-button--danger"
                    onClick={() => setOpenZombiePhase(true)}
                >
                    Fase de zombies
                </button>
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

            <Modal
                open={openZombiePhase}
                onCancel={handleCloseZombiePhase}
                footer={null}
                centered={true}
                className="inventory__modal"
                destroyOnClose={true}
            >
                <ZombiePhase />
            </Modal>
        </div>

    )
}
