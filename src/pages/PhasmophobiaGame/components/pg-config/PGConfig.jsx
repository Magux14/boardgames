import React, { useEffect, useState } from 'react';
import './pg-config.scss';

const defaultConfig = {
    playersNum: 2,
    minBadEnergyValue: 2,
    maxBadEnergyValue: 5,
    equipmentIsDamaged: false
}
export const PGConfig = ({ callbackSetConfig }) => {
    const [config, setConfig] = useState(defaultConfig);

    const handleConfigChange = (property, newValue, type) => {

        if (!newValue && type != 'boolean') {
            config[property] = newValue;
            setConfig({ ...config });
            return;
        }

        if (type == 'number' && isNaN(newValue)) {
            return;
        } else if (type == 'number') {
            newValue = +newValue;
        }

        config[property] = newValue;
        setConfig({ ...config });
    }

    const handleContinue = () => {
        callbackSetConfig(config);
    }

    const validateAllValues = () => {
        if (!config.playersNum ||
            !config.minBadEnergyValue ||
            !config.maxBadEnergyValue ||
            config.minBadEnergyValue > config.maxBadEnergyValue
        ) {
            return true;
        }

        return false;
    }

    const onChangePlayersNum = (playersNum) => {
        switch (playersNum) {
            case 2: {
                config.minBadEnergyValue = 3;
                config.maxBadEnergyValue = 5;
            } break;
            case 3: {
                config.minBadEnergyValue = 4;
                config.maxBadEnergyValue = 6;
            } break;
            case 4: {
                config.minBadEnergyValue = 6;
                config.maxBadEnergyValue = 9;
            } break;
            default: {
                config.minBadEnergyValue = 3;
                config.maxBadEnergyValue = 5;
            } break;
        }
        setConfig({ ...config });
    }

    useEffect(() => {
        onChangePlayersNum(config.playersNum);
    }, [config.playersNum])

    return (
        <div className="pg-config">
            <div className="pg-config__title-container">
                Configuración
            </div>
            <div className="pg-config__inputs-container">

                <div className="pg-config__input-container">
                    <label>Cantidad de jugares</label>
                    <input type="number" value={config.playersNum} onChange={(ev) => handleConfigChange('playersNum', ev.target.value, 'number')} />
                </div>
                <div className="pg-config__description-container">
                    Se recomienda que para {config.playersNum || 'X'} jugadores se utilicen los siguientes valores de energía maldita (valores donde el fantamas puede atarcar).
                </div>
                <div className="pg-config__input-container">
                    <label>Energía mínima maldita</label>
                    <input type="number" value={config.minBadEnergyValue} onChange={(ev) => handleConfigChange('minBadEnergyValue', ev.target.value, 'number')} />
                </div>
                <div className="pg-config__input-container">
                    <label>Energía máxima maldita</label>
                    <input type="number" value={config.maxBadEnergyValue} onChange={(ev) => handleConfigChange('maxBadEnergyValue', ev.target.value, 'number')} />
                </div>
                <div className="pg-config__description-container">
                    Una prueba tendrá un 33% de probabilidad de ser falsa
                </div>
                <div className="pg-config__input-container">
                    <label>Equipo dañado</label>
                    <input type="checkbox" value={config.equipmentIsDamaged} onChange={(ev) => handleConfigChange('equipmentIsDamaged', ev.target.checked, 'boolean')} />
                </div>
                <div className="pg-config__continue-container">
                    <button onClick={handleContinue} disabled={validateAllValues()}>Continuar</button>
                </div>
            </div>

        </div>
    )
}
