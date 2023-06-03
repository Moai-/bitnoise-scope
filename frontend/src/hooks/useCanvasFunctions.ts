import React, { useEffect, useState, useMemo } from 'react'
import useWebsocket from './useWebsocket';
import { useCanvasContext } from '../context/canvas';
import { useEditorSelector } from '../redux/selectors';

const SETUP = 'SETUP'

const wrapCode = (code: string) => `
"use strict";
const {context, seed, _onError} = this;
const int = (n) => parseInt(n, 10);
const hex = (s) => s.toString(16);
try {
    ${code}
} catch(err) {
    _onError(err)
}
`;

const useCanvasFunctions = (canvasRef?: React.RefObject<HTMLCanvasElement>) => {
    const [didPlay, setDidPlay] = useState(false);
    const { isPaused, setIsPaused, setClear, setError } = useCanvasContext();
    const { onMessage } = useWebsocket();
    const { layers } = useEditorSelector()
    const _onError = (e: Error) => {
        setTimeout(() => {
            setIsPaused(true);
            setError(e.message);
        })
    }
    
    const layerFunctions = useMemo(() => layers && layers.map((layer) => {
        try {
            if (layer.name !== SETUP) {
                return Function(wrapCode(layer.code))
            }
            return () => {};
        } catch(e) {
            _onError(e as Error);
            return null;
        }
    }), [layers]);


    useEffect(() => {
        const canvas = canvasRef?.current

        if (didPlay && isPaused) {
            setDidPlay(false);
        }

        if( canvas ) {
            const context = canvas.getContext('2d')
            if (context) {
                setClear(() => () => {
                    context.clearRect(0, 0, canvas.width, canvas.height);
                })
                if (!isPaused) {
                    if (!didPlay) {
                        const setup = layers && layers.find((layer) => layer.name.toUpperCase().trim() === SETUP);
                        if (setup) {
                            new Function(wrapCode(setup.code)).bind({context, _onError})
                        }
                        setDidPlay(true)
                    }
                    onMessage((seed: string) => {
                        const scope = {
                            context,
                            seed,
                            _onError,
                        }
                        if (layerFunctions) {
                            layerFunctions.forEach(layerFn => {
                                layerFn && layerFn.bind(scope)()
                            })
                        }
                    })
                } else {
                    onMessage(() => {});
                }
            }

        }
    }, [canvasRef, layers, isPaused]);
}

export default useCanvasFunctions;