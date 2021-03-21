import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AppView, appViewType } from '../AppView';
import { SentimentListViewBlockSection } from '../SentimentListViewBlockSection';
import { LogSentimentCta } from '../LogSentimentCta';
import * as api from '../../api';
import moment from 'moment';
import styles from './styles.module.css';

const SentimentListView = () => {
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const splitEntriesByMonth = (entries) => {
      let months = [];
      let mostRecentMonth = moment(entries[0].date).month();
      let currentMonth = {
        range: `${moment(entries[0].date).format('MMMM')}`,
        monthNum: mostRecentMonth,
        entries: [],
      };

      entries.forEach((entry) => {
        if (moment(entry.date).month() === mostRecentMonth) {
          currentMonth.entries = [...currentMonth.entries, entry];
        } else {
          months.push(currentMonth);
          mostRecentMonth = moment(entry.date).month();
          const nextMonthRange = `${moment(entry.date).format('MMMM')}`;
          const nextMonthNum = moment(entry.date).month();
          currentMonth = {
            range: nextMonthRange,
            monthNum: nextMonthNum,
            entries: [entry],
          };
        }
      });

      return months;
    };

    const splitMostRecentMonthByWeeks = (month) => {
      if (month.monthNum === moment().month()) {
        let lastSunday = getMostRecentSunday(month.entries[0].date);
        let entriesByWeek = [];
        let week = [];

        month.entries.forEach((entry) => {
          if (!moment(entry.date).isSameOrAfter(lastSunday, 'day')) {
            entriesByWeek.push(week);
            week = [];
            lastSunday = getMostRecentSunday(entry.date);
          }

          week.push(entry);
        });

        entriesByWeek.push(week);
        return {
          range: month.range,
          monthNum: month.monthNum,
          entries: [
            ...entriesByWeek,
          ],
        };
      }

      return null;
    };

    const splitMonthIntoSections = (mostRecentMonth) => {
      let entriesThisWeek = [];
      let entriesLastWeek = [];
      let entriesThisMonth = [];
      const currentWeek = moment().week();

      mostRecentMonth.entries.forEach((entries) => {
        if (currentWeek - moment(entries[0].date).week() >= 0) {
          entries.forEach((entry) => {
            if (currentWeek - moment(entry.date).week() === 0) {
              entriesThisWeek.push(entry);
            } else if (currentWeek - moment(entry.date).week() === 1) {
              entriesLastWeek.push(entry);
            } else {
              entriesThisMonth.push(entry);
            }
          });
        }
      });

      return {
        range: mostRecentMonth.range,
        monthNum: mostRecentMonth.monthNum,
        entries: [
          { range: 'This week', monthNum: mostRecentMonth.monthNum, entries: entriesThisWeek },
          { range: 'Last week', monthNum: mostRecentMonth.monthNum, entries: entriesLastWeek },
          { range: 'This month', monthNum: mostRecentMonth.monthNum, entries: entriesThisMonth },
        ],
      };
    };

    const parseEntries = (entries) => {
      const entriesByMonth = splitEntriesByMonth(entries);
      let blocks;
      if (entriesByMonth[0].monthNum === moment().month()) {
        const mostRecentMonthByWeek = splitMostRecentMonthByWeeks(entriesByMonth[0]);
        const mostRecentMonthBySection = splitMonthIntoSections(mostRecentMonthByWeek);

        if (entriesByMonth[0].monthNum === mostRecentMonthBySection.monthNum) {
          entriesByMonth.shift();
        }

        blocks = [
          ...mostRecentMonthBySection.entries,
          ...entriesByMonth,
        ];
      } else {
        blocks = [
          ...entriesByMonth,
        ];
      }

      return blocks;
    };

    setIsLoading(true);
    getEntries(api)
      .then(entries => {
        const entriesByBlock = parseEntries(entries);
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

  const renderEntryBlocks = (entries) => {
    return entries.map((entriesBlock) => {
      if (entriesBlock.entries.length > 0) {
        return (
          <SentimentListViewBlockSection
            range={ entriesBlock.range }
            monthNum={ entriesBlock.monthNum }
            entries={ entriesBlock.entries }
            isLoading={ isLoading }
            onEntryClick={ handleEntryPress }
            key={ entries.indexOf(entriesBlock) }
          />
        )
      }
    });
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
