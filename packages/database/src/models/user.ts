import dynamoose from 'dynamoose';
import { Item } from 'dynamoose/dist/Item';

export interface IUser {
  id: string;
  address: string;
}

export class User extends Item implements IUser {
  id: string;
  address: string;
}

export const userSchema = new dynamoose.Schema(
  {
    id: String,
    address: {
      type: String,
      required: true,
      index: true,

    },
  },
  {
    timestamps: true,
  }
);

export const userModel = dynamoose.model<User>('User', userSchema);
