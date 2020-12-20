import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AppView, appViewType } from '../AppView';
import * as api from '../../api';
import moment from 'moment';
import styles from './styles.module.css';

const getEntries = async (api) => {
  const entries = await api.getEntriesForUser();
  return entries;
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

const SentimentListItem = ({
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


const LogSentimentCta = ({ className, children, onClick }) => (
  <div className={className}>
    <button
      className={styles.logSentimentCtaBtn}
      onClick={ onClick }
    >{ children }</button>
  </div>
);

const handleLogSentimentCtaPress = (e, history) => {
  e.preventDefault();
  history.push('/create');
}

const SentimentListView = () => {
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    setIsLoading(true);
    getEntries(api)
      .then(entries => {
        setEntries(entries);
        setIsLoading(false);
      })
      .catch(err => console.log(err));
  }, []);

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
      <section className={ styles.sentimentListViewWrapper }>
        { isLoading
            ? <p>Loading...</p>
            : renderEntries(entries, handleEntryPress)
        }
        {
          renderLogSentimentCta({
            className: styles.logSentimentCtaWrapper,
            onClick: (e) => handleLogSentimentCtaPress(e, history),
            children: 'Log my day',
          })
        }
      </section>
    </AppView>
  );
}

export {
  SentimentListView,
}
