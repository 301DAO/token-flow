import { uniqueID } from '../utilities';
import { ruleModel, type IRule } from '../models/rule';

export async function createRule(rule: {
  userId: string;
  name: string;
  description: string;
  rules: Array<any>;
}): Promise<IRule> {
  try {
    const newRule = await ruleModel.create({
      id: uniqueID(),
      userId: rule.userId,
      name: rule.name,
      description: rule.description,
      rules: rule.rules,
    });
    return newRule;
  } catch (error) {
    console.log('error in createRule(): ', { error });
    throw new Error('error in createRule(): ', { cause: error });
  }
}

export async function getRuleById(id: string): Promise<IRule> {
  try {
    const rule = await ruleModel.get({ id });
    return rule;
  } catch (error) {
    console.log('error in getRuleById(): ', { error });
    throw new Error('error in getRuleById(): ', { cause: error });
  }
}

export async function getRulesByUserId(userId: string): Promise<IRule[]> {
  try {
    const rules = await ruleModel.query('userId').eq(userId).exec();
    return rules;
  } catch (error) {
    console.log('error in getRulesByUserId(): ', { error });
    throw new Error('error in getRulesByUserId(): ', { cause: error });
  }
}

export async function getAllRules(): Promise<IRule[]> {
  const rules = await ruleModel.query().exec();
  return rules;
}
