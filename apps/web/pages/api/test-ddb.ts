import type { NextApiRequest, NextApiResponse } from 'next';
import { ddb } from 'database';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const users = await ddb.user.getAllUsers();
  const newAddress = users[users.length - 1].address + '1';
  await ddb.user.createUser(newAddress);
  console.log({ users });
  res.status(200).json({ users });
}
