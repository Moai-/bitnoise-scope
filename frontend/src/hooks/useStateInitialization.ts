import { useEffect } from 'react';
import useLocalStorage from './useLocalStorage';
import { ReduxState } from '../redux/types';
import mandalas from '../content/mandalas';
import randomRangePerSeconds from '../content/signalGenerators';

const initialState: ReduxState = {
    editor: {
        mandala: null,
        layers: [],
        currentLayer: null,
        showSignalSelector: false,
    },
    mandalas: {
        mine: [],
        examples: mandalas
    },
    signalSources: {
        mine: [],
        examples: [randomRangePerSeconds]
    }
}

const useStateInitialization = () => {
    useLocalStorage<ReduxState>('Arptat', initialState);
    useEffect(() => {

    }, [])
}

export default useStateInitialization;