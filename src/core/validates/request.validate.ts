/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-02-06
 ------------------------------------------------- */

import type { Request, Response, NextFunction } from 'express';
import * as z from 'zod';
import type { ZodObject, ZodError } from 'zod';

import { BadRequest } from '~/core/http/responses/api-error.response';

const formatErrorsDetail = (errors: ZodError) => {
  return errors.issues.map(({ path, message }) => ({
    field: path.join('.'),
    message,
  }));
};

export const ZodEmptyObject = z.object({}).optional();

export const validateRequest = (schema: ZodObject) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (!result.success) {
      const details = formatErrorsDetail(result.error);

      throw new BadRequest({
        message: `Validation error: ${details.map((i) => i.field).join(', ')}`,
        details,
      });
    }
    next();
  };
};
