import express, { Request, Response } from 'express';
import { logger } from './utils/logger';
import middlewares from './middlewares';
import routes from './routes';

const app: express.Application = express();

middlewares(app); // bind middlewares

routes(app); // initialize all routes
// Base route to health check
app.get('/test', (req: Request, res: Response) => {
   return res.status(200).send('Test successful');
});

// Handle invalid Route
app.all('/*', (req: Request, res: Response) => {
   logger.info(__filename, 'Invalid Route Handler', 'No UUID', 'Invalid Route Fired : ' + req.path);
   return res.status(400).json({
      status: 400,
      message: 'Bad Request'
   });
});

export default app;
