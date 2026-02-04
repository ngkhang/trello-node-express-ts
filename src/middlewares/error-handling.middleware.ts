/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-02-04
 ------------------------------------------------- */

import type { Request, Response, NextFunction } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { ApiErrorResponse } from '~/core/http/responses/api-error.response';
import type { ErrorResponse } from '~/types/api-response.type';

export const errorHandlingMiddleware = (
  error: unknown,
  req: Request,
  res: Response<ErrorResponse>,
  _next: NextFunction,
) => {
  if (error instanceof ApiErrorResponse) {
    error.path = req.originalUrl;
    return res.status(error.statusCode).json(error);
  }

  // NOTE: Refactor
  // if (nodeEnv === 'development') {
  //   response.stack = error.stack;
  // }

  // // Log error for debugging
  // if (nodeEnv === 'development') {
  //   console.error('Error', {
  //     name: error.name,
  //     ...response,
  //   });
  // }

  const errResponse = new ApiErrorResponse({
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    message: ReasonPhrases.INTERNAL_SERVER_ERROR,
    path: req.originalUrl,
  });

  res.status(errResponse.statusCode).json(errResponse);
};
