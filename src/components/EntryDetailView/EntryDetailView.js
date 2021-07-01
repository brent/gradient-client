import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AppView, appViewType } from '../AppView';
import { ContentCard } from '../ContentCard';
import { LineChart } from '../LineChart';
import styles from './styles.module.css';
import moment from 'moment';
import * as api from '../../api';
import { getDensityValues } from '../../utils/ChartHelpers';

export const EntryDetailView = (props) => {
  const history = useHistory();
  const entry = props.location.state.entry;
  const [insights, setInsights] = useState(null);
  const [chartData, setChartData] = useState(null);
  const dayOfWeek = moment(entry.date).format('dddd');
  const date = moment(entry.date).format('MMM Do, YYYY');

  useEffect(() => {
    api.getEntryForUser(entry.id)
      .then(res => setInsights(res.insights))
  }, []);

  useEffect(() => {
    console.log('insights', insights);
    if (insights) {
      let data = insights.allSentiment.map(entry => entry.sentiment);
      const density = getDensityValues(data);
      setChartData({
        labels: [...density.map(d => `${d[0]}`)],
        datasets: [
          {
            data: [...density.map(d => `${d[1]}`)],
            fill: true,
            backgroundColor: 'rgba(255,255,255,0.33)',
            borderColor: 'rgb(255,255,255)',
            tension: 0.33,
          },
        ],
      });
      console.log('density', density);
      console.log('density labels', density.map((d) => d[0]));
      console.log('density values', density.map((d) => d[1]));
    }
  }, [insights]);

  const handleCloseBtnPress = (e) => {
    e.preventDefault();
    history.goBack();
  }

  return (
    <AppView
      className={ styles.entryDetailView }
      style={{ backgroundColor: `#${entry.color}` }}
      type={ appViewType.fullBleed }
    >
      <div className={ styles.entryMetadata }>
        <p className={ styles.entryDate }>{ date }</p>
        <p className={ styles.entryDay }>{ dayOfWeek }</p>
        <p className={ styles.entryColor }>#{ entry.color }</p>
        <LineChart data={chartData} />
      </div>
      <ContentCard className={ styles.noteContentWrapper }>
        {
          entry.note_content ? (
            <p className={ styles.noteContent } >
              { entry.note_content }
            </p>
          ) : null
        }
        <button
          className={ styles.closeBtn }
          style={{ backgroundColor: `#${entry.color}` }}
          onClick={ handleCloseBtnPress }
        >
          Close
        </button>
      </ContentCard>
    </AppView>
  );
}
