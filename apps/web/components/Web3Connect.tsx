import * as React from 'react';
import styles from '../styles/mezzanine.module.css';
import homeStyles from '../styles/Home.module.css';
import { className_Icon } from '../utils/constants';

function Web3Connect(props: {}) {
    return <div className='flex flex-row-reverse grow-[100] items-center'>
        {/* reverse order */}
        <img src='help.svg' className={className_Icon} />
        <img src='/notification.svg' className={className_Icon} />

        <span className={`${className_Icon} border-black`}/>

        <div id={styles['wallet-button']} className='flex flex-row rounded-lg bg-white p-2 border-white mr-8' >
            <img src='/EthLogo.png' id={styles['wallet-logo']} className='h-5' />
            <img src='/down-arrow.svg' className='h-5' />
        </div>
    </div>
}

export default Web3Connect;
