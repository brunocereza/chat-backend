/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/order */
/* eslint-disable import/first */
import { errors } from 'celebrate';
import { config } from 'dotenv';
import passport from 'passport';
import session from 'express-session';

config();

import express, { json } from 'express';
import routes from './routes';

const cors = require('cors');
const port = process.env.PORT || '3333';
const app = express();
app.use(cors());
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
// eslint-disable-next-line @typescript-eslint/no-var-requires

app.use(routes);
app.use(errors());
app.listen(port, async () => {
  try {
    console.log(`🚀 Server running on port: ${port}`);
  } catch (error) {
    console.log('⚠️ Error running server', error);
  }
});
