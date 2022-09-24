import * as React from 'react';

function SequenceTrigger (props: {}) {
    return <div className=' h-40 w-96 bg-neutral-100 rounded-2xl shadow border border-solid border-border-gray'>
        <div className='flex flex-col ml-3 mt-3'>
            <p className='text-sm font-bold text-gray-500'>Trigger</p>
            <div className='flex flex-col items-center'>
                <div ></div>
                <select name='Select your trigger' id='trigger-select' defaultValue='default' >
                    <option value='default' disabled selected >Select your option</option>
                    <option value='receiving-funds'>Wallet receiving funds...</option>
                    <option value='uniswap' disabled >Uniswap LP events...</option>
                </select>
            </div>
            {/* <p className='text-xs text-slate-700'>Setup your event triggering</p> */}
        </div>
    </div>;
}

export default SequenceTrigger;
