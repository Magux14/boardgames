import React from 'react'
import { phasmophobiaEquipmentName, phasmophobiaGhostList } from '../../data/phasmophobia-data';
import './PhasmophobiaFilterPage.css';
import { Header } from './../components/header/Header'

export const PhasmophobiaFilterPage = () => {
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
                                    <input type="checkbox"></input>
                                    <label>{equipment.name}</label>
                                </div>
                            ))
                        }
                    </div>

                    <div>

                        <label>Con las pruebas halladas, creemos que el fantasma es:</label>

                        {
                            phasmophobiaGhostList.map((ghost =>
                                <div key={ghost.name}> {ghost.name}</div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
