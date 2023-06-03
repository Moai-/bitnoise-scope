import { Server } from 'http';
import { WebSocketServer, WebSocket } from 'ws';

const initializeWebsocketServer = (server: Server) => {
    let sockServer: WebSocketServer | null = null;

    const closeServer = () => {
        if (sockServer !== null) {
            sockServer.close();
            sockServer = null;
        }
    }

    const startServer = async () => {
        closeServer();
        return new Promise<(msg: string) => void>((resolve) => {
            sockServer = new WebSocketServer({ server });

            sockServer.on('listening', () => {
                console.log(`${new Date().toLocaleTimeString()}: WS listening`)
                resolve(function sendMessage(data: string) {
                    if( sockServer ) {
                        sockServer.clients.forEach((client) => {
                            if (client.readyState === WebSocket.OPEN) {
                                client.send(data);
                            }
                        });
                    }
                })
            })

            sockServer.on('error', (err) => {
                console.log(`${new Date().toLocaleTimeString()}: WS Server error: ${err.message}`)
            })

            sockServer.on('connection', (ws: WebSocketServer) => {

                console.log(`${new Date().toLocaleTimeString()}: Opened connection`)

                ws.on('close', () => {
                    console.log(`${new Date().toLocaleTimeString()}: Closed connection`)
                });

                ws.on('error', (err) => {
                    console.log(`${new Date().toLocaleTimeString()}: Encountered error: ${err.message}`)
                });
            })
        })
    }

    return {
        startServer,
        closeServer
    }
}

export default initializeWebsocketServer;