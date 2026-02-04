/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-02-04
 ------------------------------------------------- */

import type { Request, Response } from 'express';
import { Router } from 'express';

import { OkResponse } from '~/core/http/responses/api-success.response';

const routes = Router();

routes.get('/', (_req: Request, res: Response) => {
  return new OkResponse().send(res);
});
export default routes;
