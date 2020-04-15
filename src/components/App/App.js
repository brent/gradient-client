import React from 'react';
import styles from './styles.module.css';

import { Header } from '../Header';
import { Footer } from '../Footer';

export const App = () => (
  <div className={ styles.app }>
    <Header />
    <h1>gradient</h1>
    <Footer />
  </div>
);
