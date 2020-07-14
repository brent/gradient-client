import React, { useState } from 'react';
import { api } from '../../api';
import { AppView, appViewType } from '../AppView';
import styles from './styles.module.css';
import { Link, Redirect } from 'react-router-dom';

export const LoginView = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('refresh')
      ? true
      : false
  });

  function handleFieldChange(e) {
    const val = e.target.value;

    switch (e.target.name) {
      case 'email':
        setEmail(val);
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
    const res = await api.logUserIn({ email, password });
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
            value={ email }
            onChange={ handleFieldChange }
            name='email'
            placeholder='Email'
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
          <p>have an account? <Link to="/signup">Sign up</Link></p>
        </form>
      </AppView>
    )
  );
}
