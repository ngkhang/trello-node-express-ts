/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-02-04
 ------------------------------------------------- */

interface BaseResponse {
  isSuccess: boolean;
  statusCode: number;
  message: string;
  timestamp: string;
}

export interface SuccessResponse<T = null> extends BaseResponse {
  data: T;
}

export interface ErrorDetail {
  field: string;
  message: string;
}

export interface ErrorResponse extends BaseResponse {
  path: string;
  details: ErrorDetail[];
}
