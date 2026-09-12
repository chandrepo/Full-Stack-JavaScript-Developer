import { Router } from 'express';
import imagesRoutes from './images';

const apiRoutes = Router();

apiRoutes.get('/', (_req, res) => {
  res.status(200).send('API is running. Use /api/images endpoint.');
});

apiRoutes.use('/images', imagesRoutes);

export default apiRoutes;
