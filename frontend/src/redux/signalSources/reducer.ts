import { createReducer } from '@reduxjs/toolkit';
import { SignalSourcesState } from '../types';
import { setExampleSignalSources, setMySignalSources } from './actions';

const initialState: SignalSourcesState = {
    mine: [],
    examples: [],
}

const signalSourcesReducer = createReducer(initialState, (builder) => {
    builder.addCase(setMySignalSources, (state, action) => ({
        ...state,
        mine: action.payload,
    }))
    builder.addCase(setExampleSignalSources, (state, action) => ({
        ...state,
        examples: action.payload,
    }))
})

export default signalSourcesReducer;