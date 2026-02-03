/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-02-03
 ------------------------------------------------- */

import dotenv from 'dotenv';
import Joi from 'joi';

import { formatJoiErrors } from '~/utils/formatErrors.util';

dotenv.config({
  path: '.env',
  quiet: process.env.NODE_ENV === 'test',
});

interface Env {
  NODE_ENV: string;
  APP_HOST: string;
  APP_PORT: number;
  APP_CORS_ORIGIN: string;
  DB_MONGO_NAME: string;
  DB_MONGO_URI: string;
}

const envSchema = Joi.object<Env>({
  NODE_ENV: Joi.string().valid('development', 'test', 'production'),
  APP_HOST: Joi.string().required(),
  APP_PORT: Joi.number().port().required(),
  APP_CORS_ORIGIN: Joi.string().required(),
  DB_MONGO_NAME: Joi.string().required(),
  DB_MONGO_URI: Joi.string().uri().required(),
})
  .unknown(true)
  .prefs({ errors: { label: 'key' } });

const validateEnv = () => {
  const { error, value } = envSchema.validate(process.env, { abortEarly: false });
  if (error) {
    const formattedErrors = formatJoiErrors(error);
    // TODO: Handle detail error messages
    throw new Error(JSON.stringify(formattedErrors));
  }

  return {
    nodeEnv: value.NODE_ENV,
    app: {
      host: value.APP_HOST,
      port: value.APP_PORT,
      corsOrigin: value.APP_CORS_ORIGIN,
    },
    db: {
      name: value.DB_MONGO_NAME,
      uri: value.DB_MONGO_URI,
    },
  };
};

export const env = validateEnv();
