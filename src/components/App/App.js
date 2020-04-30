import React from 'react';
import styles from './styles.module.css';

import { SentimentCaptureView } from '../SentimentCaptureView';


export const App = () => {
  return (
    <div className={ styles.app } >
      <SentimentCaptureView />
    </div>
  );
}
