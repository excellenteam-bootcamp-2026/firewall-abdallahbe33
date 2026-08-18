"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.ENVIRONMENTS = void 0;
require("dotenv/config");
const zod_1 = require("zod");
exports.ENVIRONMENTS = {
    DEV: "dev",
    PRODUCTION: "production"
};
const envSchema = zod_1.z.object({
    ENV: zod_1.z.enum([
        exports.ENVIRONMENTS.DEV,
        exports.ENVIRONMENTS.PRODUCTION
    ]),
    PORT: zod_1.z.coerce
        .number()
        .int()
        .min(1)
        .max(65535),
    DEV_DATABASE_URI: zod_1.z.string().min(1),
    PROD_DATABASE_URI: zod_1.z.string().min(1),
    DB_CONNECTION_INTERVAL: zod_1.z.coerce
        .number()
        .int()
        .positive()
});
const parsedEnv = envSchema.safeParse(process.env);
if (!parsedEnv.success) {
    console.error("Invalid environment variables:");
    console.error(parsedEnv.error.flatten().fieldErrors);
    process.exit(1);
}
const env = parsedEnv.data.ENV;
const databaseUri = env === exports.ENVIRONMENTS.DEV
    ? parsedEnv.data.DEV_DATABASE_URI
    : parsedEnv.data.PROD_DATABASE_URI;
exports.config = {
    env,
    port: parsedEnv.data.PORT,
    databaseUri,
    isDevelopment: env === exports.ENVIRONMENTS.DEV,
    isProduction: env === exports.ENVIRONMENTS.PRODUCTION,
    dbConnectionInterval: parsedEnv.data.DB_CONNECTION_INTERVAL
};
//# sourceMappingURL=env.js.map