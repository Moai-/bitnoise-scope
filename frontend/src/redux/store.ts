import { Store } from 'redux';
import { ReduxState } from './types';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';

const reduxStore: Store<ReduxState> = configureStore({
    reducer: rootReducer,
});

export default reduxStore;