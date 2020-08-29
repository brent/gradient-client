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

const renderEntries = (entries) => {
  return entries.map(entry => <SentimentListItem key={entry.id} entry={entry} />);
};

const SentimentListItem = ({
  entry: { id, color, sentiment, created_at }
}) => {
  const dayOfWeek = moment(created_at).format('dddd');
  const date = moment(created_at).format('MMM Do, YYYY');

  return (
    <li
      key={id}
      className={styles.sentimentListItem}
      style={{ background: `#${color}` }}
    >
      <h4 className={ styles.date }>{ date }</h4>
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

  const renderLogSentimentCta = (props) => {
    if (entries.length > 0) {
      const entryDate = moment(entries[0].created_at).format('YYYY-MM-DD');
      const currentDate = moment().format('YYYY-MM-DD');
      if (entryDate !== currentDate ) {
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
            : renderEntries(entries) 
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
