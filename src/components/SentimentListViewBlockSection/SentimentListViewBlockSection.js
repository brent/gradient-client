import React from 'react';
import { SentimentListItemFull } from '../SentimentListItemFull';
import { SentimentListItemCondensed } from '../SentimentListItemCondensed';
import { SentimentListItemMonth, SentimentListItemMonthBlank } from '../SentimentListItemMonth';
import { SentimentBlockAverage } from '../SentimentBlockAverage';
import moment from 'moment';
import styles from './styles.module.css';

const SentimentListViewBlockSection = ({
  range,
  monthNum,
  daysInMonth,
  entries,
  isLoading,
  onEntryClick,
}) => {
  const renderEntries = (entries, onEntryClick) => {
    let entryItems;

    if (getBlockType(range) === 'full') {
      entryItems = entries.map(entry => (
        <SentimentListItemFull
          key={ entry.id }
          entry={ entry }
          onClick={ (e) => onEntryClick(e, entry) }
        />
      ));
    } else if (getBlockType(range) === 'condensed') {
      entryItems = entries.map(entry => (
        <SentimentListItemCondensed
          key={ entry.id }
          entry={ entry }
          onClick={ (e) => onEntryClick(e, entry) }
        />
      ));
    } else if (getBlockType(range) === 'month') {
      const monthDays = (entries) => {
        let reversedEntries = [...entries].reverse();
        let monthCells = [];
        const firstOfMonth = moment(entries[0].date).startOf('month').day();

        for (let i = 1; i <= daysInMonth; i++) {
          const matchedEntry = reversedEntries.find((entry) => {
            return i === parseInt(moment(entry.date).format('D')) ? entry : null;
          });

          if (matchedEntry) {
            reversedEntries.shift();
            monthCells.push(
              <SentimentListItemMonth
                key={ i }
                color={ matchedEntry.color }
                dayDate={ i }
                firstOfMonth={ firstOfMonth }
                onClick={ (e) => onEntryClick(e, matchedEntry) }
              />
            );
          } else {
            monthCells.push(
              <SentimentListItemMonthBlank
                key={ i }
                dayDate={ i }
                firstOfMonth={ firstOfMonth }
              />
            );
          }
        }

        return monthCells;
      }

      entryItems = (
        <div className={ styles.entriesMonthWrapper }>
          <li className={ styles.weekDayHeading }>S</li>
          <li className={ styles.weekDayHeading }>M</li>
          <li className={ styles.weekDayHeading }>T</li>
          <li className={ styles.weekDayHeading }>W</li>
          <li className={ styles.weekDayHeading }>T</li>
          <li className={ styles.weekDayHeading }>F</li>
          <li className={ styles.weekDayHeading }>S</li>
          { monthDays(entries) }
        </div>
      );
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
