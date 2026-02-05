/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-02-05
 ------------------------------------------------- */

import type { Request, Response, NextFunction } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { env } from '~/config/env.config';
import ApiErrorResponse from '~/core/http/responses/api-error.response';
import type { ErrorResponse } from '~/types/api-response.type';

export const errorHandlingMiddleware = (
  error: unknown,
  req: Request,
  res: Response<ErrorResponse>,
  _next: NextFunction,
) => {
  // Log error for debugging
  if (env.nodeEnv === 'development') {
    console.error('[Unhandled Error]', error);
  }

  const errorResponse =
    error instanceof ApiErrorResponse
      ? error
      : new ApiErrorResponse({
          statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
          message: ReasonPhrases.INTERNAL_SERVER_ERROR,
        });

  errorResponse.path = req.originalUrl;

  return res.status(errorResponse.statusCode).json(errorResponse);
};
