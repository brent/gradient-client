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

  // TODO: Fix rendering of button for buffered times
  const renderLogSentimentCta = (props) => {
    if (entries.length > 0) {
      const entryDate = moment(entries[0].date).format('YYYY-MM-DD');
      const currentDate = moment().format('YYYY-MM-DD');
      if (entryDate !== currentDate && moment().hour() > 3) {
        return <LogSentimentCta { ...props } />;
      }
    } else if (entries.length === 0) {
      return <LogSentimentCta { ...props } />;
    } 
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
