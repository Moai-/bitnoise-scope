import { Reducer, combineReducers } from 'redux';
import { ReduxState } from './types';
import editorReducer from './editor/reducer';
import mandalasReducer from './mandalas/reducer';


export const rootReducer: Reducer<ReduxState> = combineReducers({
    editor: editorReducer,
    mandalas: mandalasReducer,
})