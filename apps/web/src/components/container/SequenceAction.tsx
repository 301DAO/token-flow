import { Button } from '@mui/material';
import * as React from 'react';
import { SandboxFlowContext } from '../../hooks/sandbox-flow-store';
import { ActionBaseModel } from 'internal-common';
import AddActionModal from './actions/EditActionModal';

function SequenceAction(props: {}) {
  const [sandboxFlowData, sandboxFlowDataDispatch] = React.useContext(SandboxFlowContext);
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [currentDisplayActionIndex, setCurrentDisplayActionIndex] = React.useState<number | undefined>(undefined);

  if (sandboxFlowData.accountAddress === undefined || sandboxFlowData.trigger === undefined) {
    return (
      <div className="h-40 w-96 bg-neutral-100 rounded-2xl shadow border border-solid border-border-gray">
        <div className="flex flex-col ml-3 mt-3 min-h-full">
          <p className="text-sm font-bold text-gray-500">Actions</p>
          <div className="flex flex-col items-center">
            <div className="flex flex-row items-center">
              <p className='text-sm text-rose-800 mt-10'>Connect wallet or configure a trigger first</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-96 bg-neutral-100 rounded-2xl shadow border border-solid border-border-gray">
      <div className="flex flex-col ml-3 mt-3 min-h-full">
        <p className="text-sm font-bold text-gray-500 mb-8">Actions</p>
        {sandboxFlowData.actions.map((action: ActionBaseModel, index) => {
          return (
            <div className="flex flex-row items-center mb-4" key={index}>
              <p className="text-xs text-gray-500">{action.actionType}</p>
              <Button onClick={() => {
                setCurrentDisplayActionIndex(index);
                setShowEditModal(true);
              }}>Edit</Button>
              <Button onClick={() => {
                sandboxFlowDataDispatch({ type: 'REMOVE_ACTION', index });
                setCurrentDisplayActionIndex(undefined);
                setShowEditModal(false);
              }}>Remove</Button>
            </div>
          );
        })}
        {/* limiting actions to only two */}
        {sandboxFlowData.actions.length < 2 && <div className="flex flex-col items-center">
          <Button onClick={() => {
            setCurrentDisplayActionIndex(undefined);
            setShowEditModal(true);
          }}>Add Action</Button>
        </div>}
      </div>

      <AddActionModal showEditModal={showEditModal} setShowEditModal={setShowEditModal} actionIndex={currentDisplayActionIndex} />
    </div>
  );
}

export default SequenceAction;
