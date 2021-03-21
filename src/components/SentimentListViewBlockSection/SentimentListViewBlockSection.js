import React from 'react';
import { SentimentListItemFull } from '../SentimentListItemFull';
import { SentimentListItemCondensed } from '../SentimentListItemCondensed';
import { SentimentListItemMonth } from '../SentimentListItemMonth';
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
    let entryItems;

    if (getBlockType(range) === 'full') {
      entryItems = entries.map(entry => (
        <SentimentListItemFull
          key={entry.id}
          entry={entry}
          onClick={(e) => onEntryClick(e, entry)}
        />
      ));
    } else if (getBlockType(range) === 'condensed') {
      entryItems = entries.map(entry => (
        <SentimentListItemCondensed
          key={entry.id}
          entry={entry}
          onClick={(e) => onEntryClick(e, entry)}
        />
      ));
    } else if (getBlockType(range) === 'month') {
      entryItems = entries.map(entry => (
        <SentimentListItemMonth
          key={entry.id}
          entry={entry}
          onClick={(e) => onEntryClick(e, entry)}
        />
      ));
    } else {
      entryItems = null;
    }

    return entryItems;
  };

  const getSentimentValuesFromEntries = (entries) => {
    return entries.map((entry) => entry.sentiment);
  };

  const getBlockType = (range) => {
    let blockType;

    if (range === 'This week' || range === 'Last week') {
      blockType = 'full';
    } else if (range === 'This month') {
      blockType = 'condensed';
    } else {
      blockType = 'month';
    }

    return blockType;
  };

  const setBlockTypeClass = (range) => {
    const blockType = getBlockType(range);
    switch (blockType) {
      case 'full':
        return 'sentimentListViewBlockSection--full';
        break;
      case 'condensed':
        return 'sentimentListViewBlockSection--condensed';
        break;
      case 'month':
        return 'sentimentListViewBlockSection--month';
        break;
    }
  };

  const blockClasses = `${styles.sentimentListViewBlockSection} ${setBlockTypeClass(range)}`;

  return (
    <div className={ blockClasses }>
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
