import { Router } from 'express';
import loginRotes from './loginRoute';
import userRoute from './userRoute';

const routesV1 = Router();

routesV1.use('/user', userRoute);
routesV1.use('/auth', loginRotes);

export default routesV1;
