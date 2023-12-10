'use client'

import React from 'react';
import { Empty } from 'antd';
import styles from './styleNoData.module.scss';

function NoImage() {
    return (
        <div className={styles.noDataWrapper}>
            <div className={styles.centered}>
                <Empty description="No Image Selected !" />
            </div>
        </div>
    );
}

export default NoImage;