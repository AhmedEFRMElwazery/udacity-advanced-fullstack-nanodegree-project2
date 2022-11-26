import dotenv from "dotenv";
dotenv.config();

export const {
  SERVERPORT,
  DB_POSTGRES_HOST,
  DB_POSTGRES_PORT,
  DB_POSTGRES_DBDEV,
  DB_POSTGRES_DBTEST,
  DB_POSTGRES_USER,
  DB_POSTGRES_PASSWORD,
  BCRYPT_PASS,
  SALT_ROUNDS,
  TOKEN,
  ENV_STATUS,
} = process.env;
