import { Modal } from 'antd'
import React from 'react'

export const ModalConfirm = ({ open, text, callbackConfirm, callbackClose }) => {
    return (
        <Modal
            open={open}
            style={{ top: '35%' }}
            maskClosable={false}
            onOk={callbackConfirm}
            onCancel={callbackClose}
            closeIcon={false}
        >
            {text}
        </Modal>
    )
}
