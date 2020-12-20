import React from 'react';
import styles from './styles.module.css';

const LogSentimentCta = ({ className, children, onClick }) => (
  <div className={className}>
    <button
      className={styles.logSentimentCtaBtn}
      onClick={ onClick }
    >{ children }</button>
  </div>
);

export {
  LogSentimentCta,
}
