/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-01-31
 ------------------------------------------------- */

import type { Request, Response } from 'express';
import { Router } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

const routes = Router();

routes.get('/', (_req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({
    statusCode: StatusCodes.OK,
    message: ReasonPhrases.OK,
  });
});

export default routes;
