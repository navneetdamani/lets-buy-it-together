import { ensureSchema, getDb } from '@/lib/db';

export async function POST(request: Request) {
  const body = await request.json() as Record<string, unknown>;
  const firstName = String(body.firstName || '').trim();
  const lastName = String(body.lastName || '').trim();
  const email = String(body.email || '').trim().toLowerCase();
  const mobile = String(body.mobile || '').trim();
  const zipCode = String(body.zipCode || '').trim();
  const neighborhood = String(body.neighborhood || '').trim();
  const residentType = String(body.residentType || '').trim();
  const preferredChannel = String(body.preferredChannel || '').trim();
  const interests = Array.isArray(body.interests) ? body.interests.map(String).slice(0, 12) : [];

  if (!firstName || !lastName || !/^\S+@\S+\.\S+$/.test(email) || !/^\d{5}$/.test(zipCode) || !neighborhood || !residentType || !preferredChannel || !interests.length) {
    return Response.json({ error: 'Please complete every required field and choose at least one interest.' }, { status: 400 });
  }
  if (preferredChannel === 'sms' && !mobile) {
    return Response.json({ error: 'Add a mobile number to receive text notifications.' }, { status: 400 });
  }

  const db = getDb();
  await ensureSchema(db);
  const client = await db.connect();
  try {
    await client.query('BEGIN');
    const result = await client.query<{ id: string }>(
      `INSERT INTO signups (first_name,last_name,email,mobile,zip_code,neighborhood,resident_type,preferred_channel,email_consent,sms_consent)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,TRUE,$9)
       ON CONFLICT (email, zip_code) DO UPDATE SET
         first_name=EXCLUDED.first_name, last_name=EXCLUDED.last_name, mobile=EXCLUDED.mobile,
         neighborhood=EXCLUDED.neighborhood, resident_type=EXCLUDED.resident_type,
         preferred_channel=EXCLUDED.preferred_channel, email_consent=TRUE, sms_consent=EXCLUDED.sms_consent
       RETURNING id`,
      [firstName, lastName, email, mobile, zipCode, neighborhood, residentType, preferredChannel, preferredChannel === 'sms'],
    );
    const signupId = result.rows[0].id;
    await client.query('DELETE FROM signup_interests WHERE signup_id = $1', [signupId]);
    for (const interest of interests) {
      await client.query('INSERT INTO signup_interests (signup_id, interest) VALUES ($1, $2)', [signupId, interest]);
    }
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
  return Response.json({ ok: true });
}
