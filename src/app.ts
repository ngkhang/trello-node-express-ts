/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-02-05
 ------------------------------------------------- */

import cookieParser from 'cookie-parser';
import type { Express } from 'express';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import routes from './routes';

import { corsMiddleware } from '~/config/cors.config';
import { errorHandlingMiddleware, notFoundRouteMiddleware } from '~/middlewares';

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
  app.use('/{*splat}', notFoundRouteMiddleware);

  // Error Handler middleware- catches all errors
  app.use(errorHandlingMiddleware);

  return app;
};
