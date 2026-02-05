/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-02-05
 ------------------------------------------------- */

import type { RequestHandler } from 'express';

import { NotFound } from '~/core/http/responses/api-error.response';

export const notFoundRouteMiddleware: RequestHandler = (req, _res, next) => {
  const errNotFound = new NotFound({
    message: `The endpoint '${req.originalUrl}' is not valid.`,
  });

  next(errNotFound);
};
