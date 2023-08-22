import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

const ConfirmationDialog = ({ title, message, open, onClose, onConfirm }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Suppression de {title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Voulez-vous vraiment supprimer {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Annuler
                </Button>
                <Button onClick={onConfirm} color="primary">
                    Confirmer
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationDialog;
