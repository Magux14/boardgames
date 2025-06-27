import SocialDistanceIcon from '@mui/icons-material/SocialDistance';
import CasinoIcon from '@mui/icons-material/Casino';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import FlashOnIcon from '@mui/icons-material/FlashOn';

import './inventory.scss';

export const Inventory = ({ selectedItemIndex, items, callbackSelectItemIndex }) => {

    const handleSelectItemIndex = (index) => {
        callbackSelectItemIndex('selectedItemIndex', index);
    }

    if (selectedItemIndex == null) {
        return <></>
    }

    return (
        <div className="inventory__container">
            <div className="inventory__title-container">
                Inventario
            </div>
            <div className="inventory__current-item-container">
                <div className="inventory__item">
                    <img src={`./img/resident-evil/weapons/${items[selectedItemIndex].name}.webp`} />
                    <span className="inventory__item-name">{items[selectedItemIndex].name}</span>
                </div>
                <div className="inventory__current-item-stadistic-container">
                    <div className="inventory__current-item-stadistic-container">
                        <div className="inventory__current-item-stadistic-icon">
                            <SocialDistanceIcon />
                        </div>
                        <div className="inventory__current-item-stadistic-number">
                            {items[selectedItemIndex].weapon.minRange} -  {items[selectedItemIndex].weapon.maxRange}
                        </div>
                    </div>
                </div>
                <div className="inventory__current-item-stadistic-container">
                    <div className="inventory__current-item-stadistic-container">
                        <div className="inventory__current-item-stadistic-icon">
                            <CasinoIcon />
                        </div>
                        <div className="inventory__current-item-stadistic-number">
                            {items[selectedItemIndex].weapon.dices}
                        </div>
                    </div>
                </div>
                <div className="inventory__current-item-stadistic-container">
                    <div className="inventory__current-item-stadistic-container">
                        <div className="inventory__current-item-stadistic-icon">
                            <AdsClickIcon />
                        </div>
                        <div className="inventory__current-item-stadistic-number">
                            {items[selectedItemIndex].weapon.hit}
                        </div>
                    </div>
                </div>
                <div className="inventory__current-item-stadistic-container">
                    <div className="inventory__current-item-stadistic-container">
                        <div className="inventory__current-item-stadistic-icon">
                            <FlashOnIcon />
                        </div>
                        <div className="inventory__current-item-stadistic-number">
                            {items[selectedItemIndex].weapon.firePower}
                        </div>
                    </div>
                </div>
            </div>
            <div className="inventory__current-item-container">

            </div>
            <div className="inventory__items-container">
                {
                    items.map((item, index) =>
                        <div key={`${item.name}-${index}`} className="inventory__item" onClick={() => handleSelectItemIndex(index)}>
                            <img src={`./img/resident-evil/weapons/${item.name}.webp`} />
                            {/* <span className="inventory__item-name">{item.name}</span> */}
                        </div>
                    )
                }
            </div>
        </div>
    )
}
