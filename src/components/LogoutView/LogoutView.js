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
      <h2 className={ styles.logo }>Gradient</h2>
      <form onSubmit={ handleSubmit }>
        <button
          onClick={ handleSubmit }
          className={ styles.logoutSubmit }
        >
          Log out
        </button>
      </form>
    </AppView>
  );
}
