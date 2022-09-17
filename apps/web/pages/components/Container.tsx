import * as React from 'react';
import styles from '../../styles/container.module.css';
import homeStyles from '../../styles/Home.module.css';

function Container(props: {}) {
    return <div className={styles.container}>
        <div className={homeStyles.material}>
            this is a container
        </div>
    </div>
}

export default Container;
