/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-01-31
 ------------------------------------------------- */

import { createApp } from './app';

import { env } from '~/config/env.config';

const { host, port } = env.app;

const server = async () => {
  const app = createApp();

  app.listen(port, () => {
    console.info(`Server in running at http://${host}:${port}`);
  });
};

server().catch((err) => {
  console.error(err);
  process.exit(1);
});
