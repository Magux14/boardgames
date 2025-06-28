import SocialDistanceIcon from '@mui/icons-material/SocialDistance';
import CasinoIcon from '@mui/icons-material/Casino';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import './weapon-stadistics.scss';
export const WeaponStadistics = ({ weapon }) => {
    return (
        <div className="weapon-stadistics__current-item-stadistics-container">
            <div className="weapon-stadistics__current-item-stadistic-container">
                <div className="weapon-stadistics__current-item-stadistic-icon">
                    <SocialDistanceIcon />
                </div>
                <div className="weapon-stadistics__current-item-stadistic-number">
                    {weapon.minRange} -  {weapon.maxRange}
                </div>
            </div>
            <div className="weapon-stadistics__current-item-stadistic-container">
                <div className="weapon-stadistics__current-item-stadistic-icon">
                    <CasinoIcon />
                </div>
                <div className="weapon-stadistics__current-item-stadistic-number">
                    {weapon.dices}
                </div>
            </div>
            <div className="weapon-stadistics__current-item-stadistic-container">
                <div className="weapon-stadistics__current-item-stadistic-icon">
                    <AdsClickIcon />
                </div>
                <div className="weapon-stadistics__current-item-stadistic-number">
                    {weapon.hit}
                </div>
            </div>
            <div className="weapon-stadistics__current-item-stadistic-container">
                <div className="weapon-stadistics__current-item-stadistic-icon">
                    <FlashOnIcon />
                </div>
                <div className="weapon-stadistics__current-item-stadistic-number">
                    {weapon.firePower}
                </div>
            </div>
        </div>
    )
}
