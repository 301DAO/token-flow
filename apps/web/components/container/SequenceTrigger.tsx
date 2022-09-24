import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import * as React from 'react';
import { useSandboxFlowData } from '../../hooks/sandbox-flow-hooks';
import { TriggerType } from '../../models/flow-model';
import ReceiveFunds from './triggers/ReceiveFunds';


function EditTrigger(props: { triggerType: TriggerType }) {
    switch (props.triggerType) {
        case TriggerType.RECEIVE_FUNDS:
            return <ReceiveFunds />;
        default:
            return <></>;
    }
}

function SequenceTrigger() {
    const [showEditModal, setShowEditModal] = React.useState(false);
    const [sandboxFlowData, setSandboxFlowData] = useSandboxFlowData();

    // if flow data is undefined, it means user hasn't connected to wallet yet
    if (sandboxFlowData.accountAddress === undefined) {
        return <div className=' h-40 w-96 bg-neutral-100 rounded-2xl shadow border border-solid border-border-gray'>
            <div className='flex flex-col ml-3 mt-3 min-h-full'>
                <p className='text-sm font-bold text-gray-500 mb-4'>Trigger</p>
                <div className='flex flex-col items-center'>
                    <div className='flex flex-row items-center'>
                        <p>Connect wallet first to proceed</p>
                    </div>
                </div>
            </div>
        </div>;
    }

    return <div className='h-60 w-96 bg-neutral-100 rounded-2xl shadow border border-solid border-border-gray'>
        <div className='flex flex-col ml-3 mt-3'>
            <p className='text-sm font-bold text-gray-500 mb-4'>Trigger</p>
            <div className='flex flex-col items-center'>

                <FormControl className='w-60'>
                    <InputLabel id="trigger-select-label">Source</InputLabel>
                    <Select
                        labelId="trigger-select-label"
                        id="trigger-select"
                        value={sandboxFlowData.trigger ? sandboxFlowData.trigger.triggerType : 'DEFAULT'}
                        defaultValue='DEFAULT'
                        label="Age"
                        onChange={(event) => {
                            event.target.value === 'DEFAULT'
                                ? setSandboxFlowData({ ...sandboxFlowData, trigger: undefined })
                                : setSandboxFlowData({ ...sandboxFlowData, trigger: { triggerType: event.target.value as TriggerType } });
                            setShowEditModal(true);
                        }}
                    >
                        <MenuItem value={TriggerType.RECEIVE_FUNDS}>Wallet receiving funds...</MenuItem>
                        <MenuItem value={TriggerType.AMM_LP_LIQUIDITY_THRESHOLD} disabled >Uniswap LP TVL thresholds...</MenuItem>
                        <MenuItem value={TriggerType.AMM_LP_PRICE} disabled >Uniswap LP prices...</MenuItem>
                    </Select>

                    {(sandboxFlowData.trigger)
                        && <Dialog 
                            open={showEditModal}
                            onClose={() => setShowEditModal(false)}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <DialogTitle id="alert-dialog-title">
                                Setup conditions when you receive funds
                            </DialogTitle>
                            <DialogContent>
                                {/* <DialogContentText id="alert-dialog-description">
                                    Let Google help apps determine location. This means sending anonymous
                                    location data to Google, even when no apps are running.
                                </DialogContentText> */}
                                <EditTrigger triggerType={sandboxFlowData.trigger.triggerType} />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setShowEditModal(false)} autoFocus>
                                    Close
                                </Button>
                            </DialogActions>
                    </Dialog>}
                </FormControl>
            </div>
        </div>
    </div>;
}

export default SequenceTrigger;
