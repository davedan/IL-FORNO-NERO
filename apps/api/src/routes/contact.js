const WEBHOOK_URL = process.env.WEBHOOK_URL;
const N8N_BASIC_AUTH_USER = process.env.N8N_BASIC_AUTH_USER;
const N8N_CONTACT_WEBHOOK_SECRET = process.env.N8N_CONTACT_WEBHOOK_SECRET;
const BM_TENANT_ID = process.env.BM_TENANT_ID;
const BM_BUSINESS_ID = process.env.BM_BUSINESS_ID;

export default async (req, res) => {
  if (!WEBHOOK_URL) throw new Error('WEBHOOK_URL is not set in apps/api/.env');
  if (!N8N_BASIC_AUTH_USER) throw new Error('N8N_BASIC_AUTH_USER is not set in apps/api/.env');
  if (!N8N_CONTACT_WEBHOOK_SECRET) throw new Error('N8N_CONTACT_WEBHOOK_SECRET is not set in apps/api/.env');

  const payload = {
    ...req.body,
    bm_tenant_id: BM_TENANT_ID || '',
    bm_business_id: BM_BUSINESS_ID || '',
  };

  const credentials = Buffer.from(`${N8N_BASIC_AUTH_USER}:${N8N_CONTACT_WEBHOOK_SECRET}`).toString('base64');

  const upstream = await fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${credentials}`,
    },
    body: JSON.stringify(payload),
  });

  if (!upstream.ok) {
    throw new Error(`Webhook failed: ${upstream.status} ${upstream.statusText}`);
  }

  res.json({ ok: true });
};
