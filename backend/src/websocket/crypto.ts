import { WebSocket } from 'ws';
import hashString from '../scripts/hashString';

const initializeCryptoWs = (msgCallback: (msg: string) => void) => {
    if (!process.env.CRYPTO_WS) {
        throw new Error('Cannot initialize Crypto WS without source environment variable');
    }
    const remoteWs = new WebSocket(process.env.CRYPTO_WS);
    remoteWs.on('message', (msg) => {
        msgCallback(hashString(msg.toString()) + '')
    });
}

export default initializeCryptoWs;