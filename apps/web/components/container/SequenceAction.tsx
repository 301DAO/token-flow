import { Button } from '@mui/material';
import * as React from 'react';
import { SandboxFlowContext } from '../../hooks/sandbox-flow-store';
import { ActionBaseModel } from '../../models/action-model';


function SequenceAction (props: {}) {
    const [sandboxFlowData, sandboxFlowDataDispatch] = React.useContext(SandboxFlowContext);

    if (sandboxFlowData.accountAddress === undefined) {
        return <div className=' h-40 w-96 bg-neutral-100 rounded-2xl shadow border border-solid border-border-gray'>
            <div className='flex flex-col ml-3 mt-3 min-h-full'>
                <p className='text-sm font-bold text-gray-500'>Actions</p>
                <div className='flex flex-col items-center'>
                    <div className='flex flex-row items-center'>
                        <p>...</p>
                    </div>
                </div>
            </div>
        </div>;
    }

    return <div className=' h-40 w-96 bg-neutral-100 rounded-2xl shadow border border-solid border-border-gray'>
        <div className='flex flex-col ml-3 mt-3 min-h-full'>
            <p className='text-sm font-bold text-gray-500 mb-8'>Actions</p>
            <div className='flex flex-col items-center'>
                {sandboxFlowData.actions.map((action: ActionBaseModel, index) => {
                    return <div className='flex flex-row items-center mb-4' key={index}>
                        <p className='text-xs text-gray-500'>{action.actionType}</p>
                    </div>;
                })}
                <Button>➕ Add an action</Button>
            </div>
            {/* <p className='text-xs text-slate-700'>Setup multiple actions to execute after the event triggering</p> */}
        </div>
    </div>;
}

export default SequenceAction;
