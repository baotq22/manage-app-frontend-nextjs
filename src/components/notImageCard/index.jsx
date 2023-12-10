'use client'

import React from 'react';
import { Empty } from 'antd';
import styles from './styleNoData.module.scss';

function NoImageCard () {
    return (
        <div className={styles.noDataWrapper}>
            <div className={styles.centered}>
                <Empty description={<span style={{color:'#8a8b8f'}}> No Cover Image Selected !</span>} />
            </div>
        </div>
    );
}

export default NoImageCard ;