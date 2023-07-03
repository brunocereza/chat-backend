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
const clientsName: Array<any> = [];
console.log(clients, 'clients');
io.on('connection', (client: socket.Socket) => {
  const user = {
    name: client.handshake.query?.name,
    id: client.id,
  };

  //  ${JSON.stringify(client.handshake.query?.name)} <- pegar o nome

  client.on('clientSend', (arg) => {
    client.emit('serverSend', arg);
    // console.log(arg); // world
  });
  clients.push(user);

  client.on('hello', (arg) => {
    console.log(arg); // world
  });
  // envia mensagem pro client
  client.emit('serverSend', ` message: "oi"", author: "bruno"`);

  // io.on('connection', (socket) => {

  // });

  client.on('disconnect', () => {
    clients.splice(clients.indexOf(client), 1);
    clientsName.splice(
      clientsName.indexOf(JSON.stringify(client.handshake.query?.name)),
      1,
    );
    console.log(`Disconnected: ${client.id}`);
  });
});

app.get('/msg', (req, res) => {
  const msg = req.query.msg || '';
  for (const client of clients) {
    client.emit('msg', msg);
  }

  res.json({ ok: true });
});

app.get('/getAllUserOn', (req, res) => {
  console.log('all names');

  res.json({ user: clientsName });
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
