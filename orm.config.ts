import { DataSourceOptions } from 'typeorm';

export const ormConfig: DataSourceOptions = {
  type: 'postgres' as const,
  host: 'localhost',
  port: 5433,
  username: 'user',
  password: 'password',
  database: 'db1',
  synchronize: false,
};
