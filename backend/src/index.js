require('dotenv').config({ path: `${__dirname}/.env.${process.env.NODE_ENV}` });
const startServer = require('./server');
startServer.default();