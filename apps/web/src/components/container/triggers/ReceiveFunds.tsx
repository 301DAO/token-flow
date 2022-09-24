import { FormControl, MenuItem, Select, TextField } from '@mui/material';
import * as React from 'react';
import { ChainId } from '../../../constants/networks';
import { TOKENS } from '../../../constants/tokens';
import { SandboxFlowContext } from '../../../hooks/sandbox-flow-store';
import { Evaluator, TriggerType } from '../../../models/trigger-model';
import { useNetwork, useAccount } from 'wagmi';

function ReceiveFunds(props: {}) {
  const [sandboxFlowData, sandboxFlowDataDispatch] = React.useContext(SandboxFlowContext);
  const { chain } = useNetwork();
  const { address, isConnected } = useAccount();

  if (address === undefined || chain?.id === undefined || !isConnected) {
    return <></>;
  }

  return (
    <div>
      <FormControl>
        <div className="flex flex-col">
          <div className="flex flex-row items-center mb-10">
            <p className="text-sm text-slate-800">When you receive</p>
            <Select
              id="token-select"
              value={
                sandboxFlowData.trigger ? sandboxFlowData.trigger.receiveTokenSymbol : 'DEFAULT'
              }
              defaultValue="DEFAULT"
              className="ml-4 mr-4 w-20"
              variant="standard"
              label="Token"
              required
              onChange={(event) => {
                if (event.target.value !== 'DEFAULT') {
                  sandboxFlowDataDispatch({
                    type: 'SET_TRIGGER',
                    payload: {
                      ...sandboxFlowData.trigger,
                      triggerType: TriggerType.RECEIVE_FUNDS,
                      receiveTokenAddress:
                        event.target.value === 'ETH'
                          ? undefined
                          : TOKENS[event.target.value].addressMap[chain.id as ChainId],
                      receiveTokenDecimal:
                        event.target.value === 'ETH'
                          ? undefined
                          : TOKENS[event.target.value].decimal,
                      receiveTokenSymbol:
                        event.target.value === 'ETH' ? 'ETH' : TOKENS[event.target.value].symbol,
                    },
                  });
                }
              }}
            >
              <MenuItem value="DEFAULT" disabled>
                {' '}
              </MenuItem>
              <MenuItem value="ETH">ETH</MenuItem>
              <MenuItem value="WETH">WETH</MenuItem>
              <MenuItem value="WBTC">WBTC</MenuItem>
              <MenuItem value="AAVE">AAVE</MenuItem>
              <MenuItem value="USDC">USDC</MenuItem>
              <MenuItem value="USDT">USDT</MenuItem>
            </Select>
          </div>
          <div className="flex flex-row items-center mb-10">
            <p className="px-4 text-sm text-slate-800">
              from <i className="text-xs">(optional)</i>
            </p>
            <TextField
              id="from-address"
              className="px-10 w-96"
              value={sandboxFlowData.trigger?.receiveFrom || ''}
              variant="standard"
              onChange={(event) => {
                sandboxFlowDataDispatch({
                  type: 'SET_TRIGGER',
                  payload: {
                    ...sandboxFlowData.trigger,
                    triggerType: TriggerType.RECEIVE_FUNDS,
                    receiveFrom: event.target.value as string,
                  },
                });
              }}
            />
          </div>
          <div className="flex flex-row items-center">
            <p className="text-sm text-slate-800">
              with amount <i className="text-xs">(optional)</i>
            </p>
            <Select
              id="token-amount-threshold-evaluator-select"
              value={
                sandboxFlowData.trigger?.evaluator ? sandboxFlowData.trigger.evaluator : 'DEFAULT'
              }
              variant="standard"
              defaultValue="DEFAULT"
              className="w-40 ml-4 mr-4"
              label="Evaluator"
              onChange={(event) => {
                if (event.target.value !== 'DEFAULT') {
                  sandboxFlowDataDispatch({
                    type: 'SET_TRIGGER',
                    payload: {
                      ...sandboxFlowData.trigger,
                      triggerType: TriggerType.RECEIVE_FUNDS,
                      evaluator: event.target.value as Evaluator,
                    },
                  });
                } else {
                  sandboxFlowDataDispatch({
                    type: 'SET_TRIGGER',
                    payload: {
                      ...sandboxFlowData.trigger,
                      triggerType: TriggerType.RECEIVE_FUNDS,
                      evaluator: undefined,
                    },
                  });
                }
              }}
            >
              <MenuItem value="DEFAULT"> </MenuItem>
              <MenuItem value={Evaluator.GREATER_THAN}>Greater than</MenuItem>
              <MenuItem value={Evaluator.LESS_THAN}>Less than</MenuItem>
              <MenuItem value={Evaluator.EQUALS_TO}>Equals to</MenuItem>
            </Select>
            <TextField
              id="value"
              value={sandboxFlowData.trigger?.compareThreshold || ''}
              type="number"
              variant="standard"
              onChange={(event) => {
                sandboxFlowDataDispatch({
                  type: 'SET_TRIGGER',
                  payload: {
                    ...sandboxFlowData.trigger,
                    triggerType: TriggerType.RECEIVE_FUNDS,
                    compareThreshold: +event.target.value as number,
                  },
                });
              }}
            />
          </div>
        </div>
      </FormControl>
    </div>
  );
}

// receiveFrom?: string;
// receiveAmount?: number;
// receiveToken?: string;
// receiveTokenDecimal?: number;
// receiveTokenSymbol?: string;
// evaluator?: Evaluator;
// compareThreshold?: number;
export default ReceiveFunds;
