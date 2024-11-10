import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

export default function ConfirmationModal({ description, acceptCallback, closeCallback, showAlert, children }) {
    const [open, setOpen] = React.useState(showAlert);

    const handleClose = () => {
        setOpen(false);
        closeCallback();
    };

    const handleAccept = () => {
        callback();
        handleClose();
    }

    React.useEffect(() => {
        setOpen(showAlert);
    }, [showAlert])

    return (
        <React.Fragment>
            {children}
            <Dialog
                open={showAlert}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {description}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={acceptCallback} autoFocus>
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}