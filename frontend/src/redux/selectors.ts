import { useSelector } from 'react-redux';
import { ReduxState } from './types';

const editorSelector = (state: ReduxState) => state.editor;
const mandalasSelector = (state: ReduxState) => state.mandalas;

export const useEditorSelector = () => useSelector(editorSelector);
export const useMandalasSelector = () => useSelector(mandalasSelector);