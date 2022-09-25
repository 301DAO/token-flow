export enum Evaluator {
  GREATER_THAN = 'GREATER_THAN',
  LESS_THAN = 'LESS_THAN',
  EQUALS_TO = 'EQUALS_TO',
}

export enum TriggerType {
  RECEIVE_FUNDS = 'RECEIVE_FUNDS',
  AMM_LP_LIQUIDITY_THRESHOLD = 'AMM_LP_LIQUIDITY_THRESHOLD',
  AMM_LP_PRICE = 'AMM_LP_PRICE',
}

export interface TriggerModel {
  triggerType: TriggerType;

  // 'RECEIVE_FUNDS' trigger
  receiveFrom?: string;
  receiveTokenAddress?: string;
  receiveTokenDecimal?: number;
  receiveTokenSymbol?: string;
  evaluator?: Evaluator;
  compareThreshold?: number;

  // 'AMM_LP_LIQUIDITY_THRESHOLD' trigger

  // 'AMM_LP_PRICE' trigger
}
