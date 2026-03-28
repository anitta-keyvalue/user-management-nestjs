import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { ormConfig } from '../../orm.config';

export const dataSource = new DataSource({
  ...ormConfig,
  entities: ['dist/src/entities/*.js'],
  migrations: ['dist/src/db/migrations/*.js'],
});
