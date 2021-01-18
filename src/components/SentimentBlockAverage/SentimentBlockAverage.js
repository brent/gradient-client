import React from 'react';
import GradientGenerator from '../../utils/GradientGenerator/GradientGenerator';
import styles from './styles.module.css';

const SentimentBlockAverage = ({ values }) => {
  const sumSentiment = values.reduce((acc, value) => acc + value);
  const colors = GradientGenerator.generate('#E0AF30', '#40AD7E', 100);
  const avgSentiment = Math.round(sumSentiment/values.length);

  return (
    <div className={ styles.sentimentBlockAverage }>
      <p>
        <span
          className={ styles.sentimentColorTile }
          style={{ background: `${colors[avgSentiment]}` }}
        >{ colors[avgSentiment] }</span>
        { values.length } day average
      </p>
    </div>
  );
};

export {
  SentimentBlockAverage,
}
