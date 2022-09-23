// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { ddb } from '../../../../packages/database/src/index';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const users = await ddb.user.getAllUsers();
  res.status(200).json({ users });
}
