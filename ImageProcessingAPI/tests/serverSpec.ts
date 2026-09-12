import request from 'supertest';
import app from '../src/server';

describe('Image API endpoint', () => {
  it('returns 200 for a valid resize request', async () => {
    const response = await request(app).get(
      '/api/images?filename=fjord&width=200&height=200'
    );

    expect(response.status).toBe(200);
  });

  it('returns 400 for missing filename', async () => {
    const response = await request(app).get('/api/images?width=200&height=200');

    expect(response.status).toBe(400);
  });

  it('returns 400 for invalid dimensions', async () => {
    const response = await request(app).get(
      '/api/images?filename=fjord&width=-1&height=200'
    );

    expect(response.status).toBe(400);
  });

  it('returns 404 when source image does not exist', async () => {
    const response = await request(app).get(
      '/api/images?filename=not-a-real-image&width=200&height=200'
    );

    expect(response.status).toBe(404);
  });
});
