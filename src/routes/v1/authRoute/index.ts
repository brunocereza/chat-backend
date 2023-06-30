import { Router } from 'express';

const authRotes = Router();

//o esquema utilizado esta somente como exemplo, será ajustado e retirado
authRotes.get(
  '/login',
  // celebrate({ [Segments.BODY]: loginSchema }),
  async (req, res) => {
    console.log(req, res);

    return res.status(200).json({ message: 'ok' });
  },
);

export default authRotes;
