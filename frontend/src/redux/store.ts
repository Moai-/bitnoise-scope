import { Store } from 'redux';
import { ReduxState } from './types';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
import { initialState as editor } from './editor/reducer';
import { initialState as mandalas } from './mandalas/reducer';
import { initialState as signalSources } from './signalSources/reducer';
import exampleMandalas from '../content/mandalas';
import { randomRangePerSeconds } from '../content/signalGenerators';
import { throttle } from 'lodash';

const initialState: ReduxState = {
    editor,
    mandalas,
    signalSources,
};

export const saveState = (state: ReduxState) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('Arptat', serializedState);
    } catch {
        // ignore write errors
    }
};

const loadState = () => {
    const serializedState = localStorage.getItem('Arptat');
    if (!serializedState) {
        const defaultState = {
            ...initialState,
            signalSources: {
                ...initialState.signalSources,
                examples: [randomRangePerSeconds]
            },
            mandalas: {
                ...initialState.mandalas,
                examples: exampleMandalas
            }
        }
        localStorage.setItem('Arptat', JSON.stringify(defaultState))
        return defaultState;
    }
    return JSON.parse(serializedState) as ReduxState;
};

const preloadedState = loadState();

const reduxStore: Store<ReduxState> = configureStore({
    reducer: rootReducer,
    preloadedState
});

reduxStore.subscribe(throttle(() => {
    saveState(reduxStore.getState());
}, 1000));

export default reduxStore;