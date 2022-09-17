import * as React from 'react';
import styles from '../styles/mezzanine.module.css';
import { className_Icon } from '../utils/constants';
import ChainSelectPopup from './ChainSelectPopup';

function Web3Connect(props: {}) {
    return <div className='flex flex-row-reverse grow-[100] items-center justify-self-start text-sm'>
        {/* reverse order */}
        <img src='help.svg' className={className_Icon} />
        <img src='/notification.svg' className={className_Icon} />

        <span className={`${className_Icon} border-l border-solid border-custom-gray`}/>

        <div className='flex flex-row rounded-lg bg-white border-white mr-8 items-center' >
            <span className='px-2'>0.001ETH</span>
            <span className='bg-primary-alt rounded-lg p-1.5 px-2'>0x1234...1234</span>
        </div>

        <div id={styles['wallet-button']} className='flex flex-row rounded-lg bg-white p-1.5 border-white mr-8' >
            <img src='/EthLogo.png' id={styles['wallet-logo']} className='h-5 mr-2' />
            <img src='/down-arrow.svg' className='h-5' />
        </div>
        <div className='border-2 border-red-900 border-solid relative'>
            <ChainSelectPopup />
        </div>
    </div>
}

export default Web3Connect;
