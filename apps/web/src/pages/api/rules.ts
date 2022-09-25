import type { NextApiRequest, NextApiResponse } from 'next';
import { ddb } from 'database';
import { validEthAddress } from '../../utils/string-validators';

/**
 * Insert new rule record into DynamoDB
 */

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  switch (request.method) {
    case 'POST':
      const body = JSON.parse(request.body) as { accountAddress: string; rules: Array<any> };
      console.log(typeof body);
      if (!body || body.rules.length === 0 || body.accountAddress.length !== 42) {
        return response.status(400).json({ error: 'Invalid request body' });
      }
      const newRules = await ddb.rule.createRules({
        accountAddress: body.accountAddress,
        rules: body.rules,
      });
      return response.status(200).json(newRules);
    case 'GET':
      const { accountAddress } = request.query;
      if (
        !accountAddress ||
        typeof accountAddress !== 'string' ||
        !validEthAddress(accountAddress)
      ) {
        return response.status(400).json({ error: 'No userAddress provided' });
      }
      const userRules = await ddb.rule.getRulesByAddress(accountAddress);
      console.log({ userRules });
      return response.status(200).json(userRules);
    default:
      return response.status(400).json({ error: 'Invalid request method' });
  }
}
