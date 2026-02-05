/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-02-05
 ------------------------------------------------- */

import type { RequestHandler } from 'express';

/**
 * Wraps async route handlers to automatically catch errors
 *
 * @param handler - Async function to handle the request
 * @returns Express middleware function
 */
export const asyncHandlingMiddleware = (handler: RequestHandler): RequestHandler => {
  return (req, res, next) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
};
