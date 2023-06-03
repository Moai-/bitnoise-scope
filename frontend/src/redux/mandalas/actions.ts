import { createAction } from '@reduxjs/toolkit';
import { Mandala } from '../types';

export const setMyMandalas = createAction<Array<Mandala>>('mandalas/setMine');
export const setExampleMandalas = createAction<Array<Mandala>>('mandalas/setExample');

