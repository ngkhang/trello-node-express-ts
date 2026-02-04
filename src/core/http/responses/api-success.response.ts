/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-02-04
 ------------------------------------------------- */

import type { Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import type { SuccessResponse } from '~/types/api-response.type';

export class ApiSuccessResponse<T> implements SuccessResponse<T | null> {
  public isSuccess = true;
  public timestamp = new Date().toISOString();
  public statusCode: number;
  public message: string;
  public data: T | null;

  constructor({
    statusCode,
    message,
    data,
  }: Pick<SuccessResponse, 'statusCode' | 'message'> & { data?: T }) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data || null;
  }

  public send(res: Response): void {
    res.status(this.statusCode).json(this);
  }
}

export class OkResponse<T> extends ApiSuccessResponse<T> {
  constructor({ statusCode, message, data }: Partial<SuccessResponse<T>> = {}) {
    super({
      statusCode: statusCode || StatusCodes.OK,
      message: message || ReasonPhrases.OK,
      data,
    });
  }
}
