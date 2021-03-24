import React from 'react';
import styles from './styles.module.css';

const SentimentListItemMonth = ({
  color,
  dayDate,
  firstOfMonth,
  onClick,
}) => {
  const startingCol = dayDate === 1
    ?{ 'grid-column': `${firstOfMonth}` }
    : null;

  return (
    <li
      className={ styles.sentimentListItemMonth }
      style={{ background: `#${color}`, ...startingCol }}
      onClick={ onClick }
    >
      <h3 className={ styles.dayDate }>{ dayDate }</h3>
    </li>
  );
}

const SentimentListItemMonthBlank = ({
  dayDate,
  firstOfMonth,
}) => {
  const startingCol = dayDate === 1
    ? { 'grid-column': `${firstOfMonth}` }
    : null;

  return (
    <li
      className={ styles.sentimentListItemMonthBlank }
      style={{ ...startingCol }}
    >
      <h3 className={ styles.dayDate }>{ dayDate }</h3>
    </li>
  );
}

export {
  SentimentListItemMonth,
  SentimentListItemMonthBlank,
}
