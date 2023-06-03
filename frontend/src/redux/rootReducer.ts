import { Reducer, combineReducers } from 'redux';
import { ReduxState } from './types';
import editorReducer from './editor/reducer';
import mandalasReducer from './mandalas/reducer';
import signalSourcesReducer from './signalSources/reducer';


export const rootReducer: Reducer<ReduxState> = combineReducers({
    editor: editorReducer,
    mandalas: mandalasReducer,
    signalSources: signalSourcesReducer,
})