import 'dotenv/config';

import { Logger } from '@nestjs/common';
import { z } from 'zod';

const booleanEnv = z.enum(['y', 'n']).transform(data => data === 'y');

export const validationSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('production'),

  APPLICATION_HOST: z.string().default('0.0.0.0'),
  APPLICATION_PORT: z.coerce.number().int().positive().default(5000),
  BASE_URL: z.string().url(),

  DB_HOST: z.string(),
  DB_PORT: z.coerce.number().int().positive(),
  DB_USERNAME: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),

  ENABLE_LOGGER: booleanEnv.default('y'),
  ENABLE_DATABASE_LOGGER: booleanEnv.default('n'),

  MINIO_HOST: z.string(),
  MINIO_PORT: z.coerce.number().int().positive(),
  MINIO_USE_SSL: booleanEnv,
  MINIO_USER: z.string(),
  MINIO_PASSWORD: z.string(),
  MINIO_BUCKET: z.string(),

  ISSUER_BASE_URL: z.string(),
  AUDIENCE: z.string(),

  MAILER_HOST: z.string(),
  MAILER_PORT: z.coerce.number().int().positive(),
  MAILER_USERNAME: z.string(),
  MAILER_PASSWORD: z.string()
});

export type AppConfig = z.infer<typeof validationSchema>;
export let appConfigs: AppConfig;

export function loadConfig(): AppConfig {
  const logger = new Logger();
  const result = validationSchema.safeParse(process.env);

  if (!result.success) {
    logger.error(`Invalid environment variable(s): ${result.error.message}`);
    process.exit(1);
  }

  appConfigs = result.data;

  return result.data;
}
