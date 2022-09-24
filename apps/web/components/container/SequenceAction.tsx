import * as React from 'react';
import { useSandboxFlowData } from '../../hooks/sandbox-flow-hooks';

function SequenceAction (props: {}) {
    const [sandboxFlowData, setSandboxFlowData] = useSandboxFlowData();

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
        <div className='flex flex-col ml-3 mt-3'>
            <p className='text-sm font-bold text-gray-500'>Actions</p>
            {/* <p className='text-xs text-slate-700'>Setup multiple actions to execute after the event triggering</p> */}
        </div>
    </div>;
}

export default SequenceAction;
