import React from 'react';

import { AppView, appViewType } from '../AppView';

import styles from './styles.module.css';

export const LogoutView = () => {
  function handleSubmit(e) {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('user');
  }

  return (
    <AppView
      type={ appViewType.fullBleed }
      className={ styles.logoutView }
    >
      <h2>LogoutView</h2>
      <form onSubmit={ handleSubmit }>
        <button onClick={ handleSubmit }>
          Log out
        </button>
      </form>
    </AppView>
  );
}
