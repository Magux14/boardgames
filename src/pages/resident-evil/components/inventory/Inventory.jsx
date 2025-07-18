

import './inventory.scss';
import { useEffect, useRef, useState } from 'react';
import { SearchItemQuestion } from '../search-item-question/SearchItemQuestion';
import { Modal } from 'antd';
import { ItemDetails } from '../item-details/ItemDetails';
import { WeaponStadistics } from '../weapon-stadistics/WeaponStadistics';
import { lstResidentCombinedItems } from '../../../../../data/resident-evil-data';
import { useResidentAudio } from '../../hooks/useResidentAudio';
import { ZombiePhase } from '../zombie-phase/ZombiePhase';
import { ResidentRooms } from '../resident-rooms/ResidentRooms';

export const Inventory = ({
    gameState,
    setGameValue,
    selectedItemIndex,
    items,
    callbackSetGameValue,
    callbackAddItemToInventory,
    callbackUseHealthItem,
    callbackAddBulletsByGunpowder
}) => {

    const prevLengthInventoryRef = useRef(items.length);
    const [selectedForCombine, setSelectedForCombine] = useState();
    const [openZombiePhase, setOpenZombiePhase] = useState(false);
    const [openRooms, setOpenRooms] = useState(false);
    const { playOpenInventory, playCloseInventory } = useResidentAudio();

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

    const handleDiscardItemIndex = (index, closeModal = true) => {
        callbackSetGameValue('discardItemIndex', index);
        if (closeModal) {
            closeItemDetailsModal();
        }
    }

    const handleOpenSearchQuestionModal = () => {
        setOpenSearchQuestionModal(true);
    }

    const handleClickOnItem = (index, justAdded) => {
        if (selectedForCombine) {
            if (selectedForCombine.index == index) {
                setSelectedForCombine();
            } else {
                playOpenInventory();
                combineItems(selectedForCombine, { index, item: items[index] });
            }
        } else {
            handleOpenItemDetailsModal(index, justAdded)
        }
    }

    const handleOpenItemDetailsModal = (index, justAdded) => {
        setItemDetailsModal({
            open: true,
            index,
            item: items[index],
            justAdded
        });
    }

    const handleAddItemToInventory = (item) => {
        callbackAddItemToInventory(item);
        setOpenSearchQuestionModal(false);
    }

    const closeItemDetailsModal = () => {
        setItemDetailsModal({
            open: false,
            index: -1
        })
    }

    const handleAddNewItemForOpenItemModal = () => {
        const prevLength = prevLengthInventoryRef.current;
        const currentLength = items.length;
        if (prevLength + 1 == currentLength) {
            handleOpenItemDetailsModal(items.length - 1, true);
        }

        prevLengthInventoryRef.current = currentLength;
    }

    const setItemToCombine = (index, item) => {
        closeItemDetailsModal();
        setSelectedForCombine({
            index,
            item
        });
    }

    const itemIsValidToCombine = (itemAndIndex, selectedToCombineItemAndIndex) => {
        return itemAndIndex.item.lstToCombineItems?.includes(selectedToCombineItemAndIndex.item.name)
            || itemAndIndex.index == selectedToCombineItemAndIndex.index;
    }

    const combineItems = (itemAndIndexA, itemAndIndexB) => {
        for (let combinedItem of lstResidentCombinedItems) {
            const lstItemsToCombine = [...combinedItem.itemsToCombine];
            const indexFirstItem = lstItemsToCombine.findIndex(item => item == itemAndIndexA.item.name);
            if (indexFirstItem == -1) {
                continue;
            }
            lstItemsToCombine.splice(indexFirstItem, 1);
            const indexSecondItem = lstItemsToCombine.findIndex(item => item == itemAndIndexB.item.name);
            if (indexSecondItem == -1) {
                continue;
            }

            items = items.filter((_, index) => ![itemAndIndexA.index, itemAndIndexB.index].includes(index));
            items.push(combinedItem);
            callbackSetGameValue('items', items);
            setSelectedForCombine();
            break;
        }
    }

    const handleGainBulletsByGunPowder = (gunPodwerIndex, bulletsCreation) => {
        callbackAddBulletsByGunpowder(gunPodwerIndex, bulletsCreation.type, bulletsCreation.amount);
        closeItemDetailsModal();
    }

    const handleCloseZombiePhase = () => {
        setOpenZombiePhase(false)
    }

    useEffect(() => {
        handleAddNewItemForOpenItemModal();
    }, [items]);

    useEffect(() => {
        if (itemDetailsModal.open) {
            playOpenInventory();
        }
    }, [itemDetailsModal.open])

    return (
        <div className="inventory__container">

            <Modal
                open={openSearchQuestionModal}
                footer={null}
                onCancel={() => setOpenSearchQuestionModal(false)}
                className="inventory__modal"
                centered={true}
            >
                <SearchItemQuestion
                    gameState={gameState}
                    callbackAddItemToInventory={handleAddItemToInventory}
                    userItems={items}
                    inventoryFull={items.length >= 6}
                    callbackClose={() => setOpenSearchQuestionModal(false)}
                />
            </Modal>

            <Modal
                open={itemDetailsModal.open}
                footer={null}
                onCancel={() => {
                    closeItemDetailsModal();
                    playCloseInventory();
                }}
                className="inventory__modal"
                centered={true}
                destroyOnClose={true}
            >
                <ItemDetails
                    itemDetails={{
                        index: itemDetailsModal.index,
                        item: itemDetailsModal.item,
                        justAdded: itemDetailsModal.justAdded
                    }}
                    equipedItem={items[selectedItemIndex]}
                    callbackEquipItem={handleSelectItemIndex}
                    callbackDiscardItem={handleDiscardItemIndex}
                    callbackClose={closeItemDetailsModal}
                    callbackUseHealthItem={callbackUseHealthItem}
                    callbackSetItemToCombine={setItemToCombine}
                    callbackGainBulletsByGunPowder={handleGainBulletsByGunPowder}
                />
            </Modal>

            <Modal
                open={openZombiePhase}
                onCancel={handleCloseZombiePhase}
                footer={null}
                centered={true}
                className="inventory__modal"
                destroyOnClose={true}
            >
                <ZombiePhase gameState={gameState} />
            </Modal>

            <Modal
                open={openRooms}
                onCancel={() => setOpenRooms(false)}
                footer={null}
                centered={true}
                className="inventory__modal"
            >
                <ResidentRooms gameState={gameState} setGameValue={setGameValue} />
            </Modal>


            <div className="inventory__title-container">
                Inventario
            </div>
            <div className="inventory__current-item-container">
                <div className="inventory__current-item">
                    <div className="inventory__current-item-image-container">
                        <img src={`./img/resident-evil/items/${items[selectedItemIndex] != null ? items[selectedItemIndex].name : 'empty'}.webp`} />
                        <div className="inventory__weapon-equiped">
                            {
                                selectedItemIndex != -1 &&
                                <>
                                    EQUIPADO
                                </>
                            }
                        </div>
                    </div>
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
                        items[selectedItemIndex]?.type == 'weapon' &&
                        <WeaponStadistics weapon={items[selectedItemIndex].weapon} />
                    }
                </div>

            </div>
            <div className="inventory__items-container">
                {
                    items.map((item, index) =>
                        <div
                            key={`${item.name}-${index}`}
                            className={`inventory__item ${(selectedForCombine && !itemIsValidToCombine({
                                item,
                                index
                            }, selectedForCombine)) ? 'inventory__item--not-able-to-combine' : ''}`}
                            onClick={() => handleClickOnItem(index)}
                        >
                            {
                                selectedForCombine && index == selectedForCombine.index &&
                                <div className="inventory__item--selected-for-combine" />
                            }
                            <img
                                src={`./img/resident-evil/items/${item.name}.webp`}
                            />
                        </div>
                    )
                }
                {
                    new Array(6 - items.length >= 0 ? 6 - items.length : 0).fill(null).map((_, index) =>
                        <div key={`empty-space-${index}`} className={`inventory__item inventory__item--empty ${selectedForCombine ? 'inventory__item--not-able-to-combine' : ''}`}>
                            <img src={`./img/resident-evil/items/empty.webp`} />
                        </div>
                    )
                }
                <div className="inventory__buttons-container" >
                    <button className="inventory__button--search" onClick={() => handleOpenSearchQuestionModal(true)} >Buscar</button>
                    {
                        gameState.isHost &&
                        <button
                            className="inventory__button--zombies"
                            onClick={() => setOpenZombiePhase(true)}
                        >
                            Zombies
                        </button>
                    }
                    {
                        gameState.isHost &&
                        <button
                            className="inventory__button--rooms"
                            onClick={() => setOpenRooms(true)}
                        >
                            Mapa
                        </button>
                    }
                </div>
            </div>
        </div >
    )
}
