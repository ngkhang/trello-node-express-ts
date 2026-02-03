/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-02-03
 ------------------------------------------------- */

import dns from 'dns';

import { MongoClient, ServerApiVersion } from 'mongodb';
import type { Db } from 'mongodb';

import { env } from '~/config/env.config';

// Fix error: Error: querySrv ECONNREFUSED _mongodb._tcp.ngkhang-cluster0....mongodb.net
dns.setServers(['8.8.8.8', '1.1.1.1']);

let db: Db | undefined;
let mongoClient: MongoClient | undefined;

export const connectMongoDb = async (): Promise<Db> => {
  if (db) return db;

  mongoClient = new MongoClient(env.db.uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  await mongoClient.connect();
  db = mongoClient.db();
  // Default DB name from connection string (URI)
  // db = mongoClient.db(env.db.name);
  return db;
};

export const getDb = (): Db => {
  if (!db) throw new Error('Please connect to database first');
  return db;
};

export const closeDb = async () => {
  if (mongoClient) {
    await mongoClient.close();
    console.info('Closed to MongoDB Cloud Atlas');
  }
};
