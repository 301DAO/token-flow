import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import * as React from 'react';
import {
    TriggerType,
    useSandboxFlowData,
} from '../../hooks/sandbox-flow-hooks';

function SequenceTrigger(props: {}) {
    const [sandboxFlowData, setSandboxFlowData] = useSandboxFlowData();

    if (sandboxFlowData === undefined || setSandboxFlowData === undefined) {
        return (
            <div className=" h-40 w-96 bg-neutral-100 rounded-2xl shadow border border-solid border-border-gray">
                <div className="flex flex-col ml-3 mt-3 min-h-full">
                    <p className="text-sm font-bold text-gray-500">Trigger</p>
                    <div className="flex flex-col items-center">
                        <div className="flex flex-row items-center">
                            <p>Connect wallet first to proceed</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className=" h-40 w-96 bg-neutral-100 rounded-2xl shadow border border-solid border-border-gray">
            <div className="flex flex-col ml-3 mt-3">
                <p className="text-sm font-bold text-gray-500">Trigger</p>
                <div className="flex flex-col items-center">
                    <FormControl className="w-60">
                        <InputLabel id="trigger-select-label">
                            Source
                        </InputLabel>
                        <Select
                            labelId="trigger-select-label"
                            id="trigger-select"
                            value={
                                sandboxFlowData.trigger
                                    ? sandboxFlowData.trigger.triggerType
                                    : 'DEFAULT'
                            }
                            defaultValue="DEFAULT"
                            label="Age"
                            onChange={event => {
                                event.target.value === 'DEFAULT'
                                    ? setSandboxFlowData({
                                          ...sandboxFlowData,
                                          trigger: undefined,
                                      })
                                    : setSandboxFlowData({
                                          ...sandboxFlowData,
                                          trigger: {
                                              triggerType: event.target
                                                  .value as TriggerType,
                                          },
                                      });
                            }}
                        >
                            <MenuItem value={TriggerType.RECEIVE_FUNDS}>
                                Wallet receiving funds...
                            </MenuItem>
                            <MenuItem
                                value={TriggerType.AMM_LP_LIQUIDITY_THRESHOLD}
                                disabled
                            >
                                Uniswap LP TVL thresholds...
                            </MenuItem>
                            <MenuItem value={TriggerType.AMM_LP_PRICE} disabled>
                                Uniswap LP prices...
                            </MenuItem>
                        </Select>
                    </FormControl>
                </div>
                {/* <p className='text-xs text-slate-700'>Setup your event triggering</p> */}
            </div>
        </div>
    );
}

export default SequenceTrigger;
