import { useEffect } from 'react';
import './resident-rooms.scss';
import { residentRooms } from '../../../../../data/resident-evil-data';
export const ResidentRooms = ({ gameState, setGameValue }) => {

    const pickRoom = (remainingRooms, floor = '???') => {
        const randomIndex = Math.floor(Math.random() * remainingRooms.length);
        let room = remainingRooms.splice(randomIndex, 1)[0];
        return `${floor} - ${room}`;
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

        //objectives
        const obj1 = pickRoom(remainingRooms.upper, '1F');
        const obj2 = pickRoom(remainingRooms.ground, 'PB');
        const obj3 = pickRoom(remainingRooms.basement, 'S');

        const weapon1 = pickRoom(remainingRooms.upper, '1F');
        const weapon2 = pickRoom(remainingRooms.ground, 'PB');
        const weapon3 = pickRoom(remainingRooms.basement, 'S');

        const extraWeaponsSpans = gameState.playersNum;
        const lstExtraWeapons = []
        for (let i = 0; i < extraWeaponsSpans; i++) {
            lstExtraWeapons.push(pickRoom(remainingRooms.sharedRooms))
        }

        let lstRoomsWithItems = [
            {
                name: obj1,
                type: 'objetivo',
                checked: false
            },
            {
                name: obj2,
                type: 'objetivo',
                checked: false
            },
            {
                name: obj3,
                type: 'objetivo',
                checked: false
            },
            {
                name: weapon1,
                type: 'arma',
                checked: false
            },
            {
                name: weapon2,
                type: 'arma',
                checked: false
            },
            {
                name: weapon3,
                type: 'arma',
                checked: false
            },
            ...lstExtraWeapons.map(item => {
                return {
                    name: item,
                    type: 'arma',
                    checked: false
                }
            })

        ]

        lstRoomsWithItems = lstRoomsWithItems.sort((a, b) => {
            if (a.name.includes('???')) {
                return 1;
            } else {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
            }

            return 0;
        });
        gameState.lstRoomsWithItems = lstRoomsWithItems;
        setGameValue('lstRoomsWithItems', lstRoomsWithItems);
    }

    const handleSetItemAsTaken = (roomName, value) => {
        const index = gameState.lstRoomsWithItems.findIndex(room => room.name == roomName);
        if (index != -1) {
            gameState.lstRoomsWithItems[index].checked = value;
            setGameValue('lstRoomsWithItems', gameState.lstRoomsWithItems);
        }
    }

    useEffect(() => {
        if (!gameState.lstRoomsWithItems.length) {
            fillWeaponsAndObjectives();
        }
    }, [gameState.lstRoomsWithItems]);


    return (
        <div className="resident-rooms__container">
            <div className="resident-rooms__fields-container">
                <div className="resident-rooms__title">
                    Ubicaciones
                </div>
                {
                    gameState.lstRoomsWithItems.map(room =>
                        <div key={room.name} className="resident-rooms__field-container">
                            <div className="resident-rooms__item-label" >
                                <span className={`resident-rooms__item-label--${room.type == 'objetivo' ? 'objective' : 'weapon'}`}>
                                    {room.type}
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
