/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-01-31
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
}

const envSchema = Joi.object<Env>({
  NODE_ENV: Joi.string().valid('development', 'test', 'production'),
  APP_HOST: Joi.string().required(),
  APP_PORT: Joi.number().port().required(),
}).unknown(true);

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
    },
  };
};

export const env = validateEnv();
