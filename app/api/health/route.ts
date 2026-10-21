import { ensureSchema, getDb } from '@/lib/db';

export async function GET() {
  try {
    const db = getDb();
    await ensureSchema(db);
    await db.query('SELECT 1');
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false }, { status: 503 });
  }
}
