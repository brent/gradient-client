import React from 'react';

import { Header } from '../Header';
import { Footer } from '../Footer';

import styles from './styles.module.css';

export const AppView = ({ children, className, ...props }) => (
  <div className={ `${styles.appView} ${className}` }
    { ...props }
  >
    <Header />
    { children }
    <Footer />
  </div>
);
