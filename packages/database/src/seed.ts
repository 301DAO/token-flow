import 'dotenv/config';
import './index';
import { userModel } from './models/user';
import { ruleModel } from './models/rule';
import { createRules, getAllRules, getRulesByAddress } from './services/rule';

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
    // const rule = new ruleModel({
    //   id: '0xf4212614C7Fe0B3feef75057E88b2E77a7E23e85',
    //   rules: [{ x: 1 }, { x: 2 }],
    // });
    // await rule.save();
    // const rule = await getAllRules();
    // await createRules({
    //   accountAddress: '0xf4212614C7Fe0B3feef75057E88b2E77a7E23e83',
    //   rules: [{ x: 1 }, { x: 2 }],
    // });
    // const rule = await getRulesByAddress(
    //   '0xf4212614C7Fe0B3feef75057E88b2E77a7E23e85'
    // );
    // console.log('rule: ', rule);
    // await ruleModel.scan().exec().then(console.log);
    // await seedDummyUsers({ count: 100 });
    // dynamoose.aws.ddb().deleteTable({ TableName: 'Rule' });
  } catch (error) {
    console.trace({ error: JSON.stringify(error, null, 2) });
  } finally {
    process.exit(0);
  }
})();
