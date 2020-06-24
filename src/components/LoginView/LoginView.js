import React, { useState } from 'react';

import { AppView, appViewType } from '../AppView';

import styles from './styles.module.css';

export const LoginView = () => {
  return (
    <AppView 
      type={ appViewType.fullBleed }
      className={ styles.loginView }
    >
      <h2>LoginView</h2>
    </AppView>
  );
}
