import 'dotenv/config';

import { Logger } from '@nestjs/common';
import { z } from 'zod';

const booleanEnv = z.enum(['y', 'n']).transform(data => data === 'y');

export const validationSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('production'),

  APPLICATION_HOST: z.string().default('0.0.0.0'),
  APPLICATION_PORT: z.coerce.number().int().positive().default(5000),

  DB_HOST: z.string(),
  DB_PORT: z.coerce.number().int().positive(),
  DB_USERNAME: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),

  ENABLE_LOGGER: booleanEnv.default('y'),
  ENABLE_DATABASE_LOGGER: booleanEnv.default('n')
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