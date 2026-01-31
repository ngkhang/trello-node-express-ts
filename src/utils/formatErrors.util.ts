/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-01-31
 ------------------------------------------------- */

import type Joi from 'joi';
import type { ValidationError } from 'joi';

export const formatJoiErrors = (error: ValidationError) => {
  if (!error || !error.details) return {};

  return error.details.reduce((result: Record<string, string>, detail: Joi.ValidationErrorItem) => {
    const key = detail.path.join('.');

    if (!result[key]) result[key] = detail.message;
    return result;
  }, {});
};
