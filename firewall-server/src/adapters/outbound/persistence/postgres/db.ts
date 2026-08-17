import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { config } from "../../../../main/env";
import * as schema from "./schema";

const pool = new Pool({
  connectionString: config.databaseUri
});

export const db = drizzle(pool, { schema });

export { pool };


export async function connectToDatabase(): Promise<void> {
  while (true) {
    try {
      const client = await pool.connect();

      client.release();

      console.log("Database connected successfully.");

      return;
    } catch (error) {
      console.error("Database connection failed.");

      console.log(
        `Retrying in ${config.dbConnectionInterval} ms...`
      );

      await new Promise(resolve =>
        setTimeout(resolve, config.dbConnectionInterval)
      );
    }
  }
}