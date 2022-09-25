export enum ActionType {
  MONEY_ACTION = 'MONEY_ACTION',
  ALERT_ACTION = 'ALERT_ACTION',
}

export enum MoneyStrategyType {
  DEPOSIT_TO_AAVE = 'DEPOSIT_TO_AAVE',
  SWAP_ON_UNISWAP = 'SWAP_ON_UNISWAP',
  TRANSFER_TO_ADDRESS = 'TRANSFER_TO_ADDRESS',
}

export enum SplitType {
  EVENLY = 'EVENLY',
  BY_PERCENTAGE = 'BY_PERCENTAGE',
}

// TBD, ignore for now
export enum AlertType {
  PIPEDREAM = 'PIPEDREAM',
  EPNS = 'EPNS',
}

export interface ActionBaseModel {
  actionType: ActionType;
}

export interface MoneyActionModel extends ActionBaseModel {
  splitType: SplitType;
  subActions: MoneyStrategy[];
}

export interface AlertActionModel extends ActionBaseModel {
  subActions: AlertStrategy[];
}

/** =================== sub strategies ===================
 * strategies here are sub components of actions
 *
 * For example, money action can have 3 different strategies
 * that distribute the money to 3 different places, in three
 * different ways.
 *
 * Alert action can have 3 different strategies that send
 * 3 different alerts to 3 different places.
 */
export interface MoneyStrategy {
  actionType: MoneyStrategyType;
  originationAddress: string;
  destinationAddress: string;

  // AAVE & UNI
  tokenInAddress: string;

  // UNISWAP
  tokenOutAddress?: string;

  // optional (not used because we only do EVENLY for now)
  weight?: number;
}

export interface AlertStrategy {
    alertType: AlertType;
    message: string;
    title?: string;
    destinationPath: string;

  // optional (not used)
  // deliveryCadence?: 'DAILY' | 'IMMEDIATELY';
}
