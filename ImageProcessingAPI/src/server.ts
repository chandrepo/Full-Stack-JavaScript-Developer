import express, { Application } from 'express';
import routes from './routes';

const app: Application = express();
const port = 3000;

app.use(routes);

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
  });
}

export default app;
