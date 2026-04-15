import { DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const ormConfig: DataSourceOptions = {
  type: 'postgres' as const,
  host: process.env.HOST,
  port: Number(process.env.PORT),
  username: process.env.DB_USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  synchronize: false,
};
