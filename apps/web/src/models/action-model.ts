export enum ActionType {
    MONEY_ACTION = 'MONEY_ACTION',
    ALERT_ACTION = 'ALERT_ACTION'
}

export enum MoneyStrategyType {
    DEPOSIT_TO_AAVE = 'DEPOSIT_TO_AAVE',
    SWAP_ON_UNISWAP = 'SWAP_ON_UNISWAP',
    TRANSFER_TO_ADDRESS = 'TRANSFER_TO_ADDRESS'
}

export enum SplitType {
    EVENLY = 'EVENLY',
    BY_PERCENTAGE = 'BY_PERCENTAGE'
}

// TBD, ignored for now
export enum AlertType {
    EMAIL = 'EMAIL',
    TELEGRAM = 'TELEGRAM',
    SLACK = 'SLACK',
    SMS = 'SMS',
    DISCORD = 'DISCORD',
    PUSH_NOTIFICATION = 'PUSH_NOTIFICATION'
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

    // optional (not used)
    weight?: number;
}


export interface AlertStrategy {
    actionType: AlertType;
    message: string;
    title?: string;
    destinationPath: string;

    // optional (not used)
    // deliveryCadence?: 'DAILY' | 'IMMEDIATELY';
}
