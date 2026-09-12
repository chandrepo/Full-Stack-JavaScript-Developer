import { Router, Request, Response } from 'express';
import { resizeImage } from '../../utilities/imageProcessor';

const imagesRoutes = Router();

const parsePositiveInteger = (value: unknown): number | null => {
  if (typeof value !== 'string') {
    return null;
  }

  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    return null;
  }

  return parsed;
};

imagesRoutes.get('/', async (req: Request, res: Response): Promise<void> => {
  const filename = req.query.filename;

  if (typeof filename !== 'string' || filename.trim().length === 0) {
    res.status(400).send('Missing filename parameter.');
    return;
  }

  if (req.query.width === undefined || req.query.height === undefined) {
    res.status(400).send('Missing width or height parameter.');
    return;
  }

  const width = parsePositiveInteger(req.query.width);
  const height = parsePositiveInteger(req.query.height);

  if (width === null || height === null) {
    res.status(400).send('Width and height must be positive integers.');
    return;
  }

  try {
    const outputPath = await resizeImage(filename, width, height);
    res.status(200).sendFile(outputPath);
  } catch {
    res.status(404).send('Requested image file was not found.');
  }
});

export default imagesRoutes;
