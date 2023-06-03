import { FC, useEffect, useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    ListSubheader,
    Select,
    MenuItem,
    SelectChangeEvent,
} from '@mui/material';
import { useEditorSelector, useSignalSourcesSelector } from '../../../redux/selectors';
import { PropInstance, SignalId } from '../../../redux/types';
import { useDispatch } from 'react-redux';
import { setShowSignalSelector } from '../../../redux/editor/actions';

enum ViewStates {
    DROPDOWN,
    INPUT
}
type SignalSelectorState = {
    selectedId: SignalId,
    inputs: {
        [key: string]: string
    },
    view: ViewStates,
    props: Array<PropInstance>,
}


const SignalSelector: FC = () => {
    const [state, setState] = useState<SignalSelectorState>({
        selectedId: '',
        inputs: {},
        view: ViewStates.DROPDOWN,
        props: [],
    });

    const { currentLayer, showSignalSelector } = useEditorSelector();

    const dispatch = useDispatch();

    const close = () => {
        dispatch(setShowSignalSelector(false));
    }

    const { mine, examples } = useSignalSourcesSelector();

    const handleDropdownChange = (event: SelectChangeEvent<string>) => {
        setState({ ...state, selectedId: event.target.value, props: mine.concat(examples).find((item) => item.id === event.target.value)?.props || [] });
    };

    const handleInputChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, inputs: { ...state.inputs, [name]: event.target.value } });
    };

    const handleFinish = () => {

    };

    return (
        <Dialog open={showSignalSelector} onClose={close}>
            <DialogTitle>Select an item</DialogTitle>
            <DialogContent>
                {state.view === ViewStates.DROPDOWN ? (
                    <Select
                        value={state.selectedId}
                        onChange={handleDropdownChange}
                        renderValue={(selected) => {
                            return mine.concat(examples).find((item) => item.id === selected)?.name;
                        }}
                    >
                        {examples.length && (
                            <>
                                <ListSubheader>Mine</ListSubheader>
                                {mine.map((item) => (
                                    <MenuItem key={item.id} value={item.id}>
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </>
                        )}
                        {examples.length && (
                            <>
                                <ListSubheader>Examples</ListSubheader>
                                {examples.map((item) => (
                                    <MenuItem key={item.id} value={item.id}>
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </>
                        )}
                    </Select>
                ) : (
                    state.props.map((item) => (
                        <TextField
                            key={item.name}
                            label={item.name}
                            defaultValue={item.def}
                            onChange={handleInputChange(item.name)}
                        />
                    ))
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={close}>Cancel</Button>
                {state.view === ViewStates.DROPDOWN ? (
                    <Button onClick={() => setState({ ...state, view: ViewStates.INPUT })}>Select</Button>
                ) : (
                    <Button onClick={handleFinish}>Finish</Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default SignalSelector;