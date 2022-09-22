import { uniqueID } from '../utilities';
import { userModel, type IUser } from '../models/user';

export async function createUser(address: string): Promise<IUser> {
  try {
    const newUser = await userModel.create({ id: uniqueID(), address });
    return newUser;
  } catch (error) {
    console.log('error in createUser(): ', { error });
    throw new Error('error in createUser(): ', { cause: error });
  }
}

export async function updateUser({ id, address }: IUser): Promise<IUser> {
  try {
    const user = await userModel.update({ id }, { address });
    return user;
  } catch (error) {
    console.log('error in updateUser(): ', { error });
    throw new Error('error in updateUser(): ', { cause: error });
  }
}

/**
 * If id is provided, get user by id, otherwise query by address
 */
export async function getUseByAddress(address: string) {
  try {
    const user = await userModel.query('address').eq(address).exec();
    return user;
  } catch (error) {
    console.log('error in getUser(): ', { error });
    throw new Error('error in getUser(): ', { cause: error });
  }
}

export async function getAllUsers(): Promise<IUser[]> {
  const users = await userModel.query().exec();
  return users;
}
