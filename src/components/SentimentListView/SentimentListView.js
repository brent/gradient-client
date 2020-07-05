import React, { useState, useEffect } from 'react';
import { AppView, appViewType } from '../AppView';
import { api } from '../../api';
import moment from 'moment';
import styles from './styles.module.css';

const getEntries = async (api) => {
  const userId = JSON.parse(localStorage.getItem('user')).user_id;
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

const SentimentListView = () => {
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getEntries(api)
      .then(entries => {
        setEntries(entries);
        setIsLoading(false);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <AppView
      type={ appViewType.borderless }
      className={ styles.sentimentListView }
    >
      <section className='main'>
        { isLoading
            ? <p>Loading...</p>
            : renderEntries(entries)
        }
      </section>
    </AppView>
  );
}

export {
  SentimentListView,
}
