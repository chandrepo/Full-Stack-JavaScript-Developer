import { Router } from 'express';
import apiRoutes from './api';

const routes = Router();

routes.get('/', (_req, res) => {
  res.status(200).send('Image Processing API');
});

routes.use('/api', apiRoutes);

export default routes;
