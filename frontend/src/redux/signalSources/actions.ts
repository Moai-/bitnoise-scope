import { createAction } from '@reduxjs/toolkit';
import { SignalContainer } from '../types';

export const setMySignalSources = createAction<Array<SignalContainer>>('mandalas/setMine');
export const setExampleSignalSources = createAction<Array<SignalContainer>>('mandalas/setExample');

