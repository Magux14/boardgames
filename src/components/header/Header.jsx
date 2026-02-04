import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import ChecklistIcon from '@mui/icons-material/Checklist';
import CasinoIcon from '@mui/icons-material/Casino';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import { useNavigate } from "react-router-dom";
import StyleIcon from '@mui/icons-material/Style';
import './Header.css';
import { message } from 'antd';
import { useLongPress } from '../../hooks/useLongPress';

export const Header = () => {

    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const goTo = (path) => {
        setTimeout(() => {
            navigate(path, { replace: true });
        }, 100);
    }

    const copySharedLink = (path) => {
        return useLongPress(
            () => {
                const link = `${window.location.origin}/boardgames?redirect=${path}`;
                navigator.clipboard.writeText(link);
                messageApi.info(`"${link}" ¡copiado!`);
            },
            () => { },
            600
        );
    }

    return (
        <>
            <div id="header-container">
                <MenuIcon onClick={toggleMenu} />
            </div>

            <div id="side-menu-container">
                {contextHolder}
                <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                    <div className="sidebar-content-container">

                        <div className='menu-title'>
                            Menú
                        </div>

                        <div className='menu-sub-title'>
                            Utilidades
                        </div>
                        <ul>
                            <li onClick={() => goTo('/counting')} {...copySharedLink('counting')}>
                                <span>Contador de puntos</span><span>+/-</span>
                            </li>

                            <li onClick={() => goTo('/dice')} {...copySharedLink('dice')}>
                                <span>Dados</span> <CasinoIcon />
                            </li>

                            <li onClick={() => goTo('/deck-tester')} {...copySharedLink('deck-tester')}>
                                <span>Deck Tester</span> <StyleIcon />
                            </li>

                            <li onClick={() => goTo('/')}>
                                <span>Lista de juegos</span> <ChecklistIcon />
                            </li>

                            <li onClick={() => goTo('/timer')} {...copySharedLink('timer')}>
                                <span>Timer</span> <AvTimerIcon />
                            </li>

                        </ul>

                        <div className='menu-sub-title'>
                            Juegos digitales
                        </div>

                        <ul>
                            <li onClick={() => goTo('/basta')} {...copySharedLink('basta')}>
                                <span>Basta</span> <img src="./img/basta/logo.webp" />
                            </li>

                            <li onClick={() => goTo('/blockbuster')} {...copySharedLink('blockbuster')}>
                                <span>Blockbuster</span> <img src="./img/blockbuster/logo.png" />
                            </li>

                            <li onClick={() => goTo('/ice-breaker')} {...copySharedLink('ice-breaker')}>
                                <span>Ice Breaker</span> <img src="./img/ice-breaker/back.png" alt="ice-breaker" width={24} height={24} />
                            </li>

                            <li onClick={() => goTo('/cow-mind')} {...copySharedLink('cow-mind')}>
                                <span>Mente Vacuna</span> <img src="./icons/cow.png" alt="cow" width={24} height={24} />
                            </li>

                            <li onClick={() => goTo('/no-mames')} {...copySharedLink('no-mames')}>
                                <span>No mames</span> <img src="./img/no-mames/back.png" alt="cow" width={24} height={24} />
                            </li>

                            <li onClick={() => goTo('/phasmophobia-filter')} {...copySharedLink('phasmophobia')}>
                                <span>Phasmophobia</span> <img id="phasmophobia-icon" src="./icons/phasmophobia-icon.png" />
                            </li>

                            <li onClick={() => goTo('/resident-evil')} {...copySharedLink('resident-evil')}>
                                <span>Resident Evil</span> <img src="./img/resident-evil/resident-evil.jpg" alt="tabu" width={24} height={24} />
                            </li>

                            <li onClick={() => goTo('/unanimo')} {...copySharedLink('unanimo')}>
                                <span>Unánimo</span> <img src="./img/unánimo/back.webp" alt="cow" width={24} height={24} />
                            </li>

                            <li onClick={() => goTo('/tabu')} {...copySharedLink('tabu')}>
                                <span>Tabú</span> <img src="./img/games/tabu.png" alt="tabu" width={24} height={24} />
                            </li>

                            <li onClick={() => goTo('/yo-nunca-nunca')} {...copySharedLink('yo-nunca-nunca')}>
                                <span>Yo Nunca Nunca</span> <img src="./img/yo-nunca-nunca/back.png" alt="cow" width={24} height={24} />
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={`overlay ${isOpen ? 'active' : ''}`} onClick={toggleMenu}></div>
            </div>
        </>
    )
}