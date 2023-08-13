import React from 'react';
import styles from './styles.module.css';
import { SentimentColorContainer } from '../SentimentColorContainer';
import { SentimentListItemMonth } from '../SentimentListItemMonth';

export const MonthDetailView = ({
  location,
}) => {
  console.log('location', location);
  const [route, year, month] = location.pathname.split('/');

  return (
    <div className='monthDetailView'>
      <h2>MonthDetailView</h2>
      <SentimentColorContainer
        monthNum={ month + 1 }
        yearNum={ year}
        dateString={ 'Jan 1st, 9999' }
        dayOfWeek={ 'Monday' }
        hexColor={ 'ff00ff' }
      >
      </SentimentColorContainer>
      <div>
      </div>
    </div>
  );
}
