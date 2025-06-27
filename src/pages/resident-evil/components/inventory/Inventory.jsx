import SocialDistanceIcon from '@mui/icons-material/SocialDistance';
import CasinoIcon from '@mui/icons-material/Casino';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import FlashOnIcon from '@mui/icons-material/FlashOn';

import './inventory.scss';
import { useState } from 'react';
import { SearchItemQuestion } from '../search-item-question/SearchItemQuestion';
import { Modal } from 'antd';

export const Inventory = ({ selectedItemIndex, items, callbackSelectItemIndex }) => {

    const [openSearchQuestionModal, setOpenSearchQuestionModal] = useState(false);
    const handleSelectItemIndex = (index) => {
        callbackSelectItemIndex('selectedItemIndex', index);
    }

    const handleOpenSearchQuestionModal = () => {
        setOpenSearchQuestionModal(true);
    }

    if (selectedItemIndex == null) {
        return <></>
    }

    const WeaponStadisctics = () => {
        return (
            <div className="inventory__current-item-stadistics-container">
                <div className="inventory__current-item-stadistic-container">
                    <div className="inventory__current-item-stadistic-icon">
                        <SocialDistanceIcon />
                    </div>
                    <div className="inventory__current-item-stadistic-number">
                        {items[selectedItemIndex].weapon.minRange} -  {items[selectedItemIndex].weapon.maxRange}
                    </div>
                </div>
                <div className="inventory__current-item-stadistic-container">
                    <div className="inventory__current-item-stadistic-icon">
                        <CasinoIcon />
                    </div>
                    <div className="inventory__current-item-stadistic-number">
                        {items[selectedItemIndex].weapon.dices}
                    </div>
                </div>
                <div className="inventory__current-item-stadistic-container">
                    <div className="inventory__current-item-stadistic-icon">
                        <AdsClickIcon />
                    </div>
                    <div className="inventory__current-item-stadistic-number">
                        {items[selectedItemIndex].weapon.hit}
                    </div>
                </div>
                <div className="inventory__current-item-stadistic-container">
                    <div className="inventory__current-item-stadistic-icon">
                        <FlashOnIcon />
                    </div>
                    <div className="inventory__current-item-stadistic-number">
                        {items[selectedItemIndex].weapon.firePower}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="inventory__container">
            <div className="inventory__title-container">
                Inventario
            </div>
            <div className="inventory__current-item-container">
                <div className="inventory__current-item">
                    <img src={`./img/resident-evil/items/${items[selectedItemIndex].name}.webp`} />
                </div>
                <div className="inventory__current-item-info-container">
                    <div className="inventory__current-item-info-title">
                        {items[selectedItemIndex].name}
                    </div>
                    {
                        items[selectedItemIndex].desc != null &&
                        <div className="inventory__current-item-info-desc">
                            {
                                items[selectedItemIndex].desc
                            }
                        </div>
                    }
                    {
                        items[selectedItemIndex].type == 'weapon' &&
                        <WeaponStadisctics />
                    }
                </div>

            </div>
            <div className="inventory__items-container">
                {
                    items.map((item, index) =>
                        <div key={`${item.name}-${index}`} className="inventory__item" onClick={() => handleSelectItemIndex(index)}>
                            <img src={`./img/resident-evil/items/${item.name}.webp`} />
                            {/* <span className="inventory__item-name">{item.name}</span> */}
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
            >
                <SearchItemQuestion />
            </Modal>
        </div>
    )
}
