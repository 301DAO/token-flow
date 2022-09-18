import * as React from 'react';
import SequenceInterface from './SequenceInterface';


function Container(props: {}) {
    return <div className='flex flex-col relative -top-4 z-10 pb-4 grow shadow bg-transparent min-w-full min-h-screen'>
        <div className='grid grid-cols-3 items-center rounded-t-3xl h-16 border-b border-solid border-border-gray bg-white min-w-full shadow'>
            <div className='flex flex-col ml-10'>
                <p className='text-lg'>Sandbox</p>
                <p className='text-xs text-slate-700'>Test out your ideas</p>
            </div>
            <div className='flex flex-col items-center'>
                <button className='h-10 bg-primary rounded-md mr-4 pr-4 text-sm font-light'>
                    <button className='h-10 bg-primary-bg rounded-md px-4 text-sm font-light border-2 border-solid border-primary'>Flow view</button>
                    <button className='h-10 bg-primary px-4 text-sm font-light text-white'>Editor</button>
                </button>

            </div>
            <div className='flex flex-row-reverse items-center grow shrink-0'>
                <button className='h-10 bg-slate-300 rounded-lg mr-4 px-4'><img src='turn-off.svg' className='h-5' /></button>
                <button className='h-10 bg-slate-300 rounded-lg mr-4 px-4'><img src='diskette.svg' className='h-5' /></button>
            </div>
        </div>

        <div className='flex flex-col items-center border-b border-solid border-border-gray shadow min-w-full bg-neutral-100 grow'>
            <div className='h-32' />
            <SequenceInterface/>
        </div>
    </div>;
}

export default Container;
