/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-02-04
 ------------------------------------------------- */

import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import type { ErrorDetail, ErrorResponse } from '~/types/api-response.type';

export class ApiErrorResponse extends Error implements ErrorResponse {
  public isSuccess = false;
  public name = 'ApiError';
  public timestamp = new Date().toISOString();
  public statusCode: number;
  public message: string;
  public path: string;
  public details: ErrorDetail[];

  constructor({
    message,
    statusCode,
    details = [],
    path = '',
  }: Pick<ErrorResponse, 'message' | 'statusCode'> & Partial<ErrorResponse>) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.path = path;
    this.details = details;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFound extends ApiErrorResponse {
  constructor(params: Partial<ErrorResponse> = {}) {
    super({
      statusCode: params.statusCode || StatusCodes.NOT_FOUND,
      message: params.message || ReasonPhrases.NOT_FOUND,
      path: params.path,
      details: params.details,
    });
    this.name = 'NotFound';
  }
}
