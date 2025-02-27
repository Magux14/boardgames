import React, { useState } from 'react';
import './pg-config.scss';

const defaultConfig = {
    playersNum: '',
    minBadEnergyValue: 2,
    maxBadEnergyValue: 5
}
export const PGConfig = ({ callbackSetConfig }) => {
    const [config, setConfig] = useState(defaultConfig);

    const handleConfigChange = (property, newValue, type) => {

        if (!newValue) {
            config[property] = newValue;
            setConfig({ ...config });
            return;
        }

        if (type == 'number' && isNaN(newValue)) {
            return;
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

    return (
        <div className="pg-config">
            <div class="pg-config__title-container">
                Configuración
            </div>
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
            <div className="pg-config__continue-container">
                <button onClick={handleContinue} disabled={validateAllValues()}>Continuar</button>
            </div>

        </div>
    )
}
