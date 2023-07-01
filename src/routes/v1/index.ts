import { Router } from 'express';
import userRoute from './userRoute';

const routesV1 = Router();

routesV1.use('/user', userRoute);

export default routesV1;
