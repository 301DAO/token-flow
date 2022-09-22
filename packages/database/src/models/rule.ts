import dynamoose from 'dynamoose';
import { Item } from 'dynamoose/dist/Item';

export interface IRule {
  id: string;
  userId: string;
  name: string;
  description: string;
  rules: Array<any>;
}

export class Rule extends Item implements IRule {
  id: string;
  userId: string;
  name: string;
  description: string;
  rules: Array<any>;
}

export const ruleSchema = new dynamoose.Schema({
  id: String,
  userId: String,
  name: String,
  description: String,
  rules: {
    type: Array,
    schema: [
      {
        type: Object,
        schema: {
          id: String,
          rule: String,
        },
      },
    ],
  },
});

export const RuleModel = dynamoose.model<Rule>('Rule', ruleSchema);
