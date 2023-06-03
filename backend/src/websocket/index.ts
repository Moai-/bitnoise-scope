import { Server } from 'http';
import initializeWebsocketServer from './server';
import initializeCryptoWs from './crypto';

const initializeWebsocket = async (server: Server) => {
    const { startServer } = initializeWebsocketServer(server);
    const sendMessage = await startServer();
    initializeCryptoWs(sendMessage);
}

export default initializeWebsocket;