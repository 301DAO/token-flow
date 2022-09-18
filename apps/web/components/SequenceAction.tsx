import * as React from 'react';

function SequenceAction (props: {}) {
    return <div className=' h-40 w-96 bg-neutral-100 rounded-2xl shadow border border-solid border-border-gray'>
        <div className='flex flex-col ml-3 mt-3'>
            <p className='text-sm'>Actions</p>
            {/* <p className='text-xs text-slate-700'>Setup multiple actions to execute after the event triggering</p> */}
        </div>
    </div>;
}

export default SequenceAction;
