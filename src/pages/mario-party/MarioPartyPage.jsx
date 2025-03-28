import React, { useState } from 'react';
import { Header } from '../../components/header/Header';
import { MarioPartyMainGame } from './components/main-game/MarioPartyMainGame';
import { MarioPartyGameList } from './components/game-list/MarioPartyGameList';
import { lstMarioPartyGames } from '../../../data/mario-party';
import { Modal } from 'antd';
import './mario-party.scss';

export const MarioPartyPage = ({ }) => {

    const [showGameList, setShowGameList] = useState(false);
    const [lstGames, setLstGames] = useState([...lstMarioPartyGames]);

    const handleShowGameList = () => {
        setShowGameList(true);
    }
    return (
        <>
            <Header />
            {
                showGameList &&
                <Modal
                    open={showGameList}
                    width={'100vw'}
                    height={'100vh'}
                    centered={true}
                    footer={null}
                    onCancel={() => setShowGameList(false)}
                    maskClosable={false}
                >
                    <MarioPartyGameList
                        lstGames={lstGames}
                        callbackUpdateGameList={setLstGames}
                    />
                </Modal>
            }
            <div className="mario-party mario-party__container">
                <MarioPartyMainGame callbackShowGameList={handleShowGameList} />
            </div>
        </>
    )
}
