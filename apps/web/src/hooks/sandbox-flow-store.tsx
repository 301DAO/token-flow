import React, { useReducer, createContext } from 'react';
import { ActionModel, FlowModel, TriggerModel } from '../models/flow-model';

const initialSandboxFlowData: FlowModel = {
  accountAddress: undefined,
  trigger: undefined,
  actions: [],
};
type Action =
  | { type: 'SET_TRIGGER'; payload: TriggerModel }
  | { type: 'SET_ACTIONS'; payload: ActionModel[] }
  | { type: 'SET_ACCOUNT_ADDRESS'; payload?: string };

const sandboxFlowReducer = (state: FlowModel, action: Action): FlowModel => {
  switch (action.type) {
    case 'SET_TRIGGER':
      return { ...state, trigger: action.payload };
    case 'SET_ACTIONS':
      return { ...state, actions: action.payload };
    case 'SET_ACCOUNT_ADDRESS':
      return { ...state, accountAddress: action.payload };
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
