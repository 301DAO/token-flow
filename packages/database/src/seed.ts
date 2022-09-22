import 'dotenv/config';
import './index';
import { userModel } from './models/user';

async function seedDummyUsers({ count }: { count: number }) {
  const address = '0x000000000000000000000000000000000000000';
  for (let i = 0; i < count; i++) {
    const user = new userModel({
      id: `${i}`,
      address: `${address}${i}`,
    });
    await user.save();
  }
}

(async () => {
  try {
    await seedDummyUsers({ count: 100 });
    const users = await userModel.scan().exec();
    console.log('users: ', { users });
    // dynamoose.aws.ddb().deleteTable({ TableName: 'User' });
  } catch (error) {
    console.trace({ error });
  } finally {
    process.exit(0);
  }
})();
