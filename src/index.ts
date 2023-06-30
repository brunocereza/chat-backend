/* eslint-disable import/first */
import { errors } from 'celebrate';
import { config } from 'dotenv';
config();

import express, { json } from 'express';
import routes from './routes';

const port = process.env.PORT || '3333';
const app = express();
app.use(json());

app.use(routes);
app.use(errors());
app.listen(port, async () => {
  try {
    console.log(`🚀 Server running on port: ${port}`);
  } catch (error) {
    console.log('⚠️ Error running server', error);
  }
});
