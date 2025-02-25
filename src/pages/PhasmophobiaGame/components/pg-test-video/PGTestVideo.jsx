import React from 'react';
import './pg-test-video.scss';

export const PGTestVideo = ({ phasmophobiaEquipment, hasEvidence, callbackClose }) => {
    return (
        <div className="pg-test-video pg-test-video__layout">
            <video src={`./img/phasmophobia/videos/${phasmophobiaEquipment}-${hasEvidence ? 'yes' : 'no'}.mp4`} className="pg-test-video__video" autoPlay={true} loop={true} />
            <button onClick={callbackClose}>Cerrar</button>
        </div>
    )
}
