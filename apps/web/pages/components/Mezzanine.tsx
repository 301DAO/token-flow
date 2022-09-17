import * as React from 'react';
import styles from '../../styles/mezzanine.module.css';
import homeStyles from '../../styles/Home.module.css';
import MenuItem from './MenuItem';
import Web3Connect from './Web3Connect';

function Mezzanine(props: {}) {
    return <div className={styles.mezzanine}>
        <div className={`${homeStyles.material} ${homeStyles['flex-row']}`}>
            <img src='/stats.svg' className={homeStyles.logo} />
            <MenuItem menuName='Recipes' link='' />
            <MenuItem menuName='Marketplace' link='' />
            <MenuItem menuName='Playground' link='' />
            <Web3Connect />
            {/* <MenuItem menuName='Recipes' link='' /> */}
        </div>
    </div>
}

export default Mezzanine;
