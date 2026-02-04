/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-02-04
 ------------------------------------------------- */

import cookieParser from 'cookie-parser';
import type { Express, Request, Response, NextFunction } from 'express';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import routes from './routes';

import { corsMiddleware } from '~/config/cors.config';
import { NotFound } from '~/core/http/responses/api-error.response';
import { errorHandlingMiddleware } from '~/middlewares/error-handling.middleware';

export const createApp = (): Express => {
  const app = express();

  // Parse URL-encoded request bodies
  app.use(express.urlencoded({ extended: true }));
  // Parse JSON request bodies
  app.use(express.json());
  // CORS
  app.use(corsMiddleware);
  // HTTP request logger middleware
  app.use(morgan('dev'));
  // Secure Express apps by setting HTTP response headers
  app.use(helmet());
  // Parse Cookie header and populate req.cookies
  app.use(cookieParser());

  // API Routes
  app.use('/api', routes);

  // 404 Handler - catches undefined routes
  app.use('/{*splat}', (req: Request, _res: Response, next: NextFunction) => {
    const errNotFound = new NotFound({
      message: `Can't find ${req.method}: "${req.originalUrl}" on the server!`,
    });
    next(errNotFound);
  });

  // Error Handler middleware- catches all errors
  app.use(errorHandlingMiddleware);

  return app;
};
