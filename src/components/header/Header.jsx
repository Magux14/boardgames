import React, { useState } from 'react';
import './Header.css';
import MenuIcon from '@mui/icons-material/Menu';
import ChecklistIcon from '@mui/icons-material/Checklist';
import CasinoIcon from '@mui/icons-material/Casino';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import { useNavigate } from "react-router-dom";

export const Header = () => {

    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const goTo = (path) => {
        setTimeout(() => {
            navigate(path, { replace: true });
        }, 100);
    }

    return (
        <>
            <div id="header-container">
                <MenuIcon onClick={toggleMenu} />
            </div>

            <div id="side-menu-container">
                <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                    <div className='menu-title'>
                        <h2>Menú</h2>
                    </div>
                    <ul>
                        <li onClick={() => goTo('/')}>
                            <span>Lista de juegos</span> <ChecklistIcon />
                        </li>

                        <li onClick={() => goTo('/dice')}>
                            <span>Dados</span> <CasinoIcon />
                        </li>

                        <li onClick={() => goTo('/timer')}>
                            <span>Timer</span> <AvTimerIcon />
                        </li>

                        <li onClick={() => goTo('/counting')}>
                            <span>Contador de puntos</span><span>+/-</span>
                        </li>

                        <li onClick={() => goTo('/phasmophobia-filter')}>
                            <span>Phasmophobia</span> <img id="phasmophobia-icon" src="./icons/phasmophobia-icon.png"></img>
                        </li>


                        <li onClick={() => goTo('/resident-evil')}>
                            <span>Resident Evil</span> <img src="./img/resident-evil/resident-evil.jpg" alt="tabu" width={24} height={24} />
                        </li>

                        <li onClick={() => goTo('/blockbuster')}>
                            <span>Blockbuster</span> <img id="phasmophobia-icon" src="./img/blockbuster/logo.png"></img>
                        </li>

                        {/* <li onClick={() => goTo('/knowledge-race')}>
                            <span>Knowledge Race</span> <TimeToLeaveIcon />
                        </li> */}

                        <li onClick={() => goTo('/cow-mind')}>
                            <span>Mente Vacuna</span> <img src="./icons/cow.png" alt="cow" width={24} height={24} />
                        </li>

                        <li onClick={() => goTo('/yo-nunca-nunca')}>
                            <span>Yo Nunca Nunca</span> <img src="./img/yo-nunca-nunca/back.png" alt="cow" width={24} height={24} />
                        </li>

                        <li onClick={() => goTo('/no-mames')}>
                            <span>No mames</span> <img src="./img/no-mames/back.png" alt="cow" width={24} height={24} />
                        </li>

                        {/* <li onClick={() => goTo('/mario-party')}>
                            <span>Mario Party</span> <img src="./img/games/Magux-party.png" alt="mario party" width={24} height={24} />
                        </li> */}

                        <li onClick={() => goTo('/tabu')}>
                            <span>Tabú</span> <img src="./img/games/tabu.png" alt="tabu" width={24} height={24} />
                        </li>
                    </ul>
                </div>
                <div className={`overlay ${isOpen ? 'active' : ''}`} onClick={toggleMenu}></div>
            </div>
        </>
    )
}
