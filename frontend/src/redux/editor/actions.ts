import { createAction } from '@reduxjs/toolkit';
import { CodeLayer, Mandala } from '../types';

export const setMandala = createAction<Mandala>('editor/setMandala');
export const setCurrentLayer = createAction<CodeLayer|null>('editor/setCurrentLayer');
export const setShowSignalSelector = createAction<boolean>('editor/setShowSignalSelector');

