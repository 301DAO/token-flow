export enum ActionType {
  MONEY_ACTION = 'MONEY_ACTION',
  ALERT_ACTION = 'ALERT_ACTION',
}

export interface ActionBaseModel {
  actionType: ActionType;
}

export interface MoneyActionModel extends ActionBaseModel {
  splitType: 'EVENLY' | 'BY_PERCENTAGE';
  subActions: MoneyStrategy[];
}

export enum MoneyStrategyType {
  DEPOSIT_TO_AAVE = 'DEPOSIT_TO_AAVE',
  SWAP_ON_UNISWAP = 'SWAP_ON_UNISWAP',
  TRANSFER = 'TRANSFER',
}

export interface MoneyStrategy {
  actionType: MoneyStrategyType;
  originationAddress: string;
  destinationAddress: string;

  // AAVE & UNI
  tokenInAddress: string;

  // UNISWAP
  tokenOutAddress?: string;

  // optional (not used)
  weight?: number;
}

export interface AlertActionModel extends ActionBaseModel {
  subActions: AlertStrategy[];
}

export interface AlertStrategy {
  actionType: 'EMAIL' | 'SMS' | 'PUSH_NOTIFICATION' | 'SLACK' | 'TELEGRAM' | 'DISCORD'; // etc
  message: string;
  title?: string;
  destinationPath: string;
}
