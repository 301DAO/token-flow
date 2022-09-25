import dynamoose from 'dynamoose';
import { Item } from 'dynamoose/dist/Item';
import type { JSONObject } from '../utilities';

export interface IRule {
  id: string;
  rules: Array<{
    id: string;
    rule: JSONObject;
  }>;
}

export class Rule extends Item implements IRule {
  id: string;
  rules: Array<{
    id: string;
    rule: JSONObject;
  }>;
}

export const ruleSchema = new dynamoose.Schema(
  {
    id: String,
    rules: {
      type: Array,

      schema: [
        {
          type: Object,
          schema: {
            id: String,
            rule: Object,
          },
        },
      ],
    },
  },
  { timestamps: true, saveUnknown: true }
);

export const ruleModel = dynamoose.model<Rule>('Rule', ruleSchema);
