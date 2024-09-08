import 'dotenv/config';

import { loadConfig } from 'src/modules/config/validation.schema';
import { DataSource } from 'typeorm';

const config = loadConfig();
const ormConfig = new DataSource({
  type: 'postgres',
  host: config.DB_HOST,
  port: config.DB_PORT,
  username: config.DB_USERNAME,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
  migrationsTableName: 'typeorm_migrations',
  migrations: [`${__dirname}/../../migrations/*{.ts,.js}`],
  logging: config.ENABLE_DATABASE_LOGGER,
  uuidExtension: 'uuid-ossp',
  installExtensions: true,
  synchronize: true
});

// для того, чтобы работал скрипт build:diagram
export default ormConfig;
