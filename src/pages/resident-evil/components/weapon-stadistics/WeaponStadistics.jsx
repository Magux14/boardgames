import SocialDistanceIcon from '@mui/icons-material/SocialDistance';
import CasinoIcon from '@mui/icons-material/Casino';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import FlareIcon from '@mui/icons-material/Flare';
import './weapon-stadistics.scss';
export const WeaponStadistics = ({ previousWeapon, weapon }) => {

    const getWeaponValueClass = (property) => {
        if (!previousWeapon || (previousWeapon[property] == weapon[property])) {
            return '';
        }

        let condition = previousWeapon[property] > weapon[property];
        if (property == 'hit') {
            condition = !condition;
        } else if (property == 'critic') {
            if (previousWeapon[property] == undefined && (weapon[property] == undefined)) {
                condition = false;
            } else if (previousWeapon[property] == undefined && (weapon[property] != undefined)) {
                condition = false;
            } else if (previousWeapon[property] != undefined && (weapon[property] == undefined)) {
                condition = true;
            } else if (previousWeapon[property] < weapon[property]) {
                condition = true;
            } else {
                condition = false;
            }
        }

        if (condition) {
            return 'weapon-stadistics__current-item-stadistic--lower';
        } else {
            return 'weapon-stadistics__current-item-stadistic--better';
        }
    }

    return (
        <div className="weapon-stadistics__current-item-stadistics-container">
            <div className="weapon-stadistics__current-item-stadistic-container">
                <div className={`weapon-stadistics__current-item-stadistic-icon ${getWeaponValueClass('maxRange')}`}>
                    <SocialDistanceIcon />
                </div>
                <div className="weapon-stadistics__current-item-stadistic-number">
                    <span className={`${getWeaponValueClass('minRange')}`}> {weapon.minRange}</span> -  <span className={`${getWeaponValueClass('maxRange')}`}>{weapon.maxRange}</span>
                </div>
            </div>
            <div className="weapon-stadistics__current-item-stadistic-container">
                <div className={`weapon-stadistics__current-item-stadistic-icon ${getWeaponValueClass('dices')}`}>
                    <CasinoIcon />
                </div>
                <div className={`weapon-stadistics__current-item-stadistic-number ${getWeaponValueClass('dices')}`}>
                    {weapon.dices}
                </div>
            </div>
            <div className="weapon-stadistics__current-item-stadistic-container">
                <div className={`weapon-stadistics__current-item-stadistic-icon ${getWeaponValueClass('hit')}`}>
                    <AdsClickIcon />
                </div>
                <div className={`weapon-stadistics__current-item-stadistic-number ${getWeaponValueClass('hit')}`}>
                    {weapon.hit}
                </div>
            </div>
            <div className="weapon-stadistics__current-item-stadistic-container">
                <div className={`weapon-stadistics__current-item-stadistic-icon ${getWeaponValueClass('critic')}`}>
                    <FlareIcon />
                </div>
                <div className={`weapon-stadistics__current-item-stadistic-number ${getWeaponValueClass('critic')}`}>
                    {weapon.critic || '-'}
                </div>
            </div>
            <div className="weapon-stadistics__current-item-stadistic-container">
                <div className={`weapon-stadistics__current-item-stadistic-icon ${getWeaponValueClass('firePower')}`}>
                    <FlashOnIcon />
                </div>
                <div className={`weapon-stadistics__current-item-stadistic-number ${getWeaponValueClass('firePower')}`}>
                    {weapon.firePower}
                </div>
            </div>
        </div>
    )
}
