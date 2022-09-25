import { uniqueID, type JSONObject } from '../utilities';
import { ruleModel, type IRule } from '../models/rule';

export async function createRules({
  accountAddress,
  rules,
}: {
  accountAddress: string;
  rules: JSONObject[];
}): Promise<IRule> {
  try {
    const newRules = new ruleModel({
      id: accountAddress,
      rules: rules.map(rule => ({
        id: uniqueID(),
        rule: rule,
      })),
    });
    await newRules.save();
    return newRules;
  } catch (error) {
    console.log('error in createRules(): ', {
      error: JSON.stringify(error, null, 2),
    });
    throw new Error('error in createRules(): ', { cause: error });
  }
}

export async function getRulesByAddress(
  accountAddress: string
): Promise<IRule> {
  try {
    const rule = await ruleModel.get(accountAddress);
    console.log('rule: ', rule);
    return rule;
  } catch (error) {
    console.log('error in getRulesByAddress(): ', { error });
    throw new Error('error in getRulesByAddress(): ', { cause: error });
  }
}

export async function getAllRules(): Promise<IRule[]> {
  const rules = await ruleModel.scan().exec();
  return rules;
}
