import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField } from '@mui/material';
import { useModal } from '../../../context/modal';
import { useState } from 'react';

const Modal = () => {
    const { modal, closeModal } = useModal();
    const [input, setInput] = useState<string>('');
    const closeThis = () => {
        closeModal();
        setInput('');
    }

    return (
        <Dialog open={modal.open} onClose={closeThis}>
            <DialogTitle>Input required</DialogTitle>
            <DialogContent>
                <DialogContentText>{modal.text}</DialogContentText>
                <TextField
                    required
                    value={input}
                    onChange={(evt: any) => setInput(evt.target.value)}
                    label="Please input:"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={closeThis}>Cancel</Button>
                {modal.actions.map((action, index) => (
                    <Button key={index} onClick={() => {
                        action.onClick(input);
                        closeThis();
                    }}>
                        {action.text}
                    </Button>
                ))}
            </DialogActions>
        </Dialog>
    );
};

export default Modal;