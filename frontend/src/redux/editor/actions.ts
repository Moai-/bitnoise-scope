import { createAction } from '@reduxjs/toolkit';
import { Mandala } from '../types';

export const setMandala = createAction<Mandala>('editor/setMandala');

