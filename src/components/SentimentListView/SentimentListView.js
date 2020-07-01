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
  return entries.map(entry => (
    <li key={entry.id}>
      <p>color: { entry.color }</p>
      <p>sentiment: { entry.sentiment }</p>
      <p>created: { entry.created_at }</p>
    </li>
  ));
};

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
    <AppView className={ styles.sentimentListView }>
      <h2>SentimentListView</h2>
      { isLoading
          ? <p>Loading...</p>
          : renderEntries(entries)
      }
    </AppView>
  );
}

export {
  SentimentListView,
}
