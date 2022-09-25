import * as React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  MenuItem,
  Select,
} from '@mui/material';
import {
  ActionBaseModel,
  ActionType,
  AlertActionModel,
  AlertStrategy,
  MoneyActionModel,
  MoneyStrategy,
} from 'internal-common';
import { SandboxFlowContext } from '../../../hooks/sandbox-flow-store';
import AlertActionEdit from './AlertActionEdit';
import MoneyActionEdit from './MoneyActionEdit';

interface EditActionModalProps {
  showEditModal: boolean;
  setShowEditModal: (flag: boolean) => void;
  actionIndex?: number;
}

export function hasActionType(
  actionTypeTargate: ActionType,
  allActions: ActionBaseModel[]
): boolean {
  return allActions.some((action) => action.actionType === actionTypeTargate);
}

const EditActionModal = function ({
  showEditModal,
  setShowEditModal,
  actionIndex,
}: EditActionModalProps) {
  const [sandboxFlowData, sandboxFlowDataDispatch] = React.useContext(SandboxFlowContext);
  const [action, setAction] = React.useState<ActionBaseModel | undefined>(
    actionIndex === undefined ? undefined : sandboxFlowData.actions[actionIndex]
  );

  React.useEffect(() => {
    if (actionIndex === undefined) {
      setAction(undefined);
    } else {
      setAction(sandboxFlowData.actions[actionIndex]);
    }
  }, [actionIndex, sandboxFlowData.actions]);

  return (
    <Dialog
      PaperProps={{
        sx: {
          height: '95%',
          minWidth: '48%',
        },
      }}
      open={showEditModal}
      onClose={() => setShowEditModal(false)}
      aria-labelledby="edit-modal"
      aria-describedby="modal-description"
    >
      <DialogTitle id="alert-dialog-title">What to do when conditions above are met</DialogTitle>
      <DialogContent className="h-96">
        <FormControl className="h-96">
          <Select
            className="w-80"
            variant="standard"
            labelId="action-type-select"
            id="action-type-select"
            value={action?.actionType || 'DEFAULT'}
            defaultValue="DEFAULT"
            label="Action type"
            onChange={(event) => {
              if (event.target.value !== 'DEFAULT') {
                setAction({
                  actionType: event.target.value as ActionType,
                });
              }
            }}
          >
            <MenuItem value="DEFAULT" disabled>
              {' '}
            </MenuItem>
            <MenuItem
              value={ActionType.ALERT_ACTION}
              disabled={
                hasActionType(ActionType.ALERT_ACTION, sandboxFlowData.actions) &&
                action?.actionType !== ActionType.ALERT_ACTION
              }
            >
              Send alerts / notifications
            </MenuItem>
            {
              <MenuItem
                value={ActionType.MONEY_ACTION}
                disabled={
                  hasActionType(ActionType.MONEY_ACTION, sandboxFlowData.actions) &&
                  action?.actionType !== ActionType.MONEY_ACTION
                }
              >
                Transfer / Swap / Yield Deposit
              </MenuItem>
            }
          </Select>

          {action?.actionType === ActionType.ALERT_ACTION && (
            <AlertActionEdit
              strategies={(action as AlertActionModel).subActions || []}
              setStrategies={(strategies: AlertStrategy[]) => {
                if (actionIndex !== undefined && action !== undefined) {
                  sandboxFlowDataDispatch({
                    type: 'EDIT_ACTION',
                    payload: {
                      ...action,
                      subActions: strategies,
                    } as AlertActionModel,
                    index: actionIndex,
                  });
                }
              }}
            />
          )}
          {action?.actionType === ActionType.MONEY_ACTION && (
            <MoneyActionEdit
              strategies={(action as MoneyActionModel).subActions || []}
              setStrategies={(strategies: MoneyStrategy[]) => {
                if (actionIndex !== undefined && action !== undefined) {
                  sandboxFlowDataDispatch({
                    type: 'EDIT_ACTION',
                    payload: {
                      ...action,
                      subActions: strategies,
                    } as MoneyActionModel,
                    index: actionIndex,
                  });
                }
              }}
            />
          )}
        </FormControl>
      </DialogContent>
      <DialogActions>
        <button
          className="bg-green-200 hover:bg-green-300 rounded-lg m-2 p-2"
          onClick={() => {
            if (action) {
              setShowEditModal(false);
              if (actionIndex !== undefined) {
                sandboxFlowDataDispatch({
                  type: 'EDIT_ACTION',
                  payload: action,
                  index: actionIndex,
                });
              } else {
                sandboxFlowDataDispatch({
                  type: 'ADD_ACTION',
                  payload: action,
                });
              }
            }
          }}
        >
          <img src="diskette.svg" className="h-6 w-6" />
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default EditActionModal;
