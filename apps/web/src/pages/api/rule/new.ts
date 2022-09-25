import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * Insert new rule record into DynamoDB
 */

interface RequestBody {
  rule: any;
  userAddress: string;
}

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  const body = request.body as RequestBody;
  console.log('body', body);
  if (!body || !body.rule || !body.userAddress) {
    console.log('Both rule and userAddress are required');
    return response.status(400).json({ error: 'No rule or userAddress provided' });
  }
}
