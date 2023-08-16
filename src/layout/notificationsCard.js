import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Notification = ({ message }) => {
    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Snackbar
            open={open}
            autoHideDuration={5000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <MuiAlert
                onClose={handleClose}
                severity="info"
                variant="filled">
                {message}
            </MuiAlert>
        </Snackbar>
    );
};

export default Notification;
