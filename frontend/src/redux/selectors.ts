import { useSelector } from 'react-redux';
import { ReduxState } from './types';

const editorSelector = (state: ReduxState) => state.editor;
const mandalasSelector = (state: ReduxState) => state.mandalas;
const signalSourcesSelector = (state: ReduxState) => state.signalSources;

export const useEditorSelector = () => useSelector(editorSelector);
export const useMandalasSelector = () => useSelector(mandalasSelector);
export const useSignalSourcesSelector = () => useSelector(signalSourcesSelector);