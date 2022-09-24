import React, { useReducer, createContext } from "react";
import { ActionBaseModel } from "../models/action-model";
import { FlowModel } from "../models/flow-model";
import { TriggerModel } from "../models/trigger-model";


const initialSandboxFlowData: FlowModel = { accountAddress: undefined, trigger: undefined, actions: [] };
type Action =
    | { type: 'SET_TRIGGER', payload: TriggerModel }
    | { type: 'SET_ACTIONS', payload: ActionBaseModel[] }
    | { type: 'SET_ACCOUNT_ADDRESS_CHAIN_ID', payload?: { accountAddress: string, chainId: number } };

const sandboxFlowReducer = (state: FlowModel, action: Action): FlowModel => {
    switch (action.type) {
        case 'SET_TRIGGER':
            return { ...state, trigger: action.payload };
        case 'SET_ACTIONS':
            return { ...state, actions: action.payload };
        case 'SET_ACCOUNT_ADDRESS_CHAIN_ID':
            return { ...state, accountAddress: action.payload?.accountAddress, chainId: action.payload?.chainId };
        default:
            return state;
    }
};

const SandboxFlowStore = ({ children }: { children: JSX.Element }) => {
    const [sandboxFlowDataState, sandboxFlowDataDispatch] = useReducer(sandboxFlowReducer, initialSandboxFlowData);

    return (
        <SandboxFlowContext.Provider value={[sandboxFlowDataState, sandboxFlowDataDispatch]}>
            {children}
        </SandboxFlowContext.Provider>
    );
}

export const SandboxFlowContext = createContext([initialSandboxFlowData, (action: Action) => { }] as [FlowModel, React.Dispatch<Action>]);

export default SandboxFlowStore;
