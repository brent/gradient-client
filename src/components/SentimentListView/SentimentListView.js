import React, { useState } from 'react';

import { AppView, appViewType } from '../AppView';

import styles from './styles.module.css';

export const SentimentListView = () => {
  return (
    <AppView className={ styles.sentimentListView }>
      <h2>SentimentListView</h2>
    </AppView>
  );
}
