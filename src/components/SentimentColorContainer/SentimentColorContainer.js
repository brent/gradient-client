import React from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import styles from './styles.module.css';

export const SentimentColorContainer = ({
  monthNum,
  yearNum,
  dateString,
  dayOfWeek,
  hexColor,
  children,
}) => {
  const history = useHistory();

  const handleMonthButtonPress = (e, history) => {
    e.preventDefault();
    history.push(`/month/${yearNum}/${monthNum}`);
  }

  return (
    <div 
      className={ styles.sentimentColorContainer }
      style={{ backgroundColor: `#${hexColor}` }}
    >
      <div className={ styles.entryDateWrapper }>
        <p className={ styles.entryDate }>{ dateString }</p>
      </div>
      <p className={ styles.entryDay }>{ dayOfWeek }</p>
      <p className={ styles.entryColor }>#{ hexColor }</p>
      { children }
    </div>
  );
}
