import React from 'react';
import './game-files.scss';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

export const GameFiles = ({ title, files }) => {

    const openUrl = (url) => {
        window.open(url, '_blank');
    }

    return (
        <div className="game-files game-files__container">
            <div className="game-files__title">
                {title}
            </div>
            {
                files.map(file =>
                    <div key={file.name} className="game-files__file" onClick={() => openUrl(file.url)}>
                        <span>
                            {file.name}
                        </span>
                        <PictureAsPdfIcon />
                    </div>
                )
            }
        </div>
    )
}
