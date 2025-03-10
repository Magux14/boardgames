import React, { useEffect, useState } from 'react'
import { phasmophobiaEquipment, phasmophobiaGhostList, phasmophobiaTarotCards } from '../../../data/phasmophobia-data';
import './PhasmophobiaFilterPage.scss';
import { Header } from '../../components/header/Header'
import { useNavigate } from 'react-router-dom';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
export const PhasmophobiaFilterPage = () => {

    const [filters, setFilters] = useState(() => {

        const equipmentFilters = [
            ...phasmophobiaEquipment
        ]
        equipmentFilters.forEach(item => {
            item.status = 'unselected'
        });

        return equipmentFilters;
    });

    const [ghostListFiltered, setGhostListFiltered] = useState(phasmophobiaGhostList);
    const [cordura, setCordura] = useState(15);
    const [folderSelected, setFolderSelected] = useState('tests');
    const [selectedGhost, setSelectedGhost] = useState(null);
    const navigation = useNavigate();

    const handleCheckbox = (equipmentIndex) => {
        switch (filters[equipmentIndex].status) {
            case 'unselected': filters[equipmentIndex].status = 'selected'; break;
            case 'selected': filters[equipmentIndex].status = 'discarded'; break;
            case 'discarded': filters[equipmentIndex].status = 'unselected'; break;
        }
        setFilters([
            ...filters
        ]);
    }

    const filterList = () => {
        for (let ghost of ghostListFiltered) {
            ghost.match = true;
            for (let filter of filters) {
                if (filter.status == 'selected' && !ghost[filter.property]) {
                    ghost.match = false;
                } else if (filter.status == 'discarded' && ghost[filter.property] == true) {
                    ghost.match = false;
                }
            }
        }
        setGhostListFiltered([...ghostListFiltered]);
    }

    const handleSelected = (selectedIndex) => {
        for (let i = 0; i < ghostListFiltered.length; i++) {
            ghostListFiltered[i].selected = false
            if (i == selectedIndex) {
                ghostListFiltered[i].selected = true;
                setSelectedGhost(ghostListFiltered[i])
            }
        }
        setGhostListFiltered([...ghostListFiltered]);
    }

    const handleGoToNewGame = () => {
        navigation('/phasmophobia-game');
    }

    useEffect(() => {
        filterList();
    }, [filters]);


    return (
        <>
            <Header />
            <div id="folder-container">
                <div className="folder-options-container">
                    <div className="empty">

                    </div>
                    <div className={`folder-option ${folderSelected == 'deseos' ? 'folder-selected' : ''} ${cordura == 0 ? 'dead' : ''}`} onClick={(() => setFolderSelected('deseos'))}>
                        Deseos
                    </div>
                    <div className={`folder-option ${folderSelected == 'tarot' ? 'folder-selected' : ''} ${cordura == 0 ? 'dead' : ''}`} onClick={(() => setFolderSelected('tarot'))}>
                        Tarot
                    </div>
                    <div className={`folder-option ${folderSelected == 'ghosts' ? 'folder-selected' : ''} ${cordura == 0 ? 'dead' : ''}`} onClick={(() => setFolderSelected('ghosts'))}>
                        Fantasmas
                    </div>
                    <div className={`folder-option ${folderSelected == 'tests' ? 'folder-selected' : ''}  ${cordura == 0 ? 'dead' : ''}`} onClick={(() => setFolderSelected('tests'))}>
                        Pruebas
                    </div>
                </div>
                <div id="notebook-container" className={`${cordura == 0 ? 'dead' : ''}`}>
                    {
                        folderSelected == 'tests' &&
                        <div id="test-container">
                            <div id="cordura-container">
                                <label className="cordura-title">Cordura</label>
                                <div className='controllers'>
                                    <button onClick={(() => cordura > 0 ? setCordura(cordura - 1) : null)}>-</button>
                                    <label className="cordura-amount">{cordura > 0 ? cordura : 'MUERTO'}</label>
                                    <button onClick={(() => cordura < 99 ? setCordura(cordura + 1) : null)}>+</button>
                                </div>
                            </div>

                            <div id="test-selection-container">
                                <label>Pruebas</label>
                                {
                                    filters.map(((equipment, index) =>
                                        <div key={equipment.name} className={`test-item ${equipment.status == 'discarded' ? 'discarded' : ''}`} onClick={() => handleCheckbox(index)}>
                                            {
                                                equipment.status == 'unselected' || equipment.status == 'discarded' ?
                                                    <CheckBoxOutlineBlankIcon />
                                                    : <CheckBoxIcon />
                                            }
                                            <label className='equipment-name'>{equipment.name}</label>
                                        </div>
                                    ))
                                }
                            </div>

                            <div className="filtered-container">

                                <label>Con las pruebas halladas, creemos que el fantasma es:</label>
                                {
                                    ghostListFiltered.map(((ghost, index) =>
                                        <div
                                            key={ghost.name}
                                            className={`ghost-item ${!ghost.match ? 'no-match' : ''}`}
                                            onClick={(() => handleSelected(index))}
                                        >
                                            <label className={`${ghost.selected ? 'selected' : ''}`}>{ghost.name}</label>
                                        </div>
                                    ))
                                }
                            </div>
                            <br />

                            {
                                !filters.find(item => item.status != 'selected') &&
                                <div id="new-game-container">
                                    <div id="button-footer-container" onClick={(() => handleGoToNewGame())}>
                                        <button>New Game</button>
                                    </div>
                                </div>
                            }
                        </div>

                    }

                    {
                        folderSelected == 'ghosts' &&
                        <div className="manual-ghost-container">
                            <div className="filtered-container">
                                {
                                    ghostListFiltered.map(((ghost, index) =>
                                        <div
                                            key={ghost.name}
                                            className={`ghost-item ${!ghost.match ? 'no-match' : ''}`}
                                            onClick={(() => handleSelected(index))}
                                        >
                                            <label className={`${ghost.selected ? 'selected' : ''}`}>{ghost.name}</label>
                                        </div>
                                    ))
                                }
                            </div>

                            <div className='equipment-ghost-info-container'>
                                {
                                    phasmophobiaEquipment.map((equipment) => {
                                        if (selectedGhost && selectedGhost[equipment.property] == true) {
                                            return <div>
                                                - {equipment.name}
                                            </div>
                                        }
                                    })
                                }
                            </div>
                        </div>

                    }

                    {
                        folderSelected == 'tarot' &&
                        <div className="tarot tarot__container">
                            <div className="tarot__title">
                                Cartas del tarot:
                            </div>
                            {
                                phasmophobiaTarotCards.map((item) =>
                                    <div key={item.name} className="tarot__item-container">
                                        <div className="tarot__item-description">
                                            <span>{item.description}</span>
                                            <span className="tarot__item-description-probability">Probabilidad: {item.probability}%</span>
                                        </div>
                                        <div className="tarot__item-img-container">
                                            <img className="" src={`./img/phasmophobia/tarot/${item.img}`} alt="tarot card" />
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    }

                    {
                        folderSelected == 'deseos' &&
                        <div style={{ padding: 20 }}>

                            Con este objeto podrás pedir 1 deseo de las siguientes opciones:
                            <br />
                            <br />
                            1.
                            Revivir a un compañero muerto, pero tirarás una moneda, si sale cara
                            no pasa nada, pero si sale cruz tu morirás…
                            <br />
                            <br />
                            2.                    Recuperas tu cordura al 100%, pero por el resto de la partida solo
                            tendrás una acción por turno.
                            <br />
                            <br />
                            3.                    Teletransportarte a otra habitación de la casa, pero ese cuarto
                            quedará cerrado hasta que alguien te abra la puerta (si eres el último
                            jugador con vida NO puedes pedir este deseo).
                        </div>
                    }

                </div >
            </div >
        </>
    )
}
