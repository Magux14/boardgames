import React from 'react';
import './pg-test-video.scss';

export const PGTestVideo = ({ phasmophobiaEquipment, hasEvidence, callbackClose, equipmentIsDamaged }) => {
    return (
        <div className="pg-test-video pg-test-video__layout">
            {
                equipmentIsDamaged &&
                <div className="pg-test-video__equipment-damaged-container">
                    Equipamiento dañado, hay una probabilidad del 33% que la prueba sea falsa
                </div>
            }
            <video src={`./img/phasmophobia/videos/${phasmophobiaEquipment}-${hasEvidence ? 'yes' : 'no'}.mp4`} className="pg-test-video__video" autoPlay={true} loop={true} />
            <button onClick={callbackClose}>Cerrar</button>
        </div>
    )
}
