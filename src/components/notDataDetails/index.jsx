'use client'

import React from 'react';
import { Empty } from 'antd';
import styles from './styleNoData.module.scss';

function NoDataDetails() {
    return (
        <div className={styles.noDataWrapper}>
            <div className={styles.centered}>
                <Empty description="Không có dữ liệu" />
            </div>
        </div>
    );
}

export default NoDataDetails;