import 'dotenv/config';
import dynamoose from 'dynamoose';

import * as user from './services/user';
import * as rule from './services/rule';

console.log('node env', process.env.NODE_ENV);
/**
 * If running in prod, use AWS deployed db otherwise use local db
 */
try {
  // if (process.env.NODE_ENV === 'production') {
  const config = new dynamoose.aws.ddb.DynamoDB({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });
  dynamoose.aws.ddb.set(config);
  // } else {
  //   dynamoose.aws.ddb.local();
  // }
} catch (error) {
  console.log('Encountered an error while setting up DynamoDB', { error });
  process.exit(1);
}

/**
 * Create, update, delete, and get user/s.
 * ```ts
 * import { ddb } from 'database';
 *
 * const allUsers = await ddb.user.getAllUsers();
 *
 * const user = await ddb.user.getUseByAddress('0x...');
 *
 * const updatedUser = await ddb.user.updateUser({ id: '23', address: '0x...' });
 *
 * ```
 */
export const ddb = { user, rule };
