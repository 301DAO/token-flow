import React, { useReducer, createContext } from 'react';
import { ActionBaseModel } from 'internal-common';
import { TriggerModel } from 'internal-common';
import { FlowModel } from 'internal-common';

const initialSandboxFlowData: FlowModel = {
  accountAddress: undefined,
  trigger: undefined,
  actions: [],
};
type Action =
  | { type: 'SET_TRIGGER'; payload: TriggerModel }
  | { type: 'SET_ACTIONS'; payload: ActionBaseModel[] }
  | { type: 'ADD_ACTION'; payload: ActionBaseModel }
  | { type: 'EDIT_ACTION'; payload: ActionBaseModel, index: number }
  | { type: 'REMOVE_ACTION', index: number }
  | { type: 'SET_ACCOUNT_ADDRESS_CHAIN_ID'; payload?: { accountAddress: string; chainId: number } };

const sandboxFlowReducer = (state: FlowModel, action: Action): FlowModel => {
  switch (action.type) {
    case 'SET_TRIGGER':
      return { ...state, trigger: action.payload };
    case 'SET_ACTIONS':
      return { ...state, actions: action.payload };
    case 'ADD_ACTION':
      return { ...state, actions: [...state.actions, action.payload] };
    case 'EDIT_ACTION':
      return { ...state, actions: state.actions.map((existingAction, index) => {
        if (index === action.index) {
          return action.payload;
        }
        return existingAction;
      }) };
    case 'REMOVE_ACTION':
      return { ...state, actions: state.actions.filter((_, index) => index !== action.index) };
    case 'SET_ACCOUNT_ADDRESS_CHAIN_ID':
      return {
        ...state,
        accountAddress: action.payload?.accountAddress,
        chainId: action.payload?.chainId,
      };
    default:
      return state;
  }
};

const SandboxFlowStore = ({ children }: { children: JSX.Element }) => {
  const [sandboxFlowDataState, sandboxFlowDataDispatch] = useReducer(
    sandboxFlowReducer,
    initialSandboxFlowData
  );

  return (
    <SandboxFlowContext.Provider value={[sandboxFlowDataState, sandboxFlowDataDispatch]}>
      {children}
    </SandboxFlowContext.Provider>
  );
};

export const SandboxFlowContext = createContext([
  initialSandboxFlowData,
  (action: Action) => {},
] as [FlowModel, React.Dispatch<Action>]);

export default SandboxFlowStore;
