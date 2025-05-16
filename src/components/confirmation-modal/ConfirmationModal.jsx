import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

export default function ConfirmationModal({ description, acceptCallback, closeCallback, showAlert, children, showCancel = true }) {
    const [open, setOpen] = React.useState(showAlert);

    const handleClose = () => {
        setOpen(false);
        closeCallback();
    };

    React.useEffect(() => {
        setOpen(showAlert);
    }, [showAlert])

    return (
        <>
            {children}
            <Dialog
                open={showAlert}
                onClose={handleClose}
            >
                <DialogContent id="confirmation-modal">
                    <DialogContentText>
                        {description}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {
                        showCancel &&
                        <Button onClick={handleClose}>Cancelar</Button>
                    }
                    <Button onClick={acceptCallback} autoFocus>
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}