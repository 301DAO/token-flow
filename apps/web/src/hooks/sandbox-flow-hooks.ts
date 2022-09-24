// import { useWeb3React } from '@web3-react/core';
import { useState } from 'react';
import { useAccount } from 'wagmi';

export enum TriggerType {
    RECEIVE_FUNDS = 'RECEIVE_FUNDS',
    AMM_LP_LIQUIDITY_THRESHOLD = 'AMM_LP_LIQUIDITY_THRESHOLD',
    AMM_LP_PRICE = 'AMM_LP_PRICE',
}

export type Evaluator = 'GREATER_THAN' | 'LESS_THAN' | 'EQUALS';

export interface TriggerModel {
    triggerType: TriggerType;

    // 'RECEIVE_FUNDS' trigger
    receiveFrom?: string;
    receiveAmount?: number;
    receiveToken?: string;
    receiveTokenDecimal?: number;
    receiveTokenSymbol?: string;
    evaluator?: Evaluator;

    // 'AMM_LP_LIQUIDITY_THRESHOLD' trigger

    // 'AMM_LP_PRICE' trigger
}

export interface ActionModel {}

export interface FlowModel {
    accountAddress: string;
    trigger?: TriggerModel;
    actions?: ActionModel[];
}

export function useSandboxFlowData(): [
    FlowModel | undefined,
    ((flow: FlowModel) => void) | undefined
] {
    const { address, isConnecting, isConnected, isDisconnected } = useAccount();

    const [sandboxFlowData, setSandboxFlowData] = useState<FlowModel>({
        accountAddress: address || '',
    });

    return isConnected && !!address
        ? [sandboxFlowData, setSandboxFlowData]
        : [undefined, undefined];
}
