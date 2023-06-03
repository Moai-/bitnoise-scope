import { createReducer } from '@reduxjs/toolkit';
import { MandalaState } from '../types';
import { setExampleMandalas, setMyMandalas } from './actions';

const initialState: MandalaState = {
    mine: [],
    examples: [],
}

const mandalasReducer = createReducer(initialState, (builder) => {
    builder.addCase(setMyMandalas, (state, action) => ({
        ...state,
        mine: action.payload,
    }))
    builder.addCase(setExampleMandalas, (state, action) => ({
        ...state,
        examples: action.payload,
    }))
})

export default mandalasReducer;