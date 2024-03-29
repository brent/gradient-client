import React from 'react';
import styles from './styles.module.css';
import moment from 'moment';

const SentimentListItemFull = ({
  entry: { id, color, sentiment, date },
  onClick: onClick,
}) => {
  const dayOfWeek = moment(date).format('dddd');
  const entryDate = moment(date).format('MMM Do, YYYY');

  return (
    <li
      key={id}
      className={styles.sentimentListItem}
      style={{ background: `#${color}` }}
      onClick={ onClick }
    >
      <h4 className={ styles.entryDate }>{ entryDate }</h4>
      <h3 className={ styles.dayOfWeek }>{ dayOfWeek }</h3>
    </li>
  );
}

export {
  SentimentListItemFull,
}
