import React, { useState } from 'react';

import { AppView, appViewType } from '../AppView';

import styles from './styles.module.css';

export const LogoutView = () => {
  return (
    <AppView 
      type={ appViewType.fullBleed }
      className={ styles.logoutView }
    >
      <h2>LogoutView</h2>
    </AppView>
  );
}
