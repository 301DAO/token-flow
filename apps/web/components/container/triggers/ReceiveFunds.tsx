import { FormControl, MenuItem, Select, TextField } from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import * as React from 'react';
import { ChainId } from '../../../constants/networks';
import { TOKENS } from '../../../constants/tokens';
import { SandboxFlowContext } from '../../../hooks/sandbox-flow-store';
import { Evaluator, TriggerType } from '../../../models/flow-model';


function ReceiveFunds (props: {}) {
    const [sandboxFlowData, sandboxFlowDataDispatch] = React.useContext(SandboxFlowContext);
    const { account, library, chainId } = useWeb3React();

    if (sandboxFlowData.accountAddress === undefined || chainId === undefined) {
        return <></>;
    }

    return <div>
        <FormControl>
            <div className='flex flex-col'>
                <div className='flex flex-row items-center'>
                    <p>When you receive</p>
                    <Select
                        id="token-select"
                        value={sandboxFlowData.trigger ? sandboxFlowData.trigger.receiveTokenSymbol : 'DEFAULT'}
                        defaultValue='DEFAULT'
                        label="Token"
                        onChange={(event) => {
                            if (event.target.value !== 'DEFAULT') {
                                sandboxFlowDataDispatch({
                                    type: 'SET_TRIGGER',
                                    payload: {
                                        ...sandboxFlowData.trigger,
                                        triggerType: TriggerType.RECEIVE_FUNDS,
                                        receiveTokenAddress: TOKENS[event.target.value].addressMap[chainId as ChainId],
                                        receiveTokenDecimal: TOKENS[event.target.value].decimal,
                                        receiveTokenSymbol: TOKENS[event.target.value].symbol,
                                    }
                            });
                            }
                        }}
                    >
                        <MenuItem value='ETH' >ETH</MenuItem>
                        <MenuItem value='WETH'>WETH</MenuItem>
                        <MenuItem value='WBTC'>WBTC</MenuItem>
                        <MenuItem value='AAVE'>AAVE</MenuItem>
                        <MenuItem value='USDC'>USDC</MenuItem>
                        <MenuItem value='USDT'>USDT</MenuItem>
                    </Select>
                </div>
                <div className='flex flex-row items-center'>
                    <p>from</p>
                    <TextField id="from-address" value={sandboxFlowData.trigger?.receiveFrom} label="From Address" variant="outlined" onChange={(event) => {
                        sandboxFlowDataDispatch({
                            type: 'SET_TRIGGER',
                            payload: {
                                ...sandboxFlowData.trigger,
                                triggerType: TriggerType.RECEIVE_FUNDS,
                                receiveFrom: event.target.value as string
                            }
                        });
                    }} />
                    <p>with amount</p>
                </div>
                <div className='flex flex-row items-center'>
                    <Select
                        id="token-select"
                        value={sandboxFlowData.trigger?.evaluator ? sandboxFlowData.trigger.evaluator : 'DEFAULT'}
                        defaultValue='DEFAULT'
                        label="Evaluator"
                        onChange={(event) => {
                            if (event.target.value !== 'DEFAULT') {
                                sandboxFlowDataDispatch({
                                    type: 'SET_TRIGGER',
                                    payload: {
                                        ...sandboxFlowData.trigger,
                                        triggerType: TriggerType.RECEIVE_FUNDS,
                                        evaluator: event.target.value as Evaluator,
                                    }
                                });
                            }
                        }}
                    >
                        <MenuItem value={Evaluator.GREATER_THAN} >Greater than</MenuItem>
                        <MenuItem value={Evaluator.LESS_THAN}>Less than</MenuItem>
                        <MenuItem value={Evaluator.EQUALS_TO}>Equals to</MenuItem>
                    </Select>
                    <TextField id="value" label="Of value" value={sandboxFlowData.trigger?.compareThreshold} variant="outlined" onChange={
                        (event) => {
                            sandboxFlowDataDispatch({
                                type: 'SET_TRIGGER',
                                payload: {
                                    ...sandboxFlowData.trigger,
                                    triggerType: TriggerType.RECEIVE_FUNDS,
                                    compareThreshold: + event.target.value as number
                                }
                            });
                        }
                    }/>
                </div>
            </div>
        </FormControl>
    </div>
}

// receiveFrom?: string;
// receiveAmount?: number;
// receiveToken?: string;
// receiveTokenDecimal?: number;
// receiveTokenSymbol?: string;
// evaluator?: Evaluator;
// compareThreshold?: number;
export default ReceiveFunds;
