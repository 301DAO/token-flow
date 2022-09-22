import 'dotenv/config';
import dynamoose from 'dynamoose';

const ddb = new dynamoose.aws.ddb.DynamoDB({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

/**
 * If running in prod, use AWS deployed db otherwise use local db
 */
process.env.NODE_ENV === 'production'
  ? dynamoose.aws.ddb.set(ddb)
  : dynamoose.aws.ddb.local();
