import { createReducer } from '@reduxjs/toolkit';
import { EditorState } from '../types';
import { setMandala } from './actions';

const initialState: EditorState = {
    mandala: null,
    layers: null,
}

const editorReducer = createReducer(initialState, (builder) => {
    builder.addCase(setMandala, (state, action) => ({
        ...state,
        mandala: action.payload,
    }))
})

export default editorReducer;