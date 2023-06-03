import { TextField, Button, Box, Grid } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setCurrentLayer, setShowSignalSelector } from '../../redux/editor/actions';
import { useEditorSelector } from '../../redux/selectors';
import SignalSelector from '../Modals/SignalSelector';
import { useState } from 'react';

const LayerDetails = () => {
    const { currentLayer } = useEditorSelector();

    const dispatch = useDispatch();

    const open = () => {
        dispatch(setShowSignalSelector(true));
    }

    const handleValueChange = (code: string) => {
        if (currentLayer) {
            dispatch(setCurrentLayer({
                ...currentLayer,
                code,
            }))
        }
    }

    if (!currentLayer) {
        return null;
    }
    return (
        <>
            <Box sx={{ width: '100%', marginBottom: '10px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField value={currentLayer.name} fullWidth label="Layer Name" variant="outlined" />
                    </Grid>
                    <Grid item container xs={12} alignItems="center" spacing={2}>
                        <Grid item xs>
                            <TextField fullWidth label="Signal" variant="outlined" value="Signal Value" InputProps={{ readOnly: true }} />
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" onClick={open}>Edit</Button>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} container justifyContent="space-between">
                        <Button variant="outlined" color="error">Delete</Button>
                        <Button variant="outlined">Move Up</Button>
                        <Button variant="outlined">Move Down</Button>
                    </Grid>
                </Grid>
            </Box>
            <SignalSelector />
        </>
    );
};

export default LayerDetails;