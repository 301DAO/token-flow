import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";


export enum TriggerType {
    RECEIVE_FUNDS = 'RECEIVE_FUNDS',
    AMM_LP_LIQUIDITY_THRESHOLD = 'AMM_LP_LIQUIDITY_THRESHOLD',
    AMM_LP_PRICE = 'AMM_LP_PRICE'
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

export interface ActionModel {

}

export interface FlowModel {
    accountAddress?: string;
    trigger?: TriggerModel;
    actions?: ActionModel[];
}

export function useSandboxFlowData(): [FlowModel, (flow: FlowModel) => void] {
    const [sandboxFlowData, setSandboxFlowData] = useState<FlowModel>({ accountAddress: undefined });

    const { account, library, chainId } = useWeb3React();

    useEffect(() => {
        if (!!account && !!library) {
            setSandboxFlowData({ ...sandboxFlowData, accountAddress: account });
        }
    }, [account, library]); // intentionally only running on mount (make sure it's only mounted once :))

    return [sandboxFlowData, setSandboxFlowData];
};
