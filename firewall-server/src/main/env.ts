import "dotenv/config";
import { z } from "zod";

export const ENVIRONMENTS = {
  DEV: "dev",
  PRODUCTION: "production"
} as const;

const envSchema = z.object({
  ENV: z.enum([
    ENVIRONMENTS.DEV,
    ENVIRONMENTS.PRODUCTION
  ]),

  PORT: z.coerce
    .number()
    .int()
    .min(1)
    .max(65535),

  DEV_DATABASE_URI: z.string().min(1),

  PROD_DATABASE_URI: z.string().min(1)
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("Invalid environment variables:");
  console.error(parsedEnv.error.flatten().fieldErrors);

  process.exit(1);
}

const env = parsedEnv.data.ENV;

const databaseUri =
  env === ENVIRONMENTS.DEV
    ? parsedEnv.data.DEV_DATABASE_URI
    : parsedEnv.data.PROD_DATABASE_URI;

export const config = {
  env,
  port: parsedEnv.data.PORT,
  databaseUri,

  isDevelopment: env === ENVIRONMENTS.DEV,
  isProduction: env === ENVIRONMENTS.PRODUCTION
};