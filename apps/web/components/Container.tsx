import * as React from 'react';
import SequenceInterface from './SequenceInterface';


function Container(props: {}) {
    return <div className='rounded-t-3xl shadow relative -top-4 pb-4 px-5 bg-white grow z-10'>
        <div className='pt-1 min-w-full'>
            <div className='flex flex-col items-center'>
                <div className='h-40' />
                <div className=''>
                    <SequenceInterface/>
                </div>
            </div>
        </div>
    </div>
}

export default Container;
