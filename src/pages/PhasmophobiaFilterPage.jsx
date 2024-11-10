import React, { useEffect, useState } from 'react'
import { phasmophobiaEquipmentName, phasmophobiaEquipmentTests, phasmophobiaGhostList } from '../../data/phasmophobia-data';
import './PhasmophobiaFilterPage.css';
import { Header } from './../components/header/Header'
import { useNavigate } from 'react-router-dom';

export const PhasmophobiaFilterPage = () => {

    const [filters, setFilters] = useState(phasmophobiaEquipmentTests);
    const [ghostListFiltered, setGhostListFiltered] = useState(phasmophobiaGhostList);
    const navigation = useNavigate();

    const handleChenbox = (property, value) => {
        setFilters({
            ...filters,
            [property]: value
        });
    }

    const filterList = () => {
        const lstConditionKeys = Object.keys(filters);
        for (let ghost of ghostListFiltered) {
            ghost.match = true;
            for (let key of lstConditionKeys) {
                if (filters[key] == true) {
                    if (!ghost[key]) {
                        ghost.match = false;
                    }
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
                            phasmophobiaEquipmentName.map((equipment =>
                                <div key={equipment.name} className="test-item">
                                    <input type="checkbox" value={filters[equipment.property]}
                                        onChange={(ev) => handleChenbox(equipment.property, ev.target.checked)
                                        }></input>
                                    <label>{equipment.name}</label>
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
                    filters.dots &&
                        filters.emf5 &&
                        filters.freezing &&
                        filters.ghostWriting &&
                        filters.orbs &&
                        filters.spiritBox &&
                        filters.ultraviolet || true ?
                        <div id="new-game-container">
                            <div id="button-footer-container" onClick={(() => handleGoToNewGame())}>
                                <button>New Game</button>
                            </div>
                        </div>
                        :
                        null
                }

            </div >
        </>
    )
}
