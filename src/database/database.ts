import { Pool } from 'pg';
import {
  DB_POSTGRES_HOST,
  DB_POSTGRES_DBDEV,
  DB_POSTGRES_USER,
  ENV_STATUS,
  DB_POSTGRES_DBTEST,
  DB_POSTGRES_PASSWORD,
  DB_POSTGRES_PORT,
} from '../config';

let client: any;

if (ENV_STATUS === 'dev') {
  client = new Pool({
    host: DB_POSTGRES_HOST,
    database: DB_POSTGRES_DBDEV,
    user: DB_POSTGRES_USER,
    password: DB_POSTGRES_PASSWORD,
    port: parseInt(DB_POSTGRES_PORT as string, 10),
  });
} else if (ENV_STATUS === 'test') {
  client = new Pool({
    host: DB_POSTGRES_HOST,
    database: DB_POSTGRES_DBTEST,
    user: DB_POSTGRES_USER,
    password: DB_POSTGRES_PASSWORD,
    port: parseInt(DB_POSTGRES_PORT as string, 10),
  });
}

export default client;
