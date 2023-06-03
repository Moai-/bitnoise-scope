import React, { HTMLProps, useRef } from 'react'
import useCanvasFunctions from '../../hooks/useCanvasFunctions';

const Player = (props: HTMLProps<HTMLCanvasElement>) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    useCanvasFunctions(canvasRef);    
    return (
        <canvas ref={canvasRef} {...props}/>
    )
}

export default Player

