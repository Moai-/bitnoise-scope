import { useEffect, useRef, useState } from 'react'

export type MessageCallback = (msg: string) => void;
const WS_HOST = process.env.NODE_ENV === 'development' ? 
    'ws://localhost:4000' :
    window.location.origin.replace(/^http/, 'ws')

const useWebsocket = () => {
    
    const [callback, setCallback] = useState<MessageCallback>(()=>()=>{});
    const ws = useRef<WebSocket|null>(null);

    useEffect(() => {
        ws.current = new WebSocket(WS_HOST);
        ws.current.onopen = (evt) => {
            console.log('opened WS')
        }
    
        ws.current.onerror = (evt) => {
            console.log('Triggered onError')
        }
    
        ws.current.onclose = (evt) => {
            console.log('Triggered onClose')
        }

        const wsCurrent = ws.current;

        return () => {
            wsCurrent.close();
        };
    }, []);

    useEffect(() => {
        if (!ws.current) return;
        ws.current.onmessage = (msg: MessageEvent<string>) => {
            callback(msg.data);
        }
    }, [callback]);



    return {
        onMessage: (cb: MessageCallback) =>{
            setCallback(() => cb)
        },
    }
}

export default useWebsocket;