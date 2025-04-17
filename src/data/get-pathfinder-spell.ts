// pages/api/spells.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const upstream = await fetch('https://pfapi.whizkid.dev/api/spells');
  if (!upstream.ok) {
    return res.status(502).json({ error: 'pfapi unreachable' });
  }
  const data = await upstream.json();

  // allow any web app to consume *your* endpoint
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json(data);
}