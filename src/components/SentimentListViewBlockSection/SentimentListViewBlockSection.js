import React from 'react';
import styles from './styles.module.css';

const SentimentListViewBlockSection = ({
  title,
  children,
}) => (
  <div className={ styles.sentimentListViewBlockSection }>
    <h2 className={ styles.sectionHeading }>{ title }</h2>
    { children }
  </div>
);

export {
  SentimentListViewBlockSection,
}
