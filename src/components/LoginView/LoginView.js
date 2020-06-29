import React, { useState } from 'react';
import { api } from '../../api';
import { AppView, appViewType } from '../AppView';
import styles from './styles.module.css';
import { Redirect } from 'react-router-dom';

export const LoginView = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('refresh')
      ? true
      : false
  });

  function handleFieldChange(e) {
    const val = e.target.value;

    switch (e.target.name) {
      case 'username':
        setUsername(val);
        break;
      case 'password':
        setPassword(val);
        break;
      default:
        return false;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await api.logUserIn({ username, password });
    localStorage.setItem('user', JSON.stringify(res.user));
    localStorage.setItem('access', res.tokens.access);
    localStorage.setItem('refresh', res.tokens.refresh);
    setIsLoggedIn(true);
  }

  return (
    isLoggedIn
    ? (<Redirect to='/' />)
    : (
      <AppView
        type={ appViewType.fullBleed }
        className={ styles.loginView }
      >
        <h2>LoginView</h2>
        <form onSubmit={ handleSubmit }>
          <input
            type='text'
            value={ username }
            onChange={ handleFieldChange }
            name='username'
            placeholder='Username'
          />
          <input
            type='password'
            value={ password }
            onChange={ handleFieldChange }
            name='password'
            placeholder='Password'
          />
          <button onClick={ handleSubmit }>
            Log in
          </button>
        </form>
      </AppView>
    )
  );
}
