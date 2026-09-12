# Image Processing API

This project provides an Express API that resizes jpg images and caches resized outputs on disk.

## Submission Notes

This project is prepared for submission
This README includes:

- Scripts needed to test/start/build/lint/format the app
- Endpoints to verify required functionality
- Cache validation steps so a reviewer can delete thumbnails and confirm they are recreated once and then reused

## Endpoint

- Health endpoint: `GET /api`
- Image endpoint: `GET /api/images?filename=<name>&width=<number>&height=<number>`

Example:

`http://localhost:3000/api/images?filename=fjord&width=200&height=200`

## How Caching Works

- Source images are read from `images/full`
- Resized images are saved into `images/thumb`
- If a resized image already exists, it is returned directly without regenerating

## Error Handling

The image endpoint returns:

- `400` when filename is missing
- `400` when width or height is missing
- `400` when width/height are invalid (not positive integers)
- `404` when the source image does not exist

## Scripts

- `npm run build` compiles TypeScript to `build`
- `npm start` builds and starts the server
- `npm test` runs Jasmine tests (endpoint tests + utility unit tests)
- `npm run lint` runs ESLint
- `npm run format` runs Prettier check

## How To Run

1. Install dependencies: `npm install`
2. Start server: `npm start`
3. Open endpoint URL in browser

## Reviewer Verification Steps

1. Delete all cached thumbnails from `images/thumb`.

   Example command from project root:

   `rm -f images/thumb/*.jpg`

2. Request a resized image endpoint the first time:

   `http://localhost:3000/api/images?filename=fjord&width=200&height=200`

   Expected result:

   - HTTP 200 response with resized image
   - New cached file appears in `images/thumb` named `fjord-200x200.jpg`

3. Request the exact same endpoint again.

   Expected result:

   - HTTP 200 response again
   - Existing cached file is reused (not regenerated)

4. Optional quick checks:
   - Missing filename -> `/api/images?width=200&height=200` returns 400
   - Missing width/height -> `/api/images?filename=fjord` returns 400
   - Invalid dimension -> `/api/images?filename=fjord&width=-1&height=200` returns 400
   - Missing source image -> `/api/images?filename=not-a-real-image&width=200&height=200` returns 404

## Additional Included Functionality

- `GET /` root endpoint returns API label text with status 200
- `GET /api` health endpoint returns status 200
- Utility and endpoint tests are included and pass via `npm test`
