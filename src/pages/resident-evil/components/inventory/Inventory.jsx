

import './inventory.scss';
import { useState } from 'react';
import { SearchItemQuestion } from '../search-item-question/SearchItemQuestion';
import { Modal } from 'antd';
import { ItemDetails } from '../item-details/ItemDetails';
import { WeaponStadistics } from '../weapon-stadistics/WeaponStadistics';

export const Inventory = ({ selectedItemIndex, items, callbackSetGameValue, callbackAddItemToInventory }) => {

    if (selectedItemIndex == null) {
        return <></>
    }

    const [openSearchQuestionModal, setOpenSearchQuestionModal] = useState(false);
    const [itemDetailsModal, setItemDetailsModal] = useState({
        open: false,
        index: -1
    });

    const handleSelectItemIndex = (index) => {
        callbackSetGameValue('selectedItemIndex', index);
        closeItemDetailsModal();
    }

    const handleDiscardItemIndex = (index) => {
        callbackSetGameValue('discardItemIndex', index);
        closeItemDetailsModal();
    }

    const handleOpenSearchQuestionModal = () => {
        setOpenSearchQuestionModal(true);
    }

    const handleOpenItemDetailsModal = (index) => {
        setItemDetailsModal({
            open: true,
            index,
            item: items[index]
        });
    }

    const handleAddItemToInventory = (item) => {
        callbackAddItemToInventory(item);
        setOpenSearchQuestionModal(false)
    }

    const closeItemDetailsModal = () => {
        setItemDetailsModal({
            open: false,
            index: -1
        })
    }

    console.log('itemDetailsModal', itemDetailsModal)

    return (
        <div className="inventory__container">
            <div className="inventory__title-container">
                Inventario
            </div>
            <div className="inventory__current-item-container">
                <div className="inventory__current-item">
                    <img src={`./img/resident-evil/items/${items[selectedItemIndex] != null ? items[selectedItemIndex].name : 'empty'}.webp`} />
                </div>
                <div className="inventory__current-item-info-container">
                    <div className="inventory__current-item-info-title">
                        {
                            items[selectedItemIndex]
                                ?
                                <span>
                                    {items[selectedItemIndex]?.name}
                                </span>
                                : <span>
                                    Sin Equipo
                                </span>
                        }
                    </div>
                    {
                        items[selectedItemIndex]?.desc != null &&
                        <div className="inventory__current-item-info-desc">
                            {
                                items[selectedItemIndex]?.desc
                            }
                        </div>
                    }
                    {
                        items[selectedItemIndex]?.type == 'weapon' &&
                        <WeaponStadistics weapon={items[selectedItemIndex].weapon} />
                    }
                </div>

            </div>
            <div className="inventory__items-container">
                {
                    items.map((item, index) =>
                        <div key={`${item.name}-${index}`} className="inventory__item" onClick={() => handleOpenItemDetailsModal(index)}>
                            <img src={`./img/resident-evil/items/${item.name}.webp`} />
                        </div>
                    )
                }
                {
                    new Array(6 - items.length >= 0 ? 6 - items.length : 0).fill(null).map((_, index) =>
                        <div key={`empty-space-${index}`} className="inventory__item inventory__item--empty">
                            <img src={`./img/resident-evil/items/empty.webp`} />
                        </div>
                    )
                }
                <div className="inventory__item-search-container" >
                    <button onClick={() => handleOpenSearchQuestionModal(true)}>Buscar</button>
                </div>
            </div>

            <Modal
                open={openSearchQuestionModal}
                footer={null}
                onCancel={() => setOpenSearchQuestionModal(false)}
                className="inventory__modal"
                centered={true}
            >
                <SearchItemQuestion callbackAddItemToInventory={handleAddItemToInventory} />
            </Modal>

            <Modal
                open={itemDetailsModal.open}
                footer={null}
                onCancel={closeItemDetailsModal}
                className="inventory__modal"
                centered={true}
            >
                <ItemDetails
                    itemDetails={{
                        index: itemDetailsModal.index,
                        item: itemDetailsModal.item
                    }}
                    callbackEquipItem={handleSelectItemIndex}
                    callbackDiscardItem={handleDiscardItemIndex}
                />
            </Modal>
        </div>
    )
}
