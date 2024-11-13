import React, { useEffect, useState } from 'react'
import { phasmophobiaEquipment, phasmophobiaEquipmentTests, phasmophobiaGhostList } from '../../data/phasmophobia-data';
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
            <div id="notebook-container">
                <div id="test-container">

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

                    <div id="filtered-container">

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
                </div>

                {
                    !filters.find(item => item.status != 'selected') &&
                    <div id="new-game-container">
                        <div id="button-footer-container" onClick={(() => handleGoToNewGame())}>
                            <button>New Game</button>
                        </div>
                    </div>
                }

            </div >
        </>
    )
}
