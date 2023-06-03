import path from 'path';
import express from 'express';
import initializeWebsocket from './websocket';
import http, { Server } from 'http';
import setupApp from './app/setup';
import { WebSocketServer } from 'ws';

const normalizePort = (val: string) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

// TODO: rewrite this gunk (messy type, messy type)
const onError = (port: string | number | boolean) => (error: { syscall: string; code: any; }) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

const onListening = (server: Server) => () => {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr?.port}`;
  console.log(`Listening on ${bind}`);
}

const startServer = () => {
  const app = setupApp();
  const port = normalizePort(process.env.PORT || '4000');
  app.set('port', port);

  const server = http.createServer(app);
  initializeWebsocket(server);
  server.listen(port);
  server.on('error', onError(port));
  server.on('listening', onListening(server));
}

export default startServer;
