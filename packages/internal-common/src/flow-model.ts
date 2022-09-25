import { TriggerModel } from './trigger-model';
import { ActionBaseModel } from './action-model';
import { ChainId } from './constants/networks';

export interface FlowModel {
  accountAddress?: string;
  chainId?: ChainId;
  trigger?: TriggerModel;
  actions: ActionBaseModel[];

  // potentially can add more metadata here
  // such as name, description, created time, modified time, etc
}
