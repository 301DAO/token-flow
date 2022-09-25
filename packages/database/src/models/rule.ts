import dynamoose from 'dynamoose';
import { Item } from 'dynamoose/dist/Item';
import type { JSONObject } from '../utilities';

export interface IRule {
  accountAddress: string;
  rules: Array<{
    id: string;
    rule: JSONObject;
  }>;
}

export class Rule extends Item implements IRule {
  accountAddress: string;
  rules: Array<{
    id: string;
    rule: JSONObject;
  }>;
}

export const ruleSchema = new dynamoose.Schema(
  {
    accountAddress: { type: String, hashKey: true },
    rules: {
      type: Array,
      schema: [
        {
          id: { type: String, required: true },
          rule: Object,
        },
      ],
    },
  },
  { timestamps: true }
);

export const ruleModel = dynamoose.model<Rule>('Rule', ruleSchema);
