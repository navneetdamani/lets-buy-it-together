import { Pool, type PoolClient } from 'pg';
import { schemaStatements } from '@/db/schema';

const globalForDb = globalThis as unknown as { letsBuyPool?: Pool; letsBuySchema?: Promise<void> };

export function getDb(): Pool {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not configured.');
  }
  globalForDb.letsBuyPool ??= new Pool({
    connectionString: process.env.DATABASE_URL,
    options: '-c search_path=lets_buy_it_together',
    max: 10,
  });
  return globalForDb.letsBuyPool;
}

export async function ensureSchema(db: Pool | PoolClient) {
  globalForDb.letsBuySchema ??= (async () => {
    for (const statement of schemaStatements) {
      await db.query(statement);
    }
  })();
  await globalForDb.letsBuySchema;
}
