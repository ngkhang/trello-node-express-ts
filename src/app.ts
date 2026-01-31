/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-01-31
 ------------------------------------------------- */

import type { Express } from 'express';
import express from 'express';

import routes from './routes';

import { corsMiddleware } from '~/config/cors.config';

export const createApp = (): Express => {
  const app = express();

  // Parse URL-encoded request bodies
  app.use(express.urlencoded({ extended: true }));
  // Parse JSON request bodies
  app.use(express.json());
  // CORS
  app.use(corsMiddleware);

  // API Routes
  app.use('/api', routes);

  return app;
};
