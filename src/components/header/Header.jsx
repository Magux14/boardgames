import React, { useState } from 'react';
import './Header.css';
import MenuIcon from '@mui/icons-material/Menu';
import ChecklistIcon from '@mui/icons-material/Checklist';
import CasinoIcon from '@mui/icons-material/Casino';
import { useNavigate } from "react-router-dom";
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';

export const Header = () => {

    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const goTo = (path) => {
        setTimeout(() => {
            navigate(path);
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

                        <li onClick={() => goTo('/phasmophobia-filter')}>
                            <span>Phasmophobia</span> <img id="phasmophobia-icon" src="./icons/phasmophobia-icon.png"></img>
                        </li>

                        <li onClick={() => goTo('/knowledge-race')}>
                            <span>Knowledge Race</span> <TimeToLeaveIcon />
                        </li>

                        <li onClick={() => goTo('/cow-mind')}>
                            <span>Mente Vacuna</span> <img src="./icons/cow.png" alt="cow" width={24} height={24} />
                        </li>
                    </ul>
                </div>
                <div className={`overlay ${isOpen ? 'active' : ''}`} onClick={toggleMenu}></div>
            </div>
        </>
    )
}
