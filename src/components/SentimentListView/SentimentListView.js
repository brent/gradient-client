import React, { useState, useEffect } from 'react';
import { AppView, appViewType } from '../AppView';
import { api } from '../../api';
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
  return (
    <li
      key={id}
      className={styles.sentimentListItem}
      style={{ background: `#${color}` }}
    >
      <p>color: {color}</p>
      <p>sentiment: {sentiment}</p>
      <p>created: {created_at}</p>
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
        <h2>SentimentListView</h2>
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
