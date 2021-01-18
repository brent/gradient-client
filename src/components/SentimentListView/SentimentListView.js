import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AppView, appViewType } from '../AppView';
import { SentimentListItem } from '../SentimentListItem';
import { SentimentListViewBlockSection } from '../SentimentListViewBlockSection';
import { SentimentBlockAverage } from '../SentimentBlockAverage';
import { LogSentimentCta } from '../LogSentimentCta';
import * as api from '../../api';
import moment from 'moment';
import styles from './styles.module.css';

const SentimentListView = () => {
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const splitEntries = (entries) => {
      let lastSunday = getMostRecentSunday(entries[0].date);
      let entriesByWeek = [];
      let week = [];

      entries.forEach((entry) => {
        if (!moment(entry.date).isSameOrAfter(lastSunday, 'day')) {
          entriesByWeek.push(week);
          week = [];
          lastSunday = getMostRecentSunday(entry.date);
        }

        week.push(entry);
      });

      entriesByWeek.push(week);
      const months = entriesByMonth(entriesByWeek);
      let entriesThisWeek = [];
      let entriesLastWeek = [];
      let entriesThisMonth = [];

      const mostRecentMonth = months.shift();
      if (moment().week() - moment(mostRecentMonth.entries[0].date).week() >= 0) {
        const currentWeek = moment().week();
        mostRecentMonth.entries.forEach((entry) => {
          if (currentWeek - moment(entry.date).week() === 0) {
            entriesThisWeek.push(entry);
          } else if (currentWeek - moment(entry.date).week() === 1) {
            entriesLastWeek.push(entry);
          } else {
            entriesThisMonth.push(entry);
          }
        });
      } else {
        months.unshift(mostRecentMonth);
      }

      return [
        { range: 'This week', entries: entriesThisWeek },
        { range: 'Last week', entries: entriesLastWeek },
        { range: 'This month', entries: entriesThisMonth },
        ...months,
      ];
    };

    setIsLoading(true);
    getEntries(api)
      .then(entries => {
        const entriesByBlock = splitEntries(entries);
        setEntries(entriesByBlock);
        setIsLoading(false);
      })
      .catch(err => console.log(err));
  }, []);

  const getEntries = async (api) => {
    const entries = await api.getEntriesForUser();
    return entries;
  };

  const getMostRecentSunday = (date) => {
    const momentDate = moment(date);
    const lastSunday = momentDate.day(0);
    return lastSunday;
  };


  const entriesByMonth = (entriesByWeek) => {
    let months = [];
    let currentMonth = { range: '', monthNum: null, entries: [] };
    let monthName;
    let monthNum;

    entriesByWeek.forEach((week) => {
      if (currentMonth.entries.length > 0) {
        if (moment(currentMonth.entries[0].date).month() === moment(week[0].date).month()) {
          currentMonth.entries = [...currentMonth.entries, ...week];
        } else {
          months.push(currentMonth);
          monthName = moment(week[0].date).format('MMMM');
          monthNum = moment(week[0].date).month() + 1;
          currentMonth = { range: monthName, monthNum: monthNum, entries: week };
        }
      } else {
        monthName = moment(week[0].date).format('MMMM');
        monthNum = moment(week[0].date).month() + 1;
        currentMonth.range = monthName;
        currentMonth.monthNum = monthNum;
        currentMonth.entries = week;
      }
    });

    return months;
  };

  const getSentimentValuesFromEntries = (entries) => {
    return entries.map((entry) => entry.sentiment);
  };

  const renderEntryBlocks = (entries) => {
    return entries.map((entriesBlock) => {
      if (entriesBlock.entries.length > 0) {
        return (
          <SentimentListViewBlockSection
            title={ entriesBlock.range }
            key={ entries.indexOf(entriesBlock) }
          >
            { isLoading
                ? <p>Loading...</p>
                : renderEntries(entriesBlock.entries, handleEntryPress)
            }
            { entriesBlock.entries.length > 1
              ? (
                <SentimentBlockAverage
                  values={ getSentimentValuesFromEntries(entriesBlock.entries) }
                />
              )
              : null
            }
          </SentimentListViewBlockSection>
        )
      }
    });
  };

  const renderEntries = (entries, onClick) => {
    return entries.map(entry => (
      <SentimentListItem
        key={entry.id}
        entry={entry}
        onClick={(e) => onClick(e, entry)}
      />
    ));
  };

  const handleLogSentimentCtaPress = (e, history) => {
    e.preventDefault();
    history.push('/create');
  }

  const handleEntryPress = (e, entry) => {
    e.preventDefault();
    history.push({
      pathname: `/entry/${entry.id}`,
      state: { entry: entry }
    });
  };

  const renderLogSentimentCta = (props) => {
    if (entries.length > 0) {
      const lastEntryCreatedDate = moment(entries[0].created_at);
      const today = moment().startOf('day');

      if (lastEntryCreatedDate.date() < today.date()) {
        return <LogSentimentCta { ...props } />;
      }

      if (lastEntryCreatedDate.date() === today.date()) {
        if (moment().diff(today, 'hours', true) > 4) {
          return <LogSentimentCta { ...props } />;
        } 
      }
    }

    return <LogSentimentCta { ...props } />;
  }

  return (
    <AppView
      type={ appViewType.fullBleed }
      className={ styles.sentimentListView }
    >
      { renderEntryBlocks(entries) }
      {
        renderLogSentimentCta({
          className: styles.logSentimentCtaWrapper,
          onClick: (e) => handleLogSentimentCtaPress(e, history),
          children: 'Log my day',
        })
      }
    </AppView>
  );
}

export {
  SentimentListView,
}
