/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-01-31
 ------------------------------------------------- */

import { createApp } from './app';

const PORT = 3000;
const HOST = 'localhost';

const server = async () => {
  const app = createApp();

  app.listen(PORT, () => {
    console.info(`Server in running at http://${HOST}:${PORT}`);
  });
};

server().catch((err) => {
  console.error(err);
  process.exit(1);
});
