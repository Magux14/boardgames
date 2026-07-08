import { useEffect } from 'react';
import { residentRooms } from '../../../../../data/resident-evil-data';
import './resident-rooms.scss';

export const ResidentRooms = ({ gameState, setGameValue }) => {

    const pickRoom = (remainingRooms, floor = '???') => {
        const randomIndex = Math.floor(Math.random() * remainingRooms.length);
        let room = remainingRooms.splice(randomIndex, 1)[0];
        return `${room}`;
    }

    const fillWeaponsAndObjectives = () => {

        const remainingRooms = {
            upper: [...residentRooms.upper],
            ground: [...residentRooms.ground],
            basement: [...residentRooms.basement],
            sharedRooms: [
                ...residentRooms.sharedRooms.upperGroundBasement,
                ...residentRooms.sharedRooms.upperBasement,
                ...residentRooms.sharedRooms.groundBasement,
                ...residentRooms.sharedRooms.upperGround]
        }

        const sortByMultiple = (array, keys) => {
            return [...array].sort((a, b) => {
                for (const key of keys) {
                    const valueA = a[key] ?? "";
                    const valueB = b[key] ?? "";

                    const comparison = String(valueA).localeCompare(String(valueB), undefined, {
                        numeric: true,
                        sensitivity: "base",
                    });

                    if (comparison !== 0) {
                        return comparison;
                    }
                }

                return 0;
            });
        }

        //objectives
        let lstRoomsWithItems = [
            {
                name: pickRoom(remainingRooms.upper, '1F'),
                floor: '1F',
                type: 'objetivo',
                checked: false
            },
            {
                name: pickRoom(remainingRooms.upper, '1F'),
                floor: '1F',
                type: 'arma',
                checked: false
            },
            {
                name: pickRoom(remainingRooms.upper, '1F'),
                floor: '1F',
                type: 'arma',
                checked: false
            },
            {
                name: pickRoom(remainingRooms.upper, '1F'),
                floor: '1F',
                type: 'arma',
                checked: false
            },
            {
                name: pickRoom(remainingRooms.ground, 'PB'),
                floor: 'PB',
                type: 'objetivo',
                checked: false
            },
            {
                name: pickRoom(remainingRooms.ground, 'PB'),
                floor: 'PB',
                type: 'arma',
                checked: false
            },
            {
                name: pickRoom(remainingRooms.ground, 'PB'),
                floor: 'PB',
                type: 'arma',
                checked: false
            },
            {
                name: pickRoom(remainingRooms.ground, 'PB'),
                floor: 'PB',
                type: 'arma',
                checked: false
            },
            {
                name: pickRoom(remainingRooms.basement, 'basement'),
                floor: 'S',
                type: 'objetivo',
                checked: false
            },
            {
                name: pickRoom(remainingRooms.basement, 'basement'),
                floor: 'S',
                type: 'arma',
                checked: false
            },
            {
                name: pickRoom(remainingRooms.basement, 'basement'),
                floor: 'S',
                type: 'arma',
                checked: false
            },
            {
                name: pickRoom(remainingRooms.basement, 'basement'),
                floor: 'S',
                type: 'arma',
                checked: false
            },
        ]
        setGameValue('lstRoomsWithItems', [...sortByMultiple(lstRoomsWithItems, ['floor', 'name'])]);
    }

    const handleSetItemAsTaken = (roomName, value) => {
        const index = gameState.lstRoomsWithItems.findIndex(room => room.name == roomName);
        if (index != -1) {
            gameState.lstRoomsWithItems[index].checked = value;
            setGameValue('lstRoomsWithItems', gameState.lstRoomsWithItems);
        }
    }

    const handleActivateNemesis = (active) => {
        setGameValue('nemesisIsActive', active);
    }

    useEffect(() => {
        if (!gameState.lstRoomsWithItems.length) {
            fillWeaponsAndObjectives();
        }
    }, [gameState.lstRoomsWithItems]);

    useEffect(() => {
        console.log('gameState.lstRoomsWithItems');
        console.log(gameState.lstRoomsWithItems);
    }, []);


    return (
        <div className="resident-rooms__container">
            <div className="resident-rooms__fields-container">
                <div className="resident-rooms__title">
                    Mapa
                </div>
                {/* <div className="resident-rooms__field-container">
                    <div className="resident-rooms__item-label" >
                        <span>
                            Nemesis
                        </span>
                    </div>
                    <input type="checkbox" className="resident-rooms__players-input" checked={gameState.nemesisIsActive} onChange={($ev) => handleActivateNemesis($ev.target.checked)}></input>
                </div>
                <div className="resident-rooms__title">
                    Ubicaciones
                </div> */}
                {
                    gameState.lstRoomsWithItems.map(room =>
                        <div key={room.name} className={`resident-rooms__field-container resident-rooms__floor--${room.floor}`}>
                            <div className="resident-rooms__item-label" >
                                <span className={`resident-rooms__item-label--${room.type == 'objetivo' ? 'objective' : 'weapon'} `}>
                                    {room.floor} - {room.type}
                                </span>
                                <span>
                                    {room.name}
                                </span>
                            </div>
                            <input type="checkbox" className="resident-rooms__players-input" checked={room.checked} onChange={($ev) => handleSetItemAsTaken(room.name, $ev.target.checked)}></input>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
