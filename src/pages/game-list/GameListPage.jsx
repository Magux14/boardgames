import React, { useEffect, useState } from 'react';
import './game-list-page.scss';
import PersonIcon from '@mui/icons-material/Person';
import TranslateIcon from '@mui/icons-material/Translate';
import PsychologyIcon from '@mui/icons-material/Psychology';
import { lstGames } from '../../../data/game-data';
import { Header } from '../../components/header/Header'
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Modal } from 'antd';
import { GameFiles } from './components/game-files/GameFiles';

const shortTime = 15;
const mediumTime = 40;

export const GameListPage = () => {

    const [filters, setFilters] = useState({
        searchTerm: '',
        selectedPlayers: -1,
        hardSearch: false
    });
    const [lstFilteredItems, setlstFilteredItems] = useState(lstGames);
    const [filterType, setFilterType] = useState('nameAsc');
    const [openFileModal, setOpenFileModal] = useState(false);

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

    const sortList = (type, lstSorted) => {
        switch (type) {
            case 'nameAsc':
                lstSorted = lstSorted.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);
                break;
            case 'nameDesc':
                lstSorted = lstSorted.sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1);
                break;
            case 'rankAsc':
                lstSorted = lstSorted.sort((a, b) => (a.rank ?? 0) > (b.rank ?? 0) ? 1 : -1);
                break;
            case 'rankDesc':
                lstSorted = lstSorted.sort((a, b) => (a.rank ?? 0) < (b.rank ?? 0) ? 1 : -1);
                break;
            case 'newAsc':
                lstSorted = lstSorted.sort((a, b) => !!a.new > !!b.new ? 1 : -1);
                break;
            case 'newDesc':
                lstSorted = lstSorted.sort((a, b) => !!a.new < !!b.new ? 1 : -1);
                break;
            case 'timeAsc':
                lstSorted = lstSorted.sort((a, b) => a.minutes < b.minutes ? 1 : -1);
                break;
            case 'timeDesc':
                lstSorted = lstSorted.sort((a, b) => a.minutes > b.minutes ? 1 : -1);
                break;
        }

        return lstSorted;
    }

    const getTypeOfTime = (minutes) => {
        if (minutes <= shortTime) {
            return 'short';
        } else if (minutes <= mediumTime) {
            return 'medium';
        } else {
            return 'long';
        }
    }

    const handleSort = (type, lstFilteredItems) => {
        const lstSorted = sortList(type, [...lstFilteredItems]);
        setlstFilteredItems([...lstSorted]);
        setFilterType(type);
    }

    const applyFilters = () => {
        let lstFiltered = [...lstGames];
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

        lstFiltered = sortList(filterType, lstFiltered);
        setlstFilteredItems(lstFiltered);
    }

    const handleOpenFileMoal = () => {
        setOpenFileModal(true);
    }

    useEffect(() => {
        applyFilters();
    }, [filters])

    return (
        <>
            <Header />

            <div className="game-list-page game-list-page__filter-container">
                <div className="game-list-page__inputs-container">

                    <div className="game-list-page__input-container">
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

                    <div className="game-list-page__input-container">
                        <label>
                            <SortIcon />
                        </label>
                        <select name="Máximo de jugadores" value={filterType} onChange={(ev) => handleSort(ev.target.value, lstFilteredItems)}>
                            <option value="nameAsc">Nombre ↓</option>
                            <option value="nameDesc">Nombre ↑</option>
                            <option value="rankDesc">Rank ↓</option>
                            <option value="rankAsc">Rank ↑</option>
                            <option value="newDesc">Nuevos ↓</option>
                            <option value="newAsc">Nuevos ↑</option>
                            <option value="timeAsc">Duración ↓</option>
                            <option value="timeDesc">Duración ↑</option>
                        </select>
                    </div>

                    <div className="game-list-page__select-container">
                        <label className="game-list-page__checkbox-label">
                            H
                        </label>
                        <input className="game-list-page__checkbox" type="checkbox" onChange={(ev) => handleHardSearch(ev.target.checked)}></input>
                    </div>

                    <div className="game-list-page__input-container">
                        <label>
                            <PersonIcon />
                        </label>
                        <select name="Ordenar" value={filters.selectedPlayers} onChange={handlePlayersChanged}>
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
                        <label>
                            Juegos: {lstFilteredItems.length}
                        </label>
                    </div>
                </div>
            </div>
            <div className="game-list-page__game-list-container">
                <div className="game-list-page__timer-info-container">
                    <div className="game-list-page__timer-container--short">
                        <AccessTimeIcon /> -{shortTime} min
                    </div>
                    <div className="game-list-page__timer-container--medium">
                        <AccessTimeIcon /> {shortTime} - {mediumTime} min
                    </div>
                    <div className="game-list-page__timer-container--long">
                        <AccessTimeIcon /> +{mediumTime} min
                    </div>
                </div>

                <div className="game-list-page__list-container">

                    {lstFilteredItems.map(item =>
                        <div key={item.name} className="game-list-page__game">
                            {
                                item.new &&
                                <span className="game-list-page__new-game">
                                    NUEVO
                                </span>
                            }
                            <div className={`game-list-page__timer-container game-list-page__timer-container--${getTypeOfTime(item.minutes)}`}>
                                <AccessTimeIcon />
                            </div>
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
                                {
                                    <span className='game-list-page__tags game-list-page__rank'>
                                        {
                                            item.rank
                                                ?
                                                Array.from({ length: 5 }, (_, i) => i + 1).map((i) =>
                                                    <img key={`start-${i}`} src={`./icons/${i <= item.rank ? 'star' : 'unfilled-star'}.png`}
                                                        width={18}
                                                        height={18}
                                                        alt="star"
                                                    />
                                                )
                                                :
                                                <span>
                                                    Unranked
                                                </span>
                                        }
                                    </span>
                                }
                                <span className='game-list-page__tags'><AccessTimeIcon /> {`${item.minutes}min`}</span>
                                <span className='game-list-page__tags'><PersonIcon /> {`${item.minPlayers == item.maxPlayers ? ` ${item.minPlayers} ` : `${item.minPlayers} - ${item.maxPlayers}`}`}</span>
                                <span className='game-list-page__tags'><PsychologyIcon /> {item.difficulty}</span>
                                {
                                    item.lang ?
                                        <span className='game-list-page__tags'><TranslateIcon /> {item.lang}</span> : null
                                }

                                {

                                    (item.files) &&
                                    <>
                                        <Modal
                                            open={openFileModal}
                                            width={'100vw'}
                                            height={'100vh'}
                                            footer={null}
                                            onCancel={() => setOpenFileModal(false)}
                                            maskClosable={false}
                                        >
                                            <GameFiles files={item.files} title={item.name} />
                                        </Modal>
                                        <div className="game-list-page__files-container">
                                            <button onClick={() => handleOpenFileMoal()}>Archivos <PictureAsPdfIcon /></button>
                                        </div>
                                    </>
                                }
                            </div>
                        </div>)}
                </div>
            </div>
        </>
    )
}
