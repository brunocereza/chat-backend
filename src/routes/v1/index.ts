import { Router } from 'express';
import authRotes from './authRoute';

const routesV1 = Router();

routesV1.use('/auth', authRotes);

export default routesV1;
