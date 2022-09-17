import * as React from 'react';
import styles from '../../styles/mezzanine.module.css';

function MenuItem(props: { link: string; menuName: string; }) {
    return <p className={styles['menu-item']}>
        <a href={props.link}>
            {props.menuName}
        </a>
    </p>
}

export default MenuItem;
