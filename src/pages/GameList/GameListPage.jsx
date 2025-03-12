import React, { useEffect, useState } from 'react';
import './game-list-page.scss';
import PersonIcon from '@mui/icons-material/Person';
import TranslateIcon from '@mui/icons-material/Translate';
import PsychologyIcon from '@mui/icons-material/Psychology';
import { lstGames } from '../../../data/game-data';
import { Header } from '../../components/header/Header'
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

export const GameListPage = () => {

    const [lstFilteredItems, setlstFilteredItems] = useState(lstGames.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1));

    const [filters, setFilters] = useState({
        searchTerm: '',
        selectedPlayers: -1,
        hardSearch: false
    });

    const handleSearchWordChange = (event) => {
        setFilters({
            ...filters,
            searchTerm: event.target.value.toLowerCase()
        });
    };

    const handlePlayersChanged = (event) => {
        setFilters({
            ...filters,
            selectedPlayers: Number(event.target.value)
        });
    };

    const handleHardSearch = (active) => {
        setFilters({
            ...filters,
            hardSearch: active
        });
    };

    const applyFilters = () => {
        let lstFiltered = [...lstGames.sort((a, b) => a.name > b.name ? 1 : 0)];
        if (filters.searchTerm) {
            lstFiltered = lstFiltered.filter(item => item.name.toLowerCase().includes(filters.searchTerm));
        }

        if (filters.hardSearch) {
            lstFiltered = lstFiltered.filter(item => item.maxPlayers == filters.selectedPlayers);
        } else {
            if (filters.selectedPlayers != -1) {
                if (filters.selectedPlayers >= 10) {
                    lstFiltered = lstFiltered.filter(item => item.maxPlayers >= filters.selectedPlayers);

                } else {
                    lstFiltered = lstFiltered.filter(item => filters.selectedPlayers >= item.minPlayers && filters.selectedPlayers <= item.maxPlayers);
                }
            }
        }

        setlstFilteredItems(lstFiltered);
    }

    useEffect(() => {
        applyFilters();
    }, [filters])

    return (
        <>
            <Header />
            <div className="game-list-page game-list-page__filter-container">
                <div className="game-list-page__input-container">

                    <div className="game-list-page__select">
                        <label>
                            <SearchIcon />
                        </label>
                        <input
                            type="text"
                            placeholder="Buscar..."
                            value={filters.searchTerm}
                            onChange={handleSearchWordChange}
                            className="game-list-page__select"
                        />
                    </div>

                    <div className="game-list-page__select">
                        <label>
                            <PersonIcon />
                        </label>
                        <select name="Máximo de jugadores" value={filters.selectedPlayers} onChange={handlePlayersChanged}>
                            <option value="-1">-</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10+</option>
                        </select>
                    </div>
                    <div className="game-list-page__select">
                        <label className="game-list-page__checkbox-label">
                            H
                        </label>
                        <input className="game-list-page__checkbox" type="checkbox" onChange={(ev) => handleHardSearch(ev.target.checked)}></input>
                    </div>
                    <div className="game-list-page__select">
                        <label>
                            <FilterAltIcon /> {lstFilteredItems.length}
                        </label>
                    </div>
                </div>
            </div>
            <div className="game-list-page__game-list-container">

                <div className="game-list-page__list-container">

                    {lstFilteredItems.map(item =>
                        <div key={item.name} className="game-list-page__game">
                            {
                                item.new &&
                                <span className="game-list-page__new-game">
                                    NUEVO
                                </span>
                            }
                            <div className="game-list-page__image-container">
                                <img src={`./img/games/${item.img}`}
                                    alt={item.name}
                                    className='image'
                                    onError={(e) => {
                                        e.target.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAO0AAADVCAMAAACMuod9AAAAVFBMVEXu7u5mZmbx8fFbW1vAwMDIyMj29vaFhYXz8/PT09Ojo6NZWVmxsbGBgYFjY2NgYGDn5+fY2Nh3d3fQ0NCdnZ1sbGzh4eF7e3tSUlJra2uOjo7d3d3UXWnYAAACyElEQVR4nO3b63aaQBSGYR2sDrEBD2Da5v7vs4AgCKNmhUnT/fq9P0NEnszm4FpmsXii3HcfwD9NWm7ScpOWm7TcpOUmLTdpuUnLTVpu0nKTlpu03KTlJi03ablJy01abtJyk5abtNyk5SYtN2m5SctNWm7ScpOWm7TcpOUmLTdpuUnLTVpu0nKTlpu03KTlJi03abl9gdZFK/6hxd/j/kesdtGPLfYOF77YJnH6lcY+ui/QvuSHTYzKxIR2+3Mdo9etEa2PsB8n7dx9Rt6ftJ9L2tn7jLw/ae++/80HRJ7Wrd9XqzT82zitO22SPE8OQS9Ou/udL6uyPMSiadd/GmzFLQMvgGndqcUul8lxehw07fGizQOvkHZu3zrJSafd4ibZ7cbvBb5K+WN5HP/4VELvQH6fZdn4KaJ+ukjyLe7pwqd5Vl2MJlzfPDkGD8Ku1qXLrB7Z5WSYgZ8K6jE+X44mw3w7q1qfttgH3OuLtlGtP49xx50Mc3ckRXnFtan1+wG2PnfDq+uLJD8MuSa1l3O2X9196HZcVLfebMi1qHXpCFt7p6tbrWyzZcA1qB2N8a1hXhftI/OAa0/rxmMcHmZfXD4f9Fxz2sk523OHkAG2et7quNa0LjTG02G+wvara0wbPGd7bjfM/iW53pS/NVxb2jsrO1zd5tYz2tSsrintA2zHHY1xu7qHnS3t3THuhzmIPQ+zt6N9uLItd3zODrh2tOuPYGvU5Jy9bDksNla07x/D3v1DvL7Z0CZFORtbP4HY+AZRHsFaZ0QbByvtzKSdl7TSQrRP9f1kl65iZeC758/1fwX/c9Jyk5abtNyk5SYtN2m5SctNWm7ScpOWm7TcpOUmLTdpuUnLTVpu0nKTlpu03KTlJi03ablJy01abtJyk5abtNyk5SYtN2m5SctNWm7ScpOWm7TcpOUmLTdpuUnL7cm0fwHDUS1mjADeeAAAAABJRU5ErkJggg=='
                                    }}
                                />
                            </div>
                            <div className="game-list-page__main-info-container">
                                <h3 className="game-list-page__game-name">{item.name}</h3>
                                <div className="game-list-page__desc-container">
                                    {item.desc ? <p className="game-list-page__desc">{item.desc}</p> : null}
                                </div>
                            </div>

                            <div className='game-list-page__right game-list-page__tags-container'>
                                <span className='game-list-page__tags'><PersonIcon /> {`${item.minPlayers == item.maxPlayers ? ` ${item.minPlayers} ` : `${item.minPlayers} - ${item.maxPlayers}`}`}</span>
                                <span className='game-list-page__tags'><PsychologyIcon /> {item.difficulty}</span>

                                {item.lang ?
                                    <span className='game-list-page__tags'><TranslateIcon /> {item.lang}</span> : null
                                }
                            </div>

                        </div>)}
                </div>
            </div>
        </>
    )
}
