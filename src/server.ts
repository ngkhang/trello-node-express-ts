/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-02-06
 ------------------------------------------------- */

import { createApp } from './app';

import { connectMongoDb } from '~/config/database.config';
import env from '~/config/env.config';

const { host, port } = env.app;

const createServer = async () => {
  try {
    console.info(`Connecting DB...`);
    await connectMongoDb();
    console.info(`Connected to MongoDb Cloud Atlas`);

    console.info(`Initial App...`);
    const app = createApp();

    app.listen(port, () => {
      console.info(`Server in running at http://${host}:${port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

void createServer();
