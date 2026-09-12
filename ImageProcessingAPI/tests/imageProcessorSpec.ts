import fs from 'fs';
import path from 'path';
import { resizeImage } from '../src/utilities/imageProcessor';

describe('Image processing utility', () => {
  it('creates a resized image for valid input', async () => {
    const outputPath = await resizeImage('fjord', 150, 150);

    await expectAsync(fs.promises.access(outputPath)).toBeResolved();
  });

  it('throws for missing source image', async () => {
    const outputPath = path.resolve('images/thumb/missing-50x50.jpg');

    await fs.promises.unlink(outputPath).catch(() => undefined);

    await expectAsync(resizeImage('missing', 50, 50)).toBeRejected();
  });
});
