import { createReducer } from '@reduxjs/toolkit';
import { EditorState } from '../types';
import { setCurrentLayer, setMandala, setShowSignalSelector } from './actions';

export const initialState: EditorState = {
    mandala: null,
    layers: [],
    currentLayer: null,
    showSignalSelector: false,
}

const editorReducer = createReducer(initialState, (builder) => {
    builder.addCase(setMandala, (state, action) => ({
        ...state,
        mandala: action.payload,
    }))
    builder.addCase(setCurrentLayer, (state, action) => ({
        ...state,
        currentLayer: action.payload,
    }))
    builder.addCase(setShowSignalSelector, (state, action) => ({
        ...state,
        showSignalSelector: action.payload,
    }))
})

export default editorReducer;