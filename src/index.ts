/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/order */
/* eslint-disable import/first */
import { errors } from 'celebrate';
import { config } from 'dotenv';
import passport from 'passport';
import session from 'express-session';
import http from 'http';
import socket from 'socket.io';

config();

import express, { json } from 'express';
import routes from './routes';
// import { Socket } from 'socket.io';

const cors = require('cors');
const port = process.env.PORT || '3333';
const app = express();

app.use(cors({ credentials: true }));
app.use(json());
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
  }),
);
app.use(passport.initialize());
app.use(passport.session());
//verificar express.static
// eslint-disable-next-line @typescript-eslint/no-var-requires

const PORT = process.env.PORT || 8899;

const httpServer = http.createServer(app);
const io = socket(httpServer, {
  port: 8899,
  path: '/socket.io',
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
});

const clients: Array<any> = [];

io.on('connection', (client: socket.Socket) => {
  client.on('join', (params: string) => {
    clients.push(client);
    console.log(`Joined: ${client.id} ${params}`);
  });

  client.on('disconnect', () => {
    clients.splice(clients.indexOf(client), 1);
    console.log(`Disconnected: ${client.id}`);
  });
});

httpServer.listen(PORT, () => {
  console.log('Server http started at ' + PORT);
});

app.use(routes);
app.use(errors());
app.listen(port, async () => {
  try {
    console.log(`🚀 Server running on port: ${port}`);
  } catch (error) {
    console.log('⚠️ Error running server', error);
  }
});
