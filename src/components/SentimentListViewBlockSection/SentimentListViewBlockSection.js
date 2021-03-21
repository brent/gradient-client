import React from 'react';
import { SentimentListItem } from '../SentimentListItem';
import { SentimentBlockAverage } from '../SentimentBlockAverage';
import styles from './styles.module.css';

const SentimentListViewBlockSection = ({
  range,
  monthNum,
  entries,
  isLoading,
  onEntryClick,
}) => {
  const renderEntries = (entries, onEntryClick) => {
    return entries.map(entry => (
      <SentimentListItem
        key={entry.id}
        entry={entry}
        onClick={(e) => onEntryClick(e, entry)}
      />
    ));
  };

  const getSentimentValuesFromEntries = (entries) => {
    return entries.map((entry) => entry.sentiment);
  };

  return (
    <div className={ styles.sentimentListViewBlockSection }>
      <h2 className={ styles.sectionHeading }>{ range }</h2>
      { isLoading
        ? <p>Loading...</p>
        : renderEntries(entries, onEntryClick)
      }
      { entries.length > 1
        ? (
          <SentimentBlockAverage
            values={ getSentimentValuesFromEntries(entries) }
          />
        )
        : null
      }
    </div>
  );
};

export {
  SentimentListViewBlockSection,
}
