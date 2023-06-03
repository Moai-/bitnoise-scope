import { PropType, SignalContainer } from '../redux/types';

type SignalSource<T, P> = (castSignal: (signal: T) => void, props: P) => void;

const wrapCode = (code: string) => `
"use strict";
const {_onError} = this;
try {
    ${code}
} catch(err) {
    _onError(err)
}
`;
export const randomRangePerSeconds: SignalContainer = {
    name: 'Random range per seconds',
    description: 'Generate a number within a given range every X seconds (can be less than 1)',
    id: 'random-range-per-seconds',
    code: '\
const randomRangePerSeconds = (castSignal, props) => {\n\
    const {min, max, seconds} = props;\n\
    const ms = seconds * 1000;\n\
    const timeout = setTimeout(() => {\n\
        const num = Math.random() * (max - min) + min;\n\
        castSignal(`${num}`);\n\
        randomRangePerSeconds(castSignal, props);\n\
    }, ms);\n\
    return () => {\n\
        clearTimeout(timeout);\n\
    }\n\
}\n\
return randomRangePerSeconds;\n\
    ',
    props: [
        {name: 'min', type: PropType.NUMBER, def: 0},
        {name: 'max', type: PropType.NUMBER, def: 0},
        {name: 'seconds', type: PropType.NUMBER, def: 0},
    ]
}



type DigitsPerSecondsProps = {
    min: number,
    max: number,
    seconds: number,
}

export default randomRangePerSeconds;