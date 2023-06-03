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

enum PropType {
    STRING = 'string',
    NUMBER = 'number'
}

type PropInstance = {
    name: string,
    type: PropType,
    def: any,
}

type SignalContainer = {
    name: string;
    id: string;
    code: string;
    props: Array<PropInstance>;
}

const randomRangePerSeconds: SignalContainer = {
    name: 'Random range per seconds',
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

class SignalInstance<TProps, TSeedType> {
    _fn: (onSignal: (seed: TSeedType) => void, props: TProps) => () => void;
    start: (props: TProps) => void;
    end: () => void;
    constructor(container: SignalContainer, onSignal: (seed: TSeedType) => void, onError: (msg: string) => void){
        try {
            this._fn = new Function(wrapCode(container.code)).bind({_onError: onError})();
        } catch(e: any) {
            this._fn = () => () => {};
            onError(e.message)
        }
        this.start = (props) => {
            try {
                this.end = this._fn(onSignal, props);
            } catch(e: any) {
                onError(e.message)
            }
        }
        this.end = () => {}
    }
}

type DigitsPerSecondsProps = {
    min: number,
    max: number,
    seconds: number,
}

export const attemptTheImpossible = () => {
    const onSignal = (seed: any) => {
        console.log('received seed', seed)
    }
    const onError = (message: string) => {
        console.warn('error', message);
    }
    const rangeInstance = new SignalInstance<DigitsPerSecondsProps, string>(randomRangePerSeconds, onSignal, onError);
    rangeInstance.start({min: 0, max: 1000, seconds: 1});
}