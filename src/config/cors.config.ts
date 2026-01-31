/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-01-31
 ------------------------------------------------- */

// TODO: Config Error format

import cors from 'cors';
import type { CorsOptions } from 'cors';
import { StatusCodes } from 'http-status-codes';

import { env } from './env.config';

const allowedOrigins = env.app.corsOrigin.split(',').map((o) => o.trim());

const corsOptions: CorsOptions = {
  // Access-Control-Allow-Headers
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  // Access-Control-Allow-Credentials
  credentials: true,
  // Access-Control-Allow-Methods
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  // Provides a status code to use for successful OPTIONS requests
  optionsSuccessStatus: StatusCodes.NO_CONTENT,
  // Access-Control-Allow-Origin
  origin(requestOrigin, callback) {
    if (!requestOrigin) {
      if (['development', 'test'].includes(env.nodeEnv)) return callback(null, true);

      // TODO: Add statusCode: StatusCodes.FORBIDDEN
      return callback(new Error('Origin is required'));
    }

    if (allowedOrigins.includes(requestOrigin)) return callback(null, true);

    // TODO: Add statusCode: StatusCodes.FORBIDDEN
    return callback(new Error(`Origin "${requestOrigin}" is not allowed by CORS policy`));
  },
};

export const corsMiddleware = cors(corsOptions);
