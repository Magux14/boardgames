import React, { useEffect, useState } from 'react'
import { phasmophobiaEquipment, phasmophobiaGhostList } from '../../data/phasmophobia-data';
import './PhasmophobiaFilterPage.css';
import { Header } from './../components/header/Header'
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
    const [cordura, setCordura] = useState(10);
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
                    <div className={`folder-option ${folderSelected == 'ghosts' ? 'folder-selected' : ''}`} onClick={(() => setFolderSelected('ghosts'))}>
                        Fantasmas
                    </div>
                    <div className={`folder-option ${folderSelected == 'tests' ? 'folder-selected' : ''}`} onClick={(() => setFolderSelected('tests'))}>
                        Pruebas
                    </div>
                </div>
                <div id="notebook-container">
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

                    <div className="manual-ghost-container">
                        {
                            folderSelected == 'ghosts' &&
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
                        }

                        <div className='equipment-ghost-info-container'>
                            {
                                phasmophobiaEquipment.map((equipment) => {
                                    if (selectedGhost && selectedGhost[equipment.property] == true) {
                                        return <div>
                                            {equipment.name}
                                        </div>
                                    }
                                })
                            }
                        </div>
                    </div>

                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />

                </div >
            </div >
        </>
    )
}
