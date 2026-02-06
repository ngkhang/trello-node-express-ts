/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-02-06
 ------------------------------------------------- */

import dotenv from 'dotenv';
import * as z from 'zod';

dotenv.config({
  path: '.env',
  quiet: process.env.NODE_ENV === 'test',
});

export const NODE_ENVIRONMENT = ['development', 'test', 'production'] as const;

const schema = z.object({
  NODE_ENV: z.enum(NODE_ENVIRONMENT).default('development'),
  APP_HOST: z.string(),
  APP_PORT: z.coerce.number().min(0).max(65553),
  APP_CORS_ORIGIN: z.string(),
  DB_MONGO_NAME: z.string(),
  DB_MONGO_URI: z.string(),
});

const parsedEnv = schema.parse(process.env);

const env = {
  nodeEnv: parsedEnv.NODE_ENV,
  app: {
    host: parsedEnv.APP_HOST,
    port: parsedEnv.APP_PORT,
    corsOrigin: parsedEnv.APP_CORS_ORIGIN,
  },
  db: {
    name: parsedEnv.DB_MONGO_NAME,
    uri: parsedEnv.DB_MONGO_URI,
  },
};

export default env;
