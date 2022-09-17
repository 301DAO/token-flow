import * as React from 'react';
import styles from '../../styles/mezzanine.module.css';
import homeStyles from '../../styles/Home.module.css';

function Web3Connect(props: {}) {
    return <div className={`${styles['web3-connect']} ${homeStyles['flex-row-reverse']}`}>
        {/* reverse order */}
        <img src='help.svg' className={homeStyles.icon} />
        <img src='/notification.svg' className={homeStyles.icon} />
        <span style={{ 
            borderLeft: '1px solid #B2D7B6',
        }} className={homeStyles.icon}/>

        <div id={styles['wallet-button']} className={`${homeStyles['round-button']} ${homeStyles['flex-row']} ${homeStyles['space-right']}`}>
            <img src='/EthLogo.png' id={styles['wallet-logo']} className={homeStyles['icon-no-padding']} />
            <img src='/down-arrow.svg' className={homeStyles['icon-no-padding']} />
        </div>
    </div>
}

export default Web3Connect;
