import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const fullImagesDir = path.resolve('images/full');
const thumbImagesDir = path.resolve('images/thumb');

const ensureThumbDir = async (): Promise<void> => {
  await fs.promises.mkdir(thumbImagesDir, { recursive: true });
};

export const getImagePaths = (
  filename: string,
  width: number,
  height: number
): { sourcePath: string; outputPath: string } => {
  const sourcePath = path.join(fullImagesDir, `${filename}.jpg`);
  const outputPath = path.join(
    thumbImagesDir,
    `${filename}-${width}x${height}.jpg`
  );

  return { sourcePath, outputPath };
};

export const resizeImage = async (
  filename: string,
  width: number,
  height: number
): Promise<string> => {
  const { sourcePath, outputPath } = getImagePaths(filename, width, height);

  await ensureThumbDir();

  try {
    await fs.promises.access(outputPath);
    return outputPath;
  } catch {
    // The cached file does not exist yet, so it must be generated.
  }

  await fs.promises.access(sourcePath);

  await sharp(sourcePath).resize(width, height).toFile(outputPath);

  return outputPath;
};
