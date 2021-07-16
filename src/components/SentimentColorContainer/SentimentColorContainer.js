import React from 'react';
import styles from './styles.module.css';

export const SentimentColorContainer = ({
  date,
  dayOfWeek,
  hexColor,
  children,
}) => {
  return (
    <div 
      className={ styles.sentimentColorContainer }
      style={{ backgroundColor: `#${hexColor}` }}
    >
      <p className={ styles.entryDate }>{ date }</p>
      <p className={ styles.entryDay }>{ dayOfWeek }</p>
      <p className={ styles.entryColor }>#{ hexColor }</p>
      { children }
    </div>
  );
}
