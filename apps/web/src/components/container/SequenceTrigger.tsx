import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import * as React from 'react';
import { SandboxFlowContext } from '../../hooks/sandbox-flow-store';
import { TriggerType } from '../../models/trigger-model';
import { shortenString } from '../../utils/string-manipulation';
import ReceiveFunds from './triggers/ReceiveFunds';

function EditTrigger(props: { triggerType?: TriggerType }) {
  switch (props.triggerType) {
    case TriggerType.RECEIVE_FUNDS:
      return <ReceiveFunds />;
    default:
      return <></>;
  }
}

function VerbalizeTrigger() {
  const [sandboxFlowData, sandboxFlowDataDispatch] = React.useContext(SandboxFlowContext);

  if (sandboxFlowData.trigger === undefined) {
    return <></>;
  }

  const { receiveFrom, receiveTokenSymbol, evaluator, compareThreshold } = sandboxFlowData.trigger;

  switch (sandboxFlowData.trigger.triggerType) {
    case TriggerType.RECEIVE_FUNDS:
      if (receiveTokenSymbol === undefined) {
        return <p className='text-sm text-rose-800'>
          No rules configured, click edit button to configure
        </p>;
      } else {
        return (
          <p className="text-sm text-slate-600">
            This flow will execute whenever this wallet receives{' '}
            {evaluator && compareThreshold
              ? `${evaluator.toLowerCase().replaceAll('_', ' ')} ${compareThreshold} token of `
              : ''}
            {receiveTokenSymbol}
            {receiveFrom ? ` from ${shortenString(receiveFrom, 6)}` : ''}
          </p>
        );
      }
    default:
      return <></>;
  }
}

function SequenceTrigger() {
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [sandboxFlowData, sandboxFlowDataDispatch] = React.useContext(SandboxFlowContext);

  // if flow data is undefined, it means user hasn't connected to wallet yet
  if (sandboxFlowData.accountAddress === undefined) {
    return (
      <div className=" h-40 w-96 bg-neutral-100 rounded-2xl shadow border border-solid border-border-gray">
        <div className="flex flex-col ml-3 mt-3 min-h-full">
          <p className="text-sm font-bold text-gray-500 mb-4">Trigger</p>
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
    <div className="h-60 w-96 bg-neutral-100 rounded-2xl shadow border border-solid border-border-gray">
      <div className="flex flex-col ml-3 mt-3">
        <p className="text-sm font-bold text-gray-500 mb-4">Trigger</p>
        <div className="flex flex-col items-center">
          <FormControl className="w-60">
            <InputLabel id="trigger-select-label">When</InputLabel>
            <Select
              labelId="trigger-select-label"
              id="trigger-select"
              value={sandboxFlowData.trigger ? sandboxFlowData.trigger.triggerType : 'DEFAULT'}
              defaultValue="DEFAULT"
              label="Age"
              onChange={(event) => {
                if (event.target.value !== 'DEFAULT') {
                  sandboxFlowDataDispatch({
                    type: 'SET_TRIGGER',
                    payload: { triggerType: event.target.value as TriggerType },
                  });
                }
                setShowEditModal(true);
              }}
            >
              <MenuItem value="DEFAULT" disabled>
                {' '}
              </MenuItem>
              <MenuItem value={TriggerType.RECEIVE_FUNDS}>wallet receiving funds...</MenuItem>
              <MenuItem value={TriggerType.AMM_LP_LIQUIDITY_THRESHOLD} disabled>
                Uniswap LP TVL thresholds...
              </MenuItem>
              <MenuItem value={TriggerType.AMM_LP_PRICE} disabled>
                Uniswap LP prices...
              </MenuItem>
            </Select>

            {sandboxFlowData.trigger && (
              <Button onClick={() => setShowEditModal(true)} autoFocus>
                🖌️ Edit
              </Button>
            )}

            <VerbalizeTrigger />

            <Dialog
              // className='w-96'
              open={showEditModal}
              fullWidth
              onClose={() => setShowEditModal(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <DialogTitle id="alert-dialog-title">
                Setup conditions when you receive funds
              </DialogTitle>
              <DialogContent>
                <EditTrigger triggerType={sandboxFlowData.trigger?.triggerType} />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setShowEditModal(false)} autoFocus>
                  Looks good!
                </Button>
              </DialogActions>
            </Dialog>
          </FormControl>
        </div>
      </div>
    </div>
  );
}

export default SequenceTrigger;
